import type { EventKind } from "./types";

export interface MarkerColors {
  /** Inner fill — darker shade. */
  fill: string;
  /** Outer rim — lighter shade. */
  border: string;
}

/** Wildlife map dots — softer navy fill + light blue rim. */
export const WILDLIFE_MARKER: MarkerColors = {
  fill: "#2f5f9e",
  border: "#8ec5eb",
};

/** Landscape/nature map dots — pastel sage fill + light mint rim. */
export const NATURE_MARKER: MarkerColors = {
  fill: "#5a9a6e",
  border: "#b8e5ca",
};

export function markerColorsFor(kind: EventKind): MarkerColors {
  return kind === "nature" ? NATURE_MARKER : WILDLIFE_MARKER;
}
