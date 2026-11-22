import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/content";
import { PostArticle } from "@/components/blog/PostArticle";

/*
 * Signed draft preview of one blog post, Vercel builds only (*.vercel.tsx).
 * proxy.vercel.ts sends /blog/<url>/ here while draft mode is on (turned on
 * only by a correctly signed /api/preview link), so a draft that was never
 * published or prerendered, such as TTR OS's /blog/ttr-os-staging-check/,
 * opens at its real address. getPosts() reads drafts uncached in draft mode
 * (lib/sanity/fetch.ts). Without draft mode, or for a slug that is not a
 * post, this answers 404; it is never indexed.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function BlogDraftPreview(props: { params: Promise<{ slug: string }> }) {
  if (!(await draftMode()).isEnabled) notFound();
  const { slug } = await props.params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
