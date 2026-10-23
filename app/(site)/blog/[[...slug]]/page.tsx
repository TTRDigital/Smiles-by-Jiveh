import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getSiteSettings, getTreatments } from "@/lib/content";
import { postAuthor } from "@/lib/data/posts";
import { faqItems, linkedTreatments, outline, readingMinutes, wordCount } from "@/lib/post";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, postSchema } from "@/lib/schema";
import { slugify } from "@/lib/text";
import type { Post, SiteSettings, Treatment } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { PostCard } from "@/components/blog/PostCard";
import { authorName, PostHero } from "@/components/blog/PostHero";
import { Facts, InShort, PhoneLink, PostSections, Steps, Toc } from "@/components/blog/PostBody";
import { AuthorCard, MoreFromBlog, RelatedPage, RelatedServices } from "@/components/blog/PostFooter";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

/*
 * Blog: /blog/ lists the posts, /blog/<url>/ shows one. Posts come from
 * /cms > Blog posts and from lib/data/posts.ts (built-in posts; a CMS post
 * with the same URL overrides one). Without any post the list page is hidden
 * from search engines and left out of the sitemap; once there is one, /blog/
 * and every post are indexed and in the sitemap (app/sitemap.ts).
 *
 * A post reads top to bottom: hero (photo, category, title, byline with
 * reading time), the In short box (the first paragraph, the direct answer),
 * jump links to every H2, a step timeline or quick facts when the post has
 * them, the sections with their photos, a booking band after the third
 * section, the FAQ as cards, the related treatment and services, the author
 * card and more posts. Structured data: BlogPosting (with wordCount and
 * timeRequired), BreadcrumbList and FAQPage. Everything works without
 * JavaScript; the motion is CSS plus the site's reveal script and a thin
 * reading progress bar. The blog is not in the menu yet.
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

function PostPage({ post, posts, treatments, settings }: { post: Post; posts: Post[]; treatments: Treatment[]; settings: SiteSettings }) {
  const path = `/blog/${post.slug}/`;
  const author = post.author || postAuthor.name;
  const parts = outline(post.body);
  const minutes = readingMinutes(wordCount(post.body));
  const faqs = faqItems(parts);
  const related = linkedTreatments(post.body, treatments, post.service);
  const others = posts.filter((p) => p.slug !== post.slug);
  return (
    <div className="pb-[25px]">
      <article className="post">
        <JsonLd data={postSchema(post, path)} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Blog", path: "/blog/" },
            { name: post.title, path },
          ])}
        />
        {faqs.length ? <JsonLd data={faqSchema(faqs)} /> : null}
        <PostHero post={post} minutes={minutes} />
        <div className="container-x mt-[25px]">
          <div className="card mx-auto max-w-[1160px] px-5 py-8 sm:px-8 md:px-[60px] md:py-[50px]">
            <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-[60px]">
              <aside className="hidden lg:block" aria-label="Article tools">
                <div className="sticky top-[100px]">
                  <Toc sections={parts.sections} />
                  <div className="mt-8 rounded-2xl bg-page p-5">
                    <p className="font-display text-lg font-bold leading-[1.3]">Have a question?</p>
                    <p className="mt-1 text-sm leading-[1.6] text-muted">Dr. Jiveh is glad to talk it through with you at a complimentary consultation.</p>
                    <Button href="/appointment/" className="lift mt-4 w-full">
                      Book a consultation
                    </Button>
                    <a href={settings.phoneHref} data-track="click_to_call" className="mt-3 block text-center text-sm font-semibold text-teal-deep underline-offset-4 hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </aside>
              <div className="mx-auto w-full max-w-[720px] lg:mx-0">
                <InShort lead={parts.lead} />
                <Toc sections={parts.sections} mobile />
                <Steps steps={post.steps} />
                <Facts facts={post.facts} />
                <PostSections post={post} outline={parts} settings={settings} />
              </div>
            </div>
            <RelatedPage service={post.service} treatments={treatments} />
            <RelatedServices items={related} />
            <AuthorCard author={author} />
          </div>
        </div>
        <ReadingProgress />
      </article>
      <MoreFromBlog posts={others} />
    </div>
  );
}

/** /blog/: hero band with the author, category chips (a CSS :target filter, no JavaScript), the post cards and a question band. */
function BlogIndex({ posts, settings }: { posts: Post[]; settings: SiteSettings }) {
  const categories = [...new Set(posts.map((p) => p.category).filter((c): c is string => !!c))].map((name) => ({ name, slug: slugify(name), id: `cat-${slugify(name)}` }));
  // Per category: hide the other cards and mark the chip while its anchor is the URL's #target. Slugs are [a-z0-9-], safe inside a selector.
  const filterCss = categories
    .map(
      ({ id, slug }) =>
        `#${id}:target~.blog-grid>li:not([data-cat="${slug}"]){display:none}` +
        `#${id}:target~.blog-chips .chip{background:#fff;color:var(--color-ink);box-shadow:inset 0 0 0 1px var(--color-line)}` +
        `#${id}:target~.blog-chips a[href="#${id}"]{background:var(--color-teal-deep);color:#fff;box-shadow:none}`,
    )
    .join("");
  return (
    <div className="pb-[25px]">
      <section className="container-x pt-[25px]">
        <div className="card grid overflow-hidden lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="post-hero-text post-rise flex flex-col justify-center px-5 py-8 sm:px-8 md:px-12 md:py-14">
            <Pill className="self-start">Smiles By Jiveh</Pill>
            <h1 className="mt-4 text-[32px] leading-[1.15] md:text-[48px]">Blog</h1>
            <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-muted md:text-[17px]">
              Articles by Dr. Farokh Jiveh on dental implants, veneers and cosmetic dentistry, for patients in Royal Palm Beach and Wellington.
            </p>
            <div className="mt-7 flex items-center gap-4 self-start rounded-2xl bg-white/80 p-3 pr-5 ring-1 ring-line">
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                <Image src={postAuthor.image.src} alt="" fill sizes="56px" className="object-cover object-top" />
              </span>
              <div className="text-[13px] leading-snug text-muted">
                <p className="text-[15px] font-semibold text-ink">{authorName(postAuthor.name)}</p>
                <p className="mt-0.5">{postAuthor.role}</p>
                <Link href={postAuthor.path} className="mt-0.5 inline-block font-semibold text-teal-deep underline-offset-4 hover:underline">
                  Meet Dr. Jiveh
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hidden min-h-[440px] lg:block">
            <Image src={postAuthor.image.src} alt={postAuthor.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      <section className="blog-list container-x mt-[25px]" aria-label="Articles">
        <span id="all" className="blog-anchor" />
        {categories.map((c) => (
          <span key={c.id} id={c.id} className="blog-anchor" />
        ))}
        {categories.length ? (
          <nav aria-label="Categories" className="blog-chips flex flex-wrap gap-2">
            <a href="#all" className="chip is-on">
              All articles
            </a>
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="chip">
                {c.name}
              </a>
            ))}
          </nav>
        ) : null}
        {posts.length ? (
          <ul className="blog-grid mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} delay={(i % 3) * 80} priority={i === 0} reveal={i > 0} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[15px]">Articles are coming soon.</p>
        )}
        {filterCss ? <style dangerouslySetInnerHTML={{ __html: filterCss }} /> : null}
      </section>

      <section className="container-x mt-[25px]" aria-label="Have a question?">
        <div className="post-band md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="font-display text-2xl font-bold leading-[1.3] md:text-[30px]">Have a question about your smile?</p>
            <p className="mt-2 max-w-[560px] text-[15px] leading-[1.65] text-white/85 md:text-base">
              Call us or book a complimentary consultation with Dr. Jiveh in Royal Palm Beach.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-0 md:shrink-0">
            <Button href="/appointment/" variant="white" className="lift">
              Book a consultation
            </Button>
            <PhoneLink settings={settings} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function BlogPage(props: PageProps<"/blog/[[...slug]]">) {
  const { slug } = await props.params;
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);

  if (slug?.length) {
    const post = posts.find((p) => p.slug === slug[0]);
    if (!post) notFound();
    return <PostPage post={post} posts={posts} treatments={await getTreatments()} settings={settings} />;
  }

  return <BlogIndex posts={posts} settings={settings} />;
}
