import { ApiError } from "@/lib/api/errors";
import { hmacSha256, providerFetch, requiredEnv, safeEqual } from "@/lib/platform/providers";

export type PaymentProviderName = "RAZORPAY" | "STRIPE";

export async function createRazorpayOrder(input: { amountInPaise: number; currency: string; receipt: string; notes?: Record<string, string> }) {
  const keyId = requiredEnv("RAZORPAY_KEY_ID");
  const keySecret = requiredEnv("RAZORPAY_KEY_SECRET");
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  return providerFetch<{ id: string; amount: number; currency: string; status: string }>(
    "https://api.razorpay.com/v1/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: input.amountInPaise,
        currency: input.currency,
        receipt: input.receipt,
        notes: input.notes ?? {}
      })
    },
    "razorpay"
  );
}

export async function createStripeCheckoutSession(input: {
  amountInPaise: number;
  currency: string;
  reference: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const secret = requiredEnv("STRIPE_SECRET_KEY");
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", input.successUrl);
  body.set("cancel_url", input.cancelUrl);
  body.set("client_reference_id", input.reference);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", input.currency.toLowerCase());
  body.set("line_items[0][price_data][unit_amount]", String(input.amountInPaise));
  body.set("line_items[0][price_data][product_data][name]", input.description);

  return providerFetch<{ id: string; url: string; payment_status?: string }>(
    "https://api.stripe.com/v1/checkout/sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    },
    "stripe"
  );
}

export function verifyRazorpayPayment(input: { orderId: string; paymentId: string; signature: string }) {
  const secret = requiredEnv("RAZORPAY_KEY_SECRET");
  const expected = hmacSha256(`${input.orderId}|${input.paymentId}`, secret);
  if (!safeEqual(expected, input.signature)) {
    throw new ApiError(401, "Invalid Razorpay payment signature.", "INVALID_RAZORPAY_SIGNATURE");
  }
}
