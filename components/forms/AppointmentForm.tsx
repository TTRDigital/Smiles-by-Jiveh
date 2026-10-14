"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, Check, CircleAlert, LoaderCircle, Mail } from "lucide-react";
import { ATTRIBUTION_STORAGE_KEY, attributionKeys, serviceOptions } from "@/lib/lead-options";

type Field = "first_name" | "last_name" | "phone" | "email" | "preferred_time" | "service" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field | "consent", string>>;

/* Client checks; public/api/lead.php checks the same on the server. Phone and email are required, as on the old form. */
const validators: Partial<Record<Field, (v: string) => string | undefined>> = {
  phone: (v) => (v.replace(/\D/g, "").length < 10 ? "Please enter a phone number with area code." : undefined),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : "Please enter a valid email address."),
  message: (v) => (v.length > 3000 ? "Please keep your comments under 3,000 characters." : undefined),
};

const empty: Values = { first_name: "", last_name: "", phone: "", email: "", preferred_time: "", service: "", message: "" };

const chevron = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23667085'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")";

/**
 * The appointment request form: the same fields as the old site's
 * GoHighLevel form (first and last name, phone, email, preferred date and
 * time, service, comments), plus the consent checkbox. Posts to
 * /api/lead.php, which forwards it to GoHighLevel.
 */
export function AppointmentForm({ phone, phoneHref, practice }: { phone: string; phoneHref: string; practice: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [values, setValues] = useState<Values>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [summary, setSummary] = useState("");
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    startedAt.current = Date.now();
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T00:00`);
  }, []);

  const set = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: validators[f]?.(v) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const next: Errors = {};
    for (const f of Object.keys(validators) as Field[]) {
      const msg = validators[f]?.(values[f]);
      if (msg) next[f] = msg;
    }
    if (!consent) next.consent = "Please agree so we can contact you.";
    setErrors(next);
    const bad = Object.keys(next);
    if (bad.length) {
      setSummary(`Please fix ${bad.length === 1 ? "1 field" : `${bad.length} fields`} below.`);
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${bad[0]}`)}`)?.focus();
      return;
    }
    setSummary("");
    setStatus("sending");

    let attribution: Record<string, string> = {};
    try {
      attribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "{}");
    } catch {
      /* storage blocked */
    }
    const honeypot = (formRef.current?.elements.namedItem("hp_sbj") as HTMLInputElement | null)?.value ?? "";
    const consentText = formRef.current?.querySelector(`#${CSS.escape(`${uid}-consent-text`)}`)?.textContent ?? "";

    try {
      const res = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          consent: true,
          consent_text: consentText.replace(/\s+/g, " ").trim(),
          hp_sbj: honeypot,
          elapsed_ms: Date.now() - startedAt.current,
          page_url: window.location.href,
          landing_page: attribution.landing_page ?? "",
          referrer: attribution.referrer ?? document.referrer,
          ...Object.fromEntries(attributionKeys.map((k) => [k, attribution[k] ?? ""])),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      w.gtag?.("event", "generate_lead", { service: values.service });
      w.dataLayer?.push({ event: "generate_lead", service: values.service });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white">
          <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-2xl font-bold">Thank you{values.first_name ? `, ${values.first_name}` : ""}!</p>
        <p className="mt-3 max-w-sm text-[15px] text-muted">We received your request. Our team will get back to you within 24 hours to arrange the best time for you.</p>
      </div>
    );
  }

  const input = (f: Field) =>
    `block w-full rounded-[4px] border bg-white px-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-[#667085] focus:border-blue focus:shadow-[0_0_0_3px_rgb(53_88_160/0.15)] ${
      errors[f] ? "border-[#c2414f]" : "border-[#d0d5dd]"
    } ${f === "message" ? "min-h-[110px] py-2.5" : "h-11"}`;
  const label = (f: Field, text: string, required = false) => (
    <label htmlFor={`${uid}-${f}`} className="mb-1.5 block text-sm font-medium text-[#344054]">
      {text}
      {required ? " *" : ""}
    </label>
  );
  const err = (f: Field | "consent") =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#c2414f]">
        <CircleAlert className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;
  const aria = (f: Field) => ({
    id: `${uid}-${f}`,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
    onBlur: () => validators[f] && values[f] && setErrors((e) => ({ ...e, [f]: validators[f]?.(values[f]) })),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby={`${uid}-summary`}>
      <p id={`${uid}-summary`} role="alert" aria-live="assertive" className={summary ? "text-sm font-semibold text-[#c2414f]" : "sr-only"}>
        {summary}
      </p>
      <div>
        {label("first_name", "First Name")}
        <input
          {...aria("first_name")}
          type="text"
          autoComplete="given-name"
          placeholder="Enter Your First name"
          value={values.first_name}
          onChange={(e) => set("first_name", e.target.value)}
          className={input("first_name")}
        />
      </div>
      <div>
        {label("last_name", "Last Name")}
        <input
          {...aria("last_name")}
          type="text"
          autoComplete="family-name"
          placeholder="Enter Your Last Name"
          value={values.last_name}
          onChange={(e) => set("last_name", e.target.value)}
          className={input("last_name")}
        />
      </div>
      <div>
        {label("phone", "Phone", true)}
        <input
          {...aria("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="Enter Your Phone Number"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={input("phone")}
        />
        {err("phone")}
      </div>
      <div>
        {label("email", "Email", true)}
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" strokeWidth={1.75} aria-hidden="true" />
          <input
            {...aria("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Enter Your Email Address"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${input("email")} pl-9`}
          />
        </div>
        {err("email")}
      </div>
      <div>
        {label("preferred_time", "Preferred Date & Time")}
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" strokeWidth={1.75} aria-hidden="true" />
          <input
            {...aria("preferred_time")}
            type="datetime-local"
            min={minDate}
            value={values.preferred_time}
            onChange={(e) => set("preferred_time", e.target.value)}
            className={`${input("preferred_time")} pl-9 ${values.preferred_time ? "" : "text-[#667085]"}`}
          />
        </div>
      </div>
      <div>
        {label("service", "Service")}
        <select
          {...aria("service")}
          value={values.service}
          onChange={(e) => set("service", e.target.value)}
          className={`${input("service")} appearance-none bg-[length:20px] bg-[right_0.6rem_center] bg-no-repeat pr-9 ${values.service ? "" : "text-[#667085]"}`}
          style={{ backgroundImage: chevron }}
        >
          <option value="">Select Any Service Below</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        {label("message", "Comments")}
        <textarea {...aria("message")} rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} className={input("message")} />
        {err("message")}
      </div>

      <div>
        <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[#475467]">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#24417c]"
          />
          <span id={`${uid}-consent-text`}>
            I agree to be contacted by {practice} by phone, text message and email about my appointment request. Message and data rates may apply; reply STOP to opt out. See our{" "}
            <Link href="/privacy-policy/" className="font-semibold text-blue underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {err("consent")}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp_sbj`}>Leave this field empty</label>
        <input id={`${uid}-hp_sbj`} name="hp_sbj" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-[#c2414f]">
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href={phoneHref} className="font-semibold underline">
            {phone}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#24417c] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#1c3466] disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Book An Appointment Now"
        )}
      </button>
    </form>
  );
}
