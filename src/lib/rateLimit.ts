const buckets = new Map<string, { n: number; reset: number }>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.reset) {
    buckets.set(key, { n: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (current.n >= max) return { ok: false, remaining: 0, retryAt: current.reset };
  current.n += 1;
  return { ok: true, remaining: max - current.n };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'local';
}
