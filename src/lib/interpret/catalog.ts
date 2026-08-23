import { SIGNS } from '@/lib/chart';
import { ASPECT_SENSE } from './aspects';
import { readingFor, type ReadingKind } from './copy';
import { HOUSES, planetInHouse } from './houses';

const PLANETS: ReadingKind[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
];

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export type CatalogRow = {
  kind: string;
  key: string;
  locale: 'en';
  title: string;
  body: string;
};

let cache: CatalogRow[] | null = null;

/** Static interpretation cache. Keys match `interpretations.kind` + `interpretations.key`. */
export function interpretationCatalog(): CatalogRow[] {
  if (cache) return cache;

  const rows: CatalogRow[] = [];

  for (const planet of PLANETS) {
    for (const sign of SIGNS) {
      rows.push({
        kind: 'planet-sign',
        key: `${planet}-${sign.n.toLowerCase()}`,
        locale: 'en',
        title: `${titleCase(planet)} in ${sign.n}`,
        body: readingFor(planet, sign.n),
      });
    }
    for (let h = 1; h <= 12; h++) {
      const body = planetInHouse(planet, h);
      if (!body) continue;
      rows.push({
        kind: 'planet-house',
        key: `${planet}-house-${h}`,
        locale: 'en',
        title: `${titleCase(planet)} in house ${h}`,
        body,
      });
    }
  }

  for (const sign of SIGNS) {
    rows.push({
      kind: 'rising',
      key: `rising-${sign.n.toLowerCase()}`,
      locale: 'en',
      title: `${sign.n} rising`,
      body: readingFor('rising', sign.n),
    });
  }

  for (let h = 1; h <= 12; h++) {
    const body = HOUSES[h];
    if (!body) continue;
    rows.push({
      kind: 'house',
      key: `house-${h}`,
      locale: 'en',
      title: `House ${h}`,
      body,
    });
  }

  for (const [type, body] of Object.entries(ASPECT_SENSE)) {
    rows.push({
      kind: 'aspect',
      key: `aspect-${type}`,
      locale: 'en',
      title: type,
      body,
    });
  }

  cache = rows;
  return rows;
}

export function findInterpretation(kind: string, key: string): CatalogRow | undefined {
  return interpretationCatalog().find((row) => row.kind === kind && row.key === key);
}
