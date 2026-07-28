import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Garden Live refund policy for bookings, memberships, nursery products, store orders and service requests."
};

export default function RefundPolicyPage() {
  return <PolicyPage type="refund-policy" />;
}
