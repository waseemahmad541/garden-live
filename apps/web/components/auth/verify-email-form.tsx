"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";

export function VerifyEmailForm({ token = "" }: { token?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/email/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: form.get("token") })
    });
    const data = await response.json();
    setLoading(false);
    setMessage({ type: response.ok ? "success" : "error", text: data.message ?? data.error ?? "Could not verify email." });
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Email verification</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Verify your email</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">Confirm the email linked to your Garden Live account.</p>
      </div>
      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="token" label="Verification token" defaultValue={token} required />
        <Button type="submit" className="w-full" size="lg" isLoading={loading}>Verify email</Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        Need a new link? <Link href="/forgot-password" className="font-semibold text-botanical-green">Use account recovery</Link>
      </p>
    </div>
  );
}
