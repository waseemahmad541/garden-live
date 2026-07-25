import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { assignRole, createCustomerProfileIfNeeded } from "@/lib/auth/users";
import { createInvoiceHtml, invoiceNumber } from "@/lib/platform/invoices";
import { createRazorpayOrder, createStripeCheckoutSession } from "@/lib/platform/payments";
import { jsonValue } from "@/lib/platform/providers";

export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(8).max(24)
  }),
  shippingAddress: z.object({
    line1: z.string().min(4).max(180),
    line2: z.string().max(180).optional(),
    city: z.string().min(2).max(80),
    state: z.string().min(2).max(80),
    pincode: z.string().min(4).max(12)
  }),
  items: z.array(
    z.object({
      sku: z.string().min(2).max(80),
      name: z.string().min(2).max(180),
      quantity: z.coerce.number().int().min(1).max(99),
      unitPrice: z.coerce.number().min(1)
    })
  ).min(1),
  provider: z.enum(["RAZORPAY", "STRIPE"]).default("RAZORPAY"),
  couponCode: z.string().max(40).optional()
});

async function customerForCheckout(input: z.infer<typeof checkoutSchema>["customer"], sessionUserId?: string) {
  if (sessionUserId) {
    const sessionCustomer = await prisma.customer.findUnique({ where: { userId: sessionUserId } });
    if (sessionCustomer) return sessionCustomer;
  }

  const user = await prisma.user.upsert({
    where: { phone: input.phone },
    update: {
      name: input.name,
      email: input.email,
      status: "ACTIVE"
    },
    create: {
      name: input.name,
      phone: input.phone,
      email: input.email,
      status: "ACTIVE"
    }
  });
  await assignRole(user.id, "CUSTOMER");
  await createCustomerProfileIfNeeded(user);
  return prisma.customer.findUniqueOrThrow({ where: { userId: user.id } });
}

function totals(items: z.infer<typeof checkoutSchema>["items"]) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gstAmount = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 1999 ? 0 : 99;
  const totalAmount = subtotal + gstAmount + deliveryFee;
  return { subtotal, gstAmount, deliveryFee, totalAmount };
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const checkout = checkoutSchema.parse(body);
    const total = totals(checkout.items);
    const orderNumber = `GL-ORD-${Date.now().toString(36).toUpperCase()}`;
    const invoiceNo = invoiceNumber();
    const customer = await customerForCheckout(checkout.customer, session?.user?.id);

    const address = await prisma.address.create({
      data: {
        userId: customer.userId,
        type: "SHIPPING",
        name: checkout.customer.name,
        phone: checkout.customer.phone,
        line1: checkout.shippingAddress.line1,
        line2: checkout.shippingAddress.line2,
        city: checkout.shippingAddress.city,
        state: checkout.shippingAddress.state,
        pincode: checkout.shippingAddress.pincode,
        country: "India"
      }
    });

    const products = await prisma.product.findMany({
      where: {
        sku: { in: checkout.items.map((item) => item.sku) },
        deletedAt: null
      },
      select: { id: true, sku: true, gstRate: true }
    });
    const productBySku = new Map(products.map((product) => [product.sku, product]));

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shippingAddressId: address.id,
        orderNumber,
        status: "PENDING",
        subtotal: total.subtotal,
        gstAmount: total.gstAmount,
        deliveryFee: total.deliveryFee,
        totalAmount: total.totalAmount,
        invoiceUrl: `/api/invoices/${orderNumber}`,
        items: {
          create: checkout.items.map((item) => {
            const product = productBySku.get(item.sku);
            return {
              productId: product?.id,
              productNameSnapshot: item.name,
              skuSnapshot: item.sku,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              gstRate: Number(product?.gstRate ?? 18),
              totalPrice: item.quantity * item.unitPrice
            };
          })
        }
      },
      include: { items: true }
    });

    let providerPayload: Record<string, unknown> | null = null;
    let providerReady = false;
    try {
      providerPayload =
        checkout.provider === "RAZORPAY"
          ? await createRazorpayOrder({
              amountInPaise: total.totalAmount * 100,
              currency: "INR",
              receipt: orderNumber,
              notes: { orderNumber, customerId: customer.id }
            })
          : await createStripeCheckoutSession({
              amountInPaise: total.totalAmount * 100,
              currency: "INR",
              reference: orderNumber,
              description: `Garden Live order ${orderNumber}`,
              successUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout?success=${orderNumber}`,
              cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout?cancelled=${orderNumber}`
            });
      providerReady = true;
    } catch (error) {
      providerPayload = {
        configured: false,
        message: error instanceof Error ? error.message : "Payment provider is not configured."
      };
    }

    const payment = await prisma.payment.create({
      data: {
        userId: customer.userId,
        orderId: order.id,
        amount: total.totalAmount,
        currency: "INR",
        provider: checkout.provider as any,
        providerOrderId: typeof providerPayload?.id === "string" ? providerPayload.id : undefined,
        status: "CREATED",
        purpose: "STORE_ORDER",
        metadata: jsonValue({
          checkout,
          invoiceNo,
          providerPayload,
          invoiceHtml: createInvoiceHtml({
            invoiceNo,
            customerName: checkout.customer.name,
            customerEmail: checkout.customer.email,
            customerPhone: checkout.customer.phone,
            billingAddress: `${checkout.shippingAddress.line1}, ${checkout.shippingAddress.city}, ${checkout.shippingAddress.state} ${checkout.shippingAddress.pincode}`,
            orderNumber,
            ...total,
            lines: checkout.items.map((item) => ({
              name: item.name,
              sku: item.sku,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              gstRate: 18,
              totalPrice: item.quantity * item.unitPrice
            }))
          })
        })
      }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session?.user?.id ?? customer.userId,
        action: "CHECKOUT_CREATED",
        entityType: "Order",
        entityId: order.id,
        metadata: { orderNumber, paymentId: payment.id, providerReady }
      }
    });

    return apiResponse(
      {
        reference: orderNumber,
        orderId: order.id,
        paymentId: payment.id,
        provider: checkout.provider,
        providerReady,
        providerPayload,
        invoiceUrl: `/api/invoices/${orderNumber}`,
        totals: { ...total, currency: "INR" }
      },
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
