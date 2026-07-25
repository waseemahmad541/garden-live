FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/database/package.json packages/database/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DIST_DIR=.next
ENV NEXT_OUTPUT_STANDALONE=true
RUN pnpm --filter @garden-live/database db:generate
RUN pnpm --filter @garden-live/web build

FROM deps AS migrator
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database packages/database
ENV NODE_ENV=production
CMD ["pnpm", "--filter", "@garden-live/database", "db:migrate"]

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
USER nextjs
EXPOSE 3000
ENV PORT=3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "apps/web/server.js"]
