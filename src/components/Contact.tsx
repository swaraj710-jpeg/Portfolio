import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Github, Linkedin, LoaderCircle, Mail, MapPin, Phone, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Profile } from '../types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type FormValues = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
type ToastState = { type: 'success' | 'error'; title: string; message: string } | null;

const emptyForm: FormValues = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }: { profile: Profile }) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 7000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (values.subject.trim().length < 3) nextErrors.subject = 'Add a short subject.';
    if (values.message.trim().length < 12) nextErrors.message = 'Please include at least 12 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const submittedName = values.name.trim();
    const submittedSubject = values.subject.trim();
    setSubmitting(true);
    setToast(null);
    let messageId: number | null = null;

    try {
      const logResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, delivery_status: 'pending' }),
      });
      const logData = await logResponse.json();
      if (logResponse.ok) messageId = logData.id;
    } catch (logError) {
      console.error('Message logging failed:', logError);
    }

    try {
      // Copy .env.example to .env and set the real key before deployment.
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error('Web3Forms is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env.');
      }
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: submittedName,
          from_name: submittedName,
          email: values.email.trim(),
          subject: `[Portfolio Inquiry] ${submittedSubject} — from ${submittedName}`,
          message: values.message.trim(),
          botcheck: false,
        }),
      });
      const result = await response.json();
      const delivered = response.ok && result.success;

      if (messageId) {
        await fetch('/api/contact', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: messageId,
            delivery_status: delivered ? 'sent' : 'failed',
            provider_response: result.message || (delivered ? 'Delivered' : 'Delivery failed'),
          }),
        }).catch((error) => console.error('Delivery status update failed:', error));
      }

      if (!delivered) throw new Error(result.message || 'Web3Forms could not deliver the message.');

      setValues(emptyForm);
      setToast({ type: 'success', title: `Transmission received, ${submittedName}`, message: "I'll reply shortly." });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'The message could not be delivered.';
      setToast({
        type: 'error',
        title: 'Email delivery needs attention',
        message: messageId
          ? `${detail} Your message was safely saved to the private portfolio inbox.`
          : `${detail} Please email ${profile.email} directly.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactLinks = [
    { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
    { label: 'GitHub / swaraj710-jpeg', href: profile.github, icon: Github },
    { label: 'LinkedIn / Swaraj Deshmukh', href: profile.linkedin, icon: Linkedin },
  ];

  return (
    <section id="contact" className="section-shell pb-20 sm:pb-28">
      <Reveal>
        <SectionHeading
          index="05 / 05"
          eyebrow="Contact"
          title="Let’s make the data useful."
          description="Open to research conversations, Werkstudent opportunities, analytical collaborations, and ambitious full-stack builds."
        />
      </Reveal>

      <div className="mt-12 grid overflow-hidden border border-slate-700/75 bg-panel/40 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="h-full">
          <div className="contact-aside relative h-full border-b border-slate-700/75 p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan">Direct channel / Pune, IN</span>
            <h3 className="mt-7 max-w-md font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-paper sm:text-4xl">A good problem is worth a conversation.</h3>
            <div className="mt-7 flex items-center gap-3 text-sm text-slate-400"><MapPin size={16} className="text-emerald" />{profile.location}</div>
            <div className="mt-9 divide-y divide-slate-700/60 border-y border-slate-700/60">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-3 py-4 text-[13px] text-slate-400 transition-colors hover:text-paper">
                  <Icon size={16} className="shrink-0 text-slate-600 transition-colors group-hover:text-cyan" />
                  <span className="min-w-0 flex-1 break-all font-mono text-[10px] sm:text-[11px]">{label}</span>
                  <ArrowUpRight size={14} className="shrink-0 text-slate-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-emerald">
              <span className="status-dot shrink-0" /> Open to Germany-based opportunities
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <form onSubmit={handleSubmit} noValidate className="h-full p-6 sm:p-9 lg:p-10">
            <input type="hidden" name="from_name" value="Swaraj Deshmukh Portfolio" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">Transmission form</span>
              <span className="font-mono text-[9px] text-slate-700">SSL / WEB3FORMS</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" value={values.name} error={errors.name} onChange={updateField} placeholder="Your name" autoComplete="name" />
              <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={updateField} placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={updateField} placeholder="Research, role, or project" />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Tell me what you’re working on…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`form-input min-h-36 resize-y ${errors.message ? 'is-invalid' : ''}`}
              />
              {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[250px] font-mono text-[8px] uppercase leading-4 tracking-[0.1em] text-slate-600">Messages are logged securely before email delivery is attempted.</p>
              <button type="submit" disabled={submitting} className="group inline-flex shrink-0 items-center justify-center gap-3 bg-cyan px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:cursor-wait disabled:opacity-65">
                {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} className="transition-transform group-hover:translate-x-0.5" />}
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>
            <AnimatePresence>
              {toast && (
                <motion.div
                  id="contact-confirmation"
                  role={toast.type === 'error' ? 'alert' : 'status'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`mt-5 flex items-start gap-3 border px-4 py-3 ${toast.type === 'success' ? 'border-emerald/30 bg-emerald/[0.06]' : 'border-red-400/30 bg-red-400/[0.05]'}`}
                >
                  {toast.type === 'success' ? <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald" /> : <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-400" />}
                  <p className="text-xs leading-5 text-slate-300"><span className="font-semibold text-paper">{toast.title}.</span> {toast.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role={toast.type === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`toast ${toast.type === 'success' ? 'toast--success' : 'toast--error'}`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald" /> : <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />}
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold text-paper">{toast.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{toast.message}</p>
            </div>
            <button type="button" onClick={() => setToast(null)} className="shrink-0 p-1 text-slate-500 transition-colors hover:text-paper" aria-label="Dismiss notification"><X size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: keyof FormValues;
  value: string;
  error?: string;
  onChange: (field: keyof FormValues, value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

function Field({ label, name, value, error, onChange, placeholder, type = 'text', autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={name === 'name'}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`form-input ${error ? 'is-invalid' : ''}`}
      />
      {error && <p id={`${name}-error`} className="form-error">{error}</p>}
    </div>
  );
}
