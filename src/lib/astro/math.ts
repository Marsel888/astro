export function norm360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function sinD(deg: number): number {
  return Math.sin(degToRad(deg));
}

export function cosD(deg: number): number {
  return Math.cos(degToRad(deg));
}

export function tanD(deg: number): number {
  return Math.tan(degToRad(deg));
}

export function asinD(value: number): number {
  return radToDeg(Math.asin(Math.max(-1, Math.min(1, value))));
}

export function atanD(value: number): number {
  return radToDeg(Math.atan(value));
}

export function atan2D(y: number, x: number): number {
  return radToDeg(Math.atan2(y, x));
}

export function angularSep(a: number, b: number): number {
  const d = Math.abs(norm360(a) - norm360(b)) % 360;
  return d > 180 ? 360 - d : d;
}

/** Signed difference b − a folded into (−180, 180]. */
export function signedDelta(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}
