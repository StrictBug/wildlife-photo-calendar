#!/usr/bin/env node
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const meta = JSON.parse(
  readFileSync(join(__dirname, "new-event-image-meta.json"), "utf8"),
);
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(id, url) {
  const dest = join(outDir, `${id}.jpg`);
  if (existsSync(dest)) {
    console.log(`skip ${id}`);
    return true;
  }

  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (res.status === 429) {
      await sleep(5000 * attempt);
      continue;
    }
    if (!res.ok) {
      console.error(`FAIL ${id}: HTTP ${res.status}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`ok ${id} (${buf.length} bytes)`);
    return true;
  }

  console.error(`FAIL ${id}: rate limited`);
  return false;
}

let failed = 0;
for (const [id, { thumbUrl }] of Object.entries(meta)) {
  if (!(await download(id, thumbUrl))) failed++;
  await sleep(2000);
}

console.log(`done: ${Object.keys(meta).length - failed}/${Object.keys(meta).length}`);
process.exit(failed > 0 ? 1 : 0);
