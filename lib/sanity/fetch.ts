import "server-only";

import { draftMode } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Fetch published content from Sanity's API CDN (drafts in draft mode on Vercel, see below).
 *
 * - Static export (SiteGround): runs at build time only; publishing in Sanity
 *   starts a rebuild + upload (.github/workflows/deploy-siteground.yml).
 * - Vercel: published reads are cached and tagged "sanity" plus the given
 *   tags (the document id for singletons, the type for collections), which
 *   the signed Sanity webhook at /api/revalidate refreshes on publish.
 * - Never throws: returns null on any failure so pages fall back to
 *   lib/content.ts defaults and the site keeps working.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  if (!projectId) return null;

  // Draft preview (any Vercel deployment, production included): when draft mode is on, read unpublished drafts straight from the API with
  // the read token. The token is only ever used in draft mode, which only a correctly signed /api/preview link (PREVIEW_SECRET) can turn on.
  const draft = !!process.env.VERCEL && !!process.env.PREVIEW_SECRET && !!process.env.SANITY_READ_TOKEN && (await isDraftMode());

  const search = new URLSearchParams({ query, perspective: draft ? "drafts" : "published" });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.${draft ? "api" : "apicdn"}.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(url, draft ? { cache: "no-store", headers: { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` } } : { cache: "force-cache", next: { tags: [...new Set(["sanity", ...tags])] } });
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

// draftMode() throws outside a request (generateStaticParams at build time, where the
// Vercel build has PREVIEW_SECRET set): there is no draft there, so read published content.
async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch (error) {
    unstable_rethrow(error);
    return false;
  }
}
