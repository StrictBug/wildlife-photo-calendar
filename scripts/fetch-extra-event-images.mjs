#!/usr/bin/env node
/**
 * Search Wikimedia Commons and download 960px thumbs for newly added events.
 * Writes scripts/extra-event-image-meta.json and public/images/events/<id>.jpg
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/events");
const metaPath = join(__dirname, "extra-event-image-meta.json");
const UA = "WildSeason/1.0 (wildlife-photo-calendar; educational)";

const searches = {
  "rottnest-quokkas": "quokka Rottnest Island",
  "port-lincoln-great-whites": "great white shark cage diving",
  "phillip-island-penguins": "little penguin Eudyptula",
  "montague-island-seals": "Australian fur seal colony",
  "maria-island-wombats": "wombat Maria Island Tasmania",
  "kakadu-crocodiles": "saltwater crocodile Kakadu",
  "daintree-rainforest": "cassowary Daintree rainforest",
  "mon-repos-turtles": "loggerhead turtle nesting beach",
  "shark-bay-dugongs": "dugong Shark Bay",
  "houtman-abrolhos-seals": "Australian sea lion",
  "heron-island-reef": "green turtle Great Barrier Reef underwater",
  "magnetic-island-koalas": "koala in eucalyptus Australia",
  "eungella-platypus": "platypus Ornithorhynchus anatinus",
  "christmas-island-crabs": "Christmas Island red crab migration",
  "kaikoura-sperm-whales": "sperm whale Kaikoura",
  "stewart-island-kiwi": "brown kiwi Apteryx",
  "poor-knights-diving": "Poor Knights Islands underwater",
  "bay-of-islands-dolphins": "bottlenose dolphin New Zealand",
  "new-caledonia-lagoon": "New Caledonia lagoon coral reef",
  "vanuatu-coolidge-wreck": "SS President Coolidge wreck dive",
  "gabon-loango-hippos": "hippopotamus beach Gabon",
  "egypt-ras-mohammed": "Ras Mohammed coral reef underwater",
  "morocco-atlas-macaques": "Barbary macaque Atlas Morocco",
  "mauritania-banc-darguin": "Banc d'Arguin birds flamingos",
  "ghana-mole-elephants": "African elephant Mole National Park",
  "mozambique-ponta-turtles": "loggerhead turtle Mozambique",
  "south-africa-hermanus-whales": "southern right whale Hermanus",
  "kenya-samburu-special-five": "reticulated giraffe Samburu",
  "tanzania-nyerere-wild-dogs": "African wild dog Lycaon pictus",
  "seychelles-aldabra-tortoises": "Aldabra giant tortoise",
  "senegal-djoudj-pelicans": "great white pelican Djoudj",
  "raja-ampat-reefs": "Raja Ampat coral reef underwater",
  "sipadan-diving": "Sipadan barracuda school underwater",
  "similan-diving": "Similan Islands coral reef",
  "maldives-hanifaru-mantas": "manta ray Hanifaru Maldives",
  "kamchatka-brown-bears": "Kamchatka brown bear salmon",
  "baikal-nerpa-seals": "Baikal seal nerpa",
  "india-gir-lions": "Asiatic lion Gir National Park",
  "bangladesh-sundarbans": "Bengal tiger Sundarbans mangrove",
  "cambodia-mekong-dolphins": "Irrawaddy dolphin Mekong",
  "vietnam-cat-ba-langurs": "Cat Ba langur Trachypithecus poliocephalus",
  "philippines-apo-turtles": "green turtle Apo Island Philippines",
  "derawan-mantas": "manta ray Indonesia underwater",
  "bhutan-black-necked-cranes": "black-necked crane Bhutan",
  "mongolia-khustain-takhi": "Przewalski horse Mongolia",
  "japan-yakushima-monkeys": "Yakushima macaque cedar forest",
  "china-crested-ibis": "crested ibis Nipponia nippon",
  "sri-lanka-udawalawe-elephants": "Asian elephant Udawalawe",
  "france-camargue-flamingos": "greater flamingo Camargue",
  "spain-donana-wetlands": "Doñana flamingo wetland",
  "switzerland-alpine-ibex": "Alpine ibex Capra ibex",
  "sweden-boreal-bears": "brown bear Sweden forest",
  "italy-abruzzo-bears": "Marsican brown bear Abruzzo",
  "netherlands-wadden-seals": "harbour seal Wadden Sea",
  "scotland-mull-eagles": "white-tailed eagle Scotland",
  "germany-bavarian-lynx": "Eurasian lynx forest snow",
  "canary-islands-pilot-whales": "short-finned pilot whale Tenerife",
  "cape-cod-humpbacks": "humpback whale Stellwagen Bank",
  "florida-keys-reef": "Florida Keys coral reef underwater",
  "louisiana-alligator-swamps": "American alligator Louisiana swamp",
  "south-texas-birds": "green jay Texas",
  "great-smoky-bears": "black bear Great Smoky Mountains",
  "newfoundland-seabirds": "Atlantic puffin Newfoundland",
  "quebec-saguenay-belugas": "beluga whale Saguenay",
  "yucatan-whale-sharks": "whale shark Isla Mujeres",
  "channel-islands-marine": "California sea lion Channel Islands",
  "pribilof-seabirds": "northern fur seal Pribilof",
  "arizona-desert-wildlife": "javelina collared peccary Arizona",
  "costa-rica-corcovado": "scarlet macaw Corcovado",
  "honduras-utila-diving": "Utila coral reef underwater",
  "panama-bocas-dolphins": "bottlenose dolphin Caribbean Panama",
  "belize-hol-chan-diving": "southern stingray Belize underwater",
  "nicaragua-la-flor-turtles": "olive ridley turtle arribada",
  "argentina-valdes-orcas": "orca Peninsula Valdes intentional stranding",
  "brazil-fernando-noronha": "spinner dolphin Fernando de Noronha",
  "brazil-amazon-anavilhanas": "Amazon pink river dolphin Brazil",
  "brazil-bonito-snorkel": "Bonito Brazil river snorkel fish",
  "argentina-ibera-wildlife": "capybara Ibera wetlands",
  "peru-ballestas-seabirds": "Ballestas Islands Peru seabirds",
  "chile-humboldt-penguins": "Humboldt penguin Chile",
  "colombia-pacific-whales": "humpback whale Colombia Pacific",
  "guyana-iwokrama-rainforest": "jaguar rainforest South America",
  "cuba-zapata-wildlife": "bee hummingbird Cuba",
  "cayman-stingray-city": "southern stingray Grand Cayman",
  "puerto-rico-mona-iguanas": "Mona ground iguana",
  "turks-caicos-reef": "Turks and Caicos coral reef underwater",
  "south-georgia-king-penguins": "king penguin South Georgia colony",
  "greenland-diskos-icebergs": "iceberg Disko Bay Ilulissat",
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

async function searchImage(query) {
  const j = await api({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "8",
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
    const ext = (ii.url || "").split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "svg" || ext === "webm" || ext === "ogv")
      continue;
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
  return null;
}

const meta = existsSync(metaPath)
  ? JSON.parse(readFileSync(metaPath, "utf8"))
  : {};

let ok = 0;
let fail = 0;

for (const [id, query] of Object.entries(searches)) {
  const dest = join(outDir, `${id}.jpg`);
  if (existsSync(dest) && meta[id]?.thumbUrl) {
    console.log(`skip ${id}`);
    ok++;
    continue;
  }
  try {
    const info = meta[id]?.thumbUrl ? meta[id] : await searchImage(query);
    if (!info) {
      console.error(`no result ${id} (${query})`);
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
  await sleep(3500);
}

console.log(`done ok=${ok} fail=${fail}`);
process.exit(fail > 0 ? 1 : 0);
