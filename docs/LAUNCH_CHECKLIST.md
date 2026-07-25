# Garden Live Public Launch Checklist

## Domain

- `gardenlive.in` A record points to production VPS IPv4.
- `www.gardenlive.in` A record points to production VPS IPv4.
- `www.gardenlive.in` redirects to `gardenlive.in`.
- Search Console TXT record is verified.

## SSL

- Let's Encrypt certificate issued for `gardenlive.in` and `www.gardenlive.in`.
- HTTP redirects to HTTPS.
- HSTS is enabled after certificate verification.
- `certbot renew --dry-run` passes.

## Database

- PostgreSQL production database is created.
- `DATABASE_URL` uses production credentials.
- `prisma migrate deploy` completed.
- Seed script completed.
- Backup script has produced a restorable dump.

## Media

- Cloudinary production cloud is configured.
- Signed upload endpoint works at `/api/cloudinary/signature`.
- Upload folder is `garden-live`.
- Cloudinary API key is not exposed publicly.

## Payments

- Razorpay live mode is enabled.
- Razorpay webhook URL is `https://gardenlive.in/api/webhooks/razorpay`.
- Stripe webhook URL is `https://gardenlive.in/api/webhooks/stripe`.
- Checkout route returns provider readiness at `/checkout`.

## Communications

- WhatsApp Business API webhook URL is `https://gardenlive.in/api/webhooks/whatsapp`.
- SMTP SPF, DKIM, and DMARC are configured.
- SMS provider credentials are configured when SMS sending is enabled.
- Integration status endpoint returns expected readiness at `/api/integrations/status`.

## SEO and Analytics

- `https://gardenlive.in/sitemap.xml` returns 200.
- `https://gardenlive.in/robots.txt` returns 200.
- GA4 measurement ID is configured.
- Search Console domain property is verified.

## Core Web Vitals

- Public pages are statically generated.
- Google Analytics loads after interaction.
- Next Image is used for public photography.
- Cloudinary transformations are used for uploaded media.
- Static assets are cached with immutable cache headers.

## Final Smoke Test

- `/` returns 200.
- `/book-garden-visit` returns 200.
- `/garden-store` returns 200.
- `/checkout` returns 200.
- `/garden-health-reports` returns 200.
- `/api/integrations/status` returns 200.
- Protected dashboards redirect when unauthenticated.
