import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

const membershipIntentSchema = z.object({
  planSlug: z.string().min(2).max(80),
  name: z.string().min(2).max(120),
  phone: z.string().min(8).max(24),
  email: z.string().email().optional(),
  city: z.string().min(2).max(80),
  gardenType: z.string().min(2).max(120).default("Home Garden")
});

export async function POST(request: NextRequest) {
  try {
    const input = membershipIntentSchema.parse(await request.json().catch(() => ({})));
    const plan = await prisma.membershipPlan.findFirst({
      where: { slug: input.planSlug, isActive: true, deletedAt: null },
      select: { id: true, name: true, slug: true, price: true, billingCycle: true }
    });

    const reference = `GL-MEM-INTENT-${Date.now().toString(36).toUpperCase()}`;

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_MEMBERSHIP_INTENT",
        entityType: "MembershipPlan",
        entityId: plan?.id,
        metadata: {
          reference,
          plan: plan ?? { slug: input.planSlug, name: input.planSlug },
          customer: input
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(
      {
        reference,
        plan: plan ?? { slug: input.planSlug, name: input.planSlug },
        message: "Garden Live received your membership request. Our team will confirm plan activation and payment details."
      },
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
