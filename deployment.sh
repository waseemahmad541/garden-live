#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"
DOMAIN_NAME="${DOMAIN_NAME:-gardenlive.in}"
SKIP_SSL="${SKIP_SSL:-0}"
if [ "$SKIP_SSL" = "1" ]; then
  HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/}"
else
  HEALTH_URL="${HEALTH_URL:-https://${DOMAIN_NAME}/}"
fi
SEED_DEMO_DATA="${SEED_DEMO_DATA:-0}"
export DOMAIN_NAME
export DOMAIN_ALIASES="${DOMAIN_ALIASES:-www.gardenlive.in}"
export LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-admin@gardenlive.in}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

echo "Garden Live production deployment"
echo "Domain: $DOMAIN_NAME"

require_command docker
require_command curl

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE. Copy .env.production.example to $ENV_FILE and fill real production values."
  exit 1
fi

if grep -q "CHANGE_ME" "$ENV_FILE"; then
  echo "$ENV_FILE still contains CHANGE_ME values. Refusing to deploy."
  exit 1
fi

mkdir -p backups logs

echo "Building production images..."
compose build garden-live-migrate garden-live-web

echo "Starting PostgreSQL..."
compose up -d garden-live-postgres

echo "Applying Prisma migrations..."
compose run --rm garden-live-migrate

if [ "$SEED_DEMO_DATA" = "1" ]; then
  echo "Seeding demo data..."
  compose run --rm garden-live-migrate pnpm --filter @garden-live/database db:seed
fi

echo "Starting Garden Live web app..."
compose up -d garden-live-web

if [ "$SKIP_SSL" = "0" ]; then
  echo "Preparing Let's Encrypt certificate..."
  sh ops/scripts/init-letsencrypt.sh

  echo "Starting reverse proxy..."
  compose up -d garden-live-nginx
else
  echo "Skipping SSL and public reverse proxy startup."
fi

echo "Waiting for health check: $HEALTH_URL"
for attempt in $(seq 1 30); do
  if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
    echo "Garden Live is healthy."
    compose ps
    exit 0
  fi
  sleep 5
done

echo "Deployment finished but health check failed."
compose ps
compose logs --tail=120 garden-live-web garden-live-nginx
exit 1
