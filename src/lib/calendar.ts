import type { FilterState, WildlifeEvent } from "./types";

/** Month-day as comparable integer (Jan 1 = 101, Dec 31 = 1231). */
export function monthDayKey(month: number, day: number): number {
  return month * 100 + day;
}

export interface AnnualWindow {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  crossesYear: boolean;
}

export function parseIsoParts(iso: string): { month: number; day: number } {
  const [, m, d] = iso.split("-").map(Number);
  return { month: m, day: d };
}

export function parseIsoYear(iso: string): number {
  return Number(iso.split("-")[0]);
}

export interface CalendarScope {
  /** Months (1–12) included in the active time filter */
  months: number[];
  /** Day-level bounds when specific dates are set (annual) */
  dayWindow: AnnualWindow | null;
  /** Year from date inputs when set; used for hints only */
  focusYear: number;
  dateFrom: string;
  dateTo: string;
  restricted: boolean;
}

function monthsOverlappingWindow(window: AnnualWindow): number[] {
  const months: number[] = [];
  for (let m = 1; m <= 12; m++) {
    const daysInMonth = new Date(2024, m, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      if (annualDayInWindow(m, d, window)) {
        months.push(m);
        break;
      }
    }
  }
  return months;
}

export function resolveCalendarScope(
  filters: Pick<FilterState, "months" | "dateFrom" | "dateTo">,
  fallbackYear: number,
): CalendarScope {
  const hasMonths = filters.months.length > 0;
  const hasDates = Boolean(filters.dateFrom || filters.dateTo);

  let dayWindow: AnnualWindow | null = null;
  if (hasDates) {
    const from = parseIsoParts(filters.dateFrom || `${fallbackYear}-01-01`);
    const to = parseIsoParts(filters.dateTo || `${fallbackYear}-12-31`);
    const startKey = monthDayKey(from.month, from.day);
    const endKey = monthDayKey(to.month, to.day);
    dayWindow = {
      startMonth: from.month,
      startDay: from.day,
      endMonth: to.month,
      endDay: to.day,
      crossesYear: startKey > endKey,
    };
  }

  let months: number[];
  if (hasMonths && dayWindow) {
    const dateMonths = monthsOverlappingWindow(dayWindow);
    months = filters.months
      .filter((m) => dateMonths.includes(m))
      .sort((a, b) => a - b);
  } else if (hasMonths) {
    months = [...filters.months].sort((a, b) => a - b);
  } else if (dayWindow) {
    months = monthsOverlappingWindow(dayWindow);
  } else {
    months = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  const focusYear = filters.dateFrom
    ? parseIsoYear(filters.dateFrom)
    : filters.dateTo
      ? parseIsoYear(filters.dateTo)
      : fallbackYear;

  return {
    months,
    dayWindow,
    focusYear,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    restricted: hasMonths || hasDates,
  };
}

export function dayInCalendarScope(
  scope: CalendarScope,
  month: number,
  day: number,
): boolean {
  if (!scope.months.includes(month)) return false;
  if (!scope.dayWindow) return true;
  return annualDayInWindow(month, day, scope.dayWindow);
}

export function adjacentScopeMonth(
  scope: CalendarScope,
  month: number,
  direction: -1 | 1,
): number | null {
  const months = scope.months;
  if (months.length === 0) return null;
  const idx = months.indexOf(month);
  if (idx === -1) return months[0] ?? null;
  if (months.length === 1) return null;
  const next = (idx + direction + months.length) % months.length;
  return months[next];
}

export function eventOnScopedDay(
  event: WildlifeEvent,
  scope: CalendarScope,
  month: number,
  day: number,
): boolean {
  return (
    dayInCalendarScope(scope, month, day) &&
    eventOnAnnualDay(event, month, day)
  );
}

export function eventOverlapsScopedMonth(
  event: WildlifeEvent,
  scope: CalendarScope,
  month: number,
): boolean {
  if (!scope.months.includes(month)) return false;
  const totalDays = new Date(2024, month, 0).getDate();
  for (let d = 1; d <= totalDays; d++) {
    if (eventOnScopedDay(event, scope, month, d)) return true;
  }
  return false;
}

function formatIsoWithYear(iso: string): string {
  const { month, day } = parseIsoParts(iso);
  const year = parseIsoYear(iso);
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCalendarScopeHint(scope: CalendarScope): string | null {
  if (!scope.restricted) return null;

  const fmt = (month: number, day: number) =>
    new Date(2024, month - 1, day).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
    });

  if (scope.dayWindow) {
    if (scope.dateFrom && scope.dateTo) {
      return `${formatIsoWithYear(scope.dateFrom)} – ${formatIsoWithYear(scope.dateTo)}`;
    }
    if (scope.dateFrom) {
      return `from ${formatIsoWithYear(scope.dateFrom)}`;
    }
    if (scope.dateTo) {
      return `until ${formatIsoWithYear(scope.dateTo)}`;
    }
    const w = scope.dayWindow;
    return `${fmt(w.startMonth, w.startDay)} – ${fmt(w.endMonth, w.endDay)}`;
  }

  const labels = scope.months.map((m) =>
    new Date(2024, m - 1, 1).toLocaleDateString("en-AU", { month: "short" }),
  );
  return labels.join(", ");
}

/** First month to show in month view for the active time filter. */
export function calendarAnchorMonth(scope: CalendarScope): number {
  if (scope.dayWindow) return scope.dayWindow.startMonth;
  if (scope.restricted && scope.months.length > 0) return scope.months[0];
  return new Date().getMonth() + 1;
}

export function eventAnchorMonth(
  event: WildlifeEvent,
  scope: CalendarScope,
): number {
  const startMonth = parseIsoParts(event.startDate).month;
  if (scope.months.includes(startMonth)) return startMonth;
  for (const m of scope.months) {
    if (eventOverlapsScopedMonth(event, scope, m)) return m;
  }
  return calendarAnchorMonth(scope);
}

export function annualWindow(event: WildlifeEvent): AnnualWindow {
  const start = parseIsoParts(event.startDate);
  const end = parseIsoParts(event.endDate);
  const startKey = monthDayKey(start.month, start.day);
  const endKey = monthDayKey(end.month, end.day);
  return {
    startMonth: start.month,
    startDay: start.day,
    endMonth: end.month,
    endDay: end.day,
    crossesYear: startKey > endKey,
  };
}

/** Whether a calendar day (any year) falls inside the event's annual window. */
export function annualDayInWindow(
  month: number,
  day: number,
  window: AnnualWindow,
): boolean {
  const key = monthDayKey(month, day);
  const start = monthDayKey(window.startMonth, window.startDay);
  const end = monthDayKey(window.endMonth, window.endDay);

  if (window.crossesYear) {
    return key >= start || key <= end;
  }
  return key >= start && key <= end;
}

export function eventOnAnnualDay(
  event: WildlifeEvent,
  month: number,
  day: number,
): boolean {
  return annualDayInWindow(month, day, annualWindow(event));
}

/** Whether an event overlaps any day in a given calendar month (any year). */
export function eventOverlapsMonth(
  event: WildlifeEvent,
  month: number,
): boolean {
  const daysInMonth = new Date(2024, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    if (eventOnAnnualDay(event, month, d)) return true;
  }
  return false;
}

export function formatAnnualRange(event: WildlifeEvent): string {
  const w = annualWindow(event);
  const fmt = (month: number, day: number) =>
    new Date(2024, month - 1, day).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
    });
  return `${fmt(w.startMonth, w.startDay)} – ${fmt(w.endMonth, w.endDay)} · yearly`;
}
