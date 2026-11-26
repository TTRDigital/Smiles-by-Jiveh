import { createElement, type ReactNode } from "react";

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean);

const sentences = (text: string) => text.trim().split(/(?<=[.!?])\s+/).filter(Boolean);

/** One-sentence headings of four words or fewer read as uppercase statements ("CONTACT US"). */
export const isStatement = (text: string) => sentences(text).length === 1 && words(text).length <= 4;

/**
 * A heading's own text with an italic accent on its last phrase: the last
 * sentence when there are several ("Elevated Dentistry. *Personalized
 * Experience.*"), otherwise the last word or two. The words never change;
 * the accent is only a wrapper, so headings typed in /cms work as they are.
 */
export function Accent({ text }: { text: string }): ReactNode {
  const t = text.trim();
  if (!t || isStatement(t)) return t;
  const parts = sentences(t);
  if (parts.length > 1) {
    const last = parts.pop()!;
    return (
      <>
        {parts.join(" ")} <em>{last}</em>
      </>
    );
  }
  const w = words(t);
  const tail = w[w.length - 1].replace(/[^\p{L}]/gu, "").length >= 8 ? 1 : 2;
  return (
    <>
      {w.slice(0, -tail).join(" ")} <em>{w.slice(-tail).join(" ")}</em>
    </>
  );
}

/** A display heading: statement styling for short text, an italic accent for longer text. */
export function Display({
  as = "h2",
  text,
  className = "",
  statementClassName = "",
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  text: string;
  className?: string;
  /** Extra classes for short (uppercase) headings, usually a smaller size. Mark sizes important (`md:text-[42px]!`) so they win over className's. */
  statementClassName?: string;
  id?: string;
}) {
  const statement = isStatement(text);
  return createElement(as, { id, className: `display ${statement ? `statement ${statementClassName}` : ""} ${className}` }, <Accent text={text} />);
}
