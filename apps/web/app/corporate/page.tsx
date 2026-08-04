import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Corporate Garden Solutions | Garden Live",
  description:
    "Corporate landscaping, office plants, campus greenery, AMC maintenance and tender-ready garden services by Garden Live.",
  alternates: {
    canonical: "/corporate"
  }
};

export default function CorporatePage() {
  return <PublicPage config={pageConfigs["corporate-solutions"]} />;
}
