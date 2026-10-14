import type { StructureResolver } from "sanity/structure";
import {
  CalendarCheck,
  CircleHelp,
  Cog,
  FileText,
  HeartHandshake,
  Home,
  Layers,
  LayoutTemplate,
  MessageSquareQuote,
  Newspaper,
  Settings2,
  Shield,
  Smile,
  Stethoscope,
  UserRound,
  Wallet,
} from "lucide-react";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: React.ComponentType) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

const treatments = (S: Parameters<StructureResolver>[0], category: string, title: string, icon: React.ComponentType) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList("treatment")
        .title(title)
        .filter("_type == 'treatment' && category == $category")
        .params({ category })
        .defaultOrdering([{ field: "order", direction: "asc" }]),
    );

/** Grouped sidebar: Settings, Pages, Treatments (by category), Reviews, FAQs, Blog. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Smiles By Jiveh")
    .items([
      S.listItem()
        .title("Settings")
        .icon(Settings2)
        .child(
          S.list()
            .title("Settings")
            .items([singleton(S, "siteSettings", "Site settings", Cog), singleton(S, "sharedSections", "Shared sections", LayoutTemplate)]),
        ),
      S.listItem()
        .title("Pages")
        .icon(Layers)
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Home", Home),
              singleton(S, "aboutPage", "Who We Are", HeartHandshake),
              singleton(S, "doctorPage", "Meet Dr. Jiveh", UserRound),
              singleton(S, "insurancePage", "Insurance & Payment Options", Wallet),
              singleton(S, "appointmentPage", "Book An Appointment", CalendarCheck),
              singleton(S, "privacyPage", "Privacy Policy", Shield),
            ]),
        ),
      S.listItem()
        .title("Treatments")
        .icon(Stethoscope)
        .child(
          S.list()
            .title("Treatments")
            .items([
              treatments(S, "general", "General", Stethoscope),
              treatments(S, "cosmetic", "Cosmetic", Smile),
              treatments(S, "restorative", "Restorative", FileText),
              S.divider(),
              S.listItem()
                .title("All treatments")
                .child(
                  S.documentTypeList("treatment")
                    .title("All treatments")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Reviews")
        .icon(MessageSquareQuote)
        .child(
          S.documentTypeList("testimonial")
            .title("Reviews")
            .defaultOrdering([{ field: "date", direction: "desc" }]),
        ),
      S.listItem()
        .title("FAQs")
        .icon(CircleHelp)
        .child(
          S.documentTypeList("faq")
            .title("FAQs")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Blog posts")
        .icon(Newspaper)
        .child(
          S.documentTypeList("post")
            .title("Blog posts")
            .defaultOrdering([{ field: "date", direction: "desc" }]),
        ),
    ]);
