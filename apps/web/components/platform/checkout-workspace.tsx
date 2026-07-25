"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, Loader2, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { Badge, Button, Input } from "@/components";

const initialItems = [
  { sku: "GL-PLANT-ARECA", name: "Areca Palm - Premium Nursery Grade", quantity: 1, unitPrice: 899 },
  { sku: "GL-CARE-NEEM", name: "Neem Plant Medicine Spray", quantity: 1, unitPrice: 399 },
  { sku: "GL-POT-CERAMIC", name: "Self-Watering Ceramic Planter", quantity: 1, unitPrice: 1299 }
];

type CheckoutResult = {
  reference: string;
  provider: "RAZORPAY" | "STRIPE";
  providerReady: boolean;
  totals: {
    subtotal: number;
    gstAmount: number;
    deliveryFee: number;
    totalAmount: number;
    currency: string;
  };
};

export function CheckoutWorkspace() {
  const [items, setItems] = React.useState(initialItems);
  const [provider, setProvider] = React.useState<"RAZORPAY" | "STRIPE">("RAZORPAY");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<CheckoutResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gstAmount = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 1999 ? 0 : 99;
  const total = subtotal + gstAmount + deliveryFee;

  function quantity(sku: string, delta: number) {
    setItems((current) => current.map((item) => (item.sku === sku ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  }

  async function checkout() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          customer: {
            name: "Garden Live Customer",
            email: "customer@gardenlive.in",
            phone: "+91 99999 99999"
          },
          shippingAddress: {
            line1: "Garden Live service address",
            city: "Hyderabad",
            state: "Telangana",
            pincode: "500001"
          },
          items
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Checkout failed.");
      setResult(payload.data);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f6f0] text-botanical-black">
      <section className="bg-botanical-black text-white">
        <div className="gl-container py-16">
          <Badge tone="premium" className="bg-white/15 text-white">Nursery Store Checkout</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold sm:text-6xl">Cart and checkout for the Garden Live nursery store.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            A payment-ready checkout flow for plants, medicines, planters, fertilizers, tools, smart kits, member rewards, GST totals, and delivery readiness.
          </p>
        </div>
      </section>

      <section className="gl-container grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
        <div className="space-y-5">
          {items.map((item) => (
            <article key={item.sku} className="rounded-3xl border border-[#dfe7dc] bg-white p-5 shadow-glSm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-neutral-stone">{item.sku}</p>
                  <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm text-neutral-slate">Member pricing, GST invoice, wishlist, compare, and delivery tracking ready.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="icon" aria-label="Decrease quantity" onClick={() => quantity(item.sku, -1)}>
                    <Minus className="h-4 w-4" aria-hidden />
                  </Button>
                  <span className="min-w-8 text-center text-lg font-semibold">{item.quantity}</span>
                  <Button variant="secondary" size="icon" aria-label="Increase quantity" onClick={() => quantity(item.sku, 1)}>
                    <Plus className="h-4 w-4" aria-hidden />
                  </Button>
                  <p className="w-24 text-right text-lg font-semibold">Rs. {item.unitPrice * item.quantity}</p>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-3xl border border-[#dfe7dc] bg-white p-5 shadow-glSm">
            <h2 className="text-xl font-semibold">Customer and delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Customer" value="Garden Live Customer" readOnly />
              <Input label="Phone" value="+91 99999 99999" readOnly />
              <Input label="City" value="Hyderabad" readOnly />
              <Input label="Pincode" value="500001" readOnly />
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-[#dfe7dc] bg-white p-6 shadow-glLg">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-botanical-green" aria-hidden />
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal" value={`Rs. ${subtotal}`} />
            <Row label="GST 18%" value={`Rs. ${gstAmount}`} />
            <Row label="Delivery" value={deliveryFee ? `Rs. ${deliveryFee}` : "Free"} />
            <div className="border-t border-[#dfe7dc] pt-3">
              <Row label="Total" value={`Rs. ${total}`} strong />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {(["RAZORPAY", "STRIPE"] as const).map((item) => (
              <button
                key={item}
                className={`rounded-2xl border p-3 text-sm font-semibold ${provider === item ? "border-botanical-green bg-botanical-mint text-botanical-green" : "border-[#dfe7dc] bg-white text-neutral-slate"}`}
                onClick={() => setProvider(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <Button className="mt-5 w-full" onClick={checkout} disabled={loading} rightIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CreditCard className="h-4 w-4" aria-hidden />}>
            Create Payment
          </Button>

          {result ? (
            <div className="mt-5 rounded-2xl bg-botanical-mint p-4 text-sm text-botanical-green">
              <div className="flex gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Checkout created: {result.reference}
              </div>
              <p className="mt-2">Provider: {result.provider}. Credentials: {result.providerReady ? "ready" : "pending environment keys"}.</p>
            </div>
          ) : null}
          {error ? <p className="mt-5 rounded-2xl bg-[#FBE7E5] p-4 text-sm font-semibold text-status-error">{error}</p> : null}

          <div className="mt-6 space-y-3">
            {["Razorpay and Stripe ready", "GST totals calculated", "Delivery tracking ready", "Green Coins compatible"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-neutral-slate">
                <ShieldCheck className="h-4 w-4 text-botanical-green" aria-hidden />
                {item}
              </div>
            ))}
          </div>

          <Button asChild className="mt-5 w-full" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            <Link href="/garden-store">Continue Shopping</Link>
          </Button>
        </aside>
      </section>
    </main>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-lg font-semibold text-botanical-black" : "text-neutral-slate"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
