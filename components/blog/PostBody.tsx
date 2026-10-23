import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { ChevronDown, Phone } from "lucide-react";
import type { PostFaq, PostOutline, PostSection } from "@/lib/post";
import { slugify } from "@/lib/text";
import type { Post, PostFigure as PostFigureData, Rich, SiteSettings } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";

/*
 * The reading parts of a post, in order: the In short box (the first
 * paragraph), the jump links, the step timeline or quick facts, then each
 * H2 section with its photo, the booking band after the third section and
 * the FAQ as details/summary cards. The text is the approved body as it is;
 * only the presentation is added.
 */

/** In short: the post's first paragraph, the direct answer, first in the DOM. */
export function InShort({ lead }: { lead: Rich }) {
  if (!lead.length) return null;
  return (
    <div className="post-lead">
      <p className="eyebrow">In short</p>
      <RichText value={lead} className="mt-2 text-[17px] leading-[1.7] md:text-[19px] md:leading-[1.65]" />
    </div>
  );
}

/** Jump links to every H2. Desktop: a sticky column beside the body. Phones: a closed list under the In short box (details/summary, no JavaScript). */
export function Toc({ sections, mobile = false }: { sections: PostSection[]; mobile?: boolean }) {
  if (sections.length < 2) return null;
  const list = (
    <ol className="post-toc-list">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`}>{s.heading}</a>
        </li>
      ))}
    </ol>
  );
  if (mobile) {
    return (
      <nav aria-label="In this article" className="post-toc mt-6 lg:hidden">
        <details className="rounded-2xl bg-page px-5 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
            In this article
            <ChevronDown className="h-5 w-5 shrink-0 text-teal-deep transition-transform duration-300" strokeWidth={2} aria-hidden="true" />
          </summary>
          <div className="pb-3">{list}</div>
        </details>
      </nav>
    );
  }
  return (
    <nav aria-label="In this article" className="post-toc">
      <p className="eyebrow">In this article</p>
      <div className="mt-3">{list}</div>
    </nav>
  );
}

/** Numbered step timeline (what to expect posts), from the post's `steps`. */
export function Steps({ steps }: { steps?: Post["steps"] }) {
  if (!steps?.items?.length) return null;
  const heading = steps.heading || "At a glance";
  return (
    <aside aria-label={heading} className="post-steps mt-8" data-reveal="up">
      <p className="eyebrow">Step by step</p>
      <p className="mt-1 font-display text-xl font-bold leading-[1.3] md:text-2xl">{heading}</p>
      <ol className="mt-5">
        {steps.items.map((s, i) => (
          <li key={s.title}>
            <span className="num" aria-hidden="true">
              {i + 1}
            </span>
            <div className="pt-1.5">
              <p className="font-display text-[17px] font-bold leading-[1.35]">{s.title}</p>
              {s.text ? <p className="mt-1 text-[15px] leading-[1.65] text-muted">{s.text}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/** Quick facts card, from the post's `facts`. */
export function Facts({ facts }: { facts?: Post["facts"] }) {
  if (!facts?.items?.length) return null;
  const heading = facts.heading || "Quick facts";
  return (
    <aside aria-label={heading} className="post-facts mt-8" data-reveal="up">
      <p className="eyebrow">{heading}</p>
      <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {facts.items.map((f) => (
          <div key={f.label} className="border-t border-sand/70 pt-3">
            <dt className="text-[13px] text-muted">{f.label}</dt>
            <dd className="mt-0.5 font-semibold leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/** A photo before a section heading, with its caption. Portraits sit beside their caption so they never tower over the text. */
function PostFigure({ figure }: { figure: PostFigureData }) {
  const { image, caption } = figure;
  const known = !!image.width && !!image.height;
  const portrait = known && image.height! > image.width!;
  return (
    <figure className={`post-figure ${portrait ? "post-figure-portrait" : ""}`} data-reveal="up">
      <div className="relative overflow-hidden rounded-[16px] bg-mint" style={{ aspectRatio: known ? `${image.width} / ${image.height}` : "16 / 10" }}>
        <Image src={image.src} alt={image.alt} fill sizes={portrait ? "(min-width: 640px) 400px, 100vw" : "(min-width: 1024px) 720px, 100vw"} className="object-cover" />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Dark teal band in the middle of the article: one sentence, the booking button and the phone number. */
export function CtaBand({ text, settings, className = "" }: { text: string; settings: SiteSettings; className?: string }) {
  return (
    <aside aria-label="Book a consultation" className={`post-band ${className}`} data-reveal="up">
      <p className="font-display text-[22px] font-bold leading-[1.35] text-white md:text-[26px]">{text}</p>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button href="/appointment/" variant="white" className="lift">
          Book a consultation
        </Button>
        <PhoneLink settings={settings} />
      </div>
    </aside>
  );
}

export function PhoneLink({ settings, className = "" }: { settings: SiteSettings; className?: string }) {
  return (
    <a href={settings.phoneHref} data-track="click_to_call" className={`inline-flex items-center gap-2.5 font-semibold underline-offset-4 hover:underline ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
        <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </span>
      {settings.phone}
    </a>
  );
}

/** The FAQ as details/summary cards: the question in the heading font, the answer below, all of it in the page for search engines. */
export function FaqCards({ items }: { items: PostFaq[] }) {
  return (
    <div className="post-faq mt-6 grid gap-3">
      {items.map((f, i) => (
        <details key={f.question} open={i === 0} data-reveal="up" style={{ "--reveal-delay": `${Math.min(i, 4) * 60}ms` } as CSSProperties}>
          <summary>
            <h3>{f.question}</h3>
            <ChevronDown className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </summary>
          <div className="post-faq-answer">
            <RichText value={f.answerRich} className="text-[15px] leading-[1.7] md:text-base" />
          </div>
        </details>
      ))}
    </div>
  );
}

/** Every H2 section in order, with its photo before the heading, the booking band after the third section, and the FAQ cards. */
export function PostSections({ post, outline, settings }: { post: Post; outline: PostOutline; settings: SiteSettings }) {
  const figures = post.figures ?? [];
  const figureFor = (s: PostSection) => figures.find((f) => slugify(f.before) === s.id || f.before.trim().toLowerCase() === s.heading.trim().toLowerCase());
  // After the third section, when the article is long enough and the FAQ is not next.
  const bandAfter = outline.sections.length >= 5 ? 2 : -1;
  const bandText = post.ctaText || `Have a question about ${post.category ? post.category.toLowerCase() : "your smile"}? Dr. Jiveh is glad to talk it through with you at a complimentary consultation.`;
  return (
    <>
      {outline.intro.length ? <RichText value={outline.intro} className="post-body mt-8" /> : null}
      {outline.sections.map((s, i) => {
        const figure = figureFor(s);
        return (
          <Fragment key={s.id}>
            <section className="post-section" aria-labelledby={s.id}>
              {figure ? <PostFigure figure={figure} /> : null}
              <h2 id={s.id} className="post-h2">
                {s.heading}
              </h2>
              {s.blocks.length ? <RichText value={s.blocks} className="post-body" /> : null}
              {s.faq?.length ? <FaqCards items={s.faq} /> : null}
            </section>
            {i === bandAfter && !outline.sections[i + 1]?.faq ? <CtaBand text={bandText} settings={settings} className="mt-12" /> : null}
          </Fragment>
        );
      })}
    </>
  );
}
