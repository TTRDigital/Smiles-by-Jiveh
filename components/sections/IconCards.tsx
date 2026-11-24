import type { Card } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

/** Icon cards on a hairline grid (Why Choose Us, Our Comprehensive Approach, financing options): thin icon ring, serif title. */
export function IconCards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className={`grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line ${cols[columns]}`}>
      {cards.map((c) => (
        <li key={c.title} className="flex flex-col items-start bg-paper px-6 py-8 text-left md:px-9 md:py-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-teal-soft/70 text-teal">
            <Icon name={c.icon} className="h-6 w-6" strokeWidth={1.4} />
          </span>
          <h3 className="mt-7 text-[22px] leading-[1.25] md:text-[24px]">{c.title}</h3>
          {c.text ? (
            <p className="mt-3 text-[14.5px] leading-[1.75] text-muted">
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
    <a href={card.href} {...(external ? { target: "_blank", rel: "nofollow noopener" } : {})} className="font-semibold text-teal underline decoration-1 underline-offset-4 hover:text-teal-deep">
      {card.linkLabel || "Learn more →"}
    </a>
  );
}
