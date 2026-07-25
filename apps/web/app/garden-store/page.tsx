import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Garden Store",
  description: "Shop the Garden Live premium marketplace for plants, indoor plants, outdoor plants, palm collection, fruit plants, pots, planters, fertilizers, plant medicines, seeds, tools, smart garden kits, irrigation, and furniture."
};

export default function GardenStorePage() {
  return <PublicPage config={pageConfigs["garden-store"]} />;
}
