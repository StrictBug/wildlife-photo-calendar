export type Region =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "Central America"
  | "South America"
  | "Oceania"
  | "Polar"
  | "Caribbean";

export type PhotoStyle =
  | "telephoto"
  | "macro"
  | "underwater"
  | "landscape"
  | "wide-angle"
  | "aerial"
  | "safari";

/** How you reach the shooting location. */
export type AccessMode =
  | "hike-in"
  | "drive-in"
  | "boat-access"
  | "fly-in"
  | "walk-in";

/** Where you stay overnight. */
export type AccommodationStyle =
  | "camping"
  | "hotel"
  | "liveaboard"
  | "tented-camp"
  | "homestay";

/** Whether a guided tour is required, optional, or unnecessary. */
export type TourAccess =
  | "mandatory-tour"
  | "optional-tour"
  | "self-guided-only";

export type Difficulty = "easy" | "moderate" | "challenging" | "expert";

export type Pace = "relaxed" | "moderate" | "intense";

export type Danger = "low" | "moderate" | "high";

export type BudgetBand = "low" | "mid" | "high";

export type AnimalType =
  | "mammals"
  | "birds"
  | "marine"
  | "reptiles"
  | "insects"
  | "amphibians";

/** Climate / biome of the destination. Events may have several. */
export type Climate =
  | "alpine"
  | "polar"
  | "boreal"
  | "temperate"
  | "mediterranean"
  | "desert"
  | "savanna"
  | "tropical"
  | "subtropical"
  | "rainforest";

export interface WildlifeEvent {
  id: string;
  title: string;
  location: string;
  country: string;
  region: Region;
  lat: number;
  lng: number;
  /** ISO date YYYY-MM-DD for a representative year */
  startDate: string;
  endDate: string;
  /** Typical planning stay in days (for budget band scaling). Defaults to 14. */
  typicalTripDays?: number;
  animals: AnimalType[];
  animalLabels: string[];
  /** One or more climate / biome tags for filtering. */
  climates: Climate[];
  styles: PhotoStyle[];
  access: AccessMode;
  accommodation: AccommodationStyle;
  tourAccess: TourAccess;
  difficulty: Difficulty;
  pace: Pace;
  danger: Danger;
  budgetBand: BudgetBand;
  fromAUD: number;
  description: string;
  gearNotes: string;
  peakTip: string;
  /** CSS gradient stops for card atmosphere (placeholder imagery) */
  atmosphere: [string, string];
}

export interface FilterState {
  regions: Region[];
  months: number[];
  dateFrom: string;
  dateTo: string;
  /** Planned stay length when not using specific dates (days). */
  tripDays: number;
  styles: PhotoStyle[];
  climates: Climate[];
  access: AccessMode[];
  accommodation: AccommodationStyle[];
  tourAccess: TourAccess[];
  difficulties: Difficulty[];
  paces: Pace[];
  dangers: Danger[];
  animals: AnimalType[];
  budgetBands: BudgetBand[];
  /** Free-text search across title, place, animals, etc. */
  query: string;
}

export type ViewMode = "list" | "calendar" | "map";
