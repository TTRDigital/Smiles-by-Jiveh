import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Rich } from "@/lib/types";

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
          {children}
        </a>
      );
    },
  },
};

/** Portable Text with the site's paragraph spacing. Line breaks typed in /cms are kept. */
export function RichText({ value, className = "" }: { value?: Rich; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={`prose-site whitespace-pre-line ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
