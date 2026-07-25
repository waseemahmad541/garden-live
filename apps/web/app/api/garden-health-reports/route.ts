import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession, requireRoles, allBusinessRoles } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

const reportSchema = z.object({
  gardenId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
  gardenName: z.string().min(2).max(160).default("Garden Live Premium Garden"),
  plantHealthAverage: z.coerce.number().min(0).max(100).default(86),
  visitCompletionRate: z.coerce.number().min(0).max(100).default(94),
  pestRisk: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("LOW"),
  soilScore: z.coerce.number().min(0).max(100).default(82),
  waterScore: z.coerce.number().min(0).max(100).default(88),
  notes: z.string().max(1200).optional()
});

function overallScore(input: z.infer<typeof reportSchema>) {
  const pestPenalty = { LOW: 0, MEDIUM: 7, HIGH: 15, CRITICAL: 25 }[input.pestRisk];
  return Math.max(0, Math.round((input.plantHealthAverage + input.visitCompletionRate + input.soilScore + input.waterScore) / 4 - pestPenalty));
}

export async function GET() {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);

    return apiResponse({
      gardenName: "Garden Live Premium Garden",
      overallScore: 88,
      plantHealthAverage: 86,
      visitCompletionRate: 94,
      pestRisk: "LOW",
      soilScore: 82,
      waterScore: 88,
      recommendations: [
        "Continue weekly pruning for flowering plants.",
        "Increase watering interval for palms during high heat.",
        "Apply organic fertilizer this weekend.",
        "Scan pest-watch plants again after the next maintenance visit."
      ],
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);
    const body = await request.json().catch(() => ({}));
    const report = reportSchema.parse(body);
    const score = overallScore(report);

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "GENERATE_GARDEN_HEALTH_REPORT",
        entityType: "GardenHealthReport",
        entityId: report.gardenId,
        metadata: {
          ...report,
          overallScore: score,
          recommendations: [
            score >= 85 ? "Garden is performing well. Continue the current maintenance rhythm." : "Schedule a supervisor review to improve garden health.",
            report.pestRisk === "LOW" ? "Maintain pest monitoring during regular visits." : "Escalate pest control and AI Plant Doctor follow-up.",
            "Update QR Plant Passport timelines after each maintenance visit."
          ]
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(
      {
        ...report,
        overallScore: score,
        generatedAt: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
