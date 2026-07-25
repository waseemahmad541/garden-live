import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "AI Plant Doctor",
  description: "Garden Live AI Plant Doctor scans plant photos for disease, pests, water needs, fertilizer recommendations, medicines, health scores, and expert consultation."
};

export default function AIPlantDoctorPage() {
  return <PublicPage config={pageConfigs["ai-plant-doctor"]} />;
}
