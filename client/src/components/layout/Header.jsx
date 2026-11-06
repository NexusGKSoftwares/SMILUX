import React from 'react';
import {
  Search01Icon,
  Add01Icon,
  HelpCircleIcon,
  Settings02Icon,
  Notification01Icon,
  UserIcon
} from '@hugeicons/react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ title = 'Dashboard' }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-150 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for anything here..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Quick Add Button (+) */}
        <button className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm shadow-blue-200 transition-all">
          <Add01Icon size={18} color="currentColor" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Header Action Icons */}
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
          <HelpCircleIcon size={18} />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
          <Settings02Icon size={18} />
        </button>

        {/* Notifications Badge */}
        <button className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold">
          <Notification01Icon size={16} />
          <span>1/4</span>
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* User Profile Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 flex items-center justify-center">
            <UserIcon size={20} className="text-slate-600" />
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-xs font-semibold text-slate-900">{user?.name || 'Darrell Steward'}</p>
            <p className="text-[10px] text-slate-400 font-medium">{user?.role || 'Super Admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
