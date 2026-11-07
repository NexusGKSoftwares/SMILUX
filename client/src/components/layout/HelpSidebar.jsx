import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  HelpCircleIcon,
  Cancel01Icon,
  Mail01Icon,
  BubbleChatIcon,
  Call02Icon,
  Doc01Icon,
  Invoice01Icon,
  ShieldCheckIcon,
} from '@hugeicons/core-free-icons';

export default function HelpSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-md border border-slate-200/80 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
        title="Clinic Support & Knowledge Base"
        aria-label="Help & Support"
      >
        <HugeiconsIcon icon={HelpCircleIcon} size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-80 sm:w-88 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-100 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <HugeiconsIcon icon={HelpCircleIcon} size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Clinic Help Center</h4>
                <p className="text-[10px] text-slate-500">Documentation & Live Assistance</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </button>
          </div>

          {/* Quick Guides */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Popular PMS Documentation
            </p>
            <a
              href="/charting"
              className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={Doc01Icon} size={16} className="text-brand-blue" />
              <span>Interactive FDI Dental Charting Guide</span>
            </a>
            <a
              href="/invoices"
              className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={Invoice01Icon} size={16} className="text-emerald-600" />
              <span>Safaricom M-Pesa STK Push Setup</span>
            </a>
            <a
              href="/insurance"
              className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 text-xs font-semibold text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={ShieldCheckIcon} size={16} className="text-sky-600" />
              <span>Kenya SHA & Insurance Claims Workflow</span>
            </a>
          </div>

          {/* Contact Support Direct */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Contact Smilux Support
            </p>

            <a
              href="mailto:support@smilux.co.ke?subject=Smilux%20Dental%20Support%20Request"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Mail01Icon} size={16} />
                <span>Email Support</span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">support@smilux.co.ke</span>
            </a>

            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={BubbleChatIcon} size={16} />
                <span>WhatsApp Live Chat</span>
              </div>
              <span className="text-[10px] text-emerald-100 font-medium">+254 700 000000</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
