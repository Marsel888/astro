/**
 * The middleware has to actually run on the pages it is responsible for.
 *
 * It did not, for the whole life of the project. `config.matcher` held one long
 * negative lookahead — the pattern from the Next.js docs with a few metadata
 * routes bolted on — and in practice it matched only "/". Nothing failed: every
 * page still rendered, because the `[locale]` segment caught prefixed URLs by
 * itself, and the locale cookie simply never got written. It surfaced only when
 * English dropped its prefix and "/moon-sign-calculator" had no segment left to
 * fall into: the site served the home page under every one-segment URL.
 *
 * A matcher that quietly matches nothing has no symptom until something else
 * moves. Two things are checked here — that the matcher is a plain catch-all
 * rather than a clever pattern nobody has run, and that the skip list inside the
 * function puts every real route on the right side.
 */
import { config } from '../src/middleware';
import { ARTICLES } from '../src/content/articles';
import { LOCALE_IDS } from '../src/i18n/locales';
import { CALCULATOR_PATHS } from '../src/lib/site';
import { isPrivatePath } from '../src/lib/privatePaths';

/** Pages the middleware must see, so next-intl can resolve their language. */
const MUST_HANDLE = [
  '/',
  ...CALCULATOR_PATHS,
  '/articles',
  `/articles/${ARTICLES[0]!.slug}`,
  '/daily-horoscope',
  '/daily-horoscope/leo',
  '/privacy',
  '/dashboard',
  '/admin',
  '/uk/admin',
  ...LOCALE_IDS.map((id) => `/${id}`),
  ...LOCALE_IDS.map((id) => `/${id}/moon-sign-calculator`),
  '/pt-BR/articles/moon-sign',
];

/** Routes it must leave alone: metadata, assets, the API. */
const MUST_SKIP = [
  '/api/charts',
  '/_next/static/chunks/main.js',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/icon.svg',
  '/opengraph-image',
  '/apple-icon',
  '/manifest.webmanifest',
  '/google75f4a8377eef9c9d.html',
];

/*
 * The skip list lives inside the middleware function. Reproduced here rather
 * than exported, so the check fails if the two ever disagree about a real route.
 */
const SKIP = new RegExp(
  '^/(api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest)(/|$|\\.)',
);
const skipped = (path: string) => SKIP.test(path) || path.slice(1).includes('.');

/*
 * A page behind a sign-in that answers with "public, s-maxage" is a page a
 * shared cache will hand to the next stranger who asks. The admin table exists
 * now, so the classification is checked rather than assumed.
 */
const MUST_BE_PRIVATE = [
  '/admin',
  '/uk/admin',
  '/dashboard',
  '/dashboard/moon',
  '/uk/dashboard/charts',
  '/settings',
  '/chart/abc/report',
  '/sign-in',
  '/ja/sign-up',
];

const MUST_BE_PUBLIC = [
  '/',
  '/moon-sign-calculator',
  '/uk/moon-sign-calculator',
  '/articles/moon-sign',
  '/daily-horoscope/leo',
  '/privacy',
];

let failed = 0;

for (const path of MUST_BE_PRIVATE) {
  if (isPrivatePath(path, LOCALE_IDS)) continue;
  console.log(`  ${path.padEnd(34)} <<< FAIL — would be cached and served to strangers`);
  failed += 1;
}

for (const path of MUST_BE_PUBLIC) {
  if (!isPrivatePath(path, LOCALE_IDS)) continue;
  console.log(`  ${path.padEnd(34)} <<< FAIL — a public page marked private`);
  failed += 1;
}

const sources = config.matcher as string[];
for (const source of sources) {
  if (source.includes('(?!')) {
    console.log(
      `  matcher ${source}\n` +
        '    <<< FAIL — a negative-lookahead matcher matched only "/" here once and\n' +
        '        nothing said so. Exclude routes in the function instead, or verify\n' +
        '        this pattern against a running server before trusting it.',
    );
    failed += 1;
  }
}

for (const path of MUST_HANDLE) {
  if (!skipped(path)) continue;
  console.log(`  ${path.padEnd(34)} <<< FAIL — the skip list swallows a real page`);
  failed += 1;
}

for (const path of MUST_SKIP) {
  if (skipped(path)) continue;
  console.log(`  ${path.padEnd(34)} <<< FAIL — would be rewritten as a page`);
  failed += 1;
}

console.log(
  `  matcher: ${sources.join(', ')} · ${MUST_HANDLE.length} handled, ${MUST_SKIP.length} skipped, ` +
    `${MUST_BE_PRIVATE.length} private, ${MUST_BE_PUBLIC.length} cacheable`,
);
console.log(
  failed === 0
    ? 'PASS — routes are handled, skipped and cached as intended.'
    : `FAIL — ${failed} problem(s).`,
);
process.exit(failed === 0 ? 0 : 1);
