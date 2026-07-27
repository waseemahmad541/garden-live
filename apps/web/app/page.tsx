import type { Metadata } from "next";
import { PremiumHomePage } from "@/components/public/premium-home-page";

export const metadata: Metadata = {
  title: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
  description:
    "Book premium garden memberships, AI Plant Doctor, landscaping, plant nursery, garden maintenance, dedicated gardeners, QR Plant Passport, Garden Store, and corporate greenery with Garden Live."
};

export default function HomePage() {
  return <PremiumHomePage />;
}
