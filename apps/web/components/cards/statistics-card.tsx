import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function StatisticsCard({ label, value, trend, trendDirection = "neutral", icon, className }: StatisticsCardProps) {
  const TrendIcon = trendDirection === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <article className={cn("rounded-gl border border-[#E3E8E2] bg-white p-5 shadow-glXs", className)}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-neutral-slate">{label}</p>
        {icon ? <div className="flex h-9 w-9 items-center justify-center rounded-gl bg-neutral-cloud text-botanical-green">{icon}</div> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums text-botanical-black">{value}</p>
      {trend ? (
        <p
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-sm font-semibold",
            trendDirection === "up" && "text-status-success",
            trendDirection === "down" && "text-status-error",
            trendDirection === "neutral" && "text-neutral-slate"
          )}
        >
          {trendDirection !== "neutral" ? <TrendIcon className="h-4 w-4" aria-hidden /> : null}
          {trend}
        </p>
      ) : null}
    </article>
  );
}
