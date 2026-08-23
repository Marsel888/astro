FROM node:22-alpine AS deps
WORKDIR /app
# The image ships npm 10, which resolves the optional @swc/helpers peer that
# next-intl pulls in differently from the npm that wrote package-lock.json, and
# then rejects the lock as out of sync. Pin the writer's major so `npm ci`
# reads the file the same way everywhere.
RUN npm i -g npm@11 --no-fund --no-audit
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Canonical URLs, hreflang and the sitemap are baked into the statically
# generated pages, so the public origin has to be known at build time, not just
# at run time. src/lib/site.ts refuses to fall back in production on purpose.
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Applies drizzle/*.sql before the app starts. Kept as its own stage because the
# standalone runner deliberately has no dev dependencies and no migration files.
FROM node:22-alpine AS migrator
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json drizzle.config.ts ./
COPY drizzle ./drizzle
COPY src/lib/db ./src/lib/db
CMD ["npx", "drizzle-kit", "migrate"]

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN apk add --no-cache wget
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# src/i18n/request.ts reads these from disk at request time rather than bundling
# them, so they have to exist in the runtime image.
COPY --from=builder --chown=nextjs:nodejs /app/src/messages ./src/messages
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health/auth >/dev/null 2>&1 || exit 1
CMD ["node", "server.js"]
