/** Small rounded label with a blue dot, used above most headings. */
export function Pill({ children, className = "", white = false }: { children?: string; className?: string; white?: boolean }) {
  if (!children) return null;
  return <p className={`pill ${white ? "on-white" : ""} ${className}`}>{children}</p>;
}
