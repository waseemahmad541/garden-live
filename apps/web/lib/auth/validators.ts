import type { AuthOtpPurpose } from "@prisma/client";

export function normalizeEmail(value: unknown) {
  const email = String(value ?? "").trim().toLowerCase();
  return email.includes("@") && email.includes(".") ? email : "";
}

export function normalizePhone(value: unknown) {
  const phone = String(value ?? "").replace(/[^\d+]/g, "").trim();
  return phone.length >= 10 ? phone : "";
}

export function normalizePassword(value: unknown) {
  const password = String(value ?? "");
  return password.length >= 8 ? password : "";
}

export function normalizeOtp(value: unknown) {
  const otp = String(value ?? "").replace(/\D/g, "");
  return otp.length === 6 ? otp : "";
}

export function normalizeOtpPurpose(value: unknown): AuthOtpPurpose {
  const purpose = String(value ?? "LOGIN");
  if (purpose === "PHONE_VERIFICATION") {
    return purpose;
  }
  return "LOGIN";
}
