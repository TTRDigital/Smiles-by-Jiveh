import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/*
 * Leaves the signed draft preview (/api/preview): turns Next draft mode off and
 * goes back to the page, which then shows published content again.
 *
 *   GET /api/preview/exit?path=/blog/my-post/   (path optional, default /)
 *
 * Vercel builds only (*.vercel.ts). Only site-relative page paths are followed
 * (no protocol, host or "//": no open redirect).
 */
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  (await draftMode()).disable();
  redirect(/^\/([A-Za-z0-9._~-]+\/)*$/.test(path) ? path : "/");
}
