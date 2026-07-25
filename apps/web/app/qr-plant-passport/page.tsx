import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "QR Plant Passport",
  description: "Garden Live QR Plant Passport stores plant details, care timeline, warranty, growth history, AI diagnosis reports, replacement eligibility, and scan history."
};

export default function QRPlantPassportPage() {
  return <PublicPage config={pageConfigs["qr-plant-passport"]} />;
}
