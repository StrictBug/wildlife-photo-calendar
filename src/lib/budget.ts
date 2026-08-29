import type { DepartureCityId } from "@/data/departureCities";
import { getDepartureCity } from "@/data/departureCities";
import { estimateFlightAUD } from "@/lib/flightCost";
import type { BudgetBand, WildlifeEvent } from "@/lib/types";
export const REFERENCE_TRIP_DAYS = 14;

/** Total-cost band ceilings at the reference length (trip + est. flights). */
export const LOW_TOTAL_PER_REFERENCE_DAYS = 3000;
export const MID_TOTAL_PER_REFERENCE_DAYS = 6000;

export const DEFAULT_TYPICAL_TRIP_DAYS = REFERENCE_TRIP_DAYS;

export function planningTripDays(event: WildlifeEvent): number {
  const days = event.typicalTripDays ?? DEFAULT_TYPICAL_TRIP_DAYS;
  return Math.max(1, Math.round(days));
}

export function budgetThresholdsForTripDays(tripDays: number): {
  lowMax: number;
  midMax: number;
} {
  const scale = tripDays / REFERENCE_TRIP_DAYS;
  return {
    lowMax: Math.round(LOW_TOTAL_PER_REFERENCE_DAYS * scale),
    midMax: Math.round(MID_TOTAL_PER_REFERENCE_DAYS * scale),
  };
}

export function budgetBandFromTotal(
  totalAUD: number,
  tripDays: number = REFERENCE_TRIP_DAYS,
): BudgetBand {
  const { lowMax, midMax } = budgetThresholdsForTripDays(tripDays);
  if (totalAUD <= lowMax) return "low";
  if (totalAUD <= midMax) return "mid";
  return "high";
}

export interface EventBudget {
  tripAUD: number;
  flightAUD: number;
  totalAUD: number;
  tripDays: number;
  band: BudgetBand;
}

export function computeEventBudget(
  event: WildlifeEvent,
  departureId: DepartureCityId,
  stayDays: number = DEFAULT_TYPICAL_TRIP_DAYS,
): EventBudget {
  const flightAUD = estimateFlightAUD(departureId, event);
  const baseTripDays = planningTripDays(event);
  const tripAUD = Math.round(event.fromAUD * (stayDays / baseTripDays));
  const totalAUD = tripAUD + flightAUD;
  return {
    tripAUD,
    flightAUD,
    totalAUD,
    tripDays: stayDays,
    band: budgetBandFromTotal(totalAUD, stayDays),
  };
}

export function formatAUD(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact line for cards and map popups. */
export function formatTotalBudget(
  budget: EventBudget,
  departureLabel: string,
): string {
  return `from ${formatAUD(budget.totalAUD)} inc. flights from ${departureLabel}`;
}

/** Detail breakdown lines. */
export function formatBudgetBreakdown(
  budget: EventBudget,
  departureLabel: string,
): {
  headline: string;
  trip: string;
  flights: string;
} {
  return {
    headline: `${formatAUD(budget.totalAUD)} estimated total from ${departureLabel}`,
    trip: `${formatAUD(budget.tripAUD)} on-trip (lodging, tours, park fees)`,
    flights: `${formatAUD(budget.flightAUD)} est. return flights (economy)`,
  };
}

export function getDepartureLabel(departureId: DepartureCityId): string {
  return getDepartureCity(departureId).label;
}
