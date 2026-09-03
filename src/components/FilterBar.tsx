"use client";

import { AirportPicker } from "./AirportPicker";
import {
  ANIMALS,
  BUDGET_BANDS,
  CLIMATES,
  CLIMATE_LABELS,
  DANGERS,
  DIFFICULTIES,
  EVENT_KINDS,
  EVENT_KIND_LABELS,
  MONTHS,
  NATURE_SUBJECTS,
  NATURE_SUBJECT_LABELS,
  PACES,
  REGIONS,
  ACCESS_LABELS,
  ACCESS_MODES,
  ACCOMMODATION_LABELS,
  ACCOMMODATION_STYLES,
  TOUR_ACCESS,
  TOUR_ACCESS_LABELS,
  STYLES,
  TRIP_LENGTH_OPTIONS,
  activeFilterCount,
  emptyFilters,
  labelize,
} from "@/lib/filters";
import { DEFAULT_TYPICAL_TRIP_DAYS } from "@/lib/budget";
import {
  CURRENCY_LABELS,
  DISPLAY_CURRENCIES,
  type DisplayCurrency,
} from "@/lib/currency";
import type { FilterState } from "@/lib/types";

interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  departureIata: string;
  onDepartureIataChange: (iata: string) => void;
  currency: DisplayCurrency;
  onCurrencyChange: (currency: DisplayCurrency) => void;
  /** Hide chrome when embedded in a mobile sheet. */
  embedded?: boolean;
}

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
  format = labelize,
  disabled = false,
  hint,
}: {
  label: string;
  options: readonly T[] | T[];
  selected: T[];
  onToggle: (value: T) => void;
  format?: (value: T) => string;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <fieldset
      className={`filter-group ${disabled ? "filter-group-disabled" : ""}`}
      disabled={disabled}
    >
      <legend className="filter-legend">{label}</legend>
      {hint ? <p className="filter-group-hint">{hint}</p> : null}
      <div className="chip-row">
        {options.map((option) => {
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={`chip ${on ? "chip-on" : ""}`}
              aria-pressed={on}
              disabled={disabled}
              onClick={() => onToggle(option)}
            >
              {format(option)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FilterBar({
  filters,
  onChange,
  departureIata,
  onDepartureIataChange,
  currency,
  onCurrencyChange,
  embedded = false,
}: FilterBarProps) {
  const count = activeFilterCount(filters);
  const monthsActive = filters.months.length > 0;
  const datesActive = Boolean(filters.dateFrom || filters.dateTo);
  const tripLengthActive = filters.tripDays !== DEFAULT_TYPICAL_TRIP_DAYS;
  const datesDisabled = monthsActive || tripLengthActive;

  return (
    <aside
      className={`filter-bar ${embedded ? "filter-bar-embedded" : ""}`}
      aria-label="Trip filters"
    >
      {!embedded ? (
        <div className="filter-bar-header">
          <h2 className="filter-title">Filters</h2>
          {count > 0 && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => onChange(emptyFilters())}
            >
              Clear ({count})
            </button>
          )}
        </div>
      ) : null}

      <fieldset className="filter-group">
        <legend className="filter-legend">Search</legend>
        <label className="search-field">
          <span className="sr-only">Search destinations</span>
          <input
            type="search"
            className="filter-control"
            placeholder="Place, animal, landscape…"
            value={filters.query}
            onChange={(e) =>
              onChange({ ...filters, query: e.target.value })
            }
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-legend">Departing from</legend>
        <AirportPicker value={departureIata} onChange={onDepartureIataChange} />
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-legend">Currency</legend>
        <label className="select-field select-field-inline">
          <span className="sr-only">Currency</span>
          <select
            value={currency}
            onChange={(e) =>
              onCurrencyChange(e.target.value as DisplayCurrency)
            }
          >
            {DISPLAY_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {CURRENCY_LABELS[code]}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <ChipGroup
        label="Event type"
        options={EVENT_KINDS}
        selected={filters.eventKinds}
        onToggle={(v) =>
          onChange({
            ...filters,
            eventKinds: toggleInList(filters.eventKinds, v),
          })
        }
        format={(v) => EVENT_KIND_LABELS[v]}
      />

      <ChipGroup
        label="Nature subjects"
        options={NATURE_SUBJECTS}
        selected={filters.natureSubjects}
        onToggle={(v) =>
          onChange({
            ...filters,
            natureSubjects: toggleInList(filters.natureSubjects, v),
          })
        }
        format={(v) => NATURE_SUBJECT_LABELS[v]}
      />

      <ChipGroup
        label="Region"
        options={REGIONS}
        selected={filters.regions}
        onToggle={(v) =>
          onChange({ ...filters, regions: toggleInList(filters.regions, v) })
        }
        format={(v) => v}
      />

      <ChipGroup
        label="Months"
        options={MONTHS.map((m) => String(m.value))}
        selected={filters.months.map(String)}
        disabled={datesActive}
        onToggle={(v) => {
          const month = Number(v);
          onChange({
            ...filters,
            dateFrom: "",
            dateTo: "",
            months: toggleInList(filters.months, month),
          });
        }}
        format={(v) => MONTHS.find((m) => m.value === Number(v))?.label ?? v}
      />

      <fieldset
        className={`filter-group ${datesActive ? "filter-group-disabled" : ""}`}
        disabled={datesActive}
      >
        <legend className="filter-legend">Trip length</legend>
        <div className="chip-row">
          {TRIP_LENGTH_OPTIONS.map((days) => {
            const on = filters.tripDays === days;
            return (
              <button
                key={days}
                type="button"
                className={`chip ${on ? "chip-on" : ""}`}
                aria-pressed={on}
                onClick={() =>
                  onChange({
                    ...filters,
                    dateFrom: "",
                    dateTo: "",
                    tripDays: days,
                  })
                }
              >
                {days} days
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset
        className={`filter-group ${datesDisabled ? "filter-group-disabled" : ""}`}
        disabled={datesDisabled}
      >
        <legend className="filter-legend">Specific dates</legend>
        <div className="date-row">
          <label className="date-field">
            <span>From</span>
            <input
              type="date"
              value={filters.dateFrom}
              disabled={datesDisabled}
              onChange={(e) =>
                onChange({
                  ...filters,
                  months: [],
                  tripDays: DEFAULT_TYPICAL_TRIP_DAYS,
                  dateFrom: e.target.value,
                })
              }
            />
          </label>
          <label className="date-field">
            <span>To</span>
            <input
              type="date"
              value={filters.dateTo}
              disabled={datesDisabled}
              onChange={(e) =>
                onChange({
                  ...filters,
                  months: [],
                  tripDays: DEFAULT_TYPICAL_TRIP_DAYS,
                  dateTo: e.target.value,
                })
              }
            />
          </label>
        </div>
      </fieldset>

      <ChipGroup
        label="Photography style"
        options={STYLES}
        selected={filters.styles}
        onToggle={(v) =>
          onChange({ ...filters, styles: toggleInList(filters.styles, v) })
        }
      />

      <ChipGroup
        label="Climate"
        options={CLIMATES}
        selected={filters.climates}
        onToggle={(v) =>
          onChange({
            ...filters,
            climates: toggleInList(filters.climates, v),
          })
        }
        format={(v) => CLIMATE_LABELS[v]}
      />

      <ChipGroup
        label="Access"
        options={ACCESS_MODES}
        selected={filters.access}
        onToggle={(v) =>
          onChange({ ...filters, access: toggleInList(filters.access, v) })
        }
        format={(v) => ACCESS_LABELS[v]}
      />

      <ChipGroup
        label="Accommodation"
        options={ACCOMMODATION_STYLES}
        selected={filters.accommodation}
        onToggle={(v) =>
          onChange({
            ...filters,
            accommodation: toggleInList(filters.accommodation, v),
          })
        }
        format={(v) => ACCOMMODATION_LABELS[v]}
      />

      <ChipGroup
        label="Tour type"
        options={TOUR_ACCESS}
        selected={filters.tourAccess}
        onToggle={(v) =>
          onChange({
            ...filters,
            tourAccess: toggleInList(filters.tourAccess, v),
          })
        }
        format={(v) => TOUR_ACCESS_LABELS[v]}
      />

      <ChipGroup
        label="Animal type"
        options={ANIMALS}
        selected={filters.animals}
        onToggle={(v) =>
          onChange({ ...filters, animals: toggleInList(filters.animals, v) })
        }
      />

      <ChipGroup
        label="Difficulty"
        options={DIFFICULTIES}
        selected={filters.difficulties}
        onToggle={(v) =>
          onChange({
            ...filters,
            difficulties: toggleInList(filters.difficulties, v),
          })
        }
      />

      <ChipGroup
        label="Pace"
        options={PACES}
        selected={filters.paces}
        onToggle={(v) =>
          onChange({ ...filters, paces: toggleInList(filters.paces, v) })
        }
      />

      <ChipGroup
        label="Danger"
        options={DANGERS}
        selected={filters.dangers}
        onToggle={(v) =>
          onChange({ ...filters, dangers: toggleInList(filters.dangers, v) })
        }
      />

      <ChipGroup
        label="Total budget"
        options={BUDGET_BANDS}
        selected={filters.budgetBands}
        onToggle={(v) =>
          onChange({
            ...filters,
            budgetBands: toggleInList(filters.budgetBands, v),
          })
        }
        format={(v) => (v === "mid" ? "Mid" : labelize(v))}
      />
    </aside>
  );
}
