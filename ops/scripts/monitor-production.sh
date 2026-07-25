#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
DOMAIN_NAME="${DOMAIN_NAME:-gardenlive.in}"
BASE_URL="${BASE_URL:-https://${DOMAIN_NAME}}"
ALERT_WEBHOOK_URL="${ALERT_WEBHOOK_URL:-}"

fail() {
  message="$1"
  echo "ALERT: $message"
  if [ -n "$ALERT_WEBHOOK_URL" ]; then
    curl -fsS -X POST "$ALERT_WEBHOOK_URL" \
      -H "Content-Type: application/json" \
      -d "{\"text\":\"Garden Live production alert: ${message}\"}" >/dev/null || true
  fi
  exit 1
}

curl -fsS "${BASE_URL}/" >/dev/null || fail "homepage health check failed"
docker compose -f "$COMPOSE_FILE" exec -T garden-live-postgres sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"' >/dev/null || fail "PostgreSQL health check failed"

disk_used="$(df / | awk 'NR==2 { gsub(/%/, "", $5); print $5 }')"
if [ "$disk_used" -ge "${DISK_ALERT_PERCENT:-85}" ]; then
  fail "disk usage is ${disk_used}%"
fi

echo "Garden Live monitoring check passed."
