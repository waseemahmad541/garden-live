import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, actionLabel, className }: FeatureCardProps) {
  return (
    <article className={cn("rounded-gl border border-[#E3E8E2] bg-white p-5 shadow-glXs transition hover:-translate-y-0.5 hover:shadow-glSm", className)}>
      {icon ? <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-gl bg-botanical-mint text-botanical-green">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-botanical-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-slate">{description}</p>
      {actionLabel ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-botanical-green">
          {actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
    </article>
  );
}
