"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";
import { readJsonResponse, responseErrorMessage } from "@/lib/http/safe-json";

type ForgotPasswordResponse = Record<string, unknown> & {
  error?: unknown;
  message?: string;
  devResetToken?: string;
};

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/password/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") })
    });
    const data = await readJsonResponse<ForgotPasswordResponse>(response);
    setLoading(false);
    if (!response.ok) {
      setMessage({ type: "error", text: responseErrorMessage(data.error, "Could not create reset link.") });
      return;
    }
    const dev = data.devResetToken ? ` Dev reset token: ${data.devResetToken}` : "";
    setMessage({ type: "success", text: `${data.message}${dev}` });
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Recovery</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Reset your password</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">We will create a secure, short-lived reset token for your account.</p>
      </div>
      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="email" type="email" label="Email" required leftIcon={<Mail className="h-4 w-4" />} />
        <Button type="submit" className="w-full" size="lg" isLoading={loading}>Send reset link</Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        Remembered it? <Link href="/login" className="font-semibold text-botanical-green">Back to login</Link>
      </p>
    </div>
  );
}
