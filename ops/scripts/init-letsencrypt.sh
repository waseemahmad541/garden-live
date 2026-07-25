#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"
DOMAIN_NAME="${DOMAIN_NAME:-gardenlive.in}"
DOMAIN_ALIASES="${DOMAIN_ALIASES:-www.gardenlive.in}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-admin@gardenlive.in}"
RSA_KEY_SIZE="${RSA_KEY_SIZE:-4096}"
STAGING="${STAGING:-0}"
export DOMAIN_NAME DOMAIN_ALIASES LETSENCRYPT_EMAIL

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE."
  exit 1
fi

domains="-d ${DOMAIN_NAME}"
for alias in $DOMAIN_ALIASES; do
  domains="$domains -d $alias"
done

staging_arg=""
if [ "$STAGING" = "1" ]; then
  staging_arg="--staging"
fi

echo "Creating temporary certificate for ${DOMAIN_NAME}..."
compose run --rm --no-deps --entrypoint sh garden-live-openssl -c "\
  mkdir -p /etc/letsencrypt/live/${DOMAIN_NAME} && \
  openssl req -x509 -nodes -newkey rsa:${RSA_KEY_SIZE} -days 1 \
    -keyout /etc/letsencrypt/live/${DOMAIN_NAME}/privkey.pem \
    -out /etc/letsencrypt/live/${DOMAIN_NAME}/fullchain.pem \
    -subj '/CN=${DOMAIN_NAME}'"

echo "Starting nginx for ACME challenge..."
compose up -d garden-live-nginx

echo "Requesting Let's Encrypt certificate..."
compose run --rm --entrypoint sh garden-live-certbot -c "\
  rm -rf /etc/letsencrypt/live/${DOMAIN_NAME} /etc/letsencrypt/archive/${DOMAIN_NAME} /etc/letsencrypt/renewal/${DOMAIN_NAME}.conf && \
  certbot certonly --webroot -w /var/www/certbot \
    --email '${LETSENCRYPT_EMAIL}' \
    --rsa-key-size '${RSA_KEY_SIZE}' \
    --agree-tos --no-eff-email --force-renewal ${staging_arg} ${domains}"

echo "Reloading nginx with trusted certificate..."
compose exec garden-live-nginx nginx -s reload
echo "SSL is configured for ${DOMAIN_NAME}."
