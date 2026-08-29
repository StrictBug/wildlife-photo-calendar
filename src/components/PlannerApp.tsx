"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_DEPARTURE_CITY_ID,
  isDepartureCityId,
  type DepartureCityId,
} from "@/data/departureCities";
import { events } from "@/data/events";
import { resolveCalendarScope, calendarAnchorMonth } from "@/lib/calendar";
import { emptyFilters, filterEvents, resolveStayDays } from "@/lib/filters";
import {
  DEFAULT_SORT,
  SORT_FIELDS,
  sortEvents,
  toggleSortDirection,
  type SortState,
} from "@/lib/sort";
import type { FilterState, ViewMode, WildlifeEvent } from "@/lib/types";

const DEPARTURE_CITY_STORAGE_KEY = "wildseason-departure-city";

function readStoredDepartureCity(): DepartureCityId {
  if (typeof window === "undefined") return DEFAULT_DEPARTURE_CITY_ID;
  const stored = localStorage.getItem(DEPARTURE_CITY_STORAGE_KEY);
  if (stored && isDepartureCityId(stored)) return stored;
  return DEFAULT_DEPARTURE_CITY_ID;
}
import { CalendarView } from "./CalendarView";
import { EventCard } from "./EventCard";
import { EventDetail } from "./EventDetail";
import { FilterBar } from "./FilterBar";

const MapView = dynamic(
  () => import("./MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => <p className="map-loading">Loading map…</p>,
  },
);

export function PlannerApp() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [departureCityId, setDepartureCityId] = useState<DepartureCityId>(
    DEFAULT_DEPARTURE_CITY_ID,
  );
  const [view, setView] = useState<ViewMode>("list");
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);

  const stayDays = useMemo(() => resolveStayDays(filters), [filters]);

  const filtered = useMemo(
    () => filterEvents(events, filters, departureCityId, stayDays),
    [filters, departureCityId, stayDays],
  );

  const sorted = useMemo(
    () => sortEvents(filtered, sort, departureCityId, stayDays),
    [filtered, sort, departureCityId, stayDays],
  );

  const calendarScope = useMemo(
    () => resolveCalendarScope(filters, calYear),
    [filters, calYear],
  );

  const timeFilterKey = `${filters.months.join(",")}|${filters.dateFrom}|${filters.dateTo}`;

  useEffect(() => {
    setCalYear(calendarScope.focusYear);
    setCalMonth(calendarAnchorMonth(calendarScope));
  }, [timeFilterKey, calendarScope]);

  useEffect(() => {
    setDepartureCityId(readStoredDepartureCity());
  }, []);

  useEffect(() => {
    localStorage.setItem(DEPARTURE_CITY_STORAGE_KEY, departureCityId);
  }, [departureCityId]);

  const selected: WildlifeEvent | null =
    sorted.find((e) => e.id === selectedId) ??
    filtered.find((e) => e.id === selectedId) ??
    events.find((e) => e.id === selectedId) ??
    null;

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseDetail() {
    setSelectedId(null);
    setDetailExpanded(false);
  }

  const shellExpanded = detailExpanded && selected !== null;

  return (
    <div className="planner">
      <header className="hero">
        <Image
          src="/images/hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-mist" aria-hidden="true" />
        <div className="hero-inner">
          <p className="brand">Wild Season</p>
          <h1 className="hero-title">Plan holidays around wildlife photography</h1>
          <p className="hero-sub">
            Find the right place, month, and style — from telephoto safaris to
            underwater reefs — with rough totals including estimated flights from
            your city.
          </p>
        </div>
      </header>

      <div
        className={`planner-shell ${shellExpanded ? "planner-shell-detail-expanded" : ""}`}
      >
        <FilterBar
          filters={filters}
          onChange={setFilters}
          departureCityId={departureCityId}
          onDepartureCityChange={setDepartureCityId}
        />

        <main className="results">
          <div className="results-toolbar">
            <p className="results-count">
              <strong>{sorted.length}</strong>{" "}
              {sorted.length === 1 ? "window" : "windows"}
            </p>
            <div className="results-toolbar-actions">
              <div className="sort-control">
                <label className="sort-field">
                  <span className="sort-label">Sort</span>
                  <select
                    className="sort-select"
                    value={sort.field}
                    onChange={(e) =>
                      setSort((prev) => ({
                        ...prev,
                        field: e.target.value as SortState["field"],
                      }))
                    }
                  >
                    {SORT_FIELDS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="sort-direction"
                  onClick={() =>
                    setSort((prev) => ({
                      ...prev,
                      direction: toggleSortDirection(prev.direction),
                    }))
                  }
                  aria-label={
                    sort.direction === "asc"
                      ? "Ascending — click for descending"
                      : "Descending — click for ascending"
                  }
                  title={sort.direction === "asc" ? "Low to high" : "High to low"}
                >
                  {sort.direction === "asc" ? "↑" : "↓"}
                </button>
              </div>
              <div className="view-toggle" role="group" aria-label="View mode">
              <button
                type="button"
                className={view === "list" ? "toggle-on" : ""}
                onClick={() => setView("list")}
              >
                List
              </button>
              <button
                type="button"
                className={view === "calendar" ? "toggle-on" : ""}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
              <button
                type="button"
                className={view === "map" ? "toggle-on" : ""}
                onClick={() => setView("map")}
              >
                Map
              </button>
            </div>
            </div>
          </div>

          {view === "list" ? (
            sorted.length === 0 ? (
              <p className="empty-state">
                No windows match these filters. Try clearing a few chips.
              </p>
            ) : (
              <div className="card-grid">
                {sorted.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    departureCityId={departureCityId}
                    stayDays={stayDays}
                    selected={selectedId === event.id}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            )
          ) : view === "calendar" ? (
            <CalendarView
              events={sorted}
              scope={calendarScope}
              year={calYear}
              month={calMonth}
              onMonthChange={(y, m) => {
                setCalYear(y);
                setCalMonth(m);
              }}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          ) : sorted.length === 0 ? (
            <p className="empty-state">
              No windows match these filters. Try clearing a few chips.
            </p>
          ) : (
            <MapView
              events={sorted}
              filters={filters}
              departureCityId={departureCityId}
              stayDays={stayDays}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
        </main>

        <aside
          className={`detail-aside ${shellExpanded ? "detail-aside-expanded" : ""}`}
          aria-label="Event detail"
        >
          <EventDetail
            event={selected}
            departureCityId={departureCityId}
            stayDays={stayDays}
            expanded={detailExpanded}
            onExpandedChange={setDetailExpanded}
            onClose={handleCloseDetail}
          />
        </aside>
      </div>
    </div>
  );
}
