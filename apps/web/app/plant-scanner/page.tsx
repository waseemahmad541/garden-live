import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Plant Scanner",
  description: "Garden Live Plant Scanner connects plant identification, AI diagnosis, QR Plant Passport, care timeline, warranty, growth history, and visit reports."
};

export default function PlantScannerPage() {
  return <PublicPage config={pageConfigs["plant-scanner"]} />;
}
