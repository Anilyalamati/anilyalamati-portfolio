import { Award, ExternalLink } from 'lucide-react';
import type { Certification } from '../../types';

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <div className="reveal-up flex items-start gap-4 rounded-2xl border border-ivory/12 bg-ivory/[0.02] p-6">
      {certification.image ? (
        <img
          src={certification.image}
          alt=""
          className="h-14 w-14 shrink-0 rounded-lg border border-ivory/10 object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-ivory/15 text-ivory/70">
          <Award size={22} aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="font-display text-lg text-ivory">{certification.title}</h3>
        <p className="mt-1 text-sm text-ivory-faint">
          {certification.issuer}
          {certification.date ? ` · ${certification.date}` : ''}
        </p>
        {certification.url && (
          <a
            href={certification.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ivory/80 hover:text-ivory"
          >
            Verify
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
