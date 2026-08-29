"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { formatAnnualRange } from "@/lib/calendar";
import {
  computeEventBudget,
  formatTotalBudget,
  getDepartureLabel,
} from "@/lib/budget";
import type { DepartureCityId } from "@/data/departureCities";
import { labelize } from "@/lib/filters";
import type { WildlifeEvent } from "@/lib/types";
import { getEventImage } from "@/data/eventImages";

interface EventCardProps {
  event: WildlifeEvent;
  departureCityId: DepartureCityId;
  stayDays: number;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function EventCard({
  event,
  departureCityId,
  stayDays,
  selected,
  onSelect,
}: EventCardProps) {
  const image = getEventImage(event.id);
  const budget = computeEventBudget(event, departureCityId, stayDays);
  const departureLabel = getDepartureLabel(departureCityId);

  return (
    <article
      className={`event-card ${selected ? "event-card-selected" : ""}`}
      style={
        {
          "--atm-a": event.atmosphere[0],
          "--atm-b": event.atmosphere[1],
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="event-card-btn"
        onClick={() => onSelect(event.id)}
        aria-pressed={selected}
      >
        <div className="event-card-visual" aria-hidden="true">
          {image ? (
            <Image
              src={image.imagePath}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="event-card-photo"
            />
          ) : (
            <div className="event-card-visual-inner" />
          )}
          <div className="event-card-visual-scrim" />
          <span className="event-card-region">{event.region}</span>
        </div>
        <div className="event-card-body">
          <h3 className="event-card-title">{event.title}</h3>
          <p className="event-card-place">
            {event.location}, {event.country}
          </p>
          <p className="event-card-dates">{formatAnnualRange(event)}</p>
          <div className="tag-row">
            {event.styles.slice(0, 2).map((s) => (
              <span key={s} className="tag">
                {labelize(s)}
              </span>
            ))}
            {event.animals.slice(0, 2).map((a) => (
              <span key={a} className="tag tag-muted">
                {labelize(a)}
              </span>
            ))}
          </div>
          <p className="event-card-budget">
            {formatTotalBudget(budget, departureLabel)}
          </p>
        </div>
      </button>
    </article>
  );
}
