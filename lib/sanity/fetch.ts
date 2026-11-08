import "server-only";

import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Fetch content from Sanity at build time.
 *
 * - Production (and local/SiteGround builds): published content from the API
 *   CDN, exactly as before.
 * - Vercel preview deployments (VERCEL_ENV=preview) with a read token in the
 *   Vercel environment (SANITY_API_READ_TOKEN): drafts included, so editors
 *   see unpublished changes. Opening /api/preview/ also turns on Draft Mode,
 *   which fetches fresh on every request instead of the build-time copy.
 * - Never throws: returns null on any failure so pages fall back to the
 *   built-in content in lib/data and the site keeps working.
 *
 * The token is only read from the environment and is never sent on
 * production builds.
 */
const onPreview = process.env.VERCEL_ENV === "preview";
const readToken = onPreview ? process.env.SANITY_API_READ_TOKEN : undefined;

async function isDraftMode() {
  if (!onPreview) return false; // never touches request data on production
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (build time)
  }
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  if (!projectId) return null;

  const drafts = !!readToken;
  const live = drafts && (await isDraftMode());
  const search = new URLSearchParams({ query, perspective: drafts ? "drafts" : "published" });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const host = drafts ? "api" : "apicdn";
  const url = `https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(url, {
      cache: live ? "no-store" : "force-cache",
      headers: drafts ? { Authorization: `Bearer ${readToken}` } : undefined,
    });
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
