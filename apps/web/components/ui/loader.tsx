import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  label?: string;
  variant?: "default" | "ai" | "skeleton";
  className?: string;
}

export function Loader({ label = "Loading", variant = "default", className }: LoaderProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse space-y-3", className)} aria-label={label} role="status">
        <div className="h-4 w-2/3 rounded bg-neutral-mist" />
        <div className="h-20 rounded-gl bg-neutral-mist" />
        <div className="h-4 w-1/2 rounded bg-neutral-mist" />
      </div>
    );
  }

  const Icon = variant === "ai" ? Sparkles : Loader2;

  return (
    <div className={cn("flex items-center justify-center gap-2 text-sm font-medium text-neutral-slate", className)} role="status">
      <Icon className={cn("h-5 w-5", variant === "default" && "animate-spin", variant === "ai" && "text-accent-iris")} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
