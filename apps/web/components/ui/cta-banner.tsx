import * as React from "react";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function CTABanner({ title, description, action, className }: CTABannerProps) {
  return (
    <div className={cn("rounded-xl bg-botanical-black px-6 py-8 text-white sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8", className)}>
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{description}</p>
      </div>
      {action ? <div className="mt-6 flex-none lg:mt-0">{action}</div> : null}
    </div>
  );
}
