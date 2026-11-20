import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { rich } from "@/lib/rich";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { smileMakeoverWellingtonDraft as draft } from "@/lib/data/drafts/smile-makeover-wellington-fl";

/*
 * TTR-2163: PREVIEW ONLY of the stuck SEO piece "Smile Makeover in Wellington, FL" so Kia can read it in the site's design.
 * The wording is the piece's draft text as it is now (lib/data/drafts/smile-makeover-wellington-fl.ts), untouched.
 * noindex, not in the sitemap, not linked from the menu, and this branch is never merged.
 */

const path = `/${draft.slug}/`;
const heading = draft.title.split(" | ")[0];

export function generateMetadata(): Metadata {
  return pageMetadata({ title: draft.title, description: draft.metaDescription, noIndex: true }, path);
}

type Part = { kind: "h2" | "h3"; text: string } | { kind: "text"; lines: string[] };

/** Splits the draft's markdown into headings and runs of paragraph and list lines, keeping every word as written. */
function parts(body: string): Part[] {
  const out: Part[] = [];
  for (const line of body.split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("### ")) out.push({ kind: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) out.push({ kind: "h2", text: line.slice(3) });
    else {
      const last = out[out.length - 1];
      if (last?.kind === "text") last.lines.push(line);
      else out.push({ kind: "text", lines: [line] });
    }
  }
  return out;
}

/** FAQ schema from the "Frequently asked questions" section: each ### question with the text under it. */
function faqs(all: Part[]) {
  const start = all.findIndex((p) => p.kind === "h2" && /frequently asked questions/i.test(p.text));
  if (start < 0) return [];
  const items: { question: string; answer: string }[] = [];
  for (let i = start + 1; i < all.length; i++) {
    const p = all[i];
    if (p.kind === "h2") break;
    const next = all[i + 1];
    if (p.kind === "h3" && next?.kind === "text") {
      const answer = next.lines.join(" ").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
      items.push({ question: p.text, answer });
    }
  }
  return items;
}

export default function SmileMakeoverWellingtonPreview() {
  const all = parts(draft.body);
  const faq = faqs(all);
  return (
    <article className="container-x py-[25px]">
      <JsonLd data={breadcrumbSchema([{ name: "Smile Makeovers", path: "/smile-makeovers/" }, { name: heading, path }])} />
      {faq.length ? <JsonLd data={faqSchema(faq)} /> : null}
      <div className="card mx-auto max-w-[900px] px-5 py-10 md:px-[60px] md:py-[50px]">
        <Pill>Wellington, Florida</Pill>
        <h1 className="mt-5 text-[32px] leading-[1.2] md:text-[45px]">{heading}</h1>
        <div className="mt-8 md:text-lg">
          {all.map((p, i) =>
            p.kind === "h2" ? (
              <h2 key={i} className="mt-10 text-[26px] leading-[1.25] md:text-[32px]">
                {p.text}
              </h2>
            ) : p.kind === "h3" ? (
              <h3 key={i} className="mt-7 text-[20px] leading-[1.3] md:text-[22px]">
                {p.text}
              </h3>
            ) : p.kind === "text" ? (
              <RichText key={i} value={rich(...p.lines)} className="mt-4" />
            ) : null,
          )}
        </div>
      </div>
    </article>
  );
}
