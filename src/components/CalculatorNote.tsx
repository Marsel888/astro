type Props = {
  title: string;
  body: string;
};

export default function CalculatorNote({ title, body }: Props) {
  return (
    <section className="mt-16 max-w-[640px] border-t border-hairline pt-11">
      <h2 className="mb-4 text-h2 font-medium tracking-[-0.01em]">{title}</h2>
      <p className="text-body text-ink-secondary [text-wrap:pretty]">{body}</p>
    </section>
  );
}
