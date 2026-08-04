import { z } from "zod";
import { ApiError } from "@/lib/api/errors";
import { providerFetch, requiredEnv } from "@/lib/platform/providers";

export const plantDiagnosisInputSchema = z.object({
  plantName: z.string().min(2).max(120),
  symptoms: z.string().min(8).max(1200),
  imageUrl: z.string().min(10).refine(
    (value) => z.string().url().safeParse(value).success || /^data:image\/(png|jpe?g|webp);base64,/i.test(value),
    "Provide a valid plant image URL or uploaded image."
  ),
  environment: z.enum(["INDOOR", "OUTDOOR", "TERRACE", "BALCONY", "COMMERCIAL"]).default("INDOOR"),
  plantId: z.string().uuid().optional()
});

export type PlantDiagnosisInput = z.infer<typeof plantDiagnosisInputSchema>;

const plantDiagnosisOutputSchema = z.object({
  diseaseName: z.string(),
  diseaseProbability: z.number().min(0).max(1),
  pestName: z.string(),
  pestProbability: z.number().min(0).max(1),
  healthScore: z.number().int().min(0).max(100),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  waterRecommendation: z.string(),
  fertilizerRecommendation: z.string(),
  medicineRecommendation: z.string(),
  treatmentTimeline: z.array(z.string()).min(1),
  expertConsultationRequired: z.boolean(),
  summary: z.string(),
  confidenceScore: z.number().min(0).max(1)
});

export type PlantDiagnosisOutput = z.infer<typeof plantDiagnosisOutputSchema>;

export async function diagnosePlantWithVision(input: PlantDiagnosisInput): Promise<PlantDiagnosisOutput> {
  const apiKey = requiredEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_PLANT_DOCTOR_MODEL || "gpt-4o-mini";

  const response = await providerFetch<{ choices?: Array<{ message?: { content?: string } }> }>(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are Garden Live AI Plant Doctor. Diagnose plant disease and pest risk from an image and symptoms. Return strict JSON with diseaseName, diseaseProbability, pestName, pestProbability, healthScore, severity, waterRecommendation, fertilizerRecommendation, medicineRecommendation, treatmentTimeline, expertConsultationRequired, summary, confidenceScore. Do not invent unsafe chemical dosage; recommend expert confirmation for high-risk treatments."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Plant: ${input.plantName}. Environment: ${input.environment}. Symptoms: ${input.symptoms}.`
              },
              {
                type: "image_url",
                image_url: { url: input.imageUrl }
              }
            ]
          }
        ]
      })
    },
    "openai"
  );

  const content = response.choices?.[0]?.message?.content;
  if (!content) throw new ApiError(502, "AI provider returned an empty diagnosis.", "AI_EMPTY_RESPONSE");

  return plantDiagnosisOutputSchema.parse(JSON.parse(content));
}
