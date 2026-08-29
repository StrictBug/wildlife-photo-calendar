"use client";

import {
  DEPARTURE_CITIES,
  type DepartureCityId,
} from "@/data/departureCities";
import {
  ANIMALS,
  BUDGET_BANDS,
  DANGERS,
  DIFFICULTIES,
  MONTHS,
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
  resolveStayDays,
  usesDateRangeForStayDays,
} from "@/lib/filters";
import type { FilterState } from "@/lib/types";

interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  departureCityId: DepartureCityId;
  onDepartureCityChange: (id: DepartureCityId) => void;
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
  departureCityId,
  onDepartureCityChange,
}: FilterBarProps) {
  const count = activeFilterCount(filters);
  const monthsActive = filters.months.length > 0;
  const datesActive = Boolean(filters.dateFrom || filters.dateTo);
  const stayDays = resolveStayDays(filters);
  const stayFromDates = usesDateRangeForStayDays(filters);

  return (
    <aside className="filter-bar" aria-label="Trip filters">
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

      <fieldset className="filter-group">
        <legend className="filter-legend">Departing from</legend>
        <label className="select-field">
          <span className="sr-only">Departure city</span>
          <select
            value={departureCityId}
            onChange={(e) =>
              onDepartureCityChange(e.target.value as DepartureCityId)
            }
          >
            {DEPARTURE_CITIES.map((city) => (
              <option key={city.id} value={city.id}>
                {city.label} ({city.airport})
              </option>
            ))}
          </select>
        </label>
      </fieldset>

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
        hint={
          datesActive
            ? "Clear specific dates to filter by month instead."
            : undefined
        }
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
        className={`filter-group ${stayFromDates ? "filter-group-disabled" : ""}`}
        disabled={stayFromDates}
      >
        <legend className="filter-legend">Trip length</legend>
        {stayFromDates ? (
          <p className="filter-group-hint">
            {stayDays} {stayDays === 1 ? "day" : "days"} (from your specific
            dates).
          </p>
        ) : (
          <div className="chip-row">
            {TRIP_LENGTH_OPTIONS.map((days) => {
              const on = filters.tripDays === days;
              return (
                <button
                  key={days}
                  type="button"
                  className={`chip ${on ? "chip-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => onChange({ ...filters, tripDays: days })}
                >
                  {days} days
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      <fieldset
        className={`filter-group ${monthsActive ? "filter-group-disabled" : ""}`}
        disabled={monthsActive}
      >
        <legend className="filter-legend">Specific dates</legend>
        {monthsActive ? (
          <p className="filter-group-hint">
            Clear month chips to filter by date range instead.
          </p>
        ) : null}
        <div className="date-row">
          <label className="date-field">
            <span>From</span>
            <input
              type="date"
              value={filters.dateFrom}
              disabled={monthsActive}
              onChange={(e) =>
                onChange({
                  ...filters,
                  months: [],
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
              disabled={monthsActive}
              onChange={(e) =>
                onChange({
                  ...filters,
                  months: [],
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
