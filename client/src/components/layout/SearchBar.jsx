import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  Cancel01Icon,
  UserGroupIcon,
  Invoice01Icon,
  Calendar01Icon,
  Medical01Icon,
} from '@hugeicons/core-free-icons';

const SEARCH_SUGGESTIONS = [
  { type: 'patient', icon: UserGroupIcon, title: 'Dr. Sarah Connor', meta: 'Patient #PT-1049 · Nairobi', path: '/patients' },
  { type: 'invoice', icon: Invoice01Icon, title: 'Invoice #INV-2049', meta: 'KES 4,500 · M-Pesa Paid', path: '/invoices' },
  { type: 'charting', icon: Medical01Icon, title: 'Upper Arch Odontogram (#16 Tooth)', meta: 'FDI Clinical Chart', path: '/charting' },
  { type: 'appointment', icon: Calendar01Icon, title: 'Root Canal Consultation', meta: 'Today @ 2:30 PM · Dr. John Doe', path: '/appointments' },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (path) => {
    setIsOpen(false);
    setQuery('');
    navigate(path);
  };

  const filtered = SEARCH_SUGGESTIONS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Topbar Search Input Trigger */}
      <div className="relative w-full font-sans">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <HugeiconsIcon icon={Search01Icon} size={16} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder="Search patient, record, invoice, or appointment... (⌘K)"
          className="w-full rounded-md border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-12 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600/30 transition-all font-sans"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-2xs font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Command Palette Search Modal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-slate-900/40 backdrop-blur-xs pt-16 sm:pt-24 p-4 font-sans animate-in fade-in duration-100">
            <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden space-y-0">
              {/* Search Modal Input */}
              <div className="flex items-center border-b border-slate-100 px-4 py-3 gap-3">
                <HugeiconsIcon icon={Search01Icon} size={20} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  autoFocus
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search patients, invoices, dental charts..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </button>
              </div>

              {/* Search Suggestions Results */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1 no-scrollbar">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No matching records found for "{query}"
                  </div>
                ) : (
                  filtered.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(item.path)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-brand-50/70 transition-colors cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          <HugeiconsIcon icon={item.icon} size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-brand-800 truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate">
                            {item.meta}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-600">
                        Jump →
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <span>Navigation:</span>
                  <kbd className="rounded bg-white px-1.5 py-0.5 border border-slate-200 text-[10px]">↑↓</kbd>
                  <span>Select:</span>
                  <kbd className="rounded bg-white px-1.5 py-0.5 border border-slate-200 text-[10px]">↵</kbd>
                </div>
                <span>ESC to close</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
