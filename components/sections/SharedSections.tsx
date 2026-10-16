import type { SharedSections, SiteSettings, Testimonial } from "@/lib/types";
import { CtaPair } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { CardSection } from "@/components/sections/Card";
import { IconCards } from "@/components/sections/IconCards";
import { ReviewsWidget } from "@/components/sections/Reviews";

export function WhyChooseUs({ data }: { data: SharedSections["whyChooseUs"] }) {
  return (
    <CardSection label={data.heading}>
      <div className="mx-auto max-w-[650px] md:text-center">
        <Pill>{data.eyebrow}</Pill>
        <h2 className="mt-5 text-xl leading-[1.2] md:text-[2.5rem]">{data.heading}</h2>
        {data.text ? <p className="mt-5">{data.text}</p> : null}
      </div>
      <div className="mt-5">
        <IconCards cards={data.cards} columns={3} />
      </div>
    </CardSection>
  );
}

export function Process({ data, showCtas = true }: { data: SharedSections["process"]; showCtas?: boolean }) {
  return (
    <CardSection label={data.heading}>
      <div className="mx-auto max-w-[660px] text-center">
        <Pill>{data.eyebrow}</Pill>
        <h2 className="mt-5 text-[1.375rem] leading-[1.2] md:text-[2.5rem]">{data.heading}</h2>
        {data.text ? <p className="mt-5">{data.text}</p> : null}
      </div>
      <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-5">
        {data.steps.map((s, i) => (
          <li key={s.title} className="flex flex-col items-center px-2.5 text-center">
            <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-[3px] border-white bg-teal text-[22px] md:h-[86px] md:w-[86px] md:border-4 md:text-[26px] font-semibold text-white shadow-[0_0_0_4px_var(--color-teal)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-7 text-base leading-[1.35] text-black md:text-lg">{s.title}</h3>
            <p className="mt-3 text-sm leading-[1.65] text-muted md:text-[15px]">{s.text}</p>
          </li>
        ))}
      </ol>
      {showCtas && data.ctas.length ? <CtaPair ctas={data.ctas} className="mt-10 sm:justify-center" /> : null}
    </CardSection>
  );
}

export function ReviewsCard({ data, settings, reviews }: { data: SharedSections["testimonials"]; settings: SiteSettings; reviews: Testimonial[] }) {
  return (
    <section aria-label={data.heading} className="container-x mb-[25px]">
      <div className="rounded-[var(--radius-card)] bg-[#f8f9fb] px-4 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[620px] text-center">
          <Pill white>{data.eyebrow}</Pill>
          <h2 className="mt-5 text-[1.375rem] leading-[1.3] md:text-[2.5rem] md:leading-[1.2]">{data.heading}</h2>
        </div>
        <div className="mt-8">
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
