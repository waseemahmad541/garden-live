"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Heart, Loader2, ShoppingBag, Sparkles } from "lucide-react";
import { Badge, Button } from "@/components";

type CatalogProduct = {
  id: string;
  productName: string;
  category?: { name: string } | null;
  description?: string | null;
  price: string | number;
  discountPrice?: string | number | null;
  stockQuantity: number;
  images?: Array<{ url: string; altText?: string | null }>;
  featuredProduct?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
};

type CatalogResponse = {
  ok: boolean;
  data?: {
    items: CatalogProduct[];
  };
  error?: { message?: string };
};

function visitorId() {
  const key = "garden-live-visitor-id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(key, next);
  return next;
}

function money(value: string | number | null | undefined) {
  return `Rs. ${Number(value ?? 0).toLocaleString("en-IN")}`;
}

function productImage(product: CatalogProduct) {
  const image = product.images?.[0]?.url;
  return image?.startsWith("/") ? image : "/images/v4/garden-store.svg";
}

export function RecommendedProductsPreview() {
  const [products, setProducts] = React.useState<CatalogProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/product-catalog/products?limit=4&status=ACTIVE&sortBy=updatedAt&sortOrder=desc", { cache: "no-store" });
        const payload = (await response.json().catch(() => ({}))) as CatalogResponse;
        if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Could not load Garden Live products.");
        setProducts(payload.data?.items ?? []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load Garden Live products.");
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  async function saveAction(productId: string, action: "cart" | "wishlist") {
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`/api/public/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorId(), productId, quantity: 1 })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Action failed.");
      setMessage(action === "cart" ? "Added to cart." : "Added to wishlist.");
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Action failed.");
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center rounded-[2rem] border border-white/15 bg-white/[0.06] p-12 text-white">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
        <span className="sr-only">Loading recommended products</span>
      </div>
    );
  }

  return (
    <div>
      {message ? (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-300/30 bg-emerald-300/15 p-4 text-sm font-semibold text-emerald-50">
          <CheckCircle2 className="h-4 w-4" aria-hidden />
          {message}
        </div>
      ) : null}
      {error ? (
        <p className="mb-5 rounded-2xl border border-red-300/30 bg-red-300/15 p-4 text-sm font-semibold text-red-50">{error}</p>
      ) : null}

      {products.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
              <Link href={`/garden-store/${product.id}`} className="relative block h-56 overflow-hidden" aria-label={`View ${product.productName}`}>
                <Image src={productImage(product)} alt={product.productName} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  {product.bestseller ? <Badge tone="premium">Bestseller</Badge> : null}
                  {product.newArrival ? <Badge tone="info">New</Badge> : null}
                  {!product.bestseller && !product.newArrival ? <Badge tone="success">Recommended</Badge> : null}
                </div>
              </Link>
              <div className="p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{product.category?.name ?? "Garden Live Store"}</p>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
                  <Link href={`/garden-store/${product.id}`} className="transition hover:text-lime-200">
                    {product.productName}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">
                  {product.description ?? "Recommended for plant recovery, nutrition and premium garden care."}
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-semibold">{money(product.discountPrice ?? product.price)}</p>
                    {product.discountPrice ? <p className="text-sm text-white/45 line-through">{money(product.price)}</p> : null}
                  </div>
                  <p className="text-xs font-semibold text-white/55">{product.stockQuantity > 0 ? "In stock" : "Out of stock"}</p>
                </div>
                <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                  <Button type="button" onClick={() => saveAction(product.id, "cart")} leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>
                    Add to Cart
                  </Button>
                  <Button type="button" variant="secondary" size="icon" onClick={() => saveAction(product.id, "wishlist")} aria-label={`Add ${product.productName} to wishlist`}>
                    <Heart className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/[0.06] p-8 text-center text-white">
          <Sparkles className="mx-auto h-8 w-8 text-lime-200" aria-hidden />
          <p className="mt-3 text-xl font-semibold">Recommended products will appear here.</p>
          <p className="mt-2 text-sm text-white/60">Add active products in the Garden Live catalog to power this shelf.</p>
        </div>
      )}
    </div>
  );
}
