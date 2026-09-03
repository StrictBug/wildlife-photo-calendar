const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";
const API = "https://commons.wikimedia.org/w/api.php";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function commonsApi(params) {
  const url = API + "?" + new URLSearchParams(params);
  for (let i = 0; i < 8; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (text.startsWith("You are making") || res.status === 429) {
      await sleep(12000 * (i + 1));
      continue;
    }
    if (!text.trim().startsWith("{")) {
      await sleep(6000);
      continue;
    }
    return JSON.parse(text);
  }
  throw new Error("Commons API rate limited");
}

function stripHtml(s) {
  return (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function pageToCandidate(page) {
  const ii = page.imageinfo?.[0];
  if (!ii) return null;
  const url = ii.url || "";
  const thumbUrl = (ii.thumburl || ii.url || "").split("?")[0];
  if (!thumbUrl) return null;
  const artist = stripHtml(ii.extmetadata?.Artist?.value);
  const categories = stripHtml(ii.extmetadata?.Categories?.value);
  const description = stripHtml(ii.extmetadata?.ImageDescription?.value);
  const license = ii.extmetadata?.LicenseShortName?.value || "Unknown";
  return {
    candidateId: `commons:${page.title}`,
    source: "commons",
    title: page.title?.replace(/^File:/, "") || "",
    description,
    categories,
    url,
    thumbUrl,
    width: ii.width || 0,
    height: ii.height || 0,
    mime: ii.mime || "",
    sourceUrl: ii.descriptionurl || "",
    credit: (artist || "Wikimedia Commons") + " / Wikimedia Commons",
    license,
    globalUsage: page.globalusage?.length || 0,
  };
}

export async function searchCommons(query, limit = 15) {
  const j = await commonsApi({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: String(limit),
    prop: "imageinfo|globalusage",
    iiprop: "url|extmetadata|mime|size",
    iiurlwidth: "1280",
    gulimit: "5",
    format: "json",
  });
  const pages = Object.values(j.query?.pages || {});
  const out = [];
  for (const page of pages) {
    const c = pageToCandidate(page);
    if (c) out.push(c);
  }
  return out;
}
