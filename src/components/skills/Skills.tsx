import { skillCategories } from '../../data/skills';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillCard } from './SkillCard';

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-y border-ivory/8 bg-indigo-950/40 py-28 sm:py-36"
    >
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Tools I actually use."
          description="No percentage bars — just what's been put to work in real builds, organized by area."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
