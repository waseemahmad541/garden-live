# Garden Live Docker Deployment Guide

Garden Live production runs with Docker Compose:

- `garden-live-nginx`
- `garden-live-web`
- `garden-live-postgres`
- `garden-live-migrate`
- `garden-live-certbot`
- `garden-live-openssl`

## Build Images

```sh
docker compose -f docker-compose.prod.yml build garden-live-migrate garden-live-web
```

## Start PostgreSQL

```sh
docker compose -f docker-compose.prod.yml up -d garden-live-postgres
```

## Apply Migrations

```sh
docker compose -f docker-compose.prod.yml run --rm garden-live-migrate
```

Do not run `prisma db push` in production.

## Start The App

```sh
docker compose -f docker-compose.prod.yml up -d garden-live-web garden-live-nginx
```

## SSL

Use the included Certbot bootstrap script:

```sh
sh ops/scripts/init-letsencrypt.sh
```

Renew certificates:

```sh
sh ops/scripts/renew-letsencrypt.sh
```

## One-Command Production Deploy

```sh
sh deployment.sh
```

## Health Checks

```sh
docker compose -f docker-compose.prod.yml ps
sh ops/scripts/deploy-healthcheck.sh
sh ops/scripts/production-status.sh
```

## Logs

```sh
sh ops/scripts/tail-production-logs.sh garden-live-web
sh ops/scripts/tail-production-logs.sh garden-live-nginx
sh ops/scripts/tail-production-logs.sh garden-live-postgres
```

## Local PostgreSQL Only

For local development with the web app running on the host:

```powershell
docker compose -f docker-compose.local.yml up -d
$env:DATABASE_URL="postgresql://garden_live:garden_live_password@localhost:5432/garden_live?schema=public"
pnpm --filter @garden-live/database db:migrate
pnpm --filter @garden-live/database db:seed
```
