/**
 * Loads the built-in content (lib/data) and its photos into Sanity, so the
 * CMS starts full instead of empty: site settings, shared sections, every
 * page, the 24 treatment pages, Google reviews and FAQs.
 *
 *   npm run seed                # create documents that don't exist yet
 *   npm run seed -- --force     # overwrite everything with the built-in content
 *   npm run seed -- --dry-run   # build every document without uploading or writing
 *   npm run seed -- --dry-run --out=docs.json   # ...and save them to a file to inspect
 *
 * Needs SANITY_WRITE_TOKEN (an Editor token from sanity.io/manage > API >
 * Tokens) in .env.local or the environment. Writes to project 3wz2011s /
 * production unless NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET
 * say otherwise. Without --force, anything an editor already changed is kept.
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import { fallbackSettings, fallbackShared, fallbackTestimonials } from "../lib/data/site.ts";
import { fallbackAbout, fallbackAppointment, fallbackDoctor, fallbackHome, fallbackInsurance, fallbackPrivacy } from "../lib/data/pages.ts";
import { fallbackTreatments } from "../lib/data/treatments.ts";

const root = new URL("..", import.meta.url).pathname;

// Minimal .env.local reader so the script works without extra packages.
if (existsSync(join(root, ".env.local"))) {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// Imported after .env.local is loaded so its values apply.
const { dataset, projectId, apiVersion } = await import("../sanity/env.ts");
const token = process.env.SANITY_WRITE_TOKEN;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

if (!dryRun && (!projectId || !token)) {
  console.error("Set SANITY_WRITE_TOKEN in .env.local (an Editor token from sanity.io/manage > API > Tokens).");
  process.exit(1);
}

const client = createClient({ projectId: projectId || "dry-run", dataset, token, apiVersion, useCdn: false });

/* ---------- helpers ---------- */

let keyN = 0;
const key = () => `k${(keyN++).toString(36)}`;
const uploaded = new Map<string, string>();

async function asset(src: string) {
  if (uploaded.has(src)) return uploaded.get(src)!;
  const file = join(root, "public", src);
  if (!existsSync(file)) throw new Error(`Missing image file: ${file}`);
  if (dryRun) {
    uploaded.set(src, `image-dry-${uploaded.size}`);
    return uploaded.get(src)!;
  }
  const doc = await client.assets.upload("image", createReadStream(file), { filename: basename(file) });
  uploaded.set(src, doc._id);
  process.stdout.write(".");
  return doc._id;
}

type Json = unknown;
const isObj = (v: Json): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);
const isImg = (v: Json): v is { src: string; alt: string } => isObj(v) && typeof v.src === "string" && "alt" in v;

/* _type of the objects inside each named array (matches sanity/schemaTypes). */
function memberType(field: string, parentType?: string): string | undefined {
  if (field === "items") return parentType === "detailsBlock" ? "detailItem" : parentType === "faqBlock" ? "faqItem" : parentType === "splitBlock" ? "card" : undefined;
  return (
    {
      cards: "card",
      options: "card",
      ctas: "cta",
      steps: "step",
      slides: "serviceSlide",
      methods: "method",
      stats: "stat",
      hours: "hoursRow",
      nav: "navItem",
      children: "navLink",
      links: "navLink",
      footerColumns: "footerColumn",
      social: "socialLink",
    } as Record<string, string>
  )[field];
}

/**
 * Turns built-in content into Sanity values: local photos are uploaded and
 * become altImage references, array items get _key and _type, Portable Text
 * (rich text) is kept as is.
 */
async function toSanity(value: Json, field = "", parentType?: string): Promise<Json> {
  if (isImg(value)) {
    return { _type: "altImage", alt: value.alt, asset: { _type: "reference", _ref: await asset(value.src) } };
  }
  if (Array.isArray(value)) {
    const type = memberType(field, parentType);
    return Promise.all(
      value.map(async (item) => {
        const v = await toSanity(item, "", isObj(item) ? ((item._type as string) ?? type) : undefined);
        return isObj(v) ? { ...(type && !v._type ? { _type: type } : {}), _key: (v._key as string) ?? key(), ...v } : v;
      }),
    );
  }
  if (isObj(value)) {
    const out: Record<string, Json> = {};
    const type = (value._type as string) ?? parentType;
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = await toSanity(v, k, type);
    }
    return out;
  }
  return value;
}

const seo = (s: { title: string; description: string }) => ({ _type: "seo", title: s.title, description: s.description });

/* ---------- documents ---------- */

async function build() {
  const docs: Record<string, unknown>[] = [];
  const page = async (_id: string, data: Record<string, unknown>) => {
    const { seo: s, ...rest } = data as { seo?: { title: string; description: string } };
    docs.push({ _id, _type: _id, ...((await toSanity(rest)) as object), ...(s ? { seo: seo(s) } : {}) });
  };

  await page("siteSettings", fallbackSettings);
  await page("sharedSections", fallbackShared);
  await page("homePage", fallbackHome);
  await page("aboutPage", fallbackAbout);
  await page("doctorPage", fallbackDoctor);
  await page("insurancePage", fallbackInsurance);
  await page("appointmentPage", fallbackAppointment);
  await page("privacyPage", fallbackPrivacy);

  for (const t of fallbackTreatments) {
    const { slug, seo: s, ...rest } = t;
    docs.push({
      _id: `treatment-${slug}`,
      _type: "treatment",
      slug: { _type: "slug", current: slug },
      ...((await toSanity(rest)) as object),
      seo: seo(s),
    });
    // Each FAQ also goes into the FAQ library, linked to its treatment.
    for (const b of t.blocks) {
      if (b._type !== "faqBlock") continue;
      b.items.forEach((f, n) =>
        docs.push({
          _id: `faq-${slug}-${n + 1}`,
          _type: "faq",
          question: f.question,
          answer: f.answer,
          treatment: { _type: "reference", _ref: `treatment-${slug}` },
          order: t.order * 100 + n,
        }),
      );
    }
  }

  fallbackTestimonials.forEach((r, n) => docs.push({ _id: `testimonial-${n + 1}`, _type: "testimonial", ...r, order: n + 1 }));
  return docs;
}

console.log(`Seeding ${projectId}/${dataset}${dryRun ? " (dry run)" : force ? " (overwriting)" : " (keeping existing documents)"}. Uploading photos`);
const docs = (await build()) as { _id: string; _type: string }[];
console.log(`\n${uploaded.size} photos ${dryRun ? "checked" : "uploaded"}. ${docs.length} documents.`);
if (dryRun) {
  const counts = docs.reduce<Record<string, number>>((a, d) => ((a[d._type] = (a[d._type] ?? 0) + 1), a), {});
  console.log("Dry run, nothing written:", counts);
  const out = process.argv.find((a) => a.startsWith("--out="))?.slice(6);
  if (out) (await import("node:fs")).writeFileSync(out, JSON.stringify(docs, null, 2));
  process.exit(0);
}

// Transactions in batches, so a large seed stays under the API's size limits.
for (let i = 0; i < docs.length; i += 40) {
  const tx = client.transaction();
  for (const d of docs.slice(i, i + 40)) {
    if (force) tx.createOrReplace(d);
    else tx.createIfNotExists(d);
  }
  await tx.commit();
}
console.log("Done. Open /cms to see the content.");
