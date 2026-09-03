import { readFileSync } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "./load-env.mjs";

const DATA = join(projectRoot, "src/data");

function parseStringArray(block, field) {
  const re = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`, "m");
  const m = block.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

function parseFile(path, defaultKind) {
  const src = readFileSync(path, "utf8");
  const events = [];
  const blockRe =
    /id:\s*"([^"]+)"([\s\S]*?)(?=\n  \},\n|\n  \}\n)/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const block = m[2];
    const id = m[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    const location = block.match(/location:\s*"([^"]+)"/)?.[1];
    const country = block.match(/country:\s*"([^"]+)"/)?.[1];
    const lat = block.match(/lat:\s*([-\d.]+)/)?.[1];
    const lng = block.match(/lng:\s*([-\d.]+)/)?.[1];
    const kindMatch = block.match(/kind:\s*"([^"]+)"/)?.[1];
    const description = block.match(/description:\s*\n?\s*"([^"]+)"/)?.[1];
    if (!title || !location || !lat || !lng) continue;
    events.push({
      id,
      title,
      location,
      country: country ?? "",
      lat: Number(lat),
      lng: Number(lng),
      kind: kindMatch ?? defaultKind,
      animalLabels: parseStringArray(block, "animalLabels"),
      subjectLabels: parseStringArray(block, "subjectLabels"),
      description: description ?? "",
    });
  }
  return events;
}

/** All catalog events with kind wildlife | nature. */
export function loadAllEvents() {
  return [
    ...parseFile(join(DATA, "events.ts"), "wildlife"),
    ...parseFile(join(DATA, "eventsExtra.ts"), "wildlife"),
    ...parseFile(join(DATA, "eventsNature.ts"), "nature"),
  ];
}

export function loadEventsByIds(ids) {
  const set = new Set(ids);
  return loadAllEvents().filter((e) => set.has(e.id));
}

export function loadNatureEventIds() {
  const src = readFileSync(join(DATA, "eventsNature.ts"), "utf8");
  return [...src.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
}

export function loadWildlifeEventIds() {
  const nature = new Set(loadNatureEventIds());
  return loadAllEvents()
    .filter((e) => !nature.has(e.id))
    .map((e) => e.id);
}
