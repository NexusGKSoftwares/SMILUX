import React from 'react';

export default function Footer() {
  return (
    <footer className="flex h-9 shrink-0 items-center justify-between border-t border-slate-200/80 bg-white px-4 sm:px-6 text-[11px] font-medium text-slate-500 font-sans select-none">
      <div className="flex items-center gap-2 truncate">
        <span>© {new Date().getFullYear()} Smilux Dental SaaS</span>
        <span className="text-slate-300">·</span>
        <span className="hidden sm:inline text-slate-400">Powered by Tekvora Systems</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">All Systems Operational</span>
        </span>

        <span className="text-slate-300 hidden sm:inline">·</span>

        <a
          href="mailto:support@smilux.co.ke"
          className="text-slate-500 hover:text-brand-blue hover:underline transition-colors"
        >
          support@smilux.co.ke
        </a>
      </div>
    </footer>
  );
}
