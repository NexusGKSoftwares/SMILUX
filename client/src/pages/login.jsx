import React, { useState } from 'react';
import AuthBrandHeader from './AuthBrandHeader.jsx';
import { Calendar01Icon, ArrowUpRight01Icon } from '@hugeicons/react';
import useSettingsStore from '../store/settingsStore.js';

// ─── What's New panel data ─────────────────────────────────────────────────
const changelog = [
  {
    tag: 'Feature',
    tagClass: 'bg-blue-100 text-blue-800 ring-blue-200/80',
    when: 'This week',
    title: 'Multi-property dashboard with live occupancy',
    excerpt:
      'Get a birds-eye view of all your properties, units, and occupancy rates on a single real-time dashboard — filter by location or property type.',
  },
  {
    tag: 'Improvement',
    tagClass: 'bg-sky-100 text-sky-800 ring-sky-200/80',
    when: '2 weeks ago',
    title: 'Automated rent invoices & payment reminders',
    excerpt:
      'Invoices are now generated automatically on the billing cycle date and tenants receive SMS/email reminders 3 days before due.',
  },
  {
    tag: 'Feature',
    tagClass: 'bg-emerald-100 text-emerald-800 ring-emerald-200/80',
    when: '3 weeks ago',
    title: 'Maintenance request workflow with vendor assignment',
    excerpt:
      'Tenants submit requests through the portal, staff triage and assign to vendors, and every status change notifies all parties automatically.',
  },
  {
    tag: 'Fix',
    tagClass: 'bg-violet-100 text-violet-800 ring-violet-200/80',
    when: 'Last month',
    title: 'Lease expiry alerts now respect timezone',
    excerpt:
      'Upcoming-expiry notifications were firing a day early for users outside EAT. Timezone handling has been corrected across all alerts.',
  },
];

function WhatsNewPanel() {
  const general = useSettingsStore((s) => s.general);
  const companyName = general?.companyName || 'Komora Holdings';

  return (
    <div className="flex min-h-[min(50rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-slate-300/90 bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:min-h-[min(54rem,calc(100dvh-7rem))] lg:min-h-[min(58rem,calc(100dvh-8rem))]">
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-5">
        <h2 className="text-base font-semibold text-slate-900">What&apos;s New</h2>
        <span className="shrink-0 rounded p-1 text-slate-400" title="Product updates" aria-hidden>
          <ArrowUpRight01Icon size={16} />
        </span>
      </div>

      {/* Feed */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 sm:px-5 sm:pb-5"
        style={{ scrollbarWidth: 'none' }}>
        <ul className="divide-y divide-slate-100">
          {changelog.map((item) => (
            <li key={item.title} className="py-3.5 first:pt-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${item.tagClass}`}
                >
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar01Icon size={14} className="text-slate-400" />
                  {item.when}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-3 sm:px-5">
        <p className="text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} {companyName} · Powered by Tekvora Systems
        </p>
      </div>
    </div>
  );
}

// ─── Main auth layout ──────────────────────────────────────────────────────
export function LoginLayout({ children }) {
  return (
    <div className="min-h-[100dvh] bg-mesh font-sans text-slate-900 antialiased py-6">
      <AuthBrandHeader className="p-4" />

      <main className="mx-auto max-w-[54rem] px-3 py-4 sm:px-4 sm:py-5 lg:py-6">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Form column */}
          <div className="flex min-w-0 flex-col gap-2">
            <div className="rounded-2xl border border-slate-300/90 bg-white/90 backdrop-blur-md px-5 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-6">
              {children}
            </div>
          </div>

          {/* What's New column */}
          <div className="min-h-0 lg:sticky lg:top-4 lg:self-start">
            <WhatsNewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

// Wide single-column layout (used by pages that don't need the panel)
export function WideLayout({ children }) {
  return (
    <div className="min-h-[100dvh] bg-mesh font-sans text-slate-900 antialiased py-6">
      <AuthBrandHeader className="p-4" />
      <main className="mx-auto max-w-2xl px-3 py-4 sm:px-4 sm:py-5 lg:py-6">
        {children}
      </main>
    </div>
  );
}

// ─── Default Exported Page Component ───────────────────────────────────────
export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('owner@avicena.co.ke');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess({ email, name: 'Darrell Steward' });
    }, 600);
  };

  return (
    <LoginLayout>
      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-slate-900">Sign in to your clinic</h2>
          <p className="mt-1 text-xs text-slate-500">Enter your credentials below to access your dental workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              placeholder="doctor@clinic.co.ke"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <a href="#forgot" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/30 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </LoginLayout>
  );
}
