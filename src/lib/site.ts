export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3000';

export const CALCULATOR_PATHS = [
  '/birth-chart-calculator',
  '/rising-sign-calculator',
  '/moon-sign-calculator',
  '/venus-sign-calculator',
  '/mercury-sign-calculator',
  '/mars-sign-calculator',
  '/synastry-calculator',
  '/composite-chart-calculator',
] as const;
