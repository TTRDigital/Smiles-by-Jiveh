// Page template. Every string from content goes through esc().
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Same tags as the old GoHighLevel pages (read from their live HTML).
const GTM = "GTM-KW9CW8P7";
const GADS = "AW-872559974";
// TTR OS tracker: the site key is public (already in the main site's code).
const TTR_KEY = process.env.TTR_SITE_KEY || "xIKk2Z_Pf3B3Tge2znW_0A";

const css = `
:root{--primary:#7c9ea6;--primary-d:#5f8590;--ink:#0c0c0c;--muted:#4b5563;--tint:#effcfc;--sand:#d9c8ae}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,system-ui,sans-serif;color:#1f2937;background:#fff;line-height:1.6;-webkit-text-size-adjust:100%}
h1,h2,h3{font-family:'Playfair Display',Georgia,serif;color:var(--ink);line-height:1.15;margin:0}
img,video{max-width:100%;display:block}a{color:inherit}
.wrap{max-width:1200px;margin:0 auto;padding:0 20px}
.bar{background:#000;color:#fff;text-align:center;font-size:12px;font-weight:500;padding:8px 12px}
header.top{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);box-shadow:0 1px 8px rgba(0,0,0,.08)}
header .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:12px}
header img{height:40px;width:auto;filter:brightness(0)}
.hphone{display:none;font-weight:600;text-decoration:none;color:var(--ink)}
.hcall{display:flex;width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;align-items:center;justify-content:center;text-decoration:none;flex:none}
.btn{display:inline-block;border:0;cursor:pointer;font:600 14px/1.2 Inter,sans-serif;background:var(--primary);color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.btn:hover{background:var(--primary-d)}.btn.sand{background:var(--sand);color:var(--ink)}
.btn.sm{font-size:11px;padding:10px 12px;letter-spacing:.02em}
.hero{position:relative;min-height:440px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:#222;color:#fff}
.hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.35);opacity:.55}
.hero .in{position:relative;padding:48px 20px}
.hero h1{color:#fff;font-size:clamp(34px,6vw,64px);max-width:900px;margin:0 auto 24px;text-shadow:0 2px 12px rgba(0,0,0,.4)}
.pill{display:inline-flex;gap:12px;align-items:center;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:6px 8px 6px 18px;font-size:14px;margin-bottom:24px}
.pill b{background:var(--primary);border-radius:999px;padding:4px 14px;font-size:16px}
.trust{background:#000;color:#fff}.trust ul{list-style:none;margin:0;padding:24px 0;display:grid;grid-template-columns:1fr 1fr;gap:20px 12px;text-align:center;font-size:13px}
.trust li:before{content:"";display:block;width:20px;height:20px;margin:0 auto 8px;border:2px solid #8aa;border-radius:50%}
section{padding:56px 0}.tint{background:var(--tint)}
.grid2{display:grid;gap:32px;align-items:start}
.media{border-radius:16px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.18);background:#222}
.media video,.media img{width:100%;height:auto}.media.crop img{aspect-ratio:4/3;object-fit:cover;object-position:center 100%}
h2{font-size:clamp(26px,3.6vw,36px);margin-bottom:16px}
.price{border:2px solid #c9dbe0;border-radius:12px;background:#fff;padding:18px 20px;margin:20px 0}
.price s{display:block;color:var(--muted);font-size:14px}.price strong{font-family:'Playfair Display',serif;font-size:30px;color:var(--primary-d);display:block}.price em{font-style:normal;color:#15803d;font-weight:600;font-size:14px}
.price.plain strong{font-size:20px}.price.plain em{display:block;color:var(--muted);font-weight:400;font-style:italic}
h3{font-size:18px;margin:24px 0 12px}
.checks,.dots{list-style:none;margin:0;padding:0;font-size:14px}
.checks{display:grid;gap:10px 20px}.checks li{position:relative;padding-left:26px}
.checks li:before{content:"✓";position:absolute;left:0;top:1px;width:18px;height:18px;border-radius:50%;border:1.5px solid var(--primary);color:var(--primary);font-size:11px;text-align:center;line-height:15px}
.dots li{margin:0 0 8px;padding-left:18px;position:relative}.dots li:before{content:"•";position:absolute;left:4px}
.note{border:1px solid #d7e3e6;background:#fff;border-radius:8px;padding:14px 16px;font-size:12.5px;color:var(--muted);margin:20px 0}
.em{font-style:italic;color:var(--muted);font-size:14px}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--ink)}
blockquote{margin:20px 0;padding-left:18px;border-left:3px solid var(--primary);font-family:'Playfair Display',serif;font-style:italic;font-size:17px;color:var(--ink)}
blockquote cite{display:block;font:normal 13px Inter,sans-serif;margin-top:8px;color:var(--muted)}
.gal{display:grid;grid-template-columns:1fr;gap:16px;margin-top:28px}.gal img{width:100%;height:auto;border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.14)}
.center{text-align:center}.center p{max-width:640px;margin:0 auto;color:var(--muted)}
.banner{background:var(--primary);color:#fff;text-align:center;padding:48px 20px}.banner h2{color:#fff;font-size:clamp(20px,3vw,28px)}.banner p{margin:12px 0 22px}
.contact{background:var(--tint);border-radius:12px;padding:20px;margin:20px 0;display:grid;gap:14px}
.contact a{font-weight:600;font-size:18px;text-decoration:none}
footer{background:#000;color:#cbd5e1;text-align:center;padding:48px 20px 28px;font-size:14px}footer img{height:60px;width:auto;margin:0 auto 20px;filter:brightness(0) invert(1)}
footer small{display:block;margin-top:28px;padding-top:20px;border-top:1px solid #333;color:#94a3b8;font-size:12px}
dialog{border:0;border-radius:10px;padding:0;width:min(512px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.4)}
dialog::backdrop{background:rgba(0,0,0,.6)}
dialog form{padding:24px}dialog h2{font-size:24px;margin-bottom:18px}
.x{position:absolute;right:12px;top:10px;border:0;background:none;font-size:26px;cursor:pointer;line-height:1;color:#555}
label{display:block;font-size:14px;font-weight:500;margin-bottom:6px}.req{color:#dc2626}
input[type=text],input[type=email],input[type=tel],textarea{width:100%;font:16px Inter,sans-serif;padding:10px 12px;border:1px solid #d1d5db;border-radius:6px;margin-bottom:14px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.consent{display:flex;gap:10px;font-size:14px;margin:4px 0 16px}.consent input{margin-top:4px;flex:none}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
#msg{font-size:14px;margin:12px 0 0;min-height:1em}#msg.err{color:#b91c1c}#msg.ok{color:#15803d}
button[disabled]{opacity:.6;cursor:wait}
@media(min-width:768px){.hphone{display:flex}.hcall{display:none}header img{height:48px}.btn.sm{font-size:12px;padding:12px 20px}
.trust ul{grid-template-columns:repeat(4,1fr);font-size:14px}.grid2{grid-template-columns:1fr 1fr;gap:56px}.checks{grid-template-columns:1fr 1fr}.gal{grid-template-columns:repeat(2,1fr)}
.hero{min-height:560px}section{padding:80px 0}}
@media(min-width:1100px){.gal{grid-template-columns:repeat(4,1fr)}}
@media(prefers-reduced-motion:reduce){.hero video{display:none}}
`;

const phoneLinks = (c, cls = "", icon = "") =>
  `<a class="${cls}" href="tel:${esc(c.phoneHref)}" data-phone-href data-track="click_to_call">${icon}<span data-phone-text>${esc(c.phone)}</span></a>`;

const FORM_JS = `
(function(){
  var d=document.getElementById('lead'),f=d.querySelector('form'),m=document.getElementById('msg'),t0=Date.now(),b=f.querySelector('[type=submit]');
  function open(e){if(e)e.preventDefault();t0=Date.now();m.textContent='';m.className='';if(d.showModal)d.showModal();else d.setAttribute('open','')}
  document.querySelectorAll('[data-open]').forEach(function(a){a.addEventListener('click',open)});
  d.querySelector('.x').addEventListener('click',function(){d.close()});
  d.addEventListener('click',function(e){if(e.target===d)d.close()});
  var q=new URLSearchParams(location.search);
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='';m.textContent='';
    var v=function(n){return (f.elements[n]&&f.elements[n].value||'').trim()};
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v('email'))){m.className='err';m.textContent='Please enter a valid email address.';return}
    if(v('phone').replace(/\\D/g,'').length<10){m.className='err';m.textContent='Please enter a phone number with area code.';return}
    if(!f.elements.consent.checked){m.className='err';m.textContent='Please agree so we can contact you.';return}
    var body={slug:f.dataset.slug,first_name:v('first_name'),last_name:v('last_name'),email:v('email'),phone:v('phone'),message:v('message'),consent:f.elements.consent.checked,consent_text:f.dataset.consent,hp:v('hp'),elapsed_ms:Date.now()-t0,page_url:location.href,referrer:document.referrer};
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid'].forEach(function(k){body[k]=q.get(k)||''});
    b.disabled=true;
    fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{ok:r.ok&&j.ok,j:j}})}).then(function(x){
      if(x.ok){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'lead_form_submit',form_slug:body.slug});if(window.gtag)window.gtag('event','generate_lead',{form_slug:body.slug});
        f.reset();m.className='ok';m.textContent='Thank you! We received your request and will contact you shortly.'}
      else{m.className='err';m.textContent=(x.j&&x.j.error)||'We could not send your request. Please call us instead.'}
    }).catch(function(){m.className='err';m.textContent='We could not send your request. Please call us instead.'}).then(function(){b.disabled=false});
  });
})();`;

export function render(c) {
  const cta = (label, extra = "") => `<a href="#request" class="btn ${extra}" data-open>${esc(label)}</a>`;
  const o = c.offer, dn = c.dentist, g = c.gallery;
  const media =
    o.media === "video"
      ? `<div class="media"><video controls playsinline preload="metadata" poster="/${c.slug}/expect-poster.jpg"><source src="/${c.slug}/expect.mp4" type="video/mp4"></video></div>`
      : `<div class="media"><img src="/${c.slug}/team.jpg" alt="Dr. Jiveh with a patient" width="1200" height="1500" loading="lazy"></div>`;
  const price = o.priceRegular
    ? `<div class="price"><s>${esc(o.priceRegular)}</s><strong>${esc(o.priceToday)}</strong><em>${esc(o.priceSave)}</em></div>`
    : `<div class="price plain"><strong>${esc(o.priceToday)}</strong><em>${esc(o.priceSave)}</em></div>`;
  return `<!doctype html>
<html lang="en">
<head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
<!-- End Google Tag Manager -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GADS}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GADS}');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-track]');if(a)gtag('event',a.getAttribute('data-track'),{link_url:a.href||''})});</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<meta name="robots" content="noindex, nofollow">
<meta name="author" content="Smiles By Jiveh">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<meta property="og:title" content="${esc(c.title)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:type" content="website">
<style>${css}</style>
<script async src="https://ttr-portal.vercel.app/api/site/script" data-site="${esc(TTR_KEY)}"></script>
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<div class="bar">${esc(c.topBar)}</div>
<header class="top"><div class="wrap">
  <a href="/"><img src="/shared/logo.png" alt="Smiles By Jiveh" width="120" height="48"></a>
  <div style="display:flex;align-items:center;gap:14px">
    ${phoneLinks(c, "hphone")}
    ${phoneLinks({ ...c, phone: "" }, "hcall", "☎").replace('<span data-phone-text></span>', "")}
    ${cta(c.headerCta, "sm")}
  </div>
</div></header>
<main>
<div class="hero"><video autoplay muted loop playsinline aria-hidden="true"><source src="/shared/hero.mp4" type="video/mp4"></video>
  <div class="in"><h1>${esc(c.hero.heading)}</h1><div class="pill">${esc(c.hero.pill)} <b>${esc(c.hero.pillBadge)}</b></div><div>${cta(c.hero.cta)}</div></div></div>
<div class="trust"><div class="wrap"><ul>${c.trust.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div>
<section class="tint"><div class="wrap grid2">
  ${media}
  <div>
    <h2>${esc(o.heading)}</h2><p>${esc(o.intro)}</p>
    ${price}
    <h3>${esc(o.listHeading)}</h3><ul class="checks">${o.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    ${o.optional?.length ? `<h3>${esc(o.optionalHeading)}</h3><ul class="dots">${o.optional.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
    <p class="em">${esc(o.closing)}</p>
    ${o.note ? `<div class="note">${esc(o.note)}</div>` : ""}
    ${cta(c.ctaLabel)}
  </div></div></section>
<section><div class="wrap grid2">
  <div class="media" style="background:#fff"><img src="/shared/doctor.jpg" alt="Dr. Farokh Jiveh" width="900" height="1100" loading="lazy"></div>
  <div><div class="eyebrow">${esc(dn.eyebrow)}</div><h2 style="margin-top:8px">${esc(dn.name)}</h2>
    <h3>${esc(dn.subheading)}</h3><p class="em"><b>${esc(dn.tagline)}</b></p>
    ${dn.body.map((p) => `<p>${esc(p)}</p>`).join("")}
    <blockquote>“${esc(dn.quote)}”${dn.quoteBy ? `<cite>${esc(dn.quoteBy)}</cite>` : ""}</blockquote>
    <ul class="checks" style="grid-template-columns:1fr">${dn.credentials.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div></div></section>
<section class="tint"><div class="wrap center"><h2>${esc(g.heading)}</h2><p>${esc(g.text)}</p>
  <div class="gal">${g.images.map((s, i) => `<img src="/${c.slug}/${esc(s)}" alt="Smiles By Jiveh patient smile ${i + 1}" width="900" height="900" loading="lazy">`).join("")}</div>
  <p style="margin-top:32px">${cta(c.ctaLabel)}</p></div></section>
<div class="banner"><h2>${esc(c.banner.heading)}</h2><p>${esc(c.banner.text)}</p>${cta(c.banner.cta, "sand")}</div>
<section><div class="wrap grid2">
  <div><h2>${esc(c.office.heading)}</h2><p>${esc(c.office.text)}</p>
    <div class="contact">${phoneLinks(c)}<span>${c.office.address.map(esc).join("<br>")}</span></div>${cta(c.ctaLabel)}</div>
  <div class="media crop"><img src="/shared/office.jpg" alt="The Smiles By Jiveh team" width="1200" height="1500" loading="lazy"></div>
</div></section>
</main>
<footer><img src="/shared/logo.png" alt="Smiles By Jiveh" width="160" height="74" loading="lazy"><div>${esc(c.footer.tagline)}</div><small>${esc(c.footer.copyright)}</small></footer>
<dialog id="lead" aria-labelledby="lead-h"><form data-ttr-skip data-slug="${esc(c.slug)}" data-consent="${esc(c.form.consent)}" novalidate>
  <button class="x" type="button" aria-label="Close">×</button>
  <h2 id="lead-h">${esc(c.form.heading)}</h2>
  <div class="row2"><div><label for="first_name">First Name</label><input id="first_name" name="first_name" type="text" autocomplete="given-name" maxlength="80"></div>
  <div><label for="last_name">Last Name</label><input id="last_name" name="last_name" type="text" autocomplete="family-name" maxlength="80"></div></div>
  <label for="email">Email <span class="req">*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="200">
  <label for="phone">Phone Number <span class="req">*</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" required maxlength="40">
  <label for="message">Message</label><textarea id="message" name="message" rows="3" maxlength="3000" placeholder="${esc(c.form.messagePlaceholder)}"></textarea>
  <div class="hp" aria-hidden="true"><input name="hp" type="text" tabindex="-1" autocomplete="off"></div>
  <label class="consent"><input type="checkbox" name="consent" required><span>${esc(c.form.consent)} <span class="req">*</span></span></label>
  <button class="btn" type="submit" style="width:100%">${esc(c.form.submit)}</button>
  <p id="msg" role="status" aria-live="polite"></p>
</form></dialog>
<script>${FORM_JS}</script>
<script src="/number.js" defer></script>
</body>
</html>
`;
}
