import type { WildlifeEvent } from "@/lib/types";

const SKIP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "in",
  "of",
  "on",
  "the",
  "to",
  "&",
]);

/** Three-letter code from an event title (e.g. "Amboseli Elephant Plains" → "AEP"). */
export function eventAbbrev(title: string): string {
  const normalized = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-zA-Z0-9\s]/g, " ");

  const words = normalized
    .split(/\s+/)
    .filter((w) => w.length > 0 && !SKIP_WORDS.has(w.toLowerCase()));

  let letters = words.map((w) => w[0]!.toUpperCase()).join("");

  if (letters.length < 3) {
    const pool = words.join("").toUpperCase().replace(/[^A-Z]/g, "");
    for (const ch of pool) {
      if (letters.length >= 3) break;
      letters += ch;
    }
  }

  if (letters.length < 3) {
    letters = (letters + "XXX").slice(0, 3);
  }

  return letters.slice(0, 3);
}

/** Unique 3-letter codes for a set of events (selection order). */
export function uniqueEventAbbrevs(
  events: WildlifeEvent[],
): Record<string, string> {
  const result: Record<string, string> = {};
  const taken = new Set<string>();

  for (const event of events) {
    const base = eventAbbrev(event.title);
    let candidate = base;

    if (taken.has(candidate)) {
      const extras = event.id.replace(/[^a-zA-Z]/g, "").toUpperCase();
      for (const ch of extras) {
        if (!taken.has(candidate)) break;
        candidate = (base.slice(0, 2) + ch).slice(0, 3);
      }
      let n = 1;
      while (taken.has(candidate) && n < 10) {
        candidate = (base.slice(0, 2) + String(n)).slice(0, 3);
        n += 1;
      }
    }

    taken.add(candidate);
    result[event.id] = candidate;
  }

  return result;
}
