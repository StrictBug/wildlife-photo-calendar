import {
  type DepartureCityId,
  getDepartureCity,
} from "@/data/departureCities";
import { getGateway } from "@/data/gatewayAirports";
import type { Region, WildlifeEvent } from "@/lib/types";

/** Round-trip economy estimates (AUD) from Melbourne by destination region. */
const MELBOURNE_REGION_BASE: Record<Region, number> = {
  Oceania: 420,
  Asia: 920,
  Europe: 2150,
  Africa: 2750,
  "North America": 2350,
  "Central America": 2550,
  "South America": 3100,
  Polar: 4800,
  Caribbean: 2950,
};

/** Multiplier vs Melbourne baseline for each departure city. */
const CITY_REGION_FACTOR: Record<
  DepartureCityId,
  Partial<Record<Region, number>>
> = {
  melbourne: {},
  sydney: {
    Oceania: 0.95,
    Asia: 0.98,
    Europe: 1.02,
    Africa: 1.02,
    "North America": 1.03,
    "Central America": 1.03,
    "South America": 1.04,
    Polar: 1.02,
    Caribbean: 1.03,
  },
  brisbane: {
    Oceania: 0.88,
    Asia: 0.92,
    Europe: 1.05,
    Africa: 1.06,
    "North America": 1.06,
    "Central America": 1.05,
    "South America": 1.05,
    Polar: 1.04,
    Caribbean: 1.05,
  },
  perth: {
    Oceania: 0.75,
    Asia: 0.72,
    Europe: 1.12,
    Africa: 1.08,
    "North America": 1.1,
    "Central America": 1.12,
    "South America": 1.15,
    Polar: 1.1,
    Caribbean: 1.12,
  },
  adelaide: {
    Oceania: 0.9,
    Asia: 0.96,
    Europe: 1.04,
    Africa: 1.04,
    "North America": 1.04,
    "Central America": 1.04,
    "South America": 1.05,
    Polar: 1.03,
    Caribbean: 1.04,
  },
  auckland: {
    Oceania: 0.55,
    Asia: 1.05,
    Europe: 1.08,
    Africa: 1.12,
    "North America": 1.1,
    "Central America": 1.12,
    "South America": 1.14,
    Polar: 1.15,
    Caribbean: 1.14,
  },
  singapore: {
    Oceania: 0.85,
    Asia: 0.45,
    Europe: 0.75,
    Africa: 0.82,
    "North America": 0.88,
    "Central America": 0.9,
    "South America": 1.0,
    Polar: 1.2,
    Caribbean: 0.95,
  },
  london: {
    Oceania: 1.35,
    Asia: 0.55,
    Europe: 0.25,
    Africa: 0.45,
    "North America": 0.5,
    "Central America": 0.65,
    "South America": 0.75,
    Polar: 0.7,
    Caribbean: 0.6,
  },
};

const AUSTRALIAN_CITY_IDS = new Set<DepartureCityId>([
  "melbourne",
  "sydney",
  "brisbane",
  "perth",
  "adelaide",
]);

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateDomesticAustraliaAUD(
  departureId: DepartureCityId,
  event: WildlifeEvent,
): number {
  const dep = getDepartureCity(departureId);
  const km = haversineKm(dep.lat, dep.lng, event.lat, event.lng);
  const oneWay = 90 + km * 0.22;
  return Math.round(Math.min(950, Math.max(160, oneWay * 2)));
}

function connectionSurcharge(event: WildlifeEvent): number {
  let extra = 0;
  if (event.access === "fly-in") extra += 450;
  if (event.region === "Polar") extra += 800;
  if (event.country === "Papua New Guinea") extra += 550;
  if (event.country === "Antarctica") extra += 1200;
  if (event.country === "Madagascar") extra += 350;
  return extra;
}

function distanceAdjustment(
  departureId: DepartureCityId,
  event: WildlifeEvent,
  base: number,
): number {
  const dep = getDepartureCity(departureId);
  const gateway = getGateway(event);
  const mel = getDepartureCity("melbourne");

  const melKm = haversineKm(mel.lat, mel.lng, gateway.lat, gateway.lng);
  const depKm = haversineKm(dep.lat, dep.lng, gateway.lat, gateway.lng);
  if (melKm < 500) return base;

  const ratio = depKm / melKm;
  return Math.round(base * (0.65 + 0.35 * ratio));
}

/** Rough round-trip economy airfare in AUD (static estimate, not live pricing). */
export function estimateFlightAUD(
  departureId: DepartureCityId,
  event: WildlifeEvent,
): number {
  const dep = getDepartureCity(departureId);

  if (
    event.country === "Australia" &&
    AUSTRALIAN_CITY_IDS.has(departureId) &&
    dep.country === "Australia"
  ) {
    return estimateDomesticAustraliaAUD(departureId, event);
  }

  if (event.country === dep.country) {
    return 180;
  }

  const regionalFactor =
    CITY_REGION_FACTOR[departureId][event.region] ?? 1;
  const melBase = MELBOURNE_REGION_BASE[event.region];
  let estimate = melBase * regionalFactor;

  if (departureId !== "melbourne") {
    estimate = distanceAdjustment(departureId, event, estimate);
  } else {
    estimate = Math.round(estimate);
  }

  return estimate + connectionSurcharge(event);
}
