import type { ReportDoc } from '@/lib/interpret/report';

export default function ReportView({ doc }: { doc: ReportDoc }) {
  return (
    <article className="report-sheet mx-auto max-w-[720px] rounded-card bg-reading px-5 py-10 sm:px-12 sm:py-14">
      <p className="font-mono text-caption text-read-secondary">{doc.kicker}</p>
      <h1 className="mb-8 mt-3 font-serif text-[28px] font-medium tracking-[-0.02em] text-read sm:text-[32px]">
        {doc.title}
      </h1>
      <div className="flex flex-col gap-9">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 font-serif text-[20px] font-medium text-read">{section.heading}</h2>
            <div className="flex flex-col gap-3">
              {section.paragraphs.map((p, i) => (
                <p
                  key={`${section.heading}-${i}`}
                  className="font-serif text-[17px] leading-[1.68] text-read-secondary [text-wrap:pretty]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
