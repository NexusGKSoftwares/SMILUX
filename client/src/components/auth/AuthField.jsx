import React from 'react';
import { EyeIcon, EyeOffIcon } from './tableIcons.jsx';

const inputBase =
  "w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60";

export function AuthInput({
  id, label, type = 'text', autoComplete, value, onChange,
  disabled, error, placeholder, name, required,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative">
        <input
          id={id} name={name} type={type} autoComplete={autoComplete}
          value={value} onChange={onChange} disabled={disabled}
          placeholder={placeholder} required={required}
          className={`${inputBase} px-3 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
        />
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function AuthPasswordField({
  id, label, name, autoComplete, value, onChange, disabled,
  error, visible, onToggleVisible, placeholder = '••••••••',
  toggleLabel = 'icon', required,
}) {
  const showTextToggle = toggleLabel === 'text';

  return (
    <div className="mb-3">
      <div className={`mb-1 flex ${showTextToggle ? 'items-center justify-between gap-2' : ''}`}>
        <label htmlFor={id} className={`block text-sm font-medium text-slate-800 ${showTextToggle ? '' : 'w-full'}`}>
          {label}
        </label>
        {showTextToggle && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 no-underline"
          >
            {visible ? 'Hide password' : 'Show password'}
          </button>
        )}
      </div>
      <div className="relative">
        <input
          id={id} name={name} type={visible ? 'text' : 'password'}
          autoComplete={autoComplete} value={value} onChange={onChange}
          disabled={disabled} placeholder={placeholder} required={required}
          className={`${inputBase} px-3 ${showTextToggle ? '' : 'pr-10'} ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
        />
        {!showTextToggle && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
