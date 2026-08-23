type Props = {
  className?: string;
};

export default function BrandMark({
  className = 'text-h3 font-medium tracking-[-0.01em]',
}: Props) {
  return (
    <span className={className} aria-label="SideraChart">
      <span className="text-gold">Sidera</span>
      <span className="text-ink">Chart</span>
    </span>
  );
}
