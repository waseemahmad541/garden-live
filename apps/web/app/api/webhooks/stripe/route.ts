import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

function parseStripeSignature(header: string) {
  return Object.fromEntries(header.split(",").map((part) => {
    const [key, value] = part.split("=");
    return [key, value];
  }));
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new ApiError(503, "Stripe webhook secret is not configured.", "STRIPE_WEBHOOK_NOT_CONFIGURED");
    const signatureHeader = request.headers.get("stripe-signature") ?? "";
    const parts = parseStripeSignature(signatureHeader);
    const timestamp = parts.t;
    const signature = parts.v1;
    const payload = await request.text();
    if (!timestamp || !signature) throw new ApiError(401, "Invalid Stripe webhook signature header.", "INVALID_STRIPE_SIGNATURE");
    const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
    if (expected.length !== signature.length) {
      throw new ApiError(401, "Invalid Stripe webhook signature.", "INVALID_STRIPE_SIGNATURE");
    }
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      throw new ApiError(401, "Invalid Stripe webhook signature.", "INVALID_STRIPE_SIGNATURE");
    }
    const event = JSON.parse(payload) as { type?: string; data?: unknown };
    const metadata = JSON.parse(JSON.stringify(event));
    await prisma.activityLog.create({
      data: {
        action: "STRIPE_WEBHOOK",
        entityType: "PaymentWebhook",
        metadata
      }
    });
    return apiResponse({ received: true, event: event.type ?? "unknown" });
  } catch (error) {
    return apiError(error);
  }
}
