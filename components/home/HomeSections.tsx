import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { HomeContent, SiteSettings } from "@/lib/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";
import { Slider } from "@/components/ui/Slider";
import { HeroVideo } from "@/components/home/HeroVideo";

export function HomeHero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f9f9f9]">
      <Image src={hero.image.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <HeroVideo url={hero.videoUrl} />
      {/* White from the left, as on the old site, so the text stays readable over the video. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(270deg,#ffffff00_0%,#fffffffa_65%)]" />
      <div className="container-x relative py-10 md:py-[150px]">
        <div className="max-w-[713px]">
          <h1 className="text-[25px] font-extrabold leading-[1.3] text-hero md:text-[52px]">{hero.heading}</h1>
          <p className="mt-6 text-[15px] leading-[1.6] text-hero md:mt-[30px] md:text-lg">{hero.text}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-5 md:mt-[30px]">
            {hero.ctas.map((c, i) => (
              <Button key={c.label} href={c.href} variant={i ? "sand" : "primary"} bold arrow={!i} className="w-full sm:w-auto sm:min-w-[199px]">
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
    <section className="bg-white py-[70px] md:py-[100px]">
      <div className="container-x text-center">
        <Pill>{intro.eyebrow}</Pill>
        <h2 className="mx-auto mt-4 max-w-[1100px] text-[25px] leading-[1.4] md:text-[45px]" data-reveal="up">
          {intro.heading}
        </h2>
        <ul className="mt-10 grid gap-5 px-0 md:mt-[50px] md:grid-cols-3 md:gap-10 md:px-2.5">
          {intro.cards.map((c, i) => (
            <li
              key={c.title}
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className="rounded-[15px] bg-white p-[35px] shadow-[var(--shadow-card)]"
            >
              <span className="mx-auto flex h-[97px] w-[97px] items-center justify-center rounded-full bg-icon text-blue ring-[16px] ring-[#f7fafd]/60">
                <span className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#eef2f8]">
                  <Icon name={c.icon} className="h-10 w-10" strokeWidth={1.6} />
                </span>
              </span>
              <h3 className="mt-[25px] text-lg font-extrabold leading-[1.6] text-black md:text-xl">{c.title}</h3>
              <p className="mt-[15px] text-[15px] leading-[1.6] text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeAbout({ about }: { about: HomeContent["about"] }) {
  return (
    <section className="bg-white pb-[60px] md:py-[50px]">
      <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,556fr)_minmax(0,660fr)] md:gap-[60px] lg:gap-[80px]">
        <div className="md:p-2.5">
          <h2 className="text-[25px] leading-[1.2] md:text-[38px]">{about.heading}</h2>
          <RichText value={about.text} className="mt-6 text-[15px] md:mt-[30px] md:text-base" />
          {about.cta ? (
            <div className="mt-8 md:mt-[40px]">
              <Button href={about.cta.href}>{about.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative aspect-[351/400] overflow-hidden rounded-[15px] md:aspect-[660/700] md:rounded-[40px]">
          <Image src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 768px) 660px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function HomeServices({ services }: { services: HomeContent["services"] }) {
  return (
    <section className="bg-mint py-[60px] md:py-[100px]">
      <div className="container-x">
        <div className="mx-auto max-w-[648px] text-center">
          <h2 className="text-[30px] leading-[1.1] md:text-[45px]">{services.heading}</h2>
          {services.text ? <p className="mt-6 text-[15px] leading-[1.75] md:mt-[10px] md:text-base">{services.text}</p> : null}
        </div>
        <div data-reveal="up" className="mt-[30px] md:px-2.5">
          <Slider label="Our services" slide="basis-full md:basis-[calc(50%-15px)] lg:basis-[calc(33.333%-20px)]" autoplay={5000} arrowTop="297px">
            {services.slides.map((s) => (
              <Link key={s.title} href={s.href} className="group block overflow-hidden rounded-[15px] bg-white">
                <span className="relative block h-[350px] overflow-hidden">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 405px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="block px-5 pb-5 pt-[25px] text-center">
                  <span className="block font-display text-xl font-bold leading-[1.5] text-black md:text-[22px]">{s.title}</span>
                  <span className="mt-2.5 block text-[15px] leading-[1.65] text-muted">{s.text}</span>
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
    <section className="bg-white py-[60px] md:py-[100px]">
      <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-[60px] lg:gap-[80px]">
        <div className="md:p-2.5">
          <Pill>{doctor.eyebrow}</Pill>
          <h2 className="mt-5 text-[25px] leading-[1.2] md:text-[38px]">{doctor.heading}</h2>
          <RichText value={doctor.text} className="mt-6 text-[15px] md:text-base" />
          <ul className="mt-6 grid gap-[15px]">
            {doctor.highlights.map((h) => (
              <li key={h} className="flex gap-5 text-[15px] leading-[1.65] text-[#424242]">
                <span aria-hidden="true" className="mt-3 h-[2px] w-3 shrink-0 bg-ink" />
                {h}
              </li>
            ))}
          </ul>
          {doctor.cta ? (
            <div className="mt-[30px]">
              <Button href={doctor.cta.href}>{doctor.cta.label}</Button>
            </div>
          ) : null}
        </div>
        <div data-reveal="right" className="relative aspect-[588/736] overflow-hidden rounded-[25px]">
          <Image src={doctor.image.src} alt={doctor.image.alt} fill sizes="(min-width: 768px) 588px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function HomeBeforeAfter({ data }: { data: HomeContent["beforeAfter"] }) {
  return (
    <section className="bg-white pb-[60px] md:pb-[100px]">
      <div className="container-x text-center">
        <Pill>{data.eyebrow}</Pill>
        <h2 className="mt-5 text-[40px] leading-[1.2] md:text-[60px]">{data.heading}</h2>
        <ul data-reveal="up" className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-[50px] lg:grid-cols-4 lg:gap-[30px] lg:px-2.5">
          {data.images.map((img) => (
            <li key={img.src} className="relative aspect-[1080/1350] overflow-hidden rounded-[20px]">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeCtaBand({ band }: { band: HomeContent["ctaBand"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-band">
      {band.image ? <Image src={band.image.src} alt="" fill sizes="100vw" className="-z-10 object-cover" /> : null}
      <div className="container-x flex min-h-[400px] flex-col items-center justify-center py-16 text-center">
        <h2 className="text-[30px] leading-[1.2] text-white md:text-[50px]">{band.heading}</h2>
        {band.text ? <p className="mt-5 max-w-[930px] text-[15px] leading-[1.75] text-white md:text-lg">{band.text}</p> : null}
        <div className="mt-8 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:gap-5">
          {band.ctas.map((c, i) => (
            <Button
              key={c.label}
              href={c.href}
              variant={i ? "sand" : "white"}
              arrow={!i}
              bold={!!i}
              className={`w-full sm:w-auto ${i ? "sm:min-w-[251px]" : "sm:min-w-[377px] sm:py-[18px]"}`}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeContact({ contact, settings }: { contact: HomeContent["contact"]; settings: SiteSettings }) {
  return (
    <section id="contact" aria-label={contact.heading} className="bg-white py-[60px] md:py-[75px]">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-[150px]">
        <div className="lg:p-2.5">
          <Pill>{contact.eyebrow}</Pill>
          <h2 className="mt-4 text-[30px] leading-[1.2] md:text-[45px]">{contact.heading}</h2>
          <span aria-hidden="true" className="mt-5 block h-[2px] w-1/5 bg-teal" />
          {contact.lead ? <p className="mt-5 text-base font-bold">{contact.lead}</p> : null}
          {contact.text ? <p className="mt-4 text-[15px] leading-[1.75] md:text-base">{contact.text}</p> : null}
          <div className="mt-7 grid gap-3">
            <a href={settings.phoneHref} data-track="click_to_call" className="flex items-center gap-4 hover:text-teal-deep">
              <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-4 hover:text-teal-deep">
              <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              {settings.email}
            </a>
          </div>
        </div>
        <div className="lg:p-2.5">
          <ContactForm phone={settings.phone} phoneHref={settings.phoneHref} practice={settings.name} />
          {contact.formNote ? <p className="mt-5 text-[15px] italic text-[#555]">{contact.formNote}</p> : null}
        </div>
      </div>
    </section>
  );
}
