import Image from "next/image";
import type { DetailsBlock } from "@/lib/types";
import { slugify } from "@/lib/text";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { CardSection } from "@/components/sections/Card";

/** Table of contents on the left (desktop), then each topic: heading and text, or a photo beside the text. */
export function DetailsSection({ block }: { block: DetailsBlock }) {
  const items = block.items.map((it) => ({ ...it, id: slugify(it.heading) }));
  return (
    <CardSection label={block.eyebrow ?? "Details"}>
      <div className="grid gap-5 lg:grid-cols-[299px_minmax(0,1fr)] lg:gap-[20px]">
        <nav aria-label="On this page" className="hidden p-2.5 lg:block">
          <ol className="sticky top-28 list-decimal rounded-[10px] bg-page py-3 pl-8 pr-4 text-sm leading-[1.65] marker:text-ink">
            {items.map((it) => (
              <li key={it.id} className="py-0.5 pl-1">
                <a href={`#${it.id}`} className="hover:text-teal-deep">
                  {it.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:p-2.5">
          <Pill>{block.eyebrow}</Pill>
          {items.map((it, i) => (
            <div key={it.id} id={it.id} className={i ? "mt-10 border-t border-line pt-10 lg:mt-[50px] lg:pt-[50px]" : "mt-5"}>
              {it.image ? (
                <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-[30px]">
                  <div className="relative overflow-hidden rounded-[10px]">
                    <Image
                      src={it.image.src}
                      alt={it.image.alt}
                      width={it.image.width ?? 800}
                      height={it.image.height ?? 600}
                      sizes="(min-width: 1024px) 300px, 40vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl leading-[1.5] md:text-[1.75rem] md:leading-[1.4]">{it.heading}</h3>
                    <RichText value={it.body} className="mt-4 text-[15px] leading-[1.65]" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-lg leading-[1.4] md:text-[1.75rem] md:leading-[1.4]">{it.heading}</h2>
                  <RichText value={it.body} className="mt-5 text-[15px] leading-[1.65] md:text-lg" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </CardSection>
  );
}
