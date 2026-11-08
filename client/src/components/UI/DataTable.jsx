import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  FilterIcon,
  Download01Icon,
  ReloadIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  Cancel01Icon,
  Tick01Icon,
  ViewIcon,
  ViewOffSlashIcon,
  Menu01Icon,
  LayoutGridIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';

/**
 * Enterprise Spreadsheet-Dense DataTable Component
 *
 * Highlights:
 * 1. Filters in every column (text, select dropdown, number, boolean)
 * 2. Super fast memoized paging with custom jump-to-page & page-size options
 * 3. Complete control of element placement (customizable top/bottom toolbars & slots)
 * 4. Multi-column ordering (Shift + Click to sort multiple columns with priority indicators)
 * 5. Mobile friendly viewport adaptation with smooth touch scroll
 * 6. Sticky header row on vertical scroll
 * 7. Sticky first column & sticky last column on horizontal scroll with clear elevation borders
 * 8. Spreadsheet-grade ultra-dense row heights (compact default)
 * 9. Strong, high-contrast spreadsheet grid borders across all rows and columns
 */
export default function DataTable({
  data = [],
  columns = [],
  rowKey = 'id',
  title = '',
  // Sticky Options
  stickyHeader = true,
  stickyFirstColumn = true,
  stickyLastColumn = true,
  maxHeight = '650px',
  // Density: 'compact' (spreadsheet ~28px) | 'standard' (~36px) | 'relaxed' (~44px)
  initialDensity = 'compact',
  // Multi-column sorting
  initialSort = [], // e.g. [{ key: 'status', direction: 'asc' }]
  // Paging Options
  pageSizeOptions = [10, 25, 50, 100, 'All'],
  initialPageSize = 25,
  showPagination = true,
  // Filtering Options
  showColumnFiltersDefault = true,
  enableGlobalSearch = true,
  // Selection
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  // Element Placement Layout
  layout = {
    topStart: ['globalSearch', 'activeFiltersBadge'],
    topEnd: ['filterToggle', 'densitySelector', 'columnVisibility', 'exportButton'],
    bottomStart: ['paginationInfo', 'selectionInfo'],
    bottomEnd: ['pageSizeSelector', 'jumpToPage', 'paginationControls'],
  },
  // Custom slots
  topToolbarContent = null,
  bottomToolbarContent = null,
  renderTopToolbar = null,
  renderBottomToolbar = null,
  // Row interaction
  onRowClick = null,
  // Styling
  className = '',
  tableClassName = '',
  emptyMessage = 'No matching records found',
  loading = false,
}) {
  // ─── Density State ──────────────────────────────────────────────────────────
  const [density, setDensity] = useState(initialDensity);

  // ─── Column Visibility State ───────────────────────────────────────────────
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const initial = {};
    columns.forEach((col) => {
      initial[col.key] = col.hidden !== true;
    });
    return initial;
  });
  const [isColMenuOpen, setIsColMenuOpen] = useState(false);
  const colMenuRef = useRef(null);

  // ─── Multi-Column Sort State ───────────────────────────────────────────────
  // Format: [{ key: 'colA', direction: 'asc' | 'desc' }, ...]
  const [sortConfig, setSortConfig] = useState(initialSort);

  // ─── Per-Column Filters State ──────────────────────────────────────────────
  // Format: { [colKey]: string }
  const [columnFilters, setColumnFilters] = useState({});
  const [showColumnFilters, setShowColumnFilters] = useState(showColumnFiltersDefault);

  // ─── Global Search State ───────────────────────────────────────────────────
  const [globalSearch, setGlobalSearch] = useState('');

  // ─── Pagination State ──────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // ─── Selection State (if uncontrolled) ────────────────────────────────────
  const [internalSelectedKeys, setInternalSelectedKeys] = useState([]);
  const activeSelectedKeys = selectable
    ? onSelectionChange
      ? selectedRowKeys
      : internalSelectedKeys
    : [];

  const updateSelection = useCallback(
    (newKeys) => {
      if (onSelectionChange) {
        onSelectionChange(newKeys);
      } else {
        setInternalSelectedKeys(newKeys);
      }
    },
    [onSelectionChange]
  );

  // Close column menu on outside click
  useEffect(() => {
    if (!isColMenuOpen) return;
    const handleClickOutside = (e) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target)) {
        setIsColMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isColMenuOpen]);

  // ─── Multi-Column Sort Handler ─────────────────────────────────────────────
  const handleSort = (columnKey, event) => {
    const isMultiSort = event.shiftKey || event.metaKey || event.ctrlKey;

    setSortConfig((prevSort) => {
      const existingIndex = prevSort.findIndex((s) => s.key === columnKey);

      if (isMultiSort) {
        // Multi-sort: Append or toggle in existing list
        if (existingIndex > -1) {
          const current = prevSort[existingIndex];
          if (current.direction === 'asc') {
            const updated = [...prevSort];
            updated[existingIndex] = { key: columnKey, direction: 'desc' };
            return updated;
          } else {
            // Remove from sort
            return prevSort.filter((s) => s.key !== columnKey);
          }
        } else {
          return [...prevSort, { key: columnKey, direction: 'asc' }];
        }
      } else {
        // Single sort: Replace all with this column
        if (existingIndex > -1) {
          const current = prevSort[existingIndex];
          if (current.direction === 'asc') {
            return [{ key: columnKey, direction: 'desc' }];
          } else {
            return []; // Reset to unsorted
          }
        } else {
          return [{ key: columnKey, direction: 'asc' }];
        }
      }
    });
  };

  // ─── Filtering Logic (Column Filters + Global Search) ──────────────────────
  const activeColumns = useMemo(() => {
    return columns.filter((col) => visibleColumns[col.key] !== false);
  }, [columns, visibleColumns]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // 1. Global Search across all visible columns
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase();
        const matchesGlobal = activeColumns.some((col) => {
          const val = row[col.key];
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(query);
        });
        if (!matchesGlobal) return false;
      }

      // 2. Per-Column Filters
      for (const [colKey, filterVal] of Object.entries(columnFilters)) {
        if (!filterVal || filterVal === 'all') continue;
        const cellValue = row[colKey];
        const colDef = columns.find((c) => c.key === colKey);

        // Custom filter function if specified on column
        if (colDef && typeof colDef.filterFn === 'function') {
          if (!colDef.filterFn(row, filterVal)) return false;
          continue;
        }

        if (cellValue === null || cellValue === undefined) return false;

        const stringCell = String(cellValue).toLowerCase();
        const stringFilter = String(filterVal).toLowerCase();

        // Exact match for select type, substring for text
        if (colDef?.filterType === 'select') {
          if (stringCell !== stringFilter) return false;
        } else {
          if (!stringCell.includes(stringFilter)) return false;
        }
      }

      return true;
    });
  }, [data, activeColumns, columns, globalSearch, columnFilters]);

  // ─── Multi-Column Sorting Logic ───────────────────────────────────────────
  const sortedData = useMemo(() => {
    if (!sortConfig || sortConfig.length === 0) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const colDef = columns.find((c) => c.key === key);
        let valA = a[key];
        let valB = b[key];

        // Custom comparator if provided
        if (colDef && typeof colDef.sortFn === 'function') {
          const comp = colDef.sortFn(a, b, direction);
          if (comp !== 0) return comp;
          continue;
        }

        if (valA === valB) continue;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        // Numeric or date or string comparison
        let result = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          result = valA - valB;
        } else {
          result = String(valA).localeCompare(String(valB), undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        }

        if (result !== 0) {
          return direction === 'asc' ? result : -result;
        }
      }
      return 0;
    });
  }, [filteredData, sortConfig, columns]);

  // ─── Super Fast Pagination Slicing ────────────────────────────────────────
  const totalEntries = sortedData.length;
  const isAllPages = pageSize === 'All';
  const effectivePageSize = isAllPages ? totalEntries : Number(pageSize) || 25;
  const totalPages = isAllPages ? 1 : Math.max(1, Math.ceil(totalEntries / effectivePageSize));

  // Auto-clamp page if data shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedData = useMemo(() => {
    if (isAllPages) return sortedData;
    const start = (currentPage - 1) * effectivePageSize;
    return sortedData.slice(start, start + effectivePageSize);
  }, [sortedData, isAllPages, currentPage, effectivePageSize]);

  // Row selection helpers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageKeys = pagedData.map((r) => r[rowKey]);
      const merged = Array.from(new Set([...activeSelectedKeys, ...pageKeys]));
      updateSelection(merged);
    } else {
      const pageKeys = new Set(pagedData.map((r) => r[rowKey]));
      updateSelection(activeSelectedKeys.filter((k) => !pageKeys.has(k)));
    }
  };

  const handleRowSelect = (key) => {
    if (activeSelectedKeys.includes(key)) {
      updateSelection(activeSelectedKeys.filter((k) => k !== key));
    } else {
      updateSelection([...activeSelectedKeys, key]);
    }
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = Object.values(columnFilters).filter((v) => v && v !== 'all').length;
    if (globalSearch.trim()) count += 1;
    return count;
  }, [columnFilters, globalSearch]);

  const clearAllFilters = () => {
    setColumnFilters({});
    setGlobalSearch('');
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (sortedData.length === 0) return;
    const exportCols = activeColumns.filter((c) => c.exportable !== false);
    const headers = exportCols.map((c) => `"${c.title || c.key}"`).join(',');
    const rows = sortedData.map((row) => {
      return exportCols
        .map((c) => {
          const val = row[c.key];
          if (val === null || val === undefined) return '""';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title || 'export'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Density CSS map
  const densityStyles = {
    compact: {
      cell: 'py-1 px-2 text-[11px] leading-tight font-sans',
      header: 'py-1.5 px-2 text-[11px] font-semibold',
      filterInput: 'py-0.5 px-1.5 text-[11px] h-6',
      rowHeight: 'h-7',
    },
    standard: {
      cell: 'py-1.5 px-3 text-xs leading-normal font-sans',
      header: 'py-2 px-3 text-xs font-semibold',
      filterInput: 'py-1 px-2 text-xs h-7',
      rowHeight: 'h-9',
    },
    relaxed: {
      cell: 'py-2.5 px-4 text-sm leading-normal font-sans',
      header: 'py-3 px-4 text-sm font-semibold',
      filterInput: 'py-1.5 px-2.5 text-xs h-8',
      rowHeight: 'h-11',
    },
  }[density];

  // ─── Render Element Helper (Controls Element Placement) ────────────────────
  const renderPlacementElement = (elementName) => {
    switch (elementName) {
      case 'globalSearch':
        return enableGlobalSearch ? (
          <div key="globalSearch" className="relative min-w-[200px] max-w-xs flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Global table search..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-7 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {globalSearch && (
              <button
                type="button"
                onClick={() => setGlobalSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>
        ) : null;

      case 'activeFiltersBadge':
        return activeFiltersCount > 0 ? (
          <div key="activeFiltersBadge" className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
              <HugeiconsIcon icon={FilterIcon} size={11} />
              <span>{activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}</span>
            </span>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:underline cursor-pointer text-[11px]"
            >
              Reset all
            </button>
          </div>
        ) : null;

      case 'filterToggle':
        return (
          <button
            key="filterToggle"
            type="button"
            title="Toggle column filter inputs"
            onClick={() => setShowColumnFilters((prev) => !prev)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border font-medium transition-colors cursor-pointer ${showColumnFilters
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
              }`}
          >
            <HugeiconsIcon icon={FilterIcon} size={13} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        );

      case 'densitySelector':
        return (
          <div key="densitySelector" className="inline-flex rounded border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-[11px]">
            <button
              type="button"
              title="Compact Spreadsheet Rows"
              onClick={() => setDensity('compact')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${density === 'compact'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Dense
            </button>
            <button
              type="button"
              title="Standard Rows"
              onClick={() => setDensity('standard')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${density === 'standard'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Normal
            </button>
            <button
              type="button"
              title="Relaxed Rows"
              onClick={() => setDensity('relaxed')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${density === 'relaxed'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Cozy
            </button>
          </div>
        );

      case 'columnVisibility':
        return (
          <div key="columnVisibility" className="relative" ref={colMenuRef}>
            <button
              type="button"
              title="Select columns to show or hide"
              onClick={() => setIsColMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-medium cursor-pointer"
            >
              <HugeiconsIcon icon={ViewIcon} size={13} />
              <span className="hidden sm:inline">Columns</span>
            </button>

            {isColMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow-xl p-2 z-50 animate-in fade-in-0 zoom-in-95">
                <div className="text-[11px] font-bold text-slate-500 uppercase px-2 py-1 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span>Toggle Columns</span>
                  <button
                    type="button"
                    onClick={() => {
                      const allVisible = {};
                      columns.forEach((c) => (allVisible[c.key] = true));
                      setVisibleColumns(allVisible);
                    }}
                    className="text-emerald-600 hover:underline lowercase font-normal"
                  >
                    show all
                  </button>
                </div>
                <div className="py-1 space-y-1">
                  {columns.map((col) => (
                    <label
                      key={col.key}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[col.key] !== false}
                        onChange={(e) =>
                          setVisibleColumns({ ...visibleColumns, [col.key]: e.target.checked })
                        }
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="truncate">{col.title || col.key}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'exportButton':
        return (
          <button
            key="exportButton"
            type="button"
            title="Export filtered table data to CSV"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-medium cursor-pointer"
          >
            <HugeiconsIcon icon={Download01Icon} size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
        );

      case 'paginationInfo':
        const startIdx = totalEntries === 0 ? 0 : (currentPage - 1) * effectivePageSize + 1;
        const endIdx = isAllPages ? totalEntries : Math.min(currentPage * effectivePageSize, totalEntries);
        return (
          <div key="paginationInfo" className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            Showing <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{startIdx}</span> to{' '}
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{endIdx}</span> of{' '}
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{totalEntries}</span> entries
            {filteredData.length !== data.length && (
              <span className="text-slate-400 dark:text-slate-500 ml-1">
                (filtered from {data.length} total)
              </span>
            )}
          </div>
        );

      case 'selectionInfo':
        return selectable && activeSelectedKeys.length > 0 ? (
          <div key="selectionInfo" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
            <span>{activeSelectedKeys.length} selected</span>
          </div>
        ) : null;

      case 'pageSizeSelector':
        return (
          <div key="pageSizeSelector" className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const val = e.target.value === 'All' ? 'All' : Number(e.target.value);
                setPageSize(val);
                setCurrentPage(1);
              }}
              className="py-0.5 px-2 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case 'jumpToPage':
        return !isAllPages && totalPages > 1 ? (
          <form
            key="jumpToPage"
            onSubmit={(e) => {
              e.preventDefault();
              const p = Number(jumpPageInput);
              if (p >= 1 && p <= totalPages) {
                setCurrentPage(p);
                setJumpPageInput('');
              }
            }}
            className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400"
          >
            <span>Go to:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder={String(currentPage)}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-12 py-0.5 px-1.5 text-center text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
            />
          </form>
        ) : null;

      case 'paginationControls':
        return !isAllPages && totalPages > 1 ? (
          <div key="paginationControls" className="inline-flex items-center gap-1">
            {/* First Page */}
            <button
              type="button"
              title="First Page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} size={14} />
            </button>
            {/* Prev Page */}
            <button
              type="button"
              title="Previous Page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            </button>

            {/* Page info */}
            <span className="px-2 text-xs font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Page */}
            <button
              type="button"
              title="Next Page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </button>
            {/* Last Page */}
            <button
              type="button"
              title="Last Page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowRightDoubleIcon} size={14} />
            </button>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Determine sticky column positions & styles
  const getStickyClasses = (colIndex, isHeader = false) => {
    const isFirst = stickyFirstColumn && colIndex === 0;
    const isLast = stickyLastColumn && colIndex === activeColumns.length - 1;

    let classes = '';

    if (isFirst) {
      classes += ' sticky left-0 z-10 shadow-[2px_0_0_0_#94a3b8] dark:shadow-[2px_0_0_0_#475569] ';
      if (isHeader) classes += ' !z-30 ';
    }
    if (isLast) {
      classes += ' sticky right-0 z-10 shadow-[-2px_0_0_0_#94a3b8] dark:shadow-[-2px_0_0_0_#475569] ';
      if (isHeader) classes += ' !z-30 ';
    }

    return classes;
  };

  return (
    <div className={`w-full flex flex-col font-sans bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700 shadow-xs overflow-hidden ${className}`}>
      {/* ─── Top Placement Toolbar ────────────────────────────────────────── */}
      {renderTopToolbar ? (
        renderTopToolbar({
          globalSearch,
          setGlobalSearch,
          activeFiltersCount,
          clearAllFilters,
          density,
          setDensity,
          visibleColumns,
          setVisibleColumns,
          totalEntries,
          selectedRowsCount: activeSelectedKeys.length,
        })
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2 sm:p-2.5 bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-300 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[200px]">
            {layout.topStart?.map(renderPlacementElement)}
            {topToolbarContent}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {layout.topEnd?.map(renderPlacementElement)}
          </div>
        </div>
      )}

      {/* ─── Spreadsheet Table Viewport ──────────────────────────────────── */}
      <div
        className="relative w-full overflow-x-auto overflow-y-auto no-scrollbar scroll-smooth"
        style={{ maxHeight }}
      >
        <table
          className={`w-full border-collapse border border-slate-300 dark:border-slate-700 text-left ${tableClassName}`}
        >
          {/* ── Table Header (Fixed Sticky on vertical scroll) ── */}
          <thead className={stickyHeader ? 'sticky top-0 z-20' : ''}>
            {/* Header Titles Row */}
            <tr className="bg-slate-200/90 dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-100 select-none">
              {/* Optional Selection Checkbox Column */}
              {selectable && (
                <th
                  className={`w-9 text-center border-r border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 ${densityStyles.header} ${stickyFirstColumn ? 'sticky left-0 z-30 shadow-[2px_0_0_0_#94a3b8]' : ''
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      pagedData.length > 0 &&
                      pagedData.every((r) => activeSelectedKeys.includes(r[rowKey]))
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
              )}

              {activeColumns.map((col, idx) => {
                const sortEntry = sortConfig.find((s) => s.key === col.key);
                const sortOrder = sortConfig.findIndex((s) => s.key === col.key);
                const isSorted = !!sortEntry;
                const canSort = col.sortable !== false;
                const stickyClass = getStickyClasses(idx, true);

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{
                      width: col.width,
                      minWidth: col.minWidth || '80px',
                      maxWidth: col.maxWidth,
                    }}
                    onClick={(e) => canSort && handleSort(col.key, e)}
                    title={
                      canSort
                        ? 'Click to sort. Hold Shift + Click to multi-column sort'
                        : undefined
                    }
                    className={`border-r border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 tracking-tight whitespace-nowrap transition-colors ${canSort ? 'cursor-pointer hover:bg-slate-300/80 dark:hover:bg-slate-700' : ''
                      } ${densityStyles.header} ${stickyClass} ${col.headerClassName || ''}`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="truncate">{col.title || col.key}</span>

                      {/* Sort Indicator & Multi-Sort Badge */}
                      {canSort && (
                        <div className="flex items-center gap-0.5 shrink-0 text-slate-500 dark:text-slate-400">
                          {isSorted ? (
                            sortEntry.direction === 'asc' ? (
                              <HugeiconsIcon
                                icon={ArrowUp01Icon}
                                size={13}
                                className="text-emerald-700 dark:text-emerald-400 stroke-[2.5]"
                              />
                            ) : (
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                size={13}
                                className="text-emerald-700 dark:text-emerald-400 stroke-[2.5]"
                              />
                            )
                          ) : (
                            <span className="opacity-25 hover:opacity-100 transition-opacity text-[10px] leading-none">
                              ⇅
                            </span>
                          )}

                          {/* Multi-column sort priority badge (1, 2, 3...) */}
                          {sortConfig.length > 1 && isSorted && (
                            <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white">
                              {sortOrder + 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>

            {/* ── Per-Column Filters Row (Fixed with header) ── */}
            {showColumnFilters && (
              <tr className="bg-slate-100 dark:bg-slate-850 border-b-2 border-slate-400 dark:border-slate-600">
                {selectable && (
                  <th
                    className={`border-r border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-850 ${stickyFirstColumn ? 'sticky left-0 z-30 shadow-[2px_0_0_0_#94a3b8]' : ''
                      }`}
                  />
                )}

                {activeColumns.map((col, idx) => {
                  const filterValue = columnFilters[col.key] || '';
                  const stickyClass = getStickyClasses(idx, true);
                  const isFiltered = !!filterValue && filterValue !== 'all';

                  return (
                    <th
                      key={`filter-${col.key}`}
                      className={`p-1 border-r border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-850 font-normal ${stickyClass}`}
                    >
                      {col.filterable !== false ? (
                        col.filterType === 'select' ? (
                          <div className="relative">
                            <select
                              value={filterValue}
                              onChange={(e) => {
                                setColumnFilters({
                                  ...columnFilters,
                                  [col.key]: e.target.value,
                                });
                                setCurrentPage(1);
                              }}
                              className={`w-full rounded border font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer ${densityStyles.filterInput
                                } ${isFiltered
                                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                                  : 'border-slate-300 dark:border-slate-700'
                                }`}
                            >
                              <option value="all">All</option>
                              {(
                                col.filterOptions ||
                                Array.from(
                                  new Set(data.map((d) => d[col.key]).filter(Boolean))
                                ).map((val) => ({ value: String(val), label: String(val) }))
                              ).map((opt) => {
                                const val = typeof opt === 'object' ? opt.value : opt;
                                const lbl = typeof opt === 'object' ? opt.label : opt;
                                return (
                                  <option key={val} value={val}>
                                    {lbl}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        ) : (
                          <div className="relative flex items-center">
                            <input
                              type={col.filterType === 'number' ? 'number' : 'text'}
                              placeholder={col.filterPlaceholder || `Filter ${col.title || ''}...`}
                              value={filterValue}
                              onChange={(e) => {
                                setColumnFilters({
                                  ...columnFilters,
                                  [col.key]: e.target.value,
                                });
                                setCurrentPage(1);
                              }}
                              className={`w-full rounded border font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 pr-5 ${densityStyles.filterInput
                                } ${isFiltered
                                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                                  : 'border-slate-300 dark:border-slate-700'
                                }`}
                            />
                            {filterValue && (
                              <button
                                type="button"
                                title="Clear column filter"
                                onClick={() => {
                                  const updated = { ...columnFilters };
                                  delete updated[col.key];
                                  setColumnFilters(updated);
                                }}
                                className="absolute right-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        )
                      ) : (
                        <div className="h-6" />
                      )}
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>

          {/* ── Table Body with Crisp Spreadsheet Grid Lines ── */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {loading ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs"
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                    <span>Loading spreadsheet records...</span>
                  </div>
                </td>
              </tr>
            ) : pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs"
                >
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {emptyMessage}
                  </p>
                  {(activeFiltersCount > 0 || globalSearch) && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
                    >
                      Clear all active filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIndex) => {
                const rowId = row[rowKey] || rowIndex;
                const isSelected = activeSelectedKeys.includes(rowId);
                const isEven = rowIndex % 2 === 0;

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                    className={`border-b border-slate-200 dark:border-slate-700 transition-colors ${densityStyles.rowHeight
                      } ${isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                        : isEven
                          ? 'bg-white dark:bg-slate-900 hover:bg-blue-50/40 dark:hover:bg-slate-800/60'
                          : 'bg-slate-50/50 dark:bg-slate-850 hover:bg-blue-50/40 dark:hover:bg-slate-800/60'
                      } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {/* Selection Checkbox */}
                    {selectable && (
                      <td
                        className={`text-center border-r border-slate-300 dark:border-slate-700 ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-inherit'
                          } ${stickyFirstColumn
                            ? 'sticky left-0 z-10 shadow-[2px_0_0_0_#94a3b8]'
                            : ''
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(rowId);
                          }}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                    )}

                    {/* Columns Cells */}
                    {activeColumns.map((col, colIdx) => {
                      const stickyClass = getStickyClasses(colIdx, false);
                      const rawValue = row[col.key];

                      return (
                        <td
                          key={col.key}
                          style={{
                            width: col.width,
                            minWidth: col.minWidth,
                            maxWidth: col.maxWidth,
                          }}
                          className={`border-r border-slate-300 dark:border-slate-700 truncate ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-inherit'
                            } ${densityStyles.cell} ${stickyClass} ${col.className || ''}`}
                        >
                          {col.render ? (
                            col.render(rawValue, row, rowIndex)
                          ) : (
                            <span className={col.align === 'right' ? 'text-right block' : ''}>
                              {rawValue !== null && rawValue !== undefined ? String(rawValue) : '—'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Bottom Placement Toolbar (Pagination, Info & Placements) ─────── */}
      {showPagination &&
        (renderBottomToolbar ? (
          renderBottomToolbar({
            currentPage,
            setCurrentPage,
            pageSize,
            setPageSize,
            totalPages,
            totalEntries,
            selectedRowsCount: activeSelectedKeys.length,
          })
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 sm:p-2.5 bg-slate-50/90 dark:bg-slate-800/80 border-t border-slate-300 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              {layout.bottomStart?.map(renderPlacementElement)}
              {bottomToolbarContent}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {layout.bottomEnd?.map(renderPlacementElement)}
            </div>
          </div>
        ))}
    </div>
  );
}

