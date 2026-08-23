# Deploying SideraChart

Four containers behind Caddy, which gets the TLS certificate itself. Everything
is in `docker-compose.yml`; there is nothing to configure on the host beyond
Docker, DNS and a firewall.

```
internet ──▶ proxy (Caddy, :80 :443)
                └─▶ app (Next.js standalone, :3000)
                      ├─▶ db    (Postgres 16, volume pgdata)
                      └─▶ cache (Redis 7 — running, not yet used)
             migrate (runs once per deploy, then exits)
```

---

## 1. What you need first

| | |
|---|---|
| A server | 2 GB RAM is enough; the build peaks around 1.5 GB. Ubuntu 22.04+ or Debian 12. |
| A domain | Its **A record** (and AAAA if you have IPv6) pointing at the server's IP. |
| Open ports | 80 and 443 inbound. Port 80 is not optional — Caddy needs it for the ACME challenge. |
| Docker | Engine 24+ with the Compose plugin. |

Point DNS **before** the first start. Caddy asks Let's Encrypt for a certificate
on boot, and a failed challenge is rate-limited for an hour.

---

## 2. First deploy

```bash
# Docker, if it is not there yet
curl -fsSL https://get.docker.com | sh

git clone https://github.com/Marsel888/astro.git siderachart
cd siderachart

cp .env.example .env
openssl rand -hex 32          # paste into BETTER_AUTH_SECRET
openssl rand -hex 16          # paste into DB_PASSWORD
nano .env                     # set SITE_URL and DOMAIN too

docker compose up -d --build
```

The first build takes a few minutes: it installs dependencies, runs `next build`
(which downloads the Google fonts), applies the migrations and only then starts
the app. Compose enforces that order — `app` waits for `migrate` to exit cleanly,
so the site never comes up against an empty database.

```bash
docker compose ps             # app should be healthy, migrate should be exited (0)
docker compose logs -f proxy  # watch the certificate being issued
curl -I https://your-domain/en
```

---

## 3. Deploying a change

```bash
git pull
docker compose up -d --build
```

`migrate` re-runs and is a no-op when there is nothing new. Any migration you
generated with `npm run db:generate` is applied automatically.

**`SITE_URL` is a build argument, not only an environment variable.** Canonical
tags, hreflang and the sitemap are compiled into the statically generated pages.
If you change the domain you must rebuild — `docker compose restart` will keep
serving the old URLs.

---

## 4. Checks that gate a release

Run these before pushing. All four are wired into `package.json`.

```bash
npm run verify          # planets against published charts; Placidus cusps to 0.02°
npm run i18n:coverage   # fails if a locale marked published is under 92% translated
npm run check:contrast  # WCAG AA across the palette
npm run lint
```

After the deploy is up:

```bash
curl -s https://your-domain/sitemap.xml | grep -c '<url>'      # 129 with en+uk+ru
curl -s https://your-domain/en/birth-chart-calculator | grep canonical
curl -s https://your-domain/robots.txt
```

The canonical must show your real domain. If it says `localhost`, `SITE_URL`
was missing from the build.

---

## 5. Backups

The birth data in `charts` is personal data. Nothing else on the box is worth
keeping — the images rebuild from git.

```bash
# nightly, keeping 14 days
docker compose exec -T db pg_dump -U meridian meridian | gzip > backup-$(date +%F).sql.gz
```

Restore:

```bash
gunzip -c backup-2026-08-23.sql.gz | docker compose exec -T db psql -U meridian -d meridian
```

---

## 6. Things that will bite

**A database that already has the tables.** The single migration is a full
initial schema and will fail against a database created before migrations
existed — for example a local dev volume. Mark it as already applied rather than
running it:

```bash
psql "$DATABASE_URL" -c 'CREATE SCHEMA IF NOT EXISTS drizzle'
npx drizzle-kit migrate   # only on a database that is genuinely empty
```

For an existing database, apply the delta by hand instead:

```sql
ALTER TABLE charts ADD COLUMN IF NOT EXISTS is_primary boolean NOT NULL DEFAULT false;
```

**`DB_PASSWORD` after the first start.** Postgres writes it into the volume when
the cluster is created. Editing `.env` later changes what the app sends, not what
the database expects, and the app stops connecting. Change it with `ALTER USER`
inside the database, or drop the volume and restore from a dump.

**HSTS.** `Caddyfile` sends `Strict-Transport-Security` with a one-year max-age.
Browsers remember it. Comment that line out while you are still testing against a
staging certificate, or plain HTTP on that hostname will be refused for a year.

**Google OAuth.** The redirect URI in Google Cloud Console must be exactly
`https://your-domain/api/auth/callback/google`. Leaving `GOOGLE_CLIENT_ID` blank
is fine — the app then offers email and password only.

**One replica only.** `src/lib/rateLimit.ts` counts in process memory, so two
app containers mean double the effective limit. The Redis service is already in
the compose file for when that changes.

---

## 7. Before taking real traffic

- Add Google Search Console and submit `https://your-domain/sitemap.xml`.
- Read `/privacy` against what is actually stored — birth date, birth time,
  coordinates, email, IP and user agent in `session`. Account deletion and data
  export exist in Settings, so the policy can point at them.
- Decide on a cookie banner. The session cookie is strictly necessary and needs
  no consent; anything analytics-shaped does.
- Re-read `STRATEGY.md` §13 on which locales to publish. Only `en`, `uk` and `ru`
  are indexed today; the flag is `published` in `src/i18n/locales.ts`.
