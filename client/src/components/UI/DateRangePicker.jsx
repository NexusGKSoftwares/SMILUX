import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useId,
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

// ─── Date Utility Helpers ────────────────────────────────────────────────────
const DAY_MS = 864e5;

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const monthStart = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const monthEnd = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const addDays = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const dayDiff = (a, b) =>
  Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS);

const monthDiff = (a, b) =>
  (a.getFullYear() - b.getFullYear()) * 12 + a.getMonth() - b.getMonth();

const sameDay = (a, b) =>
  Boolean(a && b && dayDiff(a, b) === 0);

const keyOf = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;

const fromKey = (key) => {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const orderedRange = (a, b) =>
  dayDiff(a, b) <= 0 ? { start: a, end: b } : { start: b, end: a };

const sameRange = (a, b) =>
  Boolean(a && b && sameDay(a.start, b.start) && sameDay(a.end, b.end));

const clampDate = (date, min, max) =>
  min && dayDiff(date, min) < 0
    ? startOfDay(min)
    : max && dayDiff(date, max) > 0
      ? startOfDay(max)
      : date;

// ─── Preset Ranges ───────────────────────────────────────────────────────────
export const defaultDateRangePresets = [
  { label: 'Today', range: (today) => ({ start: today, end: today }) },
  {
    label: 'Yesterday',
    range: (today) => ({ start: addDays(today, -1), end: addDays(today, -1) }),
  },
  {
    label: 'Last 7 days',
    range: (today) => ({ start: addDays(today, -6), end: today }),
  },
  {
    label: 'Last 30 days',
    range: (today) => ({ start: addDays(today, -29), end: today }),
  },
  {
    label: 'This month',
    range: (today) => ({ start: monthStart(today), end: today }),
  },
  {
    label: 'Last month',
    range: (today) => ({
      start: addMonths(today, -1),
      end: monthEnd(addMonths(today, -1)),
    }),
  },
  {
    label: 'This quarter',
    range: (today) => ({
      start: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
      end: today,
    }),
  },
  {
    label: 'Year to date',
    range: (today) => ({
      start: new Date(today.getFullYear(), 0, 1),
      end: today,
    }),
  },
];

// ─── Single Month View Component ─────────────────────────────────────────────
function CalendarMonthView({
  month,
  range,
  hoverDate,
  today,
  minDate,
  maxDate,
  weekStartsOn = 0,
  formatters,
  onPick,
  onHover,
  showHeader = true,
}) {
  const firstDay = useMemo(
    () => addDays(month, -((month.getDay() - weekStartsOn + 7) % 7)),
    [month, weekStartsOn]
  );

  const weeks = useMemo(() => {
    return Array.from({ length: 6 }, (_, weekIdx) =>
      Array.from({ length: 7 }, (_, dayIdx) => addDays(firstDay, weekIdx * 7 + dayIdx))
    );
  }, [firstDay]);

  const inMonth = (date) => monthDiff(date, month) === 0;

  // Active or preview range
  const lo = range?.start;
  const hi = range?.end;

  return (
    <div className="flex flex-col select-none w-full">
      {showHeader && (
        <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-100 text-center py-1 mb-2">
          {formatters.title.format(month)}
        </h3>
      )}

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
        {weeks[0].map((date) => (
          <span key={date.getDay()} className="h-6 flex items-center justify-center">
            {formatters.weekday.format(date).slice(0, 2)}
          </span>
        ))}
      </div>

      {/* Days Matrix */}
      <div className="space-y-1">
        {weeks.map((week, wIdx) => {
          // If none of the days in this 6th week are in current month, hide it
          if (!week.some(inMonth) && wIdx >= 5) return null;

          return (
            <div key={wIdx} className="grid grid-cols-7 relative">
              {week.map((date) => {
                const isCurrentMonth = inMonth(date);
                if (!isCurrentMonth) {
                  return <div key={keyOf(date)} className="h-8" />;
                }

                const key = keyOf(date);
                const disabled = Boolean(
                  (minDate && dayDiff(date, minDate) < 0) ||
                  (maxDate && dayDiff(date, maxDate) > 0)
                );

                const isStart = lo && sameDay(date, lo);
                const isEnd = hi && sameDay(date, hi);
                const isToday = sameDay(date, today);
                const inRange =
                  lo && hi && dayDiff(date, lo) >= 0 && dayDiff(date, hi) <= 0;

                return (
                  <div
                    key={key}
                    onMouseEnter={() => !disabled && onHover && onHover(date)}
                    className={`relative h-8 flex items-center justify-center ${inRange
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : ''
                      } ${isStart ? 'rounded-l-lg' : ''} ${isEnd ? 'rounded-r-lg' : ''}`}
                  >
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => onPick(date)}
                      className={`h-7 w-7 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed ${isStart || isEnd
                          ? 'bg-[#027A48] text-white font-bold shadow-xs hover:bg-[#02683E]'
                          : inRange
                            ? 'text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/50'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        } ${isToday && !isStart && !isEnd ? 'ring-1 ring-emerald-600 font-bold' : ''}`}
                    >
                      <span>{date.getDate()}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Reusable DateRangePicker Component ─────────────────────────────────
export default function DateRangePicker({
  value,
  defaultValue = null,
  onChange,
  label = 'Date range',
  placeholder = 'Select dates',
  presets = defaultDateRangePresets,
  minDate,
  maxDate,
  weekStartsOn = 0,
  locale = 'en-US',
  months = 1, // 'auto' | 1 | 2 (defaults to 1 for compact dropdown that fits neatly)
  align = 'auto', // 'auto' | 'end' | 'start'
  className = '',
}) {
  const uid = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const committed = value !== undefined ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [draftRange, setDraftRange] = useState(committed);
  const [anchorDate, setAnchorDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // Month count state (allows 1 or 2 months)
  const initialMonths = months === 2 ? 2 : 1;
  const [monthCount, setMonthCount] = useState(initialMonths);

  // Alignment detection state
  const [effectiveAlign, setEffectiveAlign] = useState(
    align === 'start' ? 'start' : 'end'
  );

  // Today reference
  const today = useMemo(() => startOfDay(new Date()), []);

  // View month pointer (first visible month)
  const [viewMonth, setViewMonth] = useState(() =>
    monthStart(committed?.end || today)
  );

  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Formatters
  const formatters = useMemo(
    () => ({
      label: new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      title: new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
    }),
    [locale]
  );

  // Currently shown preview range (anchor + hover or draft)
  const activeRange = useMemo(() => {
    if (anchorDate) {
      return orderedRange(anchorDate, hoverDate || anchorDate);
    }
    return draftRange;
  }, [anchorDate, hoverDate, draftRange]);

  // Days count
  const daysCount = useMemo(() => {
    if (!activeRange?.start || !activeRange?.end) return 0;
    return dayDiff(activeRange.end, activeRange.start) + 1;
  }, [activeRange]);

  // Text representation for trigger and summary
  const formattedDisplay = useMemo(() => {
    if (!committed?.start || !committed?.end) return placeholder;
    if (sameDay(committed.start, committed.end)) {
      return formatters.label.format(committed.start);
    }
    return `${formatters.label.format(committed.start)} – ${formatters.label.format(
      committed.end
    )}`;
  }, [committed, formatters, placeholder]);

  const summaryDisplay = useMemo(() => {
    if (!activeRange?.start || !activeRange?.end) return 'No dates selected';
    if (sameDay(activeRange.start, activeRange.end)) {
      return formatters.label.format(activeRange.start);
    }
    return `${formatters.label.format(activeRange.start)} – ${formatters.label.format(
      activeRange.end
    )}`;
  }, [activeRange, formatters]);

  // Active preset index
  const activePresetIdx = useMemo(() => {
    if (!activeRange?.start || !activeRange?.end) return -1;
    return presets.findIndex((preset) => {
      const pRange = preset.range(today);
      return sameRange(pRange, activeRange);
    });
  }, [activeRange, presets, today]);

  // Calculate alignment to ensure it never overflows viewport
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    if (align === 'start') {
      setEffectiveAlign('start');
      return;
    }
    if (align === 'end') {
      setEffectiveAlign('end');
      return;
    }

    // Auto alignment check based on viewport position
    const rect = triggerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const estimatedWidth = monthCount === 2 ? 650 : 330;

    // If aligning to left (start) would overflow screen on the right, use 'end'
    if (rect.left + estimatedWidth > windowWidth - 16) {
      setEffectiveAlign('end');
    } else {
      setEffectiveAlign('start');
    }
  }, [isOpen, align, monthCount]);

  // Close when clicked outside or Esc key pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setAnchorDate(null);
        setHoverDate(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setAnchorDate(null);
        setHoverDate(null);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Open handler
  const handleOpen = () => {
    setDraftRange(committed);
    setAnchorDate(null);
    setHoverDate(null);
    if (committed?.end) {
      setViewMonth(monthStart(committed.end));
    } else {
      setViewMonth(monthStart(today));
    }
    setIsOpen(true);
  };

  // Preset click handler
  const handleSelectPreset = (preset) => {
    const next = preset.range(today);
    setDraftRange(next);
    setAnchorDate(null);
    setHoverDate(null);
    setViewMonth(monthStart(next.end));
  };

  // Day click handler
  const handlePickDate = (date) => {
    if (!anchorDate) {
      setAnchorDate(date);
      setHoverDate(date);
      return;
    }

    const next = orderedRange(anchorDate, date);
    setDraftRange(next);
    setAnchorDate(null);
    setHoverDate(null);
  };

  // Apply handler
  const handleApply = () => {
    const next = anchorDate ? { start: anchorDate, end: anchorDate } : draftRange;
    if (!next) return;

    if (value === undefined) {
      setInternalValue(next);
    }
    onChange?.(next);
    setIsOpen(false);
    setAnchorDate(null);
    setHoverDate(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setAnchorDate(null);
    setHoverDate(null);
  };

  // Month navigation
  const handlePrevMonth = () => {
    setViewMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left font-sans ${className}`}
    >
      {/* ─── Trigger Button ─── */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`${label}: ${formattedDisplay}`}
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all cursor-pointer"
      >
        <HugeiconsIcon
          icon={Calendar01Icon}
          size={15}
          className="text-slate-400 dark:text-slate-500 shrink-0"
        />
        <span className="truncate">{formattedDisplay}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={13}
          className={`text-slate-400 dark:text-slate-500 shrink-0 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* ─── Popover Panel ─── */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={label}
          className={`absolute top-full mt-1.5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-100 max-w-[calc(100vw-24px)] ${effectiveAlign === 'end' ? 'right-0 left-auto' : 'left-0 right-auto'
            } ${monthCount === 2 ? 'w-[640px]' : 'w-[330px]'}`}
        >
          {/* ─── 1. Presets Header (Compact horizontal chips row) ─── */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar bg-slate-50/70 dark:bg-slate-850/60 shrink-0">
            {presets.map((preset, idx) => {
              const isActive = activePresetIdx === idx;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer select-none shrink-0 ${isActive
                      ? 'bg-[#027A48] text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* ─── 2. Calendar Month Navigation & Month View ─── */}
          <div className="p-3.5">
            {monthCount === 1 ? (
              // Single Month View (Compact, fits neatly right below trigger)
              <div>
                {/* Month Switcher Header */}
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={handlePrevMonth}
                    disabled={Boolean(minDate && monthDiff(viewMonth, minDate) <= 0)}
                    className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-25"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {formatters.title.format(viewMonth)}
                    </span>
                    {/* View mode toggle */}
                    <button
                      type="button"
                      title="Switch to 2-month view"
                      onClick={() => setMonthCount(2)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 cursor-pointer font-medium"
                    >
                      2M
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={handleNextMonth}
                    disabled={Boolean(maxDate && monthDiff(viewMonth, maxDate) >= 0)}
                    className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-25"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </button>
                </div>

                <CalendarMonthView
                  month={viewMonth}
                  range={activeRange}
                  hoverDate={hoverDate}
                  today={today}
                  minDate={minDate}
                  maxDate={maxDate}
                  weekStartsOn={weekStartsOn}
                  formatters={formatters}
                  onPick={handlePickDate}
                  onHover={setHoverDate}
                  showHeader={false}
                />
              </div>
            ) : (
              // Dual Month View (Side-by-side with toggle to 1M)
              <div className="relative">
                <div className="flex items-center justify-between mb-2 px-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={handlePrevMonth}
                    disabled={Boolean(minDate && monthDiff(viewMonth, minDate) <= 0)}
                    className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-25 z-10"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
                  </button>

                  <button
                    type="button"
                    title="Switch to compact 1-month view"
                    onClick={() => setMonthCount(1)}
                    className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 cursor-pointer font-medium"
                  >
                    1M compact
                  </button>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={handleNextMonth}
                    disabled={Boolean(
                      maxDate && monthDiff(addMonths(viewMonth, 1), maxDate) >= 0
                    )}
                    className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-25 z-10"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <CalendarMonthView
                    month={viewMonth}
                    range={activeRange}
                    hoverDate={hoverDate}
                    today={today}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekStartsOn={weekStartsOn}
                    formatters={formatters}
                    onPick={handlePickDate}
                    onHover={setHoverDate}
                    showHeader={true}
                  />
                  <CalendarMonthView
                    month={addMonths(viewMonth, 1)}
                    range={activeRange}
                    hoverDate={hoverDate}
                    today={today}
                    minDate={minDate}
                    maxDate={maxDate}
                    weekStartsOn={weekStartsOn}
                    formatters={formatters}
                    onPick={handlePickDate}
                    onHover={setHoverDate}
                    showHeader={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ─── 3. Footer with Range Summary and Apply Actions ─── */}
          <div className="border-t border-slate-100 dark:border-slate-800 px-3.5 py-2.5 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-850/60">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {summaryDisplay}
              </span>
              {daysCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 shrink-0">
                  {daysCount}d
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCancel}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!activeRange}
                onClick={handleApply}
                className="px-3.5 py-1 rounded-lg text-xs font-semibold text-white bg-[#027A48] hover:bg-[#02683E] disabled:opacity-40 shadow-xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
