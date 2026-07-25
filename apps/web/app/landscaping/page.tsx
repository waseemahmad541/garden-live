import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Landscaping Services",
  description: "Premium Garden Live landscaping for homes, villas, offices, campuses, tenders, and institutions with survey, design, quotation, execution, and maintenance."
};

export default function LandscapingPage() {
  return <PublicPage config={pageConfigs.landscaping} />;
}
