import Image from "next/image";
import type { SplitBlock } from "@/lib/types";
import { CtaPair } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";

/**
 * A large rounded photo panel with a frosted-glass card holding the heading,
 * text and buttons ("Healthy smiles begin with exceptional preventive care",
 * "Why Patients Choose ..."). On phones the card sits under the photo,
 * overlapping its lower edge.
 */
export function SplitSection({ block }: { block: SplitBlock }) {
  // Portrait photos get a narrower panel so they are never stretched past their own resolution.
  const portrait = (block.image.height ?? 0) > (block.image.width ?? 0);
  return (
    <section aria-label={block.heading} className="container-x py-10 md:py-16">
      <div
        className={`relative grid overflow-hidden rounded-[var(--radius-panel)] bg-spruce lg:min-h-[640px] lg:items-center ${
          portrait ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
        }`}
      >
        <div className={`relative lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto ${portrait ? "aspect-[4/5] sm:aspect-[4/3] lg:right-[54.5%]" : "aspect-[4/3] lg:right-[24%]"}`}>
          <Image
            src={block.image.src}
            alt={block.image.alt || block.heading}
            fill
            sizes={portrait ? "(min-width: 1340px) 600px, (min-width: 1024px) 46vw, 100vw" : "(min-width: 1340px) 1000px, (min-width: 1024px) 76vw, 100vw"}
            className="object-cover"
          />
          {portrait ? null : <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(to_right,rgb(23_46_48/0),#172e30)] lg:block" />}
        </div>
        <div className={`relative px-3 pb-3 lg:col-start-2 lg:py-10 ${portrait ? "lg:px-14" : "lg:px-10"}`}>
          <div className="glass -mt-16 px-6 py-8 md:px-10 md:py-11 lg:mt-0">
            <Display text={block.heading} className="text-[28px] leading-[1.15] md:text-[38px]" statementClassName="md:text-[34px]" />
            <RichText value={block.text} className="mt-5 text-[15px] leading-[1.8]" />
            {block.items?.length ? (
              <ul className="mt-6 grid border-t border-ink/10">
                {block.items.map((c) => (
                  <li key={c.title} className="flex gap-4 border-b border-ink/10 py-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 text-teal">
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
      </div>
    </section>
  );
}
