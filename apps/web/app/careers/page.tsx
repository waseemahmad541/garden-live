import type { Metadata } from "next";
import { CareersPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Garden Live and help build India's AI powered digital garden membership platform."
};

export default function CareersRoutePage() {
  return <CareersPage />;
}
