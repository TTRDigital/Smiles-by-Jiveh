import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

/*
 * Sanity publish webhook: refreshes the cached Sanity reads (lib/sanity/fetch.ts)
 * on the Vercel deployment without a rebuild. Vercel builds only (*.vercel.ts),
 * the SiteGround static export never contains it.
 *
 *   POST /api/revalidate
 *   sanity-webhook-signature: t=<ms>,v1=<base64url HMAC-SHA256(SANITY_REVALIDATE_SECRET, "<t>.<body>")>
 *   body: the document (at least _id and _type; path optional, e.g. /dental-implants/)
 *
 * 503 when SANITY_REVALIDATE_SECRET is not set, 401 on a missing or bad
 * signature, 400 on a body without _id/_type. Refreshes the tags of the
 * document's id and type (drafts./versions. prefixes removed) and, when the
 * body has a safe site-relative path, that page.
 * Env var (name only, set in Vercel): SANITY_REVALIDATE_SECRET.
 */
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function validSignature(header: string | null, body: string, secret: string): boolean {
  if (!header) return false;
  const parts = new Map(
    header.split(",").map((part) => {
      const i = part.indexOf("=");
      return [part.slice(0, i).trim(), part.slice(i + 1).trim()] as const;
    }),
  );
  const t = parts.get("t") ?? "";
  const v1 = parts.get("v1") ?? "";
  if (!/^\d{1,16}$/.test(t) || !/^[A-Za-z0-9_-]+={0,2}$/.test(v1)) return false;

  const expected = createHmac("sha256", secret).update(`${t}.${body}`).digest();
  const given = Buffer.from(v1.replace(/=+$/, ""), "base64url");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// Only site-relative page paths such as / or /about/ (no protocol, host, "//" or "..").
const safePath = (value: unknown): string | null =>
  typeof value === "string" && value.length <= 512 && /^\/(?:[A-Za-z0-9._~-]+\/)*(?:[A-Za-z0-9._~-]+)?$/.test(value) && !/(^|\/)\.\.?(\/|$)/.test(value) ? value : null;

// Tags are case-sensitive and at most 256 characters; ids and types are short ASCII.
const safeTag = (value: unknown): string | null => (typeof value === "string" && /^[A-Za-z0-9._-]{1,200}$/.test(value) ? value : null);

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return json({ revalidated: false, message: "Not configured" }, 503);

  const body = await request.text();
  if (!validSignature(request.headers.get("sanity-webhook-signature"), body, secret)) {
    return json({ revalidated: false, message: "Invalid signature" }, 401);
  }

  let doc: { _id?: unknown; _type?: unknown; path?: unknown };
  try {
    doc = JSON.parse(body);
  } catch {
    return json({ revalidated: false, message: "Invalid JSON" }, 400);
  }

  const id = safeTag(typeof doc?._id === "string" ? doc._id.replace(/^(drafts|versions\.[^.]+)\./, "") : null);
  const type = safeTag(doc?._type);
  if (!id || !type) return json({ revalidated: false, message: "Missing _id or _type" }, 400);

  const tags = [...new Set([id, type])];
  // expire: 0 so the next visit gets the published change, not one stale copy first.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  const path = safePath(doc.path);
  if (path) revalidatePath(path);

  return json({ revalidated: true, tags, path, now: Date.now() });
}
