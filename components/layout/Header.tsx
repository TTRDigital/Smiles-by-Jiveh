"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, MapPin, Phone, X } from "lucide-react";
import type { Cta, Img, NavItem } from "@/lib/types";

type Props = { nav: NavItem[]; cta: Cta; phone: string; phoneHref: string; address: string; mapsUrl?: string; logo: Img };

const isActive = (item: NavItem, path: string) => (item.href === "/" ? path === "/" : item.href === path || !!item.children?.some((c) => c.href === path));

/**
 * Slim spruce top bar (address, phone), then the ivory header row that stays
 * at the top while scrolling: logo, menu in small tracked capitals with hover
 * dropdowns, booking pill. Below 1024px the menu opens as a full-height
 * panel from the right.
 */
export function Header({ nav, cta, phone, phoneHref, address, mapsUrl, logo }: Props) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer after navigating.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [path]);

  return (
    <>
      <div className="hidden bg-spruce lg:block">
        <div className="container-x flex h-[38px] items-center justify-end gap-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory/85">
          <a
            href={mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener"
            className="group flex min-h-[30px] items-center gap-2.5 transition-colors hover:text-sand"
          >
            <IconDot>
              <MapPin className="h-2.5 w-2.5" strokeWidth={2} />
            </IconDot>
            {address}
          </a>
          <a href={phoneHref} data-track="click_to_call" className="flex min-h-[30px] items-center gap-2.5 transition-colors hover:text-sand">
            <IconDot>
              <Phone className="h-2.5 w-2.5" strokeWidth={2} />
            </IconDot>
            {phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled ? "bg-ivory/90 shadow-[0_1px_0_0_rgb(27_42_44/0.08),0_18px_40px_-28px_rgb(23_46_48/0.35)] backdrop-blur-xl" : "bg-ivory shadow-[var(--shadow-header)]"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-3 sm:gap-6 lg:h-[84px]">
          <Link href="/" className="shrink-0" aria-label={`${logo.alt || "Smiles By Jiveh"} home`}>
            <Image src={logo.src} alt={logo.alt || "Smiles By Jiveh"} width={482} height={213} priority sizes="136px" className="h-[42px] w-auto lg:h-[50px]" />
          </Link>

          <nav aria-label="Main menu" className="hidden h-full items-center lg:flex">
            <ul className="flex h-full items-center gap-0.5 xl:gap-3">
              {nav.map((item) => (
                <DesktopItem key={item.label} item={item} active={isActive(item, path)} path={path} />
              ))}
            </ul>
            <Link
              href={cta.href}
              className="ml-3 inline-flex h-[44px] items-center whitespace-nowrap rounded-full bg-teal px-5 text-[10px] font-bold uppercase tracking-[0.12em] xl:h-[46px] xl:px-5 xl:text-[12px] xl:tracking-[0.08em] 2xl:px-6 2xl:tracking-[0.14em] text-white shadow-[0_14px_30px_-14px_rgb(44_79_86/0.7)] transition-colors hover:bg-teal-hi xl:ml-6"
            >
              {cta.label}
            </Link>
          </nav>

          {/* Phones and tablets: the phone number stays in the header (the top bar with it is desktop only). */}
          <a
            href={phoneHref}
            data-track="click_to_call"
            aria-label={`Call ${phone}`}
            className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-teal px-4 text-[13px] font-bold tracking-[0.02em] text-white shadow-[0_10px_24px_-12px_rgb(44_79_86/0.7)] lg:hidden"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span className="max-[359px]:hidden">{phone}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="-mr-2 flex h-11 w-11 shrink-0 flex-col items-end justify-center gap-[7px] p-2 lg:hidden"
          >
            <span className="block h-px w-[24px] bg-ink" />
            <span className="block h-px w-[16px] bg-ink" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} cta={cta} path={path} phone={phone} phoneHref={phoneHref} address={address} />
    </>
  );
}

function IconDot({ children }: { children: React.ReactNode }) {
  return <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-current/40">{children}</span>;
}

function DesktopItem({ item, active, path }: { item: NavItem; active: boolean; path: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
  const hasChildren = !!item.children?.length;

  // Close with Escape, or when focus leaves the item.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onFocus = (e: FocusEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const link = (
    <Link
      href={item.href}
      aria-current={item.href === path ? "page" : undefined}
      className={`relative flex h-full items-center whitespace-nowrap px-[2px] text-[10px] font-bold uppercase tracking-[0.07em] text-nav transition-colors hover:text-teal-deep xl:px-[2px] xl:text-[12px] xl:tracking-[0.06em] 2xl:px-[3px] 2xl:tracking-[0.14em] ${active ? "text-teal-deep" : ""}`}
    >
      {item.label}
      {active ? <span aria-hidden="true" className="absolute inset-x-0 bottom-[24px] h-px bg-teal-soft" /> : null}
    </Link>
  );

  if (!hasChildren) return <li className="flex h-full items-center px-1">{link}</li>;

  return (
    <li ref={ref} className="relative flex h-full items-center px-0 xl:px-1" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {link}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${item.label} submenu`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-6 items-center justify-center text-nav"
      >
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2.25} />
      </button>
      <ul
        id={id}
        className={`absolute left-0 top-[calc(100%-14px)] z-50 w-[270px] rounded-[20px] border border-line bg-paper/95 p-2 shadow-[0_30px_60px_-30px_rgb(23_46_48/0.45)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        }`}
      >
        {item.children!.map((c) => (
          <li key={c.href + c.label}>
            <Link
              href={c.href}
              aria-current={c.href === path ? "page" : undefined}
              className={`block rounded-xl px-4 py-2.5 text-[14px] leading-snug transition-colors hover:bg-cream hover:text-teal-deep ${c.href === path ? "bg-cream text-teal-deep" : "text-ink"}`}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function MobileMenu({
  open,
  onClose,
  nav,
  cta,
  path,
  phone,
  phoneHref,
  address,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  cta: Cta;
  path: string;
  phone: string;
  phoneHref: string;
  address: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-spruce/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 right-0 flex w-[88%] max-w-[420px] flex-col overflow-y-auto bg-ivory px-7 pb-10 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="my-auto py-6">
          <p className="pill mb-6">Menu</p>
          <ul className="grid divide-y divide-line border-y border-line">
            {nav.map((item) => {
              const active = isActive(item, path);
              const isOpen = expanded === item.label;
              return (
                <li key={item.label}>
                  {item.children?.length ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className={`flex w-full items-center justify-between py-3.5 text-left font-display text-[26px] font-light leading-tight ${isOpen || active ? "text-teal-deep" : "text-ink"}`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 text-ink transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
                      </button>
                      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <ul className="min-h-0 pb-3">
                          {item.children.map((c) => (
                            <li key={c.href + c.label}>
                              <Link href={c.href} className={`flex items-center gap-3 py-2 pl-1 text-[15px] font-medium ${c.href === path ? "text-teal-deep" : "text-body"}`}>
                                <span aria-hidden="true" className={`h-px shrink-0 bg-teal-soft ${c.href === path ? "w-6" : "w-3"}`} />
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className={`block py-3.5 font-display text-[26px] font-light leading-tight ${active ? "text-teal-deep" : "text-ink"}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href={cta.href} className="mt-8 flex h-[52px] items-center justify-center rounded-full bg-teal px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-white">
            {cta.label}
          </Link>
          <div className="mt-10 grid gap-3 text-[13px] text-body">
            <p className="flex items-center gap-3">
              <IconDot>
                <MapPin className="h-3 w-3" strokeWidth={2} />
              </IconDot>
              {address}
            </p>
            <a href={phoneHref} data-track="click_to_call" className="flex items-center gap-3">
              <IconDot>
                <Phone className="h-3 w-3" strokeWidth={2} />
              </IconDot>
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
