import type { NextConfig } from "next";

/*
 * Static export for SiteGround (Apache) hosting: `npm run build` writes plain
 * HTML/CSS/JS to `out/`, which goes into public_html.
 *
 * What a static host has no Node server for lives elsewhere:
 * - redirects, security headers (CSP) and caching: public/.htaccess
 * - the forms: public/api/lead.php (PHP, forwards to GoHighLevel)
 * - images: WebP copies made before the build by scripts/optimize-images.mjs,
 *   picked by lib/image-loader.ts
 * - CMS updates: rebuild and upload (.github/workflows/deploy-siteground.yml),
 *   started by a push, a Sanity webhook or the "Run workflow" button
 *
 * Vercel previews (VERCEL is set during Vercel builds) run as a normal
 * Next.js app instead, because Vercel has no PHP: the form handler there is
 * app/api/lead/route.vercel.ts and the studio's inner URLs render on demand.
 * Redirects for Vercel are in vercel.json.
 */
const onVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  output: onVercel ? undefined : "export",
  // Files named *.vercel.ts only exist in Vercel builds.
  pageExtensions: onVercel ? ["vercel.ts", "tsx", "ts"] : ["tsx", "ts"],
  env: { NEXT_PUBLIC_LEAD_ENDPOINT: onVercel ? "/api/lead/" : "/api/lead.php" },
  // /dental-implants/ -> dental-implants/index.html, which Apache serves as is
  // (and matches the old WordPress URLs).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Keep in sync with WIDTHS in scripts/optimize-images.mjs.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
  },
};

export default nextConfig;
