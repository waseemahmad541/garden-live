import type { Metadata } from "next";
import { ContactPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Garden Live for garden memberships, landscaping, plant nursery, maintenance, dedicated gardeners, AI Plant Doctor, corporate solutions, and visits."
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
