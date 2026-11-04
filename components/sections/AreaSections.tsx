import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type {
  CtaBandBlock, DoctorBlock, FeatureBlock, GalleryBlock, ImageCardsBlock, LocationBlock, PageHeroContent, SiteSettings, StatsBlock, StepsBlock,
} from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";

/*
 * Richer sections for the service area pages: a full-width photo hero, a trust strip, photo cards that link to the
 * treatments, feature sections with photos, steps, a location card, the doctor, a gallery and a closing band.
 * Same colors, fonts and corners as the rest of the site.
 */

const wrap = "container-x mb-[25px]";

export function AreaHero({ hero, settings }: { hero: PageHeroContent; settings: SiteSettings }) {
  const img = hero.images[0];
  return (
    <section className="container-x mb-[25px] pt-[25px]">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-navy">
        {img ? <Image src={img.src} alt={img.alt || hero.heading} fill priority fetchPriority="high" sizes="(min-width: 1296px) 1296px, 100vw" className="-z-20 object-cover" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/60 to-navy/20 lg:bg-gradient-to-r lg:from-navy/90 lg:via-navy/65 lg:to-navy/5" />
        <div className="flex min-h-[560px] flex-col justify-end px-6 py-10 sm:px-10 md:min-h-[600px] md:py-14 lg:max-w-[760px] lg:justify-center lg:px-14">
          <Pill white className="self-start">{hero.eyebrow}</Pill>
          <h1 className="mt-5 text-[1.9rem] leading-[1.15] text-white md:text-[3rem]">{hero.heading}</h1>
          <RichText value={hero.text} className="mt-5 max-w-[620px] text-[15px] text-white/90 md:text-lg [&_p]:mb-3" />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hero.cta ? <Button href={hero.cta.href}>{hero.cta.label}</Button> : null}
            <Button href={settings.phoneHref} variant="white" arrow={false}>
              Call {settings.phone}
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            {settings.googleRating ? (
              <li className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" aria-hidden="true" />
                {settings.googleRating} on Google{settings.reviewCount ? ` (${settings.reviewCount} reviews)` : ""}
              </li>
            ) : null}
            <li className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-white" strokeWidth={3} />Serving patients since 1997</li>
            <li className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-white" strokeWidth={3} />Complimentary consultations</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ block, settings }: { block: StatsBlock; settings: SiteSettings }) {
  const val = (i: StatsBlock["items"][number]) => (i.source === "rating" ? String(settings.googleRating ?? i.value) : i.source === "reviews" ? String(settings.reviewCount ?? i.value) : i.value);
  return (
    <section aria-label="At a glance" className={wrap}>
      <div className="card grid grid-cols-2 divide-line px-2 py-6 md:grid-cols-4 md:divide-x md:py-8">
        {block.items.map((i) => (
          <div key={i.label} className="px-3 py-3 text-center">
            <p className="font-display text-3xl leading-none text-teal-deep md:text-[2.5rem]">{val(i)}</p>
            <p className="mt-2 text-[13px] leading-snug text-muted md:text-sm">{i.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ImageCardsSection({ block }: { block: ImageCardsBlock }) {
  const cols = block.columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section aria-label={block.heading} className={wrap}>
      <div className="card px-5 py-9 md:p-12">
        <div className="mx-auto max-w-[860px] text-center">
          <Pill>{block.eyebrow}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.25rem]">{block.heading}</h2>
          {block.text ? <p className="mt-4 text-[15px] md:text-base">{block.text}</p> : null}
        </div>
        <ul className={`mt-9 grid gap-5 sm:grid-cols-2 ${cols}`}>
          {block.cards.map((c) => (
            <li key={c.title}>
              <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-card)]">
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image src={c.image.src} alt={c.image.alt || c.title} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-xl leading-snug">{c.title}</span>
                  {c.text ? <span className="mt-2 text-sm leading-[1.6] text-muted">{c.text}</span> : null}
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-teal-deep">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FeatureSection({ block }: { block: FeatureBlock }) {
  return (
    <section aria-label={block.heading} className={wrap}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={`card flex flex-col justify-center px-5 py-8 md:p-12 ${block.reverse ? "lg:order-2" : ""}`}>
          <Pill className="self-start">{block.eyebrow}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.125rem]">{block.heading}</h2>
          <RichText value={block.text} className="mt-5 text-[15px] md:text-base" />
          {block.bullets?.length ? (
            <ul className="mt-6 grid gap-3">
              {block.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>
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
        <div className={`relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] md:min-h-[460px] ${block.reverse ? "lg:order-1" : ""}`}>
          <Image src={block.image.src} alt={block.image.alt || block.heading} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function StepsSection({ block }: { block: StepsBlock }) {
  return (
    <section aria-label={block.heading} className={wrap}>
      <div className="card px-5 py-9 md:p-12">
        <div className="mx-auto max-w-[820px] text-center">
          <Pill>{block.eyebrow}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.25rem]">{block.heading}</h2>
          {block.text ? <p className="mt-4 text-[15px] md:text-base">{block.text}</p> : null}
        </div>
        <ol className="mt-9 grid gap-6 md:grid-cols-3">
          {block.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-mint p-6 pt-9">
              <span className="absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-teal font-display text-xl text-white shadow-[var(--shadow-card)]">{i + 1}</span>
              <h3 className="font-display text-xl leading-snug">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LocationSection({ block, settings }: { block: LocationBlock; settings: SiteSettings }) {
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;
  return (
    <section aria-label="Location and hours" className={wrap}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card px-5 py-8 md:p-12">
          <Pill>{block.eyebrow ?? "Visit Us"}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.125rem]">{block.heading}</h2>
          {block.text ? <p className="mt-4 text-[15px] md:text-base">{block.text}</p> : null}
          <ul className="mt-6 grid gap-4 text-[15px]">
            <li className="flex gap-3"><Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" /><span>{address}</span></li>
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" /><a href={settings.phoneHref} data-track="click_to_call" className="underline-offset-2 hover:underline">{settings.phone}</a></li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
              <span>{settings.hours.map((h) => <span key={h.label} className="block"><b className="font-semibold">{h.label}:</b> {h.value}</span>)}</span>
            </li>
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {settings.mapsUrl ? <Button href={settings.mapsUrl}>Get Directions</Button> : null}
            <Button href="/appointment/" variant="outline">Book An Appointment</Button>
          </div>
        </div>
        <div className="card flex flex-col justify-center bg-gradient-to-br from-mint to-band/60 px-5 py-8 md:p-12">
          <h3 className="font-display text-2xl leading-snug md:text-3xl">Patients come to us from</h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {block.areas.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] shadow-sm">
                <Icon name="map-pin" className="h-4 w-4 text-teal-deep" />{a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-[1.7] text-muted">We are a private, fee for service practice and out of network with insurance plans. We explain your options and any financing at your consultation, so there are no surprises.</p>
        </div>
      </div>
    </section>
  );
}

export function DoctorSection({ block }: { block: DoctorBlock }) {
  return (
    <section aria-label={block.heading} className={wrap}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative min-h-[380px] overflow-hidden rounded-[var(--radius-card)] md:min-h-[520px]">
          <Image src={block.image.src} alt={block.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-top" />
        </div>
        <div className="card flex flex-col justify-center px-5 py-8 md:p-12">
          <Pill className="self-start">{block.eyebrow ?? "Meet Your Dentist"}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.125rem]">{block.heading}</h2>
          <RichText value={block.text} className="mt-5 text-[15px] md:text-base" />
          <ul className="mt-6 grid gap-3">
            {block.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] leading-snug">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>
          {block.cta ? <div className="mt-7"><Button href={block.cta.href} variant="outline">{block.cta.label}</Button></div> : null}
        </div>
      </div>
    </section>
  );
}

export function GallerySection({ block }: { block: GalleryBlock }) {
  return (
    <section aria-label={block.heading} className={wrap}>
      <div className="card px-5 py-9 md:p-12">
        <div className="mx-auto max-w-[820px] text-center">
          <Pill>{block.eyebrow ?? "Real Patients"}</Pill>
          <h2 className="mt-4 text-[1.5rem] leading-[1.25] md:text-[2.25rem]">{block.heading}</h2>
          {block.text ? <p className="mt-4 text-[15px] md:text-base">{block.text}</p> : null}
        </div>
        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.images.map((im) => (
            <li key={im.src} className="overflow-hidden rounded-2xl border border-line bg-white">
              <Image src={im.src} alt={im.alt} width={im.width ?? 1000} height={im.height ?? 800} sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw" className="h-auto w-full" />
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-xs text-muted">Patients of Dr. Jiveh, shown with their permission. Every smile is different, and your results will depend on your teeth, gums and health.</p>
      </div>
    </section>
  );
}

export function CtaBandSection({ block, settings }: { block: CtaBandBlock; settings: SiteSettings }) {
  return (
    <section aria-label={block.heading} className="container-x mb-[25px]">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-navy px-6 py-14 text-center md:px-16 md:py-20">
        <Image src={block.image.src} alt="" fill sizes="(min-width: 1296px) 1296px, 100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-navy/75" />
        <h2 className="mx-auto max-w-[760px] text-[1.6rem] leading-[1.2] text-white md:text-[2.5rem]">{block.heading}</h2>
        {block.text ? <p className="mx-auto mt-4 max-w-[640px] text-[15px] text-white/90 md:text-lg">{block.text}</p> : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {block.ctas.map((c, i) => <Button key={c.href} href={c.href} variant={i === 0 ? "primary" : "white"} arrow={i === 0}>{c.label}</Button>)}
          {block.ctas.length === 1 ? <Button href={settings.phoneHref} variant="white" arrow={false}>Call {settings.phone}</Button> : null}
        </div>
      </div>
    </section>
  );
}
