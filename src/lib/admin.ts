import { and, count, desc, eq, gte, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { account, charts, dailyReadings, session, user } from '@/lib/db/schema';

/**
 * Who may open the admin page.
 *
 * An allowlist in the environment rather than a role column: there is one
 * administrator, the list never changes at runtime, and nothing written to the
 * database can grant the right. A missing variable means nobody is admin, so a
 * misconfigured deploy locks the page instead of opening it.
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  emailVerified: boolean;
  providers: string;
  chartCount: number;
  lastSeen: Date | null;
};

export type AdminStats = {
  totals: { users: number; charts: number; readings: number };
  fresh: { day: number; week: number; month: number };
  byProvider: Array<{ provider: string; users: number }>;
  bySource: Array<{ source: string; charts: number }>;
  signupsByDay: Array<{ day: string; users: number }>;
  users: AdminUser[];
};

const since = (days: number) => new Date(Date.now() - days * 86_400_000);

/** Everything the admin page shows, in one round trip per figure. */
export async function adminStats(): Promise<AdminStats | null> {
  if (!db) return null;

  const one = async (promise: Promise<Array<{ n: number }>>) => (await promise)[0]?.n ?? 0;

  const [users, chartCount, readings, day, week, month] = await Promise.all([
    one(db.select({ n: count() }).from(user)),
    one(db.select({ n: count() }).from(charts)),
    one(db.select({ n: count() }).from(dailyReadings)),
    one(db.select({ n: count() }).from(user).where(gte(user.createdAt, since(1)))),
    one(db.select({ n: count() }).from(user).where(gte(user.createdAt, since(7)))),
    one(db.select({ n: count() }).from(user).where(gte(user.createdAt, since(30)))),
  ]);

  const byProvider = await db
    .select({ provider: account.providerId, users: count() })
    .from(account)
    .groupBy(account.providerId)
    .orderBy(desc(count()));

  const bySource = await db
    .select({ source: sql<string>`coalesce(${charts.source}, 'birth-chart')`, charts: count() })
    .from(charts)
    .groupBy(sql`coalesce(${charts.source}, 'birth-chart')`)
    .orderBy(desc(count()));

  const signupsByDay = await db
    .select({
      day: sql<string>`to_char(${user.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`,
      users: count(),
    })
    .from(user)
    .where(gte(user.createdAt, since(30)))
    .groupBy(sql`to_char(${user.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`)
    .orderBy(sql`to_char(${user.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`);

  /*
   * One row per reader, newest first. The counts are correlated subqueries
   * rather than joins: a join would multiply the row per chart and per session,
   * and the totals would come out wrong in a way that looks plausible.
   */
  const rows = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      emailVerified: user.emailVerified,
      providers: sql<string>`(
        select coalesce(string_agg(distinct a.provider_id, ', '), '—')
        from ${account} a where a.user_id = ${user.id}
      )`,
      chartCount: sql<number>`(
        select count(*)::int from ${charts} c where c.user_id = ${user.id}
      )`,
      lastSeen: sql<Date | null>`(
        select max(s.created_at) from ${session} s where s.user_id = ${user.id}
      )`,
    })
    .from(user)
    .orderBy(desc(user.createdAt))
    .limit(200);

  return {
    totals: { users, charts: chartCount, readings },
    fresh: { day, week, month },
    byProvider,
    bySource,
    signupsByDay,
    users: rows,
  };
}

/** Delete a reader and everything attached, from the admin table. */
export async function adminDeleteUser(id: string): Promise<boolean> {
  if (!db) return false;
  const removed = await db.delete(user).where(eq(user.id, id)).returning({ id: user.id });
  return removed.length > 0;
}

/** Sessions still valid right now — a rough "who is around". */
export async function activeSessions(): Promise<number> {
  if (!db) return 0;
  const rows = await db
    .select({ n: count() })
    .from(session)
    .where(and(gte(session.expiresAt, new Date())));
  return rows[0]?.n ?? 0;
}
