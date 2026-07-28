/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next-build",
  output: process.env.NEXT_OUTPUT_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["@garden-live/database"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(self), payment=(self)" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.razorpay.com https://api.stripe.com https://res.cloudinary.com; frame-src 'self' https://www.google.com https://www.google.co.in https://maps.google.com https://api.razorpay.com https://checkout.razorpay.com https://js.stripe.com; media-src 'self' https://res.cloudinary.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests"
          }
        ]
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      }
    ];
  }
};

export default nextConfig;
