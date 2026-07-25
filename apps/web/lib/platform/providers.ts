import { createHash, createHmac, timingSafeEqual } from "crypto";
import { ApiError } from "@/lib/api/errors";

export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new ApiError(503, `${name} is not configured.`, "PROVIDER_NOT_CONFIGURED");
  return value;
}

export function optionalEnv(name: string) {
  return process.env[name] || undefined;
}

export async function providerFetch<T>(url: string, init: RequestInit, provider: string): Promise<T> {
  const response = await fetch(url, init);
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new ApiError(response.status, `${provider} request failed.`, `${provider.toUpperCase()}_REQUEST_FAILED`);
  }

  return payload as T;
}

export function sha1Signature(params: Record<string, string | number>, secret: string) {
  const base = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(`${base}${secret}`).digest("hex");
}

export function hmacSha256(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  return timingSafeEqual(Buffer.from(left), Buffer.from(right));
}

export function jsonValue<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}
