'use client';

import { useTranslations } from 'next-intl';
import DateField from '@/components/DateField';
import PlaceSearch from '@/components/PlaceSearch';
import TimeField from '@/components/TimeField';
import type { BirthData } from '@/lib/places/defaults';

type Props = {
  value: BirthData;
  onChange: (next: BirthData) => void;
  onSubmit: () => void;
  allowUnknownTime?: boolean;
  submitLabel?: string;
  title?: string;
};

export default function BirthDataForm({
  value,
  onChange,
  onSubmit,
  allowUnknownTime = true,
  submitLabel,
  title,
}: Props) {
  const t = useTranslations('form');

  function patch(partial: Partial<BirthData>) {
    onChange({ ...value, ...partial });
  }

  return (
    <section className="rounded-card border border-hairline bg-panel p-4 sm:px-6 sm:py-5">
      {title && <h2 className="mb-4 text-h3 font-medium text-ink">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-[168px_128px_1fr_auto] sm:items-end">
        <DateField value={value.date} onChange={(date) => patch({ date })} />
        <TimeField
          value={value.time}
          onChange={(time) => patch({ time })}
          disabled={value.timeUnknown}
        />
        <PlaceSearch value={value.place} onSelect={(place) => patch({ place })} />
        <button
          type="button"
          onClick={onSubmit}
          className="h-11 rounded-control bg-gold px-6 text-[15px] font-medium text-deep transition-colors hover:bg-gold-hover"
        >
          {submitLabel ?? t('calculate')}
        </button>
      </div>
      {allowUnknownTime && (
        <div className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4 sm:flex-row sm:items-center sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2.5 text-data text-ink-secondary">
            <input
              type="checkbox"
              checked={value.timeUnknown}
              onChange={(e) => patch({ timeUnknown: e.target.checked })}
              className="tick h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border border-hairline-strong bg-deep"
            />
            <span>{t('timeUnknown')}</span>
          </label>
          <span className="text-caption text-ink-muted">{t('timeUnknownHint')}</span>
        </div>
      )}
    </section>
  );
}
