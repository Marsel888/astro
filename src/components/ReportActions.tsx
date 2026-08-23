'use client';

import { useTranslations } from 'next-intl';
import type { ReportDoc } from '@/lib/interpret/report';
import { reportToText } from '@/lib/interpret/report';

type Props = {
  doc: ReportDoc;
  filename: string;
};

function saveText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

const BUTTON =
  'h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]';

export default function ReportActions({ doc, filename }: Props) {
  const t = useTranslations('common');
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={() => window.print()} className={BUTTON}>
        {t('print')}
      </button>
      <button
        type="button"
        onClick={() => saveText(filename, reportToText(doc))}
        className={BUTTON}
      >
        {t('downloadText')}
      </button>
    </div>
  );
}

export function DownloadTextButton({
  filename,
  text,
  label,
}: {
  filename: string;
  text: string;
  label?: string;
}) {
  const t = useTranslations('common');
  return (
    <button type="button" onClick={() => saveText(filename, text)} className={BUTTON}>
      {label ?? t('downloadText')}
    </button>
  );
}

/**
 * Fetches the file from the server instead of holding its text in the page.
 * The dashboard used to build the whole day-by-day log during render just to
 * fill this button.
 */
export function DownloadLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={`${BUTTON} inline-flex items-center`}>
      {label}
    </a>
  );
}
