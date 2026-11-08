/*
 * Lead form handler for the ad landing pages (Vercel Function, Node runtime, no packages).
 * One submit goes to both:
 *   1. TTR OS  POST https://ttr-portal.vercel.app/api/site/form  (key = env TTR_SITE_KEY)
 *   2. GoHighLevel inbound webhook                                (url = env GHL_WEBHOOK_URL)
 * The browser tracker is told to skip this form (data-ttr-skip), so TTR OS gets it once, from here.
 * The lead counts as received when at least one of the two accepted it.
 * Secrets are environment variables only: nothing is in the code.
 */
const MIN_FILL_MS = 2500;
const PAGES = { offer: "Offer ($189 New Patient Experience)", implant: "Implant (All-on-X / Full Mouth)" };
const TTR_FORM_URL = "https://ttr-portal.vercel.app/api/site/form";

const reply = (res, status, body) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  res.status(status).json(body);
};
const text = (o, k, max) => (typeof o[k] === "string" ? o[k].trim().slice(0, max) : "");

async function post(url, init, label) {
  for (let attempt = 0; attempt < 2; attempt++) {
    let status = 0;
    try {
      const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
      status = r.status;
      if (r.ok) return true;
      console.error(`[lead] ${label} answered ${status}`);
    } catch (e) {
      console.error(`[lead] ${label} failed`, e && e.name);
    }
    if (status !== 0 && status !== 429 && status < 500) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return reply(res, 405, { ok: false, error: "Method not allowed." });

  // Same-site posts only (the two production hosts, Vercel previews, local dev).
  const origin = req.headers.origin;
  if (origin) {
    let h = "";
    try { h = new URL(origin).hostname.toLowerCase(); } catch { return reply(res, 403, { ok: false, error: "Forbidden." }); }
    const host = String(req.headers.host || "").replace(/:\d+$/, "").toLowerCase();
    const ok = h === host || /(^|\.)smilesbyjiveh\.com$/.test(h) || h.endsWith(".vercel.app") || h === "localhost";
    if (!ok) return reply(res, 403, { ok: false, error: "Forbidden." });
  }

  const input = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch { return null; } })() : req.body;
  if (!input || typeof input !== "object" || Array.isArray(input)) return reply(res, 400, { ok: false, error: "Invalid request." });

  const slug = input.slug in PAGES ? input.slug : "";
  const lead = {
    first_name: text(input, "first_name", 80),
    last_name: text(input, "last_name", 80),
    email: text(input, "email", 200),
    phone: text(input, "phone", 40),
    message: text(input, "message", 3000),
  };
  const errors = {};
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number with area code.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (input.consent !== true) errors.consent = "Please agree so we can contact you.";
  if (Object.keys(errors).length) return reply(res, 422, { ok: false, error: Object.values(errors)[0], fields: errors });

  // Spam: drop silently only when the hidden field is filled AND the form was sent too fast.
  const trap = text(input, "hp", 200) !== "";
  const elapsed = Number.isInteger(input.elapsed_ms) ? input.elapsed_ms : null;
  const tooFast = elapsed !== null && elapsed < MIN_FILL_MS;
  if (trap && tooFast) return reply(res, 200, { ok: true });
  const spamCheck = trap ? "suspect: hidden field filled" : tooFast ? `suspect: sent in ${elapsed} ms` : "ok";

  const digits = lead.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits[0] === "1" ? `+${digits}` : `${lead.phone.startsWith("+") ? "+" : ""}${digits}`;
  const track = {};
  for (const k of ["page_url", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"]) track[k] = text(input, k, 1000);
  const pageName = PAGES[slug] || "Landing page";

  const jobs = [];

  // 1. TTR OS (same URL-encoded shape the TTR tracker script uses: k, p, r, u, f_<field>).
  const ttrKey = (process.env.TTR_SITE_KEY || "").trim();
  if (ttrKey) {
    const body = new URLSearchParams({
      k: ttrKey,
      p: `/${slug || ""}`,
      r: track.referrer,
      u: track.page_url,
      f_first_name: lead.first_name,
      f_last_name: lead.last_name,
      f_email: lead.email,
      f_phone: phone,
      f_message: lead.message,
      f_landing_page: pageName,
      f_gclid: track.gclid,
      f_utm_source: track.utm_source,
      f_utm_campaign: track.utm_campaign,
      f_spam_check: spamCheck,
    });
    jobs.push(post(TTR_FORM_URL, { method: "POST", body }, "TTR OS"));
  } else console.warn("[lead] TTR_SITE_KEY is not set: TTR OS skipped.");

  // 2. GoHighLevel webhook.
  const webhook = (process.env.GHL_WEBHOOK_URL || "").trim().replace(/^["']|["']$/g, "");
  if (webhook.startsWith("https://")) {
    const tags = [`landing-${slug || "page"}`, "sms-consent"];
    if (spamCheck !== "ok") tags.push("suspected-spam");
    const payload = {
      source: `Landing page: ${pageName}`,
      form: "landing-page",
      landing_page: pageName,
      submitted_at: new Date().toISOString(),
      name: `${lead.first_name} ${lead.last_name}`.trim(),
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone,
      phone_raw: lead.phone,
      comments: lead.message,
      consent: true,
      sms_consent: true,
      consent_text: text(input, "consent_text", 600),
      tags,
      spam_check: spamCheck,
      ...track,
    };
    jobs.push(post(webhook, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) }, "GoHighLevel"));
  } else console.warn("[lead] GHL_WEBHOOK_URL is not set (or not https): GoHighLevel skipped.");

  if (!jobs.length) return reply(res, 503, { ok: false, error: "The form is not connected yet. Please call us instead." });
  const results = await Promise.all(jobs);
  if (results.some(Boolean)) return reply(res, 200, { ok: true, delivered: results.filter(Boolean).length });
  return reply(res, 502, { ok: false, error: "We could not send your request. Please call us instead." });
}
