"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Lightweight slider: a scroll-snap track with arrow buttons and optional
 * autoplay (pauses on hover, focus and when off screen). Slides per view come
 * from the `slide` class (e.g. "basis-full md:basis-1/2 lg:basis-1/3").
 * Swiping works natively on phones.
 */
export function Slider({
  children,
  label,
  slide = "basis-full",
  gap = "gap-[30px]",
  autoplay = 0,
  arrows = "teal",
  arrowTop = "50%",
  className = "",
}: {
  children: ReactNode;
  label: string;
  slide?: string;
  gap?: string;
  autoplay?: number;
  arrows?: "teal" | "plain" | "none";
  arrowTop?: string;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const items = Children.toArray(children);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const w = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth - 2;
    if (dir === 1 && el.scrollLeft >= max) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 2) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || paused || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => step(1), autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, paused, visible, step]);

  const btn =
    arrows === "teal"
      ? "flex h-[45px] w-[45px] items-center justify-center rounded-full bg-teal/90 text-white shadow-sm transition-colors hover:bg-teal-hi"
      : "flex h-12 w-12 items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.5)] hover:scale-110 transition-transform";

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={track} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth ${gap}`}>
        {items.map((child, i) => (
          <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} className={`shrink-0 snap-start ${slide}`}>
            {child}
          </div>
        ))}
      </div>
      {arrows !== "none" && items.length > 1 ? (
        <>
          <button type="button" aria-label="Previous slide" onClick={() => step(-1)} className={`absolute left-2.5 z-10 -translate-y-1/2 ${btn}`} style={{ top: arrowTop }}>
            <ChevronLeft className={arrows === "teal" ? "h-6 w-6" : "h-10 w-10"} strokeWidth={arrows === "teal" ? 2.25 : 3} />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => step(1)} className={`absolute right-2.5 z-10 -translate-y-1/2 ${btn}`} style={{ top: arrowTop }}>
            <ChevronRight className={arrows === "teal" ? "h-6 w-6" : "h-10 w-10"} strokeWidth={arrows === "teal" ? 2.25 : 3} />
          </button>
        </>
      ) : null}
    </div>
  );
}
