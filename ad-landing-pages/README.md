# Smiles By Jiveh ad landing pages (TTR-1342)

Replaces the GoHighLevel pages `offer.smilesbyjiveh.com` and `implant.smilesbyjiveh.com`.
A separate static project: it does not touch the main Next.js site. Preview only; noindex.

- `content/<slug>.json` static content (the fallback); `build.mjs` overlays the `landingPage` doc from Sanity project 3wz2011s when one exists, then writes `public/<slug>/index.html`.
- `api/lead.js` Vercel Function: sends each lead to TTR OS (`/api/site/form`) and the GHL webhook.
- `public/number.js` Twilio tracking-number swap (fill `NUMBERS` when the numbers exist).
- `sanity-landingPage.ts` schema; `scripts/seed-sanity.mjs` seed (`--dry-run` first, never overwrites).
- `vercel.json` noindex header + host rewrites (`/` to `/offer/` or `/implant/` by host). Root directory in Vercel: `ad-landing-pages`.

Env vars (Vercel, names only, see `.env.example`): `GHL_WEBHOOK_URL`, `TTR_SITE_KEY`. Seed: `SANITY_WRITE_TOKEN` on a trusted machine only.
Same tags as the old pages: GTM-KW9CW8P7 and AW-872559974.

## Removed for ad compliance (Ben, Nov 9) — Kia to decide if any returns
- Offer: the genetic-testing bullet (named disease-risk claims: heart attack, stroke, Alzheimer's, diabetes, cancers).
- Both: the "Real People, Real Results" before/after gallery and its intro line (implies outcomes).
- Implant: Pam's patient quote (results claims); replaced with Dr. Jiveh's own quote from the offer page.
