import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Search01Icon,
  Notification01Icon,
  HelpCircleIcon,
  PlusSignIcon,
  ChevronDownIcon,
  Logout01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import Button from '../UI/Button.jsx';

const PAGE_TITLES = {
  '/dashboard': 'Practice Overview',
  '/patients': 'Patient Directory & Records',
  '/charting': 'FDI Dental Charting (Odontogram)',
  '/appointments': 'Appointment Calendar',
  '/invoices': 'Invoices & M-Pesa STK Push',
  '/insurance': 'Kenya SHA & Insurance Claims',
  '/inventory': 'Dental Inventory & Supplies',
  '/reports': 'Practice Reports & Analytics',
  '/settings': 'Clinic Profile & System Settings',
};

export default function Topbar({
  onOpenMobile,
  user = { name: 'Dr. John Doe', email: 'owner@avicena.co.ke' },
  onLogout,
  onQuickAction,
}) {
  const location = useLocation();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const title = PAGE_TITLES[location.pathname] || 'Smilux Dental Workspace';

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 font-sans shrink-0">
      {/* Left Column: Mobile Menu Toggle + Smilux Brand Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenMobile}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} />
        </button>

        {/* Smilux Brand Header */}
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
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <HugeiconsIcon icon={Search01Icon} size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, record, invoice, or appointment... (⌘K)"
            className="w-full rounded-md border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600/30 transition-all font-sans"
          />
        </div>
      </div>

      {/* Right Column: Actions & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Action Button */}
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onQuickAction}
          className="hidden sm:inline-flex items-center gap-1 font-semibold text-xs"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={14} />
          <span>New Patient</span>
        </Button>

        {/* Support Icon */}
        <a
          href="mailto:support@smilux.co.ke"
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-md border border-slate-200/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Contact Support"
        >
          <HugeiconsIcon icon={HelpCircleIcon} size={18} />
        </a>

        {/* Notifications Icon Button */}
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-200/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
          title="Notifications"
        >
          <HugeiconsIcon icon={Notification01Icon} size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-pink ring-2 ring-white" />
        </button>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-slate-200/90 p-1 hover:bg-slate-100/80 transition-colors cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold shrink-0">
              {user?.name?.[0] || 'D'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-800">
              {user?.name || 'Dr. John Doe'}
            </span>
            <HugeiconsIcon icon={ChevronDownIcon} size={14} className="text-slate-400" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 top-11 z-50 w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100 font-sans">
              <div className="border-b border-slate-100 p-2 text-xs">
                <p className="font-bold text-slate-900 truncate">{user?.name || 'Dr. John'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'doctor@clinic.co.ke'}</p>
              </div>

              <div className="py-1">
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded"
                >
                  <HugeiconsIcon icon={Settings01Icon} size={14} className="text-slate-400" />
                  <span>Account Settings</span>
                </a>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                >
                  <HugeiconsIcon icon={Logout01Icon} size={14} className="text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
