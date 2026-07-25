import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Plant Nursery",
  description: "Garden Live plant nursery for indoor plants, palms, fruit plants, shrubs, creepers, ground cover, topiary, flowering plants, and project supply."
};

export default function PlantNurseryPage() {
  return <PublicPage config={pageConfigs["plant-nursery"]} />;
}
