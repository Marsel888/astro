'use client';

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
  URL.revokeObjectURL(url);
}

export default function ReportActions({ doc, filename }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
      >
        Print / save PDF
      </button>
      <button
        type="button"
        onClick={() => saveText(filename, reportToText(doc))}
        className="h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
      >
        Download text
      </button>
    </div>
  );
}

export function DownloadTextButton({
  filename,
  text,
  label = 'Download text',
}: {
  filename: string;
  text: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => saveText(filename, text)}
      className="h-11 rounded-control border border-hairline-strong px-4 text-caption text-ink-secondary hover:text-ink sm:h-[34px]"
    >
      {label}
    </button>
  );
}
