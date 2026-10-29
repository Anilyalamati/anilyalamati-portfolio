import { Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { ContactForm } from './ContactForm';

const directLinks = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'linkedin.com/in/anilyalamati', href: profile.linkedin, icon: LinkedinIcon },
  { label: 'github.com/Anilyalamati', href: profile.github, icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-28 sm:py-36">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Let's talk."
            description="Questions, collaboration ideas, or feedback on these projects — feel free to reach out."
          />
          <ul className="reveal-up flex flex-col gap-4">
            {directLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="group flex items-center gap-3 text-ivory-dim transition-colors hover:text-ivory"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors group-hover:border-ivory/40 group-hover:text-ivory">
                    <link.icon size={16} />
                  </span>
                  <span className="text-sm sm:text-base">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-up rounded-2xl border border-ivory/12 bg-ivory/[0.02] p-6 sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
