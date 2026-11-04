import type { Block, SharedSections, SiteSettings, Testimonial } from "@/lib/types";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { CardsSection } from "@/components/sections/CardsSection";
import { SplitSection } from "@/components/sections/SplitSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Process, ReviewsCard, WhyChooseUs } from "@/components/sections/SharedSections";
import { ProseSection, CtaBandSection, DoctorSection, FeatureSection, GallerySection, ImageCardsSection, LocationSection, StatsSection, StepsSection } from "@/components/sections/AreaSections";

/** Renders a page's sections in order. */
export function Blocks({ blocks, shared, settings, reviews }: { blocks: Block[]; shared: SharedSections; settings: SiteSettings; reviews: Testimonial[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        const key = b._key ?? `${b._type}-${i}`;
        switch (b._type) {
          case "detailsBlock":
            return <DetailsSection key={key} block={b} />;
          case "cardsBlock":
            return <CardsSection key={key} block={b} />;
          case "splitBlock":
            return <SplitSection key={key} block={b} />;
          case "faqBlock":
            return <FaqSection key={key} block={b} />;
          case "proseBlock":
            return <ProseSection key={key} block={b} />;
          case "statsBlock":
            return <StatsSection key={key} block={b} settings={settings} />;
          case "imageCardsBlock":
            return <ImageCardsSection key={key} block={b} />;
          case "featureBlock":
            return <FeatureSection key={key} block={b} />;
          case "stepsBlock":
            return <StepsSection key={key} block={b} />;
          case "locationBlock":
            return <LocationSection key={key} block={b} settings={settings} />;
          case "doctorBlock":
            return <DoctorSection key={key} block={b} />;
          case "galleryBlock":
            return <GallerySection key={key} block={b} />;
          case "ctaBandBlock":
            return <CtaBandSection key={key} block={b} settings={settings} />;
          case "sharedBlock":
            if (b.kind === "whyChooseUs") return <WhyChooseUs key={key} data={shared.whyChooseUs} />;
            if (b.kind === "process") return <Process key={key} data={shared.process} showCtas={!b.hideButtons} />;
            return <ReviewsCard key={key} data={shared.testimonials} settings={settings} reviews={reviews} />;
          default:
            return null;
        }
      })}
    </>
  );
}
