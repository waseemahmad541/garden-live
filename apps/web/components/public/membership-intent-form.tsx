"use client";

import * as React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, Input } from "@/components";

const plans = [
  ["plant-care", "Plant Care"],
  ["smart-garden", "Smart Garden"],
  ["home-garden", "Home Garden"],
  ["premium-garden", "Premium Garden"],
  ["luxury-garden", "Luxury Garden"]
];

export function MembershipIntentForm() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/public/membership-intents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug: form.get("planSlug"),
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email") || undefined,
          city: form.get("city"),
          gardenType: form.get("gardenType")
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Could not save membership request.");
      setMessage(payload.data?.message ?? "Membership request saved.");
      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save membership request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl">
      <h2 className="text-2xl font-semibold">Join Garden Live Membership</h2>
      <p className="mt-2 text-sm leading-6 text-neutral-slate">Submit your plan request. Garden Live will confirm activation and payment details.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-botanical-black">
          Plan
          <select name="planSlug" className="h-11 rounded-md border border-[#D6DED2] bg-white px-3 text-sm" required defaultValue="smart-garden">
            {plans.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
          </select>
        </label>
        <Input label="Full name" name="name" required />
        <Input label="Phone" name="phone" required />
        <Input label="Email" name="email" type="email" />
        <Input label="City" name="city" required />
        <Input label="Garden type" name="gardenType" defaultValue="Home Garden" required />
      </div>
      {message ? (
        <div className="mt-4 flex gap-2 rounded-2xl bg-botanical-mint p-3 text-sm font-semibold text-botanical-green">
          <CheckCircle2 className="h-4 w-4" aria-hidden />
          {message}
        </div>
      ) : null}
      {error ? <p className="mt-4 rounded-2xl bg-[#FBE7E5] p-3 text-sm font-semibold text-status-error">{error}</p> : null}
      <Button className="mt-5 w-full" type="submit" disabled={loading} rightIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : undefined}>
        Save Membership Request
      </Button>
    </form>
  );
}
