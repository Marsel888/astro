/**
 * Fixed-window rate limit, in the memory of one process.
 *
 * Two consequences to keep in mind:
 *  - With more than one instance behind the proxy, each holds its own counters,
 *    so the effective limit is `max × instances`. Moving to Redis is the fix;
 *    the signature here is deliberately the same shape a Redis version would have.
 *  - Nothing expires on its own, so the map is swept below. Without that it grows
 *    by one entry per distinct key forever, which on an IP-keyed limiter is a leak.
 */
type Bucket = { n: number; reset: number };

const buckets = new Map<string, Bucket>();

/** Sweep once the map is big enough that scanning it is worth the cost. */
const SWEEP_THRESHOLD = 5_000;
/** Hard ceiling so a flood of unique keys cannot exhaust memory. */
const MAX_KEYS = 50_000;

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (now > bucket.reset) buckets.delete(key);
  }
  if (buckets.size <= MAX_KEYS) return;
  // Still oversized after the sweep: drop the oldest insertions (Map preserves order).
  const excess = buckets.size - MAX_KEYS;
  let dropped = 0;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    if (++dropped >= excess) break;
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAt?: number;
};

export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  if (buckets.size >= SWEEP_THRESHOLD) sweep(now);

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
