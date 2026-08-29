"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect, type CSSProperties } from "react";
import { formatAnnualRange } from "@/lib/calendar";
import {
  formatAccess,
  formatAccommodation,
  formatTourAccess,
  labelize,
} from "@/lib/filters";
import {
  computeEventBudget,
  formatBudgetBreakdown,
  getDepartureLabel,
} from "@/lib/budget";
import type { DepartureCityId } from "@/data/departureCities";
import type { WildlifeEvent } from "@/lib/types";
import { getEventImage } from "@/data/eventImages";
import { ImageCredit } from "./ImageCredit";
import { ImageLightbox } from "./ImageLightbox";

const EventLocationMap = dynamic(
  () => import("./EventLocationMap").then((m) => m.EventLocationMap),
  {
    ssr: false,
    loading: () => <div className="detail-map-loading">Loading map…</div>,
  },
);

interface EventDetailProps {
  event: WildlifeEvent | null;
  departureCityId: DepartureCityId;
  stayDays: number;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onClose: () => void;
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-meta-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function formatCoords(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lng).toFixed(2)}°${lngDir}`;
}

export function EventDetail({
  event,
  departureCityId,
  stayDays,
  expanded,
  onExpandedChange,
  onClose,
}: EventDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!expanded) setLightboxOpen(false);
  }, [expanded]);

  useEffect(() => {
    setLightboxOpen(false);
  }, [event?.id]);

  if (!event) {
    return (
      <div className="detail-empty" role="status">
        <p>Select a window to see planning notes, gear tips, and peak timing.</p>
      </div>
    );
  }

  const image = getEventImage(event.id);
  const budget = computeEventBudget(event, departureCityId, stayDays);
  const departureLabel = getDepartureLabel(departureCityId);
  const budgetBreakdown = formatBudgetBreakdown(budget, departureLabel);
  const osmUrl = `https://www.openstreetmap.org/?mlat=${event.lat}&mlon=${event.lng}#map=8/${event.lat}/${event.lng}`;
  const photoAlt = `${event.title} — ${event.location}, ${event.country}`;

  return (
    <>
      <div
        className={`detail-panel ${expanded ? "detail-panel-expanded" : ""}`}
        style={
          {
            "--atm-a": event.atmosphere[0],
            "--atm-b": event.atmosphere[1],
          } as CSSProperties
        }
      >
        <div
          className={`detail-hero ${expanded ? "detail-hero-expanded" : ""} ${image ? "detail-hero-has-photo" : ""}`}
        >
          {image ? (
            expanded ? (
              <button
                type="button"
                className="detail-hero-photo-btn"
                onClick={() => setLightboxOpen(true)}
                aria-label="View full photo"
              >
                <Image
                  src={image.imagePath}
                  alt={photoAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="detail-hero-photo"
                  priority
                />
                <span className="detail-hero-zoom-hint">Click to enlarge</span>
              </button>
            ) : (
              <Image
                src={image.imagePath}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="detail-hero-photo"
                priority
              />
            )
          ) : null}
          <div className="detail-hero-scrim" aria-hidden="true" />
          <div className="detail-actions">
            <button
              type="button"
              className="detail-action-btn"
              onClick={() => onExpandedChange(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
            <button
              type="button"
              className="detail-close"
              onClick={onClose}
              aria-label="Close detail"
            >
              ×
            </button>
          </div>
        </div>

        <div className="detail-content">
          <p className="detail-eyebrow">
            {event.region} · {event.country}
          </p>
          <h2 className="detail-title">{event.title}</h2>
          <p className="detail-place">{event.location}</p>
          <p className="detail-dates">{formatAnnualRange(event)}</p>
          <div className="detail-budget">
            <p className="detail-budget-headline">{budgetBreakdown.headline}</p>
            <ul className="detail-budget-breakdown">
              <li>{budgetBreakdown.trip}</li>
              <li>{budgetBreakdown.flights}</li>
            </ul>
          </div>

          {image ? <ImageCredit image={image} /> : null}

          {expanded ? (
            <div className="detail-expanded-body">
              <div className="detail-expanded-main">
                <p className="detail-desc">{event.description}</p>

                <dl className="detail-meta detail-meta-expanded">
                  <Meta label="Access" value={formatAccess(event.access)} />
                  <Meta
                    label="Accommodation"
                    value={formatAccommodation(event.accommodation)}
                  />
                  <Meta
                    label="Tour type"
                    value={formatTourAccess(event.tourAccess)}
                  />
                  <Meta label="Difficulty" value={labelize(event.difficulty)} />
                  <Meta label="Pace" value={labelize(event.pace)} />
                  <Meta label="Danger" value={labelize(event.danger)} />
                  <Meta label="Budget band" value={labelize(budget.band)} />
                  <Meta label="Region" value={event.region} />
                  <Meta label="Coordinates" value={formatCoords(event.lat, event.lng)} />
                </dl>

                <div className="detail-section">
                  <h3>Subjects</h3>
                  <div className="tag-row">
                    {event.animalLabels.map((a) => (
                      <span key={a} className="tag">{a}</span>
                    ))}
                  </div>
                  <p className="detail-submeta">
                    Categories: {event.animals.map(labelize).join(", ")}
                  </p>
                </div>

                <div className="detail-section">
                  <h3>Photography styles</h3>
                  <div className="tag-row">
                    {event.styles.map((s) => (
                      <span key={s} className="tag tag-muted">
                        {labelize(s)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Peak tip</h3>
                  <p>{event.peakTip}</p>
                </div>

                <div className="detail-section">
                  <h3>Gear notes</h3>
                  <p>{event.gearNotes}</p>
                </div>
              </div>

              <div className="detail-expanded-map">
                <div className="detail-section">
                  <h3>Location</h3>
                  <p className="detail-location-line">
                    {event.location}, {event.country}
                  </p>
                  <p className="detail-location-line detail-location-coords">
                    {formatCoords(event.lat, event.lng)}
                  </p>
                </div>
                <EventLocationMap event={event} />
                <a
                  href={osmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-map-link"
                >
                  Open in OpenStreetMap
                </a>
              </div>
            </div>
          ) : (
            <>
              <p className="detail-desc">{event.description}</p>

              <dl className="detail-meta">
                <Meta label="Access" value={formatAccess(event.access)} />
                <Meta
                  label="Accommodation"
                  value={formatAccommodation(event.accommodation)}
                />
                <Meta
                  label="Tour type"
                  value={formatTourAccess(event.tourAccess)}
                />
                <Meta label="Difficulty" value={labelize(event.difficulty)} />
                <Meta label="Pace" value={labelize(event.pace)} />
                <Meta label="Danger" value={labelize(event.danger)} />
              </dl>

              <div className="detail-section">
                <h3>Subjects</h3>
                <div className="tag-row">
                  {event.animalLabels.map((a) => (
                    <span key={a} className="tag">{a}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>Styles</h3>
                <div className="tag-row">
                  {event.styles.map((s) => (
                    <span key={s} className="tag tag-muted">
                      {labelize(s)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>Peak tip</h3>
                <p>{event.peakTip}</p>
              </div>

              <div className="detail-section">
                <h3>Gear notes</h3>
                <p>{event.gearNotes}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {lightboxOpen && image ? (
        <ImageLightbox
          image={image}
          alt={photoAlt}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}
