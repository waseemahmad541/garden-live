import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    if (!token) throw new ApiError(503, "WhatsApp webhook verify token is not configured.", "WHATSAPP_WEBHOOK_NOT_CONFIGURED");
    const params = request.nextUrl.searchParams;
    const mode = params.get("hub.mode");
    const challenge = params.get("hub.challenge");
    const verifyToken = params.get("hub.verify_token");
    if (mode === "subscribe" && verifyToken === token && challenge) {
      return new Response(challenge, { status: 200 });
    }
    throw new ApiError(403, "WhatsApp webhook verification failed.", "WHATSAPP_WEBHOOK_FORBIDDEN");
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    await prisma.activityLog.create({
      data: {
        action: "WHATSAPP_WEBHOOK",
        entityType: "CommunicationWebhook",
        metadata: body
      }
    });
    return apiResponse({ received: true });
  } catch (error) {
    return apiError(error);
  }
}
