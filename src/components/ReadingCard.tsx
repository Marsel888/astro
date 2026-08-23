import type { ReactNode } from 'react';

type Section = {
  heading: string;
  paragraphs: string[];
};

type Props = {
  kicker: string;
  title: string;
  paragraphs?: string[];
  sections?: Section[];
  footer?: ReactNode;
};

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      {paragraphs.map((p, i) => (
        <p
          key={`${i}-${p.slice(0, 32)}`}
          className="font-serif text-[17px] leading-[1.68] text-read-secondary [text-wrap:pretty]"
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export default function ReadingCard({ kicker, title, paragraphs, sections, footer }: Props) {
  return (
    <section className="result-enter mt-5 rounded-card bg-reading px-5 py-8 sm:px-12 sm:py-11">
      <div className="max-w-[640px]">
        <span className="font-mono text-caption text-read-secondary">{kicker}</span>
        <h3 className="mb-4 mt-3.5 font-serif text-[20px] font-medium tracking-[-0.01em] text-read sm:text-h2">
          {title}
        </h3>
        {sections?.length ? (
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h4 className="mb-3 font-mono text-caption text-gold">{section.heading}</h4>
                <Paragraphs paragraphs={section.paragraphs} />
              </div>
            ))}
          </div>
        ) : (
          <Paragraphs paragraphs={paragraphs ?? []} />
        )}
        {footer}
      </div>
    </section>
  );
}
