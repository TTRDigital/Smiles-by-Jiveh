import type { Metadata } from "next";
import Image from "next/image";
import { getAbout } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd, SeoSchema } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { ReadMore } from "@/components/ui/ReadMore";
import { richLength } from "@/lib/rich";
import { CheckColumns } from "@/components/sections/CheckColumns";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAbout();
  return pageMetadata(page.seo, "/who-we-are/", page.hero.image);
}

const fmt = (s: { value: number; decimals?: number; suffix?: string }) =>
  `${s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })}${s.suffix ?? ""}`;

export default async function WhoWeArePage() {
  const page = await getAbout();
  return (
    <div>
      <SeoSchema seo={page.seo} />
      <JsonLd data={breadcrumbSchema([{ name: "Who We Are", path: "/who-we-are/" }])} />
      <section className="container-x grid items-center gap-10 pb-16 pt-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:pb-24 md:pt-14 lg:gap-20">
        <div>
          <Pill>{page.hero.eyebrow}</Pill>
          <Display as="h1" text={page.hero.heading} className="mt-6 text-[38px] leading-[1.06] md:text-[56px] lg:text-[60px]" statementClassName="md:text-[52px]!" />
          <span aria-hidden="true" className="mt-8 block h-px w-20 bg-sand-deep/45" />
          <p className="mt-7 text-[15px] leading-[1.8] text-body md:text-[16.5px]">{page.hero.text}</p>
          {page.hero.cta ? (
            <div className="mt-9">
              <Button href={page.hero.cta.href} bold>
                {page.hero.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative aspect-[1440/1080] overflow-hidden rounded-[var(--radius-panel)]">
          <Image src={page.hero.image.src} alt={page.hero.image.alt || page.hero.heading} fill priority fetchPriority="high" sizes="(min-width: 1340px) 710px, (min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="container-x">
        <div className="grid gap-8 border-t border-line pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:pt-24 lg:gap-20">
          <div>
            <Pill>{page.philosophy.eyebrow}</Pill>
            <Display text={page.philosophy.heading} className="mt-6 text-[32px] leading-[1.12] md:text-[46px]" statementClassName="md:text-[32px]! lg:text-[42px]!" />
          </div>
          <ReadMore fold={richLength(page.philosophy.text) > 520} height={200} className="md:pt-12">
            <RichText value={page.philosophy.text} className="text-[15px] leading-[1.85] text-body md:text-[16.5px]" />
          </ReadMore>
        </div>
        <div data-reveal="up" className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] md:mt-16 md:aspect-[1296/560]">
          <Image src={page.philosophy.image.src} alt={page.philosophy.image.alt || page.philosophy.heading} fill sizes="(min-width: 1340px) 1296px, 100vw" className="object-cover object-[50%_40%]" />
        </div>
      </section>

      {/* Soft teal, not the dark band: the dark footer follows right after. */}
      <section className="mt-20 bg-mist py-20 md:mt-28 md:py-28">
        <div className="container-x">
          <Display text={page.specialties.heading} className="text-center text-[32px] leading-[1.12] md:text-[50px]" statementClassName="md:text-[46px]!" />
          <div className="mt-12 md:mt-14 [&_li]:border-ink/10 [&_ul]:border-ink/10">
            <CheckColumns items={page.specialties.items} />
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-5 lg:grid-cols-4">
            {page.specialties.stats.map((s) => (
              <li key={s.label} className="rounded-[var(--radius-card)] bg-white px-3 py-9 text-center shadow-[0_24px_50px_-40px_rgb(23_46_48/0.5)] md:py-12">
                <p className="font-display text-[36px] font-light leading-none text-teal sm:text-[44px] md:text-[52px]">{fmt(s)}</p>
                <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.16em] text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
