"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/types";

/**
 * Hairline accordion: serif questions, a plus that turns into a minus. The
 * first is open. Answers stay in the HTML for search engines; closed ones are
 * hidden and taken out of the tab order.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[20px] leading-[1.35] transition-colors md:py-7 md:text-[24px] ${isOpen ? "text-teal-deep" : "text-ink hover:text-teal-deep"}`}
              >
                {item.question}
                <span aria-hidden="true" className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${isOpen ? "border-teal bg-teal text-white" : "border-ink/20"}`}>
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                </span>
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
                <div className="max-w-[720px] pb-7 pr-12 text-[15px] leading-[1.8] text-body md:text-base">
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
