/**
 * One-off: fills the `path` field (e.g. /dental-implants/) on every page
 * document, so TTR OS's page fixer can find each page. Safe to repeat; it only
 * sets `path`, nothing else. Edits the published document and, when one
 * exists, its draft, so a draft is never left without it.
 *
 *   npm run fill-paths -- --dry-run   # show what would be set
 *   npm run fill-paths                # write it
 *
 * Needs SANITY_WRITE_TOKEN (Editor token) in .env.local or the environment.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";

const root = new URL("..", import.meta.url).pathname;
if (existsSync(join(root, ".env.local"))) {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const { dataset, projectId, apiVersion } = await import("../sanity/env.ts");
const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");
if (!projectId || (!dryRun && !token)) {
  console.error("Set SANITY_WRITE_TOKEN in .env.local (an Editor token from sanity.io/manage > API > Tokens).");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

const singletons: Record<string, string> = {
  homePage: "/",
  aboutPage: "/who-we-are/",
  doctorPage: "/meet-dr-jiveh/",
  insurancePage: "/insurance-payment-options/",
  appointmentPage: "/appointment/",
  privacyPage: "/privacy-policy/",
};

const targets: { id: string; path: string }[] = Object.entries(singletons).map(([id, path]) => ({ id, path }));
const slugDocs = await client.fetch<{ _id: string; _type: string; slug: string }[]>(
  `*[_type in ["treatment","post"] && defined(slug.current) && !(_id in path("drafts.**"))]{ _id, _type, "slug": slug.current }`,
);
for (const d of slugDocs) targets.push({ id: d._id, path: d._type === "post" ? `/blog/${d.slug}/` : `/${d.slug}/` });

for (const t of targets) {
  for (const id of [t.id, `drafts.${t.id}`]) {
    const exists = await client.fetch<{ path?: string } | null>(`*[_id == $id][0]{ path }`, { id });
    if (!exists || exists.path === t.path) continue;
    console.log(`${dryRun ? "[dry run] " : ""}${id} -> ${t.path}`);
    if (!dryRun) await client.patch(id).set({ path: t.path }).commit();
  }
}
console.log(`[fill-paths] ${targets.length} pages checked${dryRun ? " (dry run, nothing written)" : ""}.`);
