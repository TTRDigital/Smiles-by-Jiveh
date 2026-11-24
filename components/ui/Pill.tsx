/** Eyebrow label above headings: tiny tracked capitals after a hairline (both sides when centered). */
export function Pill({ children, className = "", white = false, centered = false }: { children?: string; className?: string; white?: boolean; centered?: boolean }) {
  if (!children) return null;
  return <p className={`pill ${white ? "on-white" : ""} ${centered ? "centered" : ""} ${className}`}>{children}</p>;
}
