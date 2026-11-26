import Image from "next/image";
import type { PageHeroContent } from "@/lib/types";
import { richLength } from "@/lib/rich";
import { Button } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { ReadMore } from "@/components/ui/ReadMore";
import { Slider } from "@/components/ui/Slider";

/**
 * Inner page header: eyebrow, large serif heading and intro beside a big
 * rounded photo panel (or the before/after slider). The photo comes first in
 * the HTML and on phones (it is the first screen's largest element, loaded
 * with high priority); on desktop it sits to the right of the text.
 */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  const mobile = hero.mobileImages?.length ? hero.mobileImages : null;
  const media = (imgs: PageHeroContent["images"], cls: string) =>
    hero.stacked && imgs.length > 1 ? (
      <div className={`grid gap-3 ${cls}`}>
        {imgs.map((img, i) => (
          // Each photo keeps its own shape: these are before/after photos with labels printed on them.
          <div key={img.src} className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: img.width && img.height ? `${img.width} / ${img.height}` : "3 / 2" }}>
            <Image src={img.src} alt={img.alt || hero.heading} fill priority={i === 0} fetchPriority={i === 0 ? "high" : undefined} sizes="(min-width: 1340px) 720px, (min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
    ) : imgs.length > 1 ? (
      <Slider label={`${hero.eyebrow ?? hero.heading} photos`} arrows="plain" className={cls}>
        {imgs.map((img, i) => (
          // The slider takes the shape of its first photo; other photos fit inside it uncropped.
          <div
            key={img.src}
            className="relative w-full overflow-hidden rounded-[var(--radius-panel)] bg-paper"
            style={{ aspectRatio: imgs[0].width && imgs[0].height ? `${imgs[0].width} / ${imgs[0].height}` : "4 / 5" }}
          >
            <Image src={img.src} alt={img.alt || hero.heading} fill priority={i === 0} fetchPriority={i === 0 ? "high" : undefined} sizes="(min-width: 1340px) 720px, (min-width: 1024px) 55vw, 100vw" className={i === 0 ? "object-cover" : "object-contain"} />
          </div>
        ))}
      </Slider>
    ) : imgs[0] ? (
      <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-panel)] lg:aspect-square ${cls}`}>
        <Image src={imgs[0].src} alt={imgs[0].alt || hero.heading} fill priority fetchPriority="high" sizes="(min-width: 1340px) 720px, (min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>
    ) : null;

  return (
    <section className="container-x pb-14 pt-5 md:pb-20 md:pt-14">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div className="lg:order-2">
          {mobile ? (
            <>
              {media(hero.images, "hidden md:block")}
              {media(mobile, "md:hidden")}
            </>
          ) : (
            media(hero.images, "")
          )}
        </div>
        <div className="lg:order-1">
          <Pill>{hero.eyebrow}</Pill>
          <Display as="h1" text={hero.heading} className="mt-6 text-[38px] leading-[1.06] md:text-[56px] lg:text-[60px] lg:leading-[1.04]" statementClassName="md:text-[44px]! lg:text-[40px]! xl:text-[48px]!" />
          <span aria-hidden="true" className="mt-8 block h-px w-20 bg-sand-deep/45" />
          <ReadMore fold={richLength(hero.text) > 420} height={175} className="mt-7">
            <RichText value={hero.text} className="text-[15px] leading-[1.8] md:text-[16.5px] [&_p]:mb-4" />
          </ReadMore>
          {hero.cta ? (
            <div className="mt-9">
              <Button href={hero.cta.href}>{hero.cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
