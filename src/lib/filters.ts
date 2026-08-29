import { eventOverlapsMonth } from "./calendar";
import { DEFAULT_DEPARTURE_IATA } from "@/data/airports";
import {
  computeEventBudget,
  DEFAULT_TYPICAL_TRIP_DAYS,
} from "./budget";
import type {
  AccessMode,
  AccommodationStyle,
  BudgetBand,
  Climate,
  Danger,
  Difficulty,
  FilterState,
  Pace,
  PhotoStyle,
  Region,
  TourAccess,
  AnimalType,
  WildlifeEvent,
} from "./types";

export const REGIONS: Region[] = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Central America",
  "South America",
  "Oceania",
  "Polar",
  "Caribbean",
];

export const STYLES: PhotoStyle[] = [
  "telephoto",
  "macro",
  "underwater",
  "landscape",
  "wide-angle",
  "aerial",
  "safari",
];

export const ACCESS_MODES: AccessMode[] = [
  "hike-in",
  "drive-in",
  "boat-access",
  "fly-in",
  "walk-in",
];

export const ACCESS_LABELS: Record<AccessMode, string> = {
  "hike-in": "Hike in",
  "drive-in": "Drive in",
  "boat-access": "Boat access",
  "fly-in": "Fly in",
  "walk-in": "Walk in",
};

export const ACCOMMODATION_STYLES: AccommodationStyle[] = [
  "camping",
  "hotel",
  "liveaboard",
  "tented-camp",
  "homestay",
];

export const ACCOMMODATION_LABELS: Record<AccommodationStyle, string> = {
  camping: "Camping",
  hotel: "Hotel",
  liveaboard: "Live aboard",
  "tented-camp": "Tented camp",
  homestay: "Homestay",
};

export const TOUR_ACCESS: TourAccess[] = [
  "mandatory-tour",
  "optional-tour",
  "self-guided-only",
];

export const TOUR_ACCESS_LABELS: Record<TourAccess, string> = {
  "mandatory-tour": "Tour only",
  "optional-tour": "Optional tour",
  "self-guided-only": "Self guided",
};

export const DIFFICULTIES: Difficulty[] = [
  "easy",
  "moderate",
  "challenging",
  "expert",
];

export const PACES: Pace[] = ["relaxed", "moderate", "intense"];

export const DANGERS: Danger[] = ["low", "moderate", "high"];

export const ANIMALS: AnimalType[] = [
  "mammals",
  "birds",
  "marine",
  "reptiles",
  "insects",
  "amphibians",
];

export const CLIMATES: Climate[] = [
  "alpine",
  "polar",
  "boreal",
  "temperate",
  "mediterranean",
  "desert",
  "savanna",
  "tropical",
  "subtropical",
  "rainforest",
];

export const CLIMATE_LABELS: Record<Climate, string> = {
  alpine: "Alpine",
  polar: "Polar",
  boreal: "Boreal",
  temperate: "Temperate",
  mediterranean: "Mediterranean",
  desert: "Desert",
  savanna: "Savanna",
  tropical: "Tropical",
  subtropical: "Subtropical",
  rainforest: "Rainforest",
};

export const BUDGET_BANDS: BudgetBand[] = ["low", "mid", "high"];

export const TRIP_LENGTH_OPTIONS = [7, 14, 21, 28] as const;

export const MONTHS = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
] as const;

export const emptyFilters = (): FilterState => ({
  regions: [],
  months: [],
  dateFrom: "",
  dateTo: "",
  tripDays: DEFAULT_TYPICAL_TRIP_DAYS,
  styles: [],
  climates: [],
  access: [],
  accommodation: [],
  tourAccess: [],
  difficulties: [],
  paces: [],
  dangers: [],
  animals: [],
  budgetBands: [],
  query: "",
});

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Inclusive day count between two ISO dates. */
export function tripDaysFromDateRange(dateFrom: string, dateTo: string): number {
  const start = parseDate(dateFrom).getTime();
  const end = parseDate(dateTo).getTime();
  const msPerDay = 86_400_000;
  return Math.max(1, Math.round(Math.abs(end - start) / msPerDay) + 1);
}

/** Stay length for cost estimates: from date range when both ends are set. */
export function resolveStayDays(filters: FilterState): number {
  if (filters.dateFrom && filters.dateTo) {
    return tripDaysFromDateRange(filters.dateFrom, filters.dateTo);
  }
  return Math.max(1, Math.round(filters.tripDays));
}

export function usesDateRangeForStayDays(filters: FilterState): boolean {
  return Boolean(filters.dateFrom && filters.dateTo);
}

/** Months (1–12) that an event window overlaps each year. */
export function eventMonths(event: WildlifeEvent): number[] {
  const months: number[] = [];
  for (let m = 1; m <= 12; m++) {
    if (eventOverlapsMonth(event, m)) months.push(m);
  }
  return months;
}

export function formatDateRange(startDate: string, endDate: string): string {
  const fmt = (iso: string) =>
    parseDate(iso).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return `${fmt(startDate)} – ${fmt(endDate)}`;
}

export function formatBudget(fromAUD: number, band: BudgetBand): string {
  const formatted = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(fromAUD);
  return `from ${formatted} · ${band}`;
}

function overlapsDateRange(
  event: WildlifeEvent,
  dateFrom: string,
  dateTo: string,
): boolean {
  if (!dateFrom && !dateTo) return true;
  const eStart = parseDate(event.startDate).getTime();
  const eEnd = parseDate(event.endDate).getTime();
  const fStart = dateFrom ? parseDate(dateFrom).getTime() : -Infinity;
  const fEnd = dateTo ? parseDate(dateTo).getTime() : Infinity;
  return eStart <= fEnd && eEnd >= fStart;
}

function includesAny<T>(selected: T[], value: T | T[]): boolean {
  if (selected.length === 0) return true;
  const values = Array.isArray(value) ? value : [value];
  return selected.some((s) => values.includes(s));
}

function matchesQuery(event: WildlifeEvent, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    event.title,
    event.location,
    event.country,
    event.region,
    event.description,
    event.peakTip,
    ...event.animalLabels,
    ...event.animals,
    ...event.climates,
    ...event.styles,
  ]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

export function matchesFilters(
  event: WildlifeEvent,
  filters: FilterState,
  departureIata: string = DEFAULT_DEPARTURE_IATA,
  stayDays: number = resolveStayDays(filters),
): boolean {
  if (!matchesQuery(event, filters.query)) return false;
  if (!includesAny(filters.regions, event.region)) return false;
  if (!includesAny(filters.styles, event.styles)) return false;
  if (!includesAny(filters.climates, event.climates)) return false;
  if (!includesAny(filters.access, event.access)) return false;
  if (!includesAny(filters.accommodation, event.accommodation)) return false;
  if (!includesAny(filters.tourAccess, event.tourAccess)) return false;
  if (!includesAny(filters.difficulties, event.difficulty)) return false;
  if (!includesAny(filters.paces, event.pace)) return false;
  if (!includesAny(filters.dangers, event.danger)) return false;
  if (!includesAny(filters.animals, event.animals)) return false;
  if (
    !includesAny(
      filters.budgetBands,
      computeEventBudget(event, departureIata, stayDays).band,
    )
  ) {
    return false;
  }

  if (filters.months.length > 0) {
    const months = eventMonths(event);
    if (!filters.months.some((m) => months.includes(m))) return false;
  }

  if (!overlapsDateRange(event, filters.dateFrom, filters.dateTo)) {
    return false;
  }

  return true;
}

export function filterEvents(
  all: WildlifeEvent[],
  filters: FilterState,
  departureIata: string = DEFAULT_DEPARTURE_IATA,
  stayDays: number = resolveStayDays(filters),
): WildlifeEvent[] {
  return all.filter((e) =>
    matchesFilters(e, filters, departureIata, stayDays),
  );
}

export function activeFilterCount(filters: FilterState): number {
  let n = 0;
  n += filters.regions.length;
  n += filters.months.length;
  n += filters.styles.length;
  n += filters.climates.length;
  n += filters.access.length;
  n += filters.accommodation.length;
  n += filters.tourAccess.length;
  n += filters.difficulties.length;
  n += filters.paces.length;
  n += filters.dangers.length;
  n += filters.animals.length;
  n += filters.budgetBands.length;
  if (filters.query.trim()) n += 1;
  if (filters.dateFrom) n += 1;
  if (filters.dateTo) n += 1;
  if (
    !usesDateRangeForStayDays(filters) &&
    filters.tripDays !== DEFAULT_TYPICAL_TRIP_DAYS
  ) {
    n += 1;
  }
  return n;
}

export function labelize(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatAccess(access: AccessMode): string {
  return ACCESS_LABELS[access];
}

export function formatAccommodation(style: AccommodationStyle): string {
  return ACCOMMODATION_LABELS[style];
}

export function formatTourAccess(access: TourAccess): string {
  return TOUR_ACCESS_LABELS[access];
}

export function formatClimate(climate: Climate): string {
  return CLIMATE_LABELS[climate];
}
