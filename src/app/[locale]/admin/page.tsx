import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import DeleteUserButton from '@/components/DeleteUserButton';
import SiteHeader from '@/components/SiteHeader';
import { getSession } from '@/lib/auth-session';
import { activeSessions, adminStats, isAdmin } from '@/lib/admin';
import { asLocale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

// Per-request and behind an allowlist: nothing here may be cached or prerendered.
export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return { title: 'Адмінка', robots: { index: false, follow: false } };
}

/*
 * The one page on the site that is not translated.
 *
 * It has a single reader, in one language, and putting its forty labels through
 * fifteen locale files would cost more than it could ever return. Everything a
 * visitor can reach still goes through next-intl.
 */
const CALCULATOR_NAMES: Record<string, string> = {
  'birth-chart': 'Натальна карта',
  rising: 'Асцендент',
  moon: 'Місяць',
  mercury: 'Меркурій',
  venus: 'Венера',
  mars: 'Марс',
};

const dateTime = (value: Date | string | null) =>
  value ? new Date(value).toISOString().slice(0, 16).replace('T', ' ') : '—';

function Figure({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="rounded-card border border-hairline bg-panel p-5">
      <p className="font-mono text-caption uppercase tracking-[0.08em] text-ink-muted">{label}</p>
      <p className="mt-2 text-[32px] font-medium tracking-[-0.02em] text-ink">{value}</p>
      {hint ? <p className="mt-1 text-caption text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export default async function AdminPage({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);

  /*
   * A reader who is not the administrator gets a 404, not a 403. There is no
   * reason to tell anyone that this page exists.
   */
  const session = await getSession();
  if (!isAdmin(session?.user.email)) notFound();

  const [stats, active] = await Promise.all([adminStats(), activeSessions()]);
  if (!stats) notFound();

  const peak = Math.max(1, ...stats.signupsByDay.map((row) => row.users));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-[26px] font-medium tracking-[-0.02em] sm:text-h1">Адмінка</h1>
          <p className="font-mono text-caption text-ink-muted">{session?.user.email}</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Figure
            label="Користувачів"
            value={stats.totals.users}
            hint={`+${stats.fresh.day} за добу · +${stats.fresh.week} за тиждень`}
          />
          <Figure
            label="Збережених карт"
            value={stats.totals.charts}
            hint={
              stats.totals.users
                ? `${(stats.totals.charts / stats.totals.users).toFixed(1)} на людину`
                : undefined
            }
          />
          <Figure label="Щоденних читань" value={stats.totals.readings} />
          <Figure label="Активних сесій" value={active} hint="строк ще не вийшов" />
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-h2 font-medium tracking-[-0.02em]">Реєстрації за 30 днів</h2>
          {stats.signupsByDay.length === 0 ? (
            <p className="text-body text-ink-secondary">Поки нікого.</p>
          ) : (
            <div className="rounded-card border border-hairline bg-panel p-5">
              {stats.signupsByDay.map((row) => (
                <div key={row.day} className="flex items-center gap-3 py-0.5">
                  <span className="w-[92px] shrink-0 font-mono text-caption text-ink-muted">
                    {row.day}
                  </span>
                  <span
                    aria-hidden
                    className="h-3 rounded-sm bg-gold"
                    style={{ width: `${Math.max(4, (row.users / peak) * 100)}%` }}
                  />
                  <span className="font-mono text-caption text-ink-secondary">{row.users}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-h2 font-medium tracking-[-0.02em]">Як заходять</h2>
            <div className="rounded-card border border-hairline bg-panel p-5">
              {stats.byProvider.length === 0 ? (
                <p className="text-caption text-ink-muted">—</p>
              ) : (
                stats.byProvider.map((row) => (
                  <div key={row.provider} className="flex justify-between py-1">
                    <span className="text-body text-ink-secondary">
                      {row.provider === 'credential' ? 'Пошта і пароль' : row.provider}
                    </span>
                    <span className="font-mono text-data text-ink">{row.users}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-h2 font-medium tracking-[-0.02em]">З якого калькулятора</h2>
            <div className="rounded-card border border-hairline bg-panel p-5">
              {stats.bySource.length === 0 ? (
                <p className="text-caption text-ink-muted">—</p>
              ) : (
                stats.bySource.map((row) => (
                  <div key={row.source} className="flex justify-between py-1">
                    <span className="text-body text-ink-secondary">
                      {CALCULATOR_NAMES[row.source] ?? row.source}
                    </span>
                    <span className="font-mono text-data text-ink">{row.charts}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-h2 font-medium tracking-[-0.02em]">
            Хто зареєструвався
            <span className="ml-3 font-mono text-caption font-normal text-ink-muted">
              останні {stats.users.length}
            </span>
          </h2>
          <div className="overflow-x-auto rounded-card border border-hairline bg-panel">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-hairline">
                  {['Пошта', 'Імʼя', 'Спосіб', 'Карт', 'Зареєструвався', 'Останній вхід', ''].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-4 py-3 font-mono text-caption uppercase tracking-[0.08em] text-ink-muted"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {stats.users.map((row) => (
                  <tr key={row.id} className="border-b border-hairline last:border-0">
                    <td className="px-4 py-3 text-data text-ink">
                      {row.email}
                      {row.emailVerified ? (
                        <span className="ml-2 font-mono text-caption text-asp-soft">✓</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-data text-ink-secondary">{row.name || '—'}</td>
                    <td className="px-4 py-3 font-mono text-caption text-ink-muted">
                      {row.providers === 'credential' ? 'пошта' : row.providers}
                    </td>
                    <td className="px-4 py-3 font-mono text-data text-ink-secondary">
                      {row.chartCount}
                    </td>
                    <td className="px-4 py-3 font-mono text-caption text-ink-muted">
                      {dateTime(row.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-mono text-caption text-ink-muted">
                      {dateTime(row.lastSeen)}
                    </td>
                    <td className="px-4 py-3">
                      <DeleteUserButton userId={row.id} email={row.email} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {stats.users.length === 0 ? (
            <p className="mt-4 text-body text-ink-secondary">Поки нікого.</p>
          ) : null}
        </section>
      </main>
    </>
  );
}
