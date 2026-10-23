import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { postAuthor } from "@/lib/data/posts";
import { firstSentence } from "@/lib/post";
import { plain } from "@/lib/rich";
import type { Post, Treatment } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { PostCard } from "@/components/blog/PostCard";
import { authorName } from "@/components/blog/PostHero";

/* The end of a post: the related treatment page, related services, the author card and more posts. */

const titleFromPath = (path: string) =>
  path
    .replace(/^\/|\/$/g, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** The treatment page the post supports: its photo, title, one line and a button. */
export function RelatedPage({ service, treatments }: { service?: string; treatments: Treatment[] }) {
  if (!service) return null;
  const t = treatments.find((x) => `/${x.slug}/` === service);
  const title = t?.title ?? titleFromPath(service);
  const image = t?.hero.images[0];
  const line = t ? firstSentence(plain(t.hero.text)) : "";
  return (
    <div className="mt-12" data-reveal="up">
      <aside aria-label="Related treatment" className="lift grid overflow-hidden rounded-[var(--radius-card)] bg-page sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {image ? (
          <Link href={service} aria-label={title} className="relative block aspect-[16/10] sm:aspect-auto sm:min-h-[260px]">
            <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 440px, (min-width: 640px) 40vw, 100vw" className="object-cover" />
          </Link>
        ) : null}
        <div className="flex flex-col items-start justify-center p-6 md:p-8">
          <Pill white>Related treatment</Pill>
          <p className="mt-3 font-display text-2xl font-bold leading-[1.25] md:text-[28px]">
            <Link href={service} className="transition-colors hover:text-teal-deep">
              {title}
            </Link>
          </p>
          {line ? <p className="mt-2 text-[15px] leading-[1.65] text-muted">{line}</p> : null}
          <Button href={service} className="mt-5">
            See the treatment page
          </Button>
        </div>
      </aside>
    </div>
  );
}

/** Small cards for the other treatment pages the post links to (photo, title, arrow). */
export function RelatedServices({ items }: { items: Treatment[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Related services" className="mt-6">
      <p className="eyebrow">Related services</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => {
          const img = t.hero.images[0];
          return (
            <li key={t.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
              <Link href={`/${t.slug}/`} className="lift group flex items-center gap-3 rounded-[14px] bg-white p-3 pr-4 ring-1 ring-line">
                {img ? (
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={img.src} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ) : null}
                <span className="text-[15px] font-semibold leading-tight transition-colors group-hover:text-teal-deep">{t.title}</span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-teal-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Who wrote the post, in the words of /meet-dr-jiveh/: a larger photo, name, role, bio and a button to the author page. */
export function AuthorCard({ author }: { author: string }) {
  if (author !== postAuthor.name) return null;
  return (
    <aside aria-label="About the author" className="mt-8 grid gap-6 rounded-[var(--radius-card)] bg-mint p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center md:p-8" data-reveal="up">
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[18px] sm:h-[150px] sm:w-[150px]">
        <Image src={postAuthor.image.src} alt={postAuthor.image.alt} fill sizes="150px" className="object-cover object-top" />
      </div>
      <div>
        <p className="eyebrow">About the author</p>
        <p className="mt-1 font-display text-2xl font-bold leading-[1.25]">{authorName(author)}</p>
        <p className="mt-0.5 text-sm text-muted">{postAuthor.role}</p>
        <p className="mt-3 text-[15px] leading-[1.7]">{postAuthor.bio}</p>
        <Button href={postAuthor.path} variant="outline" className="lift mt-5">
          Meet Dr. Jiveh
        </Button>
      </div>
    </aside>
  );
}

/** Up to three other posts as cards. Hidden when there are none. */
export function MoreFromBlog({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="more-from-the-blog" className="container-x mt-[25px]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2 id="more-from-the-blog" className="text-2xl leading-[1.25] md:text-[32px]">
          More from the blog
        </h2>
        <Link href="/blog/" className="font-semibold text-teal-deep underline-offset-4 hover:underline">
          All articles
        </Link>
      </div>
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <PostCard key={p.slug} post={p} delay={i * 80} />
        ))}
      </ul>
    </section>
  );
}
