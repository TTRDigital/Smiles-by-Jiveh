import Image from "next/image";
import { breadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/text";
import type { Post } from "@/lib/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { RichText } from "@/components/ui/RichText";

/* One blog post: /blog/<url>/ and, on Vercel, its signed draft preview. */
export function PostArticle({ post }: { post: Post }) {
  return (
    <article className="container-x py-[25px]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ])}
      />
      <div className="card mx-auto max-w-[900px] px-5 py-10 md:px-[60px] md:py-[50px]">
        {post.date ? <p className="text-sm text-muted">{formatDate(post.date)}</p> : null}
        <h1 className="mt-2 text-[32px] leading-[1.2] md:text-[45px]">{post.title}</h1>
        {post.image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[20px]">
            <Image src={post.image.src} alt={post.image.alt || post.title} fill sizes="(min-width: 960px) 780px, 100vw" className="object-cover" />
          </div>
        ) : null}
        <RichText value={post.body} className="mt-8 md:text-lg" />
      </div>
    </article>
  );
}
