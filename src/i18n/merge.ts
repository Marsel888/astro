function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  over: Record<string, unknown>,
): T {
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(over)) {
    const current = out[key];
    if (isRecord(current) && isRecord(value)) {
      out[key] = deepMerge(current, value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
