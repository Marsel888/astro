/**
 * Read the site's Search Console data.
 *
 * The audit could say what ought to rank; this says what does. Everything else
 * about the site can be measured from the outside — word counts, headers, links.
 * Impressions, queries and whether Google has actually indexed the 645 URLs can
 * only come from here.
 *
 * Auth is a service-account JWT signed in place rather than the google-auth
 * library: it is twenty lines of crypto and keeps a production dependency out of
 * the tree for a script that runs by hand.
 *
 *   npx tsx scripts/search-console.ts                 # last 28 days
 *   npx tsx scripts/search-console.ts --days 7
 *   npx tsx scripts/search-console.ts --inspect /uk/moon-sign-calculator
 */
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const SITE = 'https://siderachart.com/';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const KEY_FILE = process.env.GSC_KEY_FILE ?? 'alpine-ship-506618-d0-d7024fa85d2c.json';

type Key = { client_email: string; private_key: string };
type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

const base64url = (input: string | Buffer) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/** Exchange the key for an access token, RFC 7523 style. */
async function accessToken(key: Key): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPE,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign('RSA-SHA256').update(`${header}.${claim}`);
  const assertion = `${header}.${claim}.${base64url(signer.sign(key.private_key))}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const json = (await res.json()) as { access_token?: string; error_description?: string };
  if (!json.access_token) throw new Error(`token: ${json.error_description ?? JSON.stringify(json)}`);
  return json.access_token;
}

async function api<T>(token: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://searchconsole.googleapis.com/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    const message = (json as { error?: { message?: string } }).error?.message ?? res.statusText;
    throw new Error(`${path}: ${res.status} ${message}`);
  }
  return json as T;
}

const iso = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86_400_000).toISOString().slice(0, 10);

function table(title: string, rows: Row[], label: string) {
  console.log(`\n== ${title} ==`);
  if (!rows.length) {
    console.log('  (нічого — Google ще не показував сайт за цим зрізом)');
    return;
  }
  console.log(
    `  ${label.padEnd(52)} ${'покази'.padStart(8)} ${'кліки'.padStart(7)} ${'CTR'.padStart(7)} ${'позиція'.padStart(8)}`,
  );
  for (const row of rows) {
    const name = row.keys.join(' · ');
    console.log(
      `  ${(name.length > 50 ? `${name.slice(0, 49)}…` : name).padEnd(52)} ` +
        `${String(row.impressions).padStart(8)} ${String(row.clicks).padStart(7)} ` +
        `${`${(row.ctr * 100).toFixed(1)}%`.padStart(7)} ${row.position.toFixed(1).padStart(8)}`,
    );
  }
}

async function main() {
  const args = process.argv.slice(2);
  const days = Number(args[args.indexOf('--days') + 1]) || 28;
  const inspect = args.includes('--inspect') ? args[args.indexOf('--inspect') + 1] : null;

  const key = JSON.parse(readFileSync(KEY_FILE, 'utf8')) as Key;
  const token = await accessToken(key);

  if (inspect) {
    // A comma-separated list, because the question is never about one page —
    // it is whether a whole shape of page made it into the index.
    const paths = inspect.split(',').map((p) => p.trim()).filter(Boolean);
    console.log(`  ${'сторінка'.padEnd(42)} ${'в індексі'.padEnd(26)} останній обхід`);
    for (const path of paths) {
      const url = new URL(path, SITE).toString();
      let r: Record<string, string> = {};
      try {
        const { inspectionResult } = await api<{
          inspectionResult: { indexStatusResult?: Record<string, string> };
        }>(token, 'v1/urlInspection/index:inspect', {
          inspectionUrl: url,
          siteUrl: SITE,
          languageCode: 'uk',
        });
        r = inspectionResult.indexStatusResult ?? {};
      } catch (error) {
        if (String(error).includes('do not own this site')) {
          console.log(
            [
              '',
              '  Перевірка URL доступна лише власнику ресурсу — «Повний доступ» для неї замало.',
              '  Додайте сервісний акаунт делегованим власником на сторінці керування власниками:',
              '  google.com/webmasters/verification/details?siteUrl=' + encodeURIComponent(SITE),
              '  Решта звіту працює й без цього.',
            ].join('\n'),
          );
          return;
        }
        throw error;
      }
      const crawled = r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : 'ще не обходив';
      console.log(
        `  ${path.padEnd(42)} ${String(r.coverageState ?? r.verdict ?? '—').slice(0, 25).padEnd(26)} ${crawled}`,
      );
    }
    return;
  }

  const range = { startDate: iso(days), endDate: iso(0) };
  console.log(`SideraChart · Search Console · ${range.startDate} … ${range.endDate}`);

  const query = (dimensions: string[], rowLimit = 25) =>
    api<{ rows?: Row[] }>(token, `webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
      ...range,
      dimensions,
      rowLimit,
    }).then((r) => r.rows ?? []);

  const [totals, queries, pages, countries, devices] = await Promise.all([
    query([], 1),
    query(['query']),
    query(['page']),
    query(['country'], 10),
    query(['device'], 3),
  ]);

  const total = totals[0];
  console.log(
    total
      ? `\nВсього: ${total.impressions} показів, ${total.clicks} кліків, середня позиція ${total.position.toFixed(1)}`
      : '\nВсього: жодного показу за цей період.',
  );

  table('Запити', queries, 'запит');
  table('Сторінки', pages, 'сторінка');
  table('Країни', countries, 'країна');
  table('Пристрої', devices, 'пристрій');

  const { sitemap = [] } = await api<{
    sitemap?: Array<{
      path: string;
      lastSubmitted?: string;
      isPending?: boolean;
      warnings?: string;
      errors?: string;
      contents?: Array<{ type: string; submitted: string; indexed?: string }>;
    }>;
  }>(token, `webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`);

  console.log('\n== Sitemap ==');
  if (!sitemap.length) console.log('  (жодного не подано)');
  for (const s of sitemap) {
    const submitted = s.contents?.reduce((n, c) => n + Number(c.submitted ?? 0), 0) ?? 0;
    console.log(`  ${s.path}`);
    console.log(
      `    подано URL: ${submitted}   помилки: ${s.errors ?? 0}   попередження: ${s.warnings ?? 0}` +
        `   опрацьовано: ${s.lastSubmitted?.slice(0, 10) ?? '—'}${s.isPending ? ' (в черзі)' : ''}`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(`\nFAIL — ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
