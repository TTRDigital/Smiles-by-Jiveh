import "server-only";

import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Fetch published content from Sanity's API CDN (drafts in draft mode on Vercel previews, see below).
 *
 * - Runs at build time only (static export): publishing in Sanity starts a
 *   rebuild + upload (.github/workflows/deploy-siteground.yml).
 * - Never throws: returns null on any failure so pages fall back to
 *   lib/content.ts defaults and the site keeps working.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  if (!projectId) return null;

  // Draft preview (Vercel previews only): when draft mode is on, read unpublished drafts straight from the API with the read token.
  // The token is only ever used in draft mode, which only a correctly signed /api/preview link can turn on.
  // draftMode() throws outside a request (generateStaticParams at build time); then there is no draft mode.
  let draft = false;
  if (process.env.VERCEL_ENV === "preview" && process.env.SANITY_READ_TOKEN) {
    try {
      draft = (await draftMode()).isEnabled;
    } catch {
      draft = false;
    }
  }

  const search = new URLSearchParams({ query, perspective: draft ? "drafts" : "published" });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.${draft ? "api" : "apicdn"}.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(url, draft ? { cache: "no-store", headers: { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` } } : { cache: "force-cache" });
    if (!res.ok) {
      console.warn(`[sanity] ${res.status} for query tags=${tags.join(",")}`);
      return null;
    }
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallbacks", error);
    return null;
  }
}
