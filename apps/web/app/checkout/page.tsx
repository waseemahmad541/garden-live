import type { Metadata } from "next";
import { CheckoutWorkspace } from "@/components/platform/checkout-workspace";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Garden Live nursery store cart and checkout with Razorpay and Stripe ready payment payloads, GST totals, delivery readiness, and member commerce flows.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CheckoutPage() {
  return <CheckoutWorkspace />;
}
