import type { Region } from "@/lib/types";

export const REGION_COLORS: Record<Region, string> = {
  Africa: "#2f5a42",
  Asia: "#3d6b52",
  Europe: "#4a7a5c",
  "North America": "#2a4a5c",
  "Central America": "#5a8a6a",
  "South America": "#3a5c2e",
  Oceania: "#1e5c4a",
  Polar: "#5a8a9a",
  Caribbean: "#6b9e7a",
};

export const MAP_REGIONS: Region[] = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Central America",
  "Caribbean",
  "South America",
  "Oceania",
  "Polar",
];
