import "server-only";
import { cache } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { merge } from "@/lib/merge";
import { fallbackSettings, fallbackShared, fallbackTestimonials } from "@/lib/data/site";
import { fallbackAbout, fallbackAppointment, fallbackDoctor, fallbackHome, fallbackInsurance, fallbackPrivacy } from "@/lib/data/pages";
import { fallbackTreatments } from "@/lib/data/treatments";
import type {
  AboutContent,
  AppointmentContent,
  DoctorContent,
  Faq,
  HomeContent,
  InsuranceContent,
  LegalContent,
  Post,
  SharedSections,
  SiteSettings,
  Testimonial,
  Treatment,
} from "@/lib/types";

/* ==========================================================================
   Content layer
   Every page reads through these functions at build time. Sanity values win
   when present; anything missing falls back to lib/data, so the site works
   before the CMS is filled in, and an empty field never breaks a page.
   ========================================================================== */

/* ---------- GROQ fragments ---------- */

const IMG = `{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const SEO = `seo{ title, description, noIndex, "image": ogImage${IMG} }`;
const CTA = `{ label, href }`;
const CARD = `{ icon, title, text, href, linkLabel }`;
const FAQ = `{ question, answer }`;
const PAGE_HERO = `hero{ eyebrow, heading, text, cta${CTA}, "images": images[]${IMG}, "mobileImages": mobileImages[]${IMG}, stacked }`;
const BLOCKS = `blocks[]{
  _type, _key,
  _type == "detailsBlock" => { eyebrow, items[]{ heading, body, "image": image${IMG} } },
  _type == "cardsBlock" => { heading, text, subheading, layout, columns, cards[]${CARD} },
  _type == "splitBlock" => { heading, text, items[]${CARD}, ctas[]${CTA}, "image": image${IMG} },
  _type == "faqBlock" => { eyebrow, heading, items[]${FAQ} },
  _type == "sharedBlock" => { kind, hideButtons }
}`;

/* ---------- Settings ---------- */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const cms = await sanityFetch<Partial<SiteSettings>>(
    `*[_id == "siteSettings"][0]{
      name, phone, email, street, city, region, postalCode, hours[]{ label, value }, openingHours,
      googleRating, reviewCount, googlePlaceId, reviewsUrl, writeReviewUrl, mapsUrl, social[]{ network, href },
      headerCta${CTA}, nav[]{ label, href, children[]{ label, href } }, footerColumns[]{ title, links[]{ label, href } },
      copyright, credit${CTA}, reviewsWidgetId, "logo": logo${IMG}
    }`,
    {},
    ["siteSettings"],
  );
  const s = merge(fallbackSettings, cms);
  // tel: link always follows the displayed phone number.
  const digits = s.phone.replace(/\D/g, "");
  return { ...s, phoneHref: `tel:+${digits.length === 10 ? `1${digits}` : digits}` };
});

export const getShared = cache(async (): Promise<SharedSections> => {
  const cms = await sanityFetch<Partial<SharedSections>>(
    `*[_id == "sharedSections"][0]{
      whyChooseUs{ eyebrow, heading, text, cards[]${CARD} },
      process{ eyebrow, heading, text, steps[]{ title, text }, ctas[]${CTA} },
      testimonials{ eyebrow, heading }
    }`,
    {},
    ["sharedSections"],
  );
  return merge(fallbackShared, cms);
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const cms = await sanityFetch<Testimonial[]>(`*[_type == "testimonial"] | order(order asc, date desc){ name, quote, rating, date, url }`, {}, ["testimonial"]);
  return cms?.length ? cms.map((t) => ({ ...t, rating: t.rating ?? 5 })) : fallbackTestimonials;
});

/** FAQs kept as their own documents in /cms (optional, e.g. for a future FAQ page). */
export const getFaqs = cache(async (): Promise<(Faq & { treatment?: string })[]> => {
  const cms = await sanityFetch<(Faq & { treatment?: string })[]>(`*[_type == "faq"] | order(order asc){ question, answer, "treatment": treatment->slug.current }`, {}, ["faq"]);
  return cms ?? [];
});

/* ---------- Treatments ---------- */

const TREATMENT = `{ "slug": slug.current, title, category, order, ${PAGE_HERO}, ${BLOCKS}, ${SEO} }`;

export const getTreatments = cache(async (): Promise<Treatment[]> => {
  const cms = await sanityFetch<Partial<Treatment>[]>(`*[_type == "treatment" && defined(slug.current)] | order(order asc) ${TREATMENT}`, {}, ["treatment"]);
  if (!cms?.length) return fallbackTreatments;
  // CMS treatments merge over the matching built-in page; new CMS-only treatments are added.
  const bySlug = new Map(fallbackTreatments.map((t) => [t.slug, t]));
  const merged = cms.map((c) => {
    const base = bySlug.get(c.slug ?? "");
    return base ? merge(base, c) : merge({ ...fallbackTreatments[0], blocks: [], slug: c.slug ?? "" }, c);
  });
  const missing = fallbackTreatments.filter((f) => !cms.some((c) => c.slug === f.slug));
  return [...merged, ...missing].sort((a, b) => a.order - b.order);
});

export async function getTreatment(slug: string) {
  return (await getTreatments()).find((t) => t.slug === slug) ?? null;
}

/* ---------- Posts ---------- */

export const getPosts = cache(async (): Promise<Post[]> => {
  const cms = await sanityFetch<Post[]>(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(date desc){ "slug": slug.current, title, excerpt, date, "image": image${IMG}, body, ${SEO} }`,
    {},
    ["post"],
  );
  return cms ?? [];
});

/* ---------- Pages ---------- */

export const getHome = cache(async (): Promise<HomeContent> => {
  const cms = await sanityFetch<Partial<HomeContent>>(
    `*[_id == "homePage"][0]{
      hero{ heading, text, videoUrl, "image": image${IMG}, ctas[]${CTA} },
      intro{ eyebrow, heading, cards[]${CARD} },
      about{ heading, text, cta${CTA}, "image": image${IMG} },
      services{ heading, text, slides[]{ title, text, href, "image": image${IMG} } },
      doctor{ eyebrow, heading, text, highlights, cta${CTA}, "image": image${IMG} },
      beforeAfter{ eyebrow, heading, "images": images[]${IMG} },
      testimonials{ eyebrow, heading },
      contact{ eyebrow, heading, lead, text, formNote },
      ctaBand{ heading, text, ctas[]${CTA}, "image": image${IMG} },
      ${SEO}
    }`,
    {},
    ["homePage"],
  );
  return merge(fallbackHome, cms);
});

export const getAbout = cache(async (): Promise<AboutContent> => {
  const cms = await sanityFetch<Partial<AboutContent>>(
    `*[_id == "aboutPage"][0]{
      hero{ eyebrow, heading, text, cta${CTA}, "image": image${IMG} },
      philosophy{ eyebrow, heading, text, "image": image${IMG} },
      specialties{ heading, items, stats[]{ value, decimals, suffix, label } },
      ${SEO}
    }`,
    {},
    ["aboutPage"],
  );
  return merge(fallbackAbout, cms);
});

export const getDoctor = cache(async (): Promise<DoctorContent> => {
  const cms = await sanityFetch<Partial<DoctorContent>>(
    `*[_id == "doctorPage"][0]{
      hero{ eyebrow, heading, text, cta${CTA}, "image": image${IMG} },
      story{ eyebrow, heading, text, "image": image${IMG} },
      highlights{ heading, items },
      philosophy{ eyebrow, quote },
      ${SEO}
    }`,
    {},
    ["doctorPage"],
  );
  return merge(fallbackDoctor, cms);
});

export const getInsurance = cache(async (): Promise<InsuranceContent> => {
  const cms = await sanityFetch<Partial<InsuranceContent>>(
    `*[_id == "insurancePage"][0]{
      ${PAGE_HERO},
      philosophy{ heading, text },
      payment{ heading, text, directHeading, directText, methods[]{ emoji, label, note }, dueNote, financingHeading, financingText, options[]${CARD} },
      cta{ heading, text, cta${CTA}, "image": image${IMG} },
      ${SEO}
    }`,
    {},
    ["insurancePage"],
  );
  return merge(fallbackInsurance, cms);
});

export const getAppointment = cache(async (): Promise<AppointmentContent> => {
  const cms = await sanityFetch<Partial<AppointmentContent>>(`*[_id == "appointmentPage"][0]{ heading, text, ghlFormId, formNote, contactHeading, contactText, ${SEO} }`, {}, [
    "appointmentPage",
  ]);
  return merge(fallbackAppointment, cms);
});

export const getPrivacy = cache(async (): Promise<LegalContent> => {
  const cms = await sanityFetch<Partial<LegalContent>>(`*[_id == "privacyPage"][0]{ heading, updated, body, ${SEO} }`, {}, ["privacyPage"]);
  return merge(fallbackPrivacy, cms);
});
