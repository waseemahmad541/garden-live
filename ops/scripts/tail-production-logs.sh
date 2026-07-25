#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
SERVICE="${1:-garden-live-web}"

docker compose -f "$COMPOSE_FILE" logs -f --tail=200 "$SERVICE"
