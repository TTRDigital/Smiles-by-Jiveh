import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PostArticle } from "@/components/blog/PostArticle";

/*
 * Signed draft preview of one blog post, Vercel builds only (*.vercel.tsx).
 * proxy.vercel.ts sends /blog/<url>/ here while draft mode is on (turned on
 * only by a correctly signed /api/preview link), so a draft that was never
 * published or prerendered, such as TTR OS's /blog/ttr-os-staging-check/,
 * opens at its real address. getPosts() reads drafts uncached in draft mode
 * (lib/sanity/fetch.ts). Without draft mode, or for a slug that is not a
 * post, this answers 404. Its metadata is the live post's (same title,
 * description, canonical and robots), so the preview matches what goes live;
 * no noindex is needed because only a signed link can open it.
 */
export const dynamic = "force-dynamic";

async function findDraftPost(slug: string) {
  if (!(await draftMode()).isEnabled) return null;
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

// Same as the live post in app/(site)/blog/[[...slug]]/page.tsx.
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await findDraftPost((await props.params).slug);
  if (!post) return {};
  return pageMetadata(post.seo?.title ? post.seo : { title: `${post.title} - Smiles By Jiveh`, description: post.excerpt ?? "" }, `/blog/${post.slug}/`, post.image);
}

export default async function BlogDraftPreview(props: { params: Promise<{ slug: string }> }) {
  const post = await findDraftPost((await props.params).slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
