import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar01Icon,
  AlertCircleIcon,
  Money01Icon,
  Invoice01Icon,
  Clock01Icon,
  ShieldCheckIcon,
  InformationCircleIcon,
  Notification01Icon,
  CheckmarkCircle01Icon,
  Delete02Icon,
  Cancel01Icon,
  Search01Icon,
  ArrowRight01Icon,
  MoreVerticalIcon,
  Store01Icon,
} from '@hugeicons/core-free-icons';

// ─── Type icons for Dental SaaS ─────────────────────────────────────────────
const TYPE_ICON_MAP = {
  appointment_due: Calendar01Icon,
  payment_received: Money01Icon,
  new_invoice: Invoice01Icon,
  insurance_approved: ShieldCheckIcon,
  inventory_low: Store01Icon,
  approval_required: AlertCircleIcon,
  system: InformationCircleIcon,
  general: Notification01Icon,
};

const typeIcon = (type, size = 'w-5 h-5') => {
  const icon = TYPE_ICON_MAP[type] || TYPE_ICON_MAP.general;
  return <HugeiconsIcon icon={icon} className={size} strokeWidth={1.75} />;
};

const typeConfig = {
  appointment_due: { bg: 'bg-violet-100 text-violet-800', header: 'from-violet-50 to-purple-50', accent: 'text-violet-700', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-800', label: 'Appointment' },
  payment_received: { bg: 'bg-emerald-100 text-emerald-800', header: 'from-emerald-50 to-teal-50', accent: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', label: 'Payment Received' },
  new_invoice: { bg: 'bg-blue-100 text-blue-800', header: 'from-blue-50 to-indigo-50', accent: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', label: 'New Invoice' },
  insurance_approved: { bg: 'bg-sky-100 text-sky-800', header: 'from-sky-50 to-cyan-50', accent: 'text-sky-700', border: 'border-sky-200', badge: 'bg-sky-100 text-sky-800', label: 'SHA & Insurance' },
  inventory_low: { bg: 'bg-amber-100 text-amber-800', header: 'from-amber-50 to-orange-50', accent: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', label: 'Stock Warning' },
  approval_required: { bg: 'bg-rose-100 text-rose-800', header: 'from-rose-50 to-red-50', accent: 'text-rose-700', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800', label: 'Approval Required' },
  system: { bg: 'bg-slate-100 text-slate-700', header: 'from-slate-50 to-gray-50', accent: 'text-slate-600', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-700', label: 'System' },
  general: { bg: 'bg-brand-50 text-brand-700', header: 'from-slate-50 to-blue-50', accent: 'text-brand-700', border: 'border-brand-200', badge: 'bg-brand-50 text-brand-700', label: 'General' },
};

const getTypeConfig = (type) => typeConfig[type] || typeConfig.general;

// Type-specific action links for Dental SaaS
const getActions = (notification) => {
  const { type, link, metadata = {} } = notification;
  const directAction = link ? [{ label: 'Open Linked Record', to: link }] : [];

  switch (type) {
    case 'appointment_due':
      return [
        ...directAction,
        { label: 'View Appointments Calendar', to: '/appointments' },
      ];
    case 'payment_received':
      return [
        ...directAction,
        { label: 'Go to Invoices & M-Pesa', to: '/invoices' },
      ];
    case 'new_invoice':
      return [
        ...directAction,
        { label: 'View Invoices', to: '/invoices' },
      ];
    case 'insurance_approved':
      return [
        ...directAction,
        { label: 'Go to SHA & Insurance', to: '/insurance' },
      ];
    case 'inventory_low':
      return [
        ...directAction,
        { label: 'Inspect Inventory Stock', to: '/inventory' },
      ];
    default:
      return directAction;
  }
};

function formatTime(dateStr) {
  if (!dateStr) return 'Just now';
  const diff = Date.now() - new Date(dateStr).getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatFull(dateStr) {
  if (!dateStr) return new Date().toLocaleString('en-KE');
  return new Date(dateStr).toLocaleString('en-KE', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Notification Detail Modal ────────────────────────────────────────────────
function NotificationModal({ notification, onClose, onDelete, onMarkRead }) {
  const navigate = useNavigate();
  const cfg = getTypeConfig(notification.type);
  const actions = getActions(notification);

  useEffect(() => {
    if (!notification.isRead && notification._id) onMarkRead(notification._id);
  }, [notification._id, notification.isRead, onMarkRead]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleAction = (to) => {
    onClose();
    navigate(to);
  };

  const handleDelete = () => {
    onDelete(notification._id);
    onClose();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-sans"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div
        className="relative w-full max-w-md bg-white rounded   overflow-hidden z-10 border border-slate-200"
        style={{ animation: 'notifModalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Gradient header band */}
        <div className={`bg-gradient-to-br ${cfg.header} px-6 pt-6 pb-5 border-b ${cfg.border}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded flex items-center justify-center   ${cfg.bg}`}>
                {typeIcon(notification.type, 'w-6 h-6')}
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${cfg.badge}`}>
                  {cfg.label}
                </span>
                {!notification.isRead && (
                  <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-pink/10 text-brand-pink">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink inline-block animate-pulse" />
                    New
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:bg-white/60 hover:text-slate-600 transition-colors shrink-0 cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
            </button>
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-900 leading-snug">{notification.title}</h2>

          <p className={`mt-1 text-xs font-semibold flex items-center gap-1.5 ${cfg.accent}`}>
            <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5" />
            {formatFull(notification.createdAt)}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {notification.message ? (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{notification.message}</p>
          ) : (
            <p className="text-xs text-slate-400 italic">No additional details.</p>
          )}

          {notification.metadata && Object.keys(notification.metadata).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(notification.metadata)
                .filter(([, v]) => v && typeof v === 'string' && !v.match(/^[0-9a-f]{24}$/i))
                .map(([k, v]) => (
                  <span key={k} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80">
                    <span className="text-slate-400 capitalize">{k.replace(/_/g, ' ')}:</span>
                    <span className="font-bold">{v}</span>
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAction(action.to)}
                className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${i === 0
                  ? 'bg-brand-blue text-white hover:bg-blue-700  '
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">{formatTime(notification.createdAt)}</span>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-bold transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-3.5 h-3.5" />
            Delete notification
          </button>
        </div>
      </div>

      <style>{`
        @keyframes notifModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}

// ─── Filter config ─────────────────────────────────────────────────────────────
const FILTERS = [
  { value: 'all', label: 'All Activity' },
  { value: 'payment_received', label: 'Payments' },
  { value: 'appointment_due', label: 'Appointments' },
  { value: 'insurance_approved', label: 'SHA Claims' },
  { value: 'inventory_low', label: 'Stock Warnings' },
  { value: 'system', label: 'System' },
];

const MOCK_NOTIFS = [
  {
    _id: 'm1',
    type: 'payment_received',
    title: 'Safaricom M-Pesa Payment Received',
    message: 'KES 4,500 STK Push payment received from Sarah Connor for Dental Treatment Invoice #INV-2049.',
    createdAt: new Date().toISOString(),
    isRead: false,
    metadata: { invoiceId: 'INV-2049', patientName: 'Sarah Connor' },
  },
  {
    _id: 'm2',
    type: 'insurance_approved',
    title: 'Kenya SHA Claim Approved',
    message: 'Social Health Authority (SHA) claim #SHA-8921 pre-authorization approved for Ksh 12,000.',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    isRead: false,
    metadata: { claimId: 'SHA-8921', status: 'Approved' },
  },
  {
    _id: 'm3',
    type: 'appointment_due',
    title: 'Upcoming Dental Consultation',
    message: 'Dr. John Doe has an upcoming Root Canal procedure @ 2:30 PM today.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isRead: true,
    metadata: { patientName: 'Dr. John Smith', procedure: 'Root Canal' },
  },
];

const PAGE_SIZE = 20;

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('unread');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState(MOCK_NOTIFS);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(MOCK_NOTIFS.length);
  const [unreadCount, setUnreadCount] = useState(2);
  const [selected, setSelected] = useState(null);

  const loadNotifications = async ({ reset = false } = {}) => {
    const nextPage = reset ? 1 : page + 1;
    setLoading(true);
    try {
      const { data } = await api.get('/notifications', {
        params: {
          page: nextPage,
          limit: PAGE_SIZE,
          ...(typeFilter !== 'all' ? { type: typeFilter } : {}),
          ...(activeTab === 'read' ? { read: 'read' } : activeTab === 'unread' ? { read: 'unread' } : {}),
          ...(search ? { search } : {}),
        },
      });
      const items = data.notifications || [];
      setNotifications((prev) => (reset ? items : [...prev, ...items]));
      setPage(nextPage);
      setPages(data.pages || 1);
      setTotal(data.total || items.length);
      setUnreadCount(data.unreadCount ?? items.filter(n => !n.isRead).length);
    } catch {
      // Dev mode fallback
      if (reset) {
        let filtered = MOCK_NOTIFS;
        if (activeTab === 'unread') filtered = filtered.filter(n => !n.isRead);
        if (activeTab === 'read') filtered = filtered.filter(n => n.isRead);
        if (typeFilter !== 'all') filtered = filtered.filter(n => n.type === typeFilter);
        setNotifications(filtered);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    loadNotifications({ reset: true });
  }, [open, typeFilter, activeTab, search]);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    if (!open || selected) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, selected]);

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all').catch(() => { });
    } catch { /* ignore */ }
    setNotifications((prev) => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const markOneRead = useCallback(async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`).catch(() => { });
    } catch { /* ignore */ }
    setNotifications((prev) => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const deleteOne = useCallback(async (id) => {
    try {
      await api.delete(`/notifications/${id}`).catch(() => { });
    } catch { /* ignore */ }
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    setTotal((t) => Math.max(0, t - 1));
  }, []);

  const deleteAll = async () => {
    try {
      await Promise.all(notifications.map((n) => api.delete(`/notifications/${n._id}`).catch(() => { })));
    } catch { /* ignore */ }
    setNotifications([]);
    setTotal(0);
    setUnreadCount(0);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors relative cursor-pointer"
        aria-label="Open notifications"
      >
        <HugeiconsIcon icon={Notification01Icon} className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-0.5 rounded-full bg-brand-pink text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[99998] transition-opacity duration-200 ease-out" onClick={() => setOpen(false)} />
          <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[99999] flex flex-col   font-sans border-l border-slate-200 animate-drawer-right">

            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900"> Notifications</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{total} total · {unreadCount} unread</p>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button type="button" onClick={markAllRead}
                      className="text-xs font-bold text-brand-600 hover:underline whitespace-nowrap cursor-pointer">
                      Mark all as read
                    </button>
                  )}
                  <div className="relative">
                    <button type="button" onClick={() => setMenuOpen(!menuOpen)}
                      className="p-1.5 rounded text-slate-500 hover:bg-slate-100 cursor-pointer"
                      aria-label="Notification options">
                      <HugeiconsIcon icon={MoreVerticalIcon} className="w-4 h-4" />
                    </button>
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                        <div className="absolute right-0 top-full mt-1 w-52 py-1.5 bg-white rounded border border-slate-200 z-20 text-xs  ">
                          <button type="button" onClick={() => { markAllRead(); setMenuOpen(false); }}
                            className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium">
                            <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-4 h-4 text-emerald-600" />
                            Mark all as read
                          </button>
                          <button type="button" onClick={() => { deleteAll(); setMenuOpen(false); }}
                            className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-semibold">
                            <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4 text-rose-600" />
                            Delete all
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <button type="button" onClick={() => setOpen(false)}
                    className="p-1.5 rounded text-slate-500 hover:bg-slate-100 cursor-pointer"
                    aria-label="Close notifications">
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4 border-b border-slate-100">
                {['unread', 'read'].map((tab) => (
                  <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                    className={`pb-2.5 text-xs font-bold transition-colors -mb-px capitalize cursor-pointer ${activeTab === tab
                      ? 'text-brand-600 border-b-2 border-brand-600'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}>
                    {tab === 'unread' ? (
                      <span className="flex items-center gap-1.5">
                        Unread
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-brand-pink text-white text-[10px] font-bold leading-none">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </span>
                    ) : 'Read'}
                  </button>
                ))}
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {FILTERS.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setTypeFilter(opt.value)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${typeFilter === opt.value
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative mt-3">
                <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search clinic activity notifications..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-600 focus:border-brand-600 font-sans" />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={Notification01Icon} className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeTab === 'unread' ? 'All caught up!' : 'No read notifications'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {activeTab === 'unread'
                      ? 'No pending unread activity alerts for your clinic.'
                      : 'Opened notifications will appear here.'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {notifications.map((n) => {
                    const cfg = getTypeConfig(n.type);
                    return (
                      <li key={n._id} className="relative group">
                        <button
                          type="button"
                          onClick={() => setSelected(n)}
                          className={`w-full text-left flex gap-3 px-5 py-3 transition-colors hover:bg-slate-50 cursor-pointer ${!n.isRead ? 'bg-brand-50/40' : ''}`}
                        >
                          {!n.isRead && (
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-pink" />
                          )}
                          <span className={`shrink-0 w-9 h-9 rounded flex items-center justify-center ${cfg.bg}`}>
                            {typeIcon(n.type)}
                          </span>
                          <div className="flex-1 min-w-0 pr-6">
                            <p className={`text-xs ${!n.isRead ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                              {n.title}
                            </p>
                            {n.message && (
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                            )}
                            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                              <HugeiconsIcon icon={Clock01Icon} className="w-3 h-3" />
                              {formatTime(n.createdAt)}
                            </p>
                          </div>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-slate-500 transition-colors">
                            <HugeiconsIcon icon={ArrowRight01Icon} className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </>,
        document.body
      )}

      {selected && (
        <NotificationModal
          notification={selected}
          onClose={() => setSelected(null)}
          onDelete={deleteOne}
          onMarkRead={markOneRead}
        />
      )}
    </>
  );
}
