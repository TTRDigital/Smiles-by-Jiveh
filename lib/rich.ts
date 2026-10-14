import type { Rich } from "@/lib/types";

/*
 * Writes Portable Text from short markdown-like lines, for the built-in
 * content in lib/data (the same format Sanity stores):
 *   "A paragraph with **bold**, *italic* and [a link](/appointment/)."
 *   "- bullet item"     "1. numbered item"     "#### Small heading"
 * A "\n" inside a line is a line break.
 */

let n = 0;
const key = () => `r${(n++).toString(36)}`;

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

function spans(text: string) {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  // **bold**, *italic*, [label](href)
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) children.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    if (m[1] !== undefined) children.push({ _type: "span", _key: key(), text: m[1], marks: ["strong"] });
    else if (m[2] !== undefined) children.push({ _type: "span", _key: key(), text: m[2], marks: ["em"] });
    else {
      const def: MarkDef = { _type: "link", _key: key(), href: m[4] };
      markDefs.push(def);
      children.push({ _type: "span", _key: key(), text: m[3], marks: [def._key] });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length || !children.length) children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return { children, markDefs };
}

export function rich(...lines: string[]): Rich {
  return lines.map((line) => {
    let style = "normal";
    let listItem: "bullet" | "number" | undefined;
    let text = line;
    if (text.startsWith("#### ")) {
      style = "h4";
      text = text.slice(5);
    } else if (text.startsWith("- ")) {
      listItem = "bullet";
      text = text.slice(2);
    } else if (/^\d+\. /.test(text)) {
      listItem = "number";
      text = text.replace(/^\d+\. /, "");
    }
    return { _type: "block", _key: key(), style, ...(listItem ? { listItem, level: 1 } : {}), ...spans(text) };
  }) as Rich;
}

/** Plain text of rich content, e.g. for meta descriptions and FAQ schema. */
export function plain(value: Rich | string | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value
    .map((b) => ((b as { children?: { text?: string }[] }).children ?? []).map((c) => c.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
