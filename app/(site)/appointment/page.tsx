import type { Metadata } from "next";
import { Clock4, Mail, MapPin, Phone } from "lucide-react";
import { getAppointment, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { GhlFormEmbed } from "@/components/forms/GhlFormEmbed";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getAppointment()).seo, "/appointment/");
}

function Row({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-[#8a99ad]">{icon}</span>
      <div>
        <p className="font-display text-[17px] font-bold leading-snug">{title}</p>
        <div className="text-[15px] leading-[1.5] text-[#444]">{children}</div>
      </div>
    </div>
  );
}

export default async function AppointmentPage() {
  const [page, s] = await Promise.all([getAppointment(), getSiteSettings()]);
  const address = `${s.street}, ${s.city}, ${s.region} ${s.postalCode}`;
  const ghl = page.ghlFormId && page.ghlFormId.toLowerCase() !== "off" ? page.ghlFormId.trim() : "";
  return (
    <section className="container-x grid gap-5 py-[25px] lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <JsonLd data={breadcrumbSchema([{ name: "Book An Appointment", path: "/appointment/" }])} />
      <div className="card self-start px-5 py-8 md:p-[30px]">
        <h1 className="text-[28px] leading-[1.2] md:text-[40px]">{page.heading}</h1>
        {page.text ? <p className="mt-3 text-[15px]">{page.text}</p> : null}
        {ghl ? (
          <div className="mx-auto mt-6 max-w-[500px]">
            <GhlFormEmbed formId={ghl} />
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-[500px] rounded-lg bg-white px-5 py-6 shadow-[0_2px_14px_rgb(16_24_40/0.12)] md:px-[18px]">
            <AppointmentForm phone={s.phone} phoneHref={s.phoneHref} practice={s.name} />
          </div>
        )}
        {page.formNote ? <p className="mt-6 text-[15px] italic text-[#555]">{page.formNote}</p> : null}
      </div>
      <div className="grid content-start gap-5">
        <div className="card px-5 py-8 md:p-[30px]">
          <h2 className="text-[28px] leading-[1.2] md:text-[40px]">{page.contactHeading}</h2>
          {page.contactText ? <p className="mt-3 text-[15px]">{page.contactText}</p> : null}
          <div className="mt-6 grid gap-5">
            <Row icon={<Phone className="h-5 w-5" strokeWidth={1.5} />} title="Phone number">
              <a href={s.phoneHref} data-track="click_to_call" className="hover:text-teal-deep">
                {s.phone}
              </a>
            </Row>
            <Row icon={<Mail className="h-5 w-5" strokeWidth={1.5} />} title="Email Address">
              <a href={`mailto:${s.email}`} className="hover:text-teal-deep">
                {s.email}
              </a>
            </Row>
            <Row icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />} title="Location">
              {address}
            </Row>
            <Row icon={<Clock4 className="h-5 w-5" strokeWidth={1.5} />} title="Working Hours">
              {s.hours.map((h) => (
                <p key={h.label} className="text-sm">
                  <strong className="font-semibold text-ink">{h.label}:</strong> {h.value}
                </p>
              ))}
            </Row>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] bg-white p-1">
          <iframe
            title={`Map: ${address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=17&output=embed&iwloc=near`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[350px] w-full rounded-[16px] border-0"
          />
        </div>
      </div>
    </section>
  );
}
