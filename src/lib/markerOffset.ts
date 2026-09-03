import type { WildlifeEvent } from "./types";

/** Events within this distance are spread into a ring on the map. */
const CLUSTER_RADIUS_KM = 10;

/** Ground distance between spread pins in a cluster. */
const SPREAD_RADIUS_KM = 14;

export interface LatLng {
  lat: number;
  lng: number;
}

function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function offsetLatLng(
  origin: LatLng,
  bearingDeg: number,
  distanceKm: number,
): LatLng {
  const R = 6371;
  const bearing = (bearingDeg * Math.PI) / 180;
  const lat1 = (origin.lat * Math.PI) / 180;
  const lng1 = (origin.lng * Math.PI) / 180;
  const d = distanceKm / R;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) +
      Math.cos(lat1) * Math.sin(d) * Math.cos(bearing),
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2),
    );
  return {
    lat: (lat2 * 180) / Math.PI,
    lng: (lng2 * 180) / Math.PI,
  };
}

function clusterCentroid(members: WildlifeEvent[]): LatLng {
  const lat =
    members.reduce((sum, e) => sum + e.lat, 0) / members.length;
  const lng =
    members.reduce((sum, e) => sum + e.lng, 0) / members.length;
  return { lat, lng };
}

function buildClusters(events: WildlifeEvent[]): WildlifeEvent[][] {
  const parent = events.map((_, i) => i);

  function find(i: number): number {
    return parent[i] === i ? i : (parent[i] = find(parent[i]));
  }

  function unite(i: number, j: number): void {
    parent[find(i)] = find(j);
  }

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (
        haversineKm(events[i], events[j]) <= CLUSTER_RADIUS_KM
      ) {
        unite(i, j);
      }
    }
  }

  const groups = new Map<number, WildlifeEvent[]>();
  for (let i = 0; i < events.length; i++) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(events[i]);
  }

  return [...groups.values()];
}

/**
 * Returns map pin coordinates for each event. Overlapping/nearby events are
 * fanned into a ring; true event.lat/lng stay unchanged for detail views.
 */
export function displayPositionsForEvents(
  events: WildlifeEvent[],
): Map<string, LatLng> {
  const positions = new Map<string, LatLng>();

  for (const event of events) {
    positions.set(event.id, { lat: event.lat, lng: event.lng });
  }

  for (const cluster of buildClusters(events)) {
    if (cluster.length < 2) continue;

    const centroid = clusterCentroid(cluster);
    const sorted = [...cluster].sort((a, b) => a.id.localeCompare(b.id));
    const step = 360 / sorted.length;
    const start = sorted[0].id.charCodeAt(0) % 360;

    sorted.forEach((event, index) => {
      const bearing = start + step * index;
      positions.set(
        event.id,
        offsetLatLng(centroid, bearing, SPREAD_RADIUS_KM),
      );
    });
  }

  return positions;
}

export function displayPositionForEvent(
  event: WildlifeEvent,
  events: WildlifeEvent[],
): LatLng {
  return (
    displayPositionsForEvents(events).get(event.id) ?? {
      lat: event.lat,
      lng: event.lng,
    }
  );
}
