import type { CardsBlock } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { CardSection } from "@/components/sections/Card";
import { IconCards } from "@/components/sections/IconCards";

/** Centered heading and text, then icon cards in a grid, or a short benefit list with hand icons. */
export function CardsSection({ block }: { block: CardsBlock }) {
  return (
    <CardSection label={block.heading}>
      <div className="mx-auto max-w-[1100px] text-center">
        <h2 className="text-[1.375rem] leading-[1.3] md:text-[2.25rem] md:leading-[1.2]">{block.heading}</h2>
        <RichText value={block.text} className="mt-4 text-[15px] [&_h4]:font-display [&_h4]:text-2xl md:text-base" />
        {block.subheading ? <h3 className="mt-5 text-xl text-teal md:text-2xl">{block.subheading}</h3> : null}
      </div>
      {block.cards.length ? (
        block.layout === "list" ? (
          <ul className="mx-auto mt-8 grid max-w-[1150px] gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {block.cards.map((c) => (
              <li key={c.title} className="flex items-start gap-4 text-[15px] leading-snug">
                <Icon name={c.icon ?? "hand-point-right"} className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {c.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            <IconCards cards={block.cards} columns={block.columns ?? 3} />
          </div>
        )
      ) : null}
    </CardSection>
  );
}
