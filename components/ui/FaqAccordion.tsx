"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/types";

/**
 * Accordion like the old site's: the open question turns teal. The first is
 * open. Answers stay in the HTML for search engines; closed ones are hidden
 * and taken out of the tab order.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="grid gap-5">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.question} className={`rounded-[20px] transition-colors duration-300 ${isOpen ? "bg-teal text-white" : "bg-page text-black"}`}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-semibold leading-[1.4] md:px-10 md:text-xl md:leading-[1.65]"
              >
                {item.question}
                <svg viewBox="0 0 320 512" aria-hidden="true" className={`h-4 w-3 shrink-0 fill-current transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-[15px] leading-[1.65] text-white/90 md:px-10 md:text-base">
                  {item.answer.split(/\n+/).map((p) => (
                    <p key={p} className="mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
