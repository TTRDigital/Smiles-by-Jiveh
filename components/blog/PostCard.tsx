import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { postAuthor } from "@/lib/data/posts";
import { readingMinutes, wordCount } from "@/lib/post";
import { formatDate, slugify } from "@/lib/text";
import type { Post } from "@/lib/types";

/**
 * One post in the blog grid and in "More from the blog": 16:9 photo with the
 * category pill on it, title, excerpt, then the author, the date and the
 * reading time. The whole card is one link and lifts on hover. `reveal`
 * fades it in as it scrolls into view (off for the first card, which is
 * above the fold).
 */
export function PostCard({ post, delay = 0, priority = false, reveal = true }: { post: Post; delay?: number; priority?: boolean; reveal?: boolean }) {
  const minutes = readingMinutes(wordCount(post.body));
  const author = post.author || postAuthor.name;
  const doctor = author === postAuthor.name;
  return (
    <li
      data-cat={slugify(post.category ?? "") || "all"}
      {...(reveal ? { "data-reveal": "up" } : {})}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className="flex"
    >
      <Link href={`/blog/${post.slug}/`} className="lift group flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line">
        <span className="relative block aspect-[16/9] overflow-hidden bg-mint">
          {post.image ? (
            <Image
              src={post.image.src}
              alt={post.image.alt || post.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          ) : null}
          {post.category ? <span className="pill on-white absolute left-4 top-4 shadow-[0_4px_12px_rgb(0_0_0/0.08)]">{post.category}</span> : null}
        </span>
        <span className="flex flex-1 flex-col p-5 md:p-6">
          <span className="font-display text-xl font-bold leading-[1.3] text-heading transition-colors group-hover:text-teal-deep md:text-[22px]">{post.title}</span>
          {post.excerpt ? <span className="mt-2.5 line-clamp-3 block text-[15px] leading-[1.65] text-muted">{post.excerpt}</span> : null}
          <span className="mt-auto flex items-center gap-3 pt-5 text-[13px] leading-snug text-muted">
            {doctor ? (
              <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image src={postAuthor.image.src} alt="" fill sizes="36px" className="object-cover object-top" />
              </span>
            ) : null}
            <span>
              <span className="block font-semibold text-ink">{author}</span>
              <span className="block">
                {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : null}
                {post.date ? " · " : null}
                {minutes} min read
              </span>
            </span>
          </span>
        </span>
      </Link>
    </li>
  );
}
