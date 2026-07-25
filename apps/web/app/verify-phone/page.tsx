import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyPhoneForm } from "@/components/auth/verify-phone-form";

export const metadata: Metadata = {
  title: "Verify Phone",
  description: "Verify your Garden Live phone number with OTP."
};

export default function VerifyPhonePage() {
  return (
    <AuthShell
      eyebrow="OTP verification"
      title="Confirm the phone number used for field coordination."
      description="Phone verification supports visit coordination, gardener updates, support escalations, and secure OTP access."
    >
      <VerifyPhoneForm />
    </AuthShell>
  );
}
