import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  UserGroupIcon,
  Doc01Icon,
  Calendar01Icon,
  Invoice01Icon,
  ShieldCheckIcon,
  Store01Icon,
  Settings01Icon,
  Logout01Icon,
  Cancel01Icon,
  UnfoldMoreIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';

const NAV_GROUPS = [
  {
    title: 'MAIN WORKSPACE',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: Home01Icon },
      { label: 'Patients & Records', path: '/patients', icon: UserGroupIcon, badge: '128' },
      { label: 'FDI Dental Charting', path: '/charting', icon: Doc01Icon, isNew: true },
      { label: 'Appointments', path: '/appointments', icon: Calendar01Icon, badge: '5 Today' },
    ],
  },
  {
    title: 'FINANCE & CLAIMS',
    items: [
      { label: 'Invoices & M-Pesa', path: '/invoices', icon: Invoice01Icon },
      { label: 'SHA & Insurance', path: '/insurance', icon: ShieldCheckIcon },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Inventory & Supplies', path: '/inventory', icon: Store01Icon },
      { label: 'Reports & Analytics', path: '/reports', icon: Doc01Icon },
      { label: 'Clinic Settings', path: '/settings', icon: Settings01Icon },
    ],
  },
];

export default function Sidebar({
  isMobileOpen = false,
  onCloseMobile,
  user = { name: 'Dr. John Doe', email: 'owner@avicena.co.ke', role: 'Lead Dentist' },
  onLogout,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [clinicMenuOpen, setClinicMenuOpen] = useState(false);
  const clinicMenuRef = useRef(null);

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
    <aside className="flex h-full w-[264px] flex-col border-r border-slate-200 bg-white font-sans text-slate-800 shrink-0">
      {/* Clinic Workspace Selector Header */}
      <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-3" ref={clinicMenuRef}>
        <button
          type="button"
          onClick={() => setClinicMenuOpen((prev) => !prev)}
          className="flex flex-1 items-center justify-between gap-2 rounded border border-slate-200 bg-slate-50/80 p-2 text-left hover:bg-slate-100/80 transition-colors cursor-pointer min-w-0"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-brand-blue text-white text-xs font-bold shadow-xs">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">
                Avicena Dental Practice
              </span>
              <span className="text-[10px] text-slate-500 font-medium truncate">
                Nairobi Main Clinic
              </span>
            </div>
          </div>
          <HugeiconsIcon
            icon={UnfoldMoreIcon}
            size={16}
            className={`text-slate-400 shrink-0 transition-transform ${clinicMenuOpen ? 'rotate-180 text-brand-600' : ''}`}
          />
        </button>

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-1.5 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer shrink-0"
            aria-label="Close Sidebar"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        )}

        {clinicMenuOpen && (
          <div className="absolute left-3 right-3 top-[60px] z-50 rounded border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-100 font-sans">
            <div className="px-1.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Current Workspace
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-brand-50 text-xs font-bold text-brand-900 border border-brand-200/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-blue text-white text-[10px] font-bold">
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
            <button
              type="button"
              onClick={() => {
                alert("Switching to Westlands Branch...");
                setClinicMenuOpen(false);
              }}
              className="flex w-full items-center justify-between p-2 rounded hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors cursor-pointer text-left"
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
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                alert("Opening Add Clinic Branch wizard...");
                setClinicMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 p-2 rounded text-brand-600 hover:bg-brand-50 text-xs font-bold transition-colors cursor-pointer text-left"
            >
              <span>+ Add Branch / Workspace</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links Grouped */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {group.title}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => isMobileOpen && onCloseMobile?.()}
                      className={`
                        flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-all
                        ${isActive
                          ? 'bg-brand-50 text-brand-700 font-bold border-l-3 border-brand-600'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                        }
                      `.trim()}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <HugeiconsIcon
                          icon={item.icon}
                          size={18}
                          className={isActive ? 'text-brand-600' : 'text-slate-400'}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.isNew && (
                        <span className="rounded bg-brand-pink/10 px-1.5 py-0.5 text-[9px] font-extrabold text-brand-pink uppercase tracking-wide">
                          New
                        </span>
                      )}

                      {item.badge && !item.isNew && (
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${isActive ? 'bg-brand-100 text-brand-800' : 'bg-slate-100 text-slate-600'
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Footer Profile & Quick Logout */}
      <div className="shrink-0 border-t border-slate-100 p-3 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2 p-2 rounded bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
              {user?.name?.[0] || 'D'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">
                {user?.name || 'Dr. John Doe'}
              </span>
              <span className="text-[10px] font-medium text-slate-500 truncate">
                {user?.role || 'Lead Dentist'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
            title="Log Out"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (fixed 264px width) */}
      <div className="hidden lg:block w-[264px] shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="relative z-10 w-[264px] max-w-full animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
