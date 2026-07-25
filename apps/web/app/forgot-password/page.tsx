import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Recover your Garden Live account password securely."
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Recover access without weakening security."
      description="Password reset requests create hashed, expiring tokens so account recovery remains clean and auditable."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
