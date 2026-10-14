import type { Metadata } from "next";
import { getInsurance } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { rich } from "@/lib/rich";
import { JsonLd } from "@/components/ui/JsonLd";
import { RichText } from "@/components/ui/RichText";
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
      <JsonLd data={breadcrumbSchema([{ name: "Insurance & Payment Options", path: "/insurance-payment-options/" }])} />
      <PageHero hero={page.hero} />
      <CardSection label={page.philosophy.heading}>
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-[1.375rem] leading-[1.3] md:text-[2.5rem] md:leading-[1.2]">{page.philosophy.heading}</h2>
          <RichText value={page.philosophy.text} className="mt-6 text-[15px] [&_p]:mb-3" />
        </div>
      </CardSection>
      <CardSection label={p.heading}>
        <div className="text-center">
          <h2 className="text-[1.375rem] leading-[1.3] md:text-[2.5rem] md:leading-[1.2]">{p.heading}</h2>
          {p.text ? <p className="mt-3 text-[15px]">{p.text}</p> : null}
          <h3 className="mt-5 text-xl md:text-2xl">{p.directHeading}</h3>
          {p.directText ? <p className="mt-3 text-[15px]">{p.directText}</p> : null}
          <ul className="mx-auto mt-6 grid max-w-[600px] grid-cols-2 gap-6 sm:grid-cols-4">
            {p.methods.map((m) => (
              <li key={m.label} className="flex flex-col items-center">
                <span aria-hidden="true" className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#8fa6a0] text-[32px]">
                  {m.emoji}
                </span>
                <span className="mt-3 text-[15px] font-semibold">{m.label}</span>
                {m.note ? <span className="mt-1 max-w-[110px] text-[11px] leading-snug text-muted">{m.note}</span> : null}
              </li>
            ))}
          </ul>
          {p.dueNote ? <p className="mt-6 text-[15px]">{p.dueNote}</p> : null}
          <h3 className="mt-5 text-xl md:text-2xl">{p.financingHeading}</h3>
          {p.financingText ? <p className="mt-3 text-[15px]">{p.financingText}</p> : null}
        </div>
        <div className="mt-8">
          <IconCards cards={p.options} columns={3} />
        </div>
      </CardSection>
      <SplitSection block={{ _type: "splitBlock", heading: page.cta.heading, text: page.cta.text ?? rich(), ctas: page.cta.cta ? [page.cta.cta] : [], image: page.cta.image }} />
    </>
  );
}
