import type { Metadata } from "next";
import { ServicesPublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Garden Live Services",
  description: "Explore Garden Live services: landscaping, plant nursery, garden maintenance, dedicated gardener, AI Plant Doctor, plant scanner, corporate greenery, and memberships."
};

export default function ServicesPage() {
  return <ServicesPublicPage />;
}
