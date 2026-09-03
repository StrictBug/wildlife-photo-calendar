#!/usr/bin/env node
/**
 * Apply human selections from image-selections.json to event images.
 *
 * Usage:
 *   node scripts/apply-image-selections.mjs
 *   node scripts/apply-image-selections.mjs --dry-run
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot } from "./lib/load-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const selectionsPath = join(__dirname, "image-selections.json");
const candidatesPath = join(__dirname, "image-candidates.json");
const eventImagesPath = join(projectRoot, "src/data/eventImages.ts");
const eventsImageDir = join(projectRoot, "public/images/events");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const dryRun = process.argv.includes("--dry-run");

function escapeTs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function loadJson(path) {
  if (!existsSync(path)) {
    console.error(`Missing ${path}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

async function downloadImage(url, dest) {
  for (let i = 0; i < 8; i++) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 12000 * (i + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) throw new Error("file too small");
    writeFileSync(dest, buf);
    return buf.length;
  }
  throw new Error("rate limited after retries");
}

async function applyImage(candidate, dest) {
  if (candidate.localPath) {
    const localSrc = join(projectRoot, "public", candidate.localPath.replace(/^\//, ""));
    if (existsSync(localSrc)) {
      copyFileSync(localSrc, dest);
      return "local";
    }
  }

  const urls = [candidate.url, candidate.thumbUrl].filter(Boolean);
  for (const url of urls) {
    try {
      await downloadImage(url, dest);
      return "remote";
    } catch (err) {
      if (url === urls[urls.length - 1]) throw err;
    }
  }
  throw new Error("no image source");
}

function updateEventImages(eventId, info) {
  let ts = readFileSync(eventImagesPath, "utf8");
  const block = `  "${eventId}": {
    imagePath: "/images/events/${eventId}.jpg",
    credit: "${escapeTs(info.credit)}",
    license: "${escapeTs(info.license)}",
    sourceUrl:
      "${escapeTs(info.sourceUrl)}",
  }`;
  const re = new RegExp(
    `  "${eventId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}": \\{[\\s\\S]*?\\},?`,
  );
  if (re.test(ts)) {
    ts = ts.replace(re, block + ",");
  } else {
    ts = ts.replace(
      "\n};\n\nexport function getEventImage",
      `,\n${block}\n};\n\nexport function getEventImage`,
    );
  }
  ts = ts.replace(/,\s*,/g, ",\n");
  if (!dryRun) writeFileSync(eventImagesPath, ts);
}

async function main() {
  const selections = loadJson(selectionsPath);
  const candidates = loadJson(candidatesPath);
  let applied = 0;
  let skipped = 0;
  let failed = 0;

  for (const [eventId, sel] of Object.entries(selections)) {
    if (!sel || sel.choice === "skip" || sel.choice === "keep") {
      skipped++;
      continue;
    }

    const entry = candidates[eventId];
    if (!entry) {
      console.warn(`no candidates for ${eventId}`);
      skipped++;
      continue;
    }

    let candidate;
    if (typeof sel.choice === "number") {
      candidate = entry.candidates.find((c) => c.index === sel.choice);
    } else if (sel.candidateId) {
      candidate = entry.candidates.find((c) => c.candidateId === sel.candidateId);
    }

    if (!candidate) {
      console.warn(`candidate not found for ${eventId}`);
      skipped++;
      continue;
    }

    const dest = join(eventsImageDir, `${eventId}.jpg`);
    console.log(`${dryRun ? "[dry-run] " : ""}apply ${eventId} ← ${candidate.candidateId}`);

    if (!dryRun) {
      try {
        const source = await applyImage(candidate, dest);
        updateEventImages(eventId, {
          credit: candidate.credit,
          license: candidate.license,
          sourceUrl: candidate.sourceUrl,
        });
        console.log(`  ok (${source})`);
      } catch (err) {
        console.error(`  fail ${eventId}: ${err.message}`);
        failed++;
        continue;
      }
    }
    applied++;
  }

  console.log(`applied=${applied} skipped=${skipped} failed=${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
