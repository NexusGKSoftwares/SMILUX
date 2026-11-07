import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Notification01Icon,
  Invoice01Icon,
  Calendar01Icon,
  ShieldCheckIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';

const INITIAL_NOTIFS = [
  {
    id: 1,
    type: 'payment',
    icon: Invoice01Icon,
    iconColor: 'bg-emerald-100 text-emerald-700',
    title: 'M-Pesa Payment Received',
    time: '5 mins ago',
    desc: 'KES 4,500 STK Push payment received for Patient #PT-1049 (Invoice #INV-2049).',
    unread: true,
  },
  {
    id: 2,
    type: 'insurance',
    icon: ShieldCheckIcon,
    iconColor: 'bg-blue-100 text-blue-700',
    title: 'SHA Claim Approved',
    time: '25 mins ago',
    desc: 'Kenya Social Health Authority (SHA) claim #SHA-8921 pre-authorization approved.',
    unread: true,
  },
  {
    id: 3,
    type: 'appointment',
    icon: Calendar01Icon,
    iconColor: 'bg-violet-100 text-violet-700',
    title: 'New Appointment Booked',
    time: '1 hour ago',
    desc: 'Sarah Connor booked Root Canal Consultation for today @ 2:30 PM.',
    unread: true,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [filter, setFilter] = useState('all');
  const dropdownRef = useRef(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filteredNotifs = notifs.filter((n) => {
    if (filter === 'payments') return n.type === 'payment';
    if (filter === 'appointments') return n.type === 'appointment';
    return true;
  });

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-200/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
        title="Clinic Notifications"
        aria-label="Notifications"
      >
        <HugeiconsIcon icon={Notification01Icon} size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-pink ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Clinic Activity</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-brand-pink/10 px-2 py-0.5 text-[10px] font-bold text-brand-pink">
                  {unreadCount} Unread
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-brand-600 hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1 border-b border-slate-100 px-3 py-1.5 bg-slate-50/50">
            {['all', 'payments', 'appointments'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`
                  px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer
                  ${filter === f ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}
                `.trim()}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 no-scrollbar">
            {filteredNotifs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">No notifications</div>
            ) : (
              filteredNotifs.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 transition-colors ${n.unread ? 'bg-brand-50/40' : 'hover:bg-slate-50'}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.iconColor}`}>
                    <HugeiconsIcon icon={n.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{n.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 leading-snug">{n.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-3 py-2 text-center bg-slate-50/50 rounded-b-xl">
            <a href="/reports" className="text-xs font-bold text-brand-600 hover:underline">
              View All Activity Logs →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
