import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { buildMailtoLink, formEndpointId, isContactBackendConfigured } from '../../lib/contact';
import { Button } from '../ui/Button';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-xl border border-ivory/15 bg-ivory/[0.03] px-4 py-3 text-ivory placeholder:text-ivory-faint/70 transition-colors focus:border-ivory/50 focus:bg-ivory/[0.05] focus:outline-none';

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<SubmitState>('idle');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const mailtoHref = buildMailtoLink(values);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isContactBackendConfigured) {
      // No backend wired up — be honest about it rather than faking a
      // success state, and hand off to the real mailto fallback.
      window.location.href = mailtoHref;
      return;
    }

    setState('submitting');
    setErrorDetail(null);

    try {
      const response = await fetch(`https://formspree.io/f/${formEndpointId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setState('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        setState('error');
        setErrorDetail('The message server declined the submission.');
      }
    } catch {
      setState('error');
      setErrorDetail('Could not reach the message server — check your connection.');
    }
  }

  if (state === 'success') {
    return (
      <div className="reveal-up flex flex-col items-start gap-3 rounded-2xl border border-ivory/15 bg-ivory/[0.03] p-8">
        <CheckCircle2 size={28} className="text-ivory" aria-hidden="true" />
        <h3 className="font-display text-xl text-ivory">Message sent</h3>
        <p className="text-sm text-ivory-dim">
          Thanks for reaching out — I&rsquo;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-2 text-xs font-medium text-ivory/70 underline-offset-4 hover:text-ivory hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="reveal-up flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium tracking-wide text-ivory-faint uppercase">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium tracking-wide text-ivory-faint uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium tracking-wide text-ivory-faint uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className={`${inputClasses} resize-none`}
          placeholder="What would you like to talk about?"
        />
      </div>

      {state === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-ivory/20 bg-ivory/[0.03] p-4 text-sm text-ivory-dim"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-ivory/70" aria-hidden="true" />
          <span>
            {errorDetail ?? 'Something went wrong sending that.'} You can{' '}
            <a href={mailtoHref} className="font-medium text-ivory underline underline-offset-2">
              email me directly
            </a>{' '}
            instead.
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>

        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-ivory/70 transition-colors hover:text-ivory"
        >
          <Mail size={15} aria-hidden="true" />
          or email me directly
        </a>
      </div>

      {!isContactBackendConfigured && (
        <p className="text-xs text-ivory-faint italic">
          The message form isn&rsquo;t connected to a backend yet, so &ldquo;Send
          Message&rdquo; opens your email client instead. See the README to wire
          up Formspree.
        </p>
      )}
    </form>
  );
}
