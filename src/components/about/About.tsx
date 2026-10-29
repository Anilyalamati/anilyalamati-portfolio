import { aboutParagraphs, aboutStats } from '../../data/about';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-28 sm:py-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-16">
        <div>
          <SectionHeading
            index="01"
            eyebrow="About"
            title="Student, builder, and a student of what actually works."
          />
          <div className="reveal-up max-w-2xl space-y-6 text-lg leading-relaxed text-ivory-dim">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="reveal-up flex flex-col gap-4 lg:pt-24">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between gap-6 border-b border-ivory/10 pb-4"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-ivory-faint uppercase">
                {stat.label}
              </span>
              <span className="font-display text-2xl text-ivory">{stat.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
