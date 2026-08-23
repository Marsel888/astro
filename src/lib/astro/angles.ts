import { cosD, norm360, radToDeg, sinD, tanD } from './math';

/** Midheaven (MC) from local sidereal time in degrees. Meeus ch. 24. */
export function midheavenFromLst(
  localSiderealTimeDeg: number,
  obliquity = 23.4392911,
): number {
  const lst = norm360(localSiderealTimeDeg);
  let mc = radToDeg(Math.atan(tanD(lst) / cosD(obliquity)));
  if (mc < 0) mc += 360;
  if (mc > lst) mc -= 180;
  if (mc < 0) mc += 180;
  if (mc < 180 && lst >= 180) mc += 180;
  return norm360(mc);
}

/**
 * Ascendant from latitude and LST (RAMC) in degrees.
 * Peter Duffett-Smith / Wikipedia quadrant correction.
 */
export function ascendantFromLst(
  latitude: number,
  localSiderealTimeDeg: number,
  obliquity = 23.4392911,
): number {
  const lst = norm360(localSiderealTimeDeg);
  const a = -cosD(lst);
  const b = sinD(obliquity) * tanD(latitude);
  const c = cosD(obliquity) * sinD(lst);
  const d = b + c;
  let asc = radToDeg(Math.atan(a / d));
  if (d < 0) asc += 180;
  else asc += 360;
  if (asc >= 180) asc -= 180;
  else asc += 180;
  return norm360(asc);
}
