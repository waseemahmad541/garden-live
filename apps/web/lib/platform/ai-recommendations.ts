import type { PlantDiagnosisInput, PlantDiagnosisOutput } from "@/lib/platform/ai";
import { prisma } from "@/lib/db/prisma";

type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: unknown;
  salePrice: unknown;
  category: { name: string; slug: string } | null;
  inventory: { stockQuantity: number } | null;
  mediaFiles: Array<{ url: string; altText: string | null }>;
};

export type TreatmentPlan = {
  problemDetected: string;
  reason: string;
  solution: string;
  estimatedRecoveryTime: string;
  today: string[];
  thisWeek: string[];
  thisMonth: string[];
};

export type RecommendedProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  imageUrl: string;
  stockQuantity: number;
  whyRecommended: string;
  usageWindow: "Today" | "This Week" | "This Month";
};

export type RefillReminder = {
  productType: string;
  reminderInDays: number;
  reason: string;
};

export type RecommendationEngineResult = {
  diagnosisResult: {
    plantName: string;
    problemDetected: string;
    problemType: "Disease" | "Deficiency" | "Pest" | "Plant Stress";
    severityLevel: PlantDiagnosisOutput["severity"];
    recoveryTime: string;
    confidenceScore: number;
    gardenHealthScore: number;
  };
  treatmentPlan: TreatmentPlan;
  productRecommendations: RecommendedProduct[];
  recoveryKit: RecommendedProduct[];
  frequentlyBoughtTogether: RecommendedProduct[];
  relatedProducts: RecommendedProduct[];
  refillReminders: RefillReminder[];
  assistantMessage: string;
  lowHealthMessage?: string;
};

const careKeywords = {
  pest: ["pest", "pesticide", "insect", "neem", "spray", "mite", "aphid", "medicine"],
  disease: ["fungal", "fungicide", "disease", "medicine", "copper", "bio", "treatment", "spray"],
  deficiency: ["fertilizer", "nutrition", "npk", "compost", "manure", "micronutrient", "plant food"],
  soil: ["soil", "compost", "cocopeat", "manure", "potting", "vermi"],
  water: ["moisture", "irrigation", "watering", "water", "meter"],
  plantFood: ["plant food", "fertilizer", "nutrition", "booster"]
};

function textIncludes(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function money(value: unknown) {
  return `Rs. ${Number(value ?? 0).toLocaleString("en-IN")}`;
}

function recoveryTime(severity: PlantDiagnosisOutput["severity"]) {
  if (severity === "CRITICAL") return "21-30 days with expert monitoring";
  if (severity === "HIGH") return "14-21 days with weekly follow-up";
  if (severity === "MEDIUM") return "7-14 days with consistent care";
  return "3-7 days with light correction";
}

function problemType(diagnosis: PlantDiagnosisOutput): RecommendationEngineResult["diagnosisResult"]["problemType"] {
  const disease = diagnosis.diseaseName.toLowerCase();
  const pest = diagnosis.pestName.toLowerCase();
  const summary = diagnosis.summary.toLowerCase();
  if (diagnosis.pestProbability >= 0.35 && !pest.includes("no visible") && !pest.includes("none")) return "Pest";
  if (disease.includes("deficien") || summary.includes("deficien") || summary.includes("nutrition")) return "Deficiency";
  if (diagnosis.diseaseProbability >= 0.35 && !disease.includes("healthy") && !disease.includes("none")) return "Disease";
  return "Plant Stress";
}

function problemDetected(diagnosis: PlantDiagnosisOutput) {
  const type = problemType(diagnosis);
  if (type === "Pest") return diagnosis.pestName;
  if (type === "Disease") return diagnosis.diseaseName;
  if (type === "Deficiency") return "Nutrient deficiency risk";
  return "Plant stress pattern";
}

function buildTreatmentPlan(input: PlantDiagnosisInput, diagnosis: PlantDiagnosisOutput): TreatmentPlan {
  const detected = problemDetected(diagnosis);
  const recovery = recoveryTime(diagnosis.severity);
  return {
    problemDetected: detected,
    reason: `${input.plantName} shows ${detected.toLowerCase()} signals in a ${input.environment.toLowerCase()} setting. Garden Live also considered visible symptoms, disease probability, pest probability and the current health score.`,
    solution: `${diagnosis.waterRecommendation} ${diagnosis.fertilizerRecommendation} ${diagnosis.medicineRecommendation}`.trim(),
    estimatedRecoveryTime: recovery,
    today: [
      "Isolate the affected plant if symptoms are spreading.",
      diagnosis.waterRecommendation,
      "Remove badly affected leaves with clean tools and keep a photo record."
    ],
    thisWeek: [
      diagnosis.medicineRecommendation,
      diagnosis.fertilizerRecommendation,
      "Rescan the plant after 5-7 days and compare the Garden Health Score."
    ],
    thisMonth: [
      "Continue the recommended watering rhythm and avoid sudden location changes.",
      "Track new growth, leaf color and pest recurrence in the Digital Plant Passport.",
      diagnosis.expertConsultationRequired ? "Book a Garden Live expert consultation for follow-up care." : "Repeat preventive care only if symptoms return."
    ]
  };
}

function productSearchTerms(input: PlantDiagnosisInput, diagnosis: PlantDiagnosisOutput) {
  const type = problemType(diagnosis);
  const terms = new Set<string>([input.plantName.toLowerCase(), input.environment.toLowerCase(), "plant"]);
  const membershipPlan = input.membershipPlan?.toLowerCase() ?? "";
  if (type === "Pest") careKeywords.pest.forEach((term) => terms.add(term));
  if (type === "Disease") careKeywords.disease.forEach((term) => terms.add(term));
  if (type === "Deficiency") careKeywords.deficiency.forEach((term) => terms.add(term));
  if (membershipPlan.includes("premium") || membershipPlan.includes("luxury") || membershipPlan.includes("villa") || membershipPlan.includes("dedicated")) {
    ["kit", "combo", "monitor", "meter", "premium", "booster"].forEach((term) => terms.add(term));
  }
  if (diagnosis.healthScore < 70) {
    [...careKeywords.soil, ...careKeywords.plantFood, ...careKeywords.water].forEach((term) => terms.add(term));
  }
  if (diagnosis.fertilizerRecommendation.toLowerCase().includes("fertil")) careKeywords.deficiency.forEach((term) => terms.add(term));
  if (diagnosis.medicineRecommendation.toLowerCase().includes("neem")) terms.add("neem");
  return [...terms];
}

function scoreProduct(product: StoreProduct, terms: string[], diagnosis: PlantDiagnosisOutput) {
  const haystack = `${product.name} ${product.description ?? ""} ${product.category?.name ?? ""} ${product.category?.slug ?? ""}`.toLowerCase();
  let score = product.inventory && product.inventory.stockQuantity > 0 ? 2 : -20;
  terms.forEach((term) => {
    if (haystack.includes(term)) score += 4;
  });
  if (diagnosis.healthScore < 70 && textIncludes(haystack, [...careKeywords.soil, ...careKeywords.plantFood])) score += 5;
  if (textIncludes(haystack, careKeywords.pest) && diagnosis.pestProbability >= 0.35) score += 6;
  if (textIncludes(haystack, careKeywords.disease) && diagnosis.diseaseProbability >= 0.35) score += 6;
  return score;
}

function whyProduct(product: StoreProduct, input: PlantDiagnosisInput, diagnosis: PlantDiagnosisOutput) {
  const haystack = `${product.name} ${product.description ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
  if (textIncludes(haystack, careKeywords.pest)) return `Recommended because ${input.plantName} shows pest-risk signals and this product supports targeted pest control.`;
  if (textIncludes(haystack, careKeywords.disease)) return `Recommended because the diagnosis detected ${diagnosis.diseaseName.toLowerCase()} risk and this product supports disease recovery.`;
  if (textIncludes(haystack, careKeywords.deficiency)) return "Recommended because the plant needs nutrition support and the AI report includes fertilizer guidance.";
  if (textIncludes(haystack, careKeywords.soil)) return `Recommended because soil condition influences recovery speed for ${input.environment.toLowerCase()} gardens.`;
  if (textIncludes(haystack, careKeywords.water)) return "Recommended because watering consistency is part of the recovery plan.";
  return "Recommended because it matches the Garden Live recovery plan and is available in the Garden Store.";
}

function usageWindow(product: StoreProduct): RecommendedProduct["usageWindow"] {
  const haystack = `${product.name} ${product.description ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
  if (textIncludes(haystack, [...careKeywords.disease, ...careKeywords.pest])) return "Today";
  if (textIncludes(haystack, [...careKeywords.deficiency, ...careKeywords.soil])) return "This Week";
  return "This Month";
}

function mapProduct(product: StoreProduct, input: PlantDiagnosisInput, diagnosis: PlantDiagnosisOutput): RecommendedProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category?.name ?? "Garden Live Store",
    price: money(product.salePrice ?? product.price),
    imageUrl: product.mediaFiles.find((file) => file.url.startsWith("/"))?.url ?? "/images/v4/garden-store.svg",
    stockQuantity: product.inventory?.stockQuantity ?? 0,
    whyRecommended: whyProduct(product, input, diagnosis),
    usageWindow: usageWindow(product)
  };
}

function refillReminders(recommendations: RecommendedProduct[]): RefillReminder[] {
  return recommendations
    .filter((product) => /(fertilizer|plant food|pesticide|medicine|neem|spray|nutrition)/i.test(`${product.name} ${product.category}`))
    .slice(0, 4)
    .map((product) => ({
      productType: product.name,
      reminderInDays: /(pesticide|medicine|neem|spray)/i.test(`${product.name} ${product.category}`) ? 21 : 30,
      reason: `${product.name} is part of the recovery kit, so Garden Live will remind you before the typical refill window.`
    }));
}

export async function buildRecommendationEngine(input: PlantDiagnosisInput, diagnosis: PlantDiagnosisOutput): Promise<RecommendationEngineResult> {
  const terms = productSearchTerms(input, diagnosis);
  const products = await prisma.product.findMany({
    where: {
      deletedAt: null,
      status: "ACTIVE",
      inventory: { is: { stockQuantity: { gt: 0 }, deletedAt: null } }
    },
    include: {
      category: true,
      inventory: true,
      mediaFiles: {
        where: { deletedAt: null, type: "IMAGE" },
        orderBy: { sortOrder: "asc" },
        take: 1
      }
    },
    take: 80,
    orderBy: [{ isAiRecommended: "desc" }, { updatedAt: "desc" }]
  });

  const scored = products
    .map((product) => ({ product, score: scoreProduct(product, terms, diagnosis) }))
    .filter((item) => item.score > 2)
    .sort((a, b) => b.score - a.score)
    .map((item) => mapProduct(item.product, input, diagnosis));

  const productRecommendations = scored.slice(0, 6);
  const recoveryKit = productRecommendations.slice(0, 3);
  const frequentlyBoughtTogether = productRecommendations.slice(0, 4);
  const relatedProducts = scored.slice(6, 12);
  const treatmentPlan = buildTreatmentPlan(input, diagnosis);

  return {
    diagnosisResult: {
      plantName: input.plantName,
      problemDetected: treatmentPlan.problemDetected,
      problemType: problemType(diagnosis),
      severityLevel: diagnosis.severity,
      recoveryTime: treatmentPlan.estimatedRecoveryTime,
      confidenceScore: diagnosis.confidenceScore,
      gardenHealthScore: diagnosis.healthScore
    },
    treatmentPlan,
    productRecommendations,
    recoveryKit,
    frequentlyBoughtTogether,
    relatedProducts,
    refillReminders: refillReminders(productRecommendations),
    assistantMessage: productRecommendations.length
      ? "Garden Live AI Shopping Assistant selected the recovery kit from active Garden Store inventory. Start with the first product, follow the treatment plan, and rescan after one week."
      : "Garden Live AI Shopping Assistant created a treatment plan, but no active Garden Store product matched the recovery criteria right now.",
    lowHealthMessage: diagnosis.healthScore < 70 ? "Recommended Products to Improve Your Garden." : undefined
  };
}
