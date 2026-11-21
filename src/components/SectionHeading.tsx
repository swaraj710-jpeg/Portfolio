interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span className="font-mono text-[11px] tracking-[0.18em] text-cyan">{index}</span>
        <span className="h-px w-10 bg-slate-700" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">{eyebrow}</span>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] lg:items-end">
        <h2 className="max-w-4xl font-display text-[clamp(2.25rem,5vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-paper">
          {title}
        </h2>
        {description && <p className="max-w-md text-[15px] leading-7 text-slate-400 lg:justify-self-end">{description}</p>}
      </div>
    </div>
  );
}
