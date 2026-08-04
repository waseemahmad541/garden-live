"use client";

import * as React from "react";
import { CheckCircle2, Heart, Share2, ShoppingBag } from "lucide-react";
import { Button } from "@/components";

type ApiResponse = {
  ok?: boolean;
  data?: { url?: string };
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

export function ProductDetailActions({ productId }: { productId: string }) {
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function saveAction(action: "cart" | "wishlist") {
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`/api/public/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorId(), productId, quantity: 1 })
      });
      const payload = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Action failed.");
      setMessage(action === "cart" ? "Added to cart." : "Added to wishlist.");
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Action failed.");
    }
  }

  async function share() {
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/product-catalog/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });
      const payload = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Could not create share link.");
      const shareUrl = payload.data?.url;
      if (!shareUrl) throw new Error("Could not create share link.");
      await navigator.clipboard.writeText(shareUrl);
      setMessage("Share link copied.");
    } catch (shareError) {
      setError(shareError instanceof Error ? shareError.message : "Could not create share link.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Button type="button" onClick={() => saveAction("cart")} leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>Add to Cart</Button>
        <Button type="button" variant="secondary" onClick={() => saveAction("wishlist")} leftIcon={<Heart className="h-4 w-4" aria-hidden />}>Wishlist</Button>
        <Button type="button" variant="secondary" onClick={share} leftIcon={<Share2 className="h-4 w-4" aria-hidden />}>Share</Button>
      </div>
      {message ? <p className="flex items-center gap-2 rounded-2xl bg-botanical-mint p-3 text-sm font-semibold text-botanical-green"><CheckCircle2 className="h-4 w-4" aria-hidden />{message}</p> : null}
      {error ? <p className="rounded-2xl bg-[#FBE7E5] p-3 text-sm font-semibold text-status-error">{error}</p> : null}
    </div>
  );
}
