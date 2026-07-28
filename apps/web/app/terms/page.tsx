import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Garden Live terms for public website use, bookings, memberships, garden services and customer responsibilities."
};

export default function TermsPage() {
  return <PolicyPage type="terms" />;
}
