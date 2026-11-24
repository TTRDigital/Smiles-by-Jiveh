import { Check } from "lucide-react";

/** Two columns of check-marked lines with hairline separators (What We Specialize In, Professional Highlights). */
export function CheckColumns({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid gap-x-[70px] md:grid-cols-2">
      {cols.map((col, c) => (
        <ul key={c} className={`border-line ${c ? "md:border-t" : "border-t"}`}>
          {col.map((item) => (
            <li key={item} className="flex gap-4 border-b border-line py-4 text-[15px] leading-[1.65] text-ink">
              <Check className="mt-[5px] h-3.5 w-3.5 shrink-0 text-sand-deep" strokeWidth={2} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
