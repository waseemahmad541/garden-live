"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sprout, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function Navbar({ items, ctaLabel = "Get Started", ctaHref = "/login", className }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn("sticky top-0 z-40 border-b border-[#E3E8E2] bg-white/90 backdrop-blur-xl", className)}>
      <div className="gl-container flex h-16 items-center justify-between">
        <Link href="/" className="gl-focus-ring inline-flex items-center gap-2 rounded-gl" aria-label="Garden Live home">
          <span className="flex h-9 w-9 items-center justify-center rounded-gl bg-botanical-green text-white">
            <Sprout className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-base font-semibold text-botanical-black">Garden Live</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="gl-focus-ring rounded-md text-sm font-medium text-neutral-slate transition hover:text-botanical-black">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="secondary" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[#E3E8E2] px-4">
            <span className="inline-flex items-center gap-2 text-base font-semibold text-botanical-black">
              <Sprout className="h-5 w-5 text-botanical-green" aria-hidden />
              Garden Live
            </span>
            <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" aria-hidden />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-5" aria-label="Mobile navigation">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-gl px-3 py-3 text-base font-medium text-botanical-black hover:bg-neutral-cloud"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-3">
              <Button variant="secondary" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
