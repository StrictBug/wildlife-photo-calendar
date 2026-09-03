import { computeEventBudget } from "@/lib/budget";
import type { Danger, Difficulty, Pace, WildlifeEvent } from "@/lib/types";

export type SortField = "none" | "price" | "difficulty" | "pace" | "danger";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export const DEFAULT_SORT: SortState = {
  field: "none",
  direction: "asc",
};

export const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: "none", label: "Random" },
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

/** Stable session shuffle of event ids (Fisher–Yates). */
export function createShuffleOrder(ids: string[]): string[] {
  const arr = [...ids];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function compareByField(
  a: WildlifeEvent,
  b: WildlifeEvent,
  field: Exclude<SortField, "none">,
  departureIata: string,
  stayDays: number,
): number {
  switch (field) {
    case "price":
      return (
        computeEventBudget(a, departureIata, stayDays).totalAUD -
        computeEventBudget(b, departureIata, stayDays).totalAUD
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
  departureIata: string,
  stayDays: number,
  shuffleOrder: string[] = [],
): WildlifeEvent[] {
  if (sort.field === "none") {
    if (shuffleOrder.length === 0) return [...events];
    const rank = new Map(shuffleOrder.map((id, i) => [id, i]));
    return [...events].sort(
      (a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0),
    );
  }

  const field = sort.field;
  const dir = sort.direction === "asc" ? 1 : -1;
  return [...events].sort(
    (a, b) => compareByField(a, b, field, departureIata, stayDays) * dir,
  );
}

export function toggleSortDirection(direction: SortDirection): SortDirection {
  return direction === "asc" ? "desc" : "asc";
}
