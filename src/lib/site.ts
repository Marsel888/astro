function resolveSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim().replace(/\/+$/, '');
  if (raw) return raw;
  if (process.env.NODE_ENV === 'production') {
    // Canonicals, hreflang and the sitemap are all built from this. Shipping the
    // localhost fallback would point the whole index at a machine nobody can reach.
    throw new Error('SITE_URL is required in production (canonical URLs are built from it).');
  }
  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = 'SideraChart';

export const CALCULATOR_PATHS = [
  '/birth-chart-calculator',
  '/rising-sign-calculator',
  '/sun-sign-calculator',
  '/moon-sign-calculator',
  '/venus-sign-calculator',
  '/mercury-sign-calculator',
  '/mars-sign-calculator',
  '/synastry-calculator',
  '/composite-chart-calculator',
  '/transits-today',
] as const;
