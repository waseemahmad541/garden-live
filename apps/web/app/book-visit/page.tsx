import type { Metadata } from "next";
import { ContactPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Book a Visit",
  description: "Book a free Garden Live survey, maintenance visit, landscaping consultation, dedicated gardener consultation, or AI plant care support."
};

export default function BookVisitPage() {
  return <ContactPage booking />;
}
