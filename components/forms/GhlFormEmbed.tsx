"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GoHighLevel (LeadConnector) form, embedded exactly as the old WordPress
 * page did: the form's iframe plus GoHighLevel's form_embed.js, which sizes
 * the iframe to the form. Submissions go straight into GoHighLevel.
 *
 * The form loads only when it comes near the screen (on the home page it is
 * far below the fold and weighs about 3 MB with its Cloudflare check); with
 * `eager` (/appointment/, where it is the first screen) the iframe is in the
 * HTML. form_embed.js moves the iframe off screen until the form has loaded,
 * so a lazy iframe it hid before the iframe had started loading never loaded
 * and the form never showed (the home page's form, far below the fold). So:
 * below the fold, the iframe and the script are only added when the form
 * comes near the screen, and the iframe is not lazy; with `eager` the iframe
 * is lazy (it is on screen, so it starts loading at the first layout, before
 * the script arrives, and the browser keeps it from competing with the
 * page's own first load).
 */
export function GhlFormEmbed({
  formId,
  title = "Smiles by Jiveh Main Form",
  height = 523,
  eager = false,
}: {
  formId: string;
  title?: string;
  height?: number;
  eager?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager);

  useEffect(() => {
    const el = box.current;
    if (!el || eager) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!near || document.querySelector("script[data-ghl-form-embed]")) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    s.dataset.ghlFormEmbed = "";
    document.body.appendChild(s);
  }, [near]);

  return (
    <div ref={box} style={{ minHeight: height }}>
      {near ? (
        <iframe
          loading={eager ? "lazy" : undefined}
          src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
          id={`inline-${formId}`}
          title={title}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={title}
          data-height={String(height)}
          data-layout-iframe-id={`inline-${formId}`}
          data-form-id={formId}
          // GoHighLevel's embed code; form_embed.js then grows the iframe to the form's height.
          style={{ width: "100%", height, border: "none", borderRadius: 8 }}
          className="block"
        />
      ) : null}
    </div>
  );
}
