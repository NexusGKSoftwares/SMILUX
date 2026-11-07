import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar01Icon,
  Search01Icon,
  FilterIcon,
  PlusSignIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  UserCircleIcon,
  Tick01Icon,
  Money01Icon,
} from '@hugeicons/core-free-icons';

// ─── Shared Section Header ──────────────────────────────────────────────────
export function ViewHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4 mb-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Shared KPI Card ───────────────────────────────────────────────────────
export function KpiCard({ title, value, change, isPositive, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
  };

  return (
    <div className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-md border ${colorMap[color] || colorMap.blue}`}>
            <HugeiconsIcon icon={Icon} size={18} />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-xl font-extrabold text-slate-900">{value}</span>
        {change && (
          <span className={`text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── 1. Dashboard View ──────────────────────────────────────────────────────
export function DashboardView({ user }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');

  return (
    <div className="space-y-7 font-sans text-slate-900 pb-8">
      {/* Workspace Header & Action Bar */}
      <ViewHeader
        title={`Welcome back, ${user?.name || 'Dr. Darrell Steward'}`}
        subtitle="Avicena Dental Practice — Nairobi Main Branch Workspace Overview"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
              {['Today', 'This Week', 'This Month', 'Year 2026'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <button
              onClick={() => alert('Opening Patient Registration Wizard...')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={15} />
              <span>New Patient</span>
            </button>

            <button
              onClick={() => alert('Opening New Appointment modal...')}
              className="flex items-center gap-1.5 rounded-xl bg-brand-green px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-[#25a89c] transition-all cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              <span>New Appointment</span>
            </button>
          </div>
        }
      />

      {/* KPI Top Cards Row - Styled with 24px Spec */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Today's Revenue */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#888888]">Practice Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HugeiconsIcon icon={Money01Icon} size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#080808]">KES 1,485,000</div>
              <div className="text-[11px] text-[#888888] font-medium mt-0.5">$420,110 Equivalent</div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-2.5 py-1 text-[11px] font-bold text-[#00C26B]">
              ▲ +18.5%
            </span>
          </div>
        </div>

        {/* Card 2: Today's Patient Schedule */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#888888]">Today's Appointments</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <HugeiconsIcon icon={Calendar01Icon} size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#080808]">14 Patients</div>
              <div className="text-[11px] text-[#888888] font-medium mt-0.5">5 In-Chair / Waiting</div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-2.5 py-1 text-[11px] font-bold text-[#00C26B]">
              ▲ +3 Today
            </span>
          </div>
        </div>

        {/* Card 3: Pending SHA & Insurance Claims */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#888888]">SHA & Insurance Claims</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#080808]">14 Claims</div>
              <div className="text-[11px] text-[#888888] font-medium mt-0.5">KES 342,000 Value</div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#FFF3E0] border border-[#FFE0B2] px-2.5 py-1 text-[11px] font-bold text-[#FF9900]">
              98.2% Approved
            </span>
          </div>
        </div>

        {/* Card 4: Active Treatment Plans */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#888888]">Active Treatment Plans</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <HugeiconsIcon icon={Tick01Icon} size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#080808]">38 Plans</div>
              <div className="text-[11px] text-[#888888] font-medium mt-0.5">FDI Charting Validated</div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-2.5 py-1 text-[11px] font-bold text-[#00C26B]">
              ▲ 84.5% Accept
            </span>
          </div>
        </div>
      </div>

      {/* Main Section 1: Sales & Revenue Tracking Chart (Custom SVG & Specified Colors) */}
      <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
        {/* Card Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#004491]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="#004491" strokeWidth="2" />
                <path d="M4 10h16" stroke="#004491" strokeWidth="2" />
                <circle cx="9" cy="14" r="1.5" fill="#004491" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] tracking-tight">Sales &amp; Revenue Tracking</h2>
              <p className="text-xs text-[#888888] font-medium">Dental Procedure &amp; Payment Channel Revenue Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] bg-white px-3 py-1.5 text-xs font-semibold text-[#888888] shadow-2xs">
              <HugeiconsIcon icon={Calendar01Icon} size={14} className="text-[#888888]" />
              <span>Feb 2026 - Nov 2026</span>
            </div>
            <button className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 cursor-pointer">
              <span className="text-xs font-bold">•••</span>
            </button>
          </div>
        </div>

        {/* Top Summaries Row ($420,110 & $91,110) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Online Store / M-Pesa STK Revenue */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <span className="text-sm font-medium text-[#888888]">Online / M-Pesa STK Revenue</span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold tracking-tight text-[#080808]">$420,110</span>
              <div className="flex items-center gap-1 rounded-md bg-[#FFFFFF] border border-slate-200 px-2 py-0.5 text-xs font-bold text-[#00C26B]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2.5L9 6.5H3L6 2.5Z" fill="#00C26B" />
                </svg>
                <span>25%</span>
              </div>
            </div>
            {/* Visual indicator line */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 flex">
              <div className="h-full bg-[#00C26B]" style={{ width: '75%' }} />
              <div className="h-full bg-[#FF9900]" style={{ width: '25%' }} />
            </div>
          </div>

          {/* Offline Store / SHA Insurance Revenue */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <span className="text-sm font-medium text-[#888888]">Offline / SHA Claims Revenue</span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold tracking-tight text-[#080808]">$91,110</span>
              <div className="flex items-center gap-1 rounded-md bg-[#FFFFFF] border border-slate-200 px-2 py-0.5 text-xs font-bold text-[#00C26B]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2.5L9 6.5H3L6 2.5Z" fill="#00C26B" />
                </svg>
                <span>13%</span>
              </div>
            </div>
            {/* Visual indicator line */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 flex">
              <div className="h-full bg-[#004491]" style={{ width: '60%' }} />
              <div className="h-full bg-[#5654DC]" style={{ width: '40%' }} />
            </div>
          </div>

          {/* Procedure Legend List */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Procedure Categories</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#888888]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#004491]" />
                <span className="truncate">Restorative ($140k)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#FF9900]" />
                <span className="truncate">Prosthodontics ($110k)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#FFC600]" />
                <span className="truncate">Hygiene ($85k)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#5654DC]" />
                <span className="truncate">Orthodontics ($55k)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#00CBE8]" />
                <span className="truncate">Implants ($30k)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Bar Chart & Horizontal Overlay Visual Representation */}
        <div className="space-y-4">
          <div className="relative overflow-x-auto rounded-2xl border border-slate-100 bg-[#FAFBFD] p-5">
            <div className="space-y-4 min-w-[600px]">
              {/* Category 1: Restorative Dental Fillings */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-700">Restorative &amp; Composite Fillings</span>
                  <span className="font-bold text-[#004491]">42% ($214,800)</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: '84%',
                      background: 'linear-gradient(95.39deg, #004391 0%, #FF4049 101.08%)',
                      opacity: 0.85,
                    }}
                  />
                  <div className="absolute left-2 top-1 h-4 w-5 rounded bg-[#004491]" />
                </div>
              </div>

              {/* Category 2: Prosthodontics & Crowns */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-700">Prosthodontics &amp; Crown Prep</span>
                  <span className="font-bold text-[#FF9900]">28% ($143,200)</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: '68%',
                      background: 'linear-gradient(90deg, #FF9900 0%, #FF4049 100%)',
                      opacity: 0.85,
                    }}
                  />
                  <div className="absolute left-2 top-1 h-4 w-5 rounded bg-[#FF9900]" />
                </div>
              </div>

              {/* Category 3: Dental Hygiene & Scaling */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-700">Hygiene, Scaling &amp; Polishing</span>
                  <span className="font-bold text-[#FFC600]">18% ($92,100)</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: '52%',
                      background: 'linear-gradient(180deg, #FFC600 0%, #FF4049 100%)',
                      opacity: 0.85,
                    }}
                  />
                  <div className="absolute left-2 top-1 h-4 w-5 rounded bg-[#FFC600]" />
                </div>
              </div>

              {/* Category 4: Orthodontics & Braces */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-700">Orthodontic Aligners &amp; Braces</span>
                  <span className="font-bold text-[#5654DC]">12% ($61,400)</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: '38%',
                      background: 'linear-gradient(90deg, #5654DC 0.01%, #FF4049 100%)',
                      opacity: 0.85,
                    }}
                  />
                  <div className="absolute left-2 top-1 h-4 w-5 rounded bg-[#5654DC]" />
                </div>
              </div>

              {/* Category 5: Implants & Oral Surgery */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-semibold text-slate-700">Implants &amp; Surgical Extractions</span>
                  <span className="font-bold text-[#00CBE8]">10% ($51,200)</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: '28%',
                      background: 'linear-gradient(89.86deg, #00CBE8 0.12%, #FF4049 100%)',
                      opacity: 0.85,
                    }}
                  />
                  <div className="absolute left-2 top-1 h-4 w-5 rounded bg-[#00CBE8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section 2: Two Column Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Column 1: Web & Patient Analytics Chart Card */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-[#FF9900]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#FF9900" strokeWidth="2" />
                  <path d="M12 7v5l3 3" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#080808]">Patient Traffic &amp; Web Analytics</h3>
                <p className="text-xs text-[#888888]">Weekly Appointment &amp; Portal Visitor Volume</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] bg-white px-2.5 py-1 text-xs font-medium text-[#888888] shadow-2xs">
              <span>Nov 2026</span>
            </div>
          </div>

          {/* Metrics Overview Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Metric 1 */}
            <div className="flex flex-col rounded-xl bg-slate-50 p-3">
              <span className="text-xs font-medium text-[#888888]">Avg Visit Duration</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-[#080808]">1m 35s</span>
              </div>
              <span className="mt-1 flex items-center gap-1 rounded-full bg-[#FFE9EA] border border-[#FF999A] px-1.5 py-0.5 text-[10px] font-bold text-[#FF104B] w-fit">
                ▼ 12%
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col rounded-xl bg-slate-50 p-3">
              <span className="text-xs font-medium text-[#888888]">Total Page Views</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-[#080808]">803k</span>
              </div>
              <span className="mt-1 flex items-center gap-1 rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-1.5 py-0.5 text-[10px] font-bold text-[#00C26B] w-fit">
                ▲ 12%
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col rounded-xl bg-slate-50 p-3">
              <span className="text-xs font-medium text-[#888888]">Unique Visitors</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-[#080808]">120k</span>
              </div>
              <span className="mt-1 flex items-center gap-1 rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-1.5 py-0.5 text-[10px] font-bold text-[#00C26B] w-fit">
                ▲ 12%
              </span>
            </div>
          </div>

          {/* Bar Chart Area with Dashed Grid Lines */}
          <div className="relative h-48 w-full border-b border-[#E9E9E9] pt-4">
            {/* Dashed Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              <div className="w-full border-b border-dashed border-[#E0E0E0]" />
              <div className="w-full border-b border-dashed border-[#E0E0E0]" />
              <div className="w-full border-b border-dashed border-[#E0E0E0]" />
              <div className="w-full border-b border-dashed border-[#E0E0E0]" />
            </div>

            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-medium text-[#888888]">
              <span>80k</span>
              <span>60k</span>
              <span>40k</span>
              <span>20k</span>
              <span>0</span>
            </div>

            {/* Bars Layout */}
            <div className="ml-10 h-full flex items-end justify-between px-4 pb-6">
              {/* Week 01 Bars */}
              <div className="flex items-end gap-1">
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '45px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '70px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '40px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '110px' }} />
              </div>

              {/* Week 08 Bars */}
              <div className="flex items-end gap-1">
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '80px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '130px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '95px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '65px' }} />
              </div>

              {/* Week 15 Bars */}
              <div className="flex items-end gap-1">
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '145px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '120px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '75px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '55px' }} />
              </div>

              {/* Week 22 Bars */}
              <div className="flex items-end gap-1">
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '70px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '115px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '135px' }} />
                <div className="w-3 rounded-t-md bg-[#FF9900]" style={{ height: '150px' }} />
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="ml-10 flex items-center justify-between text-xs font-medium text-[#888888] pt-1">
              <span>Week 01</span>
              <span>Week 08</span>
              <span>Week 15</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-bold text-slate-800">Week 22</span>
            </div>
          </div>
        </div>

        {/* Column 2: Procedure Distribution Donut Chart Card */}
        <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100 text-[#00CBE8]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#00CBE8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#080808]">Procedure Distribution</h3>
                <p className="text-xs text-[#888888]">Dental Care Revenue by Treatment Stream</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] bg-white px-2.5 py-1 text-xs font-medium text-[#888888] shadow-2xs">
              <span>Channel Split</span>
            </div>
          </div>

          {/* Donut Chart Visual & Floating Badges */}
          <div className="relative flex items-center justify-center py-4">
            {/* SVG Donut Ring */}
            <svg className="w-52 h-52 -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="14" />
              {/* Arc 1: Blue 60% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#00CBE8"
                strokeWidth="14"
                strokeDasharray="143 238"
                strokeDashoffset="0"
              />
              {/* Arc 2: Purple 24% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#5654DC"
                strokeWidth="14"
                strokeDasharray="57 238"
                strokeDashoffset="-143"
              />
              {/* Arc 3: Red 16% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#FF104B"
                strokeWidth="14"
                strokeDasharray="38 238"
                strokeDashoffset="-200"
              />
            </svg>

            {/* Floating Percentage Badges with Spec Shadows */}
            <div className="absolute top-2 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E0E0E0] text-xs font-bold text-[#080808] shadow-[0px_84px_159px_rgba(0,0,0,0.07)]">
              16%
            </div>
            <div className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E0E0E0] text-xs font-bold text-[#080808] shadow-[0px_84px_159px_rgba(0,0,0,0.07)]">
              24%
            </div>
            <div className="absolute bottom-2 left-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E0E0E0] text-xs font-bold text-[#080808] shadow-[0px_84px_159px_rgba(0,0,0,0.07)]">
              60%
            </div>

            {/* Center Content Text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#5654DC] tracking-tight">+14%</span>
              <span className="text-xs font-semibold text-[#080808]">vs last month</span>
              <span className="text-[10px] font-medium text-[#888888] mt-0.5">Great results</span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            {/* Item 1 */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-1 rounded-full bg-[#FF104B]" />
                <span className="font-medium text-[#888888]">Restorative Fillings</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-[#080808]">
                <span>54,071</span>
                <span className="text-[10px] text-[#888888] font-normal">sales</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-1 rounded-full bg-[#5654DC]" />
                <span className="font-medium text-[#888888]">Scaling &amp; Hygiene</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-[#080808]">
                <span>32,210</span>
                <span className="text-[10px] text-[#888888] font-normal">sales</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-1 rounded-full bg-[#00CBE8]" />
                <span className="font-medium text-[#888888]">Orthodontics &amp; Braces</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-[#080808]">
                <span>24,410</span>
                <span className="text-[10px] text-[#888888] font-normal">sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section 3: Financial Balance & Settlement Channels */}
      <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-[#5654DC]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="#5654DC" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" stroke="#5654DC" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#080808]">Practice Financial Balance</h3>
              <p className="text-xs text-[#888888]">Settlements by M-Pesa, SHA Insurance &amp; Private Payers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#080808]">$94,127</span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#00C26B] justify-end">
                <span className="rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-2 py-0.5">▲ +12% vs last years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channel 1: SHA Insurance */}
          <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#080808]">$52,000</span>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-bold text-[#00C26B]">
                ▲ 32.1%
              </span>
            </div>
            <div className="text-xs font-medium text-[#AFAFAF]">SHA Insurance Claims</div>
            <p className="text-[11px] text-[#888888]">Pre-authorized claim settlements</p>
          </div>

          {/* Channel 2: M-Pesa STK Push */}
          <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#080808]">$32,000</span>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-bold text-[#FF104B]">
                ▼ 16.1%
              </span>
            </div>
            <div className="text-xs font-medium text-[#AFAFAF]">M-Pesa STK Push</div>
            <p className="text-[11px] text-[#888888]">Direct till instant payouts</p>
          </div>

          {/* Channel 3: Private Cash */}
          <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#080808]">$12,500</span>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-[#888888]">
                Fixed income
              </span>
            </div>
            <div className="text-xs font-medium text-[#AFAFAF]">Private Payers &amp; Cash</div>
            <p className="text-[11px] text-[#888888]">Over the counter receipts</p>
          </div>
        </div>

        {/* Multi-color Progress Segment */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Settlement Progress (Feb 1 - Feb 28)</span>
            <span>100% Reconciled</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 flex gap-0.5">
            <div className="h-full bg-[#00CBE8]" style={{ width: '55%' }} title="SHA Insurance ($52,000)" />
            <div className="h-full bg-[#00C26B]" style={{ width: '34%' }} title="M-Pesa STK ($32,000)" />
            <div className="h-full bg-[#FFC600]" style={{ width: '11%' }} title="Cash & Cards ($12,500)" />
          </div>
        </div>
      </div>

      {/* Main Section 4: Operations & Sidebar Modules Quick Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Appointments Queue Table */}
        <div className="lg:col-span-2 rounded-[24px] border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">Today&apos;s Clinic Queue &amp; Appointments</h3>
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
              5 In Chair / Active
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Patient</th>
                  <th className="pb-2">Procedure &amp; Tooth</th>
                  <th className="pb-2">Dentist</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 font-bold text-slate-900">09:00 AM</td>
                  <td className="py-3 font-semibold text-slate-900">Wanjiku Kamau</td>
                  <td className="py-3 font-medium text-slate-700">Composite Filling <span className="text-slate-400 text-[10px]">(#16)</span></td>
                  <td className="py-3 text-slate-600">Dr. Darrell Steward</td>
                  <td className="py-3">
                    <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      In Treatment
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 font-bold text-slate-900">10:00 AM</td>
                  <td className="py-3 font-semibold text-slate-900">Brian Omondi</td>
                  <td className="py-3 font-medium text-slate-700">Scaling &amp; Polishing <span className="text-slate-400 text-[10px]">(Full Mouth)</span></td>
                  <td className="py-3 text-slate-600">Dr. Amina Patel</td>
                  <td className="py-3">
                    <span className="rounded-full bg-sky-100 border border-sky-200 px-2.5 py-0.5 text-[10px] font-extrabold text-sky-800">
                      Checked In
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 font-bold text-slate-900">11:30 AM</td>
                  <td className="py-3 font-semibold text-slate-900">Mercy Njeri</td>
                  <td className="py-3 font-medium text-slate-700">Root Canal Tx <span className="text-slate-400 text-[10px]">(#24)</span></td>
                  <td className="py-3 text-slate-600">Dr. Darrell Steward</td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-600">
                      Scheduled
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 font-bold text-slate-900">02:00 PM</td>
                  <td className="py-3 font-semibold text-slate-900">Kevin Mutua</td>
                  <td className="py-3 font-medium text-slate-700">Orthodontic Aligners <span className="text-slate-400 text-[10px]">(Upper Arc)</span></td>
                  <td className="py-3 text-slate-600">Dr. Amina Patel</td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-600">
                      Confirmed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Operations & Shortcuts */}
        <div className="space-y-5">
          {/* Quick Action Operations */}
          <div className="rounded-[24px] border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Clinic Fast Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => alert('Initiating Safaricom M-Pesa STK Push Billing...')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-[10px]">
                    M
                  </span>
                  <span>M-Pesa STK Push Payment</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">Fast Pay</span>
              </button>

              <button
                onClick={() => alert('Creating Kenya SHA Insurance Pre-Authorization Claim...')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/60 text-amber-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-600 text-white font-black text-[10px]">
                    S
                  </span>
                  <span>Kenya SHA Claim Validation</span>
                </div>
                <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold">SHA Pre-Auth</span>
              </button>

              <button
                onClick={() => alert('Opening Interactive FDI Dental Charting...')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-sky-50/70 hover:bg-sky-100/70 border border-sky-200/60 text-sky-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-600 text-white font-black text-[10px]">
                    F
                  </span>
                  <span>FDI Dental Chart (Odontogram)</span>
                </div>
                <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded-full font-bold">Chart</span>
              </button>
            </div>
          </div>

          {/* Dental Inventory Low Stock Alert Banner */}
          <div className="rounded-[24px] border border-amber-200/80 bg-amber-50/40 p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
              <HugeiconsIcon icon={AlertCircleIcon} size={16} className="text-amber-600 shrink-0" />
              <span>Dental Inventory Low Stock Alert</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed mb-3">
              3 Dental consumable items are below minimum reorder thresholds (3M Filtek Composite A2 &amp; Lidocaine Cartridges).
            </p>
            <button
              onClick={() => alert('Generating Dental Inventory Purchase Order...')}
              className="w-full rounded-xl bg-amber-600 px-3 py-1.5 text-center text-xs font-extrabold text-white shadow-2xs hover:bg-amber-700 cursor-pointer transition-colors"
            >
              Reorder Dental Supplies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 2. Patients View ───────────────────────────────────────────────────────
export function PatientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const patients = [
    { id: 'PAT-1082', name: 'Wanjiku Kamau', phone: '+254 712 345 678', age: 34, gender: 'Female', insurance: 'SHA / Jubilee Insurance', lastVisit: 'Today', status: 'Active' },
    { id: 'PAT-1081', name: 'Brian Omondi', phone: '+254 722 987 654', age: 29, gender: 'Male', insurance: 'AAR Healthcare', lastVisit: '10 Nov 2026', status: 'Active' },
    { id: 'PAT-1080', name: 'Mercy Njeri', phone: '+254 733 112 233', age: 42, gender: 'Female', insurance: 'Self Pay (M-Pesa)', lastVisit: '04 Oct 2026', status: 'Active' },
    { id: 'PAT-1079', name: 'Kevin Mutua', phone: '+254 701 445 566', age: 26, gender: 'Male', insurance: 'Britam Dental', lastVisit: '15 Sep 2026', status: 'Active' },
    { id: 'PAT-1078', name: 'Grace Chebet', phone: '+254 718 778 899', age: 38, gender: 'Female', insurance: 'SHA Direct', lastVisit: '01 Aug 2026', status: 'Follow Up' },
  ];

  const filtered = patients.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <ViewHeader
        title="Patients Directory"
        subtitle="Manage patient clinical files, medical histories, and contact profiles"
        actions={
          <button
            onClick={() => alert('Registering New Patient...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Add New Patient</span>
          </button>
        }
      />

      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name, file number, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-blue-600"
          />
        </div>
        <button className="flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer">
          <HugeiconsIcon icon={FilterIcon} size={14} />
          <span>Filter</span>
        </button>
      </div>

      <div className="rounded-lg border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="p-3">File ID</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Age / Gender</th>
              <th className="p-3">Insurance / Billing</th>
              <th className="p-3">Last Visit</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-blue-600">{p.id}</td>
                <td className="p-3 font-bold text-slate-900">{p.name}</td>
                <td className="p-3 font-medium text-slate-600">{p.phone}</td>
                <td className="p-3">{p.age} yrs / {p.gender}</td>
                <td className="p-3"><span className="rounded bg-blue-50 text-blue-800 px-2 py-0.5 text-[11px] font-semibold">{p.insurance}</span></td>
                <td className="p-3 text-slate-500">{p.lastVisit}</td>
                <td className="p-3">
                  <button
                    onClick={() => alert(`Opening Patient Profile: ${p.name}`)}
                    className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    View Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── 3. Appointments View ───────────────────────────────────────────────────
export function AppointmentsView() {
  return (
    <div className="space-y-6">
      <ViewHeader
        title="Appointments & Scheduling Calendar"
        subtitle="Clinic chair assignments, practitioner schedules, and appointment bookings"
        actions={
          <button
            onClick={() => alert('Booking New Appointment...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Book Appointment</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-sm font-bold text-slate-900">November 2026 — Weekly Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Chair 1 &amp; Chair 2 Active</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs border-b border-slate-200 pb-2 font-bold text-slate-500">
            <div>Mon 09</div>
            <div>Tue 10</div>
            <div className="text-blue-600">Wed 11 (Today)</div>
            <div>Thu 12</div>
            <div>Fri 13</div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="p-3 rounded bg-blue-50/70 border-l-4 border-blue-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">09:00 AM - 10:00 AM</span>
                <p className="text-slate-600">Wanjiku Kamau — Composite Filling (Chair 1)</p>
              </div>
              <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Confirmed</span>
            </div>
            <div className="p-3 rounded bg-sky-50/70 border-l-4 border-sky-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">10:30 AM - 11:30 AM</span>
                <p className="text-slate-600">Brian Omondi — Teeth Whitening &amp; Scaling (Chair 2)</p>
              </div>
              <span className="bg-sky-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Checked In</span>
            </div>
            <div className="p-3 rounded bg-emerald-50/70 border-l-4 border-emerald-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">02:00 PM - 03:00 PM</span>
                <p className="text-slate-600">Mercy Njeri — Root Canal Stage 1 (Chair 1)</p>
              </div>
              <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200/90 bg-white p-4 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Practitioners</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Dr. Darrell Steward</span>
              <span className="text-[11px] text-slate-500">Lead Endodontist (6 Appts)</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Dr. Amina Patel</span>
              <span className="text-[11px] text-slate-500">Orthodontist (5 Appts)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. FDI Dental Charting View ───────────────────────────────────────────
export function DentalChartingView() {
  const [selectedTooth, setSelectedTooth] = useState(16);
  const [condition, setCondition] = useState('Composite Filling');

  const teethUpperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const teethUpperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
  const teethLowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
  const teethLowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div className="space-y-6">
      <ViewHeader
        title="Interactive FDI Dental Charting (Odontogram)"
        subtitle="Patient: Wanjiku Kamau (File PAT-1082) — Upper & Lower Arch Odontogram"
        actions={
          <button
            onClick={() => alert(`Saved charting for Tooth #${selectedTooth}: ${condition}`)}
            className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer"
          >
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
            <span>Save Chart Record</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Odontogram Grid */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              MAXILLARY ARCH (UPPER TEETH)
            </span>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...teethUpperRight, ...teethUpperLeft].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                    selectedTooth === t
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                      : t === 16 || t === 24
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px]">{t}</span>
                  <span className="text-[9px] font-extrabold">{t === 16 ? 'F' : t === 24 ? 'RCT' : 'OK'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              MANDIBULAR ARCH (LOWER TEETH)
            </span>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...teethLowerRight, ...teethLowerLeft].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                    selectedTooth === t
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[9px] font-extrabold">OK</span>
                  <span className="text-[10px]">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Tooth Inspector */}
        <div className="rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Selected Tooth #{selectedTooth} Details
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tooth Condition / Diagnosis</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="Healthy / Intact">Healthy / Intact</option>
                <option value="Composite Filling">Composite Filling</option>
                <option value="Dental Caries (Cavity)">Dental Caries (Cavity)</option>
                <option value="Root Canal Required">Root Canal Required</option>
                <option value="Crown / Cap">Crown / Cap</option>
                <option value="Extracted / Missing">Extracted / Missing</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Clinical Procedure Note</label>
              <textarea
                rows={3}
                placeholder="Enter clinical notes for Tooth #..."
                className="w-full rounded border border-slate-300 p-2 text-xs focus:outline-none focus:border-blue-600"
                defaultValue="Mesial-occlusal composite restoration completed under local anaesthesia."
              />
            </div>

            <button
              onClick={() => alert(`Saved Tooth #${selectedTooth} record`)}
              className="w-full rounded bg-blue-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Update Tooth #{selectedTooth}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Invoices & M-Pesa STK Push Billing View ──────────────────────────────
export function InvoicesView() {
  const [stkPhone, setStkPhone] = useState('0712345678');
  const [stkAmount, setStkAmount] = useState('6500');
  const [loadingStk, setLoadingStk] = useState(false);

  const handleSendStk = (e) => {
    e.preventDefault();
    setLoadingStk(true);
    setTimeout(() => {
      setLoadingStk(false);
      alert(`M-Pesa STK Push sent successfully to ${stkPhone} for KES ${stkAmount}!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <ViewHeader
        title="Invoices & Safaricom M-Pesa Billing"
        subtitle="Manage billing, create patient invoices, and trigger instant M-Pesa STK Push prompts"
        actions={
          <button
            onClick={() => alert('Creating New Invoice...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Create Invoice</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Recent Patient Invoices</h2>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-2.5">Invoice #</th>
                <th className="p-2.5">Patient</th>
                <th className="p-2.5">Amount (KES)</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-2.5 font-bold text-blue-600">INV-2026-091</td>
                <td className="p-2.5 font-bold text-slate-900">Wanjiku Kamau</td>
                <td className="p-2.5 font-extrabold text-slate-900">6,500</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">Pending Payment</span></td>
                <td className="p-2.5">
                  <button onClick={() => alert('Triggering STK Push...')} className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer">STK Push</button>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-blue-600">INV-2026-090</td>
                <td className="p-2.5 font-bold text-slate-900">Brian Omondi</td>
                <td className="p-2.5 font-extrabold text-slate-900">12,000</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Paid via M-Pesa</span></td>
                <td className="p-2.5">
                  <button onClick={() => alert('Printing Receipt...')} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold hover:bg-slate-200 cursor-pointer">Receipt</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* M-Pesa STK Push Box */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-200/80 pb-2">
            <HugeiconsIcon icon={Money01Icon} size={20} className="text-emerald-600" />
            <h3 className="text-sm font-bold">Safaricom M-Pesa STK Push</h3>
          </div>
          <form onSubmit={handleSendStk} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">M-Pesa Phone Number</label>
              <input
                type="text"
                value={stkPhone}
                onChange={(e) => setStkPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Amount (KES)</label>
              <input
                type="number"
                value={stkAmount}
                onChange={(e) => setStkAmount(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>
            <button
              type="submit"
              disabled={loadingStk}
              className="w-full rounded bg-emerald-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer disabled:opacity-50"
            >
              {loadingStk ? 'Sending Prompt to Phone…' : 'Trigger M-Pesa Prompt'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── 6. Generic Feature View (for all remaining routes) ──────────────────────
export function GenericFeatureView({ title, description, badge = 'Active Module' }) {
  return (
    <div className="space-y-6">
      <ViewHeader
        title={title}
        subtitle={description}
        actions={
          <button
            onClick={() => alert(`Performing action on ${title}...`)}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Add Item</span>
          </button>
        }
      />

      <div className="rounded-lg border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{title} Workspace Data</span>
            <span className="rounded bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-bold uppercase">{badge}</span>
          </div>
          <span className="text-xs text-slate-500">Avicena Dental Practice</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {description} Module is connected to your clinic workspace. All transactions, records, and updates sync automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Entries</span>
            <span className="block text-lg font-extrabold text-slate-900 mt-1">128 Items</span>
          </div>
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sync Status</span>
            <span className="block text-lg font-extrabold text-emerald-600 mt-1">Live &amp; Synced</span>
          </div>
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Branch</span>
            <span className="block text-lg font-extrabold text-blue-600 mt-1">Nairobi Main</span>
          </div>
        </div>
      </div>
    </div>
  );
}
