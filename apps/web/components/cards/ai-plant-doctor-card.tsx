import * as React from "react";
import { Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIPlantDoctorCardProps {
  title?: string;
  description?: string;
  creditsLabel?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AIPlantDoctorCard({
  title = "AI Plant Doctor",
  description = "Upload a plant photo to detect disease, pests, watering issues, and care recommendations.",
  creditsLabel,
  action,
  className
}: AIPlantDoctorCardProps) {
  return (
    <article className={cn("rounded-gl border border-accent-sky bg-white p-6 shadow-glXs", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-gl bg-accent-sky text-status-info">
          <Bot className="h-6 w-6" aria-hidden />
        </div>
        {creditsLabel ? <Badge tone="info">{creditsLabel}</Badge> : null}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-botanical-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-slate">{description}</p>
      <div className="mt-5">
        {action ?? (
          <Button leftIcon={<Sparkles className="h-4 w-4" aria-hidden />}>
            Start diagnosis
          </Button>
        )}
      </div>
    </article>
  );
}
