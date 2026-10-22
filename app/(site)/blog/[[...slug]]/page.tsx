import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getTreatments } from "@/lib/content";
import { postAuthor } from "@/lib/data/posts";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, postSchema } from "@/lib/schema";
import { formatDate } from "@/lib/text";
import type { Post, Treatment } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { RichText } from "@/components/ui/RichText";

/*
 * Blog: /blog/ lists the posts, /blog/<url>/ shows one. Posts come from
 * /cms > Blog posts and from lib/data/posts.ts (built-in posts; a CMS post
 * with the same URL overrides one). Without any post the list page is hidden
 * from search engines and left out of the sitemap; once there is one, /blog/
 * and every post are indexed and in the sitemap (app/sitemap.ts). Each post
 * shows the author's byline with photo, a Related treatment box and an author
 * box, all in the words of /meet-dr-jiveh/. The blog is not in the menu yet.
 */
export const dynamicParams = false;

const blogSeo = {
  title: "Blog by Dr. Jiveh in Royal Palm Beach, FL - Smiles By Jiveh",
  description: "Articles by Dr. Farokh Jiveh on dental implants, All-on-X, veneers and cosmetic dentistry for patients in Royal Palm Beach and Wellington, FL.",
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return [{ slug: [] }, ...posts.map((p) => ({ slug: [p.slug] }))];
}

export async function generateMetadata(props: PageProps<"/blog/[[...slug]]">): Promise<Metadata> {
  const { slug } = await props.params;
  const posts = await getPosts();
  if (!slug?.length) return pageMetadata({ ...blogSeo, noIndex: !posts.length }, "/blog/", posts[0]?.image);
  const post = posts.find((p) => p.slug === slug[0]);
  if (!post) return {};
  return pageMetadata(
    { title: post.seo?.title || `${post.title} - Smiles By Jiveh`, description: post.seo?.description || post.excerpt || "", image: post.seo?.image, noIndex: !!post.seo?.noIndex },
    `/blog/${post.slug}/`,
    post.image,
  );
}

/** The author's name with credentials when the site states them (see postAuthor). */
const authorName = (author: string) => (author === postAuthor.name && postAuthor.credentials ? `${author}, ${postAuthor.credentials}` : author);

/** Under the title: the doctor's photo, "By Dr. Farokh Jiveh" linked to /meet-dr-jiveh/, and the date. */
function Byline({ author, date }: { author: string; date?: string }) {
  const doctor = author === postAuthor.name;
  return (
    <div className="mt-5 flex items-center gap-3 text-[15px] text-muted">
      {doctor ? (
        <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <Image src={postAuthor.image.src} alt="" fill sizes="48px" className="object-cover object-top" />
        </span>
      ) : null}
      <p>
        By{" "}
        {doctor ? (
          <Link href={postAuthor.path} className="font-semibold text-ink hover:text-teal-deep">
            {authorName(author)}
          </Link>
        ) : (
          <span className="font-semibold text-ink">{author}</span>
        )}
        {date ? (
          <>
            {" "}
            <span aria-hidden="true">·</span> <time dateTime={date}>{formatDate(date)}</time>
          </>
        ) : null}
      </p>
    </div>
  );
}

/** The treatment page the post supports, as a box under the article. */
function RelatedTreatment({ service, treatments }: { service?: string; treatments: Treatment[] }) {
  if (!service) return null;
  const t = treatments.find((x) => `/${x.slug}/` === service);
  const title =
    t?.title ??
    service
      .replace(/^\/|\/$/g, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  const image = t?.hero.images[0];
  return (
    <aside aria-label="Related treatment" className="mt-10 grid gap-5 rounded-[var(--radius-card)] bg-page p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center md:p-[30px]">
      <div className="flex items-center gap-4">
        {image ? (
          <span className="relative hidden h-[72px] w-[96px] shrink-0 overflow-hidden rounded-[10px] sm:block">
            <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
          </span>
        ) : null}
        <div>
          <Pill white>Related treatment</Pill>
          <p className="mt-2 font-display text-xl font-bold leading-[1.3] md:text-2xl">
            <Link href={service} className="hover:text-teal-deep">
              {title}
            </Link>
          </p>
        </div>
      </div>
      <Button href={service} className="justify-self-start sm:justify-self-end">
        Learn more
      </Button>
    </aside>
  );
}

/** Who wrote the post, in the words of /meet-dr-jiveh/. */
function AuthorBox({ author }: { author: string }) {
  if (author !== postAuthor.name) return null;
  return (
    <aside aria-label="About the author" className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row">
      <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image src={postAuthor.image.src} alt={postAuthor.image.alt} fill sizes="80px" className="object-cover object-top" />
      </span>
      <div>
        <p className="text-sm text-muted">About the author</p>
        <p className="mt-1 font-display text-xl font-bold leading-[1.3]">{authorName(author)}</p>
        <p className="mt-2 text-[15px] leading-[1.7] text-muted">{postAuthor.bio}</p>
        <Link href={postAuthor.path} className="mt-3 inline-block font-semibold text-teal-deep underline-offset-2 hover:underline">
          Meet Dr. Jiveh
        </Link>
      </div>
    </aside>
  );
}

function PostPage({ post, treatments }: { post: Post; treatments: Treatment[] }) {
  const path = `/blog/${post.slug}/`;
  const author = post.author || postAuthor.name;
  return (
    <article className="container-x py-[25px]">
      <JsonLd data={postSchema(post, path)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog/" },
          { name: post.title, path },
        ])}
      />
      <div className="card mx-auto max-w-[900px] px-5 py-10 md:px-[60px] md:py-[50px]">
        <Pill>{post.category || "Blog"}</Pill>
        <h1 className="mt-5 text-[28px] leading-[1.25] md:text-[40px] md:leading-[1.15]">{post.title}</h1>
        <Byline author={author} date={post.date} />
        {post.image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[20px]">
            <Image src={post.image.src} alt={post.image.alt || post.title} fill priority sizes="(min-width: 960px) 780px, 100vw" className="object-cover" />
          </div>
        ) : null}
        <RichText value={post.body} className="mt-8 md:text-lg" />
        <RelatedTreatment service={post.service} treatments={treatments} />
        <AuthorBox author={author} />
      </div>
    </article>
  );
}

export default async function BlogPage(props: PageProps<"/blog/[[...slug]]">) {
  const { slug } = await props.params;
  const posts = await getPosts();

  if (slug?.length) {
    const post = posts.find((p) => p.slug === slug[0]);
    if (!post) notFound();
    return <PostPage post={post} treatments={await getTreatments()} />;
  }

  return (
    <section className="container-x py-[25px]">
      <div className="card px-5 py-10 md:p-[50px]">
        <Pill>Smiles By Jiveh</Pill>
        <h1 className="mt-5 text-[32px] leading-[1.2] md:text-[45px]">Blog</h1>
        <p className="mt-4 max-w-[720px] text-[15px] leading-[1.7] text-muted md:text-base">
          Articles by Dr. Farokh Jiveh on dental implants, veneers and cosmetic dentistry, for patients in Royal Palm Beach and Wellington.
        </p>
        {posts.length ? (
          <ul className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const meta = [p.category, p.date ? formatDate(p.date) : ""].filter(Boolean).join(" · ");
              return (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="group block">
                    {p.image ? (
                      <span className="relative block aspect-[16/10] overflow-hidden rounded-[15px]">
                        <Image
                          src={p.image.src}
                          alt={p.image.alt || p.title}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                    ) : null}
                    {meta ? <span className="mt-4 block text-sm text-muted">{meta}</span> : null}
                    <span className="mt-2 block font-display text-xl font-bold leading-[1.3] group-hover:text-teal-deep">{p.title}</span>
                    {p.excerpt ? <span className="mt-2 block text-[15px] leading-[1.65] text-muted">{p.excerpt}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-[15px]">Articles are coming soon.</p>
        )}
      </div>
    </section>
  );
}
