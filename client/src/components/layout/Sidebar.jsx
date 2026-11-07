import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  UserGroupIcon,
  Medical01Icon,
  Calendar01Icon,
  Invoice01Icon,
  ShieldCheckIcon,
  Store01Icon,
  BarChart01Icon,
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
      { label: 'FDI Dental Charting', path: '/charting', icon: Medical01Icon, isNew: true },
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
      { label: 'Reports & Analytics', path: '/reports', icon: BarChart01Icon },
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

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const sidebarContent = (
    <aside className="flex h-full w-[264px] flex-col border-r border-slate-200 bg-white font-sans text-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/favicon.svg"
            alt="Smilux Logo"
            className="h-8 w-8 shrink-0 object-contain drop-shadow-xs"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
              Smilux <span className="text-brand-pink">Dental</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase mt-0.5">
              Practice SaaS
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        )}
      </div>

      {/* Clinic Workspace Selector */}
      <div className="relative px-3 py-3 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setClinicMenuOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-2 text-left hover:bg-slate-100/80 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-blue text-white text-xs font-bold shadow-xs">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">
                Avicena Dental Practice
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Nairobi Main Clinic
              </span>
            </div>
          </div>
          <HugeiconsIcon icon={UnfoldMoreIcon} size={16} className="text-slate-400 shrink-0" />
        </button>

        {clinicMenuOpen && (
          <div className="absolute left-3 right-3 top-16 z-50 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between p-2 rounded bg-brand-50 text-xs font-bold text-brand-800">
              <span>Avicena Dental Practice</span>
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} className="text-brand-600" />
            </div>
            <button
              type="button"
              onClick={() => setClinicMenuOpen(false)}
              className="mt-1 w-full text-left p-2 rounded hover:bg-slate-100 text-xs text-slate-700 font-medium"
            >
              + Add Branch / Clinic Workspace
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
                        flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all
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
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200/90 shadow-2xs">
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
