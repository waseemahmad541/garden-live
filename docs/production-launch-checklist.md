# Garden Live Production Launch Checklist

## Infrastructure

- [ ] PostgreSQL 16 running.
- [ ] Prisma migrations applied.
- [ ] Prisma Client generated.
- [ ] Demo seed data loaded and verified.
- [ ] Production build passes.
- [ ] SSL active on `gardenlive.in` and `www.gardenlive.in`.
- [ ] Backups scheduled and restore tested.
- [ ] Monitoring and alerts configured.

## Environment

- [ ] `AUTH_SECRET` generated with at least 32 random bytes.
- [ ] `AUTH_URL` set to production URL.
- [ ] `DATABASE_URL` points to production PostgreSQL.
- [ ] Cloudinary credentials configured.
- [ ] Razorpay live keys configured.
- [ ] Stripe live keys configured.
- [ ] WhatsApp Business API configured.
- [ ] SMTP or Resend configured.
- [ ] Google Maps key restricted by domain.
- [ ] Google Analytics and Search Console configured.

## Functional Verification

- [ ] Admin login works.
- [ ] Customer login works.
- [ ] Customer dashboard loads live data.
- [ ] Admin dashboard loads live data.
- [ ] Product Catalog CRUD passes.
- [ ] Checkout creates order, order item, payment, and invoice records.
- [ ] Membership purchase creates membership and payment records.
- [ ] AI Plant Doctor creates diagnosis records.
- [ ] Notifications create records and provider delivery logs.
- [ ] QR Plant Passport records load correctly.
- [ ] Booking and contact forms persist activity logs.

## Security

- [ ] Demo accounts rotated or disabled.
- [ ] Database not publicly exposed.
- [ ] Provider webhook secrets configured.
- [ ] Security headers verified.
- [ ] Admin routes verified with role-based access.
