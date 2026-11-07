import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown.jsx';
import HelpSidebar from './HelpSidebar.jsx';
import SearchBar from './SearchBar.jsx';
import SmsBalanceWidget from '../communication/SmsBalanceWidget.jsx';
import Button from '../UI/Button.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  UserCircleIcon,
  Settings01Icon,
  Logout01Icon,
  HelpCircleIcon,
  LockPasswordIcon,
} from '@hugeicons/core-free-icons';

export default function Topbar({
  sidebarOpen = true,
  currentDrawerWidth = 264,
  onOpenMobile,
  user = { name: 'Dr. John Doe', email: 'owner@avicena.co.ke', role: 'Lead Dentist' },
  onLogout,
  isHelpOpen,
  onOpenHelp,
  onCloseHelp,
}) {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const companyName = 'Smilux Dental Software';

  // Close user menu on outside click
  useEffect(() => {
    if (userMenuOpen) {
      const handler = (e) => {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
          setUserMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }
  }, [userMenuOpen]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'JD';

  return (
    <header
      className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-3 sm:px-4 backdrop-blur-md font-sans shrink-0"
    >
      {/* ── Left: Mobile Menu Toggle + Smilux Brand Badge ───────────────── */}
      <div className="flex items-center gap-2.5 shrink-0 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenMobile}
          className="rounded p-1.5 h-auto text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} />
        </Button>

        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/favicon.svg"
            alt={companyName}
            className="h-8 w-8 object-contain transition-transform group-hover:scale-105 drop-shadow-xs"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-brand-blue transition-colors tracking-tight">
              Smilux <span className="text-brand-pink">Dental</span>
            </span>
            <span className="text-slate-400 text-[10px] font-bold tracking-wide uppercase mt-0.5">
              Practice Management System
            </span>
          </div>
        </Link>
      </div>

      {/* ── Centre: SearchBar ─────────────────────────────────────────── */}
      <div className="flex-1 flex justify-center max-w-xl mx-3 min-w-0">
        <SearchBar />
      </div>

      {/* ── Right: SMS Balance + Notifications + Help + User menu ─────── */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* SMS Balance & STK Top Up Widget */}
        <SmsBalanceWidget />

        {/* Notification Dropdown */}
        <NotificationDropdown />

        {/* Help & Support Center */}
        <HelpSidebar isOpen={isHelpOpen} onOpen={onOpenHelp} onClose={onCloseHelp} />

        {/* User Menu Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <Button
            variant="ghost"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 h-auto rounded-full border border-brand-pink hover:bg-slate-100/80 transition-colors cursor-pointer"
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-pink text-white text-xs font-bold shrink-0">
              {initials}
            </div>
          </Button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 py-1.5 bg-white rounded border border-slate-200 z-50 text-sm overflow-hidden shadow-xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-100 font-sans">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-xs truncate">{user?.name || 'Dr. John Doe'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email || 'doctor@clinic.co.ke'}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-brand-50 text-brand-700 capitalize font-bold border border-brand-200/60">
                      {user?.role || 'Lead Dentist'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <HugeiconsIcon icon={UserCircleIcon} size={16} className="text-slate-400" />
                  <span>Account Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <HugeiconsIcon icon={LockPasswordIcon} size={16} className="text-slate-400" />
                  <span>Change Password</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <HugeiconsIcon icon={Settings01Icon} size={16} className="text-slate-400" />
                  <span>Clinic Settings</span>
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setUserMenuOpen(false);
                    if (onOpenHelp) onOpenHelp();
                  }}
                  className="w-full flex items-center justify-start gap-2.5 px-4 py-2 h-auto text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <HugeiconsIcon icon={HelpCircleIcon} size={16} className="text-slate-400" />
                  <span>Help &amp; Support</span>
                </Button>

                <div className="my-1 h-px bg-slate-100" />

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-2.5 px-4 py-2 h-auto text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                >
                  <HugeiconsIcon icon={Logout01Icon} size={16} className="text-rose-600" />
                  <span>Logout</span>
                </Button>
              </div>

              {/* Version Footer */}
              <div className="px-4 py-1.5 bg-slate-50 text-[10px] text-slate-400 font-medium flex items-center justify-between border-t border-slate-100">
                <span>Smilux Dental SaaS</span>
                <span>v1.0.0</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
