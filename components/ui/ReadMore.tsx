"use client";

import { useId, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Long text shows its first lines with a soft fade and a "Read more" button.
 * Everything stays in the HTML (search engines read it all); the page only
 * folds it. Whether to fold is decided on the server (`fold`), so the button
 * is there from the first paint and nothing moves after load. Tabbing into a
 * link inside the folded part opens it.
 */
export function ReadMore({
  children,
  fold,
  height = 210,
  dark = false,
  fromMd = false,
  className = "",
}: {
  children: ReactNode;
  fold: boolean;
  /** Visible height in px while folded. */
  height?: number;
  dark?: boolean;
  /** Fold only from 768px (on phones the text sits in a tap-to-open list already). */
  fromMd?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!fold) return <div className={className}>{children}</div>;
  return (
    <div className={className}>
      <div
        id={id}
        onFocusCapture={() => setOpen(true)}
        style={open ? undefined : fromMd ? ({ "--fold-h": `${height}px` } as React.CSSProperties) : { maxHeight: height }}
        className={`overflow-hidden transition-[max-height] duration-500 ${
          open ? "" : fromMd ? "md:max-h-[var(--fold-h)] md:[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" : "[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
        }`}
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`mt-4 min-h-11 items-center gap-2.5 ${fromMd ? "hidden md:inline-flex" : "inline-flex"} text-[12px] font-bold uppercase tracking-[0.16em] transition-colors ${
          dark ? "text-sand hover:text-white" : "text-teal hover:text-teal-deep"
        }`}
      >
        <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${dark ? "border-sand/50" : "border-teal/40"}`}>
          {open ? <Minus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />}
        </span>
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
