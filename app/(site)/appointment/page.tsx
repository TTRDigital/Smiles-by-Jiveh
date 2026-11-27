import type { Metadata } from "next";
import { Clock4, Mail, MapPin, Phone } from "lucide-react";
import { getAppointment, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd, SeoSchema } from "@/components/ui/JsonLd";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { GhlFormEmbed } from "@/components/forms/GhlFormEmbed";
import { Display } from "@/components/ui/Display";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getAppointment()).seo, "/appointment/");
}

function Row({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5 border-t border-white/12 py-6 first:border-t-0 first:pt-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-sand">{icon}</span>
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-sand">{title}</p>
        <div className="mt-2 text-[15px] leading-[1.6] text-ivory/90">{children}</div>
      </div>
    </div>
  );
}

export default async function AppointmentPage() {
  const [page, s] = await Promise.all([getAppointment(), getSiteSettings()]);
  const address = `${s.street}, ${s.city}, ${s.region} ${s.postalCode}`;
  const ghl = page.ghlFormId && page.ghlFormId.toLowerCase() !== "off" ? page.ghlFormId.trim() : "";
  return (
    <section className="container-x grid gap-8 pb-24 pt-8 md:pt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
      <SeoSchema seo={page.seo} />
      <JsonLd data={breadcrumbSchema([{ name: "Book An Appointment", path: "/appointment/" }])} />
      <div className="self-start">
        <Display as="h1" text={page.heading} className="text-[40px] leading-[1.06] md:text-[60px]" statementClassName="md:text-[54px]!" />
        <span aria-hidden="true" className="mt-7 block h-px w-20 bg-sand-deep/45" />
        {page.text ? <p className="mt-6 max-w-[620px] text-[15px] leading-[1.8] md:text-[16.5px]">{page.text}</p> : null}
        <div className={`mt-8 ${ghl ? "" : "rounded-[var(--radius-card)] bg-white p-3 shadow-[0_40px_80px_-50px_rgb(23_46_48/0.45)] sm:p-6 md:p-8"}`}>
          {ghl ? (
            // GoHighLevel's script takes the iframe out of the layout while the form loads, which used to collapse this card and
            // push everything below it back down (layout shift 0.57). 859px is the height it sizes this form to at every width.
            // GoHighLevel draws its own white card around the form, so it gets no second card here.
            <div className="mx-auto min-h-[859px] max-w-[500px] lg:mx-0">
              <GhlFormEmbed formId={ghl} height={859} eager />
            </div>
          ) : (
            <div className="mx-auto max-w-[560px] px-2 py-3">
              <AppointmentForm phone={s.phone} phoneHref={s.phoneHref} practice={s.name} />
            </div>
          )}
        </div>
        {page.formNote ? <p className="mt-6 text-[14.5px] italic leading-[1.7] text-muted">{page.formNote}</p> : null}
      </div>
      <div className="grid content-start gap-4 lg:sticky lg:top-32">
        <div className="on-dark rounded-[var(--radius-card)] bg-spruce px-6 py-10 text-ivory md:px-10 md:py-12">
          <Display text={page.contactHeading} className="text-[32px] leading-[1.1] text-white md:text-[40px]" statementClassName="md:text-[36px]!" />
          {page.contactText ? <p className="mt-4 text-[15px] leading-[1.8] text-ivory/80">{page.contactText}</p> : null}
          <div className="mt-9">
            <Row icon={<Phone className="h-4 w-4" strokeWidth={1.5} />} title="Phone number">
              <a href={s.phoneHref} data-track="click_to_call" className="inline-block py-1 font-display text-[22px] font-light text-white hover:text-sand">
                {s.phone}
              </a>
            </Row>
            <Row icon={<Mail className="h-4 w-4" strokeWidth={1.5} />} title="Email Address">
              <a href={`mailto:${s.email}`} className="inline-block py-1 hover:text-sand">
                {s.email}
              </a>
            </Row>
            <Row icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />} title="Location">
              {address}
            </Row>
            <Row icon={<Clock4 className="h-4 w-4" strokeWidth={1.5} />} title="Working Hours">
              {s.hours.map((h) => (
                <p key={h.label} className="text-sm leading-[1.8]">
                  <strong className="font-semibold text-white">{h.label}:</strong> {h.value}
                </p>
              ))}
            </Row>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-1.5">
          <iframe
            title={`Map: ${address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=17&output=embed&iwloc=near`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full rounded-[22px] border-0 grayscale-[0.35]"
          />
        </div>
      </div>
    </section>
  );
}
