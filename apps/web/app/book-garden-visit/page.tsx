import type { Metadata } from "next";
import { ContactPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Book Garden Visit",
  description: "Book a Garden Live visit for free garden survey, landscaping consultation, plant nursery support, maintenance visit, dedicated gardener, AI Plant Doctor, or corporate solutions."
};

export default function BookGardenVisitPage() {
  return <ContactPage booking />;
}
