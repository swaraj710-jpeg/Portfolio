import { ArrowUpRight, Check } from 'lucide-react';
import type { Experience as ExperienceItem } from '../types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience({ experiences }: { experiences: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <SectionHeading
          index="02 / 05"
          eyebrow="Experience"
          title="Analysis with an operational outcome."
          description="The through-line: find the bottleneck, structure the data, automate the repeatable work, and make the result legible."
        />
      </Reveal>

      <div className="mt-12 space-y-5">
        {experiences.map((item) => (
          <Reveal key={item.id}>
            <article className="experience-card grid gap-8 border border-slate-700/75 bg-panel/45 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:p-10">
              <div className="relative lg:border-r lg:border-slate-700/75 lg:pr-9">
                <div className="mb-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                  <span>Internship / 01</span><span className="h-2 w-2 bg-emerald shadow-[0_0_14px_#10B981]" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan">{item.period}</p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-paper sm:text-4xl">{item.role}</h3>
                <p className="mt-4 text-lg text-slate-300">{item.company} <span className="text-slate-600">/</span> <span className="text-slate-400">{item.location}</span></p>
                <div className="mt-8 inline-flex items-center gap-2 border border-emerald/25 bg-emerald/[0.05] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald">
                  <span className="status-dot" /> Completed
                </div>
              </div>

              <ol className="relative space-y-0 lg:pl-2">
                {item.achievements.map((achievement, index) => (
                  <li key={achievement} className="group grid grid-cols-[34px_1fr] gap-4 border-b border-slate-700/60 py-5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[42px_1fr]">
                    <span className="mt-0.5 grid h-8 w-8 place-items-center border border-slate-700 font-mono text-[10px] text-slate-500 transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                      {index === item.achievements.length - 1 ? <Check size={13} /> : `0${index + 1}`}
                    </span>
                    <p className="text-[15px] leading-7 text-slate-300 sm:text-base">{achievement}</p>
                  </li>
                ))}
                <div className="pointer-events-none absolute bottom-0 right-0 hidden text-slate-800 lg:block" aria-hidden="true"><ArrowUpRight size={52} strokeWidth={0.6} /></div>
              </ol>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
