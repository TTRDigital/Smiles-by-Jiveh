import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { HomeContent, SiteSettings } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { GhlFormEmbed } from "@/components/forms/GhlFormEmbed";
import { Button } from "@/components/ui/Button";
import { Accent, Display } from "@/components/ui/Display";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { images } from "@/lib/data/images";
import { Slider } from "@/components/ui/Slider";
import { HeroVideo } from "@/components/home/HeroVideo";

/**
 * Full-bleed photo (and the muted video on desktop) with the headline at the
 * bottom left. On phones the photo sits on top and the headline overlaps its
 * lower edge, on the dark band.
 */
export function HomeHero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-spruce text-ivory">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:absolute md:inset-0 md:aspect-auto">
        <Image src={hero.image.src} alt={hero.image.alt ?? ""} fill priority fetchPriority="high" sizes="100vw" className="-z-20 object-cover" />
        <HeroVideo url={hero.videoUrl} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,#172e30_0%,rgb(23_46_48/0.55)_28%,rgb(23_46_48/0)_60%)] md:bg-[linear-gradient(to_top,rgb(16_33_34/0.9)_0%,rgb(16_33_34/0.45)_42%,rgb(16_33_34/0.1)_70%),linear-gradient(to_right,rgb(16_33_34/0.6)_0%,rgb(16_33_34/0)_62%)]"
        />
      </div>
      <div className="container-x relative -mt-12 pb-12 sm:-mt-24 md:mt-0 md:flex md:min-h-[clamp(620px,calc(100svh-122px),800px)] md:flex-col md:justify-end md:pb-[88px] md:pt-40">
        <div className="max-w-[880px]">
          <h1 className="text-[40px] font-light leading-[1.04] tracking-[-0.015em] text-white sm:text-[56px] md:text-[78px] lg:text-[88px]">
            <Accent text={hero.heading} />
          </h1>
          <span aria-hidden="true" className="mt-7 block h-px w-24 bg-sand/70 md:mt-9" />
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.75] text-ivory/85 md:mt-7 md:text-[17px]">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
            {hero.ctas.map((c, i) => (
              <Button key={c.label} href={c.href} variant={i ? "light" : "white"} bold arrow={!i} className="w-full sm:w-auto sm:min-w-[220px]">
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeIntro({ intro }: { intro: HomeContent["intro"] }) {
  return (
    <section className="py-20 md:py-[130px]">
      <div className="container-x text-center">
        <Pill centered>{intro.eyebrow}</Pill>
        <div data-reveal="up">
          <Display text={intro.heading} className="mx-auto mt-6 max-w-[1020px] text-[32px] leading-[1.15] md:text-[52px] md:leading-[1.1]" />
        </div>
        <ul className="mt-14 grid border-y border-line text-left md:mt-20 md:grid-cols-3">
          {intro.cards.map((c, i) => (
            <li
              key={c.title}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className={`relative px-1 py-10 md:px-10 md:py-14 ${i ? "border-t border-line md:border-l md:border-t-0" : ""}`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-teal-soft/70 text-teal">
                  <Icon name={c.icon} className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <span aria-hidden="true" className="font-display text-[15px] italic text-sand-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-[26px] leading-[1.2] md:text-[28px]">{c.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeAbout({ about }: { about: HomeContent["about"] }) {
  return (
    <section className="pb-20 md:pb-[130px]">
      <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:gap-24">
        <div>
          <span aria-hidden="true" className="mb-8 block h-px w-14 bg-sand-deep/50" />
          <Display text={about.heading} className="text-[32px] leading-[1.12] md:text-[46px]" />
          <RichText value={about.text} className="mt-7 text-[15px] leading-[1.8] md:mt-9 md:text-base" />
          {about.cta ? (
            <div className="mt-9 md:mt-11">
              <Button href={about.cta.href}>{about.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] md:aspect-[660/760]">
          <Image src={about.image.src} alt={about.image.alt || about.heading} fill sizes="(min-width: 1340px) 680px, (min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function HomeServices({ services }: { services: HomeContent["services"] }) {
  return (
    <section className="bg-cream py-20 md:py-[130px]">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <Display text={services.heading} className="text-[32px] leading-[1.12] md:text-[50px]" />
          {services.text ? <p className="text-[15px] leading-[1.8] text-body md:pb-2 md:text-base">{services.text}</p> : null}
        </div>
        <div data-reveal="up" className="mt-12 md:mt-16">
          <Slider label="Our services" slide="basis-[88%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]" gap="gap-6" autoplay={5000} arrows="glass" arrowTop="120px">
            {services.slides.map((s) => (
              <Link key={s.title} href={s.href} className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-spruce md:block md:aspect-[4/5]">
                <span className="relative block aspect-[4/3] overflow-hidden md:absolute md:inset-0 md:aspect-auto">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt || s.title}
                    fill
                    sizes="(min-width: 1340px) 640px, (min-width: 1024px) 48vw, (min-width: 768px) 75vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="glass relative mx-3 -mt-10 mb-3 block flex-1 p-5 md:absolute md:inset-x-4 md:bottom-4 md:m-0 md:p-6">
                  <span className="flex items-start justify-between gap-3">
                    <span className="block font-display text-[24px] leading-[1.15] text-ink md:text-[26px]">{s.title}</span>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="mt-2.5 block text-[13.5px] leading-[1.65] text-body">{s.text}</span>
                </span>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export function HomeDoctor({ doctor }: { doctor: HomeContent["doctor"] }) {
  return (
    <section className="py-20 md:py-[130px]">
      <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 lg:gap-24">
        <div className="md:order-2">
          <Pill>{doctor.eyebrow}</Pill>
          <Display text={doctor.heading} className="mt-6 text-[32px] leading-[1.12] md:text-[46px]" />
          <RichText value={doctor.text} className="mt-7 text-[15px] leading-[1.8] md:text-base" />
          <ul className="mt-8 grid border-t border-line">
            {doctor.highlights.map((h) => (
              <li key={h} className="flex gap-5 border-b border-line py-4 text-[15px] leading-[1.65] text-body">
                <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-sand-deep" />
                {h}
              </li>
            ))}
          </ul>
          {doctor.cta ? (
            <div className="mt-10">
              <Button href={doctor.cta.href}>{doctor.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="left" className="relative aspect-[588/736] overflow-hidden rounded-[var(--radius-panel)] md:order-1">
          <Image src={doctor.image.src} alt={doctor.image.alt || doctor.heading} fill sizes="(min-width: 1340px) 700px, (min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function HomeBeforeAfter({ data }: { data: HomeContent["beforeAfter"] }) {
  return (
    <section className="pb-20 md:pb-[130px]">
      <div className="container-x">
        <div className="text-center">
          <Pill centered>{data.eyebrow}</Pill>
          <Display text={data.heading} className="mt-6 text-[34px] leading-[1.1] md:text-[56px]" statementClassName="md:text-[50px]" />
        </div>
        <ul data-reveal="up" className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-6">
          {data.images.map((img) => (
            <li key={img.src} className="relative aspect-[1080/1350] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={img.src} alt={img.alt || data.heading} fill sizes="(min-width: 1340px) 310px, (min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Closing band: the photo full-bleed behind the text on desktop; on phones the photo sits above the text. */
export function HomeCtaBand({ band }: { band: HomeContent["ctaBand"] }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-spruce text-ivory">
      {band.image ? (
        <div className="relative aspect-[1935/812] md:absolute md:inset-0 md:aspect-auto">
          <Image src={band.image.src} alt={band.image.alt || images.ctaBand.alt} fill sizes="100vw" className="-z-10 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,#172e30_0%,rgb(23_46_48/0)_55%)] md:bg-[rgb(16_33_34/0.62)]" />
        </div>
      ) : null}
      <div className="container-x relative flex flex-col items-center py-16 text-center md:min-h-[560px] md:justify-center md:py-28">
        <Display text={band.heading} className="max-w-[980px] text-[32px] leading-[1.12] text-white md:text-[58px] md:leading-[1.06]" />
        {band.text ? <p className="mt-6 max-w-[760px] text-[15px] leading-[1.8] text-ivory/85 md:mt-7 md:text-[17px]">{band.text}</p> : null}
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          {band.ctas.map((c, i) => (
            <Button key={c.label} href={c.href} variant={i ? "light" : "white"} arrow={!i} bold className="w-full sm:w-auto sm:min-w-[240px]">
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dark inquiry band with the GoHighLevel form in a white card. */
export function HomeContact({ contact, settings }: { contact: HomeContent["contact"]; settings: SiteSettings }) {
  const ghl = contact.ghlFormId && contact.ghlFormId.toLowerCase() !== "off" ? contact.ghlFormId.trim() : "";
  return (
    <section id="contact" aria-label={contact.heading} className="on-dark bg-spruce py-20 text-ivory md:py-[120px]">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32">
          <Pill>{contact.eyebrow}</Pill>
          <Display text={contact.heading} className="mt-6 text-[40px] leading-[1.05] text-white md:text-[64px]" statementClassName="md:text-[56px]" />
          <span aria-hidden="true" className="mt-8 block h-px w-24 bg-sand/60" />
          {contact.lead ? <p className="mt-8 font-display text-[24px] font-light italic leading-[1.35] text-sand md:text-[28px]">{contact.lead}</p> : null}
          {contact.text ? <p className="mt-5 max-w-[480px] text-[15px] leading-[1.8] text-ivory/80 md:text-base">{contact.text}</p> : null}
          <div className="mt-10 grid gap-4 border-t border-white/12 pt-8">
            <a href={settings.phoneHref} data-track="click_to_call" className="group flex items-center gap-4 text-ivory transition-colors hover:text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-sand transition-colors group-hover:border-sand">
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="font-display text-[22px] font-light">{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="group flex items-center gap-4 text-ivory transition-colors hover:text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-sand transition-colors group-hover:border-sand">
                <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="text-[15px]">{settings.email}</span>
            </a>
          </div>
        </div>
        <div>
          <div className="rounded-[var(--radius-card)] bg-white p-3 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-5 md:p-7">
            {ghl ? (
              // GoHighLevel's script takes the iframe out of the layout while the form loads; reserving the height it
              // sizes this form to keeps everything below from jumping.
              <div className="min-h-[859px]">
                <GhlFormEmbed formId={ghl} height={859} />
              </div>
            ) : (
              <ContactForm phone={settings.phone} phoneHref={settings.phoneHref} practice={settings.name} />
            )}
          </div>
          {contact.formNote ? <p className="mt-6 text-[14px] italic leading-[1.7] text-ivory/75">{contact.formNote}</p> : null}
        </div>
      </div>
    </section>
  );
}
