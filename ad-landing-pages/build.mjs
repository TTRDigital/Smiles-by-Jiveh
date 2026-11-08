/**
 * Builds public/<slug>/index.html for each landing page.
 * Content = static fallback (content/<slug>.json) overlaid with the landingPage
 * document from the client's own Sanity project 3wz2011s, when one is published.
 * Sanity is read through the public API (no token). If it is unreachable or has no
 * document, the build uses the fallback alone, so the build never depends on Sanity.
 * Set SANITY_LANDING=off to skip the fetch.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { render } from "./template.mjs";

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3wz2011s";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const slugs = ["offer", "implant"];

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const merge = (base, over) => {
  if (!isObj(over)) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v === null || v === undefined || k.startsWith("_")) continue;
    if (isObj(v) && isObj(base[k])) out[k] = merge(base[k], v);
    else if (Array.isArray(v)) { if (v.length) out[k] = v; }
    else if (typeof v === "string") { if (v.trim() !== "") out[k] = v; }
    else out[k] = v;
  }
  return out;
};

async function fromSanity(slug) {
  if (process.env.SANITY_LANDING === "off") return null;
  const q = encodeURIComponent(`*[_type=="landingPage" && slug.current==$s][0]`);
  const url = `https://${PROJECT}.apicdn.sanity.io/v2025-02-19/data/query/${DATASET}?query=${q}&$s=${encodeURIComponent(JSON.stringify(slug))}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    return result || null;
  } catch (e) {
    console.warn(`[${slug}] Sanity not used (${e.message}); static content only.`);
    return null;
  }
}

for (const slug of slugs) {
  const fallback = JSON.parse(readFileSync(new URL(`./content/${slug}.json`, import.meta.url), "utf8"));
  const cms = await fromSanity(slug);
  const content = merge(fallback, cms);
  mkdirSync(new URL(`./public/${slug}/`, import.meta.url), { recursive: true });
  writeFileSync(new URL(`./public/${slug}/index.html`, import.meta.url), render(content));
  console.log(`built public/${slug}/index.html (${cms ? "Sanity + fallback" : "fallback only"})`);
}
