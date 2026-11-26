import type { Metadata } from "next";
import { getInsurance } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { rich } from "@/lib/rich";
import { JsonLd, SeoSchema } from "@/components/ui/JsonLd";
import { Display } from "@/components/ui/Display";
import { RichText } from "@/components/ui/RichText";
import { ReadMore } from "@/components/ui/ReadMore";
import { richLength } from "@/lib/rich";
import { PageHero } from "@/components/sections/PageHero";
import { CardSection } from "@/components/sections/Card";
import { IconCards } from "@/components/sections/IconCards";
import { SplitSection } from "@/components/sections/SplitSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getInsurance();
  return pageMetadata(page.seo, "/insurance-payment-options/", page.hero.images[0]);
}

export default async function InsurancePage() {
  const page = await getInsurance();
  const p = page.payment;
  return (
    <>
      <SeoSchema seo={page.seo} />
      <JsonLd data={breadcrumbSchema([{ name: "Insurance & Payment Options", path: "/insurance-payment-options/" }])} />
      <PageHero hero={page.hero} />
      <CardSection label={page.philosophy.heading}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:gap-20">
          <Display text={page.philosophy.heading} className="text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]" />
          <ReadMore fold={richLength(page.philosophy.text) > 520} height={200} className="md:pt-3">
            <RichText value={page.philosophy.text} className="text-[15px] leading-[1.85] md:text-[16.5px] [&_p]:mb-4" />
          </ReadMore>
        </div>
      </CardSection>
      <CardSection label={p.heading}>
        <div className="mx-auto max-w-[860px] text-center">
          <Display text={p.heading} className="text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]" />
          {p.text ? <p className="mt-5 text-[15px] leading-[1.8] md:text-base">{p.text}</p> : null}
          <h3 className="mt-12 text-[26px] italic text-sand-deep md:text-[30px]">{p.directHeading}</h3>
          {p.directText ? <p className="mt-3 text-[15px] leading-[1.8]">{p.directText}</p> : null}
          <ul className="mx-auto mt-8 grid max-w-[720px] grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-4">
            {p.methods.map((m) => (
              <li key={m.label} className="flex flex-col items-center bg-paper px-3 py-7">
                <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-[26px]">
                  {m.emoji}
                </span>
                <span className="mt-4 text-[14px] font-semibold text-ink">{m.label}</span>
                {m.note ? <span className="mt-1 max-w-[130px] text-[11.5px] leading-snug text-muted">{m.note}</span> : null}
              </li>
            ))}
          </ul>
          {p.dueNote ? <p className="mt-7 text-[15px] leading-[1.8]">{p.dueNote}</p> : null}
          <h3 className="mt-14 text-[26px] italic text-sand-deep md:text-[30px]">{p.financingHeading}</h3>
          {p.financingText ? <p className="mt-3 text-[15px] leading-[1.8]">{p.financingText}</p> : null}
        </div>
        <div className="mt-10 md:mt-12">
          <IconCards cards={p.options} columns={3} />
        </div>
      </CardSection>
      <SplitSection block={{ _type: "splitBlock", heading: page.cta.heading, text: page.cta.text ?? rich(), ctas: page.cta.cta ? [page.cta.cta] : [], image: page.cta.image }} />
    </>
  );
}
