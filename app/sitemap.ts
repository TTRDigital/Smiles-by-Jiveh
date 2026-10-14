import type { MetadataRoute } from "next";
import { getPosts, getTreatments } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treatments, posts] = await Promise.all([getTreatments(), getPosts()]);
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: absoluteUrl(path), changeFrequency, priority });
  return [
    entry("/", 1, "weekly"),
    entry("/who-we-are/", 0.8),
    entry("/meet-dr-jiveh/", 0.8),
    entry("/insurance-payment-options/", 0.7),
    entry("/appointment/", 0.9),
    ...treatments.map((t) => entry(`/${t.slug}/`, ["general-dentistry", "cosmetic-dentistry", "reconstructive-dentistry"].includes(t.slug) ? 0.9 : 0.8)),
    ...(posts.length ? [entry("/blog/", 0.5, "weekly"), ...posts.map((p) => ({ ...entry(`/blog/${p.slug}/`, 0.5), lastModified: p.date }))] : []),
    entry("/privacy-policy/", 0.1, "yearly"),
  ];
}
