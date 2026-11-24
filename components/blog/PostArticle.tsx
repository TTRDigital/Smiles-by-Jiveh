import Image from "next/image";
import { breadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/text";
import type { Post } from "@/lib/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { RichText } from "@/components/ui/RichText";

/* One blog post: /blog/<url>/ and, on Vercel, its signed draft preview. */
export function PostArticle({ post }: { post: Post }) {
  return (
    <article className="container-x pb-24 pt-10 md:pb-32 md:pt-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ])}
      />
      <div className="mx-auto max-w-[860px]">
        {post.date ? <p className="pill">{formatDate(post.date)}</p> : null}
        <h1 className="mt-6 text-[38px] leading-[1.08] md:text-[58px]">{post.title}</h1>
        {post.image ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)]">
            <Image src={post.image.src} alt={post.image.alt || post.title} fill sizes="(min-width: 960px) 780px, 100vw" className="object-cover" />
          </div>
        ) : null}
        <RichText value={post.body} className="mt-10 text-[16px] leading-[1.85] md:text-[18px] [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-[32px] [&_h3]:mb-3 [&_h3]:mt-10 [&_h3]:text-[26px]" />
      </div>
    </article>
  );
}
