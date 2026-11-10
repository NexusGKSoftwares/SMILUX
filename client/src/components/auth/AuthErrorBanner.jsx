import React from 'react';
import { AlertIcon, ClockIcon, MailIcon, XIcon } from '../UI/tableIcons.jsx';

export default function AuthErrorBanner({ error, onDismiss }) {
  if (!error) return null;

  const rawMessage =
    typeof error === 'string' ? error : error?.message || 'Something went wrong';
  const lower = rawMessage.toLowerCase();

  const isSuspended = lower.includes('suspended');
  const isDeactivated = lower.includes('deactivated') || lower.includes('inactive');
  const isRateLimited = lower.includes('too many') || lower.includes('15 minutes') || lower.includes('rate limit');

  if (isSuspended) {
    return (
      <div className="mt-3 rounded border border-amber-200 bg-amber-50/90 p-3 text-xs text-amber-900   font-sans">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-700 mt-0.5">
              <AlertIcon className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-amber-950 text-sm">Account Access Notice</p>
              <p className="text-amber-800 leading-relaxed">
                Your account is currently suspended. For security and verification reasons, access has been temporarily paused.
              </p>
              <div className="pt-1.5 flex items-center gap-2">
                <a
                  href="mailto:support@smilux.co.ke?subject=Account%20Suspension%20Inquiry"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded bg-amber-700 text-white hover:bg-amber-800 transition-colors  "
                >
                  <MailIcon className="w-3 h-3" />
                  Contact Support
                </a>
                <span className="text-[11px] text-amber-700">support@smilux.co.ke</span>
              </div>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 text-amber-600 hover:text-amber-900 p-0.5 cursor-pointer"
              aria-label="Dismiss"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isDeactivated) {
    return (
      <div className="mt-3 rounded border border-slate-300 bg-slate-50 p-3 text-xs text-slate-800   font-sans">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-600 mt-0.5">
              <AlertIcon className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900 text-sm">Account Deactivated</p>
              <p className="text-slate-600 leading-relaxed">
                This account has been deactivated. If you believe this occurred in error, please reach out to clinic support.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <a
                  href="mailto:support@smilux.co.ke?subject=Account%20Reactivation%20Request"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                >
                  <MailIcon className="w-3 h-3" />
                  Request Assistance
                </a>
              </div>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
              aria-label="Dismiss"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isRateLimited) {
    return (
      <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800   font-sans">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2">
            <ClockIcon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 text-xs">Security Limit Reached</p>
              <p className="text-amber-700 leading-relaxed mt-0.5">{rawMessage}</p>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 text-amber-600 hover:text-amber-900 p-0.5 cursor-pointer"
              aria-label="Dismiss"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded border border-rose-200 bg-rose-50/90 px-3 py-2.5 text-xs text-rose-800   font-sans">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <AlertIcon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{rawMessage}</span>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 text-rose-500 hover:text-rose-800 p-0.5 cursor-pointer"
            aria-label="Dismiss"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
