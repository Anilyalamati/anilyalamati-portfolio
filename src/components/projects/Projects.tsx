import { projects } from '../../data/projects';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-y border-ivory/8 bg-indigo-950/40 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="A few things I've built."
          description="Academic and personal projects — status and links reflect exactly what's available today."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
