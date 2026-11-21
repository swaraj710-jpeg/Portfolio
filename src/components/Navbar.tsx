import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Profile } from '../types';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const initials = profile.name.split(' ').map((part) => part[0]).join('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={`glass-nav fixed inset-x-0 top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center border border-cyan/45 bg-cyan/5 font-mono text-[11px] font-medium tracking-tight text-cyan transition-colors group-hover:bg-cyan group-hover:text-ink">
            {initials}
          </span>
          <span className="hidden font-mono text-[10px] uppercase leading-4 tracking-[0.18em] text-slate-400 sm:block">
            Data / Code<br /><span className="text-slate-600">Pune, India</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-[13px] font-medium text-slate-300 transition-colors hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/Swaraj_Deshmukh_CV.pdf"
            download="Swaraj_Deshmukh_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 border border-slate-600 bg-slate-900/50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-all hover:border-cyan hover:bg-cyan hover:text-ink sm:flex"
          >
            <Download size={14} strokeWidth={1.8} className="transition-transform group-hover:translate-y-0.5" />
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center border border-slate-700 text-slate-200 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-800 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col px-5 py-5 sm:px-8">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-slate-800/80 py-4 font-display text-xl text-slate-200"
                >
                  {link.label}
                  <span className="font-mono text-[10px] text-slate-600">0{index + 1}</span>
                </a>
              ))}
              <a
                href="/Swaraj_Deshmukh_CV.pdf"
                download="Swaraj_Deshmukh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 bg-cyan px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink"
              >
                <Download size={15} /> Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
