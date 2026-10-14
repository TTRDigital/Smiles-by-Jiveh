import type { Metadata } from "next";
import { getPrivacy } from "@/lib/content";
import { isPlaceholder } from "@/lib/placeholders";
import { pageMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getPrivacy()).seo, "/privacy-policy/");
}

export default async function PrivacyPage() {
  const page = await getPrivacy();
  return (
    <section className="container-x py-[25px]">
      <div className="card mx-auto max-w-[900px] px-5 py-10 md:px-[60px] md:py-[50px]">
        <h1 className="text-[32px] leading-[1.2] md:text-[45px]">{page.heading}</h1>
        {page.updated && !isPlaceholder(page.updated) ? <p className="mt-3 text-sm text-muted">Effective {page.updated}</p> : null}
        <RichText value={page.body} className="mt-8 text-[15px] leading-[1.75] [&_h4]:font-display md:text-base" />
      </div>
    </section>
  );
}
