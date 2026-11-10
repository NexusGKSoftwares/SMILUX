import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  FilterIcon,
  Download01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  ViewIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import Button from './Button';
/**
 * Enterprise DataTable Component
 *
 * Highlights:
 * 1. Clean, pure white backgrounds throughout the entire datatable
 * 2. Subtle, ultra-clean and very thin borders with zero heavy/thick lines
 * 3. Default 'normal' density for optimal readability and comfort
 * 4. Filters in every column (text, select dropdown, number, boolean)
 * 5. Super fast memoized paging with custom jump-to-page & page-size options
 * 6. Multi-column ordering (Shift + Click to sort multiple columns with priority indicators)
 * 7. Mobile friendly with smooth horizontal touch scroll
 * 8. Fixed sticky header on vertical scroll
 * 9. Pinned sticky first column & sticky last column on horizontal scroll
 * 10. Clean flat design with all shadows removed
 */
export default function DataTable({
  data = [],
  columns = [],
  rowKey: rawRowKey = 'id',
  keyField,
  title = '',
  // Sticky Options
  stickyHeader = true,
  stickyFirstColumn = true,
  stickyLastColumn = true,
  maxHeight = '650px',
  // Density: 'normal' (default ~36px) | 'compact' (~28px) | 'relaxed' (~44px)
  initialDensity = 'normal',
  density: controlledDensity,
  // Multi-column sorting
  initialSort = [], // e.g. [{ key: 'name', direction: 'asc' }]
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
  const rowKey = keyField || rawRowKey || 'id';

  // ─── Density State (Normal by default) ──────────────────────────────────────
  const [density, setDensity] = useState(
    controlledDensity
      ? (controlledDensity === 'standard' ? 'normal' : controlledDensity)
      : (initialDensity === 'standard' ? 'normal' : initialDensity || 'normal')
  );

  useEffect(() => {
    if (controlledDensity) {
      setDensity(controlledDensity === 'standard' ? 'normal' : controlledDensity);
    }
  }, [controlledDensity]);

  // Helper to parse width strings (e.g. '220px', '220', 220) to number
  const parseWidth = useCallback((w, fallback = 150) => {
    if (typeof w === 'number') return w;
    if (typeof w === 'string') {
      const parsed = parseInt(w, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return fallback;
  }, []);

  // ─── Column Widths & Resizing State (Spreadsheet-like Drag Expand/Contract) ─
  const [columnWidths, setColumnWidths] = useState(() => {
    const initial = {};
    columns.forEach((col) => {
      initial[col.key] = parseWidth(col.width || col.minWidth, 150);
    });
    return initial;
  });

  // Sync if column definitions change
  useEffect(() => {
    setColumnWidths((prev) => {
      const updated = { ...prev };
      let hasChanges = false;
      columns.forEach((col) => {
        if (updated[col.key] === undefined) {
          updated[col.key] = parseWidth(col.width || col.minWidth, 150);
          hasChanges = true;
        }
      });
      return hasChanges ? updated : prev;
    });
  }, [columns, parseWidth]);

  const isResizingRef = useRef(false);

  const handleResizeStart = (e, colKey) => {
    e.stopPropagation();
    e.preventDefault();

    isResizingRef.current = true;
    const startX = e.clientX;
    const colDef = columns.find((c) => c.key === colKey);
    const startWidth = columnWidths[colKey] || parseWidth(colDef?.width || colDef?.minWidth, 150);
    const minWidth = colDef?.minWidth ? parseWidth(colDef.minWidth, 40) : 40;
    const maxWidth = colDef?.maxWidth ? parseWidth(colDef.maxWidth, 1200) : 1200;

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + deltaX));
      setColumnWidths((prev) => ({
        ...prev,
        [colKey]: newWidth,
      }));
    };

    const onMouseUp = () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setTimeout(() => {
        isResizingRef.current = false;
      }, 100);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

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
  const [sortConfig, setSortConfig] = useState(initialSort);

  // ─── Per-Column Filters State ──────────────────────────────────────────────
  const [columnFilters, setColumnFilters] = useState({});
  const [showColumnFilters, setShowColumnFilters] = useState(showColumnFiltersDefault);

  // ─── Global Search State ───────────────────────────────────────────────────
  const [globalSearch, setGlobalSearch] = useState('');

  // ─── Pagination State ──────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // ─── Selection State ───────────────────────────────────────────────────────
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
    if (isResizingRef.current) return;
    const isMultiSort = event.shiftKey || event.metaKey || event.ctrlKey;

    setSortConfig((prevSort) => {
      const existingIndex = prevSort.findIndex((s) => s.key === columnKey);

      if (isMultiSort) {
        if (existingIndex > -1) {
          const current = prevSort[existingIndex];
          if (current.direction === 'asc') {
            const updated = [...prevSort];
            updated[existingIndex] = { key: columnKey, direction: 'desc' };
            return updated;
          } else {
            return prevSort.filter((s) => s.key !== columnKey);
          }
        } else {
          return [...prevSort, { key: columnKey, direction: 'asc' }];
        }
      } else {
        if (existingIndex > -1) {
          const current = prevSort[existingIndex];
          if (current.direction === 'asc') {
            return [{ key: columnKey, direction: 'desc' }];
          } else {
            return [];
          }
        } else {
          return [{ key: columnKey, direction: 'asc' }];
        }
      }
    });
  };

  // ─── Filtering Logic ───────────────────────────────────────────────────────
  const activeColumns = useMemo(() => {
    return columns.filter((col) => visibleColumns[col.key] !== false);
  }, [columns, visibleColumns]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // 1. Global Search
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

        if (colDef && typeof colDef.filterFn === 'function') {
          if (!colDef.filterFn(row, filterVal)) return false;
          continue;
        }

        if (cellValue === null || cellValue === undefined) return false;

        const stringCell = String(cellValue).toLowerCase();
        const stringFilter = String(filterVal).toLowerCase();

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

        if (colDef && typeof colDef.sortFn === 'function') {
          const comp = colDef.sortFn(a, b, direction);
          if (comp !== 0) return comp;
          continue;
        }

        if (valA === valB) continue;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

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

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalEntries = sortedData.length;
  const isAllPages = pageSize === 'All';
  const effectivePageSize = isAllPages ? totalEntries : Number(pageSize) || 25;
  const totalPages = isAllPages ? 1 : Math.max(1, Math.ceil(totalEntries / effectivePageSize));

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

  // Selection handlers
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

  // Density CSS map (normal by default)
  const densityStyles = {
    compact: {
      cell: 'py-1 px-2.5 text-[11px] leading-tight font-sans',
      header: 'py-1.5 px-2.5 text-[11px] font-semibold',
      filterInput: 'py-0.5 px-2 text-[11px] h-6',
      rowHeight: 'h-7',
    },
    normal: {
      cell: 'py-2 px-3 text-xs leading-normal font-sans',
      header: 'py-2 px-3 text-xs font-semibold',
      filterInput: 'py-1 px-2 text-xs h-7',
      rowHeight: 'h-9',
    },
    standard: {
      cell: 'py-2 px-3 text-xs leading-normal font-sans',
      header: 'py-2 px-3 text-xs font-semibold',
      filterInput: 'py-1 px-2 text-xs h-7',
      rowHeight: 'h-9',
    },
    relaxed: {
      cell: 'py-3 px-4 text-sm leading-normal font-sans',
      header: 'py-2.5 px-4 text-sm font-semibold',
      filterInput: 'py-1.5 px-2.5 text-xs h-8',
      rowHeight: 'h-11',
    },
  }[density] || {
    cell: 'py-2 px-3 text-xs leading-normal font-sans',
    header: 'py-2 px-3 text-xs font-semibold',
    filterInput: 'py-1 px-2 text-xs h-7',
    rowHeight: 'h-9',
  };

  // ─── Render Element Helper ─────────────────────────────────────────────────
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
              className="w-full pl-8 pr-7 py-2 text-xs rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 "
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
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/70 font-medium ">
              <HugeiconsIcon icon={FilterIcon} size={11} />
              <span>{activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}</span>
            </span>
            <Button
              variant="outline"
            size="sm"
              type="button"
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:underline cursor-pointer text-[11px]"
            >
              Reset all
            </Button>
          </div>
        ) : null;

      case 'filterToggle':
        return (
          <Button
              variant="outline"
            size="sm"
            key="filterToggle"
            type="button"
            title="Toggle column filter inputs"
            onClick={() => setShowColumnFilters((prev) => !prev)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border font-medium transition-colors cursor-pointer  ${showColumnFilters
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/70'
              : 'bg-white text-slate-700 border-slate-200/70 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700/70'
              }`}
          >
            <HugeiconsIcon icon={FilterIcon} size={13} />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        );

      case 'densitySelector':
        return (
          <div key="densitySelector" className="inline-flex rounded border border-slate-200/70 dark:border-slate-700/70 p-0.5 bg-white dark:bg-slate-900 text-[11px] ">
            <Button
              variant="outline"
            size="sm"
              type="button"
              title="Compact Rows"
              onClick={() => setDensity('compact')}
              className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${density === 'compact'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Compact
            </Button>
            <Button
              variant="outline"
            size="sm"
              type="button"
              title="Normal Default Rows"
              onClick={() => setDensity('normal')}
              className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${density === 'normal' || density === 'standard'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Normal
            </Button>
            <Button
              variant="outline"
            size="sm"
              type="button"
              title="Cozy Rows"
              onClick={() => setDensity('relaxed')}
              className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${density === 'relaxed'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              Cozy
            </Button>
          </div>
        );

      case 'columnVisibility':
        return (
          <div key="columnVisibility" className="relative" ref={colMenuRef}>
            <Button
              type="button"
              title="Select columns to show or hide"
              onClick={() => setIsColMenuOpen((prev) => !prev)}
               variant="outline"
            size="sm"
            >
              <HugeiconsIcon icon={ViewIcon} size={13} />
              <span className="hidden sm:inline">Columns</span>
            </Button>

            {isColMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 rounded p-2 z-50 animate-in fade-in-0 zoom-in-95 ">
                <div className="text-[11px] font-bold text-slate-500 uppercase px-2 py-1 border-b border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
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
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[col.key] !== false}
                        onChange={(e) =>
                          setVisibleColumns({ ...visibleColumns, [col.key]: e.target.checked })
                        }
                        className="rounded border-slate-300 text-emerald-600 focus:ring-0 focus:ring-offset-0 "
                      />
                      <span className="truncate">{col.title || (typeof col.header === 'string' ? col.header : col.key)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'exportButton':
        return (
          <Button
            key="exportButton"
            type="button"
            title="Export filtered table data to CSV"
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            >
            <HugeiconsIcon icon={Download01Icon} size={13} />
            <span className="hidden sm:inline">Export</span>
          </Button>
        );

      case 'paginationInfo': {
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
      }

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
              className="py-0.5 px-2 text-xs font-medium rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 cursor-pointer "
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
              className="w-12 py-0.5 px-1.5 text-center text-xs rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-600 "
            />
          </form>
        ) : null;

      case 'paginationControls':
        return !isAllPages && totalPages > 1 ? (
          <div key="paginationControls" className="inline-flex items-center gap-1">
            <button
              type="button"
              title="First Page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="p-1 rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer "
            >
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} size={14} />
            </button>
            <button
              type="button"
              title="Previous Page"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer "
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            </button>

            <span className="px-2 text-xs font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              title="Next Page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer "
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </button>
            <button
              type="button"
              title="Last Page"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1 rounded border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer "
            >
              <HugeiconsIcon icon={ArrowRightDoubleIcon} size={14} />
            </button>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Determine sticky column positions & thin 1px border separation
  const getStickyClasses = (colIndex, isHeader = false) => {
    const isFirst = stickyFirstColumn && colIndex === 0;
    const isLast = stickyLastColumn && colIndex === activeColumns.length - 1;

    let classes = '';

    if (isFirst) {
      classes += ' sticky left-0 z-10 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60  ';
      if (isHeader) classes += ' !z-30 ';
    }
    if (isLast) {
      classes += ' sticky right-0 z-10 bg-white dark:bg-slate-900 border-l border-slate-200/60 dark:border-slate-800/60  ';
      if (isHeader) classes += ' !z-30 ';
    }

    return classes;
  };

  return (
    <div className={`w-full flex flex-col font-sans bg-white dark:bg-slate-900 overflow-hidden ${className}`}>
      {/* ─── Top Placement Toolbar (Clean White Background) ─────────────── */}
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
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-2.5 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60 ">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[200px]">
            {layout.topStart?.map(renderPlacementElement)}
            {topToolbarContent}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {layout.topEnd?.map(renderPlacementElement)}
          </div>
        </div>
      )}

      {/* ─── Table Viewport (Clean White Background) ────────────────────── */}
      <div
        className="relative w-full overflow-x-auto overflow-y-auto no-scrollbar scroll-smooth bg-white dark:bg-slate-900 "
        style={{ maxHeight }}
      >
        <table
          style={{ tableLayout: 'fixed', minWidth: '100%' }}
          className={`w-full border-collapse text-left bg-white dark:bg-slate-900  ${tableClassName}`}
        >
          {/* ── Table Header (Fixed Sticky on vertical scroll) ── */}
          <thead className={stickyHeader ? 'sticky top-0 z-20 bg-white dark:bg-slate-900 ' : 'bg-white dark:bg-slate-900 '}>
            {/* Header Titles Row (Subtle thin border, Zero Shadows) */}
            <tr className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-200 select-none ">
              {/* Optional Selection Checkbox Column */}
              {selectable && (
                <th
                  className={`w-9 text-center border-r border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900  ${densityStyles.header} ${stickyFirstColumn ? 'sticky left-0 z-30' : ''
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      pagedData.length > 0 &&
                      pagedData.every((r) => activeSelectedKeys.includes(r[rowKey]))
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer "
                  />
                </th>
              )}

              {activeColumns.map((col, idx) => {
                const sortEntry = sortConfig.find((s) => s.key === col.key);
                const sortOrder = sortConfig.findIndex((s) => s.key === col.key);
                const isSorted = !!sortEntry;
                const canSort = col.sortable !== false;
                const stickyClass = getStickyClasses(idx, true);
                const currentWidth = columnWidths[col.key] || parseWidth(col.width || col.minWidth, 150);

                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{
                      width: `${currentWidth}px`,
                      minWidth: `${col.minWidth ? parseWidth(col.minWidth, 40) : 40}px`,
                      maxWidth: col.maxWidth ? `${parseWidth(col.maxWidth, 1200)}px` : undefined,
                    }}
                    onClick={(e) => canSort && handleSort(col.key, e)}
                    title={
                      canSort
                        ? 'Click to sort. Hold Shift + Click to multi-column sort'
                        : undefined
                    }
                    className={`relative border-r border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 tracking-tight whitespace-nowrap transition-colors  ${canSort ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60' : ''
                      } ${densityStyles.header} ${stickyClass} ${col.headerClassName || ''}`}
                  >
                    <div className="flex items-center justify-between gap-1.5 pr-1">
                      <span className="truncate">{col.header !== undefined ? col.header : (col.title || col.key)}</span>

                      {/* Sort Indicator & Multi-Sort Badge */}
                      {canSort && (
                        <div className="flex items-center gap-0.5 shrink-0 text-slate-400 dark:text-slate-500">
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
                            <span className="opacity-30 hover:opacity-100 transition-opacity text-[10px] leading-none">
                              ⇅
                            </span>
                          )}

                          {/* Multi-column sort priority badge (1, 2, 3...) */}
                          {sortConfig.length > 1 && isSorted && (
                            <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white ">
                              {sortOrder + 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Spreadsheet Column Resize Handle (Drag expand / contract) */}
                    {col.resizable !== false && (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        onMouseDown={(e) => handleResizeStart(e, col.key)}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          const defaultW = parseWidth(col.width || col.minWidth, 150);
                          setColumnWidths((prev) => ({ ...prev, [col.key]: defaultW }));
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-0 bottom-0 w-2.5 cursor-col-resize select-none group/resizer hover:bg-emerald-500/25 active:bg-emerald-500 z-10 flex items-center justify-center transition-colors "
                        title="Drag to resize column (Double-click to reset)"
                      >
                        <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-slate-700 group-hover/resizer:bg-emerald-600 transition-colors" />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>

            {/* ── Per-Column Filters Row (Fixed with header, Clean White BG) ── */}
            {showColumnFilters && (
              <tr className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60 ">
                {selectable && (
                  <th
                    className={`border-r border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900  ${stickyFirstColumn ? 'sticky left-0 z-30' : ''
                      }`}
                  />
                )}

                {activeColumns.map((col, idx) => {
                  const filterValue = columnFilters[col.key] || '';
                  const stickyClass = getStickyClasses(idx, true);
                  const isFiltered = !!filterValue && filterValue !== 'all';
                  const currentWidth = columnWidths[col.key] || parseWidth(col.width || col.minWidth, 150);

                  return (
                    <th
                      key={`filter-${col.key}`}
                      style={{
                        width: `${currentWidth}px`,
                        minWidth: `${col.minWidth ? parseWidth(col.minWidth, 40) : 40}px`,
                      }}
                      className={`p-1 border-r border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 font-normal  ${stickyClass}`}
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
                              className={`w-full rounded border font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer  ${densityStyles.filterInput
                                } ${isFiltered
                                  ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                                  : 'border-slate-200/70 dark:border-slate-700/70'
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
                              placeholder={col.filterPlaceholder || `Filter ${typeof col.title === 'string' ? col.title : (typeof col.header === 'string' ? col.header : '')}...`}
                              value={filterValue}
                              onChange={(e) => {
                                setColumnFilters({
                                  ...columnFilters,
                                  [col.key]: e.target.value,
                                });
                                setCurrentPage(1);
                              }}
                              className={`w-full rounded border font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 pr-5  ${densityStyles.filterInput
                                } ${isFiltered
                                  ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                                  : 'border-slate-200/70 dark:border-slate-700/70'
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
                                className="absolute right-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs "
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

          {/* ── Table Body (Pure White Background, Very Thin Borders & Zero Shadows) ── */}
          <tbody className="bg-white dark:bg-slate-900 ">
            {loading ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs bg-white dark:bg-slate-900 "
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                    <span>Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeColumns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs bg-white dark:bg-slate-900 "
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

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                    className={`border-b border-slate-200/60 dark:border-slate-800/60 transition-colors bg-white dark:bg-slate-900  ${densityStyles.rowHeight
                      } ${isSelected
                        ? '!bg-emerald-50/60 dark:!bg-emerald-950/30'
                        : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                      } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {/* Selection Checkbox */}
                    {selectable && (
                      <td
                        className={`text-center border-r border-slate-200/60 dark:border-slate-800/60  ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-white dark:bg-slate-900'
                          } ${stickyFirstColumn ? 'sticky left-0 z-10' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(rowId);
                          }}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer "
                        />
                      </td>
                    )}

                    {/* Columns Cells */}
                    {activeColumns.map((col, colIdx) => {
                      const stickyClass = getStickyClasses(colIdx, false);
                      const rawValue = row[col.key];
                      const currentWidth = columnWidths[col.key] || parseWidth(col.width || col.minWidth, 150);

                      let cellContent = null;
                      if (col.render) {
                        try {
                          cellContent = col.render(rawValue, row, rowIndex);
                        } catch (err) {
                          if (rawValue === undefined && row) {
                            try {
                              cellContent = col.render(row, rowIndex);
                            } catch {
                              cellContent = '—';
                            }
                          } else {
                            cellContent = '—';
                          }
                        }
                      }

                      return (
                        <td
                          key={col.key}
                          style={{
                            width: `${currentWidth}px`,
                            minWidth: `${col.minWidth ? parseWidth(col.minWidth, 40) : 40}px`,
                            maxWidth: col.maxWidth ? `${parseWidth(col.maxWidth, 1200)}px` : undefined,
                          }}
                          className={`border-r border-slate-200/60 dark:border-slate-800/60 truncate  ${isSelected ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-white dark:bg-slate-900'
                            } ${densityStyles.cell} ${stickyClass} ${col.className || ''}`}
                        >
                          {col.render ? (
                            cellContent
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

      {/* ─── Bottom Placement Toolbar (Clean White Background) ───────────── */}
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
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 sm:p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 ">
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
