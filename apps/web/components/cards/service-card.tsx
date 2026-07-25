import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  className?: string;
}

export function ServiceCard({ icon, title, description, features = [], className }: ServiceCardProps) {
  return (
    <article className={cn("rounded-gl border border-[#E3E8E2] bg-white p-6", className)}>
      <div className="flex items-start gap-4">
        {icon ? <div className="flex h-11 w-11 flex-none items-center justify-center rounded-gl bg-botanical-mint text-botanical-green">{icon}</div> : null}
        <div>
          <h3 className="text-lg font-semibold text-botanical-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-slate">{description}</p>
        </div>
      </div>
      {features.length ? (
        <ul className="mt-5 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-neutral-slate">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-status-success" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
