import type { Region } from "@/lib/types";

/** Minimal longitude span above this → show world view (regions on opposite sides of globe). */
export const WORLD_VIEW_LNG_SPAN = 150;

export type RegionMapFrame = {
  southWest: [number, number];
  northEast: [number, number];
  center: [number, number];
  maxZoom: number;
  /** Use setView(center, maxZoom) instead of fitBounds. */
  preferCenterZoom?: boolean;
};

/**
 * Map frames derived from country landmasses, excluding antimeridian-spanning
 * polygons (Russia, Fiji, Antarctica) that collapse bounds to the whole globe.
 */
export const REGION_FRAMES: Record<Region, RegionMapFrame> = {
  Africa: {
    southWest: [-34.82, -17.63],
    northEast: [37.35, 51.13],
    center: [1.27, 16.75],
    maxZoom: 4,
  },
  Asia: {
    southWest: [-10.36, 26.04],
    northEast: [77, 145.54],
    center: [33, 90],
    maxZoom: 3,
  },
  Europe: {
    southWest: [34.57, -24.33],
    northEast: [80.66, 40.08],
    center: [57.61, 7.88],
    maxZoom: 4,
  },
  "North America": {
    southWest: [14.54, -171.79],
    northEast: [83.23, -52.65],
    center: [48.89, -112.22],
    maxZoom: 3,
  },
  "Central America": {
    southWest: [7.22, -92.23],
    northEast: [18.5, -77.24],
    center: [12.86, -84.74],
    maxZoom: 5,
  },
  Caribbean: {
    southWest: [10, -84.97],
    northEast: [32.39, -60.9],
    center: [21.19, -72.93],
    maxZoom: 5,
  },
  "South America": {
    southWest: [-55.61, -81.41],
    northEast: [12.44, -34.73],
    center: [-21.59, -58.07],
    maxZoom: 4,
  },
  Oceania: {
    southWest: [-46.64, 113.34],
    northEast: [-2.5, 178.52],
    center: [-24.57, 145.93],
    maxZoom: 4,
  },
  Polar: {
    southWest: [-85.6, -180],
    northEast: [83.7, 180],
    center: [-1, 0],
    maxZoom: 1,
  },
};

const WORLD_VIEW: RegionMapFrame = {
  southWest: [-58, -180],
  northEast: [75, 180],
  center: [25, 10],
  maxZoom: 1,
  preferCenterZoom: true,
};

export function maxZoomForRegions(regions: Region[]): number {
  if (regions.length === 0) return 5;
  return Math.min(...regions.map((r) => REGION_FRAMES[r].maxZoom));
}

export type LatLng = [number, number];

/** Naive east-west span (misleading when regions share a hemisphere). */
export function simpleLngSpan(lngs: number[]): number {
  if (lngs.length === 0) return 0;
  return Math.max(...lngs) - Math.min(...lngs);
}

/**
 * Smallest longitude window covering all points on a sphere.
 * Europe + Central America ≈ 72°, not 132°.
 */
export function minimalLngSpan(lngs: number[]): number {
  if (lngs.length <= 1) return 0;

  const sorted = [...lngs].sort((a, b) => a - b);
  let maxGap = 0;

  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i];
    const next = sorted[(i + 1) % sorted.length];
    const gap = (next - curr + 360) % 360;
    if (gap > maxGap) maxGap = gap;
  }

  return 360 - maxGap;
}

function collectRegionCornerPoints(regions: Region[]): LatLng[] {
  const points: LatLng[] = [];
  for (const region of regions) {
    const frame = REGION_FRAMES[region];
    const [swLat, swLng] = frame.southWest;
    const [neLat, neLng] = frame.northEast;
    points.push(
      [swLat, swLng],
      [neLat, neLng],
      [swLat, neLng],
      [neLat, swLng],
      frame.center,
    );
  }
  return points;
}

/** Pick max zoom so geographic extent fits comfortably in the map panel. */
export function zoomForGeoSpan(latSpan: number, lngSpan: number): number {
  function zoomForSpan(span: number): number {
    if (span > 145) return 2;
    if (span > 95) return 3;
    if (span > 58) return 4;
    if (span > 36) return 5;
    if (span > 20) return 6;
    if (span > 10) return 7;
    return 8;
  }

  return Math.min(zoomForSpan(latSpan), zoomForSpan(lngSpan));
}

export type GeoExtent = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  latSpan: number;
  lngSpan: number;
};

export function extentFromPoints(points: LatLng[]): GeoExtent | null {
  if (points.length === 0) return null;

  let minLat = 90;
  let maxLat = -90;
  const lngs: number[] = [];

  for (const [lat, lng] of points) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    lngs.push(lng);
  }

  const latSpan = maxLat - minLat;
  const lngSpan = minimalLngSpan(lngs);

  return {
    minLat,
    maxLat,
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    latSpan,
    lngSpan,
  };
}

function frameFromExtent(
  extent: GeoExtent,
  maxZoomCap?: number,
): RegionMapFrame {
  const maxZoom = Math.min(
    zoomForGeoSpan(extent.latSpan, extent.lngSpan),
    maxZoomCap ?? 8,
  );

  return {
    southWest: [extent.minLat, extent.minLng],
    northEast: [extent.maxLat, extent.maxLng],
    center: [
      (extent.minLat + extent.maxLat) / 2,
      (extent.minLng + extent.maxLng) / 2,
    ],
    maxZoom,
  };
}

function boundsFromPoints(
  points: LatLng[],
  maxZoomCap?: number,
): RegionMapFrame | null {
  const extent = extentFromPoints(points);
  if (!extent) return null;

  if (extent.lngSpan > WORLD_VIEW_LNG_SPAN) {
    return null;
  }

  return frameFromExtent(extent, maxZoomCap);
}

export function computeRegionView(regions: Region[]): RegionMapFrame | null {
  if (regions.length === 0) return null;

  if (regions.length === 1) {
    return REGION_FRAMES[regions[0]];
  }

  const points = collectRegionCornerPoints(regions);
  const extent = extentFromPoints(points);

  if (!extent) {
    return WORLD_VIEW;
  }

  // Polar plus anything else spans nearly pole-to-pole — use full vertical frame.
  if (regions.includes("Polar") && extent.latSpan > 100) {
    return {
      ...REGION_FRAMES.Polar,
      maxZoom: 1,
    };
  }

  if (extent.lngSpan > WORLD_VIEW_LNG_SPAN) {
    return WORLD_VIEW;
  }

  const cap = maxZoomForRegions(regions);
  return frameFromExtent(extent, cap);
}

export type MapLike = {
  fitBounds: (
    bounds: [[number, number], [number, number]],
    options?: { padding?: [number, number]; maxZoom?: number },
  ) => void;
  setView: (center: [number, number], zoom: number) => void;
};

export function applyMapFrame(
  map: MapLike,
  frame: RegionMapFrame,
  padding: [number, number],
): void {
  if (frame.preferCenterZoom) {
    map.setView(frame.center, frame.maxZoom);
    return;
  }

  map.fitBounds([frame.southWest, frame.northEast], {
    padding,
    maxZoom: frame.maxZoom,
  });
}

export function fitMapToRegions(
  map: MapLike,
  regions: Region[],
  padding: [number, number],
): void {
  const view = computeRegionView(regions);
  if (!view) return;
  applyMapFrame(map, view, padding);
}

export function fitMapToEvents(
  map: MapLike,
  events: Array<{ lat: number; lng: number; region: Region }>,
  padding: [number, number],
): void {
  if (events.length === 0) {
    map.setView(WORLD_VIEW.center, 2);
    return;
  }

  const eventRegions = [...new Set(events.map((e) => e.region))];

  if (eventRegions.length !== 1) {
    fitMapToRegions(map, eventRegions, padding);
    return;
  }

  const pointView = boundsFromPoints(
    events.map((e) => [e.lat, e.lng] as LatLng),
    maxZoomForRegions(eventRegions),
  );

  if (pointView) {
    map.fitBounds([pointView.southWest, pointView.northEast], {
      padding,
      maxZoom: pointView.maxZoom,
    });
    return;
  }

  fitMapToRegions(map, eventRegions, padding);
}
