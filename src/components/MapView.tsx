"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { formatAnnualRange } from "@/lib/calendar";
import {
  computeEventBudget,
  formatTotalBudget,
} from "@/lib/budget";
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
}

const FIT_PADDING: [number, number] = [56, 56];

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

  const color = event.atmosphere[1] || event.atmosphere[0];

  return (
    <Marker
      key={`pulse-${event.id}-${pulseKey}`}
      position={[event.lat, event.lng]}
      interactive={false}
      zIndexOffset={1000}
      icon={L.divIcon({
        className: "map-pulse-icon",
        html: `<span class="map-pulse-ring" style="--pulse-color:${color}"></span>`,
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      })}
    />
  );
}

function createMarkerIcon(event: WildlifeEvent, selected: boolean) {
  const size = selected ? 18 : 14;
  return L.divIcon({
    className: "map-marker-icon",
    html: `<span class="map-marker ${selected ? "map-marker-on" : ""}" style="background:${event.atmosphere[0]};border-color:${event.atmosphere[1]}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function MapView({
  events,
  filters,
  departureIata,
  stayDays,
  currency,
  selectedIds,
  onSelect,
  pulseTarget,
}: MapViewProps) {
  const pulseEvent =
    pulseTarget != null
      ? (events.find((e) => e.id === pulseTarget.id) ?? null)
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

        <RegionLandmasses filters={filters} />

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={createMarkerIcon(event, selectedIds.includes(event.id))}
            eventHandlers={{
              click: () => onSelect(event.id),
            }}
          >
            <Popup>
              <div className="map-popup">
                <p className="map-popup-region">{event.region}</p>
                <p className="map-popup-title">{event.title}</p>
                <p className="map-popup-place">
                  {event.location}, {event.country}
                </p>
                <p className="map-popup-dates">
                  {formatAnnualRange(event)}
                </p>
                <p className="map-popup-budget">
                  {formatTotalBudget(
                    computeEventBudget(event, departureIata, stayDays),
                    departureIata,
                    currency,
                  )}
                </p>
                <button
                  type="button"
                  className="map-popup-btn"
                  onClick={() => onSelect(event.id)}
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {pulseEvent && pulseTarget ? (
          <PulseRing event={pulseEvent} pulseKey={pulseTarget.key} />
        ) : null}

        <FitBounds events={events} filters={filters} />
      </MapContainer>
    </div>
  );
}
