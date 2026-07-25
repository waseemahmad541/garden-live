#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
DOMAIN_NAME="${DOMAIN_NAME:-gardenlive.in}"
BASE_URL="${BASE_URL:-https://${DOMAIN_NAME}}"

echo "== Containers =="
docker compose -f "$COMPOSE_FILE" ps

echo "== HTTP =="
curl -I -fsS "${BASE_URL}/" | sed -n '1,12p'

echo "== Database =="
docker compose -f "$COMPOSE_FILE" exec -T garden-live-postgres sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'

echo "== Disk =="
df -h /

echo "== Recent app logs =="
docker compose -f "$COMPOSE_FILE" logs --tail=40 garden-live-web
