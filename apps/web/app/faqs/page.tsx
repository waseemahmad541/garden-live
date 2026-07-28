import type { Metadata } from "next";
import { FaqsPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Garden Live FAQs about memberships, AI Plant Doctor, QR Plant Passport, bookings, maintenance, store and Green Promise."
};

export default function FaqsRoutePage() {
  return <FaqsPage />;
}
