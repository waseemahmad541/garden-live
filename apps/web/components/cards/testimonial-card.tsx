import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ quote, name, role, rating = 5, className }: TestimonialCardProps) {
  return (
    <figure className={cn("rounded-gl border border-[#E3E8E2] bg-white p-6 shadow-glXs", className)}>
      <Quote className="h-6 w-6 text-botanical-leaf" aria-hidden />
      <blockquote className="mt-4 text-sm leading-6 text-neutral-charcoal">{quote}</blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-botanical-black">{name}</p>
          {role ? <p className="text-sm text-neutral-stone">{role}</p> : null}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-charcoal" aria-label={`${rating} out of 5 stars`}>
          <Star className="h-4 w-4 fill-accent-marigold text-accent-marigold" aria-hidden />
          {rating.toFixed(1)}
        </span>
      </figcaption>
    </figure>
  );
}
