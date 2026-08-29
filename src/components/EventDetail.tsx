"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
} from "react";
import { formatAnnualRange } from "@/lib/calendar";
import {
  formatAccess,
  formatAccommodation,
  formatClimate,
  formatTourAccess,
  labelize,
} from "@/lib/filters";
import {
  computeEventBudget,
  formatBudgetBreakdown,
  getDepartureLabel,
} from "@/lib/budget";
import type { DisplayCurrency } from "@/lib/currency";
import type { WildlifeEvent } from "@/lib/types";
import { getEventImage } from "@/data/eventImages";
import { uniqueEventAbbrevs } from "@/lib/abbrev";
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
  events: WildlifeEvent[];
  activeId: string | null;
  departureIata: string;
  stayDays: number;
  currency: DisplayCurrency;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onActivate: (id: string) => void;
  onRemove: (id: string) => void;
  onClearOthers: () => void;
  /** Mobile sheet: show Back and call when leaving the sheet. */
  sheetMode?: boolean;
  onBack?: () => void;
}

const TAB_SCROLL_STEP = 72;

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

function DetailTabs({
  events,
  activeId,
  onActivate,
  onRemove,
  onClearOthers,
}: {
  events: WildlifeEvent[];
  activeId: string;
  onActivate: (id: string) => void;
  onRemove: (id: string) => void;
  onClearOthers: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateOverflow = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScroll - el.scrollLeft > 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateOverflow);
      observer.disconnect();
    };
  }, [updateOverflow, events.length]);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
    // Re-check fades after scroll settles
    const timer = window.setTimeout(updateOverflow, 280);
    return () => window.clearTimeout(timer);
  }, [activeId, updateOverflow]);

  function scrollBy(direction: -1 | 1) {
    stripRef.current?.scrollBy({
      left: direction * TAB_SCROLL_STEP,
      behavior: "smooth",
    });
  }

  const showChevrons = canScrollLeft || canScrollRight;
  const abbrevs = uniqueEventAbbrevs(events);

  return (
    <div className="detail-tabs-row">
      <div
        className={`detail-tabs-shell ${showChevrons ? "detail-tabs-shell-scrollable" : ""} ${canScrollLeft ? "detail-tabs-fade-left" : ""} ${canScrollRight ? "detail-tabs-fade-right" : ""}`}
      >
        {showChevrons ? (
          <button
            type="button"
            className="detail-tabs-chevron detail-tabs-chevron-left"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll tabs left"
          >
            ‹
          </button>
        ) : null}

        <div
          ref={stripRef}
          className="detail-tabs"
          role="tablist"
          aria-label="Selected events"
        >
          {events.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                ref={isActive ? activeTabRef : undefined}
                className={`detail-tab ${isActive ? "detail-tab-active" : ""}`}
              >
                <button
                  type="button"
                  role="tab"
                  className="detail-tab-btn"
                  aria-selected={isActive}
                  id={`detail-tab-${item.id}`}
                  onClick={() => onActivate(item.id)}
                  title={item.title}
                  aria-label={`${abbrevs[item.id]}: ${item.title}`}
                >
                  <span
                    className="detail-tab-swatch"
                    style={{ background: item.atmosphere[0] }}
                    aria-hidden="true"
                  />
                  <span className="detail-tab-label">{abbrevs[item.id]}</span>
                </button>
                <button
                  type="button"
                  className="detail-tab-close"
                  aria-label={`Remove ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {showChevrons ? (
          <button
            type="button"
            className="detail-tabs-chevron detail-tabs-chevron-right"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Scroll tabs right"
          >
            ›
          </button>
        ) : null}
      </div>

      <button
        type="button"
        className="detail-tabs-clear-others"
        onClick={onClearOthers}
        aria-label="Clear other tabs"
        title="Close all tabs except the current one"
      >
        Clear
      </button>
    </div>
  );
}

export function EventDetail({
  events,
  activeId,
  departureIata,
  stayDays,
  currency,
  expanded,
  onExpandedChange,
  onActivate,
  onRemove,
  onClearOthers,
  sheetMode = false,
  onBack,
}: EventDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const event =
    events.find((e) => e.id === activeId) ?? events[events.length - 1] ?? null;
  const showExpanded = sheetMode || expanded;

  useEffect(() => {
    if (!showExpanded) setLightboxOpen(false);
  }, [showExpanded]);

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
  const budget = computeEventBudget(event, departureIata, stayDays);
  const departureLabel = getDepartureLabel(departureIata);
  const budgetBreakdown = formatBudgetBreakdown(
    budget,
    departureLabel,
    currency,
  );
  const osmUrl = `https://www.openstreetmap.org/?mlat=${event.lat}&mlon=${event.lng}#map=8/${event.lat}/${event.lng}`;
  const photoAlt = `${event.title} — ${event.location}, ${event.country}`;

  return (
    <>
      <div
        className={`detail-panel ${showExpanded ? "detail-panel-expanded" : ""}`}
        style={
          {
            "--atm-a": event.atmosphere[0],
            "--atm-b": event.atmosphere[1],
          } as CSSProperties
        }
      >
        {events.length > 1 ? (
          <DetailTabs
            events={events}
            activeId={event.id}
            onActivate={onActivate}
            onRemove={onRemove}
            onClearOthers={onClearOthers}
          />
        ) : null}

        <div
          className={`detail-hero ${showExpanded ? "detail-hero-expanded" : ""} ${image ? "detail-hero-has-photo" : ""}`}
          role="tabpanel"
          aria-labelledby={
            events.length > 1 ? `detail-tab-${event.id}` : undefined
          }
        >
          {image ? (
            showExpanded ? (
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
                  unoptimized
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
                unoptimized
              />
            )
          ) : null}
          <div className="detail-hero-scrim" aria-hidden="true" />
          <div className="detail-actions">
            {sheetMode && onBack ? (
              <button
                type="button"
                className="detail-action-btn"
                onClick={onBack}
              >
                Back
              </button>
            ) : null}
            {!sheetMode ? (
              <button
                type="button"
                className="detail-action-btn"
                onClick={() => onExpandedChange(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? "Collapse" : "Expand"}
              </button>
            ) : null}
            <button
              type="button"
              className="detail-close"
              onClick={() =>
                sheetMode && onBack ? onBack() : onRemove(event.id)
              }
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

          {showExpanded ? (
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
                </div>

                <div className="detail-section">
                  <h3>Climate</h3>
                  <div className="tag-row">
                    {event.climates.map((c) => (
                      <span key={c} className="tag tag-muted">
                        {formatClimate(c)}
                      </span>
                    ))}
                  </div>
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
                <h3>Climate</h3>
                <div className="tag-row">
                  {event.climates.map((c) => (
                    <span key={c} className="tag tag-muted">
                      {formatClimate(c)}
                    </span>
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
