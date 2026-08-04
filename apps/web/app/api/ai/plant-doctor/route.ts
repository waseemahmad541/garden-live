import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { buildRecommendationEngine } from "@/lib/platform/ai-recommendations";
import { diagnosePlantWithVision, plantDiagnosisInputSchema } from "@/lib/platform/ai";

export const dynamic = "force-dynamic";

async function requireCustomer(userId: string) {
  const customer = await prisma.customer.findUnique({
    where: { userId },
    select: {
      id: true,
      activeMemberships: {
        where: { status: "ACTIVE", deletedAt: null },
        select: { plan: { select: { name: true } } },
        take: 1
      }
    }
  });
  if (!customer) throw new ApiError(403, "Customer profile is required for AI Plant Doctor.", "CUSTOMER_PROFILE_REQUIRED");
  return customer;
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    const customer = await requireCustomer(session.userId);
    const body = await request.json().catch(() => ({}));
    const parsedInput = plantDiagnosisInputSchema.parse(body);
    const input = {
      ...parsedInput,
      membershipPlan: parsedInput.membershipPlan ?? customer.activeMemberships[0]?.plan.name
    };

    if (input.plantId) {
      const plant = await prisma.plant.findFirst({
        where: {
          id: input.plantId,
          customerId: customer.id,
          deletedAt: null
        }
      });
      if (!plant) throw new ApiError(404, "Plant not found for this customer.", "PLANT_NOT_FOUND");
    }

    const diagnosis = await diagnosePlantWithVision(input);
    const recommendationEngine = await buildRecommendationEngine(input, diagnosis);

    const record = await prisma.aIDiagnosis.create({
      data: {
        customerId: customer.id,
        plantId: input.plantId,
        imageUrl: input.imageUrl,
        symptomsText: input.symptoms,
        diseaseDetection: {
          name: diagnosis.diseaseName,
          probability: diagnosis.diseaseProbability
        },
        pestDetection: {
          name: diagnosis.pestName,
          probability: diagnosis.pestProbability
        },
        healthScore: diagnosis.healthScore,
        waterRecommendation: diagnosis.waterRecommendation,
        fertilizerRecommendation: diagnosis.fertilizerRecommendation,
        medicineRecommendation: diagnosis.medicineRecommendation,
        treatmentTimeline: diagnosis.treatmentTimeline,
        diagnosisSummary: diagnosis.summary,
        severity: diagnosis.severity,
        confidenceScore: diagnosis.confidenceScore,
        status: diagnosis.expertConsultationRequired ? "ESCALATED" : "GENERATED"
      }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "AI_PLANT_DOCTOR_DIAGNOSIS_CREATED",
        entityType: "AIDiagnosis",
        entityId: record.id,
        newValue: JSON.parse(JSON.stringify({ record, recommendationEngine })),
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({
      diagnosisId: record.id,
      plantName: input.plantName,
      environment: input.environment,
      ...diagnosis,
      recommendationEngine
    }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
