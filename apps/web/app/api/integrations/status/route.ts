import { apiResponse } from "@/lib/api/errors";
import { channelReadiness } from "@/lib/platform/channel-status";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiResponse({
    payments: [
      {
        provider: "RAZORPAY",
        ready: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
        message: process.env.RAZORPAY_KEY_ID ? "Razorpay credentials detected." : "Razorpay credentials pending."
      },
      {
        provider: "STRIPE",
        ready: Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
        message: process.env.STRIPE_SECRET_KEY ? "Stripe credentials detected." : "Stripe credentials pending."
      }
    ],
    communications: channelReadiness(),
    maps: {
      provider: "GOOGLE_MAPS",
      ready: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
      message: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "Google Maps API key detected." : "Embedded maps work; API key pending for advanced maps."
    },
    generatedAt: new Date().toISOString()
  });
}
