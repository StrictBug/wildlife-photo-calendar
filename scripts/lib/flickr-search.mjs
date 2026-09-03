import { loadEnv } from "./load-env.mjs";

loadEnv();

const FLICKR_API = "https://api.flickr.com/services/rest/";
/** CC BY, CC BY-SA, CC BY-ND, CC0, Public Domain */
const CC_LICENSES = "4,5,6,9,10";

const LICENSE_LABELS = {
  4: "CC BY",
  5: "CC BY-SA",
  6: "CC BY-ND",
  9: "CC0",
  10: "Public domain",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function hasFlickrKey() {
  return Boolean(process.env.FLICKR_API_KEY);
}

export async function searchFlickr(query, limit = 15) {
  const apiKey = process.env.FLICKR_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    method: "flickr.photos.search",
    api_key: apiKey,
    text: query,
    license: CC_LICENSES,
    sort: "interestingness-desc",
    content_type: "1",
    media: "photos",
    extras: "url_l,url_o,license,owner_name,description,tags",
    per_page: String(Math.min(limit, 30)),
    format: "json",
    nojsoncallback: "1",
  });

  for (let i = 0; i < 4; i++) {
    const res = await fetch(`${FLICKR_API}?${params}`);
    const j = await res.json();
    if (j.stat === "fail") {
      if (j.code === 100) return [];
      await sleep(5000 * (i + 1));
      continue;
    }
    const photos = j.photos?.photo || [];
    return photos.map((p) => {
      const thumbUrl = (p.url_l || p.url_o || "").split("?")[0];
      const license = LICENSE_LABELS[p.license] || `License ${p.license}`;
      return {
        candidateId: `flickr:${p.id}`,
        source: "flickr",
        title: p.title || query,
        description: p.description?._content || p.tags || "",
        categories: "",
        url: p.url_o || p.url_l || "",
        thumbUrl,
        width: Number(p.width_o || p.width_l || 0),
        height: Number(p.height_o || p.height_l || 0),
        mime: "image/jpeg",
        sourceUrl: `https://www.flickr.com/photos/${p.owner}/${p.id}`,
        credit: `${p.ownername || "Flickr user"} / Flickr`,
        license,
        globalUsage: 0,
      };
    });
  }
  return [];
}
