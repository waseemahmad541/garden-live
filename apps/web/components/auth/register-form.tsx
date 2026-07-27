"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";
import { readJsonResponse, responseErrorMessage } from "@/lib/http/safe-json";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        password: form.get("password")
      })
    });
    const data = await readJsonResponse<{ error?: unknown; message?: string; devEmailToken?: string; devPhoneOtp?: string }>(response);
    setLoading(false);
    if (!response.ok) {
      setMessage({ type: "error", text: responseErrorMessage(data.error, "Could not create your account.") });
      return;
    }
    const dev = data.devEmailToken || data.devPhoneOtp ? ` Dev email token: ${data.devEmailToken ?? "-"} | Dev phone OTP: ${data.devPhoneOtp ?? "-"}` : "";
    setMessage({ type: "success", text: `${data.message}${dev}` });
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Customer onboarding</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Create your Garden Live account</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">Public registration creates a Customer role. Team and partner roles stay admin-controlled.</p>
      </div>
      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Full name" required leftIcon={<UserRound className="h-4 w-4" />} />
        <Input name="email" type="email" label="Email" autoComplete="email" required leftIcon={<Mail className="h-4 w-4" />} />
        <Input name="phone" type="tel" label="Phone number" autoComplete="tel" required leftIcon={<Phone className="h-4 w-4" />} />
        <Input name="password" type="password" label="Password" autoComplete="new-password" helperText="Use at least 8 characters." required />
        <Button type="submit" className="w-full" size="lg" isLoading={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>Create account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        Already have an account? <Link href="/login" className="font-semibold text-botanical-green">Login</Link>
      </p>
    </div>
  );
}
