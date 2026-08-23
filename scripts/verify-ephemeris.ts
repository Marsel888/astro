/**
 * Week-1 gate: print our tropical geocentric positions for 10 dated charts.
 * Compare Sun/Moon/ASC against astro-seek.com and astro.com.
 * Fail the process if any listed planet is off by more than 0.5° on the
 * vernal-equinox sanity check (Sun must be within 0.5° of 0° Aries).
 */
import { calculateChart } from '../src/lib/astro/calculate';
import { dms, signOf } from '../src/lib/chart';

type Case = {
  name: string;
  date: string;
  time: string;
  lat: number;
  lon: number;
  tz: string;
  expectSun?: number;
};

const CASES: Case[] = [
  {
    name: 'Vernal equinox 2024',
    date: '2024-03-20',
    time: '03:06',
    lat: 51.4769,
    lon: 0.0,
    tz: 'UTC',
    expectSun: 0,
  },
  {
    name: 'Design sample — Lisbon',
    date: '1994-03-12',
    time: '14:23',
    lat: 38.7223,
    lon: -9.1393,
    tz: 'Europe/Lisbon',
  },
  {
    name: 'Albert Einstein — Ulm',
    date: '1879-03-14',
    time: '11:30',
    lat: 48.4011,
    lon: 9.9876,
    tz: 'Europe/Berlin',
  },
  {
    name: 'Barack Obama — Honolulu',
    date: '1961-08-04',
    time: '19:24',
    lat: 21.3069,
    lon: -157.8583,
    tz: 'Pacific/Honolulu',
  },
  {
    name: 'Princess Diana — Sandringham',
    date: '1961-07-01',
    time: '19:45',
    lat: 52.8297,
    lon: 0.515,
    tz: 'Europe/London',
  },
  {
    name: 'John Lennon — Liverpool',
    date: '1940-10-09',
    time: '18:30',
    lat: 53.4084,
    lon: -2.9916,
    tz: 'Europe/London',
  },
  {
    name: 'Frida Kahlo — Coyoacán',
    date: '1907-07-06',
    time: '08:30',
    lat: 19.3467,
    lon: -99.1617,
    tz: 'America/Mexico_City',
  },
  {
    name: 'David Bowie — Brixton',
    date: '1947-01-08',
    time: '09:00',
    lat: 51.4613,
    lon: -0.1156,
    tz: 'Europe/London',
  },
  {
    name: 'Marie Curie — Warsaw (noon)',
    date: '1867-11-07',
    time: '12:00',
    lat: 52.2297,
    lon: 21.0122,
    tz: 'Europe/Warsaw',
  },
  {
    name: 'Ada Lovelace — London',
    date: '1815-12-10',
    time: '13:00',
    lat: 51.5074,
    lon: -0.1278,
    tz: 'Europe/London',
  },
];

function fmt(lon: number): string {
  const s = signOf(lon);
  return `${s.n.slice(0, 3)} ${dms(lon)} (${lon.toFixed(3)}°)`;
}

let failed = 0;

for (const c of CASES) {
  try {
    const chart = calculateChart({
      date: c.date,
      time: c.time,
      lat: c.lat,
      lon: c.lon,
      tz: c.tz,
      houseSystem: 'placidus',
    });
    const sun = chart.bodies.find((b) => b.key === 'sun')!;
    const moon = chart.bodies.find((b) => b.key === 'moon')!;
    console.log(`\n== ${c.name} ==`);
    console.log(`  UTC    ${chart.datetimeUtc}`);
    console.log(`  Sun    ${fmt(sun.lon)}`);
    console.log(`  Moon   ${fmt(moon.lon)}`);
    console.log(`  ASC    ${chart.ascendant != null ? fmt(chart.ascendant) : '—'}`);
    console.log(`  MC     ${chart.mc != null ? fmt(chart.mc) : '—'}`);
    if (c.expectSun != null) {
      const delta = Math.abs(((sun.lon - c.expectSun + 180) % 360) - 180);
      const ok = delta <= 0.5;
      console.log(`  CHECK  Sun vs 0° Ari  Δ=${delta.toFixed(3)}°  ${ok ? 'OK' : 'FAIL'}`);
      if (!ok) failed += 1;
    }
  } catch (e) {
    failed += 1;
    console.error(`\n== ${c.name} == ERROR`, e);
  }
}

console.log(`\n${failed === 0 ? 'PASS' : 'FAIL'} — ${failed} automatic check(s) failed.`);
console.log('Compare Sun / Moon / ASC / MC with astro-seek.com and astro.com. Stop if any planet > 0.5°.');
process.exit(failed === 0 ? 0 : 1);
