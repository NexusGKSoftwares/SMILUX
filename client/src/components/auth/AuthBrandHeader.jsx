import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { DentalToothIcon } from '@hugeicons/core-free-icons';

export default function AuthBrandHeader({ className = "p-4" }) {
  return (
    <header className={`mx-auto max-w-[54rem] px-3 sm:px-4 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
          <HugeiconsIcon icon={DentalToothIcon} size={26} color="currentColor" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Smilux<span className="text-blue-600">.</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Dental Practice Management System
          </p>
        </div>
      </div>
    </header>
  );
}
