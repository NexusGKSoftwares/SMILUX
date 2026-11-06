import React from 'react';

export default function AuthBrandHeader({ className = "p-4" }) {
  return (
    <header className={`mx-auto max-w-[54rem] px-3 sm:px-4 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <img
          src="/favicon.svg"
          alt="Smilux Logo"
          className="w-14 h-14"
        />
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Smilux <span className="text-brand-pink">Dental</span> <span className="text-brand-navy">Software</span><span className="text-brand-pink">.</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Dental Practice Management System
          </p>
        </div>
      </div>
    </header>
  );
}

