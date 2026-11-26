import Image from "next/image";
import type { SplitBlock } from "@/lib/types";
import { richLength } from "@/lib/rich";
import { CtaPair } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Icon } from "@/components/ui/Icon";
import { ReadMore } from "@/components/ui/ReadMore";
import { RichText } from "@/components/ui/RichText";

/**
 * Photo panel beside a soft teal text panel ("Healthy smiles begin with
 * exceptional preventive care", "Why Patients Choose ..."). Nothing is laid
 * over the photo, so faces stay clear. On phones the photo sits on top.
 */
export function SplitSection({ block }: { block: SplitBlock }) {
  // Portrait photos get the narrower column so they are never stretched past their own resolution.
  const portrait = (block.image.height ?? 0) > (block.image.width ?? 0);
  return (
    <section aria-label={block.heading} className="container-x py-10 md:py-16">
      <div
        className={`grid overflow-hidden rounded-[var(--radius-panel)] bg-mist lg:min-h-[560px] ${
          portrait ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
        }`}
      >
        <div className={`relative ${portrait ? "aspect-[4/5] sm:aspect-[4/3]" : "aspect-[4/3]"} lg:aspect-auto`}>
          <Image
            src={block.image.src}
            alt={block.image.alt || block.heading}
            fill
            sizes={portrait ? "(min-width: 1340px) 540px, (min-width: 1024px) 42vw, 100vw" : "(min-width: 1340px) 760px, (min-width: 1024px) 58vw, 100vw"}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-12 md:py-14">
          <Display text={block.heading} className="text-[28px] leading-[1.15] md:text-[38px]" statementClassName="md:text-[34px]!" />
          <ReadMore fold={richLength(block.text) > 360} height={165} className="mt-5">
            <RichText value={block.text} className="text-[15px] leading-[1.8]" />
          </ReadMore>
          {block.items?.length ? (
            <ul className="mt-7 grid gap-3">
              {block.items.map((c) => (
                <li key={c.title} className="flex gap-4 rounded-[18px] bg-white px-5 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{c.title}</span>
                    {c.text ? <span className="mt-1 block text-sm leading-[1.7]">{c.text}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {block.ctas?.length ? <CtaPair ctas={block.ctas} second="ghost" className="mt-8" /> : null}
        </div>
      </div>
    </section>
  );
}
