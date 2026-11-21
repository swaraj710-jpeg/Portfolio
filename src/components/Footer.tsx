import { ArrowUp } from 'lucide-react';
import type { Profile } from '../types';

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="font-display text-sm font-medium text-slate-300">© {new Date().getFullYear()} {profile.name}</p>
          <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Designed between data, code & curiosity</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500" aria-label="Footer navigation">
          <a href="#projects" className="transition-colors hover:text-cyan">Projects</a>
          <a href="#experience" className="transition-colors hover:text-cyan">Experience</a>
          <a href="#skills" className="transition-colors hover:text-cyan">Skills</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">LinkedIn</a>
        </nav>
        <a href="#top" className="group flex w-fit items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-paper">
          Back to top <span className="grid h-8 w-8 place-items-center border border-slate-700 transition-colors group-hover:border-cyan group-hover:text-cyan"><ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" /></span>
        </a>
      </div>
    </footer>
  );
}
