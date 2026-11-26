"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

/**
 * One topic of a details section. On phones the topics are a tap-to-open
 * list (the heading stays visible; a button over the heading row opens the
 * text), so a page with eleven topics is a short list instead of a long
 * wall. From 768px every topic is open. All text is always in the HTML.
 */
export function DetailItem({
  id,
  label,
  header,
  media,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "md:block",
  defaultOpen = false,
}: {
  id: string;
  label: string;
  header: ReactNode;
  /** Always shown, also while the text is closed on phones (a topic's photo). */
  media?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  /** Display from 768px (e.g. "md:contents" so the body's children join the item's grid). */
  bodyClassName?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <div id={id} className={`relative scroll-mt-32 ${className}`}>
      <div className={`relative pr-12 md:pr-0 ${headerClassName}`}>
        {header}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          aria-label={label}
          onClick={() => setOpen((o) => !o)}
          className="absolute inset-0 flex items-start justify-end md:hidden"
        >
          <span className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${open ? "border-teal bg-teal text-white" : "border-ink/20 text-ink"}`}>
            <Plus className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </button>
      </div>
      {media}
      <div id={bodyId} className={`${open ? "block" : "hidden"} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
