import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "sand" | "outline" | "white" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-teal text-white shadow-[0_14px_30px_-14px_rgb(44_79_86/0.7)] hover:bg-teal-hi",
  sand: "bg-sand text-spruce hover:bg-sand-hi",
  outline: "border border-ink/25 bg-transparent text-ink hover:border-teal hover:text-teal-deep",
  white: "bg-ivory text-spruce hover:bg-white",
  // Outline buttons on photos and the dark band.
  light: "border border-white/60 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15",
  ghost: "border border-ink/15 bg-white/60 text-ink hover:border-teal hover:text-teal-deep",
};

/** Pill buttons: small tracked capitals, small arrow. External and tel: links render as plain anchors. */
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
  const cls = `group/btn inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full px-7 py-4 text-center text-[0.75rem] uppercase leading-tight tracking-[0.16em] transition-[background-color,color,border-color,box-shadow] duration-300 ${
    bold ? "font-extrabold" : "font-bold"
  } ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
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

/** Second button of a pair: sand on the home hero, outline elsewhere; phone links never get the arrow on the hero. On the dark band the pair is ivory + light outline. */
export function CtaPair({
  ctas,
  second = "outline",
  bold = false,
  dark = false,
  className = "",
}: {
  ctas: { label: string; href: string }[];
  second?: Variant;
  bold?: boolean;
  dark?: boolean;
  className?: string;
}) {
  if (!ctas.length) return null;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 ${className}`}>
      {ctas.map((c, i) => (
        <Button key={c.label + c.href} href={c.href} variant={i === 0 ? (dark ? "white" : "primary") : dark ? "light" : second} bold={bold} arrow={i === 0 || second !== "sand"}>
          {c.label}
        </Button>
      ))}
    </div>
  );
}
