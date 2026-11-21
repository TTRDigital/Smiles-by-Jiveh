import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock4 } from "lucide-react";
import { postAuthor } from "@/lib/data/posts";
import { formatDate } from "@/lib/text";
import type { Post } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";

/** The author's name with credentials when the site states them (see postAuthor). */
export const authorName = (author: string) => (author === postAuthor.name && postAuthor.credentials ? `${author}, ${postAuthor.credentials}` : author);

/** Byline card: round photo, "By Dr. Farokh Jiveh" linked to the author page, role, date and reading time. */
export function Byline({ author, date, minutes, className = "" }: { author: string; date?: string; minutes: number; className?: string }) {
  const doctor = author === postAuthor.name;
  return (
    <div className={`flex items-center gap-4 rounded-2xl bg-white/80 p-3 pr-5 ring-1 ring-line ${className}`}>
      {doctor ? (
        <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
          <Image src={postAuthor.image.src} alt="" fill sizes="56px" className="object-cover object-top" />
        </span>
      ) : null}
      <div className="text-[13px] leading-snug text-muted">
        <p className="text-[15px] text-ink">
          By{" "}
          {doctor ? (
            <Link href={postAuthor.path} className="font-semibold transition-colors hover:text-teal-deep">
              {authorName(author)}
            </Link>
          ) : (
            <span className="font-semibold">{author}</span>
          )}
        </p>
        {doctor ? <p className="mt-0.5">{postAuthor.role}</p> : null}
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2">
          {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
          {date ? <span aria-hidden="true">·</span> : null}
          <span className="inline-flex items-center gap-1">
            <Clock4 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {minutes} min read
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * The top of a post: the featured photo (on top on phones, on the right on
 * desktop), a link back to the blog, the category pill, the title and the
 * byline. The text fades and rises on load (CSS only, see .post-rise).
 */
export function PostHero({ post, minutes }: { post: Post; minutes: number }) {
  const author = post.author || postAuthor.name;
  return (
    <header className="container-x pt-[25px]">
      <div className="card grid overflow-hidden lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
        {post.image ? (
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:min-h-[520px]">
            <Image src={post.image.src} alt={post.image.alt || post.title} fill priority fetchPriority="high" sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="post-hero-text post-rise flex flex-col justify-center px-5 py-7 sm:px-8 md:px-12 md:py-12 lg:order-1 lg:py-14">
          <Link href="/blog/" className="inline-flex items-center gap-1 self-start text-sm text-muted transition-colors hover:text-teal-deep">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Blog
          </Link>
          <Pill className="mt-4 self-start">{post.category || "Blog"}</Pill>
          <h1 className="mt-4 text-[28px] leading-[1.22] md:text-[40px] md:leading-[1.14] xl:text-[44px]">{post.title}</h1>
          <Byline author={author} date={post.date} minutes={minutes} className="mt-7 self-start" />
        </div>
      </div>
    </header>
  );
}
