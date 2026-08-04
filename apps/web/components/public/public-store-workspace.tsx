"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Heart, Loader2, Search, Share2, ShoppingBag } from "lucide-react";
import { Badge, Button, Input, SectionHeading } from "@/components";

type CatalogProduct = {
  id: string;
  productName: string;
  sku: string;
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
    pagination: { page: number; total: number; totalPages: number };
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

export function PublicStoreWorkspace() {
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<CatalogProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function loadProducts(search = query) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "24", status: "ACTIVE" });
      if (search.trim()) params.set("search", search.trim());
      const response = await fetch(`/api/product-catalog/products?${params.toString()}`, { cache: "no-store" });
      const payload = (await response.json().catch(() => ({}))) as CatalogResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Could not load products.");
      setProducts(payload.data?.items ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadProducts("");
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
      setMessage(action === "cart" ? "Product added to cart." : "Product added to wishlist.");
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Action failed.");
    }
  }

  async function shareProduct(productId: string) {
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/product-catalog/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Could not create share link.");
      const shareUrl = payload.data?.url as string;
      await navigator.clipboard.writeText(shareUrl);
      setMessage("Product share link copied.");
    } catch (shareError) {
      setError(shareError instanceof Error ? shareError.message : "Could not create share link.");
    }
  }

  return (
    <section className="py-20">
      <div className="gl-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Live Garden Store"
            title="Search plants, tools, medicines and premium garden products."
            description="Products are loaded from the Garden Live PostgreSQL catalog. Cart and wishlist actions are saved for public visitors."
          />
          <form
            className="flex rounded-full border border-white bg-white/85 p-1 shadow-glSm"
            onSubmit={(event) => {
              event.preventDefault();
              void loadProducts(query);
            }}
          >
            <Input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plants" className="min-w-0 border-0 bg-transparent shadow-none" />
            <Button type="submit" size="icon" aria-label="Search store">
              <Search className="h-4 w-4" aria-hidden />
            </Button>
          </form>
        </div>

        {message ? (
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-botanical-mint p-4 text-sm font-semibold text-botanical-green">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            {message}
          </div>
        ) : null}
        {error ? <p className="mt-6 rounded-2xl bg-[#FBE7E5] p-4 text-sm font-semibold text-status-error">{error}</p> : null}

        {loading ? (
          <div className="mt-12 grid place-items-center rounded-[2rem] border border-white bg-white/80 p-12">
            <Loader2 className="h-8 w-8 animate-spin text-botanical-green" aria-hidden />
          </div>
        ) : products.length ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_18px_60px_rgba(16,67,38,0.08)] transition hover:-translate-y-1">
                <div className="relative h-64">
                  <Link href={`/garden-store/${product.id}`} aria-label={`View ${product.productName}`}>
                    <Image src={productImage(product)} alt={product.productName} fill sizes="(min-width: 1280px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </Link>
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {product.bestseller ? <Badge tone="premium">Bestseller</Badge> : null}
                    {product.newArrival ? <Badge tone="info">New</Badge> : null}
                  </div>
                  <button type="button" onClick={() => saveAction(product.id, "wishlist")} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-botanical-green shadow-glSm" aria-label={`Add ${product.productName} to wishlist`}>
                    <Heart className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-stone">{product.category?.name ?? "Garden Live"}</p>
                  <h2 className="mt-2 line-clamp-2 text-xl font-semibold">
                    <Link href={`/garden-store/${product.id}`} className="transition hover:text-botanical-green">
                      {product.productName}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-slate">{product.description ?? "Premium Garden Live catalog product."}</p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-semibold">{money(product.discountPrice ?? product.price)}</p>
                      {product.discountPrice ? <p className="text-sm text-neutral-stone line-through">{money(product.price)}</p> : null}
                    </div>
                    <p className="text-xs font-semibold text-neutral-slate">{product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <Button type="button" onClick={() => saveAction(product.id, "cart")} className="col-span-2" leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>
                      Add
                    </Button>
                    <Button type="button" variant="secondary" size="icon" onClick={() => shareProduct(product.id)} aria-label={`Share ${product.productName}`}>
                      <Share2 className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-dashed border-botanical-green/25 bg-white/80 p-8 text-center">
            <p className="text-xl font-semibold">No products found.</p>
            <p className="mt-2 text-sm text-neutral-slate">Try a different plant, category or product name.</p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/checkout">Go to Checkout</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/book-garden-visit">Book Store Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
