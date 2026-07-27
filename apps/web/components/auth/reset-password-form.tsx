"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/form-message";
import { readJsonResponse, responseErrorMessage } from "@/lib/http/safe-json";

export function ResetPasswordForm({ token = "" }: { token?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: form.get("token"), password: form.get("password") })
    });
    const data = await readJsonResponse<{ error?: unknown; message?: string }>(response);
    setLoading(false);
    setMessage({
      type: response.ok ? "success" : "error",
      text: response.ok ? data.message ?? "Password reset successfully." : responseErrorMessage(data.error, "Could not reset password.")
    });
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">New password</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Secure your account</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-slate">Reset tokens are stored hashed and expire automatically.</p>
      </div>
      {message ? <div className="mb-4"><FormMessage type={message.type}>{message.text}</FormMessage></div> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="token" label="Reset token" defaultValue={token} required />
        <Input name="password" type="password" label="New password" required helperText="Use at least 8 characters." />
        <Button type="submit" className="w-full" size="lg" isLoading={loading}>Reset password</Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-slate">
        Ready to enter? <Link href="/login" className="font-semibold text-botanical-green">Login</Link>
      </p>
    </div>
  );
}
