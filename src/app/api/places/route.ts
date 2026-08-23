import { NextResponse } from 'next/server';
import { find as findTz } from 'geo-tz';
import { formatCoord } from '@/lib/astro';
import { LOCALE_IDS } from '@/i18n/locales';
import { mergePlaces, searchAtlas } from '@/lib/places/atlas';
import { clientIp, rateLimit } from '@/lib/rateLimit';

const PHOTON_LANGS = new Set(['en', 'de', 'fr', 'it']);

function placesLang(raw: string | null): string {
  const id = raw && (LOCALE_IDS as readonly string[]).includes(raw) ? raw : 'en';
  return id === 'pt-BR' ? 'pt' : id;
}

function photonLang(lang: string): string {
  return PHOTON_LANGS.has(lang) ? lang : 'en';
}

export const runtime = 'nodejs';

export type PlaceHit = {
  name: string;
  detail: string;
  kind: string;
  lat: number;
  lon: number;
  tz: string;
  coords: string;
};

const SETTLEMENT = new Set([
  'city',
  'town',
  'village',
  'hamlet',
  'municipality',
  'suburb',
  'neighbourhood',
  'neighborhood',
  'isolated_dwelling',
  'locality',
  'borough',
  'quarter',
  'city_block',
  'farm',
  'allotments',
]);

const KIND_RANK: Record<string, number> = {
  city: 0,
  town: 1,
  municipality: 2,
  village: 3,
  hamlet: 4,
  suburb: 5,
  borough: 6,
  quarter: 7,
  neighbourhood: 8,
  neighborhood: 8,
  locality: 9,
  isolated_dwelling: 10,
  farm: 11,
};

type NominatimHit = {
  lat: string;
  lon: string;
  name?: string;
  type?: string;
  addresstype?: string;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    municipality?: string;
    suburb?: string;
    county?: string;
    state?: string;
    region?: string;
    country?: string;
  };
};

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    name?: string;
    country?: string;
    state?: string;
    county?: string;
    city?: string;
    osm_key?: string;
    osm_value?: string;
    type?: string;
  };
};

const UA = 'SideraChart/0.1 (https://localhost; birth-place lookup)';

function uniqueParts(parts: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const t = p?.trim();
    if (!t) continue;
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

function toHit(
  lat: number,
  lon: number,
  locality: string,
  region: string | undefined,
  country: string | undefined,
  kind: string,
): PlaceHit | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !locality) return null;
  const tz = findTz(lat, lon)[0] ?? 'UTC';
  const detailParts = uniqueParts([kind, region, country]);
  const nameParts = uniqueParts([locality, region, country]);
  return {
    name: nameParts.join(', '),
    detail: detailParts.join(' · '),
    kind,
    lat,
    lon,
    tz,
    coords: formatCoord(lat, lon),
  };
}

function dedupe(hits: PlaceHit[]): PlaceHit[] {
  const seen = new Set<string>();
  const out: PlaceHit[] = [];
  for (const h of hits) {
    const key = `${h.name.toLowerCase()}|${h.lat.toFixed(3)}|${h.lon.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(h);
  }
  return out.sort((a, b) => (KIND_RANK[a.kind] ?? 20) - (KIND_RANK[b.kind] ?? 20));
}

function mapNominatim(hits: NominatimHit[]): PlaceHit[] {
  return hits.flatMap((h) => {
    const kind = h.addresstype || h.type || 'place';
    const locality =
      h.name ||
      h.address?.city ||
      h.address?.town ||
      h.address?.village ||
      h.address?.hamlet ||
      h.address?.municipality ||
      h.address?.suburb ||
      h.display_name.split(',')[0];
    const region = h.address?.state || h.address?.region || h.address?.county;
    const hit = toHit(Number(h.lat), Number(h.lon), locality, region, h.address?.country, kind);
    return hit ? [hit] : [];
  });
}

async function searchNominatim(q: string, lang: string): Promise<PlaceHit[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', q);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '50');
  url.searchParams.set('featureType', 'settlement');
  url.searchParams.set('accept-language', lang);
  const headers = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': lang };

  const res = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    url.searchParams.delete('featureType');
    const retry = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!retry.ok) return [];
    const hits = (await retry.json()) as NominatimHit[];
    return mapNominatim(hits);
  }

  const hits = (await res.json()) as NominatimHit[];
  return mapNominatim(hits);
}

async function searchPhoton(q: string, lang: string): Promise<PlaceHit[]> {
  const url = new URL('https://photon.komoot.io/api/');
  url.searchParams.set('q', q);
  url.searchParams.set('limit', '50');
  url.searchParams.set('lang', lang);
  for (const tag of ['place:city', 'place:town', 'place:village', 'place:hamlet', 'place:municipality']) {
    url.searchParams.append('osm_tag', tag);
  }

  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];

  const data = (await res.json()) as { features?: PhotonFeature[] };
  return (data.features ?? []).flatMap((f) => {
    const kind = f.properties.osm_value || f.properties.type || 'place';
    if (f.properties.osm_key && f.properties.osm_key !== 'place' && f.properties.osm_key !== 'boundary') {
      if (!SETTLEMENT.has(kind)) return [];
    }
    const [lon, lat] = f.geometry.coordinates;
    const locality = f.properties.name || f.properties.city;
    if (!locality) return [];
    const region = f.properties.state || f.properties.county;
    const hit = toHit(lat, lon, locality, region, f.properties.country, kind);
    return hit ? [hit] : [];
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) return NextResponse.json([]);
  const lang = placesLang(url.searchParams.get('lang'));

  const limit = rateLimit(`places:${clientIp(req)}`, 60, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many place lookups. Wait a minute.' }, { status: 429 });
  }

  const local = searchAtlas(q, 40);
  const [photon, nominatim] = await Promise.all([
    searchPhoton(q, photonLang(lang)).catch(() => [] as PlaceHit[]),
    searchNominatim(q, lang).catch(() => [] as PlaceHit[]),
  ]);

  return NextResponse.json(mergePlaces(local, dedupe([...photon, ...nominatim]), 80));
}
