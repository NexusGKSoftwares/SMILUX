import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  UnfoldMoreIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from '../UI/tableIcons.jsx';
import Button from '../UI/Button.jsx';
import {
  DashboardIcon,
  PatientsIcon,
  AppointmentsIcon,
  CalendarIcon,
  ClinicalRecordsIcon,
  DentalChartingIcon,
  TreatmentPlansIcon,
  TreatmentsProceduresIcon,
  InvoicesIcon,
  PaymentsIcon,
  MPesaIcon,
  InsuranceShaIcon,
  ExpensesIcon,
  InventoryIcon,
  SuppliersIcon,
  PurchaseOrdersIcon,
  StaffIcon,
  DentistsIcon,
  BranchesIcon,
  ReportsAnalyticsIcon,
  NotificationsIcon,
  MessagesRemindersIcon,
  SupportIcon,
  SubscriptionBillingIcon,
  ClinicSettingsIcon,
  RolesPermissionsIcon,
} from './sidebarIcons.jsx';

const NAV_GROUPS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    ],
  },
  {
    title: 'CLINIC OPERATIONS',
    items: [
      { label: 'Patients', path: '/patients', icon: PatientsIcon, badge: '128' },
      { label: 'Appointments', path: '/appointments', icon: AppointmentsIcon, badge: '5 Today' },
      { label: 'Clinical Records', path: '/clinical-records', icon: ClinicalRecordsIcon },
      { label: 'Dental Charting', path: '/charting', icon: DentalChartingIcon, isNew: true },
      { label: 'Treatment Plans', path: '/treatment-plans', icon: TreatmentPlansIcon },
      { label: 'Treatments & Procedures', path: '/treatments', icon: TreatmentsProceduresIcon },
    ],
  },
  {
    title: 'FINANCIAL MANAGEMENT',
    items: [
      { label: 'Invoices', path: '/invoices', icon: InvoicesIcon },
      { label: 'Payments', path: '/payments', icon: PaymentsIcon },
      { label: 'Insurance & SHA', path: '/insurance', icon: InsuranceShaIcon },
      { label: 'Expenses', path: '/expenses', icon: ExpensesIcon },
    ],
  },
  {
    title: 'INVENTORY & RESOURCES',
    items: [
      { label: 'Inventory', path: '/inventory', icon: InventoryIcon },
      { label: 'Suppliers', path: '/suppliers', icon: SuppliersIcon },
      { label: 'Purchase Orders', path: '/purchase-orders', icon: PurchaseOrdersIcon },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Staff', path: '/staff', icon: StaffIcon },
      { label: 'Dentists', path: '/dentists', icon: DentistsIcon },
      { label: 'Branches', path: '/branches', icon: BranchesIcon },
      { label: 'Reports & Analytics', path: '/reports', icon: ReportsAnalyticsIcon },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { label: 'Messages & Reminders', path: '/messages', icon: MessagesRemindersIcon },
    ],
  },
];

export default function Sidebar({
  isMobileOpen = false,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile,
  onOpenHelp,
  onLogout,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [clinicMenuOpen, setClinicMenuOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [onboardingProgress, setOnboardingProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('smilux_onboarding_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const done = Object.values(parsed).filter(Boolean).length;
        return { completed: done, total: 8 };
      }
    } catch { /* ignore parse errors */ }
    return { completed: 1, total: 8 };
  });
  const clinicMenuRef = useRef(null);

  useEffect(() => {
    const syncProgress = () => {
      try {
        const saved = localStorage.getItem('smilux_onboarding_tasks');
        if (saved) {
          const parsed = JSON.parse(saved);
          const done = Object.values(parsed).filter(Boolean).length;
          setOnboardingProgress({ completed: done, total: 8 });
          return;
        }
      } catch { /* ignore parse errors */ }
      setOnboardingProgress({ completed: 1, total: 8 });
    };

    window.addEventListener('smilux_onboarding_updated', syncProgress);
    window.addEventListener('storage', syncProgress);
    return () => {
      window.removeEventListener('smilux_onboarding_updated', syncProgress);
      window.removeEventListener('storage', syncProgress);
    };
  }, []);

  useEffect(() => {
    setActiveTooltip(null);
  }, [isCollapsed]);

  const handleMouseEnter = (text, badge = null) => (e) => {
    if (!isCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      text,
      badge,
      top: rect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  useEffect(() => {
    if (clinicMenuOpen) {
      const handleClickOutside = (e) => {
        if (clinicMenuRef.current && !clinicMenuRef.current.contains(e.target)) {
          setClinicMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [clinicMenuOpen]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const sidebarContent = (
    <aside
      className={`
        flex h-full flex-col border-r border-slate-200 bg-white font-sans text-slate-800 shrink-0 transition-all duration-300 ease-in-out 
        ${isCollapsed ? 'w-[68px]' : 'w-[264px]'}
      `.trim()}
    >
      {/* Clinic Workspace Selector Header */}
      <div
        className={`relative flex h-14 shrink-0 items-center border-b border-slate-100 ${isCollapsed ? 'justify-center px-1' : 'justify-between px-3'}`}
        ref={clinicMenuRef}
      >
        {!isCollapsed ? (
          <>
            <button
              type="button"
              onClick={() => setClinicMenuOpen((prev) => !prev)}
              className="flex flex-1 items-center justify-between gap-2 rounded border border-slate-200 bg-slate-50/80 p-1.5 text-left hover:bg-slate-100/80 transition-colors cursor-pointer min-w-0"
              title="Switch Clinic Workspace"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-brand-green text-white text-xs font-bold  ">
                  AD
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                    Avicena Dental
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium truncate">
                    Nairobi Main
                  </span>
                </div>
              </div>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                size={16}
                className={`text-slate-400 shrink-0 transition-transform ${clinicMenuOpen ? 'rotate-180 text-brand-600' : ''}`}
              />
            </button>

            {/* Desktop Collapse Button */}
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="hidden lg:flex ml-1.5 rounded p-1.5 h-auto text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                title="Collapse Sidebar (264px → 68px)"
              >
                <PanelLeftCloseIcon className="h-4 w-4 text-slate-500" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center ">
            <Button
              variant="ghost"
              onClick={onToggleCollapse}
              onMouseEnter={handleMouseEnter('Expand Workspace')}
              onMouseLeave={handleMouseLeave}
              className="flex h-9 w-9 items-center justify-center rounded bg-brand-green text-white text-xs font-extrabold   hover:scale-105 transition-transform cursor-pointer p-0"
              aria-label="Expand Workspace"
            >
              AD
            </Button>
          </div>
        )}

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobile}
            className="ml-1.5 rounded p-1 h-auto text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer shrink-0"
            aria-label="Close Sidebar"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </Button>
        )}

        {/* Clinic Dropdown Popover */}
        {clinicMenuOpen && !isCollapsed && (
          <div className="absolute left-3 right-3 top-[60px] z-50 rounded border border-slate-200 bg-white p-2     animate-in fade-in zoom-in-95 duration-100 font-sans">
            <div className="px-1.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Workspace
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-brand-50 text-xs font-bold text-brand-900 border border-brand-200/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-green text-white text-[10px] font-bold">
                  AD
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate">Avicena Dental Practice</span>
                  <span className="text-[10px] font-medium text-brand-700 truncate">Nairobi Main Clinic</span>
                </div>
              </div>
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-brand-600 shrink-0 ml-1" />
            </div>

            <div className="my-1.5 border-t border-slate-100" />

            <div className="px-1.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Other Branches
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                alert("Switching to Westlands Branch...");
                setClinicMenuOpen(false);
              }}
              className="flex w-full items-center justify-between p-2 h-auto rounded hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                  WB
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate font-semibold text-slate-800">Avicena Dental</span>
                  <span className="text-[10px] text-slate-500 truncate">Westlands Branch</span>
                </div>
              </div>
            </Button>

            <div className="my-1 border-t border-slate-100" />

            <Button
              variant="ghost"
              onClick={() => {
                alert("Opening Add Clinic Branch wizard...");
                setClinicMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 p-2 h-auto rounded text-brand-600 hover:bg-brand-50 text-xs font-bold transition-colors cursor-pointer text-left"
            >
              <span>+ Add Branch / Workspace</span>
            </Button>
          </div>
        )}
      </div>

      {/* Navigation Links Grouped */}
      <nav
        onScroll={handleMouseLeave}
        className={`flex-1 overflow-y-auto py-2 sidebar-scrollbar ${isCollapsed ? 'px-1' : 'px-3'}`}
      >
        {/* Get Started Button */}
        {!isCollapsed ? (
          <a
            href="/getting_started"
            data-testid="left_nav_getting_started_link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/getting_started');
              if (isMobileOpen && onCloseMobile) onCloseMobile();
            }}
            className="group flex items-center justify-between h-[34px] px-3.5 mb-2 rounded-full border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-slate-800   transition-all cursor-pointer select-none"
          >
            <span className="text-[13px] font-semibold text-slate-800 group-hover:text-slate-900 tracking-tight">
              Get Started
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-700" data-testid="fraction_complete">
                {onboardingProgress.completed}/{onboardingProgress.total}
              </span>
              <svg
                className="w-4 h-4 -rotate-90 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#e2e8f0"
                  strokeWidth="2.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#2ec4b6"
                  strokeWidth="2.5"
                  strokeDasharray="56.5487"
                  strokeDashoffset={(56.5487 * (1 - onboardingProgress.completed / onboardingProgress.total)).toFixed(4)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </a>
        ) : (
          <div className="flex justify-center mb-2">
            <a
              href="/getting_started"
              data-testid="left_nav_getting_started_link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/getting_started');
              }}
              onMouseEnter={handleMouseEnter('Get Started', `${onboardingProgress.completed}/${onboardingProgress.total}`)}
              onMouseLeave={handleMouseLeave}
              aria-label={`Get Started (${onboardingProgress.completed}/${onboardingProgress.total} complete)`}
              className="group flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-600 hover:text-brand-green   transition-all cursor-pointer select-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="opacity-100 spark-icon text-slate-600 group-hover:text-brand-green transition-colors shrink-0"
                data-iname="rocket-fill"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m11.1 16.514-3.619-3.618-3.354-.908c-.633-.17-1.153-.773-1.089-1.531.146-1.709 1.08-3.585 2.688-4.777 1.548-1.148 3.654-1.613 6.113-.802a13.5 13.5 0 0 1 3.698-1.756c1.48-.443 3.14-.642 4.472-.172.49.174.877.559 1.051 1.05.466 1.321.275 2.982-.168 4.467-.395 1.327-1.034 2.661-1.798 3.725.817 2.784.287 4.927-.966 6.419-1.275 1.518-3.17 2.204-4.64 2.323-.762.061-1.365-.465-1.53-1.106zm6.334-2.563c-1.38 1.27-2.53 2.013-3.42 2.447a8 8 0 0 1-.791.337l.555 2.146c.977-.176 2.082-.68 2.819-1.557.609-.725 1.045-1.798.837-3.373M9.945 6.497c-1.262-.133-2.268.226-3.028.79-.981.728-1.612 1.844-1.822 2.891l2.182.59a10 10 0 0 1 .458-1.138 11.8 11.8 0 0 1 2.21-3.133M13 9.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"
                />
                <path d="m5.414 15-.707.707a1 1 0 0 1-1.414-1.414L4 13.586A1 1 0 0 1 5.414 15m4.293 5.707.707-.707A1 1 0 0 0 9 18.586l-.707.707a1 1 0 1 0 1.414 1.414m-1.5-3.5a1 1 0 1 0-1.414-1.414l-3.5 3.5a1 1 0 1 0 1.414 1.414z" />
              </svg>
            </a>
          </div>
        )}
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!isCollapsed ? (
              <h3 className="px-2 text-[10px] font-bold   text-slate-400 uppercase">
                {group.title}
              </h3>
            ) : (
              <div className=" border-t border-slate-100" title={group.title} />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      aria-label={item.label}
                      onMouseEnter={handleMouseEnter(item.label, item.badge || (item.isNew ? 'New' : null))}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => isMobileOpen && onCloseMobile?.()}
                      className={`
                        group flex items-center rounded text-xs font-bold transition-all
                        ${isCollapsed ? 'justify-center px-1 py-1' : 'justify-between px-3 py-1.5'}
                        ${isActive
                          ? 'bg-sky-100 text-sky-700 font-bold  '
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                        }
                      `.trim()}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <IconComponent
                          className={`w-[20px] h-[20px] shrink-0 transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'
                            }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <>
                          {item.isNew && (
                            <span className="rounded bg-brand-pink/10 px-1.5 py-0.5 text-[9px] font-extrabold text-brand-pink uppercase tracking-wide">
                              New
                            </span>
                          )}

                          {item.badge && !item.isNew && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${isActive ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                                }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {isCollapsed && (item.badge || item.isNew) && (
                        <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brand-pink" />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Fixed bottom controls */}
      <div className={`shrink-0 border-t border-slate-200 ${isCollapsed ? 'p-1.5 space-y-1' : 'p-2 space-y-1'}`}>
        {/* Clinic Settings */}
        <button
          type="button"
          onClick={() => navigate('/settings')}
          onMouseEnter={handleMouseEnter('Clinic Settings')}
          onMouseLeave={handleMouseLeave}
          aria-label="Clinic Settings"
          className={`
            group w-full flex items-center rounded text-xs font-semibold transition-all cursor-pointer h-auto
            ${isCollapsed ? 'justify-center p-2' : 'gap-2 px-2 py-1.5'}
            ${location.pathname === '/settings'
              ? 'bg-sky-50 text-sky-700 font-bold  '
              : 'text-slate-700 hover:bg-slate-100/90 hover:text-slate-900'
            }
          `.trim()}
        >
          <ClinicSettingsIcon
            className={`w-[20px] h-[20px] shrink-0 transition-colors ${location.pathname === '/settings' ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`}
          />
          {!isCollapsed && <span>Clinic Settings</span>}
        </button>

        {/* Help & Support */}
        <button
          type="button"
          onClick={() => {
            if (isMobileOpen && onCloseMobile) onCloseMobile();
            if (onOpenHelp) onOpenHelp();
            else window.location.href = 'mailto:support@smilux.co.ke';
          }}
          onMouseEnter={handleMouseEnter('Help & Support')}
          onMouseLeave={handleMouseLeave}
          aria-label="Help & Support Center"
          className={`
            w-full flex items-center rounded text-xs font-semibold text-slate-700 hover:bg-slate-100/90 hover:text-slate-900 transition-all cursor-pointer h-auto
            ${isCollapsed ? 'justify-center p-2' : 'gap-2 px-2 py-1.5'}
          `.trim()}
        >
          <SupportIcon className="w-[18px] h-[18px] text-slate-400 shrink-0" />
          {!isCollapsed && <span>Help &amp; Support</span>}
        </button>
      </div>

      {/* User Footer Profile & Quick Expand/Collapse */}
      <div className={`shrink-0 border-t border-slate-100 ${isCollapsed ? 'p-0' : 'p-0'}`}>
        {isCollapsed && (
          <div className="flex flex-col items-center gap-2 py-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              onMouseEnter={handleMouseEnter('Expand Sidebar')}
              onMouseLeave={handleMouseLeave}
              className="rounded p-1 h-auto text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer mt-1"
              aria-label="Expand Sidebar (68px → 264px)"
            >
              <PanelLeftOpenIcon className="h-4 w-4 text-slate-500" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (264px <-> 68px width) */}
      <div
        className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[68px]' : 'w-[264px]'}`}
      >
        {sidebarContent}
      </div>

      {/* Floating Tooltip for Collapsed Sidebar */}
      {isCollapsed && activeTooltip && (
        <div
          className="fixed z-50 pointer-events-none -translate-y-1/2 flex items-center transition-all duration-150 animate-in fade-in zoom-in-95"
          style={{ left: 74, top: activeTooltip.top }}
        >
          <div className="relative flex items-center gap-1.5 rounded bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white   shadow-slate-900/25 whitespace-nowrap">
            {/* Arrow pointing to icon */}
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-slate-900" />
            <span>{activeTooltip.text}</span>
            {activeTooltip.badge && (
              <span className="ml-0.5 rounded bg-sky-500/20 px-1.5 py-0.2 text-[10px] font-bold text-sky-300">
                {activeTooltip.badge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200 ease-out"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-[264px] max-w-full animate-drawer-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
