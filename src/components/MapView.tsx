"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { eventOverlapsMonth } from "@/lib/calendar";
import type { DisplayCurrency } from "@/lib/currency";
import { fitMapToEvents, fitMapToRegions } from "@/lib/mapFraming";
import type { FilterState, WildlifeEvent } from "@/lib/types";
import { RegionLandmasses } from "./RegionLandmasses";

interface MapViewProps {
  events: WildlifeEvent[];
  filters: FilterState;
  departureIata: string;
  stayDays: number;
  currency: DisplayCurrency;
  selectedIds: string[];
  onSelect: (id: string) => void;
  /** Bumps to replay the locate pulse on a selected event. */
  pulseTarget: { id: string; key: number } | null;
  /** Desktop month movie scrubber under the map. */
  showMonthScrubber?: boolean;
}

const FIT_PADDING: [number, number] = [56, 56];
const PLAY_MS = 850;
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function InvalidateSize() {
  const map = useMap();

  useEffect(() => {
    const invalidate = () => map.invalidateSize({ animate: false });
    const frame = window.requestAnimationFrame(invalidate);
    const timer = window.setTimeout(invalidate, 50);
    const onResize = () => invalidate();
    window.addEventListener("resize", onResize);

    const parent = map.getContainer().parentElement;
    const observer =
      parent && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => invalidate())
        : null;
    observer?.observe(parent ?? map.getContainer());

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [map]);

  return null;
}

function FitBounds({
  events,
  filters,
}: {
  events: WildlifeEvent[];
  filters: FilterState;
}) {
  const map = useMap();

  useEffect(() => {
    if (filters.regions.length > 0) {
      fitMapToRegions(map, filters.regions, FIT_PADDING);
      return;
    }

    fitMapToEvents(map, events, FIT_PADDING);
  }, [events, filters, map]);

  return null;
}

function PulseRing({
  event,
  pulseKey,
}: {
  event: WildlifeEvent;
  pulseKey: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.panTo([event.lat, event.lng], { animate: true });
  }, [map, event.lat, event.lng, pulseKey]);

  return (
    <Marker
      key={`pulse-${event.id}-${pulseKey}`}
      position={[event.lat, event.lng]}
      interactive={false}
      zIndexOffset={1000}
      icon={L.divIcon({
        className: "map-pulse-icon",
        html: `<span class="map-pulse-ring" style="--pulse-color:${MARKER_FILL}"></span>`,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      })}
    />
  );
}

/** Shared marker palette — softer navy fill + light blue rim. */
const MARKER_FILL = "#2f5f9e";
const MARKER_BORDER = "#8ec5eb";

function createMarkerIcon(selected: boolean) {
  const size = selected ? 18 : 14;
  return L.divIcon({
    className: "map-marker-icon",
    html: `<span class="map-marker ${selected ? "map-marker-on" : ""}" style="background:${MARKER_FILL};border-color:${MARKER_BORDER}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapMonthScrubber({
  enabled,
  month,
  playing,
  visibleCount,
  onEnabledChange,
  onMonthChange,
  onPlayingChange,
}: {
  enabled: boolean;
  month: number;
  playing: boolean;
  visibleCount: number;
  onEnabledChange: (enabled: boolean) => void;
  onMonthChange: (month: number) => void;
  onPlayingChange: (playing: boolean) => void;
}) {
  return (
    <div
      className={`map-month-scrubber ${enabled ? "map-month-scrubber-on" : "map-month-scrubber-off"}`}
      aria-label="Month timeline"
    >
      <label className="map-month-toggle">
        <span className="sr-only">Year movie</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            const next = e.target.checked;
            onEnabledChange(next);
            if (!next) onPlayingChange(false);
          }}
        />
        <span className="map-month-toggle-ui" aria-hidden="true" />
      </label>

      <button
        type="button"
        className="map-month-play"
        onClick={() => onPlayingChange(!playing)}
        aria-pressed={playing}
        aria-label={
          playing ? "Pause month animation" : "Play months through the year"
        }
        disabled={!enabled}
      >
        {playing ? (
          <span className="map-month-play-icon" aria-hidden="true">
            ⏸
          </span>
        ) : (
          <span className="map-month-play-icon map-month-play-icon-play" aria-hidden="true">
            ▶
          </span>
        )}
      </button>

      <div className="map-month-scrubber-main" aria-disabled={!enabled}>
        <div className="map-month-scrubber-meta">
          <p className="map-month-label">{MONTH_LABELS[month - 1]}</p>
          <p className="map-month-count">
            <strong>{visibleCount}</strong>{" "}
            {visibleCount === 1 ? "destination" : "destinations"} this month
          </p>
        </div>

        <label className="map-month-slider-field">
          <span className="sr-only">Month</span>
          <input
            type="range"
            className="map-month-slider"
            min={1}
            max={12}
            step={1}
            value={month}
            disabled={!enabled}
            onChange={(e) => {
              onPlayingChange(false);
              onMonthChange(Number(e.target.value));
            }}
          />
        </label>

        <div className="map-month-ticks" aria-hidden="true">
          {MONTH_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`map-month-tick ${month === i + 1 ? "map-month-tick-on" : ""}`}
              disabled={!enabled}
              onClick={() => {
                onPlayingChange(false);
                onMonthChange(i + 1);
              }}
            >
              {label.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MapView({
  events,
  filters,
  selectedIds,
  onSelect,
  pulseTarget,
  showMonthScrubber = false,
}: MapViewProps) {
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [playing, setPlaying] = useState(false);
  const [scrubberActive, setScrubberActive] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setMonth((current) => (current >= 12 ? 1 : current + 1));
    }, PLAY_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (!showMonthScrubber) {
      setPlaying(false);
      setScrubberActive(false);
    }
  }, [showMonthScrubber]);

  const visibleEvents = useMemo(() => {
    if (!showMonthScrubber || !scrubberActive) return events;
    return events.filter((event) => eventOverlapsMonth(event, month));
  }, [events, month, scrubberActive, showMonthScrubber]);

  const pulseEvent =
    pulseTarget != null
      ? (visibleEvents.find((e) => e.id === pulseTarget.id) ?? null)
      : null;

  return (
    <div className="map-wrap">
      <MapContainer
        className="map-container"
        center={[20, 10]}
        zoom={2}
        minZoom={1}
        maxZoom={12}
        scrollWheelZoom
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
        />

        <InvalidateSize />
        <RegionLandmasses filters={filters} />

        {visibleEvents.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={createMarkerIcon(selectedIds.includes(event.id))}
            eventHandlers={{
              click: () => onSelect(event.id),
            }}
          />
        ))}

        {pulseEvent && pulseTarget ? (
          <PulseRing event={pulseEvent} pulseKey={pulseTarget.key} />
        ) : null}

        {/* Frame to the full filtered set so the camera stays steady while months play. */}
        <FitBounds events={events} filters={filters} />
      </MapContainer>

      {showMonthScrubber ? (
        <MapMonthScrubber
          enabled={scrubberActive}
          month={month}
          playing={playing}
          visibleCount={visibleEvents.length}
          onEnabledChange={setScrubberActive}
          onMonthChange={setMonth}
          onPlayingChange={setPlaying}
        />
      ) : null}
    </div>
  );
}
