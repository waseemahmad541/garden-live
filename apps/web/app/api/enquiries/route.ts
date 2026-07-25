import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { channelReadiness, whatsappLink } from "@/lib/platform/channel-status";

export const dynamic = "force-dynamic";

const enquirySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(8).max(24),
  city: z.string().min(2).max(80),
  service: z.string().min(3).max(160),
  message: z.string().min(12).max(1200),
  source: z.string().max(80).default("public-enquiry")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const enquiry = enquirySchema.parse(body);
    const reference = `GL-ENQ-${Date.now().toString(36).toUpperCase()}`;

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_ENQUIRY",
        entityType: "PublicEnquiry",
        metadata: {
          reference,
          ...enquiry,
          channels: channelReadiness()
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(
      {
        reference,
        message: "Garden Live received your enquiry. Our team will contact you for the next step.",
        channels: channelReadiness(),
        whatsappUrl: whatsappLink("919999999999", `Garden Live enquiry ${reference}: ${enquiry.name}, ${enquiry.city}, ${enquiry.service}`)
      },
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
