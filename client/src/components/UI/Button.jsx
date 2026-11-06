import React from 'react';
import { InlineSpinner } from './Spinner.jsx';

/**
 * Enterprise Reusable Button Component supporting Primary & Outline variants,
 * with built-in loading spinner support.
 *
 * @param {'primary' | 'outline' | 'secondary' | 'ghost' | 'destructive'} variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} size - Button height and padding size
 * @param {'button' | 'submit' | 'reset'} type - HTML button type attribute
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading spinner state
 * @param {string} className - Additional custom CSS classes
 * @param {React.ReactNode} children - Button label / icon children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  children,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all enabled:cursor-pointer disabled:!pointer-events-none disabled:!opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hover:opacity-85 has-[>svg]:px-3 has-[>svg]:gap-1.5 cursor-pointer font-sans";

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 py-2 text-sm',
    lg: 'h-11 px-6 text-base',
  }[size] || 'h-9 px-4 py-2 text-sm';

  const variantClasses = {
    primary:
      'bg-gradient-primary-vertical border-[#2846d1] border text-white shadow-xs hover:opacity-90 active:scale-[0.995]',
    outline:
      'bg-gradient-outline-vertical border-slate-300 border text-slate-800 shadow-xs hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 active:scale-[0.995]',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent',
    destructive:
      'bg-rose-600 text-white hover:bg-rose-700 border border-rose-600',
  }[variant] || 'bg-gradient-primary-vertical border-[#2846d1] border text-white';

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      data-slot="button"
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim()}
      {...props}
    >
      {loading && <InlineSpinner size={spinnerSize} className="text-current" />}
      {children}
    </button>
  );
}
