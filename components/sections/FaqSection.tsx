import type { FaqBlock } from "@/lib/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CardSection } from "@/components/sections/Card";

export function FaqSection({ block }: { block: FaqBlock }) {
  if (!block.items.length) return null;
  return (
    <CardSection label={block.heading}>
      <JsonLd data={faqSchema(block.items)} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Pill>{block.eyebrow}</Pill>
          <Display text={block.heading} className="mt-6 text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]!" />
        </div>
        <div>
        <FaqAccordion items={block.items} />
        </div>
      </div>
    </CardSection>
  );
}
