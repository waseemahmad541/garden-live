import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MembershipCardProps {
  name: string;
  description: string;
  price: string;
  billingCycle?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  action?: React.ReactNode;
  className?: string;
}

export function MembershipCard({ name, description, price, billingCycle, features, highlighted, badge, action, className }: MembershipCardProps) {
  return (
    <article className={cn("relative rounded-gl border bg-white p-6 shadow-glXs", highlighted ? "border-botanical-green shadow-glMd" : "border-[#E3E8E2]", className)}>
      {badge ? <Badge tone={highlighted ? "premium" : "neutral"}>{badge}</Badge> : null}
      <h3 className="mt-4 text-xl font-semibold text-botanical-black">{name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-neutral-slate">{description}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="text-3xl font-semibold text-botanical-black">{price}</span>
        {billingCycle ? <span className="pb-1 text-sm text-neutral-slate">{billingCycle}</span> : null}
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm text-neutral-slate">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-status-success" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {action ?? <Button className="w-full" variant={highlighted ? "primary" : "secondary"}>Choose plan</Button>}
      </div>
    </article>
  );
}
