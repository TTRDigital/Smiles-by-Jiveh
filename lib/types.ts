import type { PortableTextBlock } from "@portabletext/react";
import type { IconName } from "@/lib/icons";

/* Shared content types. Built-in content (lib/data) and Sanity both use these. */

export type Img = { src: string; alt: string; width?: number; height?: number };
export type Cta = { label: string; href: string };
export type Seo = { title: string; description: string; image?: Img; noIndex?: boolean };

/** Rich text (Portable Text). Built-in content is written with rich() from lib/rich.ts. */
export type Rich = PortableTextBlock[];

export type Card = { icon?: IconName; title: string; text?: string; href?: string; linkLabel?: string };
export type Faq = { question: string; answer: string };
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

/* ---------- Site ---------- */

export type SiteSettings = {
  name: string;
  phone: string;
  phoneHref: string;
  email: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  hours: { label: string; value: string }[];
  /** Days and times for schema.org, e.g. "Mo-Th 09:00-17:00". */
  openingHours: string[];
  googleRating?: number;
  reviewCount?: number;
  googlePlaceId?: string;
  reviewsUrl?: string;
  writeReviewUrl?: string;
  mapsUrl?: string;
  social: { network: string; href: string }[];
  headerCta: Cta;
  nav: NavItem[];
  footerColumns: { title: string; links: NavLink[] }[];
  copyright: string;
  credit: Cta;
  /** Elfsight Google Reviews widget ID. Empty: the reviews from /cms are shown instead. */
  reviewsWidgetId?: string;
  logo: Img;
};

export type Testimonial = { name: string; quote: string; rating: number; date?: string; url?: string };

/* ---------- Sections shared by many pages ---------- */

export type SharedSections = {
  whyChooseUs: { eyebrow?: string; heading: string; text?: string; cards: Card[] };
  process: { eyebrow?: string; heading: string; text?: string; steps: { title: string; text: string }[]; ctas: Cta[] };
  testimonials: { eyebrow?: string; heading: string };
};

/* ---------- Page blocks (treatment pages and Insurance) ---------- */

export type DetailItem = { heading: string; body: Rich; image?: Img };

export type DetailsBlock = { _type: "detailsBlock"; _key?: string; eyebrow?: string; items: DetailItem[] };
export type CardsBlock = {
  _type: "cardsBlock";
  _key?: string;
  heading: string;
  text?: Rich;
  subheading?: string;
  cards: Card[];
  /** grid: icon on top, centered. list: small icon to the left of a short line. */
  layout?: "grid" | "list";
  columns?: 2 | 3 | 4;
};
export type SplitBlock = {
  _type: "splitBlock";
  _key?: string;
  heading: string;
  text?: Rich;
  items?: Card[];
  ctas?: Cta[];
  image: Img;
};
export type FaqBlock = { _type: "faqBlock"; _key?: string; eyebrow?: string; heading: string; items: Faq[] };
export type SharedBlock = { _type: "sharedBlock"; _key?: string; kind: "whyChooseUs" | "process" | "testimonials"; hideButtons?: boolean };
export type Block = DetailsBlock | CardsBlock | SplitBlock | FaqBlock | SharedBlock;

export type PageHeroContent = {
  eyebrow?: string;
  heading: string;
  text: Rich;
  cta?: Cta;
  /** One photo, or several shown as a slider. */
  images: Img[];
  /** Optional different slides for phones. */
  mobileImages?: Img[];
  /** Show several photos stacked instead of as a slider. */
  stacked?: boolean;
};

export type TreatmentCategory = "general" | "cosmetic" | "restorative";

export type Treatment = {
  slug: string;
  title: string;
  category: TreatmentCategory;
  order: number;
  hero: PageHeroContent;
  blocks: Block[];
  seo: Seo;
};

/* ---------- Page singletons ---------- */

export type HomeContent = {
  hero: { heading: string; text: string; videoUrl?: string; image: Img; ctas: Cta[] };
  intro: { eyebrow?: string; heading: string; cards: Card[] };
  about: { heading: string; text: Rich; cta?: Cta; image: Img };
  services: { heading: string; text?: string; slides: { title: string; text: string; href: string; image: Img }[] };
  doctor: { eyebrow?: string; heading: string; text: Rich; highlights: string[]; cta?: Cta; image: Img };
  beforeAfter: { eyebrow?: string; heading: string; images: Img[] };
  testimonials: { eyebrow?: string; heading: string };
  /** "Contact Us" section with the short contact form (between the reviews and the closing band). */
  contact: { eyebrow?: string; heading: string; lead?: string; text?: string; formNote?: string };
  ctaBand: { heading: string; text?: string; ctas: Cta[]; image?: Img };
  seo: Seo;
};

export type AboutContent = {
  hero: { eyebrow?: string; heading: string; text: string; cta?: Cta; image: Img };
  philosophy: { eyebrow?: string; heading: string; text: Rich; image: Img };
  specialties: { heading: string; items: string[]; stats: { value: number; decimals?: number; suffix?: string; label: string }[] };
  seo: Seo;
};

export type DoctorContent = {
  hero: { eyebrow?: string; heading: string; text: string; cta?: Cta; image: Img };
  story: { eyebrow?: string; heading: string; text: Rich; image: Img };
  highlights: { heading: string; items: string[] };
  philosophy: { eyebrow?: string; quote: string };
  seo: Seo;
};

export type InsuranceContent = {
  hero: PageHeroContent;
  philosophy: { heading: string; text: Rich };
  payment: {
    heading: string;
    text?: string;
    directHeading: string;
    directText?: string;
    methods: { emoji: string; label: string; note?: string }[];
    dueNote?: string;
    financingHeading: string;
    financingText?: string;
    options: Card[];
  };
  cta: { heading: string; text?: Rich; cta?: Cta; image: Img };
  seo: Seo;
};

export type AppointmentContent = {
  heading: string;
  text?: string;
  /** GoHighLevel form shown on the page (the old site's form). "off" shows the site's own form instead. */
  ghlFormId?: string;
  formNote?: string;
  contactHeading: string;
  contactText?: string;
  seo: Seo;
};

export type LegalContent = { heading: string; updated?: string; body: Rich; seo: Seo };

export type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  image?: Img;
  body: Rich;
  seo?: Seo;
};
