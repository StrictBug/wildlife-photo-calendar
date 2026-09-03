# Event image curation

Upgrade event photos from auto-picked documentary shots to curated artistic images using **Wikimedia Commons** and **Flickr CC** (BY / BY-SA / CC0 / Public Domain).

## Setup

### Flickr API key (optional but recommended)

1. Create a free key at [Flickr App Garden](https://www.flickr.com/services/apps/create/).
2. Add to `.env.local` (gitignored):

```
FLICKR_API_KEY=your_key_here
```

Commons search works without Flickr; Flickr fills gaps when Commons returns fewer than 3 good candidates.

## Workflow

### 1. Fetch candidates

```bash
# Pilot (~28 events) — start here
node scripts/fetch-image-candidates.mjs --pilot

# All nature / landscape events (~115)
node scripts/fetch-image-candidates.mjs --nature

# All wildlife events
node scripts/fetch-image-candidates.mjs --wildlife

# Everything
node scripts/fetch-image-candidates.mjs --all

# Specific IDs
node scripts/fetch-image-candidates.mjs --ids=japan-kyoto-cherry-blossom,amboseli-elephants

# Re-fetch wildlife (ignore checkpoint for that scope)
node scripts/fetch-image-candidates.mjs --wildlife --refresh
```

### Wildlife relevance rules

Wildlife candidates are **subject-first**: searches use `animalLabels` and distilled title terms (e.g. `orangutan`), not bare place names like `Sabah Malaysia`.

Hard filters reject candidates that:

- Do not mention any subject term in title/description
- Contain off-topic keywords (mosque, train, temple, portrait, logo, etc.)
- Are below 1200px wide or use non-commercial licenses

Empty results are OK — use **Keep current** or **Skip** in the review gallery.

Outputs:

- `scripts/image-candidates.json` — metadata + scores
- `public/images/candidates/<eventId>/1.jpg` … `5.jpg` — local thumbs
- `scripts/image-candidates-checkpoint.json` — resume support (re-run skips completed)

Fetches are slow (~6s/event) due to Commons rate limits. Re-run safely to resume.

### 2. Review and pick

```bash
node scripts/review-gallery-server.mjs
```

Open http://localhost:3456

The gallery shows **subject terms** and **search queries** per event, prominent candidate filenames, and a **Needs review only** filter (0 candidates or top pick lacks subject match).

| Key | Action |
|-----|--------|
| `1`–`5` | Pick candidate |
| `K` | Keep current image |
| `S` | Skip (no change) |
| `←` / `→` | Previous / next event |

Selections auto-save to `scripts/image-selections.json`. Use **Save selections** to force-write.

### 3. Apply choices

```bash
node scripts/apply-image-selections.mjs --dry-run
node scripts/apply-image-selections.mjs
```

Downloads full-resolution images to `public/images/events/` and updates `src/data/eventImages.ts` credits/licenses.

## Customising search

- **`scripts/nature-event-searches.json`** — per-event Commons queries (nature batch)
- **`scripts/image-search-overrides.json`** — manual overrides for stubborn wildlife events:

```json
{
  "uganda-shoebill-stork": [
    "shoebill stork Uganda Balaeniceps",
    "shoebill sunrise wetland"
  ]
}
```

## Selections format

`scripts/image-selections.json`:

```json
{
  "japan-kyoto-cherry-blossom": { "choice": 2, "candidateId": "commons:File:..." },
  "some-niche-frog": { "choice": "skip" },
  "already-good-event": { "choice": "keep" }
}
```

## License compliance

Only CC0, Public Domain, CC BY, and CC BY-SA images are accepted. Credits and licenses are shown in the app via `ImageCredit` on event detail views.
