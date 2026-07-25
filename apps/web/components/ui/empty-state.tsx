import * as React from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-64 flex-col items-center justify-center rounded-gl border border-dashed border-[#DDE5DC] bg-white px-6 py-10 text-center", className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-botanical-mint text-botanical-green">
        {icon ?? <Sprout className="h-6 w-6" aria-hidden />}
      </div>
      <h3 className="text-lg font-semibold text-botanical-black">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-slate">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
