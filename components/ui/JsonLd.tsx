/** Renders a JSON-LD block, escaped so content can never close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Parses the CMS "Structured data (JSON-LD)" text. Returns the JSON-LD objects, or null when empty or not valid JSON-LD objects. */
export function parseSchemaText(text?: string): Record<string, unknown>[] | null {
  if (!text?.trim()) return null;
  try {
    const v: unknown = JSON.parse(text);
    const list = Array.isArray(v) ? v : [v];
    return list.length > 0 && list.every((x) => typeof x === "object" && x !== null && !Array.isArray(x)) ? (list as Record<string, unknown>[]) : null;
  } catch {
    return null;
  }
}

/** The page's main structured data: the CMS text (seo.schema) when it is valid, otherwise the schema generated in code (if any). */
export function SeoSchema({ seo, fallback }: { seo: { schema?: string }; fallback?: Record<string, unknown> }) {
  const custom = parseSchemaText(seo.schema);
  const list = custom ?? (fallback ? [fallback] : []);
  return (
    <>
      {list.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
    </>
  );
}
