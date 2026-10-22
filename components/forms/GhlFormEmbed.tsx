"use client";

import { useEffect } from "react";

/**
 * GoHighLevel (LeadConnector) form, embedded exactly as the old WordPress
 * page did: the form's iframe plus GoHighLevel's form_embed.js, which sizes
 * the iframe to the form. Submissions go straight into GoHighLevel. The
 * iframe loads lazily: on the home page it is far below the fold and weighs
 * about 3 MB with its Cloudflare check; on /appointment/ it is in view and
 * loads at once.
 */
export function GhlFormEmbed({ formId, title = "Smiles by Jiveh Main Form", height = 523 }: { formId: string; title?: string; height?: number }) {
  useEffect(() => {
    if (document.querySelector("script[data-ghl-form-embed]")) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    s.dataset.ghlFormEmbed = "";
    document.body.appendChild(s);
  }, []);

  return (
    <iframe
      loading="lazy"
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
  );
}
