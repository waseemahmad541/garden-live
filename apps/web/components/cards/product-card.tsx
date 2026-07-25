import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  rating?: number;
  badge?: string;
  className?: string;
}

export function ProductCard({ name, category, price, imageUrl, rating, badge, className }: ProductCardProps) {
  return (
    <article className={cn("overflow-hidden rounded-gl border border-[#E3E8E2] bg-white shadow-glXs", className)}>
      <div className="relative aspect-[4/3] bg-neutral-mist">
        <Image src={imageUrl} alt={name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        <Button size="icon" variant="secondary" className="absolute right-3 top-3 h-9 w-9 bg-white/90" aria-label="Add to wishlist">
          <Heart className="h-4 w-4" aria-hidden />
        </Button>
        {badge ? <Badge tone="premium" className="absolute left-3 top-3">{badge}</Badge> : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase text-neutral-stone">{category}</p>
          {rating ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-charcoal">
              <Star className="h-3.5 w-3.5 fill-accent-marigold text-accent-marigold" aria-hidden />
              {rating.toFixed(1)}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-botanical-black">{name}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-botanical-black">{price}</span>
          <Button size="sm" leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>Add</Button>
        </div>
      </div>
    </article>
  );
}
