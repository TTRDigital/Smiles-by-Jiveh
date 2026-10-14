import type { Metadata } from "next";
import { getHome, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { HomeAbout, HomeBeforeAfter, HomeCtaBand, HomeDoctor, HomeHero, HomeIntro, HomeServices } from "@/components/home/HomeSections";
import { Pill } from "@/components/ui/Pill";
import { ReviewsWidget } from "@/components/sections/Reviews";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return pageMetadata(home.seo, "/", home.hero.image);
}

export default async function HomePage() {
  const [home, settings, reviews] = await Promise.all([getHome(), getSiteSettings(), getTestimonials()]);
  return (
    <>
      <HomeHero hero={home.hero} />
      <HomeIntro intro={home.intro} />
      <HomeAbout about={home.about} />
      <HomeServices services={home.services} />
      <HomeDoctor doctor={home.doctor} />
      <HomeBeforeAfter data={home.beforeAfter} />
      <section aria-label={home.testimonials.heading} className="bg-[#f8f9fb] py-[60px] md:py-[90px]">
        <div className="container-x">
          <div className="mx-auto max-w-[620px] text-center">
            <Pill white>{home.testimonials.eyebrow}</Pill>
            <h2 className="mt-5 text-[25px] leading-[1.4] md:text-[40px] md:leading-[1.2]">{home.testimonials.heading}</h2>
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
      <HomeCtaBand band={home.ctaBand} />
    </>
  );
}
