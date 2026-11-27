"use client";

import { useEffect, useRef, useState } from "react";

const youtubeId = (url?: string) => url?.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1];

/**
 * Muted, looping YouTube video behind the home banner, on every screen size.
 * The poster photo shows first. The player is added once the page has loaded
 * (on phones after a short pause or the first touch/scroll, so it never slows
 * the first screen), and it only fades in once YouTube reports that the video
 * is actually playing, so a slow or blocked player never shows a black box
 * over the photo. Skipped for visitors who prefer reduced motion or have data
 * saver on.
 */
const isFile = (url?: string) => !!url && /\.(mp4|webm|mov)(\?|#|$)/i.test(url);

export function HeroVideo({ url }: { url?: string }) {
  // A video file (an .mp4 in /public or Sanity) plays natively everywhere, phones included; a YouTube link uses the player.
  if (isFile(url)) return <FileVideo src={url!} />;
  return <YouTubeVideo url={url} />;
}

/** Self-hosted background video: muted, looping, inline, shown once it is actually playing. */
function FileVideo({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && conn?.saveData !== true);
  }, []);
  if (!ok) return null;
  return (
    <video
      aria-hidden="true"
      tabIndex={-1}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onPlaying={() => setPlaying(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}

function YouTubeVideo({ url }: { url?: string }) {
  const id = youtubeId(url);
  const frame = useRef<HTMLIFrameElement>(null);
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!id || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn && (conn.saveData === true || /(^|\b)(slow-2g|2g)\b/.test(conn.effectiveType ?? ""))) return;
    const phone = !window.matchMedia("(min-width: 768px)").matches;
    let timer = 0;
    const start = () => {
      setShow(true);
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    const events = phone ? ["touchstart", "scroll", "pointerdown"] : [];
    const arm = () => {
      timer = window.setTimeout(start, phone ? 2500 : 600);
      events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", arm);
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, [id]);

  // YouTube's player reports its state by postMessage once we say we are listening.
  useEffect(() => {
    if (!show) return;
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin) || typeof e.data !== "string") return;
      try {
        const d = JSON.parse(e.data) as { event?: string; info?: number | { playerState?: number; currentTime?: number } };
        const state = typeof d.info === "number" ? d.info : d.info?.playerState;
        const time = typeof d.info === "object" ? d.info?.currentTime : undefined;
        if (state === 1 || (time ?? 0) > 0) setPlaying(true);
      } catch {
        /* not a player message */
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [show]);

  const listen = () => {
    // Ask the player for state updates (repeated a few times: it ignores messages until it is ready).
    let n = 0;
    const ping = () => {
      frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
      if (++n < 10 && !playing) window.setTimeout(ping, 500);
    };
    ping();
  };

  if (!id || !show) return null;
  const origin = typeof window === "undefined" ? "" : encodeURIComponent(window.location.origin);
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin=${origin}`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]">
      <iframe
        ref={frame}
        src={src}
        title="Smiles By Jiveh video"
        tabIndex={-1}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={listen}
        // The video is a widescreen film (about 2.39:1) with black bars baked into its 16:9 frame (92 of 720 rows at the
        // top and bottom). Sizing the player so its 2.4:1 picture area covers the hero pushes those bars outside the
        // clipped box; the 16:9 player is 9/16 of that width tall. A true 16:9 video would only be cropped a little more.
        className={`absolute left-1/2 top-1/2 h-[max(56.25cqw,135cqh)] w-[max(100cqw,240cqh)] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
