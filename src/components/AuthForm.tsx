'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { FIELD } from '@/components/ui';

type Props = {
  mode: 'sign-in' | 'sign-up';
  googleConfigured: boolean;
  nextPath: string;
  oauthError?: string | null;
};

function authMessage(code: string | undefined, fallback: string, t: (key: string) => string) {
  switch (code) {
    case 'USER_ALREADY_EXISTS':
    case 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL':
      return t('errorExists');
    case 'INVALID_EMAIL_OR_PASSWORD':
      return t('errorBadPassword');
    case 'PASSWORD_TOO_SHORT':
      return t('errorPasswordShort');
    case 'INVALID_EMAIL':
      return t('errorInvalidEmail');
    default:
      return fallback;
  }
}

export default function AuthForm({ mode, googleConfigured, nextPath, oauthError }: Props) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(oauthError ?? null);
  const [busy, setBusy] = useState(false);
  const [googleReady, setGoogleReady] = useState(googleConfigured);
  const [dbReady, setDbReady] = useState(true);

  useEffect(() => {
    fetch('/api/health/auth')
      .then((res) => res.json())
      .then((json: { database?: boolean; google?: boolean }) => {
        setDbReady(Boolean(json.database));
        setGoogleReady(Boolean(json.google));
      })
      .catch(() => setDbReady(false));
  }, []);

  async function afterAuth() {
    await fetch('/api/charts/claim', { method: 'POST' });
    router.push(nextPath);
    router.refresh();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!dbReady) {
      setError(t('dbUnavailable'));
      return;
    }
    if (mode === 'sign-up' && password !== confirm) {
      setError(t('passwordMismatch'));
      return;
    }
    setBusy(true);
    try {
      if (mode === 'sign-up') {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split('@')[0] || 'SideraChart',
        });
        if (res.error) {
          throw new Error(
            authMessage(
              'code' in res.error ? String(res.error.code) : undefined,
              res.error.message || t('signUpFailed'),
              t as (key: string) => string,
            ),
          );
        }
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) {
          throw new Error(
            authMessage(
              'code' in res.error ? String(res.error.code) : undefined,
              res.error.message || t('signInFailed'),
              t as (key: string) => string,
            ),
          );
        }
      }
      await afterAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failed'));
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    if (!dbReady) {
      setError(t('dbUnavailable'));
      return;
    }
    if (!googleReady) {
      setError(t('googleMissing'));
      return;
    }
    setBusy(true);
    const res = await authClient.signIn.social({
      provider: 'google',
      callbackURL: `/signed-in?next=${encodeURIComponent(nextPath)}`,
      newUserCallbackURL: `/signed-in?next=${encodeURIComponent(nextPath)}`,
      errorCallbackURL: `/sign-in?error=oauth&next=${encodeURIComponent(nextPath)}`,
      requestSignUp: true,
    });
    if (res?.error) {
      setBusy(false);
      setError(res.error.message || t('googleFailed'));
      void fetch('/api/health/auth')
        .then((r) => r.json())
        .then((json: { database?: boolean }) => {
          if (!json.database) setError(t('dbUnavailable'));
        })
        .catch(() => setError(t('dbUnavailable')));
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col gap-4">
      <button
        type="button"
        onClick={onGoogle}
        disabled={busy}
        className="flex h-11 items-center justify-center gap-2.5 rounded-control border border-hairline-strong px-6 text-[15px] text-ink hover:border-ink-muted disabled:opacity-60"
      >
        <GoogleMark />
        {t('continueGoogle')}
      </button>
      {!googleReady && (
        <p className="text-caption text-ink-muted [text-wrap:pretty]">
          {t('googleMissing')}
          {process.env.NODE_ENV === 'development' ? (
            <span className="mt-1 block font-mono">{t('googleSetup')}</span>
          ) : null}
        </p>
      )}

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-hairline" />
        <span className="font-mono text-caption text-ink-muted">{t('orEmail')}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {mode === 'sign-up' && (
          <label className="flex flex-col gap-1.5 text-caption text-ink-muted">
            {t('name')}
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FIELD}
            />
          </label>
        )}
        <label className="flex flex-col gap-1.5 text-caption text-ink-muted">
          {t('email')}
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={FIELD}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-caption text-ink-muted">
          {t('password')}
          <input
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={FIELD}
          />
        </label>
        {mode === 'sign-up' && (
          <label className="flex flex-col gap-1.5 text-caption text-ink-muted">
            {t('confirmPassword')}
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={FIELD}
            />
          </label>
        )}
        {!dbReady && (
          <p className="text-caption text-asp-hard [text-wrap:pretty]">
            {t('dbUnavailable')}
            {process.env.NODE_ENV === 'development' ? (
              <span className="mt-1 block font-mono">{t('dbMissing')}</span>
            ) : null}
          </p>
        )}
        {error && dbReady && <p className="text-caption text-asp-hard">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="h-11 rounded-control bg-gold px-6 text-[15px] font-medium text-deep hover:bg-gold-hover disabled:opacity-60"
        >
          {busy ? t('working') : mode === 'sign-up' ? t('createAccount') : t('signInSubmit')}
        </button>
      </form>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#EA4335"
        d="M9 7.2v3.4h4.7c-.2 1.1-1.2 3.2-4.7 3.2-2.8 0-5.1-2.3-5.1-5.2S6.2 3.4 9 3.4c1.6 0 2.7.7 3.3 1.3l2.2-2.2C13.2 1.2 11.3.3 9 .3 4.6.3 1 3.9 1 8.4s3.6 8.1 8 8.1c4.6 0 7.7-3.2 7.7-7.8 0-.5 0-.9-.1-1.3H9z"
      />
    </svg>
  );
}
