"use client";

import { useEffect, useState } from "react";
import type { GeoJSON } from "geojson";
import { GeoJSON as LeafletGeoJSON } from "react-leaflet";
import { REGION_COLORS } from "@/data/regionBounds";
import {
  type CountryFeature,
  regionForFeature,
} from "@/lib/countryRegions";
import type { FilterState, Region } from "@/lib/types";

function regionHighlight(
  region: Region,
  filters: FilterState,
): { fill: number; stroke: number; active: boolean } {
  const hasRegionFilter = filters.regions.length > 0;
  const active =
    !hasRegionFilter || filters.regions.includes(region);

  if (!active) {
    return { fill: 0.03, stroke: 0.12, active: false };
  }
  if (hasRegionFilter) {
    return { fill: 0.38, stroke: 0.85, active: true };
  }
  return { fill: 0.18, stroke: 0.5, active: true };
}

export function RegionLandmasses({ filters }: { filters: FilterState }) {
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/geo/countries.geojson")
      .then((r) => r.json())
      .then((json: GeoJSON.FeatureCollection) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  return (
    <LeafletGeoJSON
      key={filters.regions.join(",") || "all"}
      data={data}
      style={(feature) => {
        const region = regionForFeature(feature as CountryFeature);
        if (!region) {
          return { fillOpacity: 0, weight: 0, opacity: 0 };
        }
        const color = REGION_COLORS[region];
        const { fill, stroke, active } = regionHighlight(region, filters);
        return {
          color,
          fillColor: color,
          fillOpacity: fill,
          weight: active ? 1.2 : 0.6,
          opacity: stroke,
        };
      }}
    />
  );
}
