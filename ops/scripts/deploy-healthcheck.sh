#!/usr/bin/env sh
set -eu

DOMAIN_NAME="${DOMAIN_NAME:-gardenlive.in}"
BASE_URL="${BASE_URL:-https://${DOMAIN_NAME}}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

echo "Checking ${BASE_URL}..."
curl -fsS "${BASE_URL}/" >/dev/null
curl -fsS "${BASE_URL}/robots.txt" >/dev/null
curl -fsS "${BASE_URL}/sitemap.xml" >/dev/null

echo "Checking containers..."
docker compose -f "$COMPOSE_FILE" ps

echo "Checking PostgreSQL..."
docker compose -f "$COMPOSE_FILE" exec -T garden-live-postgres sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'

echo "Production health check passed."
