import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "error" | "info" | "premium";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-neutral-mist text-neutral-charcoal",
  success: "bg-botanical-mint text-botanical-green",
  warning: "bg-[#FFF4D8] text-[#805814]",
  error: "bg-[#FBE7E5] text-status-critical",
  info: "bg-accent-sky text-status-info",
  premium: "bg-[#FFF1CC] text-[#76531A]"
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
