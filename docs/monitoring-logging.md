# Garden Live Monitoring And Logging

Garden Live production monitoring is built around Docker health checks, Nginx access/error logs, PostgreSQL readiness, cron checks, and optional webhook alerts.

## Runtime Logs

Follow logs:

```sh
sh ops/scripts/tail-production-logs.sh garden-live-web
sh ops/scripts/tail-production-logs.sh garden-live-nginx
sh ops/scripts/tail-production-logs.sh garden-live-postgres
```

Docker log rotation is configured in `docker-compose.prod.yml`:

- Max file size: `20m`
- Max files: `5`

## Status Check

```sh
sh ops/scripts/production-status.sh
```

This reports:

- Container state.
- HTTPS response headers.
- PostgreSQL readiness.
- Disk usage.
- Recent app logs.

## Health Check

```sh
sh ops/scripts/deploy-healthcheck.sh
```

This verifies:

- Homepage is reachable.
- `robots.txt` is reachable.
- `sitemap.xml` is reachable.
- Docker services are listed.
- PostgreSQL accepts connections.

## Cron Monitoring

Install:

```sh
mkdir -p logs backups
crontab ops/cron/garden-live.cron
```

The cron schedule runs:

- SSL renewal twice daily.
- PostgreSQL backup nightly.
- Production health check every five minutes.

## Alerts

Set an incoming webhook URL in `.env.production` or the server environment:

```sh
ALERT_WEBHOOK_URL=https://hooks.slack.com/services/...
DISK_ALERT_PERCENT=85
```

`ops/scripts/monitor-production.sh` sends a webhook alert when:

- Homepage health check fails.
- PostgreSQL health check fails.
- Disk usage crosses the configured threshold.

## Metrics To Watch

- HTTP 5xx rate.
- API p95 latency.
- Next.js container restarts.
- PostgreSQL connections.
- PostgreSQL disk usage.
- Payment webhook failures.
- Checkout persistence errors.
- Auth login errors.
- Backup failures.
- SSL renewal failures.

## Recommended External Tools

- UptimeRobot or Better Stack for uptime checks.
- Grafana Cloud or Datadog for metrics.
- Grafana Loki, Better Stack, or a cloud log drain for centralized logs.
- Sentry for frontend/server exceptions.

## Production Log Retention

- Application logs: 30 days.
- Security/audit logs: 180 days.
- Payment logs: 365 days.
- Database backups: 14 days locally, with weekly/monthly offsite copies.
