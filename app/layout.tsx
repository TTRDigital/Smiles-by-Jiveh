import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { siteUrl } from "@/lib/site";

/*
 * Root layout is intentionally bare: the website's styles and chrome live
 * in app/(site)/layout.tsx so the embedded Sanity Studio at /cms loads
 * without them.
 */

// Two families: Newsreader (light display serif) for headings and Manrope for text. The design draws Newsreader only
// at its light weight (300), so that one weight is downloaded, upright and italic (about 25 KB each instead of a 58 KB
// variable file). The italic is the accent phrase in headings, often in the first screen's headline, so it is
// preloaded too: left to load late, it swapped in and moved the headline (layout shift).
const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-newsreader", weight: "300" });
const newsreaderItalic = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-newsreader-italic", style: ["italic"], weight: "300" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Smiles By Jiveh", template: "%s - Smiles By Jiveh" },
  description: "Elevated dentistry and a personalized experience with Dr. Farokh Jiveh in Royal Palm Beach, FL.",
  applicationName: "Smiles By Jiveh",
  formatDetection: { telephone: false, address: false, email: false },
  // favicon-192.png is a 10 KB copy of favicon.png (154 KB), which every page used to download.
  icons: { icon: [{ url: "/images/brand/favicon-192.png", type: "image/png", sizes: "192x192" }], apple: "/images/brand/favicon-192.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${newsreader.variable} ${newsreaderItalic.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
