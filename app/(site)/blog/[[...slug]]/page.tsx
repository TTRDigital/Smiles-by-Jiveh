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
    <section className="container-x py-[25px]">
      <div className="card px-5 py-10 md:p-[50px]">
        <h1 className="text-[32px] leading-[1.2] md:text-[45px]">Blog</h1>
        {posts.length ? (
          <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`} className="group block">
                  {p.image ? (
                    <span className="relative block aspect-[16/10] overflow-hidden rounded-[15px]">
                      <Image src={p.image.src} alt={p.image.alt || p.title} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                  ) : null}
                  <span className="mt-4 block font-display text-xl font-bold group-hover:text-teal-deep">{p.title}</span>
                  {p.excerpt ? <span className="mt-2 block text-[15px] text-muted">{p.excerpt}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[15px]">Articles are coming soon.</p>
        )}
      </div>
    </section>
  );
}
