type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
}: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {kicker ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-gold-soft' : 'text-gold'
          }`}>
          {kicker}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl leading-tight text-balance sm:text-5xl ${
          light ? 'text-ivory' : 'text-charcoal'
        }`}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? 'text-ivory/75' : 'text-muted'
          }`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
