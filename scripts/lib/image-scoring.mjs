const BAD_EXT = new Set(["pdf", "svg", "djvu", "webm", "ogv", "tif", "tiff"]);
const BAD_KEYWORDS =
  /\b(specimen|museum|diagram|map\b|stamp|logo|captive|zoo|illustration|drawing|chart|herbarium|scan\b|plate\b|icon\b|avatar)\b/i;

const OFF_TOPIC_KEYWORDS =
  /\b(mosque|temple|church|cathedral|locomotive|train|railway|airport|stadium|hotel|portrait of|headshot|banknote|coin|flag|map of|building|architecture|skyscraper|highway|intersection)\b/i;

const ARTISTIC_KEYWORDS =
  /\b(sunrise|sunset|golden hour|golden-hour|mist|fog|aurora|landscape|panorama|dramatic|silhouette|reflection|milky way|night sky|bokeh|scenic|vista)\b/i;

const QUALITY_CATEGORIES =
  /featured pictures|quality images|valued images|picture of the (day|year)/i;

const GENERIC_TITLE_WORDS = new Set([
  "forest",
  "plains",
  "plain",
  "season",
  "wildlife",
  "coast",
  "island",
  "islands",
  "national",
  "park",
  "valley",
  "mountains",
  "mountain",
  "river",
  "lakes",
  "lake",
  "bay",
  "peninsula",
  "northern",
  "southern",
  "eastern",
  "western",
  "great",
  "wild",
  "run",
  "crossing",
  "crossings",
  "masses",
  "colonies",
  "colony",
  "seasons",
  "winter",
  "summer",
  "spring",
  "autumn",
]);

const LABEL_MODIFIERS = new Set([
  "lesser",
  "greater",
  "northern",
  "southern",
  "eastern",
  "western",
  "african",
  "asian",
  "blue",
  "synchronous",
  "common",
  "giant",
  "red",
  "black",
  "white",
]);

function distinctiveLabelTokens(label) {
  return label
    .toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length > 3 && !LABEL_MODIFIERS.has(part));
}

function titleMatchesToken(titleHay, token) {
  if (matchesSubjectTerm(titleHay, token)) return true;
  if (token.length >= 5) {
    const stem = token.slice(0, 5);
    return new RegExp(`\\b${stem}[a-z]*`, "i").test(titleHay);
  }
  return false;
}

function titleMatchesWildlifeSubject(titleHay, event) {
  for (const label of event.animalLabels || []) {
    const lower = label.toLowerCase();
    if (titleMatchesToken(titleHay, lower)) return true;
    for (const token of distinctiveLabelTokens(label)) {
      if (titleMatchesToken(titleHay, token)) return true;
    }
  }
  return false;
}
export function extractSubjectTerms(event) {
  if (event.kind === "nature") {
    const fromLabels = (event.subjectLabels || []).flatMap((label) =>
      label
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 2 && !GENERIC_TITLE_WORDS.has(t)),
    );
    const fromTitle = event.title
      .toLowerCase()
      .split(/\W+/)
      .filter((t) => t.length > 3 && !GENERIC_TITLE_WORDS.has(t));
    return [...new Set([...(event.subjectLabels || []), ...fromLabels, ...fromTitle])];
  }

  const terms = [];
  for (const label of event.animalLabels || []) {
    terms.push(label.toLowerCase());
  }

  const labelWords = new Set(
    (event.animalLabels || []).flatMap((l) => l.toLowerCase().split(/\s+/)),
  );
  for (const word of event.title.toLowerCase().split(/\W+/)) {
    if (word.length > 4 && labelWords.has(word) && !GENERIC_TITLE_WORDS.has(word)) {
      terms.push(word);
    }
  }

  return [...new Set(terms)];
}

export function primarySubjectTerm(event) {
  if (event.kind === "wildlife" && event.animalLabels?.length) {
    return event.animalLabels[0].toLowerCase();
  }
  const terms = extractSubjectTerms(event);
  return terms[0] || "";
}

function candidateHaystack(candidate) {
  return `${candidate.title || ""} ${candidate.description || ""}`.toLowerCase();
}

function candidateTitleHaystack(candidate) {
  return (candidate.title || "").toLowerCase();
}

function matchesSubjectTerm(haystack, term) {
  const t = term.toLowerCase().trim();
  if (!t) return false;
  if (haystack.includes(t)) return true;
  if (t.includes(" ")) {
    return t.split(/\s+/).every((part) => haystack.includes(part));
  }
  return false;
}

export function candidateMatchesSubject(candidate, event) {
  if (event.kind === "wildlife") {
    return titleMatchesWildlifeSubject(candidateTitleHaystack(candidate), event);
  }
  const haystack = candidateHaystack(candidate);
  const terms = extractSubjectTerms(event);
  if (terms.length === 0) return true;
  return terms.some((term) => matchesSubjectTerm(haystack, term));
}

export function isAllowedLicense(license) {
  if (!license) return false;
  const l = license.toLowerCase();
  if (l.includes("non-commercial") || l.includes("no derivatives")) return false;
  if (l.includes("all rights reserved")) return false;
  if (
    l.includes("cc0") ||
    l.includes("public domain") ||
    l.includes("cc by") ||
    l.includes("gfdl")
  ) {
    return true;
  }
  return false;
}

export function passesHardFilters(candidate, event) {
  if (!candidate.thumbUrl && !candidate.url) return false;
  if (candidate.mime && !candidate.mime.startsWith("image/")) return false;
  const ext = (candidate.url || candidate.thumbUrl || "")
    .split(".")
    .pop()
    ?.toLowerCase()
    .split("?")[0];
  if (ext && BAD_EXT.has(ext)) return false;

  const haystack = candidateHaystack(candidate);
  if (BAD_KEYWORDS.test(haystack)) return false;
  if (OFF_TOPIC_KEYWORDS.test(haystack)) return false;

  const w = candidate.width || 0;
  if (w > 0 && w < 1200) return false;
  if (!isAllowedLicense(candidate.license)) return false;

  if (event.kind === "wildlife") {
    if (!candidateMatchesSubject(candidate, event)) return false;
  }

  return true;
}

export function scoreCandidate(candidate, event) {
  let score = 0;
  const w = candidate.width || 0;
  const h = candidate.height || 0;
  const haystack = candidateHaystack(candidate);
  const titleHay = candidateTitleHaystack(candidate);
  const primary = primarySubjectTerm(event);
  const subjectTerms = extractSubjectTerms(event);

  if (OFF_TOPIC_KEYWORDS.test(haystack)) score -= 50;

  if (primary && matchesSubjectTerm(titleHay, primary)) score += 30;
  else if (primary && matchesSubjectTerm(haystack, primary)) score += 10;

  for (const term of subjectTerms) {
    if (term !== primary && matchesSubjectTerm(titleHay, term)) score += 15;
    else if (term !== primary && matchesSubjectTerm(haystack, term)) score += 5;
  }

  if (QUALITY_CATEGORIES.test(haystack)) score += 20;
  if (ARTISTIC_KEYWORDS.test(haystack)) score += 10;
  if (w >= 2400) score += 8;
  else if (w >= 1800) score += 5;
  else if (w >= 1200) score += 2;

  if (h > 0 && w > 0) {
    const aspect = w / h;
    if (event.kind === "nature" && aspect >= 1.2) score += 8;
    if (event.kind === "wildlife" && aspect >= 0.9 && aspect <= 2.2) score += 4;
    if (aspect < 0.6 || aspect > 3.5) score -= 8;
  }

  if (candidate.source === "flickr") score += 5;

  return score;
}

export function rankCandidates(candidates, event, limit = 5) {
  const seen = new Set();
  const filtered = [];
  for (const c of candidates) {
    const key = c.candidateId || c.thumbUrl || c.url;
    if (!key || seen.has(key)) continue;
    if (!passesHardFilters(c, event)) continue;
    seen.add(key);
    filtered.push({ ...c, score: scoreCandidate(c, event) });
  }
  filtered.sort((a, b) => b.score - a.score);
  return filtered.slice(0, limit);
}

export function buildSearchQueries(event) {
  const place = event.location.split(/[/,(]/)[0].trim();
  const region = event.location.replace(/\s+/g, " ").trim();
  const primary = primarySubjectTerm(event);
  const queries = [];

  if (event.kind === "nature") {
    const subjects = (event.subjectLabels || []).slice(0, 2);
    for (const subj of subjects) {
      queries.push(
        `${subj} ${place}`,
        `incategory:"Quality_images" ${subj} ${place}`,
      );
    }
    queries.push(
      `incategory:"Quality_images" ${place}`,
      `incategory:"Featured_pictures" ${place}`,
      `${place} sunrise landscape`,
      `${place} golden hour`,
      `${event.title} ${place} landscape`,
    );
    return [...new Set(queries)];
  }

  if (!primary) {
    queries.push(`${event.title} wildlife photography`);
    return queries;
  }

  const mainLabel = event.animalLabels?.[0] || primary;
  queries.push(
    `${mainLabel} wildlife photography`,
    `${mainLabel} ${region}`,
    `${mainLabel} ${place}`,
    `incategory:"Quality_images" ${mainLabel}`,
    `incategory:"Featured_pictures" ${mainLabel}`,
  );

  for (const label of (event.animalLabels || []).slice(1, 3)) {
    queries.push(`${label} ${place}`);
  }

  for (const label of (event.animalLabels || []).slice(0, 3)) {
    for (const token of distinctiveLabelTokens(label)) {
      queries.push(`${token} ${place}`, `incategory:"Quality_images" ${token}`);
    }
  }

  return [...new Set(queries)];
}

export function flickrSearchQuery(event) {
  const primary = primarySubjectTerm(event);
  const place = event.location.split(/[/,(]/)[0].trim();
  if (event.kind === "wildlife" && primary) {
    return `${primary} ${place} wildlife`;
  }
  return `${event.title} ${place}`;
}
