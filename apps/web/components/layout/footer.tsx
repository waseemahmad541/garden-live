import Link from "next/link";
import { Sprout } from "lucide-react";

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
      <div className="gl-container grid gap-10 py-12 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-gl bg-white text-botanical-green">
              <Sprout className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-base font-semibold">Garden Live</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            AI-powered garden memberships, plant care, maintenance, and green commerce for modern homes.
          </p>
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
        <div className="gl-container flex flex-col gap-3 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Garden Live. All rights reserved.</p>
          <p>Your garden, cared for intelligently.</p>
        </div>
      </div>
    </footer>
  );
}
