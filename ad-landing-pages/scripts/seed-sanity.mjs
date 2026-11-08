/**
 * Loads the static landing-page content into Sanity (project 3wz2011s) as landingPage documents.
 * NEVER overwrites: it uses createIfNotExists with a fixed _id (landingPage-<slug>), so anything an
 * editor changed is kept. Dry run is the default-safe path.
 *
 *   node scripts/seed-sanity.mjs --dry-run     # prints what it would create; needs no token, no network
 *   node scripts/seed-sanity.mjs               # creates missing docs; needs SANITY_WRITE_TOKEN in the environment
 *
 * The token is read from the environment only (never a flag, never a file in git).
 */
import { readFileSync } from "node:fs";

const dryRun = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3wz2011s";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!dryRun && !token) {
  console.error("SANITY_WRITE_TOKEN is not set. Run with --dry-run to preview, or ask Ben to run the seed with the token.");
  process.exit(1);
}

const docs = ["offer", "implant"].map((slug) => {
  const { host, gallery, ...c } = JSON.parse(readFileSync(new URL(`../content/${slug}.json`, import.meta.url), "utf8"));
  const { images, ...galleryText } = gallery; // gallery photos stay static files
  return { _id: `landingPage-${slug}`, _type: "landingPage", ...c, slug: { _type: "slug", current: slug }, gallery: galleryText };
});

for (const d of docs) console.log(`${dryRun ? "[dry run] would create if missing" : "create if missing"}: ${d._id} (${Object.keys(d).length} fields)`);
if (dryRun) { console.log("Dry run only: nothing was sent."); process.exit(0); }

const res = await fetch(`https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations: docs.map((d) => ({ createIfNotExists: d })) }),
});
const out = await res.json().catch(() => ({}));
if (!res.ok) { console.error("Sanity refused:", res.status, out?.error?.description || ""); process.exit(1); }
console.log("Done. Existing documents were left as they are.", (out.results || []).map((r) => `${r.id}:${r.operation}`).join(", "));
