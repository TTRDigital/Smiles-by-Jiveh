import Image from "next/image";
import type { DetailsBlock } from "@/lib/types";
import { slugify } from "@/lib/text";
import { richLength } from "@/lib/rich";
import { Pill } from "@/components/ui/Pill";
import { ReadMore } from "@/components/ui/ReadMore";
import { RichText } from "@/components/ui/RichText";
import { CardSection } from "@/components/sections/Card";
import { DetailItem } from "@/components/sections/DetailItem";

/** Table of contents on the left (desktop), then each topic as a soft card: heading and text, or a photo beside the text. On phones the topics open on tap. */
export function DetailsSection({ block }: { block: DetailsBlock }) {
  const items = block.items.map((it) => ({ ...it, id: slugify(it.heading) }));
  // Many short text-only topics read better as two columns on wide screens.
  const twoCols = items.length >= 5 && items.every((it) => !it.image);
  return (
    <CardSection label={block.eyebrow ?? "Details"}>
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-32 border-t border-line text-[13.5px] leading-[1.5] [counter-reset:toc]">
            {items.map((it) => (
              <li key={it.id} className="border-b border-line [counter-increment:toc]">
                <a
                  href={`#${it.id}`}
                  className="flex gap-4 py-3 text-body transition-colors before:w-6 before:shrink-0 before:font-display before:italic before:text-sand-deep before:content-[counter(toc,decimal-leading-zero)] hover:text-teal-deep"
                >
                  {it.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          <Pill>{block.eyebrow}</Pill>
          <div className={`mt-8 grid gap-3 md:gap-5 ${twoCols ? "xl:grid-cols-2" : ""}`}>
            {items.map((it, i) =>
              it.image ? (
                <DetailItem
                  key={it.id}
                  id={it.id}
                  label={it.heading}
                  defaultOpen={i === 0}
                  className={`rounded-[var(--radius-card)] p-6 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-[auto_1fr] md:items-start md:gap-x-10 md:p-10 ${i % 2 ? "bg-ivory" : "bg-mist"}`}
                  headerClassName="md:col-start-2 md:row-start-1"
                  bodyClassName="md:contents"
                  header={
                    <div className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-display text-[19px] italic text-sand-deep md:text-[22px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[22px] leading-[1.22] md:text-[30px]">{it.heading}</h3>
                    </div>
                  }
                  media={
                    <div className="relative mt-5 overflow-hidden rounded-[20px] md:col-start-1 md:row-span-2 md:row-start-1 md:mt-0">
                      <Image
                        src={it.image.src}
                        alt={it.image.alt || it.heading}
                        width={it.image.width ?? 800}
                        height={it.image.height ?? 600}
                        sizes="(min-width: 1024px) 300px, (min-width: 768px) 40vw, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                  }
                >
                  <ReadMore fromMd fold={richLength(it.body) > 420} height={160} className="mt-4 md:col-start-2">
                    <RichText value={it.body} className="text-[15px] leading-[1.8]" />
                  </ReadMore>
                </DetailItem>
              ) : (
                <DetailItem
                  key={it.id}
                  id={it.id}
                  label={it.heading}
                  defaultOpen={i === 0}
                  className={`rounded-[var(--radius-card)] p-6 ${twoCols ? "md:p-8" : "md:p-10"} ${i % 2 ? "bg-ivory" : "bg-mist"}`}
                  header={
                    <div className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-display text-[19px] italic text-sand-deep md:text-[22px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className={`text-[22px] leading-[1.22] ${twoCols ? "md:text-[28px]" : "md:text-[34px]"}`}>{it.heading}</h2>
                    </div>
                  }
                >
                  <ReadMore fromMd fold={richLength(it.body) > (twoCols ? 320 : 420)} height={160} className={`mt-4 ${twoCols ? "" : "md:pl-[42px]"}`}>
                    <RichText value={it.body} className="max-w-[760px] text-[15px] leading-[1.8] md:text-[16px]" />
                  </ReadMore>
                </DetailItem>
              ),
            )}
          </div>
        </div>
      </div>
    </CardSection>
  );
}
