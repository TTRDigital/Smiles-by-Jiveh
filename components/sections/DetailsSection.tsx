import Image from "next/image";
import type { DetailsBlock } from "@/lib/types";
import { slugify } from "@/lib/text";
import { richLength } from "@/lib/rich";
import { Pill } from "@/components/ui/Pill";
import { ReadMore } from "@/components/ui/ReadMore";
import { RichText } from "@/components/ui/RichText";
import { CardSection } from "@/components/sections/Card";

/** Table of contents on the left (desktop), then each topic: heading and text, or a photo beside the text. */
export function DetailsSection({ block }: { block: DetailsBlock }) {
  const items = block.items.map((it) => ({ ...it, id: slugify(it.heading) }));
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
          <div className="mt-8 grid gap-4 md:gap-5">
            {items.map((it, i) => (
              <div key={it.id} id={it.id} className={`scroll-mt-32 rounded-[var(--radius-card)] p-6 md:p-10 ${i % 2 ? "bg-ivory" : "bg-mist"}`}>
                {it.image ? (
                  <div className="grid items-center gap-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                    <div className="relative overflow-hidden rounded-[20px]">
                      <Image
                        src={it.image.src}
                        alt={it.image.alt || it.heading}
                        width={it.image.width ?? 800}
                        height={it.image.height ?? 600}
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-[24px] leading-[1.2] md:text-[30px]">{it.heading}</h3>
                      <ReadMore fold={richLength(it.body) > 420} height={160} className="mt-4">
                        <RichText value={it.body} className="text-[15px] leading-[1.8]" />
                      </ReadMore>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-display text-[20px] italic text-sand-deep md:text-[22px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[25px] leading-[1.18] md:text-[34px]">{it.heading}</h2>
                    </div>
                    <ReadMore fold={richLength(it.body) > 420} height={160} className="mt-4 md:pl-[42px]">
                      <RichText value={it.body} className="max-w-[760px] text-[15px] leading-[1.8] md:text-[16px]" />
                    </ReadMore>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardSection>
  );
}
