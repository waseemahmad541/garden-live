import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Corporate Solutions",
  description: "Garden Live corporate solutions for offices, campuses, builders, hotels, institutions, green walls, AMC maintenance, tenders, work orders, and reporting."
};

export default function CorporateSolutionsPage() {
  return <PublicPage config={pageConfigs["corporate-solutions"]} />;
}
