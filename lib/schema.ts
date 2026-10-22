import type { Faq, Post, SiteSettings, Treatment } from "@/lib/types";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { images } from "@/lib/data/images";
import { postAuthor } from "@/lib/data/posts";

const BUSINESS_ID = `${siteUrl}/#dentist`;
const DOCTOR_ID = `${siteUrl}/meet-dr-jiveh/#dr-jiveh`;

/** Dentist (a LocalBusiness) for the whole site, from the practice's own address, phone and hours. */
export function businessSchema(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: s.name,
    url: `${siteUrl}/`,
    telephone: s.phone,
    email: s.email,
    logo: absoluteUrl(s.logo.src.startsWith("http") ? "/images/brand/logo.png" : s.logo.src),
    image: absoluteUrl(images.heroVideoPoster.src),
    address: { "@type": "PostalAddress", streetAddress: s.street, addressLocality: s.city, addressRegion: s.region, postalCode: s.postalCode, addressCountry: "US" },
    openingHours: s.openingHours,
    ...(s.mapsUrl ? { hasMap: s.mapsUrl } : {}),
    areaServed: ["Royal Palm Beach", "Wellington", "Palm Beach County"].map((name) => ({ "@type": "City", name })),
    founder: { "@id": DOCTOR_ID },
    knowsLanguage: ["en", "es"],
    sameAs: [s.mapsUrl, ...s.social.map((x) => x.href)].filter(Boolean),
  };
}

export function doctorSchema(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": DOCTOR_ID,
    name: "Dr. Farokh Jiveh",
    jobTitle: "Dentist",
    url: absoluteUrl("/meet-dr-jiveh/"),
    image: absoluteUrl(images.drJiveh.src),
    worksFor: { "@id": BUSINESS_ID },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Medical College of Virginia School of Dentistry" },
      { "@type": "CollegeOrUniversity", name: "University of California, San Francisco (UCSF)" },
    ],
    telephone: s.phone,
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function treatmentSchema(t: Treatment, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: t.seo.title,
    description: t.seo.description,
    url: absoluteUrl(path),
    about: { "@type": "MedicalProcedure", name: t.title },
    publisher: { "@id": BUSINESS_ID },
  };
}

/** A blog post: written by Dr. Jiveh (the Person on /meet-dr-jiveh/) unless another author is named, published by the practice. */
export function postSchema(p: Post, path: string) {
  const author = p.author || postAuthor.name;
  const byDoctor = author === postAuthor.name;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    ...(p.excerpt ? { description: p.excerpt } : {}),
    url: absoluteUrl(path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    ...(p.date ? { datePublished: p.date, dateModified: p.date } : {}),
    ...(p.image ? { image: p.image.src.startsWith("http") ? p.image.src : absoluteUrl(p.image.src) } : {}),
    ...(p.category ? { articleSection: p.category } : {}),
    inLanguage: "en-US",
    author: byDoctor
      ? { "@type": "Person", "@id": DOCTOR_ID, name: author, jobTitle: postAuthor.jobTitle, url: absoluteUrl(postAuthor.path) }
      : { "@type": "Person", name: author },
    publisher: { "@id": BUSINESS_ID },
  };
}
