# Garden Live Backup And Restore

Backups use PostgreSQL custom-format dumps and can run either with local `pg_dump` or through the production Docker Compose PostgreSQL container.

## Manual Backup

```sh
BACKUP_DIR=/opt/garden-live/backups RETENTION_DAYS=14 sh ops/scripts/backup-postgres.sh
```

The script creates:

```text
/opt/garden-live/backups/garden_live_YYYYMMDDTHHMMSSZ.dump.gz
```

## Manual Restore

1. Put the app into maintenance mode or stop public traffic.
2. Confirm the backup file exists.
3. Restore:

```sh
sh ops/scripts/restore-postgres.sh /opt/garden-live/backups/garden_live_TIMESTAMP.dump.gz
```

4. Restart app services:

```sh
docker compose -f docker-compose.prod.yml up -d garden-live-web garden-live-nginx
```

5. Verify:

```sh
sh ops/scripts/deploy-healthcheck.sh
```

## Cron Backup

Install:

```sh
mkdir -p logs backups
crontab ops/cron/garden-live.cron
```

The cron file runs nightly backups and deletes backups older than `RETENTION_DAYS`.

## Retention Policy

- Daily backups: 14 days.
- Weekly offsite copy: 8 weeks.
- Monthly offsite copy: 12 months.

## Disaster Recovery Target

- Recovery Point Objective: 24 hours.
- Recovery Time Objective: 2 hours.
