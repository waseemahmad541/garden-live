import type { Metadata } from "next";
import { pageConfigs, PublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Membership Plans",
  description: "Compare Garden Live membership plans from Plant Care to Dedicated Gardener with AI Plant Doctor credits, visit frequency, Green Promise, rewards, and benefits."
};

export default function MembershipPlansPage() {
  return <PublicPage config={pageConfigs["membership-plans"]} />;
}
