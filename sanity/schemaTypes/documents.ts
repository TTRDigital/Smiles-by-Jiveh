import { defineArrayMember, defineField, defineType } from "sanity";
import { blockTypes } from "./objects";

const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];
const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });
const section = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineField({ name, title, type: "object", group: "content", options: { collapsible: true, collapsed: false }, fields });
const s = (name: string, title?: string) => defineField({ name, title, type: "string" });
const t = (name: string, title?: string) => defineField({ name, title, type: "text", rows: 3 });
const rt = (name = "text", title = "Text") => defineField({ name, title, type: "richText" });
const img = (name = "image", title = "Photo") => defineField({ name, title, type: "altImage" });
const ctaF = (name = "cta", title = "Button") => defineField({ name, title, type: "cta" });
const ctas = (name = "ctas", title = "Buttons") => defineField({ name, title, type: "array", of: [defineArrayMember({ type: "cta" })] });
const cards = (name = "cards", title = "Cards") => defineField({ name, title, type: "array", of: [defineArrayMember({ type: "card" })] });
const strings = (name: string, title: string) => defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

/* ---------- Settings ---------- */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "practice", title: "Practice", default: true },
    { name: "menus", title: "Menus" },
    { name: "reviews", title: "Reviews" },
  ],
  fields: [
    defineField({ name: "name", title: "Practice name", type: "string", group: "practice" }),
    defineField({ name: "phone", type: "string", description: "As shown, e.g. (561) 798-9997. Call links follow it.", group: "practice" }),
    defineField({ name: "email", type: "string", group: "practice" }),
    defineField({ name: "street", type: "string", group: "practice" }),
    defineField({ name: "city", type: "string", group: "practice" }),
    defineField({ name: "region", title: "State", type: "string", group: "practice" }),
    defineField({ name: "postalCode", title: "ZIP code", type: "string", group: "practice" }),
    defineField({
      name: "hours",
      title: "Working hours (as shown)",
      type: "array",
      group: "practice",
      of: [
        defineArrayMember({
          name: "hoursRow",
          type: "object",
          fields: [s("label", "Days"), s("value", "Hours")],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours for Google (schema.org)",
      type: "array",
      group: "practice",
      of: [defineArrayMember({ type: "string" })],
      description: "e.g. Mo-Th 09:00-17:00. Leave out by-request hours.",
    }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url", group: "practice" }),
    defineField({
      name: "social",
      title: "Social profiles",
      type: "array",
      group: "practice",
      of: [
        defineArrayMember({
          name: "socialLink",
          type: "object",
          fields: [
            defineField({ name: "network", type: "string", options: { list: ["facebook", "instagram", "youtube", "tiktok", "linkedin", "google", "yelp"] } }),
            defineField({ name: "href", title: "Link", type: "url" }),
          ],
          preview: { select: { title: "network", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "logo", type: "altImage", group: "practice", description: "Leave empty to use the built-in logo." }),
    defineField({ name: "headerCta", title: "Header button", type: "cta", group: "menus" }),
    defineField({
      name: "nav",
      title: "Main menu",
      type: "array",
      group: "menus",
      of: [
        defineArrayMember({
          name: "navItem",
          type: "object",
          fields: [s("label", "Label"), s("href", "Link"), defineField({ name: "children", title: "Dropdown links", type: "array", of: [defineArrayMember({ type: "navLink" })] })],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer link columns",
      type: "array",
      group: "menus",
      of: [
        defineArrayMember({
          name: "footerColumn",
          type: "object",
          fields: [s("title", "Heading"), defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "navLink" })] })],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({ name: "copyright", type: "string", group: "menus", description: "{year} becomes the current year." }),
    defineField({ name: "credit", title: "Footer credit", type: "cta", group: "menus" }),
    defineField({ name: "googleRating", title: "Google rating", type: "number", group: "reviews" }),
    defineField({ name: "reviewCount", title: "Google review count", type: "number", group: "reviews" }),
    defineField({ name: "googlePlaceId", title: "Google place ID", type: "string", group: "reviews" }),
    defineField({ name: "reviewsUrl", title: "Google reviews link", type: "url", group: "reviews" }),
    defineField({ name: "writeReviewUrl", title: '"Review us on Google" link', type: "url", group: "reviews" }),
    defineField({
      name: "reviewsWidgetId",
      title: "Elfsight reviews widget ID",
      type: "string",
      group: "reviews",
      description: "The live Google reviews widget (auto-updating). Clear it to show the reviews entered under Reviews instead.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const sharedSections = defineType({
  name: "sharedSections",
  title: "Shared sections",
  type: "document",
  description: "Sections that appear on many treatment pages. Edit once here.",
  groups: [{ name: "content", title: "Content", default: true }],
  fields: [
    section("whyChooseUs", "Why Choose Smiles By Jiveh", [s("eyebrow", "Small label"), s("heading"), t("text"), cards()]),
    section("process", "Our Process", [
      s("eyebrow", "Small label"),
      s("heading"),
      t("text"),
      defineField({
        name: "steps",
        type: "array",
        of: [defineArrayMember({ name: "step", type: "object", fields: [s("title"), t("text")], preview: { select: { title: "title" } } })],
      }),
      ctas(),
    ]),
    section("testimonials", "Reviews section", [s("eyebrow", "Small label"), s("heading")]),
  ],
  preview: { prepare: () => ({ title: "Shared sections" }) },
});

/* ---------- Page singletons ---------- */

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups,
  fields: [
    section("hero", "Hero", [
      s("heading"),
      t("text", "Text under the heading"),
      defineField({ name: "videoUrl", title: "Background video (YouTube link)", type: "url", description: "Plays muted behind the hero. Leave empty to show the photo only." }),
      img("image", "Photo (shown before the video starts, and instead of it)"),
      ctas(),
    ]),
    section("intro", "Intro cards", [s("eyebrow", "Small label"), s("heading"), cards()]),
    section("about", "Functional and beautiful", [s("heading"), rt(), ctaF(), img()]),
    section("services", "Services slider", [
      s("heading"),
      t("text"),
      defineField({
        name: "slides",
        type: "array",
        of: [
          defineArrayMember({
            name: "serviceSlide",
            type: "object",
            fields: [s("title"), t("text"), s("href", "Link"), img()],
            preview: { select: { title: "title", media: "image" } },
          }),
        ],
      }),
    ]),
    section("doctor", "Meet Dr. Jiveh", [s("eyebrow", "Small label"), s("heading"), rt(), strings("highlights", "Highlights"), ctaF(), img()]),
    section("beforeAfter", "Before and after", [
      s("eyebrow", "Small label"),
      s("heading"),
      defineField({ name: "images", type: "array", of: [defineArrayMember({ type: "altImage" })] }),
    ]),
    section("testimonials", "Reviews heading", [s("eyebrow", "Small label"), s("heading")]),
    section("contact", "Contact Us (form)", [s("eyebrow", "Small label"), s("heading"), s("lead", "Bold line"), t("text"), s("ghlFormId", "GoHighLevel form ID (type off for the website's own short form)"), t("formNote", "Note under the form")]),
    section("ctaBand", "Call to action band", [s("heading"), t("text"), ctas(), img("image", "Background")]),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Who We Are",
  type: "document",
  groups,
  fields: [
    section("hero", "Header", [s("eyebrow", "Small label"), s("heading"), t("text"), ctaF(), img()]),
    section("philosophy", "Practice philosophy", [s("eyebrow", "Small label"), s("heading"), rt(), img()]),
    section("specialties", "What we specialize in", [
      s("heading"),
      strings("items", "Specialties"),
      defineField({
        name: "stats",
        title: "Counters",
        type: "array",
        description: "Real numbers only.",
        of: [
          defineArrayMember({
            name: "stat",
            type: "object",
            fields: [
              defineField({ name: "value", type: "number" }),
              defineField({ name: "decimals", type: "number", initialValue: 0 }),
              s("suffix", "After the number, e.g. +"),
              s("label"),
            ],
            preview: { select: { title: "value", subtitle: "label" } },
          }),
        ],
      }),
    ]),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Who We Are" }) },
});

export const doctorPage = defineType({
  name: "doctorPage",
  title: "Meet Dr. Jiveh",
  type: "document",
  groups,
  fields: [
    section("hero", "Header", [s("eyebrow", "Small label"), s("heading"), t("text"), ctaF(), img()]),
    section("story", "Personal story", [s("eyebrow", "Small label"), s("heading"), rt(), img()]),
    section("highlights", "Professional highlights", [s("heading"), strings("items", "Highlights")]),
    section("philosophy", "Philosophy quote", [s("eyebrow", "Small label"), t("quote")]),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Meet Dr. Jiveh" }) },
});

export const insurancePage = defineType({
  name: "insurancePage",
  title: "Insurance & Payment Options",
  type: "document",
  groups,
  fields: [
    defineField({ name: "hero", title: "Header", type: "pageHero", group: "content" }),
    section("philosophy", "Insurance philosophy", [s("heading"), rt()]),
    section("payment", "Payment & financing", [
      s("heading"),
      t("text"),
      s("directHeading", "Direct payment heading"),
      t("directText", "Direct payment text"),
      defineField({
        name: "methods",
        title: "Payment methods",
        type: "array",
        of: [defineArrayMember({ name: "method", type: "object", fields: [s("emoji"), s("label"), s("note")], preview: { select: { title: "label", subtitle: "emoji" } } })],
      }),
      t("dueNote", "Payment due note"),
      s("financingHeading", "Financing heading"),
      t("financingText", "Financing text"),
      cards("options", "Financing options"),
    ]),
    section("cta", "Closing section", [s("heading"), rt(), ctaF(), img()]),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Insurance & Payment Options" }) },
});

export const appointmentPage = defineType({
  name: "appointmentPage",
  title: "Book An Appointment",
  type: "document",
  groups,
  fields: [
    defineField({ name: "heading", type: "string", group: "content" }),
    defineField({ name: "text", type: "text", rows: 2, group: "content" }),
    defineField({
      name: "ghlFormId",
      title: "GoHighLevel form ID",
      type: "string",
      group: "content",
      description:
        "The GoHighLevel form shown on the page (Sites > Forms > Integrate: the ID in the embed code). Requests go straight into GoHighLevel. Type off to show the website's own form instead (sent through the GHL_WEBHOOK_URL webhook).",
    }),
    defineField({ name: "formNote", title: "Note under the form", type: "text", rows: 2, group: "content" }),
    defineField({ name: "contactHeading", type: "string", group: "content" }),
    defineField({ name: "contactText", type: "text", rows: 2, group: "content", description: "Phone, email, address and hours come from Site settings." }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Book An Appointment" }) },
});

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy Policy",
  type: "document",
  groups,
  fields: [
    defineField({ name: "heading", type: "string", group: "content" }),
    defineField({ name: "updated", title: "Effective date (as shown)", type: "string", group: "content" }),
    defineField({ name: "body", type: "richText", group: "content" }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Privacy Policy" }) },
});

/* ---------- Collections ---------- */

export const treatment = defineType({
  name: "treatment",
  title: "Treatment",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Name", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "content",
      options: { source: "title" },
      description: "The page address, e.g. dental-implants for /dental-implants/. Changing it changes the URL.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Cosmetic", value: "cosmetic" },
          { title: "Restorative", value: "restorative" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number", group: "content" }),
    defineField({ name: "hero", title: "Header", type: "pageHero", group: "content" }),
    defineField({
      name: "blocks",
      title: "Sections",
      type: "array",
      group: "content",
      of: blockTypes.map((type) => defineArrayMember({ type })),
      description: "The page sections in order. FAQs are added as an FAQ section.",
    }),
    seoField,
  ],
  orderings: [{ title: "Menu order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "hero.images.0" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", title: "Review", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "url", title: "Link to the review", type: "url" }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "name", subtitle: "quote" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  description: "A question kept in the library. Treatment pages show the FAQ section stored on the page itself.",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "treatment", type: "reference", to: [{ type: "treatment" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "treatment.title" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "content",
      options: { source: "title" },
      description: "Published at /blog/<url>/.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", type: "date", group: "content" }),
    defineField({ name: "author", type: "string", group: "content", initialValue: "Dr. Farokh Jiveh", description: "Shown in the byline under the title and in the author box at the end." }),
    defineField({ name: "category", type: "string", group: "content", description: "Shown above the title, e.g. Dental Implants or Cosmetic Dentistry." }),
    defineField({
      name: "service",
      title: "Related treatment page",
      type: "string",
      group: "content",
      description: "The page this post supports, e.g. /dental-veneers/. Shown as a Related treatment box under the article.",
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, group: "content" }),
    defineField({ name: "image", type: "altImage", group: "content" }),
    defineField({ name: "body", type: "richText", group: "content" }),
    seoField,
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});

export const singletonTypes = new Set(["siteSettings", "sharedSections", "homePage", "aboutPage", "doctorPage", "insurancePage", "appointmentPage", "privacyPage"]);

export const documentTypes = [siteSettings, sharedSections, homePage, aboutPage, doctorPage, insurancePage, appointmentPage, privacyPage, treatment, testimonial, faq, post];
