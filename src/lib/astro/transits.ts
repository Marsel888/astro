import { calculateChart, type ChartResult } from '@/lib/astro';

/**
 * The sky at noon on a given day, from the same place as a natal chart.
 *
 * This lived in lib/charts/daily.ts, next to the code that reads and writes the
 * database. It is a pure calculation and the public transits page needs it in
 * the browser — importing it from there pulled the Postgres driver into the
 * client bundle and the build refused, which is the correct outcome and a
 * confusing error to read.
 *
 * Noon rather than midnight because a day has to pick a moment, and noon is the
 * one that does not drift into the neighbouring date at either end.
 */
export function transitChartForDate(natal: ChartResult, isoDate: string): ChartResult {
  return calculateChart({
    date: isoDate,
    time: '12:00',
    lat: natal.lat,
    lon: natal.lon,
    tz: natal.tz,
    houseSystem: natal.houseSystem,
    timeUnknown: false,
    placeLabel: natal.placeLabel,
  });
}
