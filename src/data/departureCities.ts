export type DepartureCityId =
  | "melbourne"
  | "sydney"
  | "brisbane"
  | "perth"
  | "adelaide"
  | "auckland"
  | "singapore"
  | "london";

export interface DepartureCity {
  id: DepartureCityId;
  label: string;
  country: string;
  airport: string;
  lat: number;
  lng: number;
}

export const DEPARTURE_CITIES: DepartureCity[] = [
  {
    id: "melbourne",
    label: "Melbourne",
    country: "Australia",
    airport: "MEL",
    lat: -37.67,
    lng: 144.84,
  },
  {
    id: "sydney",
    label: "Sydney",
    country: "Australia",
    airport: "SYD",
    lat: -33.95,
    lng: 151.18,
  },
  {
    id: "brisbane",
    label: "Brisbane",
    country: "Australia",
    airport: "BNE",
    lat: -27.38,
    lng: 153.12,
  },
  {
    id: "perth",
    label: "Perth",
    country: "Australia",
    airport: "PER",
    lat: -31.94,
    lng: 115.97,
  },
  {
    id: "adelaide",
    label: "Adelaide",
    country: "Australia",
    airport: "ADL",
    lat: -34.95,
    lng: 138.53,
  },
  {
    id: "auckland",
    label: "Auckland",
    country: "New Zealand",
    airport: "AKL",
    lat: -37.01,
    lng: 174.79,
  },
  {
    id: "singapore",
    label: "Singapore",
    country: "Singapore",
    airport: "SIN",
    lat: 1.36,
    lng: 103.99,
  },
  {
    id: "london",
    label: "London",
    country: "United Kingdom",
    airport: "LHR",
    lat: 51.47,
    lng: -0.45,
  },
];

export const DEFAULT_DEPARTURE_CITY_ID: DepartureCityId = "melbourne";

export function getDepartureCity(id: DepartureCityId): DepartureCity {
  const city = DEPARTURE_CITIES.find((c) => c.id === id);
  if (!city) throw new Error(`Unknown departure city: ${id}`);
  return city;
}

export function isDepartureCityId(value: string): value is DepartureCityId {
  return DEPARTURE_CITIES.some((c) => c.id === value);
}
