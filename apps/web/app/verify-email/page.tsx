import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify the email address on your Garden Live account."
};

export default function VerifyEmailPage({ searchParams }: { searchParams?: { token?: string } }) {
  return (
    <AuthShell
      eyebrow="Email trust"
      title="Confirm your Garden Live email address."
      description="Email verification prepares the platform for receipts, visit reports, project updates, and security alerts."
    >
      <VerifyEmailForm token={searchParams?.token} />
    </AuthShell>
  );
}
