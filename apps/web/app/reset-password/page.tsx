import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Garden Live password with a secure token."
};

export default function ResetPasswordPage({ searchParams }: { searchParams?: { token?: string } }) {
  return (
    <AuthShell
      eyebrow="Password reset"
      title="Create a fresh password for your account."
      description="Tokens are verified server-side, consumed once, and stored only as hashes in PostgreSQL."
    >
      <ResetPasswordForm token={searchParams?.token} />
    </AuthShell>
  );
}
