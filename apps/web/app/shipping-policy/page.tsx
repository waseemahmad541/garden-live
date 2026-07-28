import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Garden Live shipping policy for plants, pots, fertilizers, tools, smart garden products and nursery deliveries."
};

export default function ShippingPolicyPage() {
  return <PolicyPage type="shipping-policy" />;
}
