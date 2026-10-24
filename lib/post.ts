import type { PortableTextBlock } from "@portabletext/react";
import type { Faq, Rich, Treatment } from "@/lib/types";
import { plain } from "@/lib/rich";
import { slugify } from "@/lib/text";

/*
 * Reads a post's body (Portable Text) for the blog layout: the first
 * paragraph (the direct answer, shown in the In short box), the H2 sections
 * with anchor ids for the jump links, the FAQ written under
 * "## Frequently asked questions" (a bold question, then its answer), the
 * word count and the reading time. Nothing here changes the text; it only
 * decides how the page shows it, so a post from /cms without these parts
 * still renders as plain sections.
 */

type Span = { _type?: string; _key?: string; text?: string; marks?: string[] };
type MarkDef = { _key: string; _type: string; href?: string };
type Block = PortableTextBlock & { style?: string; listItem?: string; children?: Span[]; markDefs?: MarkDef[] };

export const WORDS_PER_MINUTE = 220;

export function wordCount(body: Rich | undefined): number {
  const text = plain(body);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/** Reading time in whole minutes, at least 1. */
export const readingMinutes = (words: number) => Math.max(1, Math.round(words / WORDS_PER_MINUTE));

export type PostFaq = Faq & { answerRich: Rich };
export type PostSection = {
  /** Anchor id on the H2, from its text. */
  id: string;
  heading: string;
  /** The text under the heading (for a FAQ section: anything before the first question). */
  blocks: Rich;
  /** Questions and answers, when the section is the FAQ. */
  faq?: PostFaq[];
};
export type PostOutline = {
  /** The first paragraph: the direct answer. */
  lead: Rich;
  /** Anything else before the first H2. */
  intro: Rich;
  sections: PostSection[];
};

const isBlock = (b: unknown): b is Block => !!b && typeof b === "object" && (b as Block)._type === "block";
const isFaqHeading = (heading: string) => /frequently asked|^faqs?\b|common questions|questions and answers/i.test(heading);

/** Splits the body into the lead paragraph, the intro and the H2 sections, and reads the FAQ section into questions and answers. */
export function outline(body: Rich | undefined): PostOutline {
  const sections: PostSection[] = [];
  const intro: Block[] = [];
  const used = new Map<string, number>();
  let current: PostSection | null = null;
  for (const raw of body ?? []) {
    const b = raw as Block;
    if (isBlock(b) && b.style === "h2") {
      const heading = plain([b]);
      const base = slugify(heading) || "section";
      const n = (used.get(base) ?? 0) + 1;
      used.set(base, n);
      current = { id: n > 1 ? `${base}-${n}` : base, heading, blocks: [] };
      sections.push(current);
    } else if (current) (current.blocks as Block[]).push(b);
    else intro.push(b);
  }
  for (const s of sections) {
    if (!isFaqHeading(s.heading)) continue;
    const parsed = readFaq(s.blocks as Block[]);
    if (parsed.items.length) {
      s.blocks = parsed.rest;
      s.faq = parsed.items;
    }
  }
  const [first, ...more] = intro;
  const lead = isBlock(first) && first.style === "normal" && !first.listItem ? [first] : [];
  return { lead, intro: lead.length ? more : intro, sections };
}

/**
 * A question is a bold line ending in "?" (its answer follows in the same
 * paragraph after a line break, or in the next paragraphs) or an H3.
 */
function readFaq(blocks: Block[]): { items: PostFaq[]; rest: Rich } {
  const items: PostFaq[] = [];
  const rest: Block[] = [];
  let current: PostFaq | null = null;
  for (const b of blocks) {
    if (!isBlock(b)) {
      if (current) current.answerRich.push(b);
      else rest.push(b);
      continue;
    }
    const kids = b.children ?? [];
    const first = kids[0];
    const boldQuestion = b.style === "normal" && !b.listItem && !!first?.marks?.includes("strong") && /\?\s*$/.test(first.text ?? "");
    if (b.style === "h3" || boldQuestion) {
      const question = (b.style === "h3" ? plain([b]) : (first?.text ?? "")).trim();
      current = { question, answer: "", answerRich: [] };
      items.push(current);
      if (boldQuestion && kids.length > 1) {
        const [head, ...tail] = kids;
        const answerKids = tail.map((k, i) => (i === 0 ? { ...k, text: (k.text ?? "").replace(/^\s+/, "") } : k)).filter((k) => (k.text ?? "").length);
        if (answerKids.length) current.answerRich.push({ ...b, _key: `${b._key ?? head?._key ?? "q"}-a`, children: answerKids } as PortableTextBlock);
      }
      continue;
    }
    if (current) current.answerRich.push(b);
    else rest.push(b);
  }
  for (const it of items) it.answer = plain(it.answerRich);
  return { items: items.filter((it) => it.question && it.answer), rest };
}

/** All questions and answers of a post, for the FAQPage structured data. */
export const faqItems = (o: PostOutline): Faq[] => o.sections.flatMap((s) => s.faq ?? []).map(({ question, answer }) => ({ question, answer }));

/** The treatment pages the body links to, in order, without the post's own related page. */
export function linkedTreatments(body: Rich | undefined, treatments: Treatment[], exclude?: string, max = 3): Treatment[] {
  const bySlug = new Map(treatments.map((t) => [t.slug, t]));
  const out: Treatment[] = [];
  for (const raw of body ?? []) {
    const b = raw as Block;
    for (const def of b.markDefs ?? []) {
      if (def._type !== "link" || !def.href) continue;
      const slug = def.href.replace(/^https?:\/\/[^/]+/, "").replace(/^\/|\/$/g, "");
      const t = bySlug.get(slug);
      if (!t || `/${slug}/` === exclude || out.includes(t)) continue;
      out.push(t);
      if (out.length >= max) return out;
    }
  }
  return out;
}

/** The first sentence of a text, for one-line summaries. */
export function firstSentence(text: string): string {
  const m = text.trim().match(/^.*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}
