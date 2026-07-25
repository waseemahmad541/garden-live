import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireApiSession } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";
import { createRazorpayOrder, createStripeCheckoutSession } from "@/lib/platform/payments";
import { jsonValue } from "@/lib/platform/providers";

export const dynamic = "force-dynamic";

const subscribeSchema = z.object({
  planId: z.string().uuid(),
  provider: z.enum(["RAZORPAY", "STRIPE"]).default("RAZORPAY"),
  autoRenew: z.boolean().default(true),
  action: z.enum(["SUBSCRIBE", "RENEW", "UPGRADE"]).default("SUBSCRIBE")
});

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const input = subscribeSchema.parse(await request.json().catch(() => ({})));
    const customer = await prisma.customer.findUnique({ where: { userId: session.userId } });
    if (!customer) throw new ApiError(403, "Customer profile is required.", "CUSTOMER_PROFILE_REQUIRED");

    const plan = await prisma.membershipPlan.findFirst({
      where: { id: input.planId, isActive: true, deletedAt: null }
    });
    if (!plan) throw new ApiError(404, "Membership plan not found.", "PLAN_NOT_FOUND");

    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + plan.durationDays);

    const membership = await prisma.activeMembership.create({
      data: {
        customerId: customer.id,
        planId: plan.id,
        status: "PENDING_PAYMENT",
        startDate: now,
        endDate,
        remainingVisits: plan.visitCount,
        remainingAiCredits: plan.aiDoctorLimit,
        remainingReplacements: plan.replacementCoverageCount,
        autoRenew: input.autoRenew
      },
      include: { plan: true }
    });

    const reference = `GL-MEM-${Date.now().toString(36).toUpperCase()}`;
    const amount = Number(plan.price);
    let providerPayload: Record<string, unknown> | null = null;
    let providerReady = false;

    try {
      providerPayload =
        input.provider === "RAZORPAY"
          ? await createRazorpayOrder({
              amountInPaise: Math.round(amount * 100),
              currency: "INR",
              receipt: reference,
              notes: { membershipId: membership.id, plan: plan.slug }
            })
          : await createStripeCheckoutSession({
              amountInPaise: Math.round(amount * 100),
              currency: "INR",
              reference,
              description: `Garden Live ${plan.name} membership`,
              successUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/membership?success=${reference}`,
              cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/membership?cancelled=${reference}`
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
        userId: session.userId,
        activeMembershipId: membership.id,
        amount,
        currency: "INR",
        provider: input.provider as any,
        providerOrderId: typeof providerPayload?.id === "string" ? providerPayload.id : reference,
        status: "CREATED",
        purpose: "MEMBERSHIP",
        metadata: jsonValue({
          action: input.action,
          planSlug: plan.slug,
          providerPayload
        })
      }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: `MEMBERSHIP_${input.action}`,
        entityType: "ActiveMembership",
        entityId: membership.id,
        metadata: { paymentId: payment.id, providerReady }
      }
    });

    return apiResponse({
      membership,
      payment,
      providerReady,
      providerPayload
    }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
