import type { Metadata } from "next";
import Script from "next/script";
import { SessionProvider } from "@/components/auth/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gardenlive.in"),
  title: {
    default: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
    template: "%s | Garden Live"
  },
  description:
    "Garden Live is India's First AI Powered Digital Garden Membership Platform for premium garden memberships, landscaping, plant nursery, maintenance, dedicated gardeners, AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Store, and corporate green solutions.",
  keywords: [
    "Garden Live",
    "digital garden membership",
    "garden maintenance India",
    "AI plant doctor",
    "landscaping India",
    "terrace garden",
    "vertical garden"
  ],
  openGraph: {
    title: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
    description:
      "Premium garden memberships, AI plant care, landscaping, maintenance, and curated garden store services for modern Indian homes.",
    url: "https://gardenlive.in",
    siteName: "Garden Live",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Luxury garden landscape maintained by Garden Live"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Live | India's First AI Powered Digital Garden Membership Platform",
    description:
      "AI-powered garden memberships, plant care, landscaping, maintenance, and garden commerce.",
    images: ["https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80"]
  },
  verification: {
    google: "6T4O-6LyKgBeDswZDMmPDk4y2HYdbaeZA_ESdx9QUd8"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="garden-live-google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  anonymize_ip: true,
                  page_path: window.location.pathname
                });
              `}
            </Script>
          </>
        ) : null}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
