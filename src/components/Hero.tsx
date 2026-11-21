import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import type { ImpactMetric, Profile } from '../types';

interface HeroProps {
  profile: Profile;
  metrics: ImpactMetric[];
}

function AnalyticalOrbit({ target }: { target: string }) {
  return (
    <div className="orbit-panel relative overflow-hidden border border-slate-700/80 bg-panel/60">
      <div className="flex items-center justify-between border-b border-slate-700/70 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
        <span>Current trajectory</span>
        <span className="flex items-center gap-2 text-emerald"><span className="status-dot" /> In progress</span>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[500px]" aria-hidden="true">
        <div className="absolute inset-[9%] rounded-full border border-slate-700/60" />
        <div className="absolute inset-[21%] rounded-full border border-dashed border-slate-700/70 orbit-slow" />
        <div className="absolute inset-[34%] rounded-full border border-cyan/25" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none">
          <path d="M54 319L156 239L240 273L337 145L445 99" stroke="#06B6D4" strokeOpacity=".34" strokeWidth="1.2" strokeDasharray="4 7" />
          <path d="M55 365L173 346L278 375L443 308" stroke="#10B981" strokeOpacity=".25" strokeWidth="1.2" />
          <circle cx="156" cy="239" r="4" fill="#06B6D4" />
          <circle cx="337" cy="145" r="4" fill="#06B6D4" />
          <circle cx="278" cy="375" r="4" fill="#10B981" />
          <path d="M250 32V468M32 250H468" stroke="#334155" strokeOpacity=".38" strokeWidth=".8" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan/40 bg-ink shadow-[0_0_70px_rgba(6,182,212,0.12)]">
          <span className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-[-0.06em] text-paper">DATA</span>
          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.28em] text-cyan">to decisions</span>
        </div>
        <span className="absolute left-[9%] top-[27%] border border-slate-700 bg-ink/90 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-300 sm:text-[9px]">01 / Analyse</span>
        <span className="absolute right-[5%] top-[18%] border border-slate-700 bg-ink/90 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-300 sm:text-[9px]">02 / Model</span>
        <span className="absolute bottom-[16%] right-[8%] border border-emerald/30 bg-ink/90 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-emerald sm:text-[9px]">03 / Build</span>
      </div>

      <div className="border-t border-slate-700/70 px-5 py-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">Next chapter</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">{target}</p>
      </div>
    </div>
  );
}

export default function Hero({ profile, metrics }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const nameParts = profile.name.split(' ');
  const lastName = nameParts.pop();
  const firstNames = nameParts.join(' ');
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.12 } },
  };
  const item = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
      <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={item} className="mb-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <span className="text-cyan">Portfolio / 2026</span>
          <span className="h-px w-14 bg-slate-700" />
          <span>Pune → Germany</span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.17fr)_minmax(360px,0.83fr)] lg:gap-14">
          <div>
            <motion.div variants={item} className="mb-7 inline-flex max-w-full items-start gap-2.5 rounded-full border border-emerald/25 bg-emerald/[0.06] px-4 py-2.5 text-[11px] leading-5 text-emerald sm:items-center sm:text-xs">
              <span className="status-dot mt-1.5 shrink-0 sm:mt-0" />
              <span>{profile.status}</span>
            </motion.div>

            <motion.h1 variants={item} className="font-display font-semibold leading-[0.84] tracking-[-0.065em] text-paper">
              <span className="block text-[clamp(2.55rem,6vw,6.1rem)]">{firstNames}</span>
              <span className="mt-3 block text-[clamp(3.9rem,9.2vw,9.4rem)] text-cyan">{lastName}<span className="text-emerald">.</span></span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 font-mono text-[11px] uppercase leading-6 tracking-[0.13em] text-slate-300 sm:text-[13px]">
              {profile.roles}
            </motion.p>
            <motion.p variants={item} className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-400 sm:text-[17px]">
              {profile.bio}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex items-center gap-3 bg-cyan px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper">
                Explore Projects <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="/Swaraj_Deshmukh_CV.pdf"
                download="Swaraj_Deshmukh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-slate-600 bg-panel/40 px-5 py-3.5 text-sm font-medium text-paper transition-colors hover:border-slate-300 hover:bg-panel"
              >
                <Download size={16} className="transition-transform group-hover:translate-y-0.5" /> Download CV
              </a>
              <div className="ml-0 flex items-center gap-1 sm:ml-2">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-button" aria-label="GitHub profile"><Github size={18} /></a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-button" aria-label="LinkedIn profile"><Linkedin size={18} /></a>
                <a href={`mailto:${profile.email}`} className="social-button" aria-label="Send an email"><Mail size={18} /></a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative lg:justify-self-end">
            <div className="absolute -right-5 -top-5 h-24 w-24 border-r border-t border-cyan/25" aria-hidden="true" />
            <AnalyticalOrbit target={profile.target} />
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="group mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-cyan">
              <span>Source / github.com/swaraj710-jpeg</span><ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-16 grid border-l border-t border-slate-700/75 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div key={metric.id} className="metric-cell group relative border-b border-r border-slate-700/75 bg-panel/35 p-5 sm:p-6">
              <span className="absolute right-4 top-4 font-mono text-[9px] text-slate-700">0{index + 1}</span>
              <p className={`font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl ${index === 3 ? 'text-emerald' : 'text-paper'}`}>{metric.value}</p>
              <p className="mt-2 max-w-[210px] font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-slate-400">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
