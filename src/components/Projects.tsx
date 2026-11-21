import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileCode2, Github, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Project } from '../types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
      <div className="project-visual__label font-mono">{project.category}</div>
      <svg viewBox="0 0 520 220" fill="none" className="h-full w-full">
        <path d="M0 44H520M0 88H520M0 132H520M0 176H520M104 0V220M208 0V220M312 0V220M416 0V220" stroke="currentColor" strokeOpacity=".1" strokeWidth=".8" />
        {project.visual === 'radar' && (
          <g>
            <path d="M149 34L229 80L205 172L106 187L43 112L75 52L149 34Z" stroke="#64748B" strokeOpacity=".45" />
            <path d="M149 62L199 89L184 147L118 157L73 109L94 72L149 62Z" stroke="#64748B" strokeOpacity=".35" />
            <path d="M149 34L205 172M229 80L43 112M106 187L75 52M149 34V187M43 112L229 80" stroke="#64748B" strokeOpacity=".22" />
            <path d="M149 48L213 86L176 153L112 144L65 104L101 64L149 48Z" fill="#06B6D4" fillOpacity=".1" stroke="#06B6D4" strokeWidth="1.5" />
            <path d="M307 169V121M340 169V82M373 169V103M406 169V48M439 169V66M472 169V35" stroke="#10B981" strokeWidth="9" strokeOpacity=".65" />
          </g>
        )}
        {project.visual === 'energy' && (
          <g>
            <path d="M45 174H475" stroke="#64748B" strokeOpacity=".4" />
            <path d="M86 174V89H177V174M214 174V51H320V174M358 174V107H449V174" stroke="#64748B" strokeOpacity=".5" />
            <path d="M277 68L248 116H276L258 153L306 99H278L298 68H277Z" fill="#06B6D4" fillOpacity=".16" stroke="#06B6D4" strokeWidth="1.5" />
            <circle cx="131" cy="123" r="16" stroke="#10B981" /><path d="M123 123H139M131 115V131" stroke="#10B981" />
            <circle cx="403" cy="140" r="16" stroke="#10B981" /><path d="M395 140H411" stroke="#10B981" />
          </g>
        )}
        {project.visual === 'grid' && (
          <g>
            <rect x="70" y="37" width="380" height="146" stroke="#64748B" strokeOpacity=".5" />
            <path d="M70 73H450M70 110H450M70 146H450M196 37V183M324 37V183" stroke="#64748B" strokeOpacity=".35" />
            <rect x="82" y="49" width="63" height="10" fill="#06B6D4" fillOpacity=".65" />
            <rect x="209" y="85" width="88" height="10" fill="#10B981" fillOpacity=".55" />
            <rect x="337" y="122" width="66" height="10" fill="#06B6D4" fillOpacity=".45" />
            <circle cx="422" cy="55" r="5" fill="#10B981" /><circle cx="422" cy="91" r="5" fill="#10B981" fillOpacity=".35" />
          </g>
        )}
        {project.visual === 'sort' && (
          <g>
            <path d="M81 49H439M81 91H439M81 133H439M81 175H439" stroke="#64748B" strokeOpacity=".4" />
            <path d="M126 34V187M355 34V187" stroke="#64748B" strokeOpacity=".25" strokeDasharray="3 5" />
            <path d="M165 62H282M165 104H322M165 146H247" stroke="#06B6D4" strokeWidth="7" strokeOpacity=".65" />
            <path d="M392 54V160M378 144L392 160L406 144" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="104" cy="49" r="4" fill="#06B6D4" /><circle cx="104" cy="91" r="4" fill="#06B6D4" fillOpacity=".6" /><circle cx="104" cy="133" r="4" fill="#06B6D4" fillOpacity=".35" />
          </g>
        )}
      </svg>
      <span className="project-visual__corner" />
    </div>
  );
}

function ProjectCard({ project, index, onOpenSpec }: { project: Project; index: number; onOpenSpec: (project: Project) => void }) {
  const reduceMotion = useReducedMotion();
  const [name, ...descriptor] = project.title.split(' — ');

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`project-card group ${index === 0 ? 'project-card--lead' : ''}`}
    >
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="font-mono text-[9px] uppercase leading-4 tracking-[0.14em] text-cyan">{project.tag}</span>
          <span className="shrink-0 font-mono text-[10px] text-slate-600">/{String(project.sort_order).padStart(2, '0')}</span>
        </div>
        <h3 className="font-display text-[clamp(1.7rem,3vw,2.65rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-paper">
          {name}
          {descriptor.length > 0 && <span className="mt-2 block font-sans text-[15px] font-normal leading-6 tracking-normal text-slate-400">{descriptor.join(' — ')}</span>}
        </h3>
        <p className="mt-5 text-[14px] leading-7 text-slate-400">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="border border-slate-700/80 bg-ink/50 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 transition-colors group-hover:border-slate-600 group-hover:text-slate-300">{tech}</span>
          ))}
        </div>
        {project.visual !== 'sort' && (project.live_url || project.github_url) && (
          <div className="mt-auto flex flex-wrap items-center gap-5 pt-7">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link text-cyan">
                {project.live_label || 'Live Demo'} <ArrowUpRight size={14} />
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link text-slate-400 hover:text-paper">
                <Github size={14} /> GitHub <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        )}
        {project.visual === 'sort' && (
          <div className="mt-auto pt-7">
            <button type="button" onClick={() => onOpenSpec(project)} aria-haspopup="dialog" className="project-link text-cyan">
              <FileCode2 size={14} /> Pipeline Spec <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');
  const [specProject, setSpecProject] = useState<Project | null>(null);
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  useEffect(() => {
    if (!specProject) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSpecProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [specProject]);

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionHeading
          index="01 / 05"
          eyebrow="Selected work"
          title="Evidence, not just a list of tools."
          description="A selection of analytical systems and production builds—spanning raw data, predictive models, relational backends, and deployed interfaces."
        />
      </Reveal>

      <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center gap-2 border-y border-slate-800 py-4">
        <span className="mr-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">Filter /</span>
        {categories.map((category) => {
          const count = category === 'All' ? projects.length : projects.filter((project) => project.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`filter-button ${filter === category ? 'is-active' : ''}`}
            >
              {category} <span className="ml-1.5 opacity-50">{String(count).padStart(2, '0')}</span>
            </button>
          );
        })}
      </Reveal>

      <motion.div layout className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpenSpec={setSpecProject} />)}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {specProject && (
          <motion.div
            className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpecProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="pipeline-spec-title"
              className="relative my-auto w-full max-w-3xl border border-slate-600 bg-panel shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5 border-b border-slate-700/75 p-6 sm:p-8">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-cyan">Pipeline specification / Python + Pandas</p>
                  <h3 id="pipeline-spec-title" className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-paper sm:text-3xl">{specProject.title}</h3>
                </div>
                <button type="button" autoFocus onClick={() => setSpecProject(null)} className="grid h-10 w-10 shrink-0 place-items-center border border-slate-600 text-slate-400 transition-colors hover:border-cyan hover:text-cyan" aria-label="Close Pipeline Spec">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm leading-7 text-slate-400">{specProject.description}</p>
                <div className="mt-6 overflow-x-auto border border-cyan/20 bg-cyan/[0.035] p-4">
                  <p className="min-w-[650px] font-mono text-[9px] uppercase tracking-[0.08em] text-slate-400">Raw records <span className="mx-2 text-cyan">→</span> Normalise <span className="mx-2 text-cyan">→</span> Strip honorifics <span className="mx-2 text-cyan">→</span> Devanagari surname key <span className="mx-2 text-cyan">→</span> Stable sort <span className="mx-2 text-cyan">→</span> Excel export</p>
                </div>

                <ol className="mt-7 divide-y divide-slate-700/65 border-y border-slate-700/65">
                  <li className="grid grid-cols-[30px_1fr] gap-4 py-5">
                    <span className="font-mono text-[10px] text-cyan">01</span>
                    <div><h4 className="font-display text-base font-medium text-paper">Parse & preserve</h4><p className="mt-2 text-sm leading-6 text-slate-400">Load unstructured demographic records into Python while preserving source values and row positions for a traceable transformation.</p></div>
                  </li>
                  <li className="grid grid-cols-[30px_1fr] gap-4 py-5">
                    <span className="font-mono text-[10px] text-cyan">02</span>
                    <div><h4 className="font-display text-base font-medium text-paper">Strip regional honorifics</h4><p className="mt-2 text-sm leading-6 text-slate-400">Normalise whitespace and remove configured Marathi honorifics at approved token boundaries, avoiding destructive replacements inside personal or family names.</p></div>
                  </li>
                  <li className="grid grid-cols-[30px_1fr] gap-4 py-5">
                    <span className="font-mono text-[10px] text-cyan">03</span>
                    <div><h4 className="font-display text-base font-medium text-paper">Build Devanagari collation keys</h4><p className="mt-2 text-sm leading-6 text-slate-400">Use Pandas to isolate the standardized surname and generate an explicit Devanagari-aware Marathi sort key rather than relying on default Latin alphabetical ordering.</p></div>
                  </li>
                  <li className="grid grid-cols-[30px_1fr] gap-4 py-5">
                    <span className="font-mono text-[10px] text-cyan">04</span>
                    <div><h4 className="font-display text-base font-medium text-paper">Stable sort & validated export</h4><p className="mt-2 text-sm leading-6 text-slate-400">Apply a deterministic surname sort with original row order as the tie-breaker, then automate Excel output while flagging unmatched records for review.</p></div>
                  </li>
                </ol>

                <div className="mt-6 flex flex-wrap gap-2">
                  {specProject.stack.map((tech) => <span key={tech} className="border border-slate-700 bg-ink/50 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400">{tech}</span>)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
