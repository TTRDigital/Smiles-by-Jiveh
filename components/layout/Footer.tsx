import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

function Contact({ href, icon, children }: { href?: string; icon: React.ReactNode; children: React.ReactNode }) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-sand">{icon}</span>
      <span className="text-sm leading-[1.65] text-ivory/85">{children}</span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 transition-colors hover:[&>span:last-child]:text-white" data-track={href.startsWith("tel:") ? "click_to_call" : undefined}>
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4">{inner}</div>
  );
}

/** Dark spruce footer: logo (shown white) and contact details, the three treatment columns, then the copyright bar. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;
  return (
    <footer className="on-dark bg-spruce text-ivory">
      <div className="container-x grid gap-12 pb-14 pt-16 md:grid-cols-2 md:pt-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
        <div className="lg:pr-10">
          <Link href="/" aria-label="Smiles By Jiveh home" className="inline-block">
            <Image src={settings.logo.src} alt={settings.logo.alt || settings.name} width={482} height={213} sizes="180px" className="h-[64px] w-auto brightness-0 invert lg:h-[58px]" />
          </Link>
          <div className="mt-8 grid gap-3.5">
            <Contact href={settings.phoneHref} icon={<Phone className="h-4 w-4" strokeWidth={1.5} />}>
              {settings.phone}
            </Contact>
            <Contact href={`mailto:${settings.email}`} icon={<Mail className="h-4 w-4" strokeWidth={1.5} />}>
              {settings.email}
            </Contact>
            <Contact href={settings.mapsUrl} icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}>
              <span className="block max-w-[14rem]">{address}</span>
            </Contact>
          </div>
        </div>
        {settings.footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-sand">{col.title}</p>
            <ul className="mt-7 grid gap-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-[15px] leading-[1.65] text-ivory/80 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x border-t border-white/12">
        <div className="flex flex-col items-center gap-2 py-6 text-center text-[13px] text-ivory/70 md:flex-row md:justify-between">
          <p>
            {settings.copyright.replace("{year}", String(year))}{" "}
            <Link href="/privacy-policy/" className="ml-1 text-ivory underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white">
              Privacy Policy
            </Link>
          </p>
          {settings.credit.href ? (
            <a href={settings.credit.href} target="_blank" rel="noopener" className="hover:text-white hover:underline">
              {settings.credit.label}
            </a>
          ) : (
            <p>{settings.credit.label}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
