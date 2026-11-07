import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  Cancel01Icon,
  Home01Icon,
  UserGroupIcon,
  Doc01Icon,
  Calendar01Icon,
  Invoice01Icon,
  ShieldCheckIcon,
  Store01Icon,
  Settings01Icon,
  UserCircleIcon,
  LockPasswordIcon,
  Notification01Icon,
} from '@hugeicons/core-free-icons';

const SEARCH_PAGES = [
  // Dashboard & Account
  { label: 'Dashboard Overview', path: '/dashboard', category: 'Pages', icon: Home01Icon, description: 'Practice metrics, collection overview, and patient activity' },
  { label: 'Account Profile', path: '/settings', category: 'Pages', icon: UserCircleIcon, description: 'Manage personal practitioner details and credentials' },
  { label: 'Change Password', path: '/settings', category: 'Pages', icon: LockPasswordIcon, description: 'Rotate account password and security options' },
  { label: 'Clinic Notifications', path: '/dashboard', category: 'Pages', icon: Notification01Icon, description: 'System alerts, M-Pesa receipts, and appointment reminders' },

  // Patients
  { label: 'Patients Directory & Records', path: '/patients', category: 'Patients', icon: UserGroupIcon, description: 'Central patient directory, medical histories, and contact cards' },
  { label: 'Onboard New Patient', path: '/patients', category: 'Patients', icon: UserGroupIcon, description: 'Register individual patient details and insurance card' },

  // FDI Dental Charting
  { label: 'FDI Dental Charting (Odontogram)', path: '/charting', category: 'Clinical', icon: Doc01Icon, description: 'Upper & lower arch odontogram (#11-#48 teeth procedures)' },
  { label: 'Tooth Extraction History', path: '/charting', category: 'Clinical', icon: Doc01Icon, description: 'Surgical extractions, roots, and fillings logs' },

  // Appointments
  { label: 'Appointments Calendar', path: '/appointments', category: 'Appointments', icon: Calendar01Icon, description: 'Daily practitioner slots and patient reminders' },
  { label: 'Book New Appointment', path: '/appointments', category: 'Appointments', icon: Calendar01Icon, description: 'Reserve consultation or treatment procedure slot' },

  // Invoices & Billing
  { label: 'Invoices & M-Pesa STK Push', path: '/invoices', category: 'Invoices', icon: Invoice01Icon, description: 'Patient invoices, M-Pesa Daraja payments, and receipts' },
  { label: 'Create New Invoice', path: '/invoices', category: 'Invoices', icon: Invoice01Icon, description: 'Generate treatment invoice for procedure or cleaning' },

  // SHA & Insurance
  { label: 'Kenya SHA & Insurance Claims', path: '/insurance', category: 'Insurance', icon: ShieldCheckIcon, description: 'Social Health Authority (SHA) claims and pre-authorizations' },
  { label: 'Submit Insurance Claim', path: '/insurance', category: 'Insurance', icon: ShieldCheckIcon, description: 'Submit claim reimbursement pre-authorization' },

  // Inventory & Supplies
  { label: 'Dental Inventory & Supplies', path: '/inventory', category: 'Inventory', icon: Store01Icon, description: 'Anesthetics, composite resins, needles, and PPE stock' },

  // Reports
  { label: 'Reports & Financial Analytics', path: '/reports', category: 'Reports', icon: Doc01Icon, description: 'Collection efficiency, procedure revenue, and patient analytics' },

  // Settings
  { label: 'Clinic Settings & Branding', path: '/settings', category: 'Settings', icon: Settings01Icon, description: 'Organization parameters, practitioner roles, and integrations' },
];

const FILTER_PILLS = [
  { value: 'all', label: 'All Results' },
  { value: 'patients', label: 'Patients' },
  { value: 'clinical', label: 'Dental Charting' },
  { value: 'invoices', label: 'Invoices & M-Pesa' },
  { value: 'insurance', label: 'SHA & Insurance' },
  { value: 'appointments', label: 'Appointments' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'pages', label: 'Pages' },
];

const STORAGE_KEY = 'smilux-spotlight-recents-v1';
const MAX_PAGE_RESULTS = 4;
const MAX_RECORD_RESULTS = 12;

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightMatch({ text, query }) {
  if (!query?.trim() || !text) return <>{text || ''}</>;
  const cleanQ = query.trim().replace(/^[@#!?>*]\s*/, '');
  if (!cleanQ) return <>{text}</>;
  const parts = String(text).split(new RegExp(`(${escapeRegex(cleanQ)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === cleanQ.toLowerCase() ? (
          <mark key={i} className="bg-brand-100 text-brand-900 rounded px-0.5 font-bold not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SearchBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filterScope, setFilterScope] = useState('all');
  const [highlightIndex, setHighlightIndex] = useState(0);

  const [recordResults, setRecordResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [recentItems, setRecentItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or "/"
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isOpen && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setRecordResults([]);
      setHighlightIndex(0);
    }
  }, [isOpen]);

  const pageResults = useMemo(() => {
    if (!query.trim()) return [];
    if (filterScope !== 'all' && filterScope !== 'pages') return [];

    const cleanQ = query.trim().replace(/^[@#!?>*]\s*/, '').toLowerCase();
    if (!cleanQ) return [];

    return SEARCH_PAGES.filter(
      (item) =>
        item.label.toLowerCase().includes(cleanQ) ||
        item.category.toLowerCase().includes(cleanQ) ||
        item.description?.toLowerCase().includes(cleanQ) ||
        item.path.toLowerCase().includes(cleanQ)
    ).slice(0, MAX_PAGE_RESULTS);
  }, [query, filterScope]);

  const searchTimeoutRef = useRef(null);
  const performSearch = useCallback(async (searchQuery, scope) => {
    const clean = searchQuery.trim().replace(/^[@#!?>*]\s*/, '');
    if (!clean || scope === 'pages') {
      setRecordResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.get('/search', {
        params: { q: clean, category: scope === 'all' ? undefined : scope },
      });
      setRecordResults((data?.results || []).slice(0, MAX_RECORD_RESULTS));
    } catch {
      setRecordResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(searchTimeoutRef.current);
    if (!query.trim()) {
      setRecordResults([]);
      setIsLoading(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query, filterScope);
    }, 200);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [query, filterScope, performSearch]);

  const combinedList = useMemo(() => {
    const list = [];
    pageResults.forEach((p) => list.push({ ...p, isPage: true }));
    recordResults.forEach((r) => list.push({ ...r, isRecord: true }));
    return list;
  }, [pageResults, recordResults]);

  const activeItem = useMemo(() => {
    if (combinedList.length > 0) {
      return combinedList[Math.min(highlightIndex, combinedList.length - 1)] || null;
    }
    if (recentItems.length > 0 && !query.trim()) {
      return recentItems[Math.min(highlightIndex, recentItems.length - 1)] || null;
    }
    return null;
  }, [combinedList, recentItems, highlightIndex, query]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, filterScope]);

  const handleSelect = (item) => {
    if (!item?.path) return;
    setIsOpen(false);
    navigate(item.path);

    const entry = {
      id: item.id || item.path,
      title: item.title || item.label,
      subtitle: item.subtitle || item.description || item.category,
      category: item.category,
      path: item.path,
    };
    const updated = [entry, ...recentItems.filter((p) => p.path !== item.path)].slice(0, 6);
    setRecentItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch { /* ignore */ }
  };

  const handleKeyDown = (e) => {
    const list = combinedList.length > 0 ? combinedList : query.trim() ? [] : recentItems;

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (list[highlightIndex]) {
        handleSelect(list[highlightIndex]);
      } else if (list.length > 0) {
        handleSelect(list[0]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between gap-3 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 text-slate-500 rounded border border-slate-200 transition-all text-xs group cursor-pointer font-sans"
        aria-label="Open Global Search"
      >
        <div className="flex items-center gap-2 min-w-0">
          <HugeiconsIcon icon={Search01Icon} size={15} className="text-slate-400 group-hover:text-brand-600 shrink-0" />
          <span className="truncate text-slate-500 group-hover:text-slate-800">
            Search patient, invoice, FDI chart, appointment... (⌘K)
          </span>
        </div>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-slate-900/40 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 md:p-10 font-sans animate-in fade-in duration-100"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Header Input */}
            <div className="p-3.5 border-b border-slate-100 flex items-center gap-3 shrink-0 bg-white">
              <HugeiconsIcon icon={Search01Icon} size={18} className="text-brand-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type patient name, invoice #, FDI tooth #, or procedure..."
                className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
                autoComplete="off"
              />
              {isLoading && (
                <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin shrink-0" />
              )}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-slate-400 hover:bg-slate-100"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-100"
              >
                ESC
              </button>
            </div>

            {/* Filter Pills */}
            <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-slate-50/50 shrink-0 no-scrollbar">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill.value}
                  type="button"
                  onClick={() => setFilterScope(pill.value)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${filterScope === pill.value
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Results Layout */}
            <div className="flex-1 flex overflow-hidden min-h-[320px] max-h-[56vh]">
              {/* Left Column */}
              <div className="w-full md:w-[58%] overflow-y-auto border-r border-slate-100 divide-y divide-slate-100 no-scrollbar">
                {query.trim() ? (
                  combinedList.length > 0 ? (
                    <div className="py-1">
                      {pageResults.map((item, idx) => {
                        const isSelected = idx === highlightIndex;
                        const IconComponent = item.icon || Doc01Icon;
                        return (
                          <button
                            key={item.path}
                            type="button"
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setHighlightIndex(idx)}
                            className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${isSelected ? 'bg-brand-50/90 text-brand-950 border-l-3 border-brand-600 font-semibold' : 'hover:bg-slate-50 text-slate-800'
                              }`}
                          >
                            <div className="w-7 h-7 rounded bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 mt-0.5">
                              <HugeiconsIcon icon={IconComponent} size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-bold truncate">
                                  <HighlightMatch text={item.label} query={query} />
                                </h4>
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-bold uppercase shrink-0">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                      <p className="font-bold text-slate-700">No records found for "{query}"</p>
                      <p>Try searching by patient name, invoice ID, or dental procedure.</p>
                    </div>
                  )
                ) : (
                  <div className="p-4 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Recent Lookups &amp; Pages
                    </p>
                    {recentItems.length > 0 ? (
                      <div className="space-y-1">
                        {recentItems.map((item, idx) => (
                          <button
                            key={item.path}
                            type="button"
                            onClick={() => handleSelect(item)}
                            className="w-full px-3 py-2 rounded text-left flex items-center justify-between gap-2 hover:bg-slate-50 cursor-pointer"
                          >
                            <span className="text-xs font-semibold text-slate-800 truncate">{item.title}</span>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.category}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">Your recent patient and invoice lookups will show here.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Right Preview Pane */}
              <div className="hidden md:flex flex-col md:w-[42%] bg-slate-50/50 p-4 overflow-y-auto">
                {activeItem ? (
                  <div className="space-y-3 animate-in fade-in-50 duration-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200/60">
                      {activeItem.category || 'Record'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{activeItem.title || activeItem.label}</h3>
                    <p className="text-xs text-slate-500">{activeItem.subtitle || activeItem.description}</p>
                    <button
                      type="button"
                      onClick={() => handleSelect(activeItem)}
                      className="w-full py-2 px-3 bg-brand-blue hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Open File →
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                    <p className="text-xs font-bold text-slate-600">Smart Preview</p>
                    <p className="text-[11px] text-slate-400 mt-1">Select or hover over search items to inspect records.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
