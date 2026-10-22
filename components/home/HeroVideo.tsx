"use client";

import { useEffect, useState } from "react";

const youtubeId = (url?: string) => url?.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1];

/**
 * Muted, looping YouTube video behind the home hero (as on the old site).
 * The poster photo shows first; the video is added once the page has
 * loaded, on desktop only (the player is about 1 MB and the home page's speed
 * score on phones depends on it), and never for visitors who prefer reduced
 * motion, have data saver on or are on a slow connection.
 */
export function HeroVideo({ url }: { url?: string }) {
  const id = youtubeId(url);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = !!conn && (conn.saveData === true || /(^|\b)(slow-2g|2g|3g)\b/.test(conn.effectiveType ?? ""));
    if (slow || !window.matchMedia("(min-width: 768px)").matches) return;
    const start = () => setShow(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(start, 800);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [id]);

  if (!id || !show) return null;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]">
      <iframe
        src={src}
        title="Smiles By Jiveh video"
        tabIndex={-1}
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => window.setTimeout(() => setReady(true), 600)}
        className={`absolute left-1/2 top-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
