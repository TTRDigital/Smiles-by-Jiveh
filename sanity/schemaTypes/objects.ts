import { defineArrayMember, defineField, defineType } from "sanity";
import { iconOptions } from "../../lib/icons";

/** SEO fields on every page. Lengths are warnings, not hard errors. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description: "Shown in Google and the browser tab.",
      validation: (r) => r.max(70).warning("Over 70 characters may be cut off in Google."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Aim for under 160 characters.",
      validation: (r) => r.max(170).warning("Over 160 characters may be cut off in Google."),
    }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", description: "1200 x 630. Leave empty to use the page's main photo." }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});

/** Image that always has alt text. */
export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: 'Describe the photo for people who cannot see it, e.g. "Dr. Jiveh reviewing a smile design with a patient".',
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { asset?: unknown } | undefined;
          return parent?.asset && !alt ? "Alt text is required for accessibility." : true;
        }),
    }),
  ],
});

export const icon = defineType({ name: "icon", title: "Icon", type: "string", options: { list: [...iconOptions] } });

export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "A page on this site like /appointment/, a full URL, or tel:5617989997.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Rich text: paragraphs, bold/italic, links, bullet and numbered lists, small headings. */
export const richText = defineType({
  name: "richText",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Small heading", value: "h4" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbers", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [defineField({ name: "href", type: "string", title: "Link", description: "/page/, https://..., tel: or mailto:" })],
          }),
        ],
      },
    }),
  ],
});

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "icon", type: "icon" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
    defineField({ name: "href", title: "Link (optional)", type: "string" }),
    defineField({ name: "linkLabel", title: "Link text (optional)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

/** Hero of treatment pages and Insurance: photo or slider on the left, text card on the right. */
export const pageHero = defineType({
  name: "pageHero",
  title: "Page header",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    defineField({ name: "heading", title: "Heading (H1)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Intro", type: "richText" }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
    defineField({ name: "images", title: "Photo(s)", type: "array", of: [defineArrayMember({ type: "altImage" })], description: "One photo, or several to show a slider." }),
    defineField({
      name: "mobileImages",
      title: "Phone slider (optional)",
      type: "array",
      of: [defineArrayMember({ type: "altImage" })],
      description: "Different slides for phones, e.g. vertical before/after photos.",
    }),
    defineField({ name: "stacked", title: "Stack the photos instead of a slider", type: "boolean", initialValue: false }),
  ],
});

/* ---------- Page blocks ---------- */

export const detailsBlock = defineType({
  name: "detailsBlock",
  title: "Details with table of contents",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string", initialValue: "Details" }),
    defineField({
      name: "items",
      title: "Topics",
      type: "array",
      of: [
        defineArrayMember({
          name: "detailItem",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Text", type: "richText" }),
            defineField({ name: "image", title: "Photo (optional)", type: "altImage", description: "Shows the photo beside the text." }),
          ],
          preview: { select: { title: "heading", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "items.0.heading" }, prepare: ({ title }) => ({ title: "Details", subtitle: title }) },
});

export const cardsBlock = defineType({
  name: "cardsBlock",
  title: "Heading, text and cards",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "richText" }),
    defineField({ name: "subheading", type: "string" }),
    defineField({ name: "cards", type: "array", of: [defineArrayMember({ type: "card" })] }),
    defineField({
      name: "layout",
      type: "string",
      options: {
        list: [
          { title: "Grid (icon on top)", value: "grid" },
          { title: "List (small icon left)", value: "list" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({ name: "columns", type: "number", options: { list: [2, 3, 4] }, initialValue: 3 }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title, subtitle: "Cards" }) },
});

export const splitBlock = defineType({
  name: "splitBlock",
  title: "Text and photo",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "richText" }),
    defineField({ name: "items", title: "Check list (optional)", type: "array", of: [defineArrayMember({ type: "card" })] }),
    defineField({ name: "ctas", title: "Buttons", type: "array", of: [defineArrayMember({ type: "cta" })], validation: (r) => r.max(2) }),
    defineField({ name: "image", type: "altImage" }),
  ],
  preview: { select: { title: "heading", media: "image" }, prepare: ({ title, media }) => ({ title, subtitle: "Text and photo", media }) },
});

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string", initialValue: "Common Questions" }),
    defineField({ name: "heading", type: "string", initialValue: "Frequently Asked Questions" }),
    defineField({ name: "items", title: "Questions", type: "array", of: [defineArrayMember({ type: "faqItem" })] }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title, subtitle: "FAQ" }) },
});

export const sharedBlock = defineType({
  name: "sharedBlock",
  title: "Shared section",
  type: "object",
  description: "Edited once in Settings > Shared sections.",
  fields: [
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Why Choose Smiles By Jiveh", value: "whyChooseUs" },
          { title: "Our Process", value: "process" },
          { title: "Google reviews", value: "testimonials" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "hideButtons", title: "Hide the buttons", type: "boolean", hidden: ({ parent }) => (parent as { kind?: string } | undefined)?.kind !== "process" }),
  ],
  preview: {
    select: { title: "kind" },
    prepare: ({ title }) => ({
      title: { whyChooseUs: "Why Choose Smiles By Jiveh", process: "Our Process", testimonials: "Google reviews" }[title as string] ?? title,
      subtitle: "Shared section",
    }),
  },
});

export const blockTypes = ["detailsBlock", "cardsBlock", "splitBlock", "faqBlock", "sharedBlock"];

export const objectTypes = [seo, altImage, icon, cta, navLink, richText, card, faqItem, pageHero, detailsBlock, cardsBlock, splitBlock, faqBlock, sharedBlock];
