import React from 'react';
import { EyeIcon, EyeOffIcon } from '../UI/tableIcons.jsx';
import Input from '../UI/Input.jsx';
import { cn } from '../../lib/utils.js';

export function AuthInput({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  disabled,
  error,
  placeholder,
  name,
  required,
  className = '',
  ...props
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          error={Boolean(error)}
          className={className}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function AuthPasswordField({
  id,
  label,
  name,
  autoComplete,
  value,
  onChange,
  disabled,
  error,
  visible,
  onToggleVisible,
  placeholder = '••••••••',
  toggleLabel = 'icon',
  required,
  className = '',
  ...props
}) {
  const showTextToggle = toggleLabel === 'text';

  return (
    <div className="mb-3">
      <div className={`mb-1.5 flex ${showTextToggle ? 'items-center justify-between gap-2' : ''}`}>
        <label htmlFor={id} className={`block text-sm font-medium text-slate-800 ${showTextToggle ? '' : 'w-full'}`}>
          {label}
        </label>
        {showTextToggle && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 no-underline cursor-pointer"
          >
            {visible ? 'Hide password' : 'Show password'}
          </button>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          error={Boolean(error)}
          className={cn(showTextToggle ? '' : 'pr-10', className)}
          {...props}
        />
        {!showTextToggle && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
