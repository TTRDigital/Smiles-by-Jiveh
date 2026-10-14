import type { Card } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

/** Icon cards separated by thin lines (Why Choose Us, Our Comprehensive Approach, financing options). */
export function IconCards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className={`grid gap-px overflow-hidden bg-[#eceef1] ${cols[columns]}`}>
      {cards.map((c) => (
        <li key={c.title} className="flex flex-col items-start bg-white px-2.5 py-6 text-left md:items-center md:p-[30px] md:text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-teal text-white">
            <Icon name={c.icon} className="h-10 w-10" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 text-base leading-[1.5] text-black md:text-lg">{c.title}</h3>
          {c.text ? (
            <p className="mt-1.5 text-sm leading-[1.65] text-muted">
              {c.text}
              {c.href ? " " : null}
              {c.href ? <LinkOut card={c} /> : null}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function LinkOut({ card }: { card: Card }) {
  const external = card.href!.startsWith("http");
  return (
    <a href={card.href} {...(external ? { target: "_blank", rel: "nofollow noopener" } : {})} className="font-semibold text-navy underline underline-offset-2">
      {card.linkLabel || "Learn more →"}
    </a>
  );
}
