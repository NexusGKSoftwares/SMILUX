import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';

/**
 * Enterprise Floating Row Action Dropdown Menu
 *
 * Uses React Portal to escape all table scroll and card overflow clipping.
 * Auto-detects screen boundaries and flips upward if near the bottom viewport.
 *
 * @param {Array<Object>} items - Dropdown items: [{ id, label, icon, onClick, danger, divider, disabled }]
 * @param {React.ReactNode} trigger - Optional custom trigger button
 * @param {string} align - 'right' | 'left' (default: 'right')
 */
export default function RowActionDropdown({
  items = [],
  trigger = null,
  align = 'right',
  title = 'Actions',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, isReady: false });

  // Compute position relative to viewport
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 200;
    const menuHeight = items.length * 36 + 12;

    let top = rect.bottom + 4;
    // Flip upward if not enough space at bottom
    if (rect.bottom + menuHeight + 16 > window.innerHeight && rect.top > menuHeight) {
      top = rect.top - menuHeight - 4;
    }

    let left = align === 'right' ? rect.right - menuWidth : rect.left;
    // Keep within screen edges
    if (left < 8) left = 8;
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }

    setCoords({ top, left, isReady: true });
  }, [align, items.length]);

  // Handle outside click & escape key
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      setIsOpen(false);
    };

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updatePosition]);

  return (
    <>
      {/* Trigger Button */}
      <div className="inline-flex items-center" ref={triggerRef}>
        {trigger ? (
          React.cloneElement(trigger, {
            onClick: (e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            },
          })
        ) : (
          <button
            type="button"
            title={title}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className={`p-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
              isOpen
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} size={15} />
          </button>
        )}
      </div>

      {/* Floating Dropdown Portal Menu */}
      {isOpen &&
        coords.isReady &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: '200px',
              zIndex: 9999,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 text-xs animate-in fade-in-0 zoom-in-95 duration-100 text-left select-none"
          >
            {items.map((item, idx) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${idx}`}
                    className="my-1 border-t border-slate-100 dark:border-slate-800"
                  />
                );
              }

              const IconComponent = item.icon;

              return (
                <button
                  key={item.id || item.label || idx}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    if (item.onClick) item.onClick(e);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 transition-colors cursor-pointer text-left disabled:opacity-50 disabled:pointer-events-none ${
                    item.danger
                      ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {IconComponent && (
                    <HugeiconsIcon
                      icon={IconComponent}
                      size={14}
                      className={item.danger ? 'text-rose-600 shrink-0' : 'text-slate-400 shrink-0'}
                    />
                  )}
                  <span className="font-normal truncate">{item.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
