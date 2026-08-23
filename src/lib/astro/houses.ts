import { ascendantFromLst, midheavenFromLst } from './angles';
import { asinD, atanD, atan2D, cosD, norm360, signedDelta, sinD, tanD } from './math';

export type HouseSystem = 'placidus' | 'whole-sign';

export type HouseCusps = {
  system: HouseSystem;
  /** The system actually used. Placidus degrades to Porphyry inside the polar circle. */
  resolved: HouseSystem | 'porphyry';
  cusps: number[];
  ascendant: number;
  mc: number;
  ic: number;
  descendant: number;
};

/** Ecliptic longitude of the ecliptic point whose right ascension is `ra`. */
function eclipticFromRa(ra: number, obliquity: number): number {
  return norm360(atan2D(sinD(ra) / cosD(obliquity), cosD(ra)));
}

/** Declination of the ecliptic point whose right ascension is `ra`. */
function declinationFromRa(ra: number, obliquity: number): number {
  return atanD(sinD(ra) * tanD(obliquity));
}

type IntermediateCusp = 2 | 3 | 11 | 12;

/** Right ascension a cusp would have if every point rose on the equator. */
const FIRST_GUESS: Record<IntermediateCusp, number> = { 11: 30, 12: 60, 2: 120, 3: 150 };

/**
 * One Placidus cusp, by definition: the ecliptic point that has covered a fixed
 * fraction of its own semi-arc since culmination.
 *
 *   cusp 11 → 1/3 of the semi-diurnal arc after the MC
 *   cusp 12 → 2/3 of the semi-diurnal arc
 *   cusp  2 → the whole semi-diurnal arc (the Ascendant) plus 1/3 of the semi-nocturnal arc
 *   cusp  3 → the Ascendant plus 2/3 of the semi-nocturnal arc
 *
 * The semi-arcs depend on the cusp's own declination, which depends on the answer,
 * so the equation is solved by fixed-point iteration. Returns null when the point
 * never rises (|tan δ · tan φ| > 1) or the iteration will not settle — both mean
 * Placidus is undefined there and the caller must fall back.
 */
function placidusCusp(
  cusp: IntermediateCusp,
  ramc: number,
  latitude: number,
  obliquity: number,
): number | null {
  let ra = norm360(ramc + FIRST_GUESS[cusp]);
  for (let step = 0; step < 100; step++) {
    const declination = declinationFromRa(ra, obliquity);
    const rise = tanD(declination) * tanD(latitude);
    if (Math.abs(rise) > 1) return null;
    const ascensionalDifference = asinD(rise);
    const semiDiurnal = 90 + ascensionalDifference;
    const semiNocturnal = 90 - ascensionalDifference;
    const next = norm360(
      cusp === 11
        ? ramc + semiDiurnal / 3
        : cusp === 12
          ? ramc + (2 * semiDiurnal) / 3
          : cusp === 2
            ? ramc + semiDiurnal + semiNocturnal / 3
            : ramc + semiDiurnal + (2 * semiNocturnal) / 3,
    );
    const moved = Math.abs(signedDelta(ra, next));
    ra = next;
    if (moved < 1e-9) return eclipticFromRa(ra, obliquity);
  }
  return null;
}

function assemble(
  ascendant: number,
  mc: number,
  c2: number,
  c3: number,
  c11: number,
  c12: number,
): number[] {
  return [
    ascendant,
    c2,
    c3,
    norm360(mc + 180),
    norm360(c11 + 180),
    norm360(c12 + 180),
    norm360(ascendant + 180),
    norm360(c2 + 180),
    norm360(c3 + 180),
    mc,
    c11,
    c12,
  ];
}

/** Equal trisection of each quadrant. Placidus falls back here inside the polar circle. */
function porphyryCusps(ascendant: number, mc: number): number[] {
  const ic = norm360(mc + 180);
  const upper = norm360(ascendant - mc);
  const lower = norm360(ic - ascendant);
  return assemble(
    ascendant,
    mc,
    norm360(ascendant + lower / 3),
    norm360(ascendant + (2 * lower) / 3),
    norm360(mc + upper / 3),
    norm360(mc + (2 * upper) / 3),
  );
}

function placidusCusps(
  ramc: number,
  mc: number,
  ascendant: number,
  latitude: number,
  obliquity: number,
): number[] | null {
  const c11 = placidusCusp(11, ramc, latitude, obliquity);
  const c12 = placidusCusp(12, ramc, latitude, obliquity);
  const c2 = placidusCusp(2, ramc, latitude, obliquity);
  const c3 = placidusCusp(3, ramc, latitude, obliquity);
  if (c11 == null || c12 == null || c2 == null || c3 == null) return null;
  return assemble(ascendant, mc, c2, c3, c11, c12);
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

  let resolved: HouseSystem | 'porphyry' = system;
  let cusps: number[];
  if (system === 'whole-sign') {
    cusps = wholeSignCusps(ascendant);
  } else {
    const placidus = placidusCusps(ramc, mc, ascendant, latitude, obliquity);
    if (placidus) {
      cusps = placidus;
    } else {
      cusps = porphyryCusps(ascendant, mc);
      resolved = 'porphyry';
    }
  }

  return {
    system,
    resolved,
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
