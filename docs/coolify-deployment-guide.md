# Garden Live Coolify Deployment Guide

1. Create a new Coolify project.
2. Add a PostgreSQL 16 resource.
3. Add the Garden Live repository as a Docker Compose application.
4. Use `docker-compose.prod.yml`.
5. Set all variables from `.env.production.example`.
6. Use internal database hostname from the Coolify PostgreSQL service in `DATABASE_URL`.
7. Deploy the app.
8. Open the web container terminal and run:

```sh
pnpm --filter @garden-live/database db:migrate
pnpm --filter @garden-live/database db:seed
node ops/scripts/verify-database.js
```

9. Attach `gardenlive.in` and enable automatic SSL.
10. Configure backups for the PostgreSQL resource.
