import type { Metadata, Viewport } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import { siteUrl } from "@/lib/site";

/*
 * Root layout is intentionally bare: the website's styles and chrome live
 * in app/(site)/layout.tsx so the embedded Sanity Studio at /cms loads
 * without them.
 */

// Variable fonts: every weight the old site used (Open Sans 400-700, Playfair 700-800 and italic).
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair", style: ["normal", "italic"] });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", variable: "--font-open-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Smiles By Jiveh", template: "%s – Smiles By Jiveh" },
  description: "Elevated dentistry and a personalized experience with Dr. Farokh Jiveh in Royal Palm Beach, FL.",
  applicationName: "Smiles By Jiveh",
  formatDetection: { telephone: false, address: false, email: false },
  icons: { icon: [{ url: "/images/brand/favicon.png", type: "image/png" }], apple: "/images/brand/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
