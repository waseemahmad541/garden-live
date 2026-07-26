"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";
import { readJsonResponse } from "@/lib/http/safe-json";

export function VerifyPhoneForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function requestOtp(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    const phone = form ? new FormData(form).get("phone") : "";
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, purpose: "PHONE_VERIFICATION" })
    });
    const data = await readJsonResponse<{ error?: string; message?: string; devOtp?: string }>(response);
    setLoading(false);
    setMessage({
      type: response.ok ? "success" : "error",
      text: response.ok && data.devOtp ? `OTP sent. Dev OTP: ${data.devOtp}` : data.message ?? data.error ?? "Could not send OTP."
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/phone/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: form.get("phone"), otp: form.get("otp") })
    });
    const data = await readJsonResponse<{ error?: string; message?: string }>(response);
    setLoading(false);
    setMessage({ type: response.ok ? "success" : "error", text: data.message ?? data.error ?? "Could not verify phone." });
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Phone verification</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Verify your phone</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">Use a short-lived OTP to confirm your Garden Live mobile number.</p>
      </div>
      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="phone" type="tel" label="Phone number" required leftIcon={<Phone className="h-4 w-4" />} />
        <Input name="otp" inputMode="numeric" label="OTP code" maxLength={6} required />
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" isLoading={loading} onClick={requestOtp}>Send OTP</Button>
          <Button type="submit" isLoading={loading}>Verify</Button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        Already verified? <Link href="/login" className="font-semibold text-botanical-green">Login</Link>
      </p>
    </div>
  );
}
