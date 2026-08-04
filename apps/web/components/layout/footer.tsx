import Image from "next/image";
import Link from "next/link";
import { Download, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/public/newsletter-form";

interface FooterLinkGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface FooterProps {
  groups: FooterLinkGroup[];
}

export function Footer({ groups }: FooterProps) {
  return (
    <footer className="bg-botanical-black text-white">
      <div className="gl-container grid gap-10 py-12 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <Image src="/images/logos/garden-live-logo.svg" alt="Garden Live" width={260} height={65} className="h-auto w-56 rounded-2xl" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            India&apos;s First AI Powered Digital Garden Membership Platform for premium landscaping, plant care, maintenance, and green commerce.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link href="tel:+919999999999" className="flex items-center gap-2 transition hover:text-white"><Phone className="h-4 w-4" aria-hidden />Call Garden Live</Link>
            <Link href="https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit" className="flex items-center gap-2 transition hover:text-white"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp Garden Live</Link>
            <Link href="mailto:hello@gardenlive.in" className="flex items-center gap-2 transition hover:text-white"><Mail className="h-4 w-4" aria-hidden />hello@gardenlive.in</Link>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />India, multi-city ready</span>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="gl-container grid gap-4 py-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold">Stay close to smarter gardens.</p>
            <p className="mt-1 text-sm text-white/55">Get Garden Live updates, plant care notes, offers, and launch alerts.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="gl-container flex flex-col gap-3 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Garden Live. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
            <Link href="/refund-policy" className="transition hover:text-white">Refund</Link>
            <Link href="/shipping-policy" className="transition hover:text-white">Shipping</Link>
            <Link href="/careers" className="inline-flex items-center gap-1 transition hover:text-white"><Download className="h-3.5 w-3.5" aria-hidden />Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
