import Script from "next/script";
import { gaId, gtmId } from "@/lib/integrations";

/** Google tag (Site Kit's GT- ID on the old site) and Google Tag Manager, loaded after the page is idle. */
export function Analytics() {
  return (
    <>
      {gtmId ? (
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="ga" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('set','linker',{domains:['smilesbyjiveh.com']});gtag('config','${gaId}');document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-track]');if(a)gtag('event',a.getAttribute('data-track'),{link_url:a.href||''})});`}
          </Script>
        </>
      ) : null}
    </>
  );
}
