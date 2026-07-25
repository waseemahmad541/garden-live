import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Dedicated Gardener",
  description: "Hire a dedicated gardener through Garden Live for villas, societies, offices, farmhouses, campuses, and premium gardens with attendance and supervisor oversight."
};

export default function DedicatedGardenerPage() {
  return <PublicPage config={pageConfigs["dedicated-gardener"]} />;
}
