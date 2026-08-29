import type { DepartureCityId } from "@/data/departureCities";
import { computeEventBudget } from "@/lib/budget";
import type { Danger, Difficulty, Pace, WildlifeEvent } from "@/lib/types";

export type SortField = "price" | "difficulty" | "pace" | "danger";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export const DEFAULT_SORT: SortState = {
  field: "price",
  direction: "asc",
};

export const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: "price", label: "Price" },
  { value: "difficulty", label: "Difficulty" },
  { value: "pace", label: "Pace" },
  { value: "danger", label: "Danger" },
];

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  moderate: 1,
  challenging: 2,
  expert: 3,
};

const PACE_ORDER: Record<Pace, number> = {
  relaxed: 0,
  moderate: 1,
  intense: 2,
};

const DANGER_ORDER: Record<Danger, number> = {
  low: 0,
  moderate: 1,
  high: 2,
};

function compareByField(
  a: WildlifeEvent,
  b: WildlifeEvent,
  field: SortField,
  departureCityId: DepartureCityId,
  stayDays: number,
): number {
  switch (field) {
    case "price":
      return (
        computeEventBudget(a, departureCityId, stayDays).totalAUD -
        computeEventBudget(b, departureCityId, stayDays).totalAUD
      );
    case "difficulty":
      return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
    case "pace":
      return PACE_ORDER[a.pace] - PACE_ORDER[b.pace];
    case "danger":
      return DANGER_ORDER[a.danger] - DANGER_ORDER[b.danger];
  }
}

export function sortEvents(
  events: WildlifeEvent[],
  sort: SortState,
  departureCityId: DepartureCityId,
  stayDays: number,
): WildlifeEvent[] {
  const dir = sort.direction === "asc" ? 1 : -1;
  return [...events].sort(
    (a, b) => compareByField(a, b, sort.field, departureCityId, stayDays) * dir,
  );
}

export function toggleSortDirection(direction: SortDirection): SortDirection {
  return direction === "asc" ? "desc" : "asc";
}
