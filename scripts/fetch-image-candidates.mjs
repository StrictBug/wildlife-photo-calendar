#!/usr/bin/env node
/**
 * Fetch ranked image candidates (Commons + Flickr CC) for event curation.
 *
 * Usage:
 *   node scripts/fetch-image-candidates.mjs --pilot
 *   node scripts/fetch-image-candidates.mjs --nature
 *   node scripts/fetch-image-candidates.mjs --wildlife
 *   node scripts/fetch-image-candidates.mjs --wildlife --refresh
 *   node scripts/fetch-image-candidates.mjs --ids=event-id-1,event-id-2
 *   node scripts/fetch-image-candidates.mjs --all
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, projectRoot } from "./lib/load-env.mjs";
import {
  loadAllEvents,
  loadEventsByIds,
  loadNatureEventIds,
  loadWildlifeEventIds,
} from "./lib/parse-events.mjs";
import { searchCommons } from "./lib/commons-search.mjs";
import { hasFlickrKey, searchFlickr } from "./lib/flickr-search.mjs";
import {
  buildSearchQueries,
  extractSubjectTerms,
  flickrSearchQuery,
  primarySubjectTerm,
  rankCandidates,
} from "./lib/image-scoring.mjs";

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";
const outManifest = join(__dirname, "image-candidates.json");
const checkpointPath = join(__dirname, "image-candidates-checkpoint.json");
const candidatesDir = join(projectRoot, "public/images/candidates");
const natureSearchesPath = join(__dirname, "nature-event-searches.json");
const overridesPath = join(__dirname, "image-search-overrides.json");

const DELAY_MS = 6500;
const MAX_CANDIDATES = 5;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    pilot: false,
    nature: false,
    wildlife: false,
    all: false,
    refresh: false,
    ids: null,
  };
  for (const a of args) {
    if (a === "--pilot") opts.pilot = true;
    else if (a === "--nature") opts.nature = true;
    else if (a === "--wildlife") opts.wildlife = true;
    else if (a === "--all") opts.all = true;
    else if (a === "--refresh") opts.refresh = true;
    else if (a.startsWith("--ids=")) opts.ids = a.slice(6).split(",").filter(Boolean);
  }
  return opts;
}

function resolveEventList(opts) {
  if (opts.ids) return loadEventsByIds(opts.ids);
  if (opts.pilot) {
    const pilotIds = loadJson(join(__dirname, "pilot-events.json"), []);
    return loadEventsByIds(pilotIds);
  }
  if (opts.nature) return loadEventsByIds(loadNatureEventIds());
  if (opts.wildlife) return loadEventsByIds(loadWildlifeEventIds());
  if (opts.all) return loadAllEvents();
  console.error("Specify --pilot, --nature, --wildlife, --all, or --ids=...");
  process.exit(1);
}

async function downloadThumb(url, dest, force = false) {
  if (!force && existsSync(dest)) return true;
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) return false;
  writeFileSync(dest, buf);
  return true;
}

function queriesForEvent(event, natureSearches, overrides) {
  const custom = overrides[event.id];
  if (custom) {
    const list = Array.isArray(custom) ? custom : [custom];
    return [...list, ...buildSearchQueries(event)];
  }
  const natureQ = natureSearches[event.id];
  const base = buildSearchQueries(event);
  if (natureQ) return [natureQ, ...base];
  return base;
}

async function fetchCandidatesForEvent(event, natureSearches, overrides) {
  const queries = queriesForEvent(event, natureSearches, overrides);
  const pool = [];

  for (const q of queries.slice(0, 8)) {
    try {
      const results = await searchCommons(q, 12);
      pool.push(...results);
      await sleep(2000);
    } catch (err) {
      console.warn(`  commons search failed (${q}): ${err.message}`);
    }
  }

  let ranked = rankCandidates(pool, event, MAX_CANDIDATES);

  if (ranked.length < 3 && hasFlickrKey()) {
    const flickrQ = flickrSearchQuery(event);
    try {
      const flickr = await searchFlickr(flickrQ, 20);
      ranked = rankCandidates([...pool, ...flickr], event, MAX_CANDIDATES);
      await sleep(1500);
    } catch (err) {
      console.warn(`  flickr search failed: ${err.message}`);
    }
  }

  return { ranked, queries };
}

function removeFromCheckpoint(checkpoint, eventIds) {
  const drop = new Set(eventIds);
  checkpoint.completed = checkpoint.completed.filter((id) => !drop.has(id));
}

async function main() {
  const opts = parseArgs();
  const events = resolveEventList(opts);
  const natureSearches = loadJson(natureSearchesPath, {});
  const overrides = loadJson(overridesPath, {});

  const manifest = loadJson(outManifest, {});
  const checkpoint = loadJson(checkpointPath, { completed: [] });
  const done = new Set(checkpoint.completed);

  if (opts.refresh) {
    removeFromCheckpoint(checkpoint, events.map((e) => e.id));
    for (const e of events) done.delete(e.id);
    writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
    console.log(`refresh: cleared checkpoint for ${events.length} events`);
  }

  console.log(`Events to process: ${events.length}`);
  console.log(`Flickr API: ${hasFlickrKey() ? "enabled" : "disabled (set FLICKR_API_KEY in .env.local)"}`);

  let ok = 0;
  let fail = 0;

  for (const event of events) {
    if (done.has(event.id)) {
      console.log(`skip ${event.id} (checkpoint)`);
      continue;
    }

    const primary = primarySubjectTerm(event);
    const subjects = extractSubjectTerms(event);
    console.log(`fetching ${event.id} — ${event.title}`);
    console.log(`  subject: ${primary || "(none)"} | terms: ${subjects.slice(0, 5).join(", ")}`);

    try {
      const { ranked, queries } = await fetchCandidatesForEvent(
        event,
        natureSearches,
        overrides,
      );
      console.log(`  queries: ${queries.slice(0, 4).join(" | ")}`);

      const eventDir = join(candidatesDir, event.id);
      mkdirSync(eventDir, { recursive: true });

      const saved = [];
      for (let i = 0; i < ranked.length; i++) {
        const c = ranked[i];
        const localPath = `/images/candidates/${event.id}/${i + 1}.jpg`;
        const dest = join(projectRoot, "public", localPath);
        const dl = await downloadThumb(c.thumbUrl || c.url, dest, opts.refresh);
        saved.push({
          index: i + 1,
          candidateId: c.candidateId,
          source: c.source,
          score: c.score,
          title: c.title,
          credit: c.credit,
          license: c.license,
          sourceUrl: c.sourceUrl,
          thumbUrl: c.thumbUrl,
          url: c.url,
          width: c.width,
          height: c.height,
          localPath: dl ? localPath : null,
        });
        console.log(`    #${i + 1} score=${c.score} ${c.title}`);
      }

      manifest[event.id] = {
        eventId: event.id,
        title: event.title,
        location: event.location,
        country: event.country,
        kind: event.kind,
        primarySubject: primary,
        subjectTerms: subjects,
        searchQueries: queries.slice(0, 8),
        currentImage: `/images/events/${event.id}.jpg`,
        candidates: saved,
        fetchedAt: new Date().toISOString(),
      };

      if (!done.has(event.id)) {
        checkpoint.completed.push(event.id);
      }
      writeFileSync(outManifest, JSON.stringify(manifest, null, 2));
      writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));

      console.log(`  ok ${saved.length} candidates`);
      ok++;
    } catch (err) {
      console.error(`  fail ${event.id}: ${err.message}`);
      fail++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`done ok=${ok} fail=${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
