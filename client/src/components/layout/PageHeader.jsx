import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Idea01Icon,
  MoreHorizontalIcon,
  PlusSignIcon,
  Upload01Icon,
} from '@hugeicons/core-free-icons';
import Button from '../UI/Button';

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
 * @param {boolean} showAddTab - Whether to show the "Add Tab" button (default: true)
 * @param {string} addTabLabel - Label for the add tab button (default: "Add Tab")
 * @param {Function} onAddTab - Callback when "Add Tab" button is clicked
 * @param {Function} onTabAction - Callback when a tab's action is triggered
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
  showAddTab = true,
  addTabLabel = 'Add Tab',
  onAddTab,
  onTabAction,
  children,
  className = '',
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openTabActionId, setOpenTabActionId] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const tabMenuRef = useRef(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isMenuOpen && !openTabActionId) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      if (tabMenuRef.current && !tabMenuRef.current.contains(event.target)) {
        setOpenTabActionId(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setOpenTabActionId(null);
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
  }, [isMenuOpen, openTabActionId]);

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
          onClick: () => { },
        },
        {
          id: 'manage-roles',
          label: 'Manage User Roles',
          onClick: () => { },
        },
      ];

  // Resolve addition button configuration
  const defaultAddLabel = addLabel || (typeof title === 'string' ? `Add ${title.replace(/s$/, '')}` : 'Add');

  const resolvedPrimaryAction = primaryAction || {
    label: defaultAddLabel,
    onClick: onAdd,
  };

  return (
    <header className={`w-full bg-white dark:bg-slate-900   ${className}`}>
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between  py-2 px-2">
        {/* Left Side: Page Name & Learn Badge */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {title}
            </h1>

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
             <Button
                 variant="outline"
                 size="sm"
                ref={buttonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="More actions"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`flex items-center justify-center  rounded border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${isMenuOpen
                  ? 'border-gray-300 bg-gray-100 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white'
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white  '
                  }`}
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} size={18} strokeWidth={2.2} />
              </Button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 top-full mt-1.5 min-w-[210px] w-max bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded   dark:  py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
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
                          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-left transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${action.danger
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
            <Button
              type="button"
              size="sm"
              disabled={resolvedPrimaryAction.disabled || resolvedPrimaryAction.loading}
              onClick={resolvedPrimaryAction.onClick}
              className={
                resolvedPrimaryAction.className ||
                'inline-flex items-center justify-center gap-1.5 h-8 px-3.5 py-2 text-sm font-medium rounded text-white bg-brand-green hover:bg-brand-green-hover active:bg-[#03543a]   transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
              }
            >
              <HugeiconsIcon
                icon={resolvedPrimaryAction.icon || PlusSignIcon}
                size={16}
                strokeWidth={2.4}
                className="shrink-0"
              />
              <span>{resolvedPrimaryAction.label || defaultAddLabel}</span>
            </Button>
          ) : null}
        </div>
      </div>

      {/* Optional Tabs Row (matching Figma specs: All, Assigned, Unassigned, Archived + Add Tab) */}
      {tabs && tabs.length > 0 && (
        <div
          ref={tabMenuRef}
          className="relative w-full h-10 flex items-center pl-2 overflow-x-auto no-scrollbar bg-transparent shadow-[inset_0_-1px_0_#E7E7E7] dark:shadow-[inset_0_-1px_0_#334155] select-none"
        >
          {/* Tab List */}
          <div className="flex items-center h-10 shrink-0">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const isActionMenuOpen = openTabActionId === tab.id;

              return (
                <div
                  key={tab.id || index}
                  onClick={() => onTabChange?.(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`box-border h-10 flex items-center pl-4 pr-2 rounded-t-[8px] cursor-pointer transition-all duration-150 relative ${isActive
                    ? 'bg-white dark:bg-slate-900 shadow-[0px_8px_12px_rgba(0,0,0,0.15)] dark:shadow-[0px_8px_12px_rgba(0,0,0,0.4)] z-10'
                    : 'bg-transparent hover:bg-gray-50/70 dark:hover:bg-slate-800/40 text-[#767676] dark:text-slate-400 hover:text-[#222323] dark:hover:text-white'
                    }`}
                >
                  {/* Label */}
                  <span
                    className={`font-['Inter'] font-medium text-[14px] leading-5 whitespace-nowrap ${isActive
                      ? 'text-[#222323] dark:text-white'
                      : 'text-[#767676] dark:text-slate-400'
                      }`}
                  >
                    {tab.label}
                  </span>

                  {/* Optional Count Badge */}
                  {tab.count !== undefined && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-normal tabular-nums ${isActive
                        ? 'bg-gray-200 text-[#222323] dark:bg-slate-800 dark:text-slate-200'
                        : 'bg-gray-100 text-[#767676] dark:bg-slate-800 dark:text-slate-400'
                        }`}
                    >
                      {tab.count}
                    </span>
                  )}

                 
                </div>
              );
            })}
          </div>
 
        </div>
      )}

      {/* Optional Children Slot (e.g. Filter row, search bar) */}
      {children && <div className="px-4 sm:px-6 pb-4 pt-1">{children}</div>}
    </header>
  );
}
