#!/usr/bin/env node
/**
 * Search Wikimedia Commons and download 960px thumbs for iconic wildlife events.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const metaPath = join(__dirname, "iconic-event-image-meta.json");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const searches = {
  "south-africa-sardine-run": "sardine run South Africa baitball gannet",
  "canada-spirit-bears": "Kermode spirit bear British Columbia",
  "uganda-shoebill-stork": "shoebill stork Balaeniceps rex Uganda",
  "bosque-sandhill-cranes": "sandhill crane Bosque del Apache New Mexico",
  "tonga-humpback-swim": "humpback whale snorkel Tonga",
  "uganda-ishasha-tree-lions": "tree climbing lion Ishasha Uganda",
  "zambia-kasanka-bats": "straw-coloured fruit bat Kasanka Zambia",
  "baja-mobula-rays": "mobula ray jumping Sea of Cortez",
  "tanzania-ndutu-calving": "wildebeest calving Ndutu Serengeti",
  "hawaii-humpback-whales": "humpback whale breach Maui Hawaii",
  "canada-narwhal-pond-inlet": "narwhal Monodon monoceros Arctic",
  "ano-nuevo-elephant-seals": "northern elephant seal Año Nuevo California",
  "kenya-lake-bogoria-flamingos": "lesser flamingo Lake Bogoria Kenya",
  "smoky-synchronous-fireflies": "synchronous fireflies Photinus carolinus",
  "falklands-king-penguins": "king penguin Falkland Islands Aptenodytes patagonicus",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function api(params) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams(params);
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (text.startsWith("You are making") || res.status === 429) {
      await sleep(12000 * (i + 1));
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
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: "960",
    format: "json",
  });
  const pages = Object.values(j.query?.pages || {}).sort(
    (a, b) => (a.index ?? 0) - (b.index ?? 0),
  );
  for (const page of pages) {
    const ii = page.imageinfo?.[0];
    if (!ii?.thumburl && !ii?.url) continue;
    const mime = ii.mime || "";
    if (mime && !mime.startsWith("image/")) continue;
    const ext = (ii.url || "").split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "svg" || ext === "webm" || ext === "ogv")
      continue;
    const artist = (ii.extmetadata?.Artist?.value || "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return {
      thumbUrl: (ii.thumburl || ii.url).split("?")[0],
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

let ok = 0;
let fail = 0;

for (const [id, query] of Object.entries(searches)) {
  const dest = join(outDir, `${id}.jpg`);
  try {
    const info = meta[id]?.thumbUrl ? meta[id] : await searchImage(query);
    if (!info) {
      console.error(`no result ${id} (${query})`);
      fail++;
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
    ok++;
  } catch (err) {
    console.error(`fail ${id}: ${err.message}`);
    fail++;
  }
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  await sleep(3500);
}

console.log(`done ok=${ok} fail=${fail}`);
process.exit(fail > 0 ? 1 : 0);
