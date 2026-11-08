/*
 * Draft preview for Vercel preview deployments only (a *.vercel.ts file, so
 * it does not exist in the SiteGround static export or on production).
 *
 *   /api/preview/?secret=<SANITY_PREVIEW_SECRET>&slug=/dental-implants/
 *
 * Turns on Next.js Draft Mode (pages then read the latest drafts from Sanity
 * on every request) and redirects to the page. The secret lives in the Vercel
 * environment. Without it, or on production, the route answers 404.
 */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const secret = process.env.SANITY_PREVIEW_SECRET;
  if (process.env.VERCEL_ENV === "production" || !secret) return new Response("Not found", { status: 404 });

  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== secret) return new Response("Invalid secret", { status: 401 });

  // Same-site paths only, so this can never redirect elsewhere.
  const slug = searchParams.get("slug") || "/";
  const path = slug.startsWith("/") && !slug.startsWith("//") && !slug.includes("\\") ? slug : "/";

  (await draftMode()).enable();
  redirect(path);
}
