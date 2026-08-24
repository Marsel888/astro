import { useTranslations } from 'next-intl';
import { formatCoord, type ChartResult } from '@/lib/astro';
import type { BirthData } from '@/lib/places/defaults';

type Props = {
  data: BirthData;
  chart: ChartResult;
};

/**
 * What the result on screen was actually computed from.
 *
 * The single-planet calculators showed a sign, a degree and a house with nothing
 * saying whose birth data produced them — and the form starts pre-filled with a
 * sample chart. Somebody who did not replace it got Lisbon's houses and no way
 * to tell, which reads as the site contradicting itself against a saved chart.
 *
 * The place name leads, because that is the field people forget to change.
 */
export default function BirthDataLine({ data, chart }: Props) {
  const common = useTranslations('common');

  return (
    <p className="font-mono text-caption text-ink-muted">
      {data.place.name} · {data.date} ·{' '}
      {data.timeUnknown ? common('timeUnknown') : data.time} · {data.place.tz} ·{' '}
      {formatCoord(chart.lat, chart.lon)} ·{' '}
      {chart.timeUnknown
        ? common('noHouses')
        : chart.houseSystemResolved === 'porphyry'
          ? common('porphyry')
          : common('placidus')}{' '}
      · {common('tropical')}
    </p>
  );
}
