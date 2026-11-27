import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { HomeContent, SiteSettings } from "@/lib/types";
import { richLength } from "@/lib/rich";
import { ContactForm } from "@/components/forms/ContactForm";
import { GhlFormEmbed } from "@/components/forms/GhlFormEmbed";
import { Button } from "@/components/ui/Button";
import { Accent, Display } from "@/components/ui/Display";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ReadMore } from "@/components/ui/ReadMore";
import { RichText } from "@/components/ui/RichText";
import { images } from "@/lib/data/images";
import { Slider } from "@/components/ui/Slider";
import { HeroVideo } from "@/components/home/HeroVideo";

/**
 * Full-bleed banner: the muted video (desktop) or the photo fills the whole
 * section behind the headline, with a dark fade on the left where the text
 * sits so it stays readable. On phones the video never loads; the photo sits
 * above the text so nothing covers anyone's face.
 */
/** A second banner button that repeats the first one's link ("Learn More" -> /appointment/ in the old content) goes to Who We Are instead. */
const heroHref = (ctas: HomeContent["hero"]["ctas"], i: number) =>
  i > 0 && ctas.slice(0, i).some((c) => c.href === ctas[i].href) ? "/who-we-are/" : ctas[i].href;

export function HomeHero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-spruce text-ivory">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image src={hero.image.src} alt={hero.image.alt ?? ""} fill priority fetchPriority="high" sizes="100vw" className="-z-20 object-cover" />
        <HeroVideo url={hero.videoUrl} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,#172e30_0%,rgb(23_46_48/0)_45%)] lg:bg-[linear-gradient(to_right,rgb(16_33_34/0.95)_0%,rgb(16_33_34/0.88)_40%,rgb(16_33_34/0.45)_60%,rgb(16_33_34/0)_80%)] xl:bg-[linear-gradient(to_right,rgb(16_33_34/0.94)_0%,rgb(16_33_34/0.84)_36%,rgb(16_33_34/0.38)_56%,rgb(16_33_34/0)_76%)"
        />
      </div>
      <div className="container-x relative pb-12 pt-6 md:pb-16 md:pt-10 lg:flex lg:min-h-[clamp(600px,calc(100svh-122px),780px)] lg:flex-col lg:justify-end lg:pb-20 lg:pt-32">
        <div className="max-w-[620px] lg:max-w-[480px] xl:max-w-[620px]">
          <h1 className="text-[40px] font-light leading-[1.05] tracking-[-0.015em] text-white sm:text-[54px] lg:text-[54px] xl:text-[70px]">
            <Accent text={hero.heading} />
          </h1>
          <span aria-hidden="true" className="mt-7 block h-px w-20 bg-sand/70 lg:mt-9" />
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.75] text-ivory/90 lg:text-[17px]">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-10">
            {hero.ctas.map((c, i) => (
              <Button key={c.label} href={heroHref(hero.ctas, i)} variant={i ? "light" : "white"} bold arrow={!i} className="w-full sm:w-auto sm:min-w-[210px]">
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const introTones = [
  { card: "bg-mist", icon: "bg-white text-teal", title: "", text: "text-body", num: "text-teal/25" },
  { card: "on-dark bg-spruce", icon: "bg-white/10 text-sand", title: "text-white", text: "text-ivory/80", num: "text-sand/30" },
  { card: "bg-cream", icon: "bg-white text-sand-deep", title: "", text: "text-body", num: "text-sand-deep/25" },
];

/** Three colour-blocked cards; on phones they swipe sideways instead of stacking into a long column. */
export function HomeIntro({ intro }: { intro: HomeContent["intro"] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-[920px] text-center">
          <Pill centered>{intro.eyebrow}</Pill>
          <div data-reveal="up">
            <Display text={intro.heading} className="mt-6 text-[30px] leading-[1.15] md:text-[48px] md:leading-[1.1]" />
          </div>
        </div>
        {/* tabIndex: on phones and tablets the row scrolls sideways, so keyboard users can focus it and use the arrow keys. */}
        <ul
          tabIndex={0}
          aria-label={intro.eyebrow || intro.heading}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 md:mt-16 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {intro.cards.map((c, i) => {
            const t = introTones[i % introTones.length];
            return (
              <li
                key={c.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                className={`relative w-[80%] shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] p-8 transition-transform duration-500 hover:-translate-y-1 md:w-[44%] md:p-10 lg:w-auto ${t.card}`}
              >
                {/* Decorative numeral, drawn by CSS so it is not text. */}
                <span
                  aria-hidden="true"
                  data-num={String(i + 1).padStart(2, "0")}
                  className={`pointer-events-none absolute right-6 top-5 font-display text-[64px] font-light leading-none before:content-[attr(data-num)] md:right-8 md:top-7 ${t.num}`}
                />
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_24px_-14px_rgb(23_46_48/0.5)] ${t.icon}`}>
                  <Icon name={c.icon} className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className={`relative mt-10 text-[25px] leading-[1.2] md:text-[27px] ${t.title}`}>{c.title}</h3>
                <p className={`relative mt-3 text-[15px] leading-[1.7] ${t.text}`}>{c.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function HomeAbout({ about }: { about: HomeContent["about"] }) {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div className="lg:order-2">
          <span aria-hidden="true" className="mb-7 block h-px w-14 bg-sand-deep/50" />
          <Display text={about.heading} className="text-[30px] leading-[1.12] md:text-[44px]" />
          <ReadMore fold={richLength(about.text) > 420} height={190} className="mt-6 md:mt-8">
            <RichText value={about.text} className="text-[15px] leading-[1.8] md:text-base" />
          </ReadMore>
          {about.cta ? (
            <div className="mt-8 md:mt-10">
              <Button href={about.cta.href}>{about.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative w-full max-w-[560px] justify-self-center lg:order-1 lg:max-w-none lg:justify-self-stretch">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] lg:aspect-[6/7]">
            <Image src={about.image.src} alt={about.image.alt || about.heading} fill sizes="(min-width: 1340px) 680px, (min-width: 1024px) 52vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Photo cards: the photo stays clear, the title and a short description sit under it; arrows sit under the row. */
export function HomeServices({ services }: { services: HomeContent["services"] }) {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <Display text={services.heading} className="text-[30px] leading-[1.12] md:text-[48px]" />
          {services.text ? (
            <ReadMore fold={services.text.length > 240} height={112}>
              <p className="text-[15px] leading-[1.8] text-body">{services.text}</p>
            </ReadMore>
          ) : null}
        </div>
        <div data-reveal="up" className="mt-10 md:mt-14">
          <Slider label="Our services" slide="basis-[82%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]" gap="gap-5 md:gap-6" autoplay={5000} arrows="below">
            {services.slides.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_24px_50px_-36px_rgb(23_46_48/0.45)] transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="relative block aspect-[6/5] overflow-hidden">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt || s.title}
                    fill
                    sizes="(min-width: 1340px) 430px, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 85vw"
                    className="object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="flex items-start justify-between gap-3">
                    <span className="block font-display text-[23px] leading-[1.2] text-ink md:text-[25px]">{s.title}</span>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="mt-3 line-clamp-3 text-[14px] leading-[1.7] text-muted">{s.text}</span>
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
    <section className="py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <Pill>{doctor.eyebrow}</Pill>
          <Display text={doctor.heading} className="mt-6 text-[30px] leading-[1.12] md:text-[44px]" />
          <ReadMore fold={richLength(doctor.text) > 380} height={165} className="mt-6">
            <RichText value={doctor.text} className="text-[15px] leading-[1.8] md:text-base" />
          </ReadMore>
          <ul className="mt-8 grid gap-3">
            {doctor.highlights.map((h, i) => (
              <li key={h} className="flex gap-4 rounded-[18px] bg-mist px-5 py-4 text-[14.5px] leading-[1.6] text-body">
                <span aria-hidden="true" className="font-display text-[22px] font-light leading-none text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h}
              </li>
            ))}
          </ul>
          {doctor.cta ? (
            <div className="mt-9">
              <Button href={doctor.cta.href}>{doctor.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative w-full max-w-[480px] justify-self-center lg:max-w-none lg:justify-self-stretch">
          {/* The portrait is a cut-out on white: a soft teal panel behind it instead of a white box. */}
          <div className="relative aspect-[588/736] overflow-hidden rounded-[var(--radius-panel)] bg-[radial-gradient(120%_90%_at_50%_30%,#ffffff_0%,#eaf1f0_70%)] [&_img]:mix-blend-multiply">
            <Image src={doctor.image.src} alt={doctor.image.alt || doctor.heading} fill sizes="(min-width: 1340px) 560px, (min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dark band so the results stand out; on phones the photos swipe sideways. */
export function HomeBeforeAfter({ data }: { data: HomeContent["beforeAfter"] }) {
  return (
    <section className="on-dark bg-spruce py-20 text-ivory md:py-28">
      <div className="container-x">
        <div className="text-center">
          <Pill centered>{data.eyebrow}</Pill>
          <Display text={data.heading} className="mt-6 text-[34px] leading-[1.1] text-white md:text-[56px]" statementClassName="md:text-[50px]!" />
        </div>
        <ul
          data-reveal="up"
          tabIndex={0}
          aria-label={data.heading}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {data.images.map((img) => (
            <li key={img.src} className="relative aspect-[1080/1350] w-[72%] shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] sm:w-auto">
              <Image src={img.src} alt={img.alt || data.heading} fill sizes="(min-width: 1340px) 310px, (min-width: 1024px) 24vw, (min-width: 640px) 50vw, 75vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Closing call to action on the dark band. The band's photo is a pale, teal-tinted overlay graphic, so it is used as
 * a faint texture behind the text rather than shown as a photo.
 */
export function HomeCtaBand({ band }: { band: HomeContent["ctaBand"] }) {
  return (
    <section className="py-6 md:py-10">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-spruce text-ivory">
          {band.image ? (
            <Image src={band.image.src} alt={band.image.alt || images.ctaBand.alt} fill sizes="(min-width: 1340px) 1296px, 100vw" className="-z-10 object-cover opacity-[0.16] mix-blend-luminosity" />
          ) : null}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_50%_100%,rgb(129_165_172/0.25),transparent_70%)]" />
          <div className="flex flex-col items-center px-6 py-14 text-center md:px-12 md:py-20">
            <Display text={band.heading} className="max-w-[820px] text-[30px] leading-[1.12] text-white md:text-[44px] lg:text-[52px] lg:leading-[1.06]" />
            {band.text ? <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-ivory/85 md:mt-6 md:text-[16px]">{band.text}</p> : null}
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              {band.ctas.map((c, i) => (
                <Button key={c.label} href={c.href} variant={i ? "light" : "white"} arrow={!i} bold className="w-full sm:w-auto">
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dark inquiry band with the GoHighLevel form in a white card. */
export function HomeContact({ contact, settings }: { contact: HomeContent["contact"]; settings: SiteSettings }) {
  const ghl = contact.ghlFormId && contact.ghlFormId.toLowerCase() !== "off" ? contact.ghlFormId.trim() : "";
  return (
    <section id="contact" aria-label={contact.heading} className="on-dark bg-spruce py-20 text-ivory md:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32">
          <Pill>{contact.eyebrow}</Pill>
          <Display text={contact.heading} className="mt-6 text-[40px] leading-[1.05] text-white" statementClassName="md:text-[56px]! lg:text-[44px]! xl:text-[56px]!" />
          <span aria-hidden="true" className="mt-7 block h-px w-20 bg-sand/60" />
          {contact.lead ? <p className="mt-7 font-display text-[24px] font-light italic leading-[1.35] text-sand md:text-[28px]">{contact.lead}</p> : null}
          {contact.text ? <p className="mt-4 max-w-[480px] text-[15px] leading-[1.8] text-ivory/80 md:text-base">{contact.text}</p> : null}
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href={settings.phoneHref} data-track="click_to_call" className="group flex items-center gap-4 rounded-[18px] bg-white/[0.06] px-4 py-3.5 text-ivory transition-colors hover:bg-white/10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-spruce">
                <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-display text-[22px] font-light">{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="group flex items-center gap-4 rounded-[18px] bg-white/[0.06] px-4 py-3.5 text-ivory transition-colors hover:bg-white/10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-spruce">
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-[15px]">{settings.email}</span>
            </a>
          </div>
        </div>
        <div>
          {/* GoHighLevel draws its own white card; ours only rounds and clips it. */}
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-white text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
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
