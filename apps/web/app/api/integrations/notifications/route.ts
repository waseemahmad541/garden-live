import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { adminRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";
import { sendNotification } from "@/lib/platform/notifications";
import { jsonValue } from "@/lib/platform/providers";

export const dynamic = "force-dynamic";

const notificationSchema = z.object({
  channel: z.enum(["WHATSAPP", "EMAIL", "SMS", "IN_APP"]),
  type: z.enum(["SYSTEM", "AUTH", "PAYMENT", "MEMBERSHIP", "SERVICE", "PLANT_HEALTH", "ORDER", "REWARD", "CLAIM", "TENDER", "PROMOTION"]).default("SYSTEM"),
  userId: z.string().uuid().optional(),
  to: z.string().min(3).max(180),
  title: z.string().min(2).max(160),
  message: z.string().min(2).max(1200),
  source: z.string().max(80).default("garden-live-platform")
});

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, adminRoles);
    const notification = notificationSchema.parse(await request.json().catch(() => ({})));

    let providerResult: unknown = null;
    let status: "SENT" | "FAILED" = "SENT";
    let failureMessage: string | undefined;

    try {
      if (notification.channel === "IN_APP") {
        if (!notification.userId) throw new Error("userId is required for in-app notifications.");
        providerResult = await prisma.notification.create({
          data: {
            userId: notification.userId,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            channel: "IN_APP",
            status: "SENT",
            sentAt: new Date(),
            metadata: jsonValue({ source: notification.source })
          }
        });
      } else {
        providerResult = await sendNotification({
          userId: notification.userId,
          channel: notification.channel,
          type: notification.type,
          to: notification.to,
          title: notification.title,
          message: notification.message,
          metadata: { source: notification.source }
        });
      }
    } catch (error) {
      status = "FAILED";
      failureMessage = error instanceof Error ? error.message : "Notification delivery failed.";
      if (notification.userId) {
        await prisma.notification.create({
          data: {
            userId: notification.userId,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            channel: notification.channel,
            status: "FAILED",
            metadata: jsonValue({ source: notification.source, failureMessage })
          }
        });
      }
    }

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: `SEND_${notification.channel}_NOTIFICATION`,
        entityType: "IntegrationNotification",
        metadata: jsonValue({
          notification,
          status,
          failureMessage,
          providerResult
        })
      }
    });

    return apiResponse(
      {
        channel: notification.channel,
        to: notification.to,
        status,
        failureMessage,
        providerResult
      },
      { status: status === "SENT" ? 202 : 503 }
    );
  } catch (error) {
    return apiError(error);
  }
}
