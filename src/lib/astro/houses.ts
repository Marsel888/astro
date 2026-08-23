import { ascendantFromLst, midheavenFromLst } from './angles';
import { cosD, degToRad, norm360, radToDeg, sinD, tanD } from './math';

export type HouseSystem = 'placidus' | 'whole-sign';

export type HouseCusps = {
  system: HouseSystem;
  cusps: number[];
  ascendant: number;
  mc: number;
  ic: number;
  descendant: number;
};

function shouldMod180(prevCusp: number, currentCusp: number): boolean {
  if (currentCusp < prevCusp) {
    if (Math.abs(currentCusp - prevCusp) >= 180) return false;
    return true;
  }
  if (prevCusp < currentCusp) {
    if (currentCusp - prevCusp < 180) return false;
    return true;
  }
  return false;
}

/**
 * Placidus cusps. Munkasey formulary with the forum simplification for the
 * iterative step (avoids arcsin of values > 1). Unreliable beyond ±60° lat.
 */
function placidusCusps(
  ramc: number,
  midheaven: number,
  ascendant: number,
  latitude: number,
  obliquity: number,
): number[] {
  const cuspInterval = (houseNumber: number) => {
    switch (houseNumber) {
      case 2:
        return ramc + 120;
      case 3:
        return ramc + 150;
      case 11:
        return ramc + 30;
      case 12:
        return ramc + 60;
      default:
        return ramc;
    }
  };

  const semiArcRatio = (houseNumber: number) => {
    switch (houseNumber) {
      case 2:
      case 12:
        return 2 / 3;
      case 3:
      case 11:
        return 1 / 3;
      default:
        return 1 / 3;
    }
  };

  const calculatedCusp = (houseNumber: number) => {
    const interval = cuspInterval(houseNumber);
    const saRatio = semiArcRatio(houseNumber);
    let cuspValue = Math.asin(sinD(obliquity) * sinD(interval));
    let prev = 0;
    let guard = 0;
    while (Math.abs(cuspValue - prev) > 0.01 && guard < 40) {
      const m = Math.atan(saRatio * (tanD(latitude) / cosD(interval)));
      const r = Math.atan(
        (tanD(interval) * Math.cos(m)) /
          Math.cos(m + degToRad(obliquity)),
      );
      prev = cuspValue;
      cuspValue = r;
      guard += 1;
    }
    return radToDeg(cuspValue) + 180;
  };

  const c1 = ascendant;
  let c2 = norm360(calculatedCusp(2));
  let c3 = norm360(calculatedCusp(3));
  const c4 = norm360(midheaven + 180);
  const c10 = midheaven;
  let c11 = calculatedCusp(11);
  let c12 = calculatedCusp(12);
  let c5 = norm360(c11 + 180);
  let c6 = norm360(c12 + 180);
  const c7 = norm360(ascendant + 180);
  let c8 = norm360(c2 + 180);
  let c9 = norm360(c3 + 180);

  if (shouldMod180(c1, c2)) c2 = norm360(c2 + 180);
  if (shouldMod180(c1, c3)) c3 = norm360(c3 + 180);
  if (shouldMod180(c4, c5)) c5 = norm360(c5 + 180);
  if (shouldMod180(c4, c6)) c6 = norm360(c6 + 180);
  if (shouldMod180(c7, c8)) c8 = norm360(c8 + 180);
  if (shouldMod180(c7, c9)) c9 = norm360(c9 + 180);
  if (shouldMod180(c10, c11)) c11 = norm360(c11 + 180);
  if (shouldMod180(c10, c12)) c12 = norm360(c12 + 180);

  return [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12];
}

function wholeSignCusps(ascendant: number): number[] {
  const start = Math.floor(norm360(ascendant) / 30) * 30;
  return Array.from({ length: 12 }, (_, i) => norm360(start + i * 30));
}

export function calculateHouses(opts: {
  latitude: number;
  localSiderealTimeDeg: number;
  obliquity: number;
  system: HouseSystem;
}): HouseCusps {
  const { latitude, localSiderealTimeDeg, obliquity, system } = opts;
  const ramc = norm360(localSiderealTimeDeg);
  const mc = midheavenFromLst(ramc, obliquity);
  const ascendant = ascendantFromLst(latitude, ramc, obliquity);
  const cusps =
    system === 'whole-sign'
      ? wholeSignCusps(ascendant)
      : placidusCusps(ramc, mc, ascendant, latitude, obliquity);

  return {
    system,
    cusps,
    ascendant,
    mc,
    ic: norm360(mc + 180),
    descendant: norm360(ascendant + 180),
  };
}

export function houseOf(lon: number, cusps: number[]): number {
  const L = norm360(lon);
  for (let i = 0; i < 12; i++) {
    const a = norm360(cusps[i]);
    const b = norm360(cusps[(i + 1) % 12]);
    if (a < b ? L >= a && L < b : L >= a || L < b) return i + 1;
  }
  return 1;
}
