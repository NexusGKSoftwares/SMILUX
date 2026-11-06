import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  SearchIcon,
  ChevronDownIcon,
  CheckIcon,
  XIcon,
  SparklesIcon,
} from "./tableIcons.jsx";

/**
 * Enterprise-grade Carbon-inspired Dropdown Component.
 * Supports:
 * - Variants: 'dropdown' (single select), 'multiselect' (checkboxes & count tag), 'combobox' (live search & custom input)
 * - Styles: 'default' (label above field) | 'fluid' (label inside field)
 * - Sizes: 'xs' (24px) | 'sm' (32px) | 'md' (40px) | 'lg' (48px)
 * - Parent "Select All" checkbox for multiselect
 * - AI presence badge ('aiLabel')
 * - React Portal popover escaping table & card overflow clipping
 */
export default function Dropdown({
  variant = "dropdown", // 'dropdown' | 'multiselect' | 'combobox'
  styleType = "default", // 'default' | 'fluid'
  size = "sm", // 'xs' | 'sm' | 'md' | 'lg'
  options = [],
  value = null, // string/number for single, Array for multiselect
  onChange,
  label = null,
  helperText = null,
  placeholder = "Choose an option",
  searchPlaceholder = "Type to filter...",
  required = false,
  error = null,
  warning = null,
  disabled = false,
  readOnly = false,
  isClearable = true,
  showSelectAll = true, // for multiselect
  allowCustomValue = false, // for combobox
  aiLabel = null, // string or boolean for AI presence badge
  className = "",
  menuClassName = "",
  align = "left",
  icon = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 200 });

  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize options array
  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string" || typeof opt === "number") {
        const strVal = String(opt);
        const formattedLabel = strVal.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return { value: strVal, label: formattedLabel };
      }
      return opt;
    });
  }, [options]);

  // Filter options based on search input
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const q = searchQuery.toLowerCase();
    return normalizedOptions.filter(
      (opt) =>
        opt.label?.toLowerCase().includes(q) ||
        String(opt.value)?.toLowerCase().includes(q) ||
        opt.description?.toLowerCase().includes(q)
    );
  }, [normalizedOptions, searchQuery]);

  // Multiselect values array helper
  const selectedValues = useMemo(() => {
    if (variant === "multiselect") {
      return Array.isArray(value) ? value.map(String) : [];
    }
    return [];
  }, [variant, value]);

  // Single select selected option
  const selectedOption = useMemo(() => {
    if (variant !== "multiselect") {
      return normalizedOptions.find((opt) => String(opt.value) === String(value)) || null;
    }
    return null;
  }, [variant, normalizedOptions, value]);

  // Calculate position for React Portal popover
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, menuRef.current?.offsetWidth || 220);
    const menuHeight = menuRef.current?.offsetHeight || 260;

    let top = rect.bottom + 4;
    let isUpwards = false;

    if (rect.bottom + menuHeight + 10 > window.innerHeight && rect.top > menuHeight) {
      top = rect.top - menuHeight - 4;
      isUpwards = true;
    }

    let left = rect.left;
    if (align === "right") {
      left = rect.right - menuWidth;
    } else if (align === "center") {
      left = rect.left + rect.width / 2 - menuWidth / 2;
    }

    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    top = Math.max(8, top);

    setCoords({ top, left, width: menuWidth, isUpwards });
  }, [align]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const timer = setTimeout(() => {
        calculatePosition();
        if ((variant === "combobox" || searchQuery) && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);

      const handleScrollOrResize = () => calculatePosition();
      const handleClickOutside = (e) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target) &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setIsOpen(false);
      };

      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScrollOrResize, true);
        window.removeEventListener("resize", handleScrollOrResize);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setSearchQuery("");
    }
  }, [isOpen, calculatePosition, variant, searchQuery]);

  // Multiselect toggle option
  const handleToggleOption = (optValue) => {
    const valStr = String(optValue);
    let next;
    if (selectedValues.includes(valStr)) {
      next = selectedValues.filter((v) => v !== valStr);
    } else {
      next = [...selectedValues, valStr];
    }
    onChange?.(next);
  };

  const isAllSelected = useMemo(() => {
    if (!normalizedOptions.length) return false;
    return normalizedOptions.every((opt) => selectedValues.includes(String(opt.value)));
  }, [normalizedOptions, selectedValues]);

  const isIndeterminate = useMemo(() => {
    return selectedValues.length > 0 && !isAllSelected;
  }, [selectedValues, isAllSelected]);

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      onChange?.([]);
    } else {
      onChange?.(normalizedOptions.map((opt) => String(opt.value)));
    }
  };

  const handleSingleSelect = (optValue) => {
    onChange?.(optValue);
    setIsOpen(false);
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    onChange?.(variant === "multiselect" ? [] : "");
  };

  // Field height mapping
  const heightClasses = {
    xs: "h-6 px-2 text-xs",
    sm: "h-8 px-2.5 text-xs",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-3.5 text-sm",
  }[size] || "h-10 px-3 text-sm";

  // Item height class
  const itemHeightClass = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1.5 px-2.5 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-2.5 px-3.5 text-sm",
  }[size] || "py-2 px-3 text-sm";

  const menuContent = isOpen && (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: `${coords.width}px`,
        zIndex: 9999,
      }}
      className={`
        bg-white/95 backdrop-blur-md border border-slate-200 rounded shadow-xl shadow-slate-900/10
        flex flex-col max-h-[300px] overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans
        ${menuClassName}
      `.trim()}
    >
      {/* Combobox Search Bar */}
      {(variant === "combobox" || normalizedOptions.length > 7) && (
        <div className="p-2 border-b border-slate-100 bg-slate-50/90 sticky top-0 z-10 flex items-center gap-2">
          <SearchIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full text-xs bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            >
              <XIcon className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Multiselect Parent Checkbox (Select All) */}
      {variant === "multiselect" && showSelectAll && !searchQuery && (
        <div
          onClick={handleToggleSelectAll}
          className={`
            ${itemHeightClass} border-b border-slate-100 font-semibold text-slate-800 flex items-center justify-between
            cursor-pointer hover:bg-slate-100/80 transition-colors select-none bg-slate-50/50 font-sans
          `.trim()}
        >
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(el) => el && (el.indeterminate = isIndeterminate)}
              onChange={() => { }}
              className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600/30 cursor-pointer"
            />
            <span>({normalizedOptions.length})</span>
          </div>
          {isAllSelected && <span className="text-[11px] font-semibold text-brand-600 uppercase font-sans">Selected</span>}
        </div>
      )}

      {/* Options Menu List */}
      <div className="overflow-y-auto flex-1 py-1 no-scrollbar space-y-0.5 font-sans">
        {filteredOptions.length === 0 ? (
          allowCustomValue && searchQuery ? (
            <button
              type="button"
              onClick={() => handleSingleSelect(searchQuery)}
              className={`${itemHeightClass} w-full text-left font-medium text-brand-600 hover:bg-brand-50 flex items-center gap-2 font-sans`}
            >
              <span>Add custom: "{searchQuery}"</span>
            </button>
          ) : (
            <div className="px-3 py-4 text-center text-xs text-slate-400 font-sans">No matching options</div>
          )
        ) : (
          filteredOptions.map((opt) => {
            const optValStr = String(opt.value);
            const isSelected =
              variant === "multiselect"
                ? selectedValues.includes(optValStr)
                : String(value) === optValStr;

            return (
              <div
                key={opt.value}
                onClick={() =>
                  variant === "multiselect"
                    ? handleToggleOption(opt.value)
                    : handleSingleSelect(opt.value)
                }
                className={`
                  ${itemHeightClass} font-medium flex items-center justify-between gap-2 cursor-pointer transition-colors select-none font-sans
                  ${isSelected
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  }
                `.trim()}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {variant === "multiselect" && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => { }}
                      className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600/30 cursor-pointer"
                    />
                  )}
                  {opt.icon && (
                    <span className={`shrink-0 ${isSelected ? "text-brand-600" : "text-slate-400"}`}>
                      {opt.icon}
                    </span>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span>{opt.label}</span>
                    {opt.description && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {opt.description}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {opt.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 font-sans">
                      {opt.badge}
                    </span>
                  )}
                  {variant !== "multiselect" && isSelected && (
                    <CheckIcon className="w-4 h-4 text-brand-600 shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const hasValue = variant === "multiselect" ? selectedValues.length > 0 : value !== "" && value != null;

  return (
    <div className={`flex flex-col gap-1 w-full font-sans ${className}`}>
      {/* Default Style Label & Helper Text (Outside field) */}
      {styleType === "default" && label && (
        <div className="flex items-center justify-between gap-1 font-sans">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1 font-sans">
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {aiLabel && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 font-sans">
              <SparklesIcon className="w-3 h-3 text-purple-600" />
              {typeof aiLabel === "string" ? aiLabel : "AI Suggested"}
            </span>
          )}
        </div>
      )}

      {/* Field Input Box */}
      <div ref={triggerRef} className="relative inline-block w-full font-sans">
        <div
          onClick={() => !disabled && !readOnly && setIsOpen((prev) => !prev)}
          className={`
            w-full flex items-center justify-between gap-2 border rounded bg-white transition-all cursor-pointer select-none font-sans
            ${styleType === "fluid" ? "h-16 px-3.5 py-2.5 flex-col justify-center items-start" : `${heightClasses}`}
            ${error
              ? "border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              : warning
                ? "border-amber-300 bg-amber-50/20 text-amber-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                : "border-slate-200 hover:border-slate-300 text-slate-800 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 shadow-2xs"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-400" : ""}
          `.trim()}
        >
          {/* Fluid Style Inline Label */}
          {styleType === "fluid" && (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {label || placeholder}
                {required && <span className="text-rose-500 ml-0.5">*</span>}
              </span>
              {aiLabel && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700">
                  <SparklesIcon className="w-3 h-3 text-purple-600" />
                  AI
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between w-full min-w-0">
            <div className="flex items-center gap-2 min-w-0  ">
              {icon && <span className="text-slate-400 shrink-0">{icon}</span>}

              {/* Multiselect Tag Display */}
              {variant === "multiselect" && selectedValues.length > 0 ? (
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-brand-100 text-brand-800 shrink-0">
                    {selectedValues.length}
                  </span>
                  <span className="text-xs font-medium text-slate-800 truncate whitespace-nowrap">
                    {selectedValues
                      .map((v) => normalizedOptions.find((o) => String(o.value) === v)?.label || v)
                      .join(", ")}
                  </span>
                </div>
              ) : selectedOption ? (
                <span className={`font-medium text-slate-800 truncate whitespace-nowrap ${size === 'xs' || size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                  {selectedOption.label}
                </span>
              ) : (
                <span className={`text-slate-400 font-medium truncate whitespace-nowrap ${size === 'xs' || size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                  {placeholder}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-1">
             
              <ChevronDownIcon
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-600" : ""
                  }`}
              />
            </div>
          </div>
        </div>

        {isOpen && createPortal(menuContent, document.body)}
      </div>

      {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
