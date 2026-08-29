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
import { MAP_REGIONS, REGION_COLORS } from "@/data/regionBounds";
import { formatAnnualRange } from "@/lib/calendar";
import {
  computeEventBudget,
  formatTotalBudget,
  getDepartureLabel,
} from "@/lib/budget";
import type { DepartureCityId } from "@/data/departureCities";
import { fitMapToEvents, fitMapToRegions } from "@/lib/mapFraming";
import type { FilterState, WildlifeEvent } from "@/lib/types";
import { RegionLandmasses } from "./RegionLandmasses";

interface MapViewProps {
  events: WildlifeEvent[];
  filters: FilterState;
  departureCityId: DepartureCityId;
  stayDays: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
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
  departureCityId,
  stayDays,
  selectedId,
  onSelect,
}: MapViewProps) {
  const highlightedRegions =
    filters.regions.length > 0 ? filters.regions : null;
  const departureLabel = getDepartureLabel(departureCityId);

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
            icon={createMarkerIcon(event, selectedId === event.id)}
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
                    computeEventBudget(event, departureCityId, stayDays),
                    departureLabel,
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

        <FitBounds events={events} filters={filters} />
      </MapContainer>

      <div className="map-legend" aria-label="Map legend">
        <p className="map-legend-title">
          {highlightedRegions
            ? `Highlighted: ${highlightedRegions.join(", ")}`
            : "All regions shown — filter by region to focus landmasses"}
        </p>
        <div className="map-legend-chips">
          {MAP_REGIONS.map((region) => {
            const active =
              !highlightedRegions || highlightedRegions.includes(region);
            return (
              <span
                key={region}
                className={`map-legend-chip ${active ? "" : "map-legend-chip-dim"}`}
              >
                <span
                  className="map-legend-swatch"
                  style={{ background: REGION_COLORS[region] }}
                />
                {region}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
