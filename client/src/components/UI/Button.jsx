import React from 'react';
import PropTypes from 'prop-types';
import { InlineSpinner } from './Spinner.jsx';
import { cn } from '../../lib/utils.js';

/**
 * Enterprise Reusable Button Component supporting Primary, Upgrade & Outline variants,
 * with built-in loading spinner support.
 *
 * @param {'primary' | 'upgrade' | 'outline' | 'secondary' | 'ghost' | 'destructive'} variant - Button style variant
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
    "box-border inline-flex items-center justify-center gap-2 whitespace-nowrap text-center transition-all enabled:cursor-pointer disabled:!pointer-events-none disabled:!opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive   hover:opacity-90 has-[>svg]:px-3 has-[>svg]:gap-1.5 cursor-pointer font-sans";

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs rounded',
    md: 'h-[36px] px-4 py-2 text-sm rounded',
    lg: 'h-11 px-6 text-base rounded',
  }[size] || 'h-[36px] px-4 py-2 text-sm rounded';

  const variantClasses = {
    primary:
      'bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[4px] font-inter font-medium text-[13.5px] leading-[20px] not-italic text-white [font-variation-settings:\'slnt\'_0] hover:brightness-105 hover:opacity-95 active:scale-[0.995] focus-visible:ring-[#9C7AFF]/50 focus-visible:border-[#7B4DFF]',
    upgrade:
      'bg-[linear-gradient(180deg,#FFC42E_0%,#E09F00_100%)] border border-[#ffb703] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[4px] font-inter font-medium text-[13.5px] leading-[20px] not-italic text-white [font-variation-settings:\'slnt\'_0] hover:brightness-105 hover:opacity-95 active:scale-[0.995] focus-visible:ring-[#ffb703]/50 focus-visible:border-[#ffb703]',
    outline:
      'bg-[linear-gradient(180deg,#FDFDFD_0%,#F2F5F7_100%)] border border-[#E4E4E8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[4px] font-inter font-medium text-[13px] leading-[20px] not-italic text-[#22162B] [font-variation-settings:\'slnt\'_0] hover:bg-[#F2F5F7] hover:border-[#D8D8DF] hover:text-[#180F1F] active:scale-[0.995] focus-visible:ring-slate-300 focus-visible:border-[#D8D8DF]',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent',
    destructive:
      'bg-rose-600 text-white hover:bg-rose-700 border border-rose-600',
  }[variant] || 'bg-[linear-gradient(180deg,#9C7AFF_0%,#6C44E0_100%)] border border-[#7B4DFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[4px] font-inter font-medium text-[13.5px] leading-[20px] not-italic text-white [font-variation-settings:\'slnt\'_0]';

  const spinnerSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      data-slot="button"
      type={type}
      disabled={disabled || loading}
      className={cn(baseClasses, sizeClasses, variantClasses, className)}
      {...props}
    >
      {loading && <InlineSpinner size={spinnerSize} className="text-current" />}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'upgrade', 'outline', 'secondary', 'ghost', 'destructive']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
