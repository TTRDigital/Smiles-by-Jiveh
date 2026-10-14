import type { FaqBlock } from "@/lib/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CardSection } from "@/components/sections/Card";

export function FaqSection({ block }: { block: FaqBlock }) {
  if (!block.items.length) return null;
  return (
    <CardSection label={block.heading}>
      <JsonLd data={faqSchema(block.items)} />
      <div className="text-center">
        <Pill>{block.eyebrow}</Pill>
        <h2 className="mt-5 text-xl leading-[1.4] md:text-[2.5rem] md:leading-[1.1]">{block.heading}</h2>
      </div>
      <div className="mx-auto mt-8 max-w-[892px]">
        <FaqAccordion items={block.items} />
      </div>
    </CardSection>
  );
}
