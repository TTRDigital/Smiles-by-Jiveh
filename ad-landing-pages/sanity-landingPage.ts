/**
 * Sanity document type for the ad landing pages, in the client's own project 3wz2011s.
 * Add to sanity/schemaTypes in the main repo AFTER the TTR-1341 work merges (that session owns that folder):
 *   import { landingPage } from "../../ad-landing-pages/sanity-landingPage"; documentTypes.push(landingPage)
 * Field names match content/<slug>.json exactly. Empty fields fall back to the static content.
 */
import { defineArrayMember, defineField, defineType } from "sanity";

const str = (name: string, title: string, rows?: number) =>
  defineField({ name, title, type: rows ? "text" : "string", rows });
const list = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

export const landingPage = defineType({
  name: "landingPage",
  title: "Ad landing page",
  type: "document",
  groups: [{ name: "seo", title: "SEO & phone" }, { name: "body", title: "Content", default: true }],
  fields: [
    defineField({ name: "slug", title: "Page (offer or implant)", type: "slug", group: "seo", options: { list: ["offer", "implant"] }, validation: (r) => r.required() }),
    { ...str("title", "Browser title"), group: "seo" },
    { ...str("description", "Description", 3), group: "seo" },
    { ...str("topBar", "Top bar"), group: "seo" },
    { ...str("phone", "Phone shown"), group: "seo" },
    { ...str("phoneHref", "Phone for tel: link (+1...)"), group: "seo" },
    { ...str("ctaLabel", "Button label"), group: "body" },
    { ...str("headerCta", "Header button"), group: "body" },
    defineField({ name: "hero", type: "object", group: "body", fields: [str("heading", "Heading"), str("pill", "Pill text"), str("pillBadge", "Pill badge"), str("cta", "Button")] }),
    { ...list("trust", "Trust bar (4 items)"), group: "body" },
    defineField({
      name: "offer", type: "object", group: "body",
      fields: [str("heading", "Heading"), str("intro", "Intro", 6), str("priceRegular", "Regular price line"), str("priceToday", "Price / offer line"), str("priceSave", "Savings / note line"), str("listHeading", "List heading"), list("list", "Included"), str("optionalHeading", "Optional heading"), list("optional", "Optional items"), str("closing", "Closing line", 3), str("note", "Please note", 5)],
    }),
    defineField({ name: "dentist", type: "object", group: "body", fields: [str("eyebrow", "Eyebrow"), str("name", "Name"), str("subheading", "Subheading"), str("tagline", "Tagline"), list("body", "Paragraphs"), str("quote", "Quote", 5), str("quoteBy", "Quote by"), list("credentials", "Credentials")] }),
    defineField({ name: "gallery", type: "object", group: "body", fields: [str("heading", "Heading"), str("text", "Text", 3)] }),
    defineField({ name: "banner", type: "object", group: "body", fields: [str("heading", "Heading"), str("text", "Text"), str("cta", "Button")] }),
    defineField({ name: "office", type: "object", group: "body", fields: [str("heading", "Heading"), str("text", "Text", 3), list("address", "Address lines")] }),
    defineField({ name: "footer", type: "object", group: "body", fields: [str("tagline", "Tagline"), str("copyright", "Copyright")] }),
    defineField({ name: "form", type: "object", group: "body", fields: [str("heading", "Heading"), str("consent", "Consent text", 3), str("submit", "Submit button"), str("messagePlaceholder", "Message placeholder")] }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
