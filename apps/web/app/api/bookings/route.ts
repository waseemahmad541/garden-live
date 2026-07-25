import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { channelReadiness, whatsappLink } from "@/lib/platform/channel-status";
import { sendNotification } from "@/lib/platform/notifications";

export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(8).max(24),
  city: z.string().min(2).max(80),
  service: z.string().min(3).max(160),
  message: z.string().min(12).max(1200),
  source: z.string().max(80).default("book-garden-visit")
});

function visitType(service: string) {
  const value = service.toLowerCase();
  if (value.includes("landscape")) return "Landscaping Survey";
  if (value.includes("maintenance")) return "Garden Maintenance Visit";
  if (value.includes("gardener")) return "Dedicated Gardener Consultation";
  if (value.includes("nursery") || value.includes("plant")) return "Plant Nursery Consultation";
  return "Free Garden Survey";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const booking = bookingSchema.parse(body);
    const reference = `GL-VISIT-${Date.now().toString(36).toUpperCase()}`;
    const type = visitType(booking.service);

    await prisma.activityLog.create({
      data: {
        action: "BOOK_GARDEN_VISIT",
        entityType: "GardenVisitBooking",
        metadata: {
          reference,
          visitType: type,
          ...booking,
          channels: channelReadiness()
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    let whatsappStatus: "SENT" | "FAILED" | "SKIPPED" = "SKIPPED";
    let whatsappFailure: string | undefined;
    try {
      await sendNotification({
        channel: "WHATSAPP",
        type: "SERVICE",
        to: booking.phone,
        title: "Garden Live booking received",
        message: `Your ${type} request ${reference} has been received. Our team will confirm your Garden Live visit schedule shortly.`,
        metadata: { reference, visitType: type, source: booking.source }
      });
      whatsappStatus = "SENT";
    } catch (error) {
      whatsappStatus = "FAILED";
      whatsappFailure = error instanceof Error ? error.message : "WhatsApp delivery failed.";
    }

    return apiResponse(
      {
        reference,
        visitType: type,
        message: `Garden Live received your ${type.toLowerCase()} request. Our team will confirm the schedule.`,
        channels: channelReadiness(),
        whatsappStatus,
        whatsappFailure,
        whatsappUrl: whatsappLink("919999999999", `Garden Live visit ${reference}: ${booking.name}, ${booking.city}, ${type}`)
      },
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
