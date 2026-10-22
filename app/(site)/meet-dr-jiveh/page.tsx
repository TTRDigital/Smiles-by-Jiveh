import type { Metadata } from "next";
import Image from "next/image";
import { getDoctor, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, doctorSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { CheckColumns } from "@/components/sections/CheckColumns";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDoctor();
  return pageMetadata(page.seo, "/meet-dr-jiveh/", page.hero.image);
}

export default async function MeetDrJivehPage() {
  const [page, settings] = await Promise.all([getDoctor(), getSiteSettings()]);
  return (
    <div className="bg-white">
      <JsonLd data={doctorSchema(settings)} />
      <JsonLd data={breadcrumbSchema([{ name: "Meet Dr. Jiveh", path: "/meet-dr-jiveh/" }])} />
      <section className="container-x grid items-center gap-10 py-10 md:grid-cols-2 md:gap-[70px] md:py-[60px]">
        <div className="md:p-2.5">
          <Pill>{page.hero.eyebrow}</Pill>
          <h1 className="mt-5 text-[28px] leading-[1.25] md:text-[45px] md:leading-[1.2]">{page.hero.heading}</h1>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#555] md:text-base">{page.hero.text}</p>
          {page.hero.cta ? (
            <div className="mt-7">
              <Button href={page.hero.cta.href} bold>
                {page.hero.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
          <div className="relative aspect-[1121/1403] w-full max-w-[440px] overflow-hidden">
            <Image src={page.hero.image.src} alt={page.hero.image.alt || page.hero.heading} fill priority fetchPriority="high" sizes="440px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 pb-10 md:grid-cols-[minmax(0,520fr)_minmax(0,720fr)] md:gap-[60px] md:pb-[60px]">
        <div data-reveal="left" className="relative aspect-[1024/1280] overflow-hidden rounded-[20px] md:aspect-[520/650]">
          <Image src={page.story.image.src} alt={page.story.image.alt || page.story.heading} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
        <div>
          <Pill>{page.story.eyebrow}</Pill>
          <h2 className="mt-5 text-[28px] leading-[1.25] md:text-[38px]">{page.story.heading}</h2>
          <RichText value={page.story.text} className="mt-6 text-[15px] leading-[1.75] text-[#555] [&_strong]:text-[#333]" />
        </div>
      </section>

      <section className="container-x pb-10 md:pb-[60px]">
        <div className="rounded-[20px] bg-[#f8f9fb] px-5 py-10 md:px-10">
          <h2 className="text-center text-[28px] leading-[1.2] md:text-[45px]">{page.highlights.heading}</h2>
          <div className="mt-8">
            <CheckColumns items={page.highlights.items} />
          </div>
        </div>
      </section>

      <section className="container-x pb-14 text-center md:pb-[80px]">
        <Pill>{page.philosophy.eyebrow}</Pill>
        <blockquote className="mx-auto mt-5 max-w-[1080px] font-display text-xl font-bold italic leading-[1.45] md:text-[28px]">{page.philosophy.quote}</blockquote>
      </section>
    </div>
  );
}
