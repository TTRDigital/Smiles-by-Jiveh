import type { Metadata } from "next";
import { getHome, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { HomeAbout, HomeBeforeAfter, HomeContact, HomeCtaBand, HomeDoctor, HomeHero, HomeIntro, HomeServices } from "@/components/home/HomeSections";
import { SeoSchema } from "@/components/ui/JsonLd";
import { Display } from "@/components/ui/Display";
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
      <SeoSchema seo={home.seo} />
      <HomeHero hero={home.hero} />
      <HomeIntro intro={home.intro} />
      <HomeAbout about={home.about} />
      <HomeServices services={home.services} />
      <HomeDoctor doctor={home.doctor} />
      <HomeBeforeAfter data={home.beforeAfter} />
      <section aria-label={home.testimonials.heading} className="bg-cream py-20 md:py-[120px]">
        <div className="container-x">
          <div className="mx-auto max-w-[760px] text-center">
            <Pill centered>{home.testimonials.eyebrow}</Pill>
            <Display text={home.testimonials.heading} className="mt-6 text-[32px] leading-[1.12] md:text-[50px]" />
          </div>
          <div className="mt-12 md:mt-14">
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
      <HomeContact contact={home.contact} settings={settings} />
      <HomeCtaBand band={home.ctaBand} />
    </>
  );
}
