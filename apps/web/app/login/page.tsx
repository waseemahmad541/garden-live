import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Secure login for Garden Live customers, admins, supervisors, gardeners, and partners."
};

export default function LoginPage({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  return (
    <AuthShell
      eyebrow="Garden Live Platform"
      title="One secure identity for every garden workflow."
      description="Access memberships, maintenance, QR plant passports, AI reports, orders, visits, and enterprise operations through role-aware authentication."
    >
      <LoginForm callbackUrl={searchParams?.callbackUrl} />
    </AuthShell>
  );
}
