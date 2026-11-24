import type { CardsBlock } from "@/lib/types";
import { Display } from "@/components/ui/Display";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { CardSection } from "@/components/sections/Card";
import { IconCards } from "@/components/sections/IconCards";

/** Centered heading and text, then icon cards in a grid, or a short benefit list. */
export function CardsSection({ block }: { block: CardsBlock }) {
  return (
    <CardSection label={block.heading}>
      <div className="mx-auto max-w-[900px] text-center">
        <Display text={block.heading} className="text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]" />
        <RichText value={block.text} className="mx-auto mt-6 max-w-[760px] text-[15px] leading-[1.8] [&_h4]:font-display [&_h4]:text-2xl md:text-base [&_ul]:text-left" />
        {block.subheading ? <h3 className="mt-8 text-[24px] italic text-sand-deep md:text-[28px]">{block.subheading}</h3> : null}
      </div>
      {block.cards.length ? (
        block.layout === "list" ? (
          <ul className="mx-auto mt-12 grid max-w-[1150px] gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {block.cards.map((c) => (
              <li key={c.title} className="flex items-start gap-4 border-b border-line py-5 text-[15px] leading-snug text-ink">
                <Icon name={c.icon ?? "hand-point-right"} className="mt-0.5 h-4 w-4 shrink-0 text-sand-deep" />
                {c.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 md:mt-14">
            <IconCards cards={block.cards} columns={block.columns ?? 3} />
          </div>
        )
      ) : null}
    </CardSection>
  );
}
