import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

function verifySignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  if (expected.length !== signature.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) throw new ApiError(503, "Razorpay webhook secret is not configured.", "RAZORPAY_WEBHOOK_NOT_CONFIGURED");
    const signature = request.headers.get("x-razorpay-signature") ?? "";
    const payload = await request.text();
    if (!signature || !verifySignature(payload, signature, secret)) {
      throw new ApiError(401, "Invalid Razorpay webhook signature.", "INVALID_RAZORPAY_SIGNATURE");
    }
    const event = JSON.parse(payload) as { event?: string; payload?: unknown };
    const metadata = JSON.parse(JSON.stringify(event));
    await prisma.activityLog.create({
      data: {
        action: "RAZORPAY_WEBHOOK",
        entityType: "PaymentWebhook",
        metadata
      }
    });
    return apiResponse({ received: true, event: event.event ?? "unknown" });
  } catch (error) {
    return apiError(error);
  }
}
