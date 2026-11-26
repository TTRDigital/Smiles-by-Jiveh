import type { Metadata } from "next";
import Image from "next/image";
import { getDoctor, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, doctorSchema } from "@/lib/schema";
import { JsonLd, SeoSchema } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { ReadMore } from "@/components/ui/ReadMore";
import { richLength } from "@/lib/rich";
import { CheckColumns } from "@/components/sections/CheckColumns";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDoctor();
  return pageMetadata(page.seo, "/meet-dr-jiveh/", page.hero.image);
}

export default async function MeetDrJivehPage() {
  const [page, settings] = await Promise.all([getDoctor(), getSiteSettings()]);
  return (
    <div>
      <SeoSchema seo={page.seo} fallback={doctorSchema(settings)} />
      <JsonLd data={breadcrumbSchema([{ name: "Meet Dr. Jiveh", path: "/meet-dr-jiveh/" }])} />
      <section className="container-x grid items-center gap-10 pb-16 pt-8 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 md:pb-24 md:pt-14 lg:gap-24">
        <div>
          <Pill>{page.hero.eyebrow}</Pill>
          <Display as="h1" text={page.hero.heading} className="mt-6 text-[38px] leading-[1.06] md:text-[56px] lg:text-[60px]" statementClassName="md:text-[52px]" />
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
        <div className="flex justify-center md:justify-end">
          <div className="relative aspect-[1121/1403] w-full max-w-[480px] overflow-hidden rounded-[var(--radius-panel)] bg-cream">
            <Image src={page.hero.image.src} alt={page.hero.image.alt || page.hero.heading} fill priority fetchPriority="high" sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="grid gap-12 border-t border-line pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:pt-24 lg:gap-24">
          <div data-reveal="left" className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] md:aspect-[520/650] md:self-start">
            <Image src={page.story.image.src} alt={page.story.image.alt || page.story.heading} fill sizes="(min-width: 1340px) 560px, (min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Pill>{page.story.eyebrow}</Pill>
            <Display text={page.story.heading} className="mt-6 text-[32px] leading-[1.12] md:text-[46px]" />
            <ReadMore fold={richLength(page.story.text) > 520} height={240} className="mt-8">
              <RichText value={page.story.text} className="text-[15px] leading-[1.85] text-body md:text-[16.5px]" />
            </ReadMore>
          </div>
        </div>
      </section>

      <section className="container-x pt-20 md:pt-28">
        <div className="rounded-[var(--radius-panel)] bg-cream px-5 py-14 md:px-14 md:py-20">
          <Display text={page.highlights.heading} className="text-center text-[32px] leading-[1.12] md:text-[46px]" statementClassName="md:text-[42px]" />
          <div className="mt-10 md:mt-12">
            <CheckColumns items={page.highlights.items} />
          </div>
        </div>
      </section>

      <section className="container-x py-20 text-center md:py-28">
        <Pill centered>{page.philosophy.eyebrow}</Pill>
        <blockquote className="mx-auto mt-8 max-w-[1040px] font-display text-[26px] font-light italic leading-[1.4] text-ink md:text-[38px] md:leading-[1.35]">{page.philosophy.quote}</blockquote>
      </section>
    </div>
  );
}
