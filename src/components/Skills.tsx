import { Crosshair } from 'lucide-react';
import { useState } from 'react';
import type { SkillCategory } from '../types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills({ categories }: { categories: SkillCategory[] }) {
  const [selected, setSelected] = useState(() => ({
    skill: categories[0]?.skills[0] || '',
    category: categories[0]?.name || '',
  }));

  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionHeading
          index="03 / 05"
          eyebrow="Technical matrix"
          title="From notebook to production."
          description="A full analytical toolkit: interrogate the dataset, model the pattern, engineer the workflow, then ship an interface people can use. Select any capability to inspect its track."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {categories.map((category, categoryIndex) => (
          <Reveal key={category.id} delay={categoryIndex * 0.08} className="h-full">
            <article className="skill-card flex h-full flex-col border border-slate-700/75 bg-panel/40 p-6 sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">Track / 0{categoryIndex + 1}</span>
                <span className="font-mono text-[10px] text-cyan">{String(category.skills.length).padStart(2, '0')} skills</span>
              </div>
              <h3 className="min-h-[64px] font-display text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-paper">{category.name}</h3>
              <div className="mt-6 flex flex-wrap content-start gap-2.5">
                {category.skills.map((skill) => {
                  const isSelected = selected.skill === skill;
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected({ skill, category: category.name })}
                      className={`skill-badge ${isSelected ? 'is-selected' : ''}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
              <div className="mt-auto pt-8">
                <div className="h-px w-full bg-slate-700/60"><div className="h-px w-1/3 bg-cyan/60 transition-all group-hover:w-full" /></div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5" delay={0.12}>
        <div className="flex flex-col gap-3 border border-cyan/20 bg-cyan/[0.035] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" aria-live="polite">
          <div className="flex items-center gap-3">
            <Crosshair size={16} className="shrink-0 text-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">Selected capability</span>
          </div>
          <p className="font-mono text-[11px] text-slate-300"><span className="text-cyan">{selected.skill}</span><span className="mx-3 text-slate-700">//</span><span className="text-slate-500">{selected.category}</span></p>
        </div>
      </Reveal>
    </section>
  );
}
