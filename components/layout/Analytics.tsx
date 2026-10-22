import { gaId, gtmId, ttrSiteKey } from "@/lib/integrations";

/*
 * Clicks on elements with data-track="event_name" (click_to_call) are sent as
 * events: through gtag() when the Google tag is set up, otherwise to the Tag
 * Manager dataLayer. gtag() is defined right away as a dataLayer push, so
 * events sent before Google's script is in are queued and go out once it loads.
 */
const TRACK_CLICKS = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-track]');if(!a)return;var n=a.getAttribute('data-track'),p={link_url:a.href||''};if(window.gtag)window.gtag('event',n,p);else(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:n},p))});`;

/*
 * Google's scripts (the Google tag, which carries GA4, and Tag Manager) load
 * after the visitor's first touch, scroll or key press, or after 10 seconds, so
 * they never compete with the first paint (Lighthouse, Oct 22: they blocked the
 * page for 1.3 s on phones). The config calls are queued in dataLayer first and
 * run once the tag is in. Nothing loads when the ids are empty.
 */
const GOOGLE_LOADER = `(function(){window.dataLayer=window.dataLayer||[];${
  gaId ? `function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('set','linker',{domains:['smilesbyjiveh.com']});gtag('config','${gaId}');` : ""
}var done=false;function load(){if(done)return;done=true;${
  gaId ? `var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${gaId}';document.head.appendChild(s);` : ""
}${
  gtmId
    ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
    : ""
}}['pointerdown','keydown','scroll','touchstart'].forEach(function(e){addEventListener(e,load,{once:true,passive:true})});setTimeout(load,10000);})();`;

/** Google tag (Site Kit's GT- ID on the old site) and Tag Manager after the first interaction, plus the TTR OS tracker. */
export function Analytics() {
  return (
    <>
      {ttrSiteKey ? <script async src="https://ttr-portal.vercel.app/api/site/script" data-site={ttrSiteKey} /> : null}
      {gaId || gtmId ? <script dangerouslySetInnerHTML={{ __html: GOOGLE_LOADER + TRACK_CLICKS }} /> : null}
    </>
  );
}
