import { Sparkles } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CertificationCard } from './CertificationCard';

export function Certifications() {
  const hasCertifications = certifications.length > 0;

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Certifications"
          title="Certifications & achievements."
          description="Courses, workshops, hackathons, and academic milestones — added as they're confirmed."
        />

        {hasCertifications ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {certifications.map((certification) => (
              <CertificationCard key={certification.title} certification={certification} />
            ))}
          </div>
        ) : (
          <div className="reveal-up flex flex-col items-start gap-4 rounded-2xl border border-dashed border-ivory/20 p-10 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory/70">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl text-ivory">More on the way</h3>
              <p className="mt-2 max-w-md text-sm text-ivory-dim">
                Certifications, workshops, and hackathon results will appear here
                as they're added to{' '}
                <code className="rounded bg-ivory/5 px-1.5 py-0.5 font-mono text-xs text-ivory/80">
                  src/data/certifications.ts
                </code>
                .
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
