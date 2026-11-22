import { NextResponse, type NextRequest } from "next/server";

/*
 * Vercel builds only (*.vercel.ts; next.config.ts turns on
 * skipTrailingSlashRedirect there). Pages keep exactly the trailing-slash
 * redirects Next.js made before (/about -> /about/ with a 308, a last segment
 * with a dot loses its slash), so visitors and search engines see no change.
 * The /api/ routes answer with or without the slash, so TTR OS can call
 * /api/revalidate and /api/preview?... directly instead of getting a 308 first.
 *
 * Draft mode (cookie set only by a signed /api/preview link): /blog/<url>/ is
 * served by app/(site)/blog-draft-preview, which renders on request and can
 * open a draft post that was never prerendered. The page itself checks draft
 * mode again and answers 404 without it.
 */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/" || pathname.startsWith("/api/") || pathname === "/api") return NextResponse.next();

  // Like Next.js: a last segment with a dot is a file (outside /.well-known/).
  const last = pathname.replace(/\/+$/, "").split("/").pop() ?? "";
  const isFile = /\.\w+$/.test(last) && !pathname.startsWith("/.well-known/");
  // Plain URLs: a cloned nextUrl would put trailingSlash formatting back on.
  const { search } = request.nextUrl;
  if (isFile && pathname.endsWith("/")) return NextResponse.redirect(new URL(`${pathname.replace(/\/+$/, "")}${search}`, request.url), 308);
  if (!isFile && !pathname.endsWith("/")) return NextResponse.redirect(new URL(`${pathname}/${search}`, request.url), 308);
  const post = /^\/blog\/([A-Za-z0-9._~-]+)\/$/.exec(pathname);
  if (post && request.cookies.has("__prerender_bypass")) {
    const url = request.nextUrl.clone();
    url.pathname = `/blog-draft-preview/${post[1]}/`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Next.js's own assets and image optimizer are never redirected.
  matcher: ["/((?!_next/).*)"],
};
