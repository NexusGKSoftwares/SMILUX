import React from 'react';
import { createPortal } from 'react-dom';
import { LoadingIcon } from './tableIcons.jsx';

export function InlineSpinner({ size = 'sm', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  const iconSizeClass = sizes[size] || sizes.sm;
  return (
    <LoadingIcon className={`${iconSizeClass} animate-spin shrink-0 ${className}`.trim()} strokeWidth={2} />
  );
}

export default function Spinner({ fullPage = false, size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <LoadingIcon className={`${sizes[size] || sizes.md} animate-spin text-brand-600 ${className}`.trim()} strokeWidth={2} />
  );

  if (fullPage) {
    if (typeof document === 'undefined') return null;
    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {spinner}
      </div>,
      document.body
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}
