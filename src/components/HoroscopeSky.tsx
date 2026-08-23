import type { SignName } from '@/lib/chart';
import type { SkySnapshot } from '@/lib/interpret/horoscope';

const ROWS: Array<{
  key: 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn';
  glyph: string;
  sign: keyof Pick<
    SkySnapshot,
    'sunSign' | 'moonSign' | 'mercurySign' | 'venusSign' | 'marsSign' | 'jupiterSign' | 'saturnSign'
  >;
  rx?: keyof Pick<SkySnapshot, 'mercuryRx' | 'venusRx' | 'marsRx'>;
}> = [
  { key: 'sun', glyph: '☉', sign: 'sunSign' },
  { key: 'moon', glyph: '☽', sign: 'moonSign' },
  { key: 'mercury', glyph: '☿', sign: 'mercurySign', rx: 'mercuryRx' },
  { key: 'venus', glyph: '♀', sign: 'venusSign', rx: 'venusRx' },
  { key: 'mars', glyph: '♂', sign: 'marsSign', rx: 'marsRx' },
  { key: 'jupiter', glyph: '♃', sign: 'jupiterSign' },
  { key: 'saturn', glyph: '♄', sign: 'saturnSign' },
];

type Props = {
  sky: SkySnapshot;
  signLabel: (sign: SignName) => string;
  planetLabel: (key: string) => string;
  heading?: string;
};

export default function HoroscopeSky({ sky, signLabel, planetLabel, heading }: Props) {
  return (
    <section className="mt-8">
      {heading ? <p className="font-mono text-caption text-ink-muted">{heading}</p> : null}
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {ROWS.map((row) => {
          const rx = row.rx ? sky[row.rx] : false;
          return (
            <li key={row.key} className="rounded-control border border-hairline bg-panel px-3 py-2.5">
              <p className="font-mono text-[11px] text-ink-muted">
                {row.glyph} {planetLabel(row.key)}
                {rx ? ' · Rx' : ''}
              </p>
              <p className="mt-1 text-[14px] text-ink">{signLabel(sky[row.sign])}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
