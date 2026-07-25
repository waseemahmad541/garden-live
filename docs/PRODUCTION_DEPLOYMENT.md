# Garden Live Production Deployment

Garden Live production deployment is now standardized on Docker Compose with:

- Dockerized Nginx reverse proxy.
- Dockerized Let's Encrypt Certbot.
- Dockerized PostgreSQL 16.
- One-shot Prisma migration container.
- Next.js standalone production web container.

Use the complete guide:

```text
docs/production-deployment-guide.md
```

One-command deployment from the VPS project directory:

```sh
sh deployment.sh
```

Core operational commands:

```sh
sh ops/scripts/deploy-healthcheck.sh
sh ops/scripts/production-status.sh
sh ops/scripts/backup-postgres.sh
sh ops/scripts/renew-letsencrypt.sh
```

Do not install the checked-in Nginx config manually into `/etc/nginx/sites-available` for the Docker deployment. The production Nginx service uses:

```text
ops/nginx/templates/gardenlive.conf.template
ops/nginx/templates/ssl-options.conf.template
```
