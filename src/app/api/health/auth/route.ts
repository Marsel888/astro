import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { googleEnabled } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  let database = false;
  if (db) {
    try {
      await db.execute(sql`select 1`);
      database = true;
    } catch {
      database = false;
    }
  }
  return NextResponse.json({
    database,
    google: googleEnabled,
  });
}
