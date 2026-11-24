import type { ReactNode } from "react";

/** One section of an inner page: open ivory, generous spacing, a hairline above. (It was a white card on the first design.) */
export function CardSection({ children, className = "", id, label }: { children: ReactNode; className?: string; id?: string; label?: string }) {
  return (
    <section id={id} aria-label={label} className="container-x">
      <div className={`border-t border-line py-16 md:py-24 ${className}`}>{children}</div>
    </section>
  );
}
