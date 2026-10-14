import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShared, getSiteSettings, getTestimonials, getTreatment, getTreatments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, treatmentSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Blocks } from "@/components/sections/Blocks";

/* Every treatment page lives at the site root (/dental-implants/), as on the old WordPress site. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getTreatments()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const t = await getTreatment(slug);
  if (!t) return {};
  return pageMetadata(t.seo, `/${slug}/`, t.hero.images[0]);
}

const hubs = { general: "/general-dentistry/", cosmetic: "/cosmetic-dentistry/", restorative: "/reconstructive-dentistry/" } as const;
const hubNames = { general: "General Dentistry", cosmetic: "Cosmetic Dentistry", restorative: "Reconstructive Dentistry" } as const;

export default async function TreatmentPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const [t, shared, settings, reviews] = await Promise.all([getTreatment(slug), getShared(), getSiteSettings(), getTestimonials()]);
  if (!t) notFound();
  const path = `/${slug}/`;
  const crumbs =
    hubs[t.category] === path
      ? [{ name: t.title, path }]
      : [
          { name: hubNames[t.category], path: hubs[t.category] },
          { name: t.title, path },
        ];
  return (
    <>
      <JsonLd data={treatmentSchema(t, path)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero hero={t.hero} />
      <Blocks blocks={t.blocks} shared={shared} settings={settings} reviews={reviews} />
    </>
  );
}
