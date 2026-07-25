import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

const scannerSchema = z.object({
  scanType: z.enum(["PHOTO", "QR", "MANUAL"]).default("PHOTO"),
  code: z.string().max(120).optional(),
  imageUrl: z.string().url().optional(),
  note: z.string().max(800).optional()
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const input = scannerSchema.parse(body);
    const passportCode = input.code?.trim() || `GL-PASS-${Date.now().toString(36).toUpperCase()}`;

    const result = {
      passportCode,
      identifiedAs: input.scanType === "QR" ? "Registered Garden Live plant" : "Premium indoor/outdoor plant record",
      confidenceScore: input.scanType === "QR" ? 99 : 84,
      suggestedCategory: input.note?.toLowerCase().includes("palm") ? "PALM" : "INDOOR",
      actions: ["Open QR Plant Passport", "Add growth photo", "Run AI Plant Doctor", "Schedule care reminder"],
      warrantyStatus: "Review passport to confirm Green Promise eligibility"
    };

    await prisma.activityLog.create({
      data: {
        actorUserId: session?.user?.id,
        action: "AI_PLANT_SCANNER_SCAN",
        entityType: "PlantScannerPreview",
        metadata: { input, result },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(result);
  } catch (error) {
    return apiError(error);
  }
}
