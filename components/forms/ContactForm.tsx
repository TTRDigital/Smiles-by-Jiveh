"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { ATTRIBUTION_STORAGE_KEY, attributionKeys } from "@/lib/lead-options";

type Field = "name" | "email" | "phone" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

/* Client checks; public/api/lead.php checks the same on the server. Email and phone are required, as on the old form. */
const validators: Partial<Record<Field, (v: string) => string | undefined>> = {
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : "Please enter a valid email address."),
  phone: (v) => (v.replace(/\D/g, "").length < 10 ? "Please enter a phone number with area code." : undefined),
  message: (v) => (v.length > 3000 ? "Please keep your message under 3,000 characters." : undefined),
};

const empty: Values = { name: "", email: "", phone: "", message: "" };

/**
 * The home page "Contact Us" form, with the old site's fields (name, email
 * address, phone number, comments/questions). Text-message consent is an
 * optional checkbox. Posts to /api/lead.php, which forwards it to GoHighLevel.
 */
export function ContactForm({ phone, phoneHref, practice }: { phone: string; phoneHref: string; practice: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [values, setValues] = useState<Values>(empty);
  const [sms, setSms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
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
    const smsText = formRef.current?.querySelector(`#${CSS.escape(`${uid}-sms-text`)}`)?.textContent ?? "";

    try {
      const res = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "contact",
          ...values,
          sms_consent: sms,
          consent_text: sms ? smsText.replace(/\s+/g, " ").trim() : "",
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
      w.gtag?.("event", "generate_lead", { form: "contact" });
      w.dataLayer?.push({ event: "generate_lead", form: "contact" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[340px] flex-col items-center justify-center rounded-[10px] bg-page px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white">
          <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-2xl font-bold">Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}!</p>
        <p className="mt-3 max-w-sm text-[15px] text-muted">We received your message and will be in touch soon.</p>
      </div>
    );
  }

  const input = (f: Field) =>
    `block w-full rounded-[10px] border-2 bg-white px-[15px] text-[15px] text-[#1f2124] outline-none transition-[border-color,box-shadow] focus:border-teal focus:shadow-[0_0_0_3px_rgb(129_165_172/0.2)] ${
      errors[f] ? "border-[#c2414f]" : "border-field"
    } ${f === "message" ? "min-h-[118px] py-2" : "h-11"}`;
  const label = (f: Field, text: string, required = false) => (
    <label htmlFor={`${uid}-${f}`} className="mb-[7px] block text-[15px] text-ink">
      {text}
      {required ? <span className="sr-only"> (required)</span> : null}
    </label>
  );
  const err = (f: Field) =>
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
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby={`${uid}-summary`}>
      <p id={`${uid}-summary`} role="alert" aria-live="assertive" className={summary ? "text-sm font-semibold text-[#c2414f] sm:col-span-2" : "sr-only"}>
        {summary}
      </p>
      <div className="sm:col-span-2">
        {label("name", "Name")}
        <input {...aria("name")} type="text" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={input("name")} />
      </div>
      <div>
        {label("email", "Email Address", true)}
        <input
          {...aria("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className={input("email")}
        />
        {err("email")}
      </div>
      <div>
        {label("phone", "Phone Number", true)}
        <input
          {...aria("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={input("phone")}
        />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        {label("message", "Comments/Questions")}
        <textarea {...aria("message")} rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} className={input("message")} />
        {err("message")}
      </div>

      <label htmlFor={`${uid}-sms`} className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-muted sm:col-span-2">
        <input id={`${uid}-sms`} type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#81a5ac]" />
        <span id={`${uid}-sms-text`}>
          Optional: I agree to receive text messages from {practice} about my inquiry. Message and data rates may apply; reply STOP to opt out. See our{" "}
          <Link href="/privacy-policy/" className="font-semibold text-blue underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp_sbj`}>Leave this field empty</label>
        <input id={`${uid}-hp_sbj`} name="hp_sbj" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-[#c2414f] sm:col-span-2">
          Something went wrong sending your message. Please try again, or call us at{" "}
          <a href={phoneHref} className="font-semibold underline">
            {phone}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[47px] w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-teal px-[30px] py-[15px] text-base font-medium leading-none text-white transition-colors hover:bg-teal-hi disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
