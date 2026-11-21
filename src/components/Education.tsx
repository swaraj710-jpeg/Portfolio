import { ArrowUpRight, BadgeCheck, GraduationCap } from 'lucide-react';
import type { Credential, Education as EducationItem, Profile } from '../types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

interface EducationProps {
  education: EducationItem[];
  credentials: Credential[];
  profile: Profile;
}

export default function Education({ education, credentials, profile }: EducationProps) {
  return (
    <section id="education" className="section-shell">
      <Reveal>
        <SectionHeading
          index="04 / 05"
          eyebrow="Education & credentials"
          title="Building toward the next academic chapter."
          description={profile.target}
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          {education.map((item) => {
            const percentage = Math.round((Number(item.grade_value) / Number(item.grade_max)) * 100);
            const circumference = 2 * Math.PI * 52;
            return (
              <Reveal key={item.id} className="h-full">
                <article className="education-card relative h-full overflow-hidden border border-slate-700/75 bg-panel/45 p-6 sm:p-8">
                  <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan">
                        <GraduationCap size={16} /> Undergraduate / {item.period}
                      </div>
                      <h3 className="mt-7 max-w-lg font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-paper">{item.degree}</h3>
                      <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-300">{item.institution}</p>
                      <p className="mt-1 max-w-lg text-sm leading-6 text-slate-500">{item.university}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-4 self-center sm:flex-row sm:self-start">
                      <div className="relative h-32 w-32 shrink-0" aria-label={`${item.grade_label}: ${item.grade_value} out of ${item.grade_max}`}>
                        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                          <circle cx="60" cy="60" r="52" stroke="#263449" strokeWidth="3" fill="none" />
                          <circle cx="60" cy="60" r="52" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="square" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percentage / 100)} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-2xl font-semibold tracking-tight text-paper">{item.grade_value}</span>
                          <span className="font-mono text-[9px] text-slate-500">/ {item.grade_max}</span>
                        </div>
                      </div>
                      <p className="max-w-[150px] text-center font-mono text-[10px] uppercase leading-5 tracking-[0.08em] text-slate-300 sm:text-left">
                        7.49 / 10.0 CGPA <span className="text-emerald">• APS Verified</span>
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <article className="h-full border border-slate-700/75 bg-panel/45 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="max-w-xs font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-paper">Languages & International Readiness</h3>
              <BadgeCheck size={23} className="shrink-0 text-emerald" strokeWidth={1.5} />
            </div>
            <div className="mt-7 divide-y divide-slate-700/65 border-y border-slate-700/65">
              {credentials.map((credential, index) => (
                <div key={credential.id} className="group grid grid-cols-[26px_0.55fr_1fr] items-center gap-3 py-4 sm:grid-cols-[30px_0.45fr_1fr]">
                  <span className="font-mono text-[9px] text-slate-700">0{index + 1}</span>
                  <span className="font-display text-base font-medium text-slate-200">{credential.name}</span>
                  <span className="flex justify-end">
                    <span className={`inline-flex max-w-[250px] items-center gap-1.5 border px-2 py-1.5 text-right font-mono text-[9px] uppercase leading-4 tracking-[0.06em] ${credential.name === 'APS' || credential.name === 'German' ? 'border-emerald/25 bg-emerald/[0.05] text-emerald' : 'border-slate-700/70 bg-ink/30 text-slate-400'}`}>
                      {credential.name === 'German' && <GraduationCap size={11} className="shrink-0" />}
                      {credential.name === 'APS' && <BadgeCheck size={11} className="shrink-0" />}
                      {credential.name === 'German'
                        ? 'B1 Course Completed • Goethe-Institut'
                        : credential.name.toUpperCase() === 'IELTS'
                          ? 'IELTS Academic (6.0) • Professional Proficiency'
                          : credential.name === 'APS'
                            ? 'APS India Certificate Verified'
                            : credential.proficiency}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <a href="#contact" className="group mt-7 flex items-center justify-between border border-slate-700 bg-ink/35 px-4 py-4 transition-colors hover:border-cyan/50">
              <span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Summer semester 2027</span>
                <span className="mt-1.5 block text-sm text-slate-300">Discuss research & Werkstudent opportunities</span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-cyan transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
