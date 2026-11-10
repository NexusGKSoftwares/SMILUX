import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils.js';

/**
 * Reusable Input Component matching Figma specification:
 * - box-sizing: border-box
 * - height: 42px
 * - background: #FFFFFF
 * - border: 1px solid #D4D4D4
 * - border-radius: 6px
 */
const Input = forwardRef(function Input(
  {
    className = '',
    type = 'text',
    error = false,
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        // Figma specifications
        "box-border h-[42px] w-full rounded-[6px] border border-[#D4D4D4] bg-[#FFFFFF] px-3 text-sm text-slate-900 transition-colors",
        // Typography & Placeholder
        "placeholder:text-slate-400 placeholder:text-sm font-sans font-normal",
        // Focus state
        "focus:border-[#7B4DFF] focus:outline-none focus:ring-2 focus:ring-[#9C7AFF]/25",
        // Disabled state
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:opacity-60",
        // Error state
        error && "!border-red-400 focus:!border-red-500 focus:!ring-red-500/25",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;

