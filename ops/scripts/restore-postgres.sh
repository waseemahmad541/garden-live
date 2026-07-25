#!/usr/bin/env sh
set -eu

if [ "${1:-}" = "" ]; then
  echo "Usage: ./ops/scripts/restore-postgres.sh /backups/garden-live/garden_live_TIMESTAMP.dump.gz"
  exit 1
fi

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
BACKUP_FILE="$1"

if command -v pg_restore >/dev/null 2>&1; then
  gunzip -c "$BACKUP_FILE" | pg_restore "$DATABASE_URL" --clean --if-exists --no-owner --no-acl
else
  gunzip -c "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T garden-live-postgres sh -c \
    'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists --no-owner --no-acl'
fi

echo "Restored backup: $BACKUP_FILE"
