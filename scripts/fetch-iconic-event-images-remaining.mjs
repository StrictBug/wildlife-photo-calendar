#!/usr/bin/env node
/** Fetch remaining iconic event images by exact Commons file title. */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const metaPath = join(__dirname, "iconic-event-image-meta.json");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const files = {
  "south-africa-sardine-run": "Sardine run in South Africa 2022.jpg",
  "tonga-humpback-swim": "Megaptera novaeangliae underwater NOAA.jpg",
  "zambia-kasanka-bats": "Eidolon helvum 283616302.jpg",
  "baja-mobula-rays": "Mobula breach 2.jpg",
  "tanzania-ndutu-calving":
    "Western white-bearded wildebeest (Connochaetes taurinus mearnsi) calf.jpg",
  "smoky-synchronous-fireflies": "Great Smoky Mountain Fireflies - panoramio.jpg",
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

async function infoForTitle(title) {
  const j = await api({
    action: "query",
    titles: `File:${title}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: "960",
    format: "json",
  });
  const page = Object.values(j.query?.pages || {})[0];
  if (!page || page.missing != null) return null;
  const ii = page.imageinfo?.[0];
  if (!ii) return null;
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

const meta = existsSync(metaPath)
  ? JSON.parse(readFileSync(metaPath, "utf8"))
  : {};

let ok = 0;
let fail = 0;

for (const [id, title] of Object.entries(files)) {
  const dest = join(outDir, `${id}.jpg`);
  try {
    const info = await infoForTitle(title);
    if (!info) {
      console.error(`missing file ${id}: ${title}`);
      fail++;
      continue;
    }
    meta[id] = info;
    const res = await fetch(info.thumbUrl, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`ok ${id}`);
    ok++;
  } catch (err) {
    console.error(`fail ${id}: ${err.message}`);
    fail++;
  }
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  await sleep(4000);
}

console.log(`done ok=${ok} fail=${fail}`);
process.exit(fail > 0 ? 1 : 0);
