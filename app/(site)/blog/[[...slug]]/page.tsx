import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PostArticle } from "@/components/blog/PostArticle";

/*
 * Blog: /blog/ lists the posts published in /cms > Blog posts, /blog/<url>/
 * shows one. The old site had no posts, so until the first one is published
 * the list page is hidden from search engines and not in the menu or sitemap.
 *
 * Only prerendered posts exist here (the static export needs that). In draft
 * mode on Vercel, proxy.vercel.ts sends /blog/<url>/ to blog-draft-preview,
 * which can also open a draft that was never published.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return [{ slug: [] }, ...posts.map((p) => ({ slug: [p.slug] }))];
}

export async function generateMetadata(props: PageProps<"/blog/[[...slug]]">): Promise<Metadata> {
  const { slug } = await props.params;
  const posts = await getPosts();
  if (!slug?.length)
    return pageMetadata(
      { title: "Blog - Smiles By Jiveh", description: "News and dental health articles from Smiles By Jiveh in Royal Palm Beach, FL.", noIndex: !posts.length },
      "/blog/",
    );
  const post = posts.find((p) => p.slug === slug[0]);
  if (!post) return {};
  return pageMetadata(post.seo?.title ? post.seo : { title: `${post.title} - Smiles By Jiveh`, description: post.excerpt ?? "" }, `/blog/${post.slug}/`, post.image);
}

export default async function BlogPage(props: PageProps<"/blog/[[...slug]]">) {
  const { slug } = await props.params;
  const posts = await getPosts();

  if (slug?.length) {
    const post = posts.find((p) => p.slug === slug[0]);
    if (!post) notFound();
    return <PostArticle post={post} />;
  }

  return (
    <section className="container-x pb-24 pt-10 md:pb-32 md:pt-16">
      <div>
        <h1 className="statement text-[44px] md:text-[64px]">Blog</h1>
        <span aria-hidden="true" className="mt-8 block h-px w-20 bg-sand-deep/45" />
        {posts.length ? (
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`} className="group block">
                  {p.image ? (
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                      <Image src={p.image.src} alt={p.image.alt || p.title} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                  ) : null}
                  <span className="mt-6 block font-display text-[26px] leading-[1.2] text-ink transition-colors group-hover:text-teal-deep">{p.title}</span>
                  {p.excerpt ? <span className="mt-3 block text-[15px] leading-[1.75] text-muted">{p.excerpt}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 font-display text-[24px] font-light italic text-sand-deep">Articles are coming soon.</p>
        )}
      </div>
    </section>
  );
}
