/**
 * Placidus gate: our intermediate cusps against the textbook semi-arc definition,
 * solved independently here. Fails if any cusp is off by more than 0.02°.
 * The Ascendant is the limiting case of the same equation, so it doubles as a
 * check that the solver itself is right.
 */
import { calculateChart } from '../src/lib/astro/calculate';
import { asinD, atanD, atan2D, cosD, norm360, signedDelta, sinD, tanD } from '../src/lib/astro/math';
import { dms, signOf } from '../src/lib/chart';

type Case = { name: string; date: string; time: string; lat: number; lon: number; tz: string };

const CASES: Case[] = [
  { name: 'Nairobi (equator)', date: '1990-05-15', time: '06:30', lat: -1.2921, lon: 36.8219, tz: 'Africa/Nairobi' },
  { name: 'Honolulu (Obama)', date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, tz: 'Pacific/Honolulu' },
  { name: 'Sydney (south mid)', date: '1975-11-02', time: '04:10', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { name: 'Buenos Aires (south)', date: '1988-02-19', time: '22:40', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
  { name: 'Sandringham (Diana)', date: '1961-07-01', time: '19:45', lat: 52.8297, lon: 0.515, tz: 'Europe/London' },
  { name: 'Liverpool (Lennon)', date: '1940-10-09', time: '18:30', lat: 53.4084, lon: -2.9916, tz: 'Europe/London' },
  { name: 'Warsaw', date: '1867-11-07', time: '12:00', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw' },
  { name: 'Reykjavik (polar)', date: '1990-05-15', time: '06:30', lat: 64.1466, lon: -21.9426, tz: 'Atlantic/Reykjavik' },
];

/** Independent solver: fraction of the semi-arc covered since culmination. */
function reference(kind: 'asc' | 2 | 3 | 11 | 12, ramc: number, phi: number, eps: number): number | null {
  const guess = { asc: 90, 11: 30, 12: 60, 2: 120, 3: 150 }[kind];
  let ra = norm360(ramc + guess);
  for (let i = 0; i < 200; i++) {
    const dec = atanD(sinD(ra) * tanD(eps));
    const rise = tanD(dec) * tanD(phi);
    if (Math.abs(rise) > 1) return null;
    const ad = asinD(rise);
    const day = 90 + ad;
    const night = 90 - ad;
    const next = norm360(
      kind === 'asc' ? ramc + day
        : kind === 11 ? ramc + day / 3
        : kind === 12 ? ramc + (2 * day) / 3
        : kind === 2 ? ramc + day + night / 3
        : ramc + day + (2 * night) / 3,
    );
    const moved = Math.abs(signedDelta(ra, next));
    ra = next;
    if (moved < 1e-12) return norm360(atan2D(sinD(ra) / cosD(eps), cosD(ra)));
  }
  return null;
}

const show = (l: number) => `${signOf(l).n.slice(0, 3)} ${dms(l)}`;
const TOLERANCE = 0.02;
let failed = 0;

for (const c of CASES) {
  const chart = calculateChart({ date: c.date, time: c.time, lat: c.lat, lon: c.lon, tz: c.tz, houseSystem: 'placidus' });
  const cusps = chart.cusps!;
  console.log(`\n== ${c.name} ==  lat ${c.lat}  system ${chart.houseSystemResolved}`);

  const checks: Array<[string, number, 'asc' | 2 | 3 | 11 | 12]> = [
    ['ASC    ', chart.ascendant!, 'asc'],
    ['cusp 11', cusps[10], 11],
    ['cusp 12', cusps[11], 12],
    ['cusp 2 ', cusps[1], 2],
    ['cusp 3 ', cusps[2], 3],
  ];

  for (const [label, ours, kind] of checks) {
    const ref = reference(kind, chart.lstDeg, c.lat, chart.obliquity);
    if (ref === null) {
      console.log(`  ${label}  ${show(ours)}  — Placidus undefined here, using ${chart.houseSystemResolved}`);
      continue;
    }
    const diff = Math.abs(signedDelta(ours, ref));
    const bad = diff > TOLERANCE;
    if (bad) failed += 1;
    console.log(`  ${label}  ${show(ours).padEnd(12)} ref ${show(ref).padEnd(12)} Δ ${diff.toFixed(4)}° ${bad ? '<<< FAIL' : 'ok'}`);
  }
}

console.log(
  failed === 0
    ? `\nPASS — every defined cusp within ${TOLERANCE}°.`
    : `\nFAIL — ${failed} cusp(s) outside ${TOLERANCE}°.`,
);
process.exit(failed === 0 ? 0 : 1);
