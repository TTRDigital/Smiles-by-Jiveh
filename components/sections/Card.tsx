import type { ReactNode } from "react";

/** One white rounded card on the grey page, 25px apart, as on the old site's inner pages. */
export function CardSection({ children, className = "", id, label }: { children: ReactNode; className?: string; id?: string; label?: string }) {
  return (
    <section id={id} aria-label={label} className="container-x mb-[25px]">
      <div className={`card px-[10px] py-5 sm:px-6 md:p-10 ${className}`}>{children}</div>
    </section>
  );
}
