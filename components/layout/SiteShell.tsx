import type { ReactNode } from "react";
import { getSiteSettings } from "@/lib/content";
import { businessSchema } from "@/lib/schema";
import { revealScript } from "@/lib/reveal-script";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { Analytics } from "@/components/layout/Analytics";
import { HydrationSignal } from "@/components/layout/HydrationSignal";
import { AttributionCapture } from "@/components/forms/AttributionCapture";

/** Header, footer and site-wide behaviors. Used by the site layout and the 404 page. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const s = await getSiteSettings();
  return (
    <>
      <JsonLd data={businessSchema(s)} />
      <a href="#main" className="sr-only z-[100] rounded-lg bg-teal px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header
        nav={s.nav}
        cta={s.headerCta}
        phone={s.phone}
        phoneHref={s.phoneHref}
        address={`${s.street}, ${s.city}, ${s.region} ${s.postalCode}`}
        mapsUrl={s.mapsUrl}
        logo={s.logo}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={s} />
      <ChatWidget />
      <AttributionCapture />
      <HydrationSignal />
      <Analytics />
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
    </>
  );
}
