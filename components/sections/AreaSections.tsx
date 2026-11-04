import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type {
  CtaBandBlock, DoctorBlock, FeatureBlock, GalleryBlock, ImageCardsBlock, LocationBlock, PageHeroContent, ProseBlock, SiteSettings, StatsBlock, StepsBlock,
} from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";

/*
 * Clean, quiet sections for the service area pages: a photo hero with a short message, a slim trust line, plenty of
 * white space, a few photo cards, one or two feature sections, the doctor, the location and a plain closing band.
 * Same colors, fonts and corners as the rest of the site.
 */

const section = "container-x py-8 md:py-14";
const eyebrowCls = "text-xs font-semibold uppercase tracking-[0.16em] text-teal-deep";

const Check = () => (
  <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal-deep">
    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
  </span>
);

export function AreaHero({ hero, settings }: { hero: PageHeroContent; settings: SiteSettings }) {
  const img = hero.images[0];
  return (
    <section className="container-x pt-6">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-navy">
        {img ? <Image src={img.src} alt={img.alt || hero.heading} fill priority fetchPriority="high" sizes="(min-width: 1296px) 1296px, 100vw" className="-z-20 object-cover" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/85 via-navy/45 to-navy/10 lg:bg-gradient-to-r lg:from-navy/80 lg:via-navy/45 lg:to-transparent" />
        <div className="flex min-h-[480px] flex-col justify-end px-6 py-10 sm:px-10 md:min-h-[540px] md:py-14 lg:max-w-[680px] lg:justify-center lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{hero.eyebrow}</p>
          <h1 className="mt-4 text-[1.9rem] leading-[1.15] text-white md:text-[2.75rem]">{hero.heading}</h1>
          <RichText value={hero.text} className="mt-4 max-w-[560px] text-[15px] text-white/90 md:text-[17px] [&_p]:mb-0" />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {hero.cta ? <Button href={hero.cta.href}>{hero.cta.label}</Button> : null}
            <Button href={settings.phoneHref} variant="white" arrow={false}>
              Call {settings.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A slim line of facts under the hero. */
export function StatsSection({ block, settings }: { block: StatsBlock; settings: SiteSettings }) {
  return (
    <section aria-label="At a glance" className="container-x">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-6 text-sm text-muted">
        {block.items.map((i) => {
          const rating = i.source === "rating" && settings.googleRating;
          return (
            <li key={i.label} className="flex items-center gap-1.5">
              {rating ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" /> : null}
              <span className="font-semibold text-ink">{rating ? `${settings.googleRating}` : i.value}</span>
              <span>{i.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ImageCardsSection({ block }: { block: ImageCardsBlock }) {
  const cols = block.columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section aria-label={block.heading} className={section}>
      <div className="max-w-[640px]">
        {block.eyebrow ? <p className={eyebrowCls}>{block.eyebrow}</p> : null}
        <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
        {block.text ? <p className="mt-3 text-[15px] text-muted md:text-base">{block.text}</p> : null}
      </div>
      <ul className={`mt-8 grid gap-5 sm:grid-cols-2 ${cols}`}>
        {block.cards.map((c) => (
          <li key={c.title}>
            <Link href={c.href} className="group flex h-full flex-col rounded-2xl bg-white p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card)] md:p-7">
              {c.icon ? (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/15 text-teal-deep">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
              ) : c.image ? (
                <span className="relative block aspect-[3/2] overflow-hidden rounded-xl">
                  <Image src={c.image.src} alt={c.image.alt || c.title} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                </span>
              ) : null}
              <span className="mt-5 block font-display text-xl leading-snug">{c.title}</span>
              {c.text ? <span className="mt-2 block text-[15px] leading-[1.65] text-muted">{c.text}</span> : null}
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-deep">
                Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeatureSection({ block }: { block: FeatureBlock }) {
  return (
    <section aria-label={block.heading} className={section}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={block.reverse ? "lg:order-2" : ""}>
          {block.eyebrow ? <p className={eyebrowCls}>{block.eyebrow}</p> : null}
          <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
          <RichText value={block.text} className="mt-4 text-[15px] md:text-base" />
          {block.bullets?.length ? (
            <ul className="mt-5 grid gap-3">
              {block.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-snug">
                  <Check />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          {block.ctas?.length ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {block.ctas.map((c, i) => <Button key={c.href} href={c.href} variant={i === 0 ? "primary" : "outline"}>{c.label}</Button>)}
            </div>
          ) : null}
        </div>
        <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${block.reverse ? "lg:order-1" : ""}`}>
          <Image src={block.image.src} alt={block.image.alt || block.heading} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function StepsSection({ block }: { block: StepsBlock }) {
  return (
    <section aria-label={block.heading} className={section}>
      <div className="max-w-[640px]">
        {block.eyebrow ? <p className={eyebrowCls}>{block.eyebrow}</p> : null}
        <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
        {block.text ? <p className="mt-3 text-[15px] text-muted md:text-base">{block.text}</p> : null}
      </div>
      <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
        {block.steps.map((s, i) => (
          <li key={s.title} className="border-t border-ink/15 pt-5">
            <span className="font-display text-3xl text-teal-deep">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-display text-lg leading-snug">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.65] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LocationSection({ block, settings }: { block: LocationBlock; settings: SiteSettings }) {
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;
  return (
    <section aria-label="Location and hours" className={section}>
      <div className="rounded-3xl bg-white px-6 py-9 md:px-12 md:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          <div>
            <p className={eyebrowCls}>{block.eyebrow ?? "Visit Us"}</p>
            <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
            {block.text ? <p className="mt-3 text-[15px] text-muted md:text-base">{block.text}</p> : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {settings.mapsUrl ? <Button href={settings.mapsUrl}>Get Directions</Button> : null}
              <Button href="/appointment/" variant="outline">Book An Appointment</Button>
            </div>
          </div>
          <ul className="grid gap-5 self-center text-[15px]">
            <li className="flex gap-3"><Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" /><span>{address}</span></li>
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" /><a href={settings.phoneHref} data-track="click_to_call" className="underline-offset-2 hover:underline">{settings.phone}</a></li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
              <span>{settings.hours.map((h) => <span key={h.label} className="block"><b className="font-semibold">{h.label}:</b> {h.value}</span>)}</span>
            </li>
            <li className="text-sm text-muted">Serving {block.areas.join(", ")}.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function DoctorSection({ block }: { block: DoctorBlock }) {
  return (
    <section aria-label={block.heading} className={section}>
      <div className="grid items-center gap-8 rounded-3xl bg-white p-6 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12 md:p-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl md:max-w-none">
          <Image src={block.image.src} alt={block.image.alt} fill sizes="260px" className="object-cover object-top" />
        </div>
        <div>
          <p className={eyebrowCls}>{block.eyebrow ?? "Meet Your Dentist"}</p>
          <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
          <RichText value={block.text} className="mt-4 text-[15px] md:text-base" />
          <ul className="mt-5 grid gap-3">
            {block.points.slice(0, 3).map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] leading-snug"><Check />{p}</li>
            ))}
          </ul>
          {block.cta ? <div className="mt-6"><Button href={block.cta.href} variant="outline">{block.cta.label}</Button></div> : null}
        </div>
      </div>
    </section>
  );
}

export function GallerySection({ block }: { block: GalleryBlock }) {
  return (
    <section aria-label={block.heading} className={section}>
      <div className="max-w-[640px]">
        {block.eyebrow ? <p className={eyebrowCls}>{block.eyebrow}</p> : null}
        <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
        {block.text ? <p className="mt-3 text-[15px] text-muted md:text-base">{block.text}</p> : null}
      </div>
      <ul className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {block.images.map((im) => (
          <li key={im.src} className="overflow-hidden rounded-2xl bg-white">
            <Image src={im.src} alt={im.alt} width={im.width ?? 1000} height={im.height ?? 800} sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw" className="h-auto w-full" />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">Patients of Dr. Jiveh, shown with their permission. Every smile is different, and your results will depend on your teeth, gums and health.</p>
    </section>
  );
}

export function CtaBandSection({ block, settings }: { block: CtaBandBlock; settings: SiteSettings }) {
  return (
    <section aria-label={block.heading} className="container-x py-8 md:py-14">
      <div className="rounded-3xl bg-navy px-6 py-12 text-center md:px-16 md:py-16">
        <h2 className="mx-auto max-w-[720px] text-[1.6rem] leading-[1.2] text-white md:text-[2.25rem]">{block.heading}</h2>
        {block.text ? <p className="mx-auto mt-3 max-w-[560px] text-[15px] text-white/85 md:text-base">{block.text}</p> : null}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {block.ctas.map((c) => <Button key={c.href} href={c.href}>{c.label}</Button>)}
          <Button href={settings.phoneHref} variant="white" arrow={false}>Call {settings.phone}</Button>
        </div>
      </div>
    </section>
  );
}

/** A readable column of text with sub-headings: the part of the page that answers the questions patients ask. */
export function ProseSection({ block }: { block: ProseBlock }) {
  return (
    <section aria-label={block.heading} className={section}>
      <div className="mx-auto max-w-[820px]">
        {block.eyebrow ? <p className={eyebrowCls}>{block.eyebrow}</p> : null}
        <h2 className="mt-3 text-[1.6rem] leading-[1.2] md:text-[2.25rem]">{block.heading}</h2>
        <RichText value={block.text} className="mt-5 text-[15px] leading-[1.8] md:text-base md:leading-[1.8] [&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:font-display [&_h4]:text-xl" />
      </div>
    </section>
  );
}
