import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  media?: React.ReactNode;
  className?: string;
}

export function HeroSection({ eyebrow, title, description, primaryAction, secondaryAction, media, className }: HeroSectionProps) {
  return (
    <section className={cn("overflow-hidden bg-neutral-cloud py-16 sm:py-20 lg:py-24", className)}>
      <div className="gl-container grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          {eyebrow ? <Badge tone="premium">{eyebrow}</Badge> : null}
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[0] text-botanical-black sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-slate sm:text-lg">{description}</p>
          {(primaryAction || secondaryAction) ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryAction}
              {secondaryAction}
            </div>
          ) : null}
        </div>
        {media ? <div className="min-h-[280px]">{media}</div> : null}
      </div>
    </section>
  );
}
