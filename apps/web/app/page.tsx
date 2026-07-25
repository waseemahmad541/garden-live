import type { Metadata } from "next";
import { HomePublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Garden Live | AI-Powered Digital Garden Membership Platform",
  description: "Book premium garden services, memberships, AI Plant Doctor, plant scanner, landscaping, nursery supply, maintenance, corporate greenery, and visits with Garden Live."
};

export default function HomePage() {
  return <HomePublicPage />;
}
