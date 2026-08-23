import { calculateChart, type ChartResult } from './calculate';
import type { BirthData } from '@/lib/places/defaults';

export function chartFromBirth(data: BirthData): ChartResult {
  return calculateChart({
    date: data.date,
    time: data.timeUnknown ? '12:00' : data.time,
    lat: data.place.lat,
    lon: data.place.lon,
    tz: data.place.tz,
    timeUnknown: data.timeUnknown,
    placeLabel: data.place.name,
    houseSystem: 'placidus',
  });
}
