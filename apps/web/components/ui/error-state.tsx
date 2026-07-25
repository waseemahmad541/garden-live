import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorState({ title, description, action, className }: ErrorStateProps) {
  return (
    <div className={cn("rounded-gl border border-[#F0C6C2] bg-[#FFF9F8] px-5 py-5", className)} role="alert">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-none text-status-error" aria-hidden />
        <div>
          <h3 className="text-sm font-semibold text-status-critical">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-slate">{description}</p>
          {action ? <div className="mt-4">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}
