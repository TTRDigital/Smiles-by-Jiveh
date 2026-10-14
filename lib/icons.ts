/* Icon names editors can pick in /cms. Mapped to icons in components/ui/Icon.tsx (the same lucide icons the old site used). */
export const iconOptions = [
  { title: "Calendar check", value: "calendar-check" },
  { title: "Heart handshake", value: "heart-handshake" },
  { title: "Activity (square)", value: "square-activity" },
  { title: "Message", value: "message-circle" },
  { title: "Heart pulse", value: "heart-pulse" },
  { title: "Badge check", value: "badge-check" },
  { title: "Smile", value: "smile" },
  { title: "Sparkle", value: "sparkle" },
  { title: "Clock", value: "clock" },
  { title: "Phone", value: "phone" },
  { title: "Mail", value: "mail" },
  { title: "Map pin", value: "map-pin" },
  { title: "Check", value: "check" },
  { title: "Check (circle)", value: "check-circle" },
  { title: "Hand pointing right", value: "hand-point-right" },
] as const;

export type IconName = (typeof iconOptions)[number]["value"];
