import type { SharedSections, SiteSettings, Testimonial } from "@/lib/types";
import { CtaPair } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { CardSection } from "@/components/sections/Card";
import { IconCards } from "@/components/sections/IconCards";
import { ReviewsWidget } from "@/components/sections/Reviews";

export function WhyChooseUs({ data }: { data: SharedSections["whyChooseUs"] }) {
  return (
    <CardSection label={data.heading}>
      <div className="mx-auto max-w-[760px] text-center">
        <Pill centered>{data.eyebrow}</Pill>
        <Display text={data.heading} className="mt-6 text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]" />
        {data.text ? <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.8] md:text-base">{data.text}</p> : null}
      </div>
      <div className="mt-12 md:mt-14">
        <IconCards cards={data.cards} columns={3} />
      </div>
    </CardSection>
  );
}

/** "Our Process": the dark spruce band, steps under large serif numerals. */
export function Process({ data, showCtas = true }: { data: SharedSections["process"]; showCtas?: boolean }) {
  return (
    <section aria-label={data.heading} className="on-dark my-6 bg-spruce py-20 text-ivory md:my-10 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <div>
            <Pill>{data.eyebrow}</Pill>
            <Display text={data.heading} className="mt-6 text-[32px] leading-[1.12] text-white md:text-[50px]" statementClassName="md:text-[46px]" />
          </div>
          {data.text ? <p className="text-[15px] leading-[1.8] text-ivory/80 md:pb-2 md:text-base">{data.text}</p> : null}
        </div>
        {/* On phones the steps swipe sideways. */}
        <ol className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:border-t md:border-white/15 md:px-0 md:pb-0">
          {data.steps.map((s, i) => (
            <li
              key={s.title}
              className={`w-[82%] shrink-0 snap-center rounded-[22px] bg-white/[0.06] p-7 md:w-auto md:rounded-none md:bg-transparent md:px-8 md:py-12 md:first:pl-0 ${i ? "md:border-l md:border-white/15" : ""}`}
            >
              <span className="block font-display text-[56px] font-light leading-none text-sand md:text-[64px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 text-[24px] leading-[1.25] text-white md:text-[26px]">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.75] text-ivory/75">{s.text}</p>
            </li>
          ))}
        </ol>
        {showCtas && data.ctas.length ? <CtaPair ctas={data.ctas} dark className="mt-8 md:mt-6" /> : null}
      </div>
    </section>
  );
}

export function ReviewsCard({ data, settings, reviews }: { data: SharedSections["testimonials"]; settings: SiteSettings; reviews: Testimonial[] }) {
  return (
    <section aria-label={data.heading} className="container-x">
      <div className="border-t border-line py-16 md:py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <Pill centered>{data.eyebrow}</Pill>
          <Display text={data.heading} className="mt-6 text-[30px] leading-[1.15] md:text-[46px]" statementClassName="md:text-[42px]" />
        </div>
        <div className="mt-10 md:mt-12">
          <ReviewsWidget
            widgetId={settings.reviewsWidgetId}
            reviews={reviews}
            rating={settings.googleRating}
            count={settings.reviewCount}
            reviewsUrl={settings.reviewsUrl}
            writeReviewUrl={settings.writeReviewUrl}
          />
        </div>
      </div>
    </section>
  );
}
