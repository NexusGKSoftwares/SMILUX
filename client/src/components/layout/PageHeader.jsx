import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Idea01Icon,
  MoreHorizontalIcon,
  PlusSignIcon,
  Upload01Icon,
} from '@hugeicons/core-free-icons';

/**
 * Enterprise PageHeader Component
 *
 * Layout composition:
 * [ Page Title ]  [ 💡 Learn ]  --------  [ ... ]  [ + Add Button ]
 *
 * @param {string|React.ReactNode} title - Title of the page (e.g. "Contacts")
 * @param {string|number|React.ReactNode} badge - Optional badge next to title (e.g. count)
 * @param {boolean} showLearn - Whether to show the "Learn" pill button (default: true)
 * @param {string} learnLabel - Label for the learn button (default: "Learn")
 * @param {Function} onLearn - Click handler for the learn button
 * @param {string} learnTooltip - Tooltip for the learn button
 * @param {Function} onAdd - Shorthand click handler for the addition button
 * @param {string} addLabel - Shorthand label for addition button (defaults to "Add {title}" or "Add")
 * @param {Object|React.ReactNode} primaryAction - Full configuration or custom node for the addition button
 * @param {Array<Object>|React.ReactNode} moreActions - Items for the three-dots dropdown menu
 * @param {Array<Object>} tabs - Optional tabs below header (e.g. All, Users, etc.)
 * @param {string} activeTab - Currently active tab id
 * @param {Function} onTabChange - Callback when a tab is selected
 * @param {React.ReactNode} children - Additional content below header (e.g. search, filters)
 * @param {string} className - Additional CSS classes
 */
export default function PageHeader({
  title = 'Contacts',
  badge = null,
  showLearn = true,
  learnLabel = 'Learn',
  onLearn,
  learnTooltip = 'Learn more about this page',
  onAdd,
  addLabel,
  primaryAction,
  moreActions,
  tabs = null,
  activeTab = null,
  onTabChange,
  children,
  className = '',
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
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
  }, [isMenuOpen]);

  // Default more actions matching the design if none provided
  const resolvedMoreActions =
    moreActions !== undefined
      ? moreActions
      : [
          {
            id: 'import',
            label: `Import ${typeof title === 'string' ? title : 'Data'}`,
            icon: Upload01Icon,
            iconPosition: 'right',
            onClick: () => {
              // placeholder handler
            },
          },
          {
            id: 'add-multiple',
            label: `Add Multiple ${typeof title === 'string' ? title : 'Items'}`,
            onClick: () => {},
          },
          {
            id: 'manage-roles',
            label: 'Manage User Roles',
            onClick: () => {},
          },
        ];

  // Resolve addition button configuration
  const defaultAddLabel = addLabel || (typeof title === 'string' ? `Add ${title.replace(/s$/, '')}` : 'Add');

  const resolvedPrimaryAction = primaryAction || {
    label: defaultAddLabel,
    onClick: onAdd,
  };

  return (
    <header className={`w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 ${className}`}>
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 sm:px-6">
        {/* Left Side: Page Name & Learn Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                {badge}
              </span>
            )}
          </div>

          {/* Learn Pill Button */}
          {showLearn && (
            <button
              type="button"
              onClick={onLearn}
              title={learnTooltip}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200/80 dark:hover:bg-slate-700 active:bg-gray-200 transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <HugeiconsIcon
                icon={Idea01Icon}
                size={14}
                className="text-amber-500 dark:text-amber-400 stroke-[2.2]"
              />
              <span>{learnLabel}</span>
            </button>
          )}
        </div>

        {/* Right Side: Three Dots & Addition Button */}
        <div className="flex items-center gap-2.5">
          {/* Three Dots Button & Dropdown */}
          {resolvedMoreActions && (
            <div className="relative">
              <button
                ref={buttonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="More actions"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`flex items-center justify-center h-9 w-9 rounded-lg border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                  isMenuOpen
                    ? 'border-gray-300 bg-gray-100 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                    : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white shadow-2xs'
                }`}
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} size={18} strokeWidth={2.2} />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 top-full mt-1.5 min-w-[210px] w-max bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg dark:shadow-2xl py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
                >
                  {Array.isArray(resolvedMoreActions) ? (
                    resolvedMoreActions.map((action, index) => {
                      if (action.divider) {
                        return (
                          <div
                            key={action.id || `divider-${index}`}
                            className="my-1 border-t border-gray-100 dark:border-slate-800"
                          />
                        );
                      }

                      const IconComponent = action.icon;
                      const iconPos = action.iconPosition || 'left';

                      return (
                        <button
                          key={action.id || action.label || index}
                          type="button"
                          role="menuitem"
                          disabled={action.disabled}
                          onClick={(e) => {
                            setIsMenuOpen(false);
                            if (action.onClick) action.onClick(e);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-left transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${
                            action.danger
                              ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {IconComponent && iconPos === 'left' && (
                              <HugeiconsIcon
                                icon={IconComponent}
                                size={16}
                                className="text-gray-500 dark:text-slate-400 shrink-0"
                              />
                            )}
                            <span className="font-normal">{action.label}</span>
                          </span>

                          {IconComponent && iconPos === 'right' && (
                            <HugeiconsIcon
                              icon={IconComponent}
                              size={16}
                              className="text-gray-500 dark:text-slate-400 shrink-0"
                            />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    resolvedMoreActions
                  )}
                </div>
              )}
            </div>
          )}

          {/* Addition (Primary) Button */}
          {React.isValidElement(resolvedPrimaryAction) ? (
            resolvedPrimaryAction
          ) : resolvedPrimaryAction ? (
            <button
              type="button"
              disabled={resolvedPrimaryAction.disabled || resolvedPrimaryAction.loading}
              onClick={resolvedPrimaryAction.onClick}
              className={
                resolvedPrimaryAction.className ||
                'inline-flex items-center justify-center gap-1.5 h-9 px-3.5 py-2 text-sm font-medium rounded-lg text-white bg-[#057a55] hover:bg-[#046c4b] active:bg-[#03543a] shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
              }
            >
              <HugeiconsIcon
                icon={resolvedPrimaryAction.icon || PlusSignIcon}
                size={16}
                strokeWidth={2.4}
                className="shrink-0"
              />
              <span>{resolvedPrimaryAction.label || defaultAddLabel}</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Optional Tabs Row (e.g. All, Users, No User Access, Archived) */}
      {tabs && tabs.length > 0 && (
        <div className="flex items-center gap-6 px-4 sm:px-6 border-t border-gray-100 dark:border-slate-800/80 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer select-none flex items-center gap-1.5 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-normal ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Optional Children Slot (e.g. Filter row, search bar) */}
      {children && <div className="px-4 sm:px-6 pb-4 pt-1">{children}</div>}
    </header>
  );
}
