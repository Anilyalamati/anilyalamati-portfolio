import type { SkillCategory } from '../../types';

export function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="reveal-up group relative flex h-full flex-col rounded-2xl border border-ivory/12 bg-ivory/[0.02] p-7 transition-colors duration-300 hover:border-ivory/30 hover:bg-ivory/[0.04]">
      <h3 className="font-display text-xl text-ivory">{category.title}</h3>
      <p className="mt-2 text-sm text-ivory-faint">{category.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-xs font-medium text-ivory/85"
          >
            {skill}
          </li>
        ))}
      </ul>

      {category.note && (
        <p className="mt-5 text-xs text-ivory-faint italic">{category.note}</p>
      )}
    </div>
  );
}
