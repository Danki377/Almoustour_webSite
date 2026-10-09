import "server-only";
import type { z } from "zod";

/** First error message per field, for inline display in the back-office forms. */
export function errorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** "a\nb\n\nc" → ["a", "b", "c"] */
export function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/** "Label : value" lines → [{ label, value }] (the first ":" separates them). */
export function pairs(value: string, keys: [string, string] = ["label", "value"]) {
  return lines(value).map((l) => {
    const i = l.indexOf(":");
    return i < 0 ? { [keys[0]]: l, [keys[1]]: "" } : { [keys[0]]: l.slice(0, i).trim(), [keys[1]]: l.slice(i + 1).trim() };
  });
}
