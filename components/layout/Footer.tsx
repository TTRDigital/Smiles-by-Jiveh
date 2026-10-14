import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

function Contact({ href, icon, children }: { href?: string; icon: React.ReactNode; children: React.ReactNode }) {
  const inner = (
    <>
      <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-teal text-white">{icon}</span>
      <span className="text-sm leading-[1.65] text-ink">{children}</span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 hover:[&>span:last-child]:text-teal-deep" data-track={href.startsWith("tel:") ? "click_to_call" : undefined}>
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4">{inner}</div>
  );
}

/** Logo and contact details, the three treatment columns, then the copyright bar. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;
  return (
    <footer className="bg-footer">
      <div className="container-x grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:pr-6">
          <Link href="/" aria-label="Smiles By Jiveh home" className="inline-block">
            <Image src={settings.logo.src} alt={settings.logo.alt || settings.name} width={482} height={213} sizes="180px" className="h-[78px] w-auto lg:h-[54px]" />
          </Link>
          <div className="mt-7 grid gap-3">
            <Contact href={settings.phoneHref} icon={<Phone className="h-5 w-5" strokeWidth={1.75} />}>
              {settings.phone}
            </Contact>
            <Contact href={`mailto:${settings.email}`} icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}>
              {settings.email}
            </Contact>
            <Contact href={settings.mapsUrl} icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}>
              <span className="block max-w-[11rem] lg:max-w-[9.5rem]">{address}</span>
            </Contact>
          </div>
        </div>
        {settings.footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-lg font-bold leading-none text-[#141414]">{col.title}</p>
            <ul className="mt-6 grid gap-[5px]">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm font-medium leading-[1.65] text-[#242424] transition-colors hover:text-teal-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/10">
        <div className="container-x flex flex-col items-center gap-2 py-4 text-center text-sm text-ink md:flex-row md:justify-between md:text-base">
          <p>
            {settings.copyright.replace("{year}", String(year))}{" "}
            <Link href="/privacy-policy/" className="ml-1 underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
          </p>
          {settings.credit.href ? (
            <a href={settings.credit.href} target="_blank" rel="noopener" className="hover:underline">
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
