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
 * Cream top bar (address, phone), then the white header row that stays at
 * the top while scrolling: logo, menu with hover dropdowns, booking button.
 * Below 1024px the menu opens as a drawer from the right, like the old site.
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
      <div className="hidden bg-cream lg:block">
        <div className="container-x flex h-[35px] items-center justify-end gap-3 text-xs text-[#424242]">
          <a
            href={mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-3 hover:text-teal-deep"
          >
            <IconDot>
              <MapPin className="h-2.5 w-2.5" strokeWidth={2} />
            </IconDot>
            {address}
          </a>
          <a href={phoneHref} data-track="click_to_call" className="flex items-center gap-3 hover:text-teal-deep">
            <IconDot>
              <Phone className="h-2.5 w-2.5" strokeWidth={2} />
            </IconDot>
            {phone}
          </a>
        </div>
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_20px_0_rgb(44_62_80/0.08)]" : "shadow-[var(--shadow-header)]"}`}>
        <div className="container-x flex h-[65px] items-center justify-between gap-6 lg:h-[75px]">
          <Link href="/" className="shrink-0" aria-label={`${logo.alt || "Smiles By Jiveh"} home`}>
            <Image src={logo.src} alt={logo.alt || "Smiles By Jiveh"} width={482} height={213} priority sizes="136px" className="h-[45px] w-auto lg:h-[53px]" />
          </Link>

          <nav aria-label="Main menu" className="hidden h-full items-center lg:flex">
            <ul className="flex h-full items-center gap-1 xl:gap-2">
              {nav.map((item) => (
                <DesktopItem key={item.label} item={item} active={isActive(item, path)} path={path} />
              ))}
            </ul>
            <Link
              href={cta.href}
              className="ml-4 inline-flex h-[45px] items-center rounded-[5px] bg-teal px-5 text-[15px] font-medium text-white transition-colors hover:bg-teal-hi xl:ml-5"
            >
              {cta.label}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="-mr-2 flex h-11 w-11 flex-col items-end justify-center gap-[5px] p-2 lg:hidden"
          >
            <span className="block h-[2px] w-[22px] rounded bg-ink" />
            <span className="block h-[2px] w-[16px] rounded bg-ink" />
            <span className="block h-[2px] w-[22px] rounded bg-ink" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} cta={cta} path={path} phone={phone} phoneHref={phoneHref} address={address} />
    </>
  );
}

function IconDot({ children }: { children: React.ReactNode }) {
  return <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-[#424242]">{children}</span>;
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
      className={`relative flex h-full items-center gap-1.5 px-[3px] text-[14px] font-medium text-nav transition-colors hover:text-teal-deep xl:text-[15px] ${active ? "text-ink" : ""}`}
    >
      {item.label}
      {active ? <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-teal" /> : null}
    </Link>
  );

  if (!hasChildren) return <li className="flex h-full items-center px-1">{link}</li>;

  return (
    <li ref={ref} className="relative flex h-full items-center px-1" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
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
        className={`absolute left-0 top-[calc(100%-6px)] z-50 w-[250px] rounded-lg bg-white py-1.5 shadow-[0_10px_30px_rgb(0_0_0/0.12)] transition-[opacity,transform,visibility] duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        }`}
      >
        {item.children!.map((c) => (
          <li key={c.href + c.label}>
            <Link
              href={c.href}
              aria-current={c.href === path ? "page" : undefined}
              className={`block px-[15px] py-[10px] text-[14px] leading-snug transition-colors hover:text-teal-deep ${c.href === path ? "text-teal-deep" : "text-ink"}`}
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
      <div onClick={onClose} className={`absolute inset-0 bg-ink/10 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 right-0 flex w-[75%] max-w-[360px] flex-col overflow-y-auto bg-[#f5f8fb] px-6 pb-10 pt-4 transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button type="button" onClick={onClose} aria-label="Close menu" className="ml-auto flex h-10 w-10 items-center justify-center text-ink">
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="my-auto py-6">
          <ul className="grid gap-1">
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
                        className={`flex w-full items-center justify-between py-1.5 text-left text-base font-bold ${isOpen || active ? "text-teal" : "text-ink"}`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 text-ink transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} strokeWidth={2} />
                      </button>
                      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <ul className="min-h-0">
                          {item.children.map((c) => (
                            <li key={c.href + c.label}>
                              <Link href={c.href} className={`flex items-center gap-3 py-1.5 pl-1 text-[15px] font-bold ${c.href === path ? "text-teal" : "text-ink"}`}>
                                <span aria-hidden="true" className={`h-[3px] shrink-0 rounded bg-teal ${c.href === path ? "w-3" : "w-[3px]"}`} />
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className={`block py-1.5 text-base font-bold ${active ? "text-teal" : "text-ink"}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href={cta.href} className="mt-7 inline-flex h-[44px] items-center rounded-[5px] bg-teal px-5 text-[15px] font-medium text-white">
            {cta.label}
          </Link>
          <div className="mt-14 grid gap-3 text-xs text-ink">
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
