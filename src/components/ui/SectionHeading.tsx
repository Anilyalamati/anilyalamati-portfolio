import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'reveal-up mb-14 flex flex-col gap-4 sm:mb-20',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ivory-faint uppercase">
        <span className="text-ivory/50">{index}</span>
        <span className="h-px w-8 bg-ivory/30" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="max-w-2xl text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      {description && (
        <p className="max-w-xl text-base text-ivory-dim sm:text-lg">{description}</p>
      )}
    </div>
  );
}
