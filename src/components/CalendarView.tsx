"use client";

import { useEffect, useState } from "react";
import { MONTHS } from "@/lib/filters";
import {
  adjacentScopeMonth,
  calendarAnchorMonth,
  type CalendarScope,
  dayInCalendarScope,
  eventOnScopedDay,
  eventOverlapsScopedMonth,
  formatAnnualRange,
  formatCalendarScopeHint,
} from "@/lib/calendar";
import type { WildlifeEvent } from "@/lib/types";

interface CalendarViewProps {
  events: WildlifeEvent[];
  scope: CalendarScope;
  year: number;
  month: number; // 1–12
  onMonthChange: (year: number, month: number) => void;
  selectedIds: string[];
  onSelect: (id: string) => void;
}

type CalendarMode = "month" | "year";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MAX_DOTS = 4;

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Monday-based weekday index 0–6 */
function mondayIndex(year: number, month: number, day: number): number {
  const dow = new Date(year, month - 1, day).getDay();
  return dow === 0 ? 6 : dow - 1;
}

function monthLabel(month: number): string {
  return new Date(2024, month - 1, 1).toLocaleDateString("en-AU", {
    month: "long",
  });
}

function dayHeading(month: number, day: number): string {
  return new Date(2024, month - 1, day).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function eventsForScopedMonth(
  events: WildlifeEvent[],
  scope: CalendarScope,
  month: number,
): WildlifeEvent[] {
  return events.filter((e) => eventOverlapsScopedMonth(e, scope, month));
}

interface MonthPanelListProps {
  monthEvents: WildlifeEvent[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  compact?: boolean;
}

function MonthPanelList({
  monthEvents,
  selectedIds,
  onSelect,
  compact = false,
}: MonthPanelListProps) {
  if (monthEvents.length === 0) {
    return <p className="cal-year-empty">No windows this month</p>;
  }

  return (
    <ul className={`cal-month-list ${compact ? "cal-month-list-compact" : ""}`}>
      {monthEvents.map((e) => (
        <li key={e.id}>
          <button
            type="button"
            className={`cal-day-panel-item ${compact ? "cal-day-panel-item-compact" : ""} ${selectedIds.includes(e.id) ? "cal-day-panel-item-on" : ""}`}
            onClick={() => onSelect(e.id)}
          >
            <span
              className="cal-day-panel-swatch"
              style={{ background: e.atmosphere[0] }}
              aria-hidden="true"
            />
            <span className="cal-day-panel-item-body">
              <span className="cal-day-panel-item-title">{e.title}</span>
              {!compact && (
                <span className="cal-day-panel-item-meta">
                  {e.location} · {formatAnnualRange(e)}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

interface YearViewProps {
  events: WildlifeEvent[];
  scope: CalendarScope;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onOpenMonth: (month: number) => void;
}

function YearView({
  events,
  scope,
  selectedIds,
  onSelect,
  onOpenMonth,
}: YearViewProps) {
  const scopedMonths = MONTHS.filter(({ value }) =>
    scope.months.includes(value),
  );
  const visibleEvents = events.filter((e) =>
    scope.months.some((m) => eventOverlapsScopedMonth(e, scope, m)),
  );

  return (
    <>
      {scopedMonths.length === 0 ? (
        <p className="calendar-empty">No months in the selected time range.</p>
      ) : (
        <>
          {visibleEvents.length > 0 && (
            <p className="calendar-month-count">
              <strong>{visibleEvents.length}</strong>{" "}
              {visibleEvents.length === 1 ? "window" : "windows"} in range
            </p>
          )}

          <div
            className={`cal-year-grid ${scopedMonths.length <= 4 ? "cal-year-grid-few" : ""}`}
            role="list"
            aria-label="Year overview"
          >
            {scopedMonths.map(({ value: m, label }) => {
              const monthEvents = eventsForScopedMonth(events, scope, m);
              const isCurrentMonth = m === new Date().getMonth() + 1;

              return (
                <section
                  key={m}
                  className={`cal-year-month ${monthEvents.length > 0 ? "cal-year-month-has-events" : ""} ${isCurrentMonth ? "cal-year-month-current" : ""}`}
                  role="listitem"
                  aria-label={`${label}, ${monthEvents.length} windows`}
                >
                  <button
                    type="button"
                    className="cal-year-month-header"
                    onClick={() => onOpenMonth(m)}
                  >
                    <span className="cal-year-month-name">{label}</span>
                    <span className="cal-year-month-count-badge">
                      {monthEvents.length}
                    </span>
                  </button>
                  <MonthPanelList
                    monthEvents={monthEvents}
                    selectedIds={selectedIds}
                    onSelect={onSelect}
                    compact
                  />
                </section>
              );
            })}
          </div>

          {visibleEvents.length === 0 && (
            <p className="calendar-empty">No matching windows in this range.</p>
          )}
        </>
      )}
    </>
  );
}

export function CalendarView({
  events,
  scope,
  year,
  month,
  onMonthChange,
  selectedIds,
  onSelect,
}: CalendarViewProps) {
  const [mode, setMode] = useState<CalendarMode>("month");
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const scopeHint = formatCalendarScopeHint(scope);
  const canPrevMonth = adjacentScopeMonth(scope, month, -1) !== null;
  const canNextMonth = adjacentScopeMonth(scope, month, 1) !== null;

  const totalDays = daysInMonth(year, month);
  const startPad = mondayIndex(year, month, 1);
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthEvents = eventsForScopedMonth(events, scope, month);

  const activeDayEvents =
    activeDay === null
      ? []
      : events.filter((e) => eventOnScopedDay(e, scope, month, activeDay));

  useEffect(() => {
    if (activeDay !== null && activeDayEvents.length === 0) {
      setActiveDay(null);
    }
  }, [activeDay, activeDayEvents.length]);

  useEffect(() => {
    setActiveDay(null);
  }, [
    scope.months.join(","),
    scope.focusYear,
    scope.dayWindow?.startMonth,
    scope.dayWindow?.startDay,
    scope.dayWindow?.endMonth,
    scope.dayWindow?.endDay,
  ]);

  function prev() {
    setActiveDay(null);
    if (mode === "year") return;
    const prevMonth = adjacentScopeMonth(scope, month, -1);
    if (prevMonth === null) return;
    onMonthChange(year, prevMonth);
  }

  function next() {
    setActiveDay(null);
    if (mode === "year") return;
    const nextMonth = adjacentScopeMonth(scope, month, 1);
    if (nextMonth === null) return;
    onMonthChange(year, nextMonth);
  }

  function openMonth(m: number) {
    onMonthChange(year, m);
    setMode("month");
    setActiveDay(null);
  }

  function handleDayClick(day: number, dayEvents: WildlifeEvent[]) {
    if (dayEvents.length === 0) {
      setActiveDay(null);
      return;
    }
    setActiveDay((prev) => (prev === day ? null : day));
  }

  const toolbarTitle = mode === "year" ? "Year" : monthLabel(month);

  return (
    <div className="calendar">
      <div className="calendar-toolbar">
        <button
          type="button"
          className="cal-nav"
          onClick={prev}
          disabled={mode === "year" || (mode === "month" && !canPrevMonth)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <h2 className="calendar-month">{toolbarTitle}</h2>
        <button
          type="button"
          className="cal-nav"
          onClick={next}
          disabled={mode === "year" || (mode === "month" && !canNextMonth)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="calendar-toolbar-secondary">
        <div
          className="view-toggle cal-mode-toggle"
          role="group"
          aria-label="Calendar view"
        >
          <button
            type="button"
            className={mode === "month" ? "toggle-on" : ""}
            onClick={() => {
              setMode("month");
              setActiveDay(null);
              if (scope.restricted && scope.months.length > 1) {
                onMonthChange(year, calendarAnchorMonth(scope));
              }
            }}
          >
            Month
          </button>
          <button
            type="button"
            className={mode === "year" ? "toggle-on" : ""}
            onClick={() => {
              setMode("year");
              setActiveDay(null);
            }}
          >
            Year
          </button>
        </div>
      </div>

      {scopeHint && (
        <p className="calendar-scope-hint">
          Showing filter range: <strong>{scopeHint}</strong>
        </p>
      )}

      {mode === "year" ? (
        <YearView
          events={events}
          scope={scope}
          selectedIds={selectedIds}
          onSelect={onSelect}
          onOpenMonth={openMonth}
        />
      ) : !scope.months.includes(month) ? (
        <p className="calendar-empty">This month is outside the selected range.</p>
      ) : (
        <>
          <p className="calendar-hint">
            Windows repeat every year. Click a day to see all matching windows.
          </p>

          {monthEvents.length > 0 && (
            <p className="calendar-month-count">
              <strong>{monthEvents.length}</strong>{" "}
              {monthEvents.length === 1 ? "window" : "windows"} overlap this
              month
            </p>
          )}

          <div
            className="calendar-grid"
            role="grid"
            aria-label={monthLabel(month)}
          >
            {WEEKDAYS.map((d) => (
              <div key={d} className="cal-weekday" role="columnheader">
                {d}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) {
                return <div key={`e-${i}`} className="cal-cell cal-empty" />;
              }

              const inScope = dayInCalendarScope(scope, month, day);
              const dayEvents = inScope
                ? events.filter((e) => eventOnScopedDay(e, scope, month, day))
                : [];
              const isActive = activeDay === day;
              const overflow = dayEvents.length - MAX_DOTS;

              if (!inScope) {
                return (
                  <div
                    key={day}
                    className="cal-cell cal-cell-out-of-range"
                    role="gridcell"
                    aria-label={`${day} — outside filter range`}
                  >
                    <span className="cal-daynum">{day}</span>
                  </div>
                );
              }

              return (
                <button
                  key={day}
                  type="button"
                  className={`cal-cell cal-day-btn ${isActive ? "cal-cell-active" : ""} ${dayEvents.length > 0 ? "cal-cell-has-events" : ""}`}
                  role="gridcell"
                  onClick={() => handleDayClick(day, dayEvents)}
                  aria-pressed={isActive}
                  aria-label={
                    dayEvents.length === 0
                      ? `${day} — no windows`
                      : `${day} — ${dayEvents.length} windows`
                  }
                >
                  <span className="cal-daynum">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="cal-day-markers">
                      {dayEvents.slice(0, MAX_DOTS).map((e) => (
                        <span
                          key={e.id}
                          className={`cal-dot ${selectedIds.includes(e.id) ? "cal-dot-on" : ""}`}
                          style={{ background: e.atmosphere[1] }}
                          aria-hidden="true"
                        />
                      ))}
                      {overflow > 0 && (
                        <span className="cal-overflow">+{overflow}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {activeDay !== null && activeDayEvents.length > 0 && (
            <div className="cal-day-panel" role="region" aria-label="Day windows">
              <div className="cal-day-panel-header">
                <h3 className="cal-day-panel-title">
                  {dayHeading(month, activeDay)}
                </h3>
                <button
                  type="button"
                  className="cal-day-panel-close"
                  onClick={() => setActiveDay(null)}
                  aria-label="Close day panel"
                >
                  ×
                </button>
              </div>
              <MonthPanelList
                monthEvents={activeDayEvents}
                selectedIds={selectedIds}
                onSelect={onSelect}
              />
            </div>
          )}

          {monthEvents.length === 0 && (
            <p className="calendar-empty">No matching windows in this month.</p>
          )}
        </>
      )}
    </div>
  );
}
