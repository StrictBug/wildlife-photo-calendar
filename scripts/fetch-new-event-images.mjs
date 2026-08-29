import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const metaPath = join(__dirname, "additional-event-image-meta.json");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const searches = {
  "grenada-leatherback-turtles": "leatherback sea turtle nesting",
  "guatemala-quetzal": "resplendent quetzal",
  "fiordland-penguins": "Fiordland penguin",
  "lord-howe-seabirds": "masked booby Lord Howe",
  "samoa-humpback-whales": "humpback whale mother calf",
  "grand-teton-moose": "moose Grand Teton National Park",
  "vancouver-island-orcas": "killer whale Vancouver Island",
  "maine-puffins": "Atlantic puffin fish",
  "bolivia-flamingos": "James flamingo Laguna Colorada",
  "ecuador-pink-dolphins": "Amazon river dolphin Inia geoffrensis",
  "spain-iberian-lynx": "Iberian lynx Lynx pardinus",
  "poland-bison": "European bison Bialowieza",
  "portugal-azores-dolphins": "common dolphins Azores",
  "greece-loggerhead-turtles": "loggerhead sea turtle Caretta caretta",
  "china-giant-pandas": "giant panda bamboo",
  "hokkaido-cranes": "red-crowned crane Hokkaido snow",
  "israel-hula-migration": "common crane Hula Valley",
  "jordan-dana-ibex": "Nubian ibex",
  "kazakhstan-saiga": "saiga antelope",
  "kyrgyzstan-snow-leopard": "snow leopard wild",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function api(params) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams(params);
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (text.startsWith("You are making")) {
      await sleep(15000 * (i + 1));
      continue;
    }
    return JSON.parse(text);
  }
  throw new Error("API rate limited");
}

async function searchImage(query) {
  const j = await api({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "5",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "960",
    format: "json",
  });
  const pages = Object.values(j.query?.pages || {}).sort(
    (a, b) => (a.index ?? 0) - (b.index ?? 0),
  );
  for (const page of pages) {
    const ii = page.imageinfo?.[0];
    if (!ii?.thumburl) continue;
    const ext = (ii.url || "").split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "svg") continue;
    const artist = (ii.extmetadata?.Artist?.value || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return {
      thumbUrl: ii.thumburl.split("?")[0],
      sourceUrl: ii.descriptionurl,
      credit: (artist || "Wikimedia Commons") + " / Wikimedia Commons",
      license: ii.extmetadata?.LicenseShortName?.value || "Unknown",
    };
  }
  return null;
}

const meta = existsSync(metaPath)
  ? JSON.parse(readFileSync(metaPath, "utf8"))
  : {};

for (const [id, query] of Object.entries(searches)) {
  const dest = join(outDir, `${id}.jpg`);
  if (existsSync(dest) && meta[id]) {
    console.log(`skip ${id}`);
    continue;
  }
  try {
    const info = await searchImage(query);
    if (!info) {
      console.error(`no result ${id}`);
      continue;
    }
    meta[id] = info;
    if (!existsSync(dest)) {
      const res = await fetch(info.thumbUrl, {
        headers: { "User-Agent": UA },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    }
    console.log(`ok ${id}`);
  } catch (err) {
    console.error(`fail ${id}: ${err.message}`);
  }
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  await sleep(4000);
}

console.log("done");
