import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a secure Garden Live customer account."
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join Garden Live"
      title="Start your digital garden membership journey."
      description="Create a customer account with protected credentials, verification tokens, and role-based dashboard access."
    >
      <RegisterForm />
    </AuthShell>
  );
}
