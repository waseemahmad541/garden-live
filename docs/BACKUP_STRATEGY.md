# Garden Live Backup Strategy

## Scope

Back up:

- PostgreSQL production database
- Cloudinary media assets
- `.env.production` in a secure password manager
- Nginx configuration
- Deployment revision metadata

## PostgreSQL

Use custom-format `pg_dump` daily.

Manual backup:

```bash
BACKUP_DIR=/opt/garden-live/backups RETENTION_DAYS=14 sh ops/scripts/backup-postgres.sh
```

Cron:

```cron
25 2 * * * cd /opt/garden-live && sh ops/scripts/backup-postgres.sh >> logs/backup.log 2>&1
```

Retention:

- Local VPS: 14 days
- Offsite object storage: 90 days
- Monthly archive: 12 months

Restore drill:

```bash
sh ops/scripts/restore-postgres.sh /opt/garden-live/backups/garden_live_TIMESTAMP.dump.gz
```

Install the full cron schedule with:

```bash
crontab ops/cron/garden-live.cron
```

## Cloudinary

Cloudinary is the source of truth for uploaded media.

Recommended controls:

- Use signed uploads for admin and authenticated modules.
- Keep folder-level organization under `garden-live`.
- Export asset list weekly through Cloudinary Admin API.
- Enable restricted media deletion permissions.

## Release Backup Checklist

Before each production deployment:

1. Run a PostgreSQL backup.
2. Confirm backup file exists and is non-empty.
3. Save current Docker image ID.
4. Save current Git commit hash.
5. Confirm `.env.production` exists in secure secret storage.
6. Run `docker compose ps`.

## Incident Recovery Targets

- Recovery Point Objective: 24 hours for database, immediate for code.
- Recovery Time Objective: 2 hours for VPS restore when backups are available.
