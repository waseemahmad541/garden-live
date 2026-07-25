import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { adminRoles, operationsRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";

const allowedRoles = Array.from(new Set([...adminRoles, ...operationsRoles]));

const sendNotificationSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(500),
  title: z.string().min(1).max(140),
  message: z.string().min(1).max(1000),
  type: z.enum(["SYSTEM", "AUTH", "PAYMENT", "MEMBERSHIP", "SERVICE", "PLANT_HEALTH", "ORDER", "REWARD", "CLAIM", "TENDER", "PROMOTION"]).default("SYSTEM"),
  channel: z.enum(["IN_APP", "SMS", "EMAIL", "WHATSAPP", "PUSH"]).default("IN_APP"),
  status: z.enum(["PENDING", "SENT"]).default("PENDING"),
  metadata: z.unknown().optional()
});

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allowedRoles);
    const body = await request.json().catch(() => ({}));
    const data = sendNotificationSchema.parse(body);

    const result = await prisma.notification.createMany({
      data: data.userIds.map((userId) => ({
        userId,
        title: data.title,
        message: data.message,
        type: data.type,
        channel: data.channel,
        status: data.status,
        sentAt: data.status === "SENT" ? new Date() : undefined,
        metadata: data.metadata === undefined ? undefined : JSON.parse(JSON.stringify(data.metadata))
      }))
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "SEND_NOTIFICATION",
        entityType: "Notification",
        metadata: {
          count: result.count,
          type: data.type,
          channel: data.channel
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({ sent: result.count }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
