/*
 * Third-party IDs. All public; read at build time.
 *
 * GoHighLevel chat: NEXT_PUBLIC_GHL_CHAT_WIDGET_ID (Sites > Chat Widget > Get code: data-widget-id).
 *   Empty until the practice sends it, so the chat stays hidden.
 * Google: the old site loaded Google Site Kit's tag and Google Tag Manager.
 *   NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GTM_ID override these; "off" disables one.
 */
const env = (v: string | undefined, fallback: string) => (v === "off" ? "" : v || fallback);

export const chatWidgetId = env(process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID, "");
export const gaId = env(process.env.NEXT_PUBLIC_GA_ID, "GT-TBVN7SPV");
export const gtmId = env(process.env.NEXT_PUBLIC_GTM_ID, "GTM-KW9CW8P7");
