"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_DEPARTURE_IATA,
  getAirport,
} from "@/data/airports";
import type { DepartureCityId } from "@/data/departureCities";
import {
  getDepartureCity,
  isDepartureCityId,
} from "@/data/departureCities";
import { events } from "@/data/events";
import {
  resolveCalendarScope,
  calendarAnchorMonth,
  eventAnchorMonth,
} from "@/lib/calendar";
import {
  activeFilterCount,
  emptyFilters,
  filterEvents,
  resolveStayDays,
} from "@/lib/filters";
import {
  DEFAULT_CURRENCY,
  isDisplayCurrency,
  type DisplayCurrency,
} from "@/lib/currency";
import {
  DEFAULT_SORT,
  SORT_FIELDS,
  sortEvents,
  toggleSortDirection,
  type SortState,
} from "@/lib/sort";
import type { FilterState, ViewMode, WildlifeEvent } from "@/lib/types";
import { CalendarView } from "./CalendarView";
import { EventCard } from "./EventCard";
import { EventDetail } from "./EventDetail";
import { FilterBar } from "./FilterBar";

const DEPARTURE_IATA_STORAGE_KEY = "wildseason-departure-airport";
const LEGACY_DEPARTURE_CITY_STORAGE_KEY = "wildseason-departure-city";
const CURRENCY_STORAGE_KEY = "wildseason-currency";
const MOBILE_MQ = "(max-width: 899px)";

function readStoredDepartureIata(): string {
  if (typeof window === "undefined") return DEFAULT_DEPARTURE_IATA;

  const storedIata = localStorage.getItem(DEPARTURE_IATA_STORAGE_KEY);
  if (storedIata && getAirport(storedIata)) return storedIata.toUpperCase();

  const legacy = localStorage.getItem(LEGACY_DEPARTURE_CITY_STORAGE_KEY);
  if (legacy && isDepartureCityId(legacy)) {
    return getDepartureCity(legacy as DepartureCityId).airport;
  }

  return DEFAULT_DEPARTURE_IATA;
}

function readStoredCurrency(): DisplayCurrency {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (stored && isDisplayCurrency(stored)) return stored;
  return DEFAULT_CURRENCY;
}

const MapView = dynamic(
  () => import("./MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => <p className="map-loading">Loading map…</p>,
  },
);

function findEventById(id: string, lists: WildlifeEvent[][]): WildlifeEvent | null {
  for (const list of lists) {
    const found = list.find((e) => e.id === id);
    if (found) return found;
  }
  return null;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function PlannerApp() {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [departureIata, setDepartureIata] = useState(DEFAULT_DEPARTURE_IATA);
  const [currency, setCurrency] = useState<DisplayCurrency>(DEFAULT_CURRENCY);
  const [view, setView] = useState<ViewMode>("list");
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mapPulse, setMapPulse] = useState<{ id: string; key: number } | null>(
    null,
  );
  const [detailExpanded, setDetailExpanded] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);

  const stayDays = useMemo(() => resolveStayDays(filters), [filters]);
  const filterCount = activeFilterCount(filters);

  const filtered = useMemo(
    () => filterEvents(events, filters, departureIata, stayDays),
    [filters, departureIata, stayDays],
  );

  const sorted = useMemo(
    () => sortEvents(filtered, sort, departureIata, stayDays),
    [filtered, sort, departureIata, stayDays],
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
    setDepartureIata(readStoredDepartureIata());
    setCurrency(readStoredCurrency());
  }, []);

  useEffect(() => {
    localStorage.setItem(DEPARTURE_IATA_STORAGE_KEY, departureIata);
  }, [departureIata]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  useEffect(() => {
    if (!isMobile) setFiltersOpen(false);
  }, [isMobile]);

  const selectedEvents = useMemo(() => {
    return selectedIds
      .map((id) => findEventById(id, [sorted, filtered, events]))
      .filter((e): e is WildlifeEvent => e !== null);
  }, [selectedIds, sorted, filtered]);

  const activeIdResolved =
    activeId && selectedIds.includes(activeId)
      ? activeId
      : selectedIds[selectedIds.length - 1] ?? null;

  const selected: WildlifeEvent | null = activeIdResolved
    ? findEventById(activeIdResolved, [sorted, filtered, events])
    : null;

  const hasSelection = selected !== null;
  const detailSheetOpen = isMobile && hasSelection;
  const sheetOpen = filtersOpen || detailSheetOpen;

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (filtersOpen) {
        setFiltersOpen(false);
        return;
      }
      if (detailSheetOpen) {
        setSelectedIds([]);
        setActiveId(null);
        setDetailExpanded(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen, filtersOpen, detailSheetOpen]);

  const calendarEvents = useMemo(() => {
    if (selectedEvents.length === 0) return sorted;
    return selectedEvents;
  }, [selectedEvents, sorted]);

  function jumpToEventMonth(id: string) {
    const event = findEventById(id, [sorted, filtered, events]);
    if (event) {
      setCalMonth(eventAnchorMonth(event, calendarScope));
    }
  }

  function handleSelect(id: string) {
    setMapPulse(null);

    const alreadySelected = selectedIds.includes(id);

    if (alreadySelected) {
      if (isMobile) {
        setActiveId(id);
        jumpToEventMonth(id);
        return;
      }
      const next = selectedIds.filter((x) => x !== id);
      setSelectedIds(next);
      if (activeIdResolved === id) {
        setActiveId(next[next.length - 1] ?? null);
      }
      return;
    }

    setSelectedIds((prev) => [...prev, id]);
    setActiveId(id);
    jumpToEventMonth(id);
  }

  function handleActivate(id: string) {
    if (!selectedIds.includes(id)) return;
    setActiveId(id);
    jumpToEventMonth(id);
    if (view === "map") {
      setMapPulse((prev) => ({
        id,
        key: (prev?.key ?? 0) + 1,
      }));
      window.setTimeout(() => {
        setMapPulse((current) => (current?.id === id ? null : current));
      }, 1200);
    }
  }

  function handleRemoveSelected(id: string) {
    const nextIds = selectedIds.filter((x) => x !== id);
    const nextActive =
      activeIdResolved === id
        ? (nextIds[nextIds.length - 1] ?? null)
        : activeIdResolved && nextIds.includes(activeIdResolved)
          ? activeIdResolved
          : (nextIds[nextIds.length - 1] ?? null);

    setSelectedIds(nextIds);
    setActiveId(nextActive);
    if (nextActive) jumpToEventMonth(nextActive);
    setDetailExpanded(false);
  }

  function closeDetailSheet() {
    setSelectedIds([]);
    setActiveId(null);
    setDetailExpanded(false);
  }

  function handleClearOtherTabs() {
    if (!activeIdResolved) return;
    setSelectedIds([activeIdResolved]);
    setActiveId(activeIdResolved);
  }

  const shellExpanded = !isMobile && detailExpanded && hasSelection;

  const shellClass = [
    "planner-shell",
    isMobile ? "planner-shell-mobile" : "",
    !isMobile && hasSelection ? "planner-shell-has-detail" : "",
    shellExpanded ? "planner-shell-detail-expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const filterBarProps = {
    filters,
    onChange: setFilters,
    departureIata,
    onDepartureIataChange: setDepartureIata,
    currency,
    onCurrencyChange: setCurrency,
  };

  const detailProps = {
    events: selectedEvents,
    activeId: activeIdResolved,
    departureIata,
    stayDays,
    currency,
    expanded: detailExpanded,
    onExpandedChange: setDetailExpanded,
    onActivate: handleActivate,
    onRemove: handleRemoveSelected,
    onClearOthers: handleClearOtherTabs,
  };

  function renderViewToggle(className?: string) {
    return (
      <div
        className={["view-toggle", className].filter(Boolean).join(" ")}
        role="group"
        aria-label="View mode"
      >
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
    );
  }

  const sortControl = (
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
  );

  return (
    <div
      className={[
        "planner",
        isMobile ? "planner-mobile" : "",
        `planner-view-${view}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
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
            your airport.
          </p>
        </div>
      </header>

      <div className="mobile-chrome">
        <div className="mobile-chrome-top">
          <p className="mobile-chrome-brand">Wild Season</p>
          <button
            type="button"
            className="mobile-filters-btn"
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
          >
            Filters
            {filterCount > 0 ? (
              <span className="mobile-filters-badge">{filterCount}</span>
            ) : null}
          </button>
        </div>
        <div className="mobile-chrome-row">
          <p className="mobile-chrome-count">
            <strong>{sorted.length}</strong>{" "}
            {sorted.length === 1 ? "destination" : "destinations"}
          </p>
          {renderViewToggle()}
        </div>
      </div>

      <div className={shellClass}>
        <div className="filter-aside-desktop">
          <FilterBar {...filterBarProps} />
        </div>

        <main className="results">
          <div className="results-toolbar">
            <p className="results-count results-count-desktop">
              <strong>{sorted.length}</strong>{" "}
              {sorted.length === 1 ? "destination" : "destinations"}
            </p>
            <div className="results-toolbar-actions">
              {view === "list" ? sortControl : null}
              {renderViewToggle("view-toggle-desktop")}
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
                    departureIata={departureIata}
                    stayDays={stayDays}
                    currency={currency}
                    selected={selectedIds.includes(event.id)}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            )
          ) : view === "calendar" ? (
            <CalendarView
              events={calendarEvents}
              scope={calendarScope}
              year={calYear}
              month={calMonth}
              onMonthChange={(y, m) => {
                setCalYear(y);
                setCalMonth(m);
              }}
              selectedIds={selectedIds}
              onSelect={handleSelect}
            />
          ) : sorted.length === 0 ? (
            <p className="empty-state">
              No windows match these filters. Try clearing a few chips.
            </p>
          ) : (
            <MapView
              key={isMobile ? "map-mobile" : "map-desktop"}
              events={sorted}
              filters={filters}
              departureIata={departureIata}
              stayDays={stayDays}
              currency={currency}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              pulseTarget={mapPulse}
              showMonthScrubber={!isMobile}
            />
          )}
        </main>

        {!isMobile && hasSelection ? (
          <aside
            className={`detail-aside ${shellExpanded ? "detail-aside-expanded" : ""}`}
            aria-label="Event detail"
          >
            <EventDetail {...detailProps} />
          </aside>
        ) : null}
      </div>

      {filtersOpen ? (
        <div className="mobile-sheet" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            className="mobile-sheet-backdrop"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="mobile-sheet-panel">
            <div className="mobile-sheet-header">
              <h2 className="mobile-sheet-title">Filters</h2>
              <div className="mobile-sheet-header-actions">
                {filterCount > 0 ? (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => setFilters(emptyFilters())}
                  >
                    Clear ({filterCount})
                  </button>
                ) : null}
                <button
                  type="button"
                  className="mobile-sheet-done"
                  onClick={() => setFiltersOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
            <div className="mobile-sheet-body">
              <FilterBar {...filterBarProps} embedded />
            </div>
            <div className="mobile-sheet-footer">
              <button
                type="button"
                className="mobile-sheet-done mobile-sheet-done-wide"
                onClick={() => setFiltersOpen(false)}
              >
                Show {sorted.length}{" "}
                {sorted.length === 1 ? "destination" : "destinations"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isMobile && hasSelection ? (
        <div
          className="mobile-sheet mobile-sheet-detail"
          role="dialog"
          aria-modal="true"
          aria-label="Event detail"
        >
          <div className="mobile-sheet-panel mobile-sheet-panel-detail">
            <EventDetail
              {...detailProps}
              sheetMode
              onBack={closeDetailSheet}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
