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
  /** "below": arrows and a progress line under the slides, so nothing sits on the photos. */
  arrows?: "teal" | "plain" | "glass" | "below" | "none";
  arrowTop?: string;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const items = Children.toArray(children);

  // Progress line for arrows="below": how far the track has scrolled.
  useEffect(() => {
    const el = track.current;
    if (!el || arrows !== "below") return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [arrows]);

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
      ? "flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white shadow-sm transition-colors hover:bg-teal-hi"
      : arrows === "glass"
        ? "flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/75 text-ink shadow-[0_10px_30px_-12px_rgb(23_46_48/0.5)] backdrop-blur-md transition-colors hover:bg-white"
        : "flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/30 text-white transition-colors hover:bg-black/45";

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
      {arrows === "below" && items.length > 1 ? (
        <div className="mt-8 flex items-center gap-6">
          <div aria-hidden="true" className="relative h-px flex-1 bg-ink/15">
            <span className="absolute inset-y-[-1px] left-0 bg-teal transition-[width] duration-300" style={{ width: `${Math.max(12, progress * 100)}%` }} />
          </div>
          <div className="flex gap-2.5">
            <button type="button" aria-label="Previous slide" onClick={() => step(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-teal hover:bg-teal hover:text-white">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => step(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-teal hover:bg-teal hover:text-white">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ) : arrows !== "none" && items.length > 1 ? (
        <>
          <button type="button" aria-label="Previous slide" onClick={() => step(-1)} className={`absolute left-3 z-10 -translate-y-1/2 ${btn}`} style={{ top: arrowTop }}>
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => step(1)} className={`absolute right-3 z-10 -translate-y-1/2 ${btn}`} style={{ top: arrowTop }}>
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </>
      ) : null}
    </div>
  );
}
