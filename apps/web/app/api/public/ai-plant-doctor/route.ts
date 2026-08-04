import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { prisma } from "@/lib/db/prisma";
import { buildRecommendationEngine } from "@/lib/platform/ai-recommendations";
import { diagnosePlantWithVision, plantDiagnosisInputSchema } from "@/lib/platform/ai";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const input = plantDiagnosisInputSchema.parse(body);
    const diagnosis = await diagnosePlantWithVision(input);
    const recommendationEngine = await buildRecommendationEngine(input, diagnosis);
    const storedReport = JSON.parse(JSON.stringify({
      plantName: input.plantName,
      symptoms: input.symptoms,
      imageUrl: input.imageUrl,
      environment: input.environment,
      membershipPlan: input.membershipPlan,
      diagnosis,
      recommendationEngine
    }));

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_AI_PLANT_DOCTOR_DIAGNOSIS",
        entityType: "AIDiagnosis",
        newValue: storedReport,
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({ plantName: input.plantName, environment: input.environment, ...diagnosis, recommendationEngine }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
