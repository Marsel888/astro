/**
 * Which cabinet tabs a saved chart has unlocked.
 *
 * Every placement exists the moment a chart is computed — you cannot find the
 * Moon without also finding Venus. But the cabinet is a record of what the
 * reader asked for, so a tab they never opened stays empty with a link to the
 * calculator that fills it.
 */
export const PLACEMENT_KEYS = ['rising', 'moon', 'mercury', 'venus', 'mars'] as const;
export type PlacementKey = (typeof PLACEMENT_KEYS)[number];

/** Saving from the full birth chart is asking for all of it. */
export const FULL_CHART = 'birth-chart';

export function isPlacementKey(value: unknown): value is PlacementKey {
  return typeof value === 'string' && (PLACEMENT_KEYS as readonly string[]).includes(value);
}

type ChartLike = {
  source: string | null;
  placements: string[] | null;
};

/**
 * Charts saved before this was tracked have a null list. Fall back to their
 * source so nothing a reader already had disappears from under them, and treat
 * an unknown source as the whole chart, which is what it used to mean.
 */
export function unlockedPlacements(chart: ChartLike): Set<PlacementKey> {
  // Asking for the whole chart is asking for every placement in it.
  if (opensEverything(chart)) return new Set(PLACEMENT_KEYS);
  if (chart.placements?.length) return new Set(chart.placements.filter(isPlacementKey));
  return new Set(isPlacementKey(chart.source) ? [chart.source] : []);
}

export function opensEverything(chart: ChartLike): boolean {
  if (chart.placements?.length) return chart.placements.includes(FULL_CHART);
  // No list means a row saved before any of this. Only a single-placement source
  // narrows such a row; anything else it could say used to mean the whole chart.
  return !isPlacementKey(chart.source);
}

/** The list to store when a save comes in, merged with whatever is already there. */
export function mergePlacements(existing: string[] | null, source: string | null): string[] {
  const next = new Set(existing ?? []);
  if (source === FULL_CHART || isPlacementKey(source)) next.add(source);
  return [...next];
}
