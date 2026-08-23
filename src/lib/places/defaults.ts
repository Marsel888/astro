import type { Place } from '@/lib/places/atlas';

export const LISBON: Place = {
  name: 'Lisbon, Portugal',
  lat: 38.7223,
  lon: -9.1393,
  tz: 'Europe/Lisbon',
  coords: '38°43′N 9°08′W',
};

export const NEW_YORK: Place = {
  name: 'New York, United States',
  lat: 40.7128,
  lon: -74.006,
  tz: 'America/New_York',
  coords: '40°43′N 74°00′W',
};

export type BirthData = {
  date: string;
  time: string;
  place: Place;
  timeUnknown: boolean;
};

export const DEFAULT_BIRTH: BirthData = {
  date: '1994-03-12',
  time: '14:23',
  place: LISBON,
  timeUnknown: false,
};
