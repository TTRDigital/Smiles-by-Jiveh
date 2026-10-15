"use client";

import { useEffect } from "react";

/**
 * GoHighLevel (LeadConnector) form, embedded exactly as the old WordPress
 * page did: the form's iframe plus GoHighLevel's form_embed.js, which sizes
 * the iframe to the form. Submissions go straight into GoHighLevel.
 */
export function GhlFormEmbed({ formId, title = "Smiles by Jiveh Main Form" }: { formId: string; title?: string }) {
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
      data-height="1536"
      data-layout-iframe-id={`inline-${formId}`}
      data-form-id={formId}
      className="block min-h-[860px] w-full rounded-lg border-0"
    />
  );
}
