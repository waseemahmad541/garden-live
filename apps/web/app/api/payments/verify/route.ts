import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireApiSession } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";
import { verifyRazorpayPayment } from "@/lib/platform/payments";

export const dynamic = "force-dynamic";

const verifySchema = z.discriminatedUnion("provider", [
  z.object({
    provider: z.literal("RAZORPAY"),
    providerOrderId: z.string().min(4),
    providerPaymentId: z.string().min(4),
    providerSignature: z.string().min(8)
  }),
  z.object({
    provider: z.literal("STRIPE"),
    sessionId: z.string().min(4)
  })
]);

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const input = verifySchema.parse(await request.json().catch(() => ({})));

    if (input.provider === "RAZORPAY") {
      verifyRazorpayPayment({
        orderId: input.providerOrderId,
        paymentId: input.providerPaymentId,
        signature: input.providerSignature
      });

      const payment = await prisma.payment.findFirst({
        where: {
          provider: "RAZORPAY",
          providerOrderId: input.providerOrderId,
          deletedAt: null
        }
      });
      if (!payment) throw new ApiError(404, "Payment record not found.", "PAYMENT_NOT_FOUND");

      const updated = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "PAID",
          providerPaymentId: input.providerPaymentId,
          providerSignature: input.providerSignature,
          paidAt: new Date()
        }
      });

      if (updated.orderId) {
        await prisma.order.update({
          where: { id: updated.orderId },
          data: { status: "CONFIRMED" }
        });
      }

      await prisma.activityLog.create({
        data: {
          actorUserId: session.userId,
          action: "PAYMENT_VERIFIED",
          entityType: "Payment",
          entityId: updated.id,
          newValue: JSON.parse(JSON.stringify(updated))
        }
      });

      return apiResponse(updated);
    }

    const payment = await prisma.payment.findFirst({
      where: {
        provider: "STRIPE" as any,
        providerOrderId: input.sessionId,
        deletedAt: null
      }
    });
    if (!payment) throw new ApiError(404, "Stripe payment record not found.", "PAYMENT_NOT_FOUND");
    return apiResponse(payment);
  } catch (error) {
    return apiError(error);
  }
}
