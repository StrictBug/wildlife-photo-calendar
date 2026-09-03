#!/usr/bin/env node
/**
 * Fetch missing nature event images from Wikimedia Commons.
 * Uses scripts/nature-event-searches.json for queries.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public/images/events");
const metaPath = join(__dirname, "nature-event-image-meta.json");
const searchesPath = join(__dirname, "nature-event-searches.json");
const eventImagesPath = join(root, "src/data/eventImages.ts");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const BAD_EXT = new Set(["pdf", "svg", "djvu", "webm", "ogv", "ogv", "tif"]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function api(params) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams(params);
  for (let i = 0; i < 8; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (text.startsWith("You are making") || res.status === 429) {
      await sleep(15000 * (i + 1));
      continue;
    }
    if (!text.trim().startsWith("{")) {
      await sleep(8000);
      continue;
    }
    return JSON.parse(text);
  }
  throw new Error("API rate limited");
}

async function searchImage(queries) {
  const list = Array.isArray(queries) ? queries : [queries];
  for (const query of list) {
    const j = await api({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "12",
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
      const ext = (ii.url || "").split(".").pop()?.toLowerCase() || "";
      if (BAD_EXT.has(ext)) continue;
      const title = page.title || "";
      if (/\.djvu$/i.test(title)) continue;
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
    await sleep(2000);
  }
  return null;
}

function escapeTs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function registerInEventImages(meta, ids) {
  let ts = readFileSync(eventImagesPath, "utf8");
  const marker = "\n};\n\nexport function getEventImage";
  if (!ts.includes(marker)) throw new Error("eventImages.ts structure unexpected");

  const existing = new Set(
    [...ts.matchAll(/"([^"]+)":\s*\{/g)].map((m) => m[1]),
  );
  const lines = [];
  for (const id of ids) {
    const info = meta[id];
    if (!info?.sourceUrl) continue;
    const block = `  "${id}": {
    imagePath: "/images/events/${id}.jpg",
    credit: "${escapeTs(info.credit)}",
    license: "${escapeTs(info.license)}",
    sourceUrl:
      "${escapeTs(info.sourceUrl)}",
  }`;
    if (existing.has(id)) {
      const re = new RegExp(
        `  "${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}": \\{[\\s\\S]*?\\},?`,
      );
      ts = ts.replace(re, block + ",");
    } else {
      lines.push(block + ",");
    }
  }
  if (lines.length > 0) {
    ts = ts.replace(marker, `,\n${lines.join("\n")}\n};\n\nexport function getEventImage`);
  }
  ts = ts.replace(/,\s*,/g, ",\n");
  writeFileSync(eventImagesPath, ts);
}

const searches = JSON.parse(readFileSync(searchesPath, "utf8"));
const meta = existsSync(metaPath)
  ? JSON.parse(readFileSync(metaPath, "utf8"))
  : {};

const ids = Object.keys(searches).filter(
  (id) => !existsSync(join(outDir, `${id}.jpg`)),
);
console.log(`missing images: ${ids.length}`);

let ok = 0;
let fail = 0;
const failedIds = [];

for (const id of ids) {
  const query = searches[id];
  const dest = join(outDir, `${id}.jpg`);
  try {
    const info = await searchImage([query, query.split(" ").slice(0, 3).join(" ")]);
    if (!info) {
      console.error(`no result ${id} (${query})`);
      fail++;
      failedIds.push(id);
      continue;
    }
    meta[id] = info;
    const res = await fetch(info.thumbUrl, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) throw new Error("file too small");
    writeFileSync(dest, buf);
    console.log(`ok ${id} (${buf.length} bytes)`);
    ok++;
  } catch (err) {
    console.error(`fail ${id}: ${err.message}`);
    fail++;
    failedIds.push(id);
  }
  writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  await sleep(6000);
}

registerInEventImages(meta, Object.keys(searches));

console.log(`done ok=${ok} fail=${fail}`);
if (failedIds.length) console.log("failed:", failedIds.join(", "));
process.exit(fail > 0 ? 1 : 0);
