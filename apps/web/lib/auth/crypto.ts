import { createHash, randomBytes } from "crypto";

export function hashToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function createNumericOtp(length = 6) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(min + Math.random() * (max - min)));
}

export function createSecureToken(bytes = 32) {
  return randomBytes(bytes).toString("hex");
}
