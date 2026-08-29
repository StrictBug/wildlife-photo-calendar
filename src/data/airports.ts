import majorAirports from "@/data/majorAirports.json";

/** OurAirports `large_airport` entries with IATA codes (~1.2k). */
export interface DepartureAirport {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export const MAJOR_AIRPORTS = majorAirports as DepartureAirport[];

export const DEFAULT_DEPARTURE_IATA = "MEL";

/** Quick picks shown when the search box is empty / focused. */
export const POPULAR_DEPARTURE_IATAS = [
  "MEL",
  "SYD",
  "BNE",
  "PER",
  "ADL",
  "AKL",
  "SIN",
  "LHR",
  "LAX",
  "JFK",
  "NRT",
  "DXB",
] as const;

const BY_IATA = new Map(
  MAJOR_AIRPORTS.map((airport) => [airport.iata, airport]),
);

export function getAirport(iata: string): DepartureAirport | undefined {
  return BY_IATA.get(iata.toUpperCase());
}

export function requireAirport(iata: string): DepartureAirport {
  const airport = getAirport(iata);
  if (!airport) throw new Error(`Unknown airport: ${iata}`);
  return airport;
}

export function getPopularAirports(): DepartureAirport[] {
  return POPULAR_DEPARTURE_IATAS.map((iata) => getAirport(iata)).filter(
    (a): a is DepartureAirport => Boolean(a),
  );
}

export function formatAirportLabel(airport: DepartureAirport): string {
  const place = airport.city || airport.name;
  return `${airport.iata} — ${place}`;
}

export function formatAirportOption(airport: DepartureAirport): string {
  const place = [airport.city, airport.country].filter(Boolean).join(", ");
  return place
    ? `${airport.iata} — ${airport.name} (${place})`
    : `${airport.iata} — ${airport.name}`;
}

/** Full browse list: popular picks first, then every major airport. */
const ALL_AIRPORTS_BROWSE = (() => {
  const popular = getPopularAirports();
  const popularIatas = new Set(popular.map((a) => a.iata));
  const rest = MAJOR_AIRPORTS.filter((a) => !popularIatas.has(a.iata)).sort(
    (a, b) =>
      a.city.localeCompare(b.city) || a.iata.localeCompare(b.iata),
  );
  return [...popular, ...rest];
})();

export function listAllAirports(): DepartureAirport[] {
  return ALL_AIRPORTS_BROWSE;
}

/** Ranked search over IATA, city, and airport name. Empty query → full list. */
export function searchAirports(
  query: string,
  limit = 12,
): DepartureAirport[] {
  const q = query.trim().toLowerCase();
  if (!q) return listAllAirports();

  const scored: { airport: DepartureAirport; score: number }[] = [];

  for (const airport of MAJOR_AIRPORTS) {
    const iata = airport.iata.toLowerCase();
    const city = airport.city.toLowerCase();
    const name = airport.name.toLowerCase();
    let score = -1;

    if (iata === q) score = 100;
    else if (iata.startsWith(q)) score = 90;
    else if (city === q) score = 80;
    else if (city.startsWith(q)) score = 70;
    else if (city.includes(q)) score = 50;
    else if (name.startsWith(q)) score = 40;
    else if (name.includes(q)) score = 20;

    if (score >= 0) scored.push({ airport, score });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score || a.airport.iata.localeCompare(b.airport.iata),
  );

  return scored.slice(0, limit).map((s) => s.airport);
}
