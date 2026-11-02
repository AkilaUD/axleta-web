import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import {
  contactInterestOptions,
  parseContactInterest,
  site,
  type ContactInterest,
} from "~/data/site";
import { Button } from "~/components/ui/Button";

type ContactFormProps = {
  initialInterest?: ContactInterest;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: ContactInterest;
  message: string;
  consent: boolean;
  website: string;
};

export function ContactForm({ initialInterest = "general" }: ContactFormProps) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    interest: initialInterest,
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) {
      next.name = "Enter your name.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid business email.";
    }
    if (!form.message.trim()) {
      next.message = "Tell us about your requirement.";
    }
    if (!form.consent) {
      next.consent = "Consent is required to submit this form.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage("Please fix the errors below.");
      return;
    }
    if (!formId) {
      setStatus("error");
      setStatusMessage(
        `Form is not configured yet. Email us at ${site.email} instead.`,
      );
      return;
    }
    if (form.website) {
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          interest: form.interest,
          message: form.message,
        }),
      });
      if (!res.ok) {
        throw new Error("Submit failed");
      }
      setStatus("success");
      setStatusMessage("Thank you. We will respond as soon as we can.");
      setForm({
        name: "",
        email: "",
        company: "",
        interest: initialInterest,
        message: "",
        consent: false,
        website: "",
      });
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Your message was kept—please try again or email us directly.",
      );
    }
  };

  if (!formId) {
    return (
      <div className="rounded-[var(--radius-card)] border border-subtle bg-[var(--color-brand-soft)] p-6">
        <p className="text-text">
          Online form requires <code className="text-sm">VITE_FORMSPREE_FORM_ID</code>{" "}
          in your environment. Until then, contact us directly:
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-flex font-semibold text-[var(--color-brand-hover)] hover:underline"
        >
          {site.email}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>
      <Field
        id="name"
        label="Name"
        error={errors.name}
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        required
      />
      <Field
        id="email"
        label="Business email"
        type="email"
        error={errors.email}
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        required
      />
      <Field
        id="company"
        label="Company"
        value={form.company}
        onChange={(v) => setForm({ ...form, company: v })}
      />
      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium">
          Area of interest
        </label>
        <select
          id="interest"
          value={form.interest}
          onChange={(e) =>
            setForm({
              ...form,
              interest: parseContactInterest(e.target.value),
            })
          }
          className="min-h-11 w-full rounded-[var(--radius-button)] border border-subtle bg-surface px-3"
        >
          {contactInterestOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-[var(--radius-button)] border border-subtle bg-surface px-3 py-2"
        />
        {errors.message ? (
          <p id="message-error" className="mt-1 text-sm text-[var(--color-negative)]">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 size-4"
        />
        <label htmlFor="consent" className="text-small text-muted">
          I agree to Axleta processing my details to respond to this enquiry. See{" "}
          <Link to="/privacy" className="text-[var(--color-brand-hover)] underline">
            Privacy
          </Link>
          .
        </label>
      </div>
      {errors.consent ? (
        <p id="consent-error" className="text-sm text-[var(--color-negative)]">
          {errors.consent}
        </p>
      ) : null}
      <Button type="submit" loading={status === "loading"}>
        Send message
      </Button>
      <p aria-live="polite" className="text-sm text-muted">
        {statusMessage}
      </p>
      <p className="text-small text-muted">
        Or email{" "}
        <a href={`mailto:${site.email}`} className="text-[var(--color-brand-hover)] underline">
          {site.email}
        </a>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-[var(--radius-button)] border border-subtle bg-surface px-3"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-[var(--color-negative)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
