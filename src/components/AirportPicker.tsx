"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  formatAirportLabel,
  formatAirportOption,
  getAirport,
  searchAirports,
  type DepartureAirport,
} from "@/data/airports";

interface AirportPickerProps {
  value: string;
  onChange: (iata: string) => void;
}

export function AirportPicker({ value, onChange }: AirportPickerProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = getAirport(value);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selected) setQuery(formatAirportLabel(selected));
  }, [selected]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        if (selected) setQuery(formatAirportLabel(selected));
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [selected]);

  const searchQuery =
    selected && query === formatAirportLabel(selected) ? "" : query;
  const results = searchAirports(searchQuery, 12);

  function choose(airport: DepartureAirport) {
    onChange(airport.iata);
    setQuery(formatAirportLabel(airport));
    setOpen(false);
  }

  return (
    <div className="airport-picker" ref={rootRef}>
      <label className="airport-picker-field">
        <span className="sr-only">Departure airport</span>
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search city or IATA (e.g. LHR, Tokyo)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onBlur={() => {
            window.setTimeout(() => {
              setOpen(false);
              if (selected) setQuery(formatAirportLabel(selected));
            }, 120);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              if (selected) setQuery(formatAirportLabel(selected));
            }
            if (e.key === "Enter" && results[0]) {
              e.preventDefault();
              choose(results[0]);
            }
          }}
        />
      </label>
      {open ? (
        <ul id={listId} className="airport-picker-list" role="listbox">
          {results.length === 0 ? (
            <li className="airport-picker-empty">No matching airports</li>
          ) : (
            results.map((airport) => (
              <li key={airport.iata} role="option">
                <button
                  type="button"
                  className={`airport-picker-option ${airport.iata === value ? "airport-picker-option-on" : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(airport)}
                >
                  {formatAirportOption(airport)}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
