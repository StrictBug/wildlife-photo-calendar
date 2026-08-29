"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { WildlifeEvent } from "@/lib/types";

function SetView({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 7);
  }, [lat, lng, map]);

  return null;
}

function createPinIcon(event: WildlifeEvent) {
  return L.divIcon({
    className: "map-marker-icon",
    html: `<span class="map-marker map-marker-on" style="background:${event.atmosphere[0]};border-color:${event.atmosphere[1]}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function EventLocationMap({ event }: { event: WildlifeEvent }) {
  return (
    <MapContainer
      className="detail-map-container"
      center={[event.lat, event.lng]}
      zoom={7}
      scrollWheelZoom={false}
      dragging
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[event.lat, event.lng]}
        icon={createPinIcon(event)}
      />
      <SetView lat={event.lat} lng={event.lng} />
    </MapContainer>
  );
}
