import React from 'react';

export default function AuthBrandHeader({ className = "p-4" }) {
  return (
    <header className={`mx-auto max-w-[54rem] px-3 sm:px-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Smilux<span className="text-blue-600">.</span>
            </h1>
            <p className="text-[11px] font-medium text-slate-500">Dental Practice Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/80">
            v1.0.0 Stable
          </span>
        </div>
      </div>
    </header>
  );
}
