import {
  BadgeCheck,
  CalendarCheck2,
  Check,
  CircleCheck,
  Clock4,
  HeartHandshake,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smile,
  Sparkle,
  SquareActivity,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/icons";

/** Font Awesome "hand-point-right" (solid), as used by the old site's benefit lists. */
function HandPointRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z" />
    </svg>
  );
}

const map: Record<Exclude<IconName, "hand-point-right">, LucideIcon> = {
  "calendar-check": CalendarCheck2,
  "heart-handshake": HeartHandshake,
  "square-activity": SquareActivity,
  "message-circle": MessageCircle,
  "heart-pulse": HeartPulse,
  "badge-check": BadgeCheck,
  smile: Smile,
  sparkle: Sparkle,
  clock: Clock4,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  check: Check,
  "check-circle": CircleCheck,
};

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.75 }: { name?: IconName | string; className?: string; strokeWidth?: number }) {
  if (name === "hand-point-right") return <HandPointRight className={className} />;
  const C = map[(name ?? "check") as keyof typeof map] ?? Check;
  return <C className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
