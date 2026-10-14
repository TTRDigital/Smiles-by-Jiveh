import { Check } from "lucide-react";

/** Two columns of check-marked lines with hairline separators (What We Specialize In, Professional Highlights). */
export function CheckColumns({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid gap-x-[70px] md:grid-cols-2">
      {cols.map((col, c) => (
        <ul key={c} className="divide-y divide-black/10">
          {col.map((item) => (
            <li key={item} className="flex gap-4 py-[11px] text-[15px] leading-[1.65]">
              <Check className="mt-[5px] h-3.5 w-3.5 shrink-0 text-teal" strokeWidth={3.5} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
