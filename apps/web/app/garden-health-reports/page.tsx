import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Garden Health Reports",
  description: "Garden Live Garden Health Reports combine garden health score, plant health score, soil reports, water reports, visit completion, pest risk, AI recommendations, and supervisor review."
};

export default function GardenHealthReportsPage() {
  return <PublicPage config={pageConfigs["garden-health-reports"]} />;
}
