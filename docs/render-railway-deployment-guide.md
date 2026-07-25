# Garden Live Render/Railway Deployment Guide

## Render

1. Create a PostgreSQL 16 database.
2. Create a web service from the repository.
3. Build command:

```sh
pnpm install --frozen-lockfile && pnpm --filter @garden-live/database db:generate && pnpm --filter @garden-live/web build
```

4. Start command:

```sh
cd apps/web && pnpm exec next start -p $PORT
```

5. Add environment variables from `.env.production.example`.
6. Run migrations from a one-off shell:

```sh
pnpm --filter @garden-live/database db:migrate
pnpm --filter @garden-live/database db:seed
```

## Railway

1. Add a PostgreSQL plugin.
2. Set `DATABASE_URL` from Railway PostgreSQL.
3. Configure the same build and start commands.
4. Run migrations through Railway shell or deploy command.
5. Add custom domain and SSL through Railway domains.
