import type { Metadata } from "next";
import Image from "next/image";
import { getAbout } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
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
    <div className="bg-white">
      <JsonLd data={breadcrumbSchema([{ name: "Who We Are", path: "/who-we-are/" }])} />
      <section className="container-x grid items-center gap-10 py-10 md:grid-cols-2 md:gap-[70px] md:py-[60px]">
        <div className="md:p-2.5">
          <Pill>{page.hero.eyebrow}</Pill>
          <h1 className="mt-5 text-[28px] leading-[1.25] md:text-[45px] md:leading-[1.2]">{page.hero.heading}</h1>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#555]">{page.hero.text}</p>
          {page.hero.cta ? (
            <div className="mt-7">
              <Button href={page.hero.cta.href} bold>
                {page.hero.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative aspect-[1440/1080] overflow-hidden rounded-[20px]">
          <Image src={page.hero.image.src} alt={page.hero.image.alt || page.hero.heading} fill priority fetchPriority="high" sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="container-x pb-10 md:pb-[50px]">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-[60px] md:px-2.5">
          <div>
            <Pill>{page.philosophy.eyebrow}</Pill>
            <h2 className="mt-5 text-[26px] leading-[1.25] md:text-[38px]">{page.philosophy.heading}</h2>
          </div>
          <RichText value={page.philosophy.text} className="text-[15px] leading-[1.75] text-[#555]" />
        </div>
        <div data-reveal="up" className="relative mt-10 aspect-[2000/1000] overflow-hidden rounded-[20px] md:aspect-[1296/500]">
          <Image src={page.philosophy.image.src} alt={page.philosophy.image.alt || page.philosophy.heading} fill sizes="(min-width: 1340px) 1296px, 100vw" className="object-cover object-[50%_40%]" />
        </div>
      </section>

      <section className="container-x pb-10 md:pb-[30px]">
        <div className="rounded-[20px] bg-mint px-5 py-10 md:px-10 md:py-[40px]">
          <h2 className="text-center text-[28px] leading-[1.2] md:text-[45px]">{page.specialties.heading}</h2>
          <div className="mt-8">
            <CheckColumns items={page.specialties.items} />
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-[50px] md:grid-cols-4 md:gap-5">
            {page.specialties.stats.map((s) => (
              <li key={s.label} className="rounded-[10px] bg-white px-4 py-7 text-center">
                <p className="font-display text-[36px] font-bold leading-none text-teal md:text-[48px]">{fmt(s)}</p>
                <p className="mt-3 text-[15px]">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
