/**
 * Which cabinet tabs a saved chart opens.
 *
 * The rules are small and the consequences are not: get them wrong and a reader
 * either sees five readings they never asked for, or saves the whole chart and
 * still finds the tabs shut. Both have happened.
 */
import {
  FULL_CHART,
  mergePlacements,
  opensEverything,
  PLACEMENT_KEYS,
  unlockedPlacements,
} from '../src/lib/charts/placements';

type Case = {
  name: string;
  chart: { source: string | null; placements: string[] | null };
  unlocked: string[];
  everything: boolean;
};

const ALL = [...PLACEMENT_KEYS];

const CASES: Case[] = [
  {
    name: 'saved from the Moon calculator',
    chart: { source: 'moon', placements: ['moon'] },
    unlocked: ['moon'],
    everything: false,
  },
  {
    name: 'Moon, then Venus on the same birth data',
    chart: { source: 'moon', placements: ['moon', 'venus'] },
    unlocked: ['moon', 'venus'],
    everything: false,
  },
  {
    name: 'the whole chart opens every placement',
    chart: { source: FULL_CHART, placements: [FULL_CHART] },
    unlocked: ALL,
    everything: true,
  },
  {
    name: 'a placement first, the whole chart after',
    chart: { source: 'moon', placements: ['moon', FULL_CHART] },
    unlocked: ALL,
    everything: true,
  },
  {
    name: 'saved before any of this was tracked',
    chart: { source: null, placements: null },
    unlocked: ALL,
    everything: true,
  },
  {
    name: 'old row, saved from one calculator',
    chart: { source: 'rising', placements: null },
    unlocked: ['rising'],
    everything: false,
  },
  {
    name: 'a source nobody recognises still means the whole chart',
    chart: { source: 'synastry', placements: null },
    unlocked: ALL,
    everything: true,
  },
];

const MERGES: Array<[string[] | null, string | null, string[]]> = [
  [null, 'moon', ['moon']],
  [['moon'], 'venus', ['moon', 'venus']],
  [['moon'], 'moon', ['moon']],
  [['moon'], FULL_CHART, ['moon', FULL_CHART]],
  [['moon'], 'synastry', ['moon']],
  [null, null, []],
];

const same = (a: string[], b: string[]) => [...a].sort().join(',') === [...b].sort().join(',');

let failed = 0;

console.log('== what a saved chart opens ==');
for (const c of CASES) {
  const got = [...unlockedPlacements(c.chart)];
  const every = opensEverything(c.chart);
  const bad = !same(got, c.unlocked) || every !== c.everything;
  if (bad) failed += 1;
  console.log(
    `  ${c.name.padEnd(48)} ${(got.join(' ') || '—').padEnd(34)} ${bad ? `<<< FAIL, wanted ${c.unlocked.join(' ') || '—'}` : 'ok'}`,
  );
}

console.log('\n== what a save records ==');
for (const [existing, source, want] of MERGES) {
  const got = mergePlacements(existing, source);
  const bad = !same(got, want);
  if (bad) failed += 1;
  console.log(
    `  ${`${existing?.join(' ') ?? '—'} + ${source ?? '—'}`.padEnd(48)} ${(got.join(' ') || '—').padEnd(34)} ${bad ? `<<< FAIL, wanted ${want.join(' ') || '—'}` : 'ok'}`,
  );
}

console.log(failed === 0 ? '\nPASS — every rule holds.' : `\nFAIL — ${failed} rule(s) broken.`);
process.exit(failed === 0 ? 0 : 1);
