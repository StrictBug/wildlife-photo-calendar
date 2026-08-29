import type { DepartureAirport } from "@/data/airports";
import { getGateway } from "@/data/gatewayAirports";
import type { WildlifeEvent } from "@/lib/types";

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

function connectionSurcharge(event: WildlifeEvent): number {
  let extra = 0;
  if (event.access === "fly-in") extra += 450;
  if (event.region === "Polar") extra += 800;
  if (event.country === "Papua New Guinea") extra += 550;
  if (event.country === "Antarctica") extra += 1200;
  if (event.country === "Madagascar") extra += 350;
  return extra;
}

/** Rough round-trip economy airfare in AUD from any origin airport (not live pricing). */
export function estimateFlightAUD(
  origin: DepartureAirport,
  event: WildlifeEvent,
): number {
  const gateway = getGateway(event);
  const km = haversineKm(origin.lat, origin.lng, gateway.lat, gateway.lng);

  let roundTrip: number;
  if (km < 400) {
    roundTrip = 150 + km * 0.4;
  } else if (km < 1500) {
    roundTrip = 220 + km * 0.28;
  } else if (km < 4000) {
    roundTrip = 450 + km * 0.17;
  } else if (km < 9000) {
    roundTrip = 750 + km * 0.13;
  } else {
    roundTrip = 1100 + km * 0.11;
  }

  roundTrip = Math.min(5600, Math.max(120, roundTrip));
  return roundTrip + connectionSurcharge(event);
}
