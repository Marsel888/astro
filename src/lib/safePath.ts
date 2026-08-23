export function safeNextPath(value: string | string[] | undefined, fallback = '/dashboard') {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return fallback;
  if (raw.startsWith('/sign-in') || raw.startsWith('/sign-up') || raw.startsWith('/api')) return fallback;
  return raw;
}
