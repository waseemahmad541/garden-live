import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Garden Live privacy policy for enquiries, bookings, memberships, plant photos, service records and customer data."
};

export default function PrivacyPolicyPage() {
  return <PolicyPage type="privacy-policy" />;
}
