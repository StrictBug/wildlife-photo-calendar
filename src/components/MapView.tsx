"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { eventOverlapsMonth } from "@/lib/calendar";
import type { DisplayCurrency } from "@/lib/currency";
import { fitMapToEvents, fitMapToRegions } from "@/lib/mapFraming";
import { hopDelayMs, type RandomizerSpin } from "@/lib/randomizer";
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
  randomizerSpin?: RandomizerSpin | null;
  onRandomizerHop?: (hopIndex: number) => void;
  onRandomizerComplete?: (winnerId: string) => void;
  onMapBusyChange?: (busy: boolean) => void;
}

const FIT_PADDING: [number, number] = [56, 56];
const PLAY_MS = 850;
const WORLD_ZOOM = 2;
const LANDING_ZOOM = 5;
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

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
  disabled,
}: {
  events: WildlifeEvent[];
  filters: FilterState;
  disabled: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (disabled) return;
    if (filters.regions.length > 0) {
      fitMapToRegions(map, filters.regions, FIT_PADDING);
      return;
    }

    fitMapToEvents(map, events, FIT_PADDING);
  }, [events, filters, map, disabled]);

  return null;
}

function RandomizerFlyTo({
  event,
  isFinal,
  reducedMotion,
}: {
  event: WildlifeEvent;
  isFinal: boolean;
  reducedMotion: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    const zoom = isFinal ? LANDING_ZOOM : WORLD_ZOOM;
    if (reducedMotion) {
      map.setView([event.lat, event.lng], zoom, { animate: false });
      return;
    }
    map.flyTo([event.lat, event.lng], zoom, {
      duration: isFinal ? 1.2 : 0.45,
    });
  }, [map, event.lat, event.lng, event.id, isFinal, reducedMotion]);

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
  disabled,
  onEnabledChange,
  onMonthChange,
  onPlayingChange,
}: {
  enabled: boolean;
  month: number;
  playing: boolean;
  visibleCount: number;
  disabled: boolean;
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
          disabled={disabled}
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
        disabled={!enabled || disabled}
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
            disabled={!enabled || disabled}
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
              disabled={!enabled || disabled}
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
  randomizerSpin = null,
  onRandomizerHop,
  onRandomizerComplete,
  onMapBusyChange,
}: MapViewProps) {
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [playing, setPlaying] = useState(false);
  const [scrubberActive, setScrubberActive] = useState(false);
  const [spinPulse, setSpinPulse] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const isSpinning = randomizerSpin != null;
  const mapBusy = isSpinning || (scrubberActive && playing);

  useEffect(() => {
    onMapBusyChange?.(mapBusy);
  }, [mapBusy, onMapBusyChange]);

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

  useEffect(() => {
    if (!randomizerSpin || !onRandomizerComplete) return;

    const { path, hopIndex, winnerId } = randomizerSpin;
    const isFinal = hopIndex >= path.length - 1;

    if (reducedMotion || path.length <= 1) {
      setSpinPulse(true);
      const t = window.setTimeout(() => onRandomizerComplete(winnerId), 350);
      return () => window.clearTimeout(t);
    }

    if (isFinal) {
      setSpinPulse(true);
      const t = window.setTimeout(() => onRandomizerComplete(winnerId), 900);
      return () => window.clearTimeout(t);
    }

    const delay = hopDelayMs(hopIndex, path.length);
    const t = window.setTimeout(() => {
      onRandomizerHop?.(hopIndex + 1);
    }, delay);

    return () => window.clearTimeout(t);
  }, [
    randomizerSpin,
    onRandomizerComplete,
    onRandomizerHop,
    reducedMotion,
  ]);

  useEffect(() => {
    if (randomizerSpin) {
      setSpinPulse(false);
    }
  }, [randomizerSpin?.key]);

  const visibleEvents = useMemo(() => {
    if (!showMonthScrubber || !scrubberActive) return events;
    return events.filter((event) => eventOverlapsMonth(event, month));
  }, [events, month, scrubberActive, showMonthScrubber]);

  const spinFocusEvent = randomizerSpin
    ? events.find(
        (e) => e.id === (randomizerSpin.path[randomizerSpin.hopIndex] ?? randomizerSpin.winnerId),
      )
    : null;

  const spinIsFinal =
    randomizerSpin != null &&
    randomizerSpin.hopIndex >= randomizerSpin.path.length - 1;

  const pulseEvent =
    pulseTarget != null
      ? (visibleEvents.find((e) => e.id === pulseTarget.id) ?? null)
      : null;

  const spinWinner =
    randomizerSpin != null
      ? events.find((e) => e.id === randomizerSpin.winnerId)
      : null;

  return (
    <div className={`map-wrap ${isSpinning ? "map-wrap-spinning" : ""}`}>
      <div className="map-container-wrap">
        <MapContainer
          className="map-container"
          center={[20, 10]}
          zoom={2}
          minZoom={1}
          maxZoom={12}
          scrollWheelZoom={!isSpinning}
          worldCopyJump
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={false}
          />

          <InvalidateSize />
          <RegionLandmasses filters={filters} />

          {spinFocusEvent ? (
            <RandomizerFlyTo
              event={spinFocusEvent}
              isFinal={spinIsFinal}
              reducedMotion={reducedMotion}
            />
          ) : null}

          {visibleEvents.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createMarkerIcon(
                selectedIds.includes(event.id) ||
                  (spinPulse && event.id === randomizerSpin?.winnerId),
              )}
              eventHandlers={
                isSpinning
                  ? undefined
                  : {
                      click: () => onSelect(event.id),
                    }
              }
            />
          ))}

          {pulseEvent && pulseTarget ? (
            <PulseRing event={pulseEvent} pulseKey={pulseTarget.key} />
          ) : null}

          {spinPulse && spinWinner && randomizerSpin ? (
            <PulseRing
              event={spinWinner}
              pulseKey={randomizerSpin.key}
            />
          ) : null}

          <FitBounds events={events} filters={filters} disabled={isSpinning} />
        </MapContainer>

        {isSpinning ? (
          <p className="map-randomizer-status" aria-live="polite">
            Throwing dart…
          </p>
        ) : null}
      </div>

      {showMonthScrubber ? (
        <MapMonthScrubber
          enabled={scrubberActive}
          month={month}
          playing={playing}
          visibleCount={visibleEvents.length}
          disabled={isSpinning}
          onEnabledChange={setScrubberActive}
          onMonthChange={setMonth}
          onPlayingChange={setPlaying}
        />
      ) : null}
    </div>
  );
}
