import type { Metadata } from "next";
import { getPrivacy } from "@/lib/content";
import { SeoSchema } from "@/components/ui/JsonLd";
import { isPlaceholder } from "@/lib/placeholders";
import { pageMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getPrivacy()).seo, "/privacy-policy/");
}

export default async function PrivacyPage() {
  const page = await getPrivacy();
  return (
    <section className="container-x pb-24 pt-10 md:pb-32 md:pt-16">
      <SeoSchema seo={page.seo} />
      <div className="mx-auto max-w-[860px]">
        <h1 className="text-[40px] leading-[1.06] md:text-[60px]">{page.heading}</h1>
        {page.updated && !isPlaceholder(page.updated) ? <p className="pill mt-5">Effective {page.updated}</p> : null}
        <span aria-hidden="true" className="mt-8 block h-px w-20 bg-sand-deep/45" />
        <RichText value={page.body} className="mt-10 text-[15px] leading-[1.85] [&_h4]:font-display md:text-[16.5px]" />
      </div>
    </section>
  );
}
