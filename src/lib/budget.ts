import type { DepartureAirport } from "@/data/airports";
import { formatAirportLabel, requireAirport } from "@/data/airports";
import {
  DEFAULT_CURRENCY,
  formatMoney,
  fromAUD,
  type DisplayCurrency,
} from "@/lib/currency";
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

/**
 * Coarse estimate rounding in display currency:
 * nearest 200 below 2000, nearest 500 below 10000, nearest 1000 at 10000+.
 */
export function roundCostEstimate(amount: number): number {
  const abs = Math.abs(amount);
  const step = abs >= 10000 ? 1000 : abs >= 2000 ? 500 : 200;
  return Math.round(amount / step) * step;
}

export function computeEventBudget(
  event: WildlifeEvent,
  departureIata: string,
  stayDays: number = DEFAULT_TYPICAL_TRIP_DAYS,
): EventBudget {
  const origin = requireAirport(departureIata);
  const flightAUD = estimateFlightAUD(origin, event);
  const baseTripDays = planningTripDays(event);
  const tripAUD = event.fromAUD * (stayDays / baseTripDays);
  const totalAUD = tripAUD + flightAUD;
  return {
    tripAUD,
    flightAUD,
    totalAUD,
    tripDays: stayDays,
    band: budgetBandFromTotal(totalAUD, stayDays),
  };
}

/** Convert an AUD amount, then apply estimate rounding. */
export function displayCost(
  amountAUD: number,
  currency: DisplayCurrency = DEFAULT_CURRENCY,
): number {
  return roundCostEstimate(fromAUD(amountAUD, currency));
}

export function formatAUD(amount: number): string {
  return formatMoney(amount, "AUD");
}

/** Compact line for cards and map popups. */
export function formatTotalBudget(
  budget: EventBudget,
  departureIata: string,
  currency: DisplayCurrency = DEFAULT_CURRENCY,
): string {
  const total = displayCost(budget.totalAUD, currency);
  return `from ${formatMoney(total, currency)} inc. est. flights from ${departureIata.toUpperCase()}`;
}

/** Detail breakdown lines. Total is summed in AUD first, then converted & rounded. */
export function formatBudgetBreakdown(
  budget: EventBudget,
  departureLabel: string,
  currency: DisplayCurrency = DEFAULT_CURRENCY,
): {
  headline: string;
  trip: string;
  flights: string;
} {
  const total = displayCost(budget.totalAUD, currency);
  const trip = Math.round(fromAUD(budget.tripAUD, currency));
  // Flights absorb total rounding so the printed lines still add up.
  const flights = Math.max(0, total - trip);
  return {
    headline: `${formatMoney(total, currency)} estimated total from ${departureLabel}`,
    trip: `${formatMoney(trip, currency)} on-trip (lodging, tours, park fees)`,
    flights: `${formatMoney(flights, currency)} est. return flights to gateway (economy)`,
  };
}

export function getDepartureLabel(departureIata: string): string {
  return formatAirportLabel(requireAirport(departureIata));
}

export function getDepartureAirport(departureIata: string): DepartureAirport {
  return requireAirport(departureIata);
}
