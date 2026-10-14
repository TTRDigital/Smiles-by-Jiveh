/**
 * Placeholders look like [PLACEHOLDER: ...]. They mark content the practice
 * still has to supply; the site never shows them.
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !!value && /\[PLACEHOLDER[^\]]*\]/.test(value);
}
