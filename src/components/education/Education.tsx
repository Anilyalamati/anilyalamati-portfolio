import { GraduationCap } from 'lucide-react';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  const { education } = profile;

  return (
    <section id="education" aria-labelledby="education-heading" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading index="04" eyebrow="Education" title="Where this is being built." />

        <div className="reveal-up flex flex-col gap-8 rounded-2xl border border-ivory/12 bg-ivory/[0.02] p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory">
            <GraduationCap size={24} aria-hidden="true" />
          </div>

          <div>
            <h3 className="font-display text-2xl text-ivory sm:text-3xl">
              {education.institution}
            </h3>
            <p className="mt-2 text-ivory-dim">
              {education.degree} &mdash; {education.field}
              {education.focus ? `, ${education.focus}` : ''}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-1.5 text-xs font-medium tracking-wide text-ivory/85 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-ivory" aria-hidden="true" />
              {education.status}
              {education.graduationYear ? ` · Class of ${education.graduationYear}` : ''}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
