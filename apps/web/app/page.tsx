import type { Metadata } from "next";
import { HomePublicPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  metadataBase: new URL("https://gardenlive.in"),
  title: {
    default: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
    template: "%s | Garden Live"
  },
  description:
    "Book premium garden memberships, AI Plant Doctor, landscaping, plant nursery, garden maintenance, dedicated gardeners, QR Plant Passport, Garden Store, and corporate greenery with Garden Live.",
  keywords: [
    "Garden Live",
    "AI Plant Doctor India",
    "digital garden membership",
    "luxury landscaping India",
    "garden maintenance",
    "QR Plant Passport",
    "plant nursery",
    "smart garden IoT"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
    description:
      "A premium AI-powered garden membership platform for luxury landscaping, smart maintenance, QR Plant Passport, plant nursery and Garden Store.",
    url: "https://gardenlive.in",
    siteName: "Garden Live",
    images: [
      {
        url: "/images/v4/hero-garden.svg",
        width: 1200,
        height: 630,
        alt: "Garden Live luxury AI garden membership platform"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Live | AI Powered Digital Garden Membership",
    description: "Premium landscaping, memberships, AI Plant Doctor, QR Plant Passport and smart garden care.",
    images: ["/images/v4/hero-garden.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Garden Live",
    url: "https://gardenlive.in",
    logo: "https://gardenlive.in/images/v4/hero-garden.svg",
    description:
      "India's First AI Powered Digital Garden Membership Platform for luxury landscaping, garden maintenance, AI Plant Doctor, QR Plant Passport and premium plant nursery services.",
    areaServed: "IN",
    sameAs: ["https://gardenlive.in"],
    makesOffer: [
      "Garden Membership",
      "AI Plant Doctor",
      "Luxury Landscaping",
      "Garden Maintenance",
      "Plant Nursery",
      "QR Plant Passport"
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomePublicPage />
    </>
  );
}
