import type { Card } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

/**
 * Icon cards (Why Choose Us, Our Comprehensive Approach, financing options): a hairline grid on desktop; on phones
 * the cards swipe sideways instead of stacking into a long column.
 */
export function IconCards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul
      className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:gap-px md:overflow-hidden md:rounded-[var(--radius-card)] md:border md:border-line md:bg-line md:px-0 md:pb-0 ${cols[columns]}`}
    >
      {cards.map((c) => (
        <li
          key={c.title}
          className="group flex w-[80%] shrink-0 snap-center flex-col items-start rounded-[22px] border border-line bg-white px-6 py-8 text-left transition-colors duration-300 hover:bg-mist/60 md:w-auto md:rounded-none md:border-0 md:px-9 md:py-10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
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
