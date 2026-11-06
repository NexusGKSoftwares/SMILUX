import React, { useState } from 'react';
import AuthBrandHeader from '../components/auth/AuthBrandHeader.jsx';
import { AuthInput, AuthPasswordField } from '../components/auth/AuthField.jsx';
import { GoogleIcon, MicrosoftIcon, PhoneIcon, MailIcon } from '../components/UI/tableIcons.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar01Icon, ArrowUpRight01Icon, GiftIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import useSettingsStore from '../store/settingsStore.js';
import SEO from '../components/common/SEO.jsx';

// ─── What's New panel data for Smilux Dental Practice SaaS ────────────────
const changelog = [
  {
    tag: 'Feature',
    tagClass: 'bg-blue-100 text-blue-800 ring-blue-200/80',
    when: 'This week',
    title: 'Interactive FDI Dental Charting (Odontogram)',
    excerpt:
      'Record tooth conditions, cavities, fillings, crowns, and root canals on upper & lower arches with complete clinical history logs.',
  },
  {
    tag: 'Improvement',
    tagClass: 'bg-sky-100 text-sky-800 ring-sky-200/80',
    when: '2 weeks ago',
    title: 'Safaricom M-Pesa Daraja STK Push Integration',
    excerpt:
      'Initiate instant M-Pesa mobile payment prompts directly from patient invoices with automated receipt reconciliation.',
  },
  {
    tag: 'Feature',
    tagClass: 'bg-emerald-100 text-emerald-800 ring-emerald-200/80',
    when: '3 weeks ago',
    title: 'Kenya SHA & Insurance Claims Management',
    excerpt:
      'Manage patient insurance profiles, policy numbers, Social Health Authority (SHA) records, and claim approval workflows.',
  },
  {
    tag: 'Enhancement',
    tagClass: 'bg-violet-100 text-violet-800 ring-violet-200/80',
    when: 'Last month',
    title: 'Automated Patient SMS & WhatsApp Reminders',
    excerpt:
      'Send automated appointment confirmation notifications and check-in reminders to reduce clinic appointment no-shows.',
  },
];

function WhatsNewPanel() {
  const general = useSettingsStore((s) => s.general);
  const companyName = general?.companyName || 'Smilux Software';

  return (
    <div className="flex h-[46rem] flex-col overflow-hidden rounded border border-slate-300/90 bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-5">
        <h2 className="text-base font-semibold text-slate-900">What&apos;s New</h2>
        <span className="shrink-0 rounded p-1 text-slate-400" title="Product updates" aria-hidden>
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
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
                  <HugeiconsIcon icon={Calendar01Icon} size={14} className="text-slate-400" />
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

function MoneyBagGraphic() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
      {/* Floating blue diamonds */}
      <div className="absolute top-1 left-2 w-2.5 h-2.5 bg-blue-600 rotate-45 rounded-xs" />
      <div className="absolute top-0 right-3 w-3 h-3 bg-blue-600 rotate-45 rounded-xs" />
      <div className="absolute top-8 left-0 w-3.5 h-3.5 bg-blue-600 rotate-45 rounded-xs" />
      <div className="absolute top-12 right-1 w-2.5 h-2.5 bg-blue-600 rotate-45 rounded-xs" />

      {/* Money Bag & Pedestal SVG */}
      <svg className="w-22 h-22 sm:w-24 sm:h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none">
        {/* Pedestal */}
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="#cbd5e1" />
        <path d="M15 85 L15 95 C15 99 85 99 85 95 L85 85 Z" fill="#94a3b8" />

        {/* Money Bag Body */}
        <path d="M50 25 C30 25 22 45 22 65 C22 80 35 84 50 84 C65 84 78 80 78 65 C78 45 70 25 50 25 Z" fill="#2563EB" />
        {/* Top ruffle */}
        <path d="M50 25 C42 18 35 20 38 12 C45 15 50 22 50 25 Z" fill="#1D4ED8" />
        {/* Tie */}
        <path d="M38 27 C45 29 55 29 62 27" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />

        {/* Dollar Symbol */}
        <text x="50" y="62" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="sans-serif">$</text>
      </svg>
    </div>
  );
}

function ReferralBanner({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mt-4 w-full text-left block overflow-hidden rounded border border-slate-300/80 bg-[#E8EEF5] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-4 sm:space-x-6">
        <MoneyBagGraphic />
        <div className="flex-1 space-y-2 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
            Refer someone to Smilux and earn up to Ksh 10,000 in rewards
          </h3>
          <div className="flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#006B7B] group-hover:translate-x-1 transition-transform">
            <span>Learn More</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Main auth layout ──────────────────────────────────────────────────────
export function LoginLayout({ children, onOpenReferral }) {
  return (
    <div className="min-h-[100dvh] bg-mesh text-slate-900 antialiased py-6">
      <AuthBrandHeader className="p-4" />

      <main className="mx-auto max-w-[54rem] px-3 py-4 sm:px-4 sm:py-5 lg:py-6">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Form column */}
          <div className="flex min-w-0 flex-col">
            <div className="rounded border border-slate-300/90 bg-white/90 backdrop-blur-md px-5 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-6">
              {children}
            </div>
            <ReferralBanner onClick={onOpenReferral} />
          </div>

          {/* What's New column */}
          <div className="min-w-0 lg:sticky lg:top-4 lg:self-start">
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
export default function LoginPage({ onLoginSuccess, onOpenReferral, onNavigate }) {
  const [formData, setFormData] = useState({
    email: 'owner@avicena.co.ke',
    password: 'password123',
    remember: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isPhone = /^[0-9+ ]+$/.test(formData.email.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess({ email: formData.email, name: 'Darrell Steward' });
    }, 600);
  };

  const handleOpenSocialLogin = (provider) => {
    alert(`Initiating ${provider} login for clinic...`);
  };

  return (
    <LoginLayout onOpenReferral={onOpenReferral}>
      <SEO title="Sign In to Clinic" description="Access your dental practice workspace on Smilux Software SaaS." />
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Welcome back to Smilux</h2>
          <p className="mt-1 text-xs text-slate-500">Sign in to your clinic to access your workspace</p>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <AuthInput
              id="login-email"
              name="email"
              label="Phone number or Email address"
              type="text"
              autoComplete="username"
              placeholder="0712 345 678 or name@domain.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <AuthPasswordField
            id="login-password"
            name="password"
            label="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            visible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
            toggleLabel="text"
            required
          />

          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-slate-700">Keep me logged in</span>
            </label>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('forgot')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 sm:text-right"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Social login divider */}
        <div className="relative my-3.5">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide text-slate-500">
            <span className="bg-white px-3">Or continue with</span>
          </div>
        </div>

        {/* Social login buttons: Google and Microsoft */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenSocialLogin('Google')}
            disabled={loading}
            className="flex items-center justify-center space-x-2 rounded border border-slate-200 bg-white py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all"
          >
            <GoogleIcon className="h-4 w-4 shrink-0" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleOpenSocialLogin('Microsoft')}
            disabled={loading}
            className="flex items-center justify-center space-x-2 rounded border border-slate-200 bg-white py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all"
          >
            <MicrosoftIcon className="h-4 w-4 shrink-0" />
            <span>Microsoft</span>
          </button>
        </div>

        {/* Start Trial Footer */}
        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('register')}
            className="font-bold text-blue-600 hover:underline"
          >
            Start your 14-day free trial
          </button>
        </div>
      </div>

    </LoginLayout>
  );
}
