import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/lib/db';
import { account, session, user, verification } from '@/lib/db/schema';

const secret =
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  'meridian-dev-auth-secret-do-not-use-in-prod';

const baseURL = process.env.BETTER_AUTH_URL ?? process.env.SITE_URL ?? 'http://localhost:3000';
const googleId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

export const googleEnabled = Boolean(googleId && googleSecret);
export const databaseEnabled = Boolean(db);

export const auth = db
  ? betterAuth({
      database: drizzleAdapter(db, {
        provider: 'pg',
        schema: { user, session, account, verification },
      }),
      secret,
      baseURL,
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
      },
      socialProviders:
        googleEnabled && googleId && googleSecret
          ? {
              google: {
                clientId: googleId,
                clientSecret: googleSecret,
                accessType: 'online',
                prompt: 'select_account',
              },
            }
          : undefined,
      account: {
        accountLinking: {
          enabled: true,
          trustedProviders: ['google'],
        },
      },
      trustedOrigins: [baseURL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
      onAPIError: {
        errorURL: '/sign-in',
      },
      plugins: [nextCookies()],
    })
  : null;

export type Auth = NonNullable<typeof auth>;
