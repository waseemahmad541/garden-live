#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

docker compose -f "$COMPOSE_FILE" run --rm garden-live-certbot renew --webroot -w /var/www/certbot --quiet
docker compose -f "$COMPOSE_FILE" exec garden-live-nginx nginx -s reload
echo "Let's Encrypt renewal completed."
