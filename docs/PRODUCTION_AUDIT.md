# Garden Live Production Audit

## Completed In Repository

- Standalone Docker-ready Next.js build.
- Production Dockerfile.
- Production Docker Compose with PostgreSQL.
- Nginx reverse proxy configuration for `gardenlive.in` and `www.gardenlive.in`.
- Let's Encrypt SSL configuration path.
- PostgreSQL migration and seed scripts.
- Cloudinary remote image delivery support.
- Razorpay and Stripe readiness through checkout API.
- WhatsApp, Email, and SMS integration readiness endpoints.
- Google Analytics runtime injection through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Google Search Console metadata verification through `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Google Maps embedded public sections.
- `robots.txt` and `sitemap.xml`.
- Security headers and cache headers.
- PostgreSQL backup and restore scripts.
- Public enquiry and booking APIs with validation.
- TypeScript and production build validation.

## Provider Actions Required Before Launch

- Point `gardenlive.in` DNS to the production VPS.
- Add production secrets to `.env.production`.
- Complete Razorpay KYC and live key activation.
- Complete WhatsApp Business verification.
- Configure SMTP SPF, DKIM, and DMARC.
- Create Google Maps restricted API key.
- Create GA4 property.
- Verify Search Console domain ownership.
- Run SSL issuance after DNS propagation.

## Final Audit Commands

```bash
pnpm --filter @garden-live/database db:validate
pnpm --filter @garden-live/web typecheck
pnpm --filter @garden-live/web build
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
curl -I https://gardenlive.in
curl -I https://gardenlive.in/sitemap.xml
curl -I https://gardenlive.in/robots.txt
```

## Core Web Vitals Checklist

- Use Next Image for remote hero and gallery media.
- Deliver AVIF/WebP where supported.
- Cache `_next/static` for one year.
- Keep third-party scripts conditional.
- Load Google Analytics after interaction.
- Avoid blocking custom fonts.
- Keep public pages statically generated.
- Use Cloudinary transformations for uploaded images.

## Security Checklist

- `AUTH_SECRET` is strong and private.
- Production database is not publicly exposed.
- Nginx redirects HTTP to HTTPS.
- HSTS enabled after SSL verification.
- Provider webhooks use signature verification before fulfillment.
- Admin, customer, gardener, and supervisor routes stay protected by role middleware.
- API routes validate input with Zod.
- Audit logs capture public submissions and integration actions.
