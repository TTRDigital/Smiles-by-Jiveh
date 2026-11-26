"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavLink } from "@/lib/types";

/**
 * One footer column. On phones the title is a button that opens and closes
 * the list (the footer was a long wall of links); from 768px every column is
 * always open. The links are always in the HTML.
 */
export function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-white/12 md:border-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-between py-3 text-left md:hidden"
      >
        <span className="text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-sand">{title}</span>
        <ChevronDown className={`h-4 w-4 text-sand transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <p className="hidden text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-sand md:block">{title}</p>
      <ul id={id} className={`gap-2 pb-5 md:mt-7 md:grid md:pb-0 ${open ? "grid" : "hidden"}`}>
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[15px] leading-[1.65] text-ivory/80 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
