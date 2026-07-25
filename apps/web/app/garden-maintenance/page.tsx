import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Garden Maintenance",
  description: "Scheduled Garden Live maintenance visits with assigned gardeners, before-after photos, service reports, plant health scores, and Green Promise support."
};

export default function GardenMaintenancePage() {
  return <PublicPage config={pageConfigs["garden-maintenance"]} />;
}
