import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read Garden Live testimonials from customers using premium garden memberships, landscaping, maintenance, AI Plant Doctor, and QR Plant Passport services."
};

export default function TestimonialsRoutePage() {
  return <TestimonialsPage />;
}
