"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

/**
 * Google reviews. With a widget ID (Site settings) this is the same Elfsight
 * widget the old site used, loaded only when the section scrolls near the
 * screen. Without one, the reviews from /cms are shown as cards.
 */
export function ReviewsWidget({
  widgetId,
  reviews,
  rating,
  count,
  reviewsUrl,
  writeReviewUrl,
}: {
  widgetId?: string;
  reviews: Testimonial[];
  rating?: number;
  count?: number;
  reviewsUrl?: string;
  writeReviewUrl?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!widgetId || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "600px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [widgetId]);

  useEffect(() => {
    if (!load || document.querySelector("script[data-elfsight]")) return;
    const s = document.createElement("script");
    s.src = "https://elfsightcdn.com/platform.js";
    s.async = true;
    s.dataset.elfsight = "";
    document.body.appendChild(s);
  }, [load]);

  if (widgetId) {
    return (
      <div ref={ref} className="min-h-[340px]">
        <div className={`elfsight-app-${widgetId}`} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-4 rounded-[10px] bg-white px-6 py-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold">Google Reviews</p>
          {rating ? (
            <p className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
              <span className="text-xl font-bold">{rating.toFixed(1)}</span>
              <Stars n={Math.round(rating)} />
              {count ? <span className="text-xs text-muted">({count})</span> : null}
            </p>
          ) : null}
        </div>
        {writeReviewUrl ? (
          <a href={writeReviewUrl} target="_blank" rel="noopener" className="rounded-md bg-[#222] px-5 py-2.5 text-sm font-semibold text-white">
            Review us on Google
          </a>
        ) : null}
      </div>
      <ul className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
        {reviews.map((r) => (
          <li key={r.name + r.quote.slice(0, 20)} className="w-[85%] shrink-0 snap-start rounded-[10px] bg-white p-6 sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
            <p className="font-semibold">{r.name}</p>
            <Stars n={r.rating} className="mt-2" />
            <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed">{r.quote}</p>
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener" className="mt-2 inline-block text-sm text-[#1a73e8]">
                Read on Google
              </a>
            ) : null}
          </li>
        ))}
      </ul>
      {reviewsUrl ? (
        <a href={reviewsUrl} className="sr-only">
          All Google reviews
        </a>
      ) : null}
    </div>
  );
}

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-[#fbbc04] ${className}`} aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}
