import type { Region } from "@/lib/types";

/** Map Natural Earth / world.geo.json country ids to app regions. */
const BY_ID: Record<string, Region> = {
  // Africa
  AGO: "Africa",
  BDI: "Africa",
  BEN: "Africa",
  BFA: "Africa",
  BWA: "Africa",
  CAF: "Africa",
  CIV: "Africa",
  CMR: "Africa",
  COD: "Africa",
  COG: "Africa",
  DZA: "Africa",
  DJI: "Africa",
  EGY: "Africa",
  ERI: "Africa",
  ETH: "Africa",
  GAB: "Africa",
  GHA: "Africa",
  GIN: "Africa",
  GMB: "Africa",
  GNB: "Africa",
  GNQ: "Africa",
  KEN: "Africa",
  LBR: "Africa",
  LBY: "Africa",
  LSO: "Africa",
  MDG: "Africa",
  MLI: "Africa",
  MRT: "Africa",
  MOZ: "Africa",
  MWI: "Africa",
  NAM: "Africa",
  NER: "Africa",
  NGA: "Africa",
  RWA: "Africa",
  SEN: "Africa",
  SLE: "Africa",
  SOM: "Africa",
  SSD: "Africa",
  SDN: "Africa",
  SWZ: "Africa",
  TCD: "Africa",
  TGO: "Africa",
  TZA: "Africa",
  UGA: "Africa",
  ZAF: "Africa",
  ZMB: "Africa",
  ZWE: "Africa",
  MAR: "Africa",
  ESH: "Africa",
  TUN: "Africa",

  // Asia
  AFG: "Asia",
  ARM: "Asia",
  AZE: "Asia",
  BGD: "Asia",
  BTN: "Asia",
  BRN: "Asia",
  CHN: "Asia",
  IND: "Asia",
  IDN: "Asia",
  IRN: "Asia",
  IRQ: "Asia",
  JPN: "Asia",
  KAZ: "Asia",
  KGZ: "Asia",
  KHM: "Asia",
  KOR: "Asia",
  PRK: "Asia",
  LAO: "Asia",
  MMR: "Asia",
  MNG: "Asia",
  MYS: "Asia",
  NPL: "Asia",
  PAK: "Asia",
  PHL: "Asia",
  LKA: "Asia",
  SYR: "Asia",
  TWN: "Asia",
  THA: "Asia",
  TJK: "Asia",
  TLS: "Asia",
  TKM: "Asia",
  TUR: "Asia",
  UZB: "Asia",
  VNM: "Asia",
  YEM: "Asia",
  ARE: "Asia",
  KWT: "Asia",
  LBN: "Asia",
  OMN: "Asia",
  PSE: "Asia",
  QAT: "Asia",
  ISR: "Asia",
  JOR: "Asia",
  GEO: "Asia",
  SAU: "Asia",
  RUS: "Asia",

  // Europe
  ALB: "Europe",
  AUT: "Europe",
  BEL: "Europe",
  BGR: "Europe",
  BIH: "Europe",
  BLR: "Europe",
  CHE: "Europe",
  CZE: "Europe",
  DEU: "Europe",
  DNK: "Europe",
  ESP: "Europe",
  EST: "Europe",
  FIN: "Europe",
  FRA: "Europe",
  GBR: "Europe",
  GRC: "Europe",
  HRV: "Europe",
  HUN: "Europe",
  ISL: "Europe",
  IRL: "Europe",
  ITA: "Europe",
  LTU: "Europe",
  LUX: "Europe",
  LVA: "Europe",
  MKD: "Europe",
  MDA: "Europe",
  MLT: "Europe",
  MNE: "Europe",
  NLD: "Europe",
  NOR: "Europe",
  POL: "Europe",
  PRT: "Europe",
  ROU: "Europe",
  SRB: "Europe",
  SVK: "Europe",
  SVN: "Europe",
  SWE: "Europe",
  UKR: "Europe",
  "CS-KM": "Europe",
  CYP: "Europe",

  // North America
  CAN: "North America",
  USA: "North America",
  MEX: "North America",

  // Central America
  BLZ: "Central America",
  CRI: "Central America",
  GTM: "Central America",
  HND: "Central America",
  NIC: "Central America",
  PAN: "Central America",
  SLV: "Central America",

  // Caribbean
  BHS: "Caribbean",
  CUB: "Caribbean",
  DOM: "Caribbean",
  HTI: "Caribbean",
  JAM: "Caribbean",
  PRI: "Caribbean",
  TTO: "Caribbean",
  BMU: "Caribbean",

  // South America
  ARG: "South America",
  BOL: "South America",
  BRA: "South America",
  CHL: "South America",
  COL: "South America",
  ECU: "South America",
  GUF: "South America",
  GUY: "South America",
  FLK: "South America",
  PER: "South America",
  PRY: "South America",
  SUR: "South America",
  URY: "South America",
  VEN: "South America",

  // Oceania
  AUS: "Oceania",
  NZL: "Oceania",
  FJI: "Oceania",
  PNG: "Oceania",
  SLB: "Oceania",
  VUT: "Oceania",
  NCL: "Oceania",

  // Polar
  ATA: "Polar",
  GRL: "Polar",
  ATF: "Polar",
};

const BY_NAME: Record<string, Region> = {
  Somaliland: "Africa",
  "Northern Cyprus": "Europe",
};

export function regionForCountry(
  id: string | number | undefined,
  name: string | undefined,
): Region | null {
  if (id != null && BY_ID[String(id)]) return BY_ID[String(id)];
  if (name && BY_NAME[name]) return BY_NAME[name];
  return null;
}

export type CountryFeatureProperties = {
  name?: string;
};

export type CountryFeature = GeoJSON.Feature<
  GeoJSON.Geometry,
  CountryFeatureProperties
>;

export function regionForFeature(feature: CountryFeature): Region | null {
  const id = (feature as GeoJSON.Feature & { id?: string }).id;
  return regionForCountry(id, feature.properties?.name);
}
