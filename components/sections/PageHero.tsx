import Image from "next/image";
import type { PageHeroContent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { Slider } from "@/components/ui/Slider";

/** Inner page header: photo (or before/after slider) in one card, heading and intro in the next. */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  const slides = hero.images.length > 1 && !hero.stacked;
  const mobile = hero.mobileImages?.length ? hero.mobileImages : null;
  const media = (imgs: PageHeroContent["images"], cls: string) =>
    hero.stacked && imgs.length > 1 ? (
      <div className={`grid h-full gap-2.5 ${cls}`}>
        {imgs.map((img, i) => (
          <div key={img.src} className="relative min-h-[200px] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={img.src} alt={img.alt || hero.heading} fill priority={i === 0} fetchPriority={i === 0 ? "high" : undefined} sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
    ) : imgs.length > 1 ? (
      <Slider label={`${hero.eyebrow ?? hero.heading} photos`} arrows="plain" className={cls}>
        {imgs.map((img, i) => (
          // The slider takes the shape of its first photo; other photos fit inside it uncropped.
          <div
            key={img.src}
            className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-white"
            style={{ aspectRatio: imgs[0].width && imgs[0].height ? `${imgs[0].width} / ${imgs[0].height}` : "4 / 5" }}
          >
            <Image src={img.src} alt={img.alt || hero.heading} fill priority={i === 0} fetchPriority={i === 0 ? "high" : undefined} sizes="(min-width: 1024px) 640px, 100vw" className={i === 0 ? "object-cover" : "object-contain"} />
          </div>
        ))}
      </Slider>
    ) : imgs[0] ? (
      <div className={`relative h-[220px] w-full overflow-hidden rounded-[var(--radius-card)] sm:h-auto sm:aspect-[638/541] lg:aspect-auto lg:h-full lg:min-h-[470px] ${cls}`}>
        <Image src={imgs[0].src} alt={imgs[0].alt || hero.heading} fill priority fetchPriority="high" sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
      </div>
    ) : null;

  return (
    <section className="container-x mb-[25px] pt-[25px]">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={slides ? "lg:px-2.5" : ""}>
          {mobile ? (
            <>
              {media(hero.images, "hidden md:block")}
              {media(mobile, "md:hidden")}
            </>
          ) : (
            media(hero.images, "")
          )}
        </div>
        <div className="card flex flex-col justify-center px-[10px] py-5 sm:px-6 sm:py-8 md:p-10">
          <Pill className="self-start">{hero.eyebrow}</Pill>
          <h1 className="mt-5 text-2xl leading-[1.4] md:text-[2.5rem] md:leading-[1.1]">{hero.heading}</h1>
          <RichText value={hero.text} className="mt-5 [&_p]:mb-5" />
          {hero.cta ? (
            <div className="mt-5">
              <Button href={hero.cta.href}>{hero.cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
