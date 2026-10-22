import Image from "next/image";
import type { SplitBlock } from "@/lib/types";
import { CtaPair } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";

/** Text card beside a photo card ("Healthy smiles begin with exceptional preventive care", "Why Patients Choose ..."). */
export function SplitSection({ block }: { block: SplitBlock }) {
  return (
    <section aria-label={block.heading} className="container-x mb-[25px]">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card flex flex-col justify-center px-5 py-8 md:p-10">
          <h2 className="text-[1.375rem] leading-[1.3] md:text-[2rem] md:leading-[1.25]">{block.heading}</h2>
          <RichText value={block.text} className="mt-5 text-[15px]" />
          {block.items?.length ? (
            <ul className="mt-6 grid gap-5">
              {block.items.map((c) => (
                <li key={c.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-base font-semibold">{c.title}</span>
                    {c.text ? <span className="mt-1 block text-sm leading-[1.65]">{c.text}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {block.ctas?.length ? <CtaPair ctas={block.ctas} className="mt-7" /> : null}
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-[var(--radius-card)] md:min-h-[420px]">
          <Image src={block.image.src} alt={block.image.alt || block.heading} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
