import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { prisma } from "@/lib/db/prisma";
import { diagnosePlantWithVision, plantDiagnosisInputSchema } from "@/lib/platform/ai";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const input = plantDiagnosisInputSchema.parse(body);
    const diagnosis = await diagnosePlantWithVision(input);

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_AI_PLANT_DOCTOR_DIAGNOSIS",
        entityType: "AIDiagnosis",
        newValue: {
          plantName: input.plantName,
          symptoms: input.symptoms,
          imageUrl: input.imageUrl,
          environment: input.environment,
          diagnosis
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({ plantName: input.plantName, environment: input.environment, ...diagnosis }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
