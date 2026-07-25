import type { Metadata } from "next";
import { AboutPublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "About Garden Live",
  description: "Learn about Garden Live, India's AI-powered digital garden membership platform for premium garden care, landscaping, plant health, and Green Promise service."
};

export default function AboutPage() {
  return <AboutPublicPage />;
}
