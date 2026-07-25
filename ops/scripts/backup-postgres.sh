#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
BACKUP_DIR="${BACKUP_DIR:-/backups/garden-live}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
FILE="${BACKUP_DIR}/garden_live_${TIMESTAMP}.dump"

mkdir -p "$BACKUP_DIR"

if command -v pg_dump >/dev/null 2>&1; then
  pg_dump "$DATABASE_URL" --format=custom --no-owner --no-acl --file="$FILE"
else
  docker compose -f "$COMPOSE_FILE" exec -T garden-live-postgres sh -c \
    'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner --no-acl' > "$FILE"
fi

gzip -9 "$FILE"
find "$BACKUP_DIR" -type f -name "garden_live_*.dump.gz" -mtime +"$RETENTION_DAYS" -delete
echo "Created backup: ${FILE}.gz"
