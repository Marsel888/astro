import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

const stamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
};

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    issuer: text('issuer').notNull().default(''),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique().on(t.issuer, t.accountId)],
);

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const charts = pgTable('charts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  label: text('label'),
  birthDate: date('birth_date').notNull(),
  birthTime: text('birth_time'),
  timeUnknown: boolean('time_unknown').notNull().default(false),
  lat: text('lat').notNull(),
  lon: text('lon').notNull(),
  tzName: text('tz_name').notNull(),
  placeLabel: text('place_label'),
  houseSystem: text('house_system').notNull().default('placidus'),
  /**
   * Which calculator produced this save: birth-chart, rising, moon,
   * mercury, venus or mars. The maths is the same either way — a chart is
   * a chart — but somebody who asked only for their Moon should be shown their
   * Moon, not ten rows they did not ask for. Null means the whole chart.
   */
  source: text('source'),
  /**
   * Which single-planet calculators have been run against this chart. The maths
   * gives all ten placements the moment a chart is saved, but the cabinet only
   * shows the ones the reader actually asked for — a tab they never opened is
   * empty, with a link to the calculator that fills it.
   */
  placements: text('placements').array(),
  /** The chart the cabinet opens with and writes the daily sky for. */
  isPrimary: boolean('is_primary').notNull().default(false),
  computed: jsonb('computed').notNull(),
  ...stamps,
});

export const interpretations = pgTable(
  'interpretations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    kind: text('kind').notNull(),
    key: text('key').notNull(),
    locale: text('locale').notNull(),
    title: text('title').notNull(),
    bodyMd: text('body_md').notNull(),
    model: text('model'),
    tokensUsed: integer('tokens_used'),
    version: integer('version').notNull().default(1),
    ...stamps,
  },
  (t) => [unique().on(t.kind, t.key, t.locale, t.version)],
);

export const reports = pgTable(
  'reports',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    chartId: uuid('chart_id')
      .notNull()
      .references(() => charts.id, { onDelete: 'cascade' }),
    chartBId: text('chart_b_id').notNull().default(''),
    kind: text('kind').notNull(),
    locale: text('locale').notNull(),
    bodyMd: text('body_md').notNull(),
    model: text('model'),
    tokensUsed: integer('tokens_used'),
    ...stamps,
  },
  (t) => [unique().on(t.chartId, t.chartBId, t.kind, t.locale)],
);

export const usageCounters = pgTable(
  'usage_counters',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    period: text('period').notNull(),
    chartsSaved: integer('charts_saved').notNull().default(0),
    synastryRuns: integer('synastry_runs').notNull().default(0),
    reportsGenerated: integer('reports_generated').notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.userId, t.period] })],
);

export const seoPages = pgTable('seo_pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull(),
  locale: text('locale').notNull(),
  pageType: text('page_type').notNull(),
  title: text('title').notNull(),
  metaDesc: text('meta_desc').notNull(),
  contentMd: text('content_md').notNull(),
  params: jsonb('params'),
  published: boolean('published').notNull().default(false),
});

export const dailyReadings = pgTable(
  'daily_readings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    chartId: uuid('chart_id')
      .notNull()
      .references(() => charts.id, { onDelete: 'cascade' }),
    date: date('date').notNull(),
    transits: jsonb('transits').notNull(),
    bodyMd: text('body_md').notNull(),
  },
  (t) => [unique().on(t.chartId, t.date)],
);

export const celebrityCharts = pgTable('celebrity_charts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  birthDate: date('birth_date').notNull(),
  birthTime: text('birth_time'),
  timeUnknown: boolean('time_unknown').notNull().default(false),
  lat: text('lat').notNull(),
  lon: text('lon').notNull(),
  tzName: text('tz_name').notNull(),
  sourceUrl: text('source_url'),
  computed: jsonb('computed').notNull(),
  published: boolean('published').notNull().default(false),
});
