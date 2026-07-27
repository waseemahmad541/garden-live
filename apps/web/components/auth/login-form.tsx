"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";
import { readJsonResponse, responseErrorMessage } from "@/lib/http/safe-json";

export function LoginForm({ callbackUrl = "/customer/dashboard" }: { callbackUrl?: string }) {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [devOtp, setDevOtp] = useState("");

  async function handleEmailLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    try {
      const result = await signIn("email-password", {
        email: form.get("email"),
        password: form.get("password"),
        redirect: false,
        callbackUrl
      });
      setLoading(false);
      if (result?.error) {
        setMessage({ type: "error", text: "Email or password is incorrect." });
        return;
      }
      window.location.href = result?.url ?? callbackUrl;
    } catch {
      setLoading(false);
      setMessage({ type: "error", text: "Login is temporarily unavailable. Please try again." });
      return;
    }
  }

  async function requestOtp(phone: string) {
    const response = await fetch("/api/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, purpose: "LOGIN" })
    });
    const data = await readJsonResponse<{ error?: unknown; message?: string; devOtp?: string }>(response);
    if (!response.ok) throw new Error(responseErrorMessage(data.error, "Could not send OTP."));
    setDevOtp(data.devOtp ?? "");
    setMessage({ type: "success", text: data.devOtp ? `OTP sent. Dev OTP: ${data.devOtp}` : "OTP sent." });
  }

  async function handleOtpLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") ?? "");
    const code = String(form.get("code") ?? "");

    if (!code) {
      try {
        await requestOtp(phone);
      } catch (error) {
        setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not send OTP." });
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const result = await signIn("phone-otp", { phone, code, redirect: false, callbackUrl });
      setLoading(false);
      if (result?.error) {
        setMessage({ type: "error", text: "OTP is invalid or expired." });
        return;
      }
      window.location.href = result?.url ?? callbackUrl;
    } catch {
      setLoading(false);
      setMessage({ type: "error", text: "OTP login is temporarily unavailable. Please try again." });
      return;
    }
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Secure access</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to Garden Live</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">Manage memberships, gardens, plant passports, visits, and support.</p>
      </div>

      <div className="mb-5 grid grid-cols-2 rounded-gl bg-neutral-cloud p-1">
        <button type="button" onClick={() => setMode("email")} className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "email" ? "bg-white shadow-glXs" : "text-neutral-slate"}`}>
          Email
        </button>
        <button type="button" onClick={() => setMode("phone")} className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "phone" ? "bg-white shadow-glXs" : "text-neutral-slate"}`}>
          OTP
        </button>
      </div>

      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}

      {mode === "email" ? (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input name="email" type="email" label="Email" autoComplete="email" required leftIcon={<Mail className="h-4 w-4" />} />
          <Input name="password" type="password" label="Password" autoComplete="current-password" required />
          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="font-semibold text-botanical-green">Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full" size="lg" isLoading={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>Login</Button>
        </form>
      ) : (
        <form onSubmit={handleOtpLogin} className="space-y-4">
          <Input name="phone" type="tel" label="Phone number" autoComplete="tel" required leftIcon={<Phone className="h-4 w-4" />} />
          <Input name="code" inputMode="numeric" label="OTP code" placeholder={devOtp || "Enter after requesting OTP"} maxLength={6} />
          <Button type="submit" className="w-full" size="lg" isLoading={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>Continue with OTP</Button>
        </form>
      )}

      <Button type="button" variant="secondary" className="mt-4 w-full" onClick={() => signIn("google", { callbackUrl })}>
        Continue with Google
      </Button>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        New to Garden Live? <Link href="/register" className="font-semibold text-botanical-green">Create an account</Link>
      </p>
    </div>
  );
}
