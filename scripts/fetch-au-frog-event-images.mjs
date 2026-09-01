#!/usr/bin/env node
/**
 * Download Commons thumbs for the Australia + frog batch by exact File titles.
 */
import { writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const metaPath = join(__dirname, "au-frog-event-image-meta.json");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

/** Exact Commons file titles (without File: prefix). */
const files = {
  "hervey-bay-humpbacks": "Humpback whale with her calf.jpg",
  "head-of-bight-right-whales": "Southern right whale breaching, South Africa.jpg",
  "flinders-ranges-rock-wallabies":
    "Pair of Yellow-Footed Rock Wallabies in Ikara-Flinders Ranges National Park.jpg",
  "lake-mungo-wildlife":
    "Macropodiformes Macropus rufus rufus (Red Kangaroo) (30991978074).jpg",
  "lamington-lyrebirds": "Albert's Lyrebird (Menura alberti) Lamington.jpg",
  "capertee-valley-birds": "Regent Honeyeater 1.jpg",
  "ord-river-wetlands":
    "Black-necked Stork, Jabiru, (Ephippiorhynchus asiaticus), Gilbert River, Queensland, 20 July 2016.jpg",
  "lacepede-islands-rookery":
    "Brown booby (Sula leucogaster plotus) pair Michaelmas Cay.jpg",
  "iron-range-parrots": "Probosciger aterrimus, Cape York 1.jpg",
  "bruny-island-wildlife":
    "White wallaby (Notamacropus rufogriseus rufogriseus) female South Bruny.jpg",
  "victorian-alps-wombats": "Common wombat 4.jpg",
  "port-stephens-dolphins": "Indo-Pacific Bottlenose Dolphins (Tursiops aduncus).jpg",
  "boodjamulla-lawn-hill": "Indarri Falls at Lawn Hill National Park.JPG",
  "rowley-shoals-reef": "Fish in the Ningaloo reef (368690753).jpg",
  "dryandra-numbats": "Numbat.jpg",
  "wilsons-prom-wildlife": "Wombat Wilsons Promontory.jpg",
  "warrnambool-right-whales": "Southern Right Whale, Hermanus (South Africa).jpg",
  "raymond-island-koalas":
    "Koala Pine Ridge Conservation Park, Queensland IMG 0062.jpg",
  "snowy-mountains-dingoes":
    "Canis lupus dingo -Healesville Sanctuary, Victoria, Australia-8a.jpg",
  "west-macdonnell-wedgetails": "Wedge-tailed Eagle at Territory Wildlife Park.JPG",
  "daintree-night-tree-frogs":
    "White-lipped tree frog (Nyctimystes infrafrenatus) Daintree.jpg",
  "costa-rica-red-eyed-tree-frogs":
    "Red-eyed Tree Frog (Agalychnis callidryas) (6941168748).jpg",
  "ecuador-amazon-glass-frogs": "Hyalinobatrachium colymbiphyllum edit.jpg",
  "madagascar-mantella-jewels":
    "Variegated golden frog (Mantella baroni) Ranomafana.jpg",
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

const meta = {};
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
  await sleep(2500);
}

console.log(`done ok=${ok} fail=${fail}`);
process.exit(fail > 0 ? 1 : 0);
