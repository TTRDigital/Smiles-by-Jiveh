/*
 * Form handler for Vercel previews only (Vercel has no PHP). It is the same
 * as public/api/lead.php, which SiteGround uses: keep the two in sync.
 * The webhook comes from the GHL_WEBHOOK_URL environment variable (Vercel >
 * Project > Settings > Environment Variables). Until it is set, requests are
 * refused with 503 and the form asks the visitor to call.
 */
import { MIN_FILL_MS, serviceOptions } from "@/lib/lead-options";
import { clientIp, guardLead, rateLimited, SPAM_LABEL } from "@/lib/spam-guard";

type In = Record<string, unknown>;

const reply = (status: number, body: Record<string, unknown>) => Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

const text = (input: In, key: string, max: number) => {
  const v = input[key];
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

export async function POST(request: Request) {
  // Same-site posts only.
  const origin = request.headers.get("origin");
  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "").toLowerCase();
  if (origin) {
    try {
      if (new URL(origin).hostname.toLowerCase() !== host) return reply(403, { ok: false, error: "Forbidden." });
    } catch {
      return reply(403, { ok: false, error: "Forbidden." });
    }
  }
  if (rateLimited(clientIp(request))) return reply(429, { ok: false, error: "Too many requests. Please call us instead." });

  let input: In;
  try {
    const raw = await request.text();
    input = JSON.parse(raw.slice(0, 64 * 1024));
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error();
  } catch {
    return reply(400, { ok: false, error: "Invalid request." });
  }

  const form = input.form === "contact" ? "contact" : "appointment";
  const lead = {
    name: text(input, "name", 120),
    first_name: text(input, "first_name", 80),
    last_name: text(input, "last_name", 80),
    phone: text(input, "phone", 40),
    email: text(input, "email", 200),
    preferred_time: text(input, "preferred_time", 40),
    service: text(input, "service", 80),
    message: text(input, "message", 3000),
  };

  // Phone and email are required on both forms, as on the old site.
  const errors: Record<string, string> = {};
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number with area code.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (lead.service && !(serviceOptions as readonly string[]).includes(lead.service)) lead.service = "";
  if (lead.preferred_time && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(lead.preferred_time)) lead.preferred_time = "";
  // The appointment form asks for consent; on the contact form text-message consent is optional.
  if (form === "appointment" && input.consent !== true) errors.consent = "Please agree so we can contact you.";
  const smsConsent = form === "appointment" ? true : input.sms_consent === true;
  if (Object.keys(errors).length) return reply(422, { ok: false, error: "Please check the form.", fields: errors });

  // Spam (lib/spam-guard.ts): a bot gets the usual ok answer and nothing is sent; a doubtful lead is still sent, marked "Possible spam".
  const verdict = await guardLead({
    trap: input.hp_sbj, elapsedMs: input.elapsed_ms, minFillMs: MIN_FILL_MS,
    texts: [lead.name, lead.first_name, lead.last_name, lead.email, lead.message], recaptchaToken: input.recaptcha_token, ip: clientIp(request),
  });
  if (verdict.action === "drop") return reply(200, { ok: true });
  const spamCheck = verdict.note;

  const webhook = (process.env.GHL_WEBHOOK_URL ?? "").trim().replace(/^["']|["']$/g, "");
  if (!webhook.startsWith("https://")) {
    console.warn("[lead] GHL_WEBHOOK_URL is not set (or not https): request refused.");
    return reply(503, { ok: false, error: "The form is not connected yet. Please call us instead." });
  }

  // E.164 for US numbers.
  const digits = lead.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits[0] === "1" ? `+${digits}` : `${lead.phone.startsWith("+") ? "+" : ""}${digits}`;

  if (form === "contact") {
    const [first = "", ...rest] = lead.name.split(/\s+/);
    lead.first_name = first;
    lead.last_name = rest.join(" ");
  }
  const tags = [form === "contact" ? "website-contact-form" : "website-appointment-request"];
  if (smsConsent) tags.push("sms-consent");
  if (lead.service)
    tags.push(
      `service-${lead.service
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`,
    );
  if (verdict.possibleSpam) tags.unshift(SPAM_LABEL, "suspected-spam");

  const payload: Record<string, unknown> = {
    source: `${verdict.possibleSpam ? `${SPAM_LABEL}: ` : ""}${form === "contact" ? "Website contact form" : "Website appointment form"}`,
    form,
    submitted_at: new Date().toISOString(),
    name: `${lead.first_name} ${lead.last_name}`.trim(),
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone,
    phone_raw: lead.phone,
    preferred_date_time: lead.preferred_time,
    service: lead.service,
    comments: lead.message,
    consent: smsConsent,
    sms_consent: smsConsent,
    consent_text: text(input, "consent_text", 600),
    tags,
    spam_check: spamCheck,
  };
  for (const key of ["page_url", "landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
    payload[key] = text(input, key, 1000);
  }

  // One retry for rate limits, server errors and network failures.
  for (let attempt = 0; attempt < 2; attempt++) {
    let status = 0;
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      status = res.status;
      if (res.ok) return reply(200, { ok: true, delivered: true });
      console.error(`[lead] GoHighLevel webhook answered ${status}`);
    } catch (error) {
      console.error("[lead] GoHighLevel webhook failed", error);
    }
    if (status !== 0 && status !== 429 && status < 500) break;
    await new Promise((r) => setTimeout(r, 600));
  }
  return reply(502, { ok: false, error: "We could not send your request. Please call us instead." });
}
