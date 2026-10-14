import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "sand" | "outline" | "white";

const styles: Record<Variant, string> = {
  primary: "bg-teal text-white hover:bg-teal-hi",
  sand: "bg-sand text-white hover:bg-sand-hi",
  outline: "border border-black/25 bg-transparent text-ink hover:border-teal hover:text-teal-deep",
  white: "border border-white bg-white text-ink hover:bg-white/90",
};

/** The old site's buttons: 8px corners, 20px/24px padding, small arrow. External and tel: links render as plain anchors. */
export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  bold = false,
  className = "",
  track,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  bold?: boolean;
  className?: string;
  track?: string;
}) {
  const cls = `group/btn inline-flex items-center justify-center gap-3 rounded-[var(--radius-btn)] px-6 py-5 text-[0.9375rem] leading-none transition-[background-color,color,border-color] duration-200 md:text-[1.0625rem] ${
    bold ? "font-bold" : "font-normal"
  } ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
  const trackAs = track ?? (href.startsWith("tel:") ? "click_to_call" : undefined);
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} data-track={trackAs} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={trackAs}>
      {inner}
    </Link>
  );
}

/** Second button of a pair: sand on the home hero, outline elsewhere; phone links never get the arrow on the hero. */
export function CtaPair({
  ctas,
  second = "outline",
  bold = false,
  className = "",
}: {
  ctas: { label: string; href: string }[];
  second?: Variant;
  bold?: boolean;
  className?: string;
}) {
  if (!ctas.length) return null;
  return (
    <div className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-5 ${className}`}>
      {ctas.map((c, i) => (
        <Button key={c.label + c.href} href={c.href} variant={i === 0 ? "primary" : second} bold={bold} arrow={i === 0 || second !== "sand"}>
          {c.label}
        </Button>
      ))}
    </div>
  );
}
