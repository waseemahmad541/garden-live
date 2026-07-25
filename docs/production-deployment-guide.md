# Garden Live Production Deployment Guide

This guide deploys Garden Live to a Linux VPS with Docker Compose, PostgreSQL 16, Nginx, and Let's Encrypt SSL.

## Production Architecture

- `garden-live-nginx`: public reverse proxy on ports `80` and `443`.
- `garden-live-web`: Next.js standalone production server on internal port `3000`.
- `garden-live-postgres`: PostgreSQL 16 with a persistent Docker volume.
- `garden-live-migrate`: one-shot Prisma migration container.
- `garden-live-certbot`: Let's Encrypt certificate issuance and renewal.
- `garden-live-openssl`: temporary certificate helper for first SSL bootstrap.

## VPS Requirements

- Ubuntu 22.04 or 24.04 LTS.
- 2 CPU / 4 GB RAM minimum, 4 CPU / 8 GB RAM recommended.
- 40 GB SSD minimum.
- DNS A records:
  - `gardenlive.in` -> VPS public IP
  - `www.gardenlive.in` -> VPS public IP
- Open firewall ports: `22`, `80`, `443`.

## Install Server Dependencies

```sh
sudo apt update
sudo apt install -y ca-certificates curl git ufw
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc >/dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

Log out and back in after adding the user to the Docker group.

## Prepare The App

```sh
sudo mkdir -p /opt/garden-live
sudo chown -R "$USER:$USER" /opt/garden-live
cd /opt/garden-live
git clone <YOUR_REPOSITORY_URL> .
cp .env.production.example .env.production
```

Edit `.env.production` and replace every `CHANGE_ME` value with real production credentials.

Required launch values:

- `DATABASE_URL`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXT_PUBLIC_SITE_URL`
- `DOMAIN_NAME`
- `DOMAIN_ALIASES`
- `LETSENCRYPT_EMAIL`
- Cloudinary credentials
- Razorpay live keys
- Stripe live keys
- WhatsApp Business API credentials
- SMTP credentials
- Google Maps and Analytics keys
- `OPENAI_API_KEY` when live AI Plant Doctor is enabled

Generate a secure `AUTH_SECRET`:

```sh
openssl rand -base64 48
```

## One-Command Deployment

From `/opt/garden-live`:

```sh
sh deployment.sh
```

The script will:

1. Validate `.env.production`.
2. Build production Docker images.
3. Start PostgreSQL.
4. Run Prisma migrations.
5. Start the web app.
6. Bootstrap Let's Encrypt SSL.
7. Start Nginx.
8. Verify `https://gardenlive.in/`.

For a staging certificate test:

```sh
STAGING=1 sh deployment.sh
```

To skip SSL during an internal smoke test:

```sh
SKIP_SSL=1 HEALTH_URL=http://127.0.0.1:3000 sh deployment.sh
```

## Production Verification

```sh
sh ops/scripts/deploy-healthcheck.sh
sh ops/scripts/production-status.sh
```

Check containers:

```sh
docker compose -f docker-compose.prod.yml ps
```

Check logs:

```sh
sh ops/scripts/tail-production-logs.sh garden-live-web
sh ops/scripts/tail-production-logs.sh garden-live-nginx
```

## Backups

Manual backup:

```sh
BACKUP_DIR=/opt/garden-live/backups sh ops/scripts/backup-postgres.sh
```

Manual restore:

```sh
sh ops/scripts/restore-postgres.sh /opt/garden-live/backups/garden_live_TIMESTAMP.dump.gz
```

Install cron jobs:

```sh
mkdir -p logs backups
crontab ops/cron/garden-live.cron
```

Cron includes:

- SSL renewal twice daily.
- Nightly PostgreSQL backups.
- Health monitoring every five minutes.

## Deployment Updates

```sh
cd /opt/garden-live
git pull
sh ops/scripts/backup-postgres.sh
sh deployment.sh
```

## Rollback

1. Restore the previous Git revision:

```sh
git log --oneline -5
git checkout <GOOD_COMMIT_SHA>
```

2. Redeploy:

```sh
sh deployment.sh
```

3. Restore database only if the migration changed data destructively:

```sh
sh ops/scripts/restore-postgres.sh /opt/garden-live/backups/garden_live_TIMESTAMP.dump.gz
```

## Security Checklist

- Remove or rotate seeded demo accounts before public launch.
- Ensure `.env.production` is never committed.
- Use live Razorpay and Stripe webhook secrets.
- Restrict SSH to key-based login.
- Keep ports open only for `22`, `80`, and `443`.
- Verify SSL with an external SSL checker after deployment.
- Confirm Google Search Console ownership.
- Confirm `robots.txt` and `sitemap.xml` are reachable.

## Final Launch Checklist

- `docker compose -f docker-compose.prod.yml ps` shows healthy services.
- `https://gardenlive.in/` returns `200`.
- `https://gardenlive.in/sitemap.xml` returns `200`.
- Customer login works.
- Admin login works.
- Contact form saves to PostgreSQL.
- Book Garden Visit saves to PostgreSQL.
- Checkout creates order/payment records.
- Razorpay webhook is configured.
- Stripe webhook is configured.
- Backups are running nightly.
- SSL renewal cron is installed.
- Monitoring cron is installed.
