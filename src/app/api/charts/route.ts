import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { charts } from '@/lib/db/schema';
import { mergePlacements } from '@/lib/charts/placements';
import { chartFromBirth } from '@/lib/astro/fromBirth';
import { rateLimit } from '@/lib/rateLimit';
import { bumpUsage } from '@/lib/usage';
import type { BirthData } from '@/lib/places/defaults';
import type { ChartResult } from '@/lib/astro';

export const runtime = 'nodejs';

/**
 * Which calculator produced the save. The chart computed is identical either
 * way, but the cabinet shows somebody who asked for their Moon their Moon,
 * rather than ten rows they never asked about. Anything unrecognised is stored
 * as null, which means the whole chart.
 */
const SOURCES = ['birth-chart', 'rising', 'moon', 'mercury', 'venus', 'mars'] as const;
type Source = (typeof SOURCES)[number];

type SaveBody = {
  date?: string;
  time?: string;
  timeUnknown?: boolean;
  place?: { name?: string; lat?: number; lon?: number; tz?: string };
  label?: string;
  source?: string;
};

function parseBirth(body: SaveBody): BirthData | null {
  const date = body.date;
  const time = body.time ?? '12:00';
  const place = body.place;
  if (!date || !place || typeof place.lat !== 'number' || typeof place.lon !== 'number' || !place.tz) {
    return null;
  }
  if (place.lat < -90 || place.lat > 90 || place.lon < -180 || place.lon > 180) return null;
  return {
    date,
    time,
    timeUnknown: Boolean(body.timeUnknown),
    place: {
      name: place.name || 'Unknown place',
      lat: place.lat,
      lon: place.lon,
      tz: place.tz,
      coords: '',
    },
  };
}

async function sessionOf(request: Request) {
  if (!auth) return null;
  return auth.api.getSession({ headers: request.headers });
}

export async function GET(request: Request) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  const session = await sessionOf(request);
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const rows = await db
    .select({
      id: charts.id,
      label: charts.label,
      birthDate: charts.birthDate,
      birthTime: charts.birthTime,
      timeUnknown: charts.timeUnknown,
      placeLabel: charts.placeLabel,
      createdAt: charts.createdAt,
    })
    .from(charts)
    .where(eq(charts.userId, session.user.id));

  return NextResponse.json({ charts: rows });
}

export async function POST(request: Request) {
  if (!db) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });

  const session = await sessionOf(request);

  // Saving requires an account. A chart with no owner is birth data that nobody
  // can open, export or delete — it just accumulates. The calculator itself
  // stays free and needs no account; only keeping the result does.
  if (!session) {
    return NextResponse.json(
      { error: 'Create a free account to save this chart.', needAccount: true },
      { status: 401 },
    );
  }

  const limit = rateLimit(`charts:${session.user.id}`, 40, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many saves. Try again later.' }, { status: 429 });
  }

  let json: SaveBody;
  try {
    json = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const birth = parseBirth(json);
  if (!birth) return NextResponse.json({ error: 'Need date, time and place.' }, { status: 400 });

  let computed: ChartResult;
  try {
    computed = chartFromBirth(birth);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Calculation failed' },
      { status: 400 },
    );
  }

  const sun = computed.bodies.find((b) => b.key === 'sun');
  const moon = computed.bodies.find((b) => b.key === 'moon');
  const label =
    json.label?.trim() ||
    [sun ? `${sun.sign} Sun` : null, moon ? `${moon.sign} Moon` : null, birth.place.name]
      .filter(Boolean)
      .join(' · ');

  const source = SOURCES.includes(json.source as Source) ? (json.source as Source) : null;

  /*
   * Running a second calculator on the same birth data is not a second chart.
   * Without this, working out your Moon and then your Venus left two identical
   * rows in the cabinet and the reader had to guess which one it followed.
   */
  const [existing] = await db
    .select({ id: charts.id, placements: charts.placements })
    .from(charts)
    .where(
      and(
        eq(charts.userId, session.user.id),
        eq(charts.birthDate, birth.date),
        eq(charts.timeUnknown, birth.timeUnknown),
        eq(charts.lat, String(birth.place.lat)),
        eq(charts.lon, String(birth.place.lon)),
        eq(charts.tzName, birth.place.tz),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(charts)
      .set({ placements: mergePlacements(existing.placements, source) })
      .where(eq(charts.id, existing.id));
    return NextResponse.json({ id: existing.id, merged: true });
  }

  const [row] = await db
    .insert(charts)
    .values({
      userId: session.user.id,
      label,
      birthDate: birth.date,
      birthTime: birth.timeUnknown ? null : birth.time,
      timeUnknown: birth.timeUnknown,
      lat: String(birth.place.lat),
      lon: String(birth.place.lon),
      tzName: birth.place.tz,
      placeLabel: birth.place.name,
      houseSystem: computed.houseSystem,
      source,
      placements: mergePlacements(null, source),
      computed,
    })
    .returning({ id: charts.id });

  if (!row) return NextResponse.json({ error: 'Could not save chart' }, { status: 500 });
  await bumpUsage(session.user.id, 'chartsSaved');

  return NextResponse.json({ id: row.id });
}
