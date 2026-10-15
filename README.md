# Smiles By Jiveh website

Next.js 16 (App Router, static export) + Sanity Studio embedded at `/cms`, Tailwind CSS v4, hosted on **SiteGround** as plain files. Rebuilt from the WordPress/Elementor site at smilesbyjiveh.com by TTR Digital Marketing: same pages, same URLs, same text and photos, same look.

- **Content:** everything is editable in `/cms`. Until Sanity has content (or a field is left empty), the site shows the built-in content from `lib/data`, so it never breaks.
- **Forms:** `/appointment/` embeds the practice's GoHighLevel form ("Smiles by Jiveh Main Form", `o5N2Cg1KTnReA0wS8Jh2`), exactly as the WordPress page did, so those requests go straight into GoHighLevel. The home page "Contact Us" form posts to `/api/lead.php` (PHP on SiteGround), which forwards it to a GoHighLevel inbound webhook.
- **Reviews:** the same Elfsight Google reviews widget as the old site (ID in Site settings). Clear the ID to show the reviews stored in `/cms` instead.

## Pages (URLs unchanged from WordPress)

| URL | What |
|---|---|
| `/` | Home: video hero, intro cards, about, services slider, Dr. Jiveh, before/after, Google reviews, Contact Us form, call-to-action band |
| `/who-we-are/`, `/meet-dr-jiveh/`, `/insurance-payment-options/` | Practice pages |
| `/appointment/` | GoHighLevel appointment form, contact info, map (`/appoinment/` redirects here, in `.htaccess` and `vercel.json`) |
| 24 treatment pages, e.g. `/general-dentistry/`, `/dental-implants/` | One template (`app/(site)/[slug]`), content in `lib/data/treatments.ts` and Sanity "Treatment" documents |
| `/privacy-policy/` | New (the old site had none); linked from the form and footer |
| `/blog/` | Lists posts from `/cms` (none yet: hidden from search until the first post) |
| `/cms` | Sanity Studio |

## Setup

1. **Sanity project:** `3wz2011s`, dataset `production` (the defaults in `sanity/env.ts`).
2. **CORS:** in sanity.io/manage > API > CORS origins, allow `http://localhost:3000`, `https://smilesbyjiveh.com` and `https://www.smilesbyjiveh.com` with credentials (needed for `/cms`).
3. **Load the content into Sanity (once):** create an Editor token (sanity.io/manage > API > Tokens), put it in `.env.local` as `SANITY_WRITE_TOKEN`, then `npm install && npm run seed`. Running it again only adds missing documents; `npm run seed -- --force` overwrites the CMS with the built-in content; `npm run seed -- --dry-run` checks everything without writing. Delete or rotate the token afterwards.
4. **Run:** `npm run dev`, then open http://localhost:3000 and http://localhost:3000/cms.

## Hosting on SiteGround

`npm run build` writes the whole site to `out/`: HTML pages, `_next/` scripts, `_img/` WebP photos, `api/lead.php` (the form) and `.htaccess` (redirects, security headers, caching). Upload the **contents** of `out/` into `public_html`.

Automatic deploys (`.github/workflows/deploy-siteground.yml`) build and upload over FTPS on every push to `main` (and the development branch), when Sanity publishes, and from Actions > "Deploy to SiteGround" > Run workflow. Only changed files are uploaded. The upload is skipped until the FTP secrets exist; every run keeps a zip of the site as an artifact.

| Secret / variable | Value |
|---|---|
| `SG_FTP_SERVER` | FTP host (Site Tools > Site > FTP Accounts > Manage > FTP credentials) |
| `SG_FTP_USERNAME` / `SG_FTP_PASSWORD` | an FTP account whose folder is `smilesbyjiveh.com/public_html` |
| `GHL_WEBHOOK_URL` (secret) | GoHighLevel inbound webhook for the home page Contact Us form. Until it is set, messages are accepted but not sent anywhere. The workflow writes it to `api/lead-config.php`, which `.htaccess` never serves. |
| `NEXT_PUBLIC_GHL_CHAT_WIDGET_ID` (variable) | GoHighLevel chat widget ID. The chat stays hidden until it is set. |

**Publish → live:** in sanity.io/manage > API > Webhooks, add a webhook: URL `https://api.github.com/repos/TTRDigital/Smiles-by-Jiveh/dispatches`, method POST, triggers create/update/delete, projection `{"event_type": "sanity-publish"}`, headers `Authorization: Bearer <GitHub fine-grained token with Contents: read and write on this repo>` and `Accept: application/vnd.github+json`. Each publish then rebuilds and uploads the site (about 3 minutes).

Also turn on Site Tools > Security > SSL Manager (Let's Encrypt) and HTTPS Enforce. `.htaccess` sends `www.smilesbyjiveh.com` and `http://` to `https://smilesbyjiveh.com`.

**Google:** the old site's Google tag (Site Kit, `GT-TBVN7SPV`) and Tag Manager (`GTM-KW9CW8P7`) are built in (`lib/integrations.ts`); `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` override them, `off` disables one. After going live, disconnect Site Kit's WordPress plugin only once the new site is serving.

## Editing in /cms

- **Settings > Site settings:** phone, email, address, hours, menus, footer columns, reviews widget, header button.
- **Settings > Shared sections:** "Why Choose Smiles By Jiveh", "Our Process" and the reviews heading, shown on many treatment pages.
- **Pages:** Home, Who We Are, Meet Dr. Jiveh, Insurance & Payment Options, Book An Appointment, Privacy Policy. On Book An Appointment, "GoHighLevel form ID" picks the embedded GHL form; type `off` to show the website's own appointment form instead (sent through `GHL_WEBHOOK_URL`).
- **Treatments:** by category (General / Cosmetic / Restorative). Each page is a header plus sections: details with table of contents, cards, text and photo, FAQ, or a shared section.
- **Reviews / FAQs / Blog posts:** collections.

## Development

```bash
npm run dev        # local site
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build (static export to out/)
```

- `lib/data/*`: built-in content (fallbacks and seed source). `lib/data/images.ts` lists every local photo with its alt text.
- `lib/content.ts`: GROQ queries plus the merge over the built-in content (fetched at build time).
- `public/.htaccess`, `public/api/lead.php`: the SiteGround side (redirects, headers, form).
- `sanity/schemaTypes`: CMS schema. `scripts/seed.ts`: loads the built-in content into Sanity.
