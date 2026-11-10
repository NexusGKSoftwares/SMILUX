import React from 'react';
import PropTypes from 'prop-types';
import { salesAreaChartData, webAnalyticsData } from '../../pages/data.js';

// ─── Shared Card Header Wireframe Chrome ───────────────────────────────────
function CardHeaderWireframe({
  iconTint = 'animate-shimmer-indigo',
  titleWidth = 'w-32',
  iconSvg,
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${iconTint}`}
        >
          {iconSvg}
        </div>
        <div className={`h-4 ${titleWidth} rounded animate-shimmer`} />
        {/* InfoBadgeIcon Wireframe Circle */}
        <div className="h-[15px] w-[15px] rounded-full animate-shimmer shrink-0" />
      </div>

      {/* CardActionToolbar Wireframe (Expand + Divider + Menu Dots) */}
      <div className="inline-flex h-7 items-center gap-2 rounded border border-[#E0E0E0] bg-white px-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <div className="h-3 w-3 rounded animate-shimmer" />
        <span className="h-3.5 w-px bg-[#EFEFEF]" />
        <div className="flex items-center gap-0.5">
          <span className="h-1 w-1 rounded-full bg-slate-300 animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-slate-300 animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-slate-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ─── 1:1 Dashboard Wireframe Shimmer Loader ─────────────────────────────────
export function DashboardWireframeSkeleton({
  isHolding: _isHolding = false,
  onToggleHold: _onToggleHold,
  onSkipToLive: _onSkipToLive,
}) {
  const activeSalesPt = salesAreaChartData.months[5]; // Jun
  void webAnalyticsData.bars[5]; // Jun - reserved for future patient bar chart

  const incomeExpenseWireframeMonths = [
    { month: 'JAN', incomeH: 88, expenseH: 34 },
    { month: 'FEB', incomeH: 108, expenseH: 62 },
    { month: 'MAR', incomeH: 175, expenseH: 66, active: true },
    { month: 'APR', incomeH: 128, expenseH: 50 },
    { month: 'MAY', incomeH: 116, expenseH: 88 },
    { month: 'JUN', incomeH: 116, expenseH: 94 },
    { month: 'JUL', incomeH: 98, expenseH: 44 },
    { month: 'AUG', incomeH: 122, expenseH: 68 },
    { month: 'SEP', incomeH: 156, expenseH: 72 },
    { month: 'OCT', incomeH: 136, expenseH: 56 },
    { month: 'NOV', incomeH: 124, expenseH: 82 },
    { month: 'DEC', incomeH: 148, expenseH: 90 },
  ].map((m, idx) => ({
    ...m,
    xGroup: 64 + idx * 50,
  }));

  const expenseRingSegments = [
    { id: 'internet', color: '#9353D3', rot: -82, len: 196, w: 'w-20', pctW: 'w-8' },
    { id: 'electricity', color: '#8CE95A', rot: 72, len: 112, w: 'w-24', pctW: 'w-8' },
    { id: 'transactions', color: '#29B6F6', rot: 162, len: 88, w: 'w-24', pctW: 'w-8' },
    { id: 'rental', color: '#EC006C', rot: 233, len: 28, w: 'w-20', pctW: 'w-6' },
    { id: 'foods', color: '#FF6B00', rot: 259, len: 10, w: 'w-14', pctW: 'w-6' },
    { id: 'other', color: '#FFC107', rot: 271, len: 5, w: 'w-12', pctW: 'w-6' },
  ];

  return (
    <div
      className="space-y-2 font-sans text-slate-900 mb-8 select-none"
      role="status"
      aria-busy="true"
      aria-label="Loading clinic dashboard analytics wireframe"
    >
      {/* ── 0. Workspace Header & Action Bar Wireframe ─────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-1.5 mb-1">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-64 sm:w-72 rounded animate-shimmer" />

          </div>
          <div className="h-3.5 w-80 max-w-full rounded animate-shimmer mt-1.5" />
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Date Filter Pill Wireframe (4 Timeframe Segments) */}
          <div className="flex items-center gap-1 rounded border border-slate-200 bg-white p-0.5 shadow-2xs">
            <div className="h-6 w-12 rounded animate-shimmer" />
            <div className="h-6 w-16 rounded animate-shimmer" />
            <div className="h-6 w-20 rounded animate-shimmer-dark" />
            <div className="h-6 w-16 rounded animate-shimmer" />
          </div>

          {/* Refresh Button Wireframe */}
          <div className="inline-flex h-8 items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-1.5 shadow-2xs">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-brand-green border-t-transparent animate-spin" />
            <div className="h-3.5 w-12 rounded animate-shimmer" />
          </div>

          {/* Reports Primary Button Wireframe */}
          <div className="inline-flex h-8 items-center gap-1.5 rounded bg-gradient-primary-vertical px-3.5 py-1.5 opacity-85">
            <div className="h-3.5 w-3.5 rounded bg-white/40 animate-pulse" />
            <div className="h-3.5 w-12 rounded bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── 1. KPI Top Cards Row (4 Cards Matching Exact 24px Spec) ─────────── */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            id: 'rev',
            titleW: 'w-28',
            valW: 'w-36',
            subW: 'w-36',
            iconBox: 'bg-emerald-50/80 border-emerald-100',
            iconShimmer: 'animate-shimmer-emerald',
            badgeBox: 'bg-[#E2FFF3]/70 border-[#6EEABB]/60',
            badgeShimmer: 'animate-shimmer-emerald',
          },
          {
            id: 'appt',
            titleW: 'w-32',
            valW: 'w-28',
            subW: 'w-28',
            iconBox: 'bg-blue-50/80 border-blue-100',
            iconShimmer: 'animate-shimmer-indigo',
            badgeBox: 'bg-[#E2FFF3]/70 border-[#6EEABB]/60',
            badgeShimmer: 'animate-shimmer-emerald',
          },
          {
            id: 'sha',
            titleW: 'w-36',
            valW: 'w-24',
            subW: 'w-28',
            iconBox: 'bg-amber-50/80 border-amber-100',
            iconShimmer: 'animate-shimmer-amber',
            badgeBox: 'bg-[#FFF3E0]/80 border-[#FFE0B2]/70',
            badgeShimmer: 'animate-shimmer-amber',
          },
          {
            id: 'plans',
            titleW: 'w-32',
            valW: 'w-24',
            subW: 'w-32',
            iconBox: 'bg-sky-50/80 border-sky-100',
            iconShimmer: 'animate-shimmer-cyan',
            badgeBox: 'bg-[#E2FFF3]/70 border-[#6EEABB]/60',
            badgeShimmer: 'animate-shimmer-emerald',
          },
        ].map((kpi) => (
          <div
            key={kpi.id}
            className="rounded border border-[#EFEFEF] bg-white p-3 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between">
              <div className={`h-3.5 ${kpi.titleW} rounded animate-shimmer`} />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded border ${kpi.iconBox}`}
              >
                <div className={`h-4 w-4 rounded ${kpi.iconShimmer}`} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <div className={`h-7 ${kpi.valW} rounded animate-shimmer`} />
                <div className={`mt-1.5 h-3 ${kpi.subW} rounded animate-shimmer`} />
              </div>
              <div
                className={`flex h-6 w-20 items-center justify-center rounded-full border px-2.5 py-1 ${kpi.badgeBox}`}
              >
                <div className={`h-2.5 w-14 rounded-full ${kpi.badgeShimmer}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. Main Analytics Row: Sales Area Chart + Patient Growth Bar Chart ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {/* Column 1: Sales Area & Smooth Cubic Bezier Line Chart Wireframe */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-indigo"
              titleWidth="w-28"
            />

            {/* Total Profit Value Block Wireframe */}
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex flex-col">
                <div className="h-3 w-32 rounded animate-shimmer" />
                <div className="mt-1.5 h-7 w-40 rounded animate-shimmer" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-14 rounded animate-shimmer" />
                <div className="h-3.5 w-24 rounded animate-shimmer-indigo" />
              </div>
            </div>
          </div>

          {/* Smooth Line & Area Graph Wireframe (Exact viewBox="20 214 674 258") */}
          <div className="w-full flex-1 flex items-end overflow-hidden">
            <svg viewBox="20 214 674 258" fill="none" className="w-full h-auto block">
              <defs>
                {/* Animated Shimmer Sweep Gradient for Smooth Bezier Stroke */}
                <linearGradient
                  id="shimmerSalesLineGrad"
                  x1="0%"
                  y1="0%"
                  x2="200%"
                  y2="0%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FF4049" stopOpacity="0.28" />
                  <stop offset="45%" stopColor="#5654DC" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="#A5B4FC" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#5654DC" stopOpacity="0.28" />
                  <animate
                    attributeName="x1"
                    values="-100%;100%"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="100%;300%"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </linearGradient>

                {/* Animated Shimmer Sweep for Area Fill Under Curve */}
                <linearGradient
                  id="shimmerSalesAreaHoriz"
                  x1="0%"
                  y1="0%"
                  x2="200%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#FF4049" stopOpacity="0.06" />
                  <stop offset="50%" stopColor="#5654DC" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#5654DC" stopOpacity="0.05" />
                  <animate
                    attributeName="x1"
                    values="-100%;100%"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="100%;300%"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </linearGradient>

                <linearGradient
                  id="shimmerSalesVertMask"
                  x1="0"
                  y1="276"
                  x2="0"
                  y2="431"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="40%" stopColor="white" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="shimmerSalesAreaFadeMask">
                  <rect
                    x="70"
                    y="220"
                    width="625"
                    height="215"
                    fill="url(#shimmerSalesVertMask)"
                  />
                </mask>
              </defs>

              {/* 4 Dashed Horizontal Grid Lines */}
              {[224, 276, 328, 380].map((yPos) => (
                <line
                  key={yPos}
                  x1="72"
                  y1={yPos}
                  x2="692"
                  y2={yPos}
                  stroke="#E5E7EB"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Y-Axis Label Skeleton Pills */}
              {[224, 276, 328, 380, 431].map((yPos, idx) => (
                <rect
                  key={yPos}
                  x={idx === 4 ? 46 : 28}
                  y={yPos - 5}
                  width={idx === 4 ? 16 : 34}
                  height="11"
                  rx="3.5"
                  fill="#E2E8F0"
                >
                  <animate
                    attributeName="opacity"
                    values="0.45;0.9;0.45"
                    dur="1.6s"
                    begin={`${idx * 0.12}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}

              {/* Shimmering Area Under Smooth Cubic Bezier Curve */}
              <path
                d={salesAreaChartData.areaPath}
                fill="url(#shimmerSalesAreaHoriz)"
                mask="url(#shimmerSalesAreaFadeMask)"
              />

              {/* Shimmering Smooth Cubic Bezier Curve */}
              <path
                d={salesAreaChartData.linePath}
                stroke="url(#shimmerSalesLineGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* X-Axis Baseline */}
              <line x1="72" y1="431" x2="692" y2="431" stroke="#E5E7EB" strokeWidth="1.5" />

              {/* Vertical Dashed Indicator Line at Active Month (Jun) */}
              <line
                x1={activeSalesPt.x}
                y1="252"
                x2={activeSalesPt.x}
                y2="431"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />

              {/* Pulsing Halo + Active Point Circle on Smooth Curve */}
              <circle
                cx={activeSalesPt.x}
                cy={activeSalesPt.y}
                r="9"
                fill="#5654DC"
                fillOpacity="0.16"
              >
                <animate
                  attributeName="r"
                  values="5;11;5"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fillOpacity"
                  values="0.28;0.06;0.28"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={activeSalesPt.x}
                cy={activeSalesPt.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#5654DC"
                strokeWidth="2.5"
              />

              {/* Floating Dark Tooltip Badge Skeleton */}
              <g transform={`translate(${activeSalesPt.x - 45}, 224)`}>
                <rect width="90" height="24" rx="4" fill="#1E293B" fillOpacity="0.88" />
                <rect x="18" y="8" width="54" height="8" rx="4" fill="#94A3B8" fillOpacity="0.65">
                  <animate
                    attributeName="opacity"
                    values="0.45;0.95;0.45"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>

              {/* 12 X-Axis Month Pill Wireframes (Jan .. Dec) */}
              {salesAreaChartData.months.map((m, idx) => {
                const isSelected = m.month === 'Jun';
                return (
                  <g key={m.month}>
                    {isSelected && (
                      <rect
                        x={m.x - 22}
                        y="444"
                        width="44"
                        height="24"
                        rx="12"
                        fill="#F1F5F9"
                      />
                    )}
                    <rect
                      x={m.x - 12}
                      y="451"
                      width="24"
                      height="10"
                      rx="3.5"
                      fill={isSelected ? '#64748B' : '#CBD5E1'}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.45;0.9;0.45"
                        dur="1.6s"
                        begin={`${idx * 0.08}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Column 2: Patient Growth Overview 12-Month Bar Chart Wireframe */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-amber"
              titleWidth="w-44"
            />

            {/* 3 Metrics Overview Columns Wireframe */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { id: 'm1', positive: true },
                { id: 'm2', positive: true },
                { id: 'm3', positive: false },
              ].map((m) => (
                <div key={m.id} className="flex flex-col">
                  <div className="h-3 w-24 rounded animate-shimmer" />
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="h-6 w-14 rounded animate-shimmer" />
                    <div
                      className={`h-4 w-11 rounded-full border ${m.positive
                          ? 'bg-[#E8FFF4]/80 border-[#8FE7BE]/60 animate-shimmer-emerald'
                          : 'bg-[#FFEAEA]/80 border-[#FF9F9D]/60 animate-shimmer-rose'
                        }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12-Month Bar Chart Wireframe (Exact viewBox="28 220 674 258") */}
          <div className="w-full flex-1 flex items-end overflow-hidden">
            <svg viewBox="28 220 674 258" fill="none" className="w-full h-auto block">
              <defs>
                <linearGradient id="shimmerAmberBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9F0A" stopOpacity="0.48" />
                  <stop offset="100%" stopColor="#FF9F0A" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient id="shimmerAmberBarActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E08600" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="#FF9F0A" stopOpacity="0.32" />
                </linearGradient>
              </defs>

              {/* 4 Dashed Horizontal Grid Lines */}
              {[234, 286, 338, 390].map((yPos) => (
                <line
                  key={yPos}
                  x1="78"
                  y1={yPos}
                  x2="700"
                  y2={yPos}
                  stroke="#E5E7EB"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Y-Axis Label Skeleton Pills */}
              {[234, 286, 338, 390, 442].map((yPos, idx) => (
                <rect
                  key={yPos}
                  x={idx === 4 ? 45 : 32}
                  y={yPos - 5}
                  width={idx === 4 ? 16 : 29}
                  height="11"
                  rx="3.5"
                  fill="#E2E8F0"
                >
                  <animate
                    attributeName="opacity"
                    values="0.45;0.9;0.45"
                    dur="1.6s"
                    begin={`${idx * 0.12}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}

              {/* 12 Monthly Rounded Orange Shimmer Bars */}
              {webAnalyticsData.bars.map((bar, idx) => {
                const isActive = bar.month === 'Jun';
                return (
                  <g key={bar.month}>
                    <rect
                      x={bar.x}
                      y={bar.y}
                      width="26"
                      height={bar.height}
                      rx="8"
                      fill={isActive ? 'url(#shimmerAmberBarActive)' : 'url(#shimmerAmberBar)'}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.45;0.95;0.45"
                        dur="1.5s"
                        begin={`${idx * 0.09}s`}
                        repeatCount="indefinite"
                      />
                    </rect>

                    {/* Floating Tooltip Skeleton on Active Bar (Jun) */}
                    {isActive && (
                      <g transform={`translate(${bar.xCenter - 32}, ${bar.y - 28})`}>
                        <rect width="64" height="22" rx="4" fill="#1E293B" fillOpacity="0.88" />
                        <rect x="13" y="7" width="38" height="8" rx="4" fill="#F8FAFC" fillOpacity="0.65" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Solid X-Axis Baseline */}
              <line x1="78" y1="441.5" x2="700" y2="441.5" stroke="#E9E9E9" strokeWidth="1" />

              {/* 12 Monthly X-Axis Pill Wireframes */}
              {webAnalyticsData.xAxisLabels.map((item, idx) => {
                const isSelected = item.label === 'Jun';
                return (
                  <g key={item.label}>
                    {isSelected && (
                      <rect
                        x={item.x - 22}
                        y="451"
                        width="44"
                        height="24"
                        rx="12"
                        fill="#F1F5F9"
                      />
                    )}
                    <rect
                      x={item.x - 12}
                      y="458"
                      width="24"
                      height="10"
                      rx="3.5"
                      fill={isSelected ? '#64748B' : '#CBD5E1'}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.45;0.9;0.45"
                        dur="1.6s"
                        begin={`${idx * 0.08}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ── 3. Secondary Row: 3 Analytics Cards (Payment, Income, Balance) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Card 1: Payment Distribution Overview (Donut Chart Wireframe) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-cyan"
              titleWidth="w-40"
            />

            {/* Top Summaries Row (2 Mini Cards) */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3">
                <div className="h-3 w-28 rounded animate-shimmer" />
                <div className="mt-1.5 flex items-baseline gap-2">
                  <div className="h-6 w-12 rounded animate-shimmer" />
                  <div className="h-4 w-14 rounded border border-slate-200 bg-white animate-shimmer-emerald" />
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 flex gap-0.5">
                  <div className="h-full bg-[#00CBE8]/45 animate-pulse" style={{ width: '60%' }} />
                  <div className="h-full bg-[#5654DC]/45 animate-pulse" style={{ width: '24%' }} />
                  <div className="h-full bg-[#FB3B52]/45 animate-pulse" style={{ width: '16%' }} />
                </div>
              </div>

              <div className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3">
                <div className="h-3 w-24 rounded animate-shimmer" />
                <div className="mt-1.5 flex items-baseline gap-2">
                  <div className="h-6 w-20 rounded animate-shimmer" />
                  <div className="h-3 w-8 rounded animate-shimmer" />
                </div>
                <div className="mt-2.5 h-3 w-32 rounded animate-shimmer-cyan" />
              </div>
            </div>

            {/* Donut Chart Visual & Channel Breakdown Wireframe (Exact viewBox="65 60 625 345") */}
            <div className="w-full flex-1 flex items-center justify-center py-1 overflow-hidden">
              <svg viewBox="65 60 625 345" fill="none" className="w-full h-auto block">
                <defs>
                  <filter id="shimmerPieBadgeShadow" x="0" y="0" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* 16% Red Arc (#FB3B52) Wireframe */}
                <path
                  d="M160.443 114.178C159.429 112.215 160.196 109.797 162.185 108.836C183.475 98.5506 206.926 93.4712 230.601 94.0435C254.276 94.6158 277.454 100.822 298.222 112.124C300.162 113.18 300.811 115.633 299.704 117.544L288.773 136.406C287.665 138.317 285.221 138.962 283.273 137.919C266.84 129.119 248.554 124.286 229.881 123.835C211.208 123.383 192.709 127.327 175.87 135.323C173.874 136.271 171.464 135.508 170.45 133.545L160.443 114.178Z"
                  fill="#FB3B52"
                  fillOpacity="0.35"
                >
                  <animate attributeName="fillOpacity" values="0.22;0.52;0.22" dur="1.7s" repeatCount="indefinite" />
                </path>

                {/* 24% Purple Arc (#5654D4) Wireframe */}
                <path
                  d="M305.526 121.104C306.722 119.247 309.201 118.707 311.026 119.952C338.558 138.753 359.025 166.273 369.086 198.139C379.147 230.004 378.194 264.288 366.448 295.489C365.67 297.557 363.331 298.538 361.285 297.705L341.096 289.48C339.05 288.647 338.074 286.314 338.838 284.242C347.969 259.482 348.637 232.348 340.669 207.111C332.701 181.874 316.573 160.043 294.88 145.015C293.064 143.757 292.523 141.287 293.72 139.43L305.526 121.104Z"
                  fill="#5654D4"
                  fillOpacity="0.35"
                >
                  <animate attributeName="fillOpacity" values="0.22;0.52;0.22" dur="1.7s" begin="0.3s" repeatCount="indefinite" />
                </path>

                {/* 60% Cyan Arc (#3FC8E4) Wireframe */}
                <path
                  d="M359.027 302.949C361.039 303.862 361.934 306.236 360.967 308.222C351.273 328.134 337.254 345.65 319.915 359.481C301.533 374.144 279.942 384.248 256.907 388.968C233.872 393.687 210.046 392.888 187.379 386.636C164.712 380.383 143.846 368.855 126.488 352.993C109.13 337.131 95.7728 317.386 87.5078 295.373C79.2428 273.36 76.305 249.703 78.9347 226.337C81.5644 202.97 89.6868 180.558 102.638 160.933C114.854 142.421 131.039 126.884 149.999 115.439C151.89 114.297 154.334 114.976 155.425 116.897L166.186 135.856C167.276 137.777 166.599 140.213 164.715 141.367C149.842 150.482 137.136 162.759 127.51 177.346C117.149 193.047 110.652 210.976 108.548 229.669C106.444 248.362 108.794 267.288 115.406 284.898C122.018 302.509 132.704 318.305 146.591 330.994C160.477 343.684 177.17 352.906 195.303 357.909C213.437 362.911 232.497 363.55 250.925 359.774C269.354 355.999 286.627 347.915 301.332 336.185C314.994 325.287 326.08 311.528 333.821 295.896C334.801 293.916 337.166 293.022 339.177 293.936L359.027 302.949Z"
                  fill="#3FC8E4"
                  fillOpacity="0.35"
                >
                  <animate attributeName="fillOpacity" values="0.22;0.52;0.22" dur="1.7s" begin="0.6s" repeatCount="indefinite" />
                </path>

                {/* 3 Floating Circular Percentage Badge Skeletons */}
                {[
                  { x: 207, y: 68 },
                  { x: 346, y: 157 },
                  { x: 78, y: 304 },
                ].map((b, i) => (
                  <g key={i} filter="url(#shimmerPieBadgeShadow)">
                    <rect x={b.x} y={b.y} width="40" height="40" rx="20" fill="white" stroke="#E2E8F0" />
                    <rect x={b.x + 9} y={b.y + 15} width="22" height="10" rx="4" fill="#CBD5E1" />
                  </g>
                ))}

                {/* Center Cutout Text Wireframe */}
                <rect x="197" y="213" width="76" height="24" rx="6" fill="#5654D4" fillOpacity="0.22" />
                <rect x="191" y="246" width="88" height="12" rx="4" fill="#CBD5E1" />
                <rect x="195" y="266" width="80" height="10" rx="4" fill="#E2E8F0" />

                {/* Right Channel Breakdown List (3 Items) */}
                {[
                  { y: 132, color: '#FB3B52', w1: 112, w2: 96 },
                  { y: 220, color: '#5654D4', w1: 104, w2: 92 },
                  { y: 308, color: '#3FC8E4', w1: 122, w2: 100 },
                ].map((row, idx) => (
                  <g key={idx}>
                    <rect x="475" y={row.y} width="4" height="26" rx="2" fill={row.color} fillOpacity="0.6" />
                    <rect x="490" y={row.y + 1} width={row.w1} height="12" rx="4" fill="#CBD5E1">
                      <animate attributeName="opacity" values="0.45;0.9;0.45" dur="1.5s" begin={`${idx * 0.2}s`} repeatCount="indefinite" />
                    </rect>
                    <rect x="490" y={row.y + 19} width={row.w2} height="10" rx="3.5" fill="#E2E8F0" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Income Summary (Concentric Nested Radial Gauge Rings Wireframe) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-amber"
              titleWidth="w-36"
            />

            {/* Top Summaries Row (2 Mini Cards) */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3">
                <div className="h-3 w-28 rounded animate-shimmer" />
                <div className="mt-1.5 flex items-baseline gap-2">
                  <div className="h-6 w-24 rounded animate-shimmer" />
                  <div className="h-4 w-12 rounded animate-shimmer-emerald" />
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 flex gap-0.5">
                  <div className="h-full bg-[#00C26B]/50 animate-pulse" style={{ width: '45%' }} />
                  <div className="h-full bg-[#FF9900]/50 animate-pulse" style={{ width: '35%' }} />
                  <div className="h-full bg-[#FFDC8E]/70 animate-pulse" style={{ width: '20%' }} />
                </div>
              </div>

              <div className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3">
                <div className="h-3 w-28 rounded animate-shimmer" />
                <div className="mt-1.5 flex items-baseline gap-2">
                  <div className="h-6 w-16 rounded animate-shimmer" />
                  <div className="h-3 w-12 rounded animate-shimmer-emerald" />
                </div>
                <div className="mt-2.5 h-3 w-32 rounded animate-shimmer" />
              </div>
            </div>

            {/* Concentric Nested Radial Gauge Rings Wireframe */}
            <div className="relative flex items-center justify-center py-2">
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 120 120">
                {/* Outer Ring - Green (#00C26B) */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#00C26B"
                  strokeOpacity="0.4"
                  strokeWidth="8"
                  strokeDasharray="314"
                  strokeDashoffset="78"
                  strokeLinecap="round"
                >
                  <animate attributeName="strokeOpacity" values="0.22;0.58;0.22" dur="1.6s" repeatCount="indefinite" />
                </circle>

                {/* Middle Ring - Orange (#FF9900) */}
                <circle cx="60" cy="60" r="38" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="38"
                  fill="none"
                  stroke="#FF9900"
                  strokeOpacity="0.42"
                  strokeWidth="8"
                  strokeDasharray="238"
                  strokeDashoffset="95"
                  strokeLinecap="round"
                >
                  <animate attributeName="strokeOpacity" values="0.22;0.58;0.22" dur="1.6s" begin="0.25s" repeatCount="indefinite" />
                </circle>

                {/* Inner Ring - Soft Yellow (#FFDC8E) */}
                <circle cx="60" cy="60" r="26" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="26"
                  fill="none"
                  stroke="#FFDC8E"
                  strokeOpacity="0.65"
                  strokeWidth="8"
                  strokeDasharray="163"
                  strokeDashoffset="65"
                  strokeLinecap="round"
                >
                  <animate attributeName="strokeOpacity" values="0.35;0.78;0.35" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
                </circle>
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center gap-1">
                <div className="h-5 w-12 rounded animate-shimmer" />
                <div className="h-2.5 w-14 rounded animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Breakdown Mini Cards & Footer Wireframe */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-2">
              {[
                { dot: 'bg-[#00C26B]', tint: 'animate-shimmer-emerald' },
                { dot: 'bg-[#FF9900]', tint: 'animate-shimmer-amber' },
                { dot: 'bg-[#FFE88C]', tint: 'animate-shimmer' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-2.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${item.dot} opacity-70`} />
                    <div className="h-2.5 w-14 rounded animate-shimmer" />
                  </div>
                  <div className="mt-1.5 h-3.5 w-16 rounded animate-shimmer" />
                  <div className={`mt-1 h-2.5 w-12 rounded ${item.tint}`} />
                </div>
              ))}
            </div>
            <div className="h-3 w-48 mx-auto rounded animate-shimmer mt-1" />
          </div>
        </div>

        {/* Card 3: Practice Financial Balance (Horizontal Segmented Bar Chart Wireframe) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-cyan"
              titleWidth="w-36"
            />

            {/* Practice Financial Balance SVG Wireframe (Exact viewBox="20 100 510 315") */}
            <div className="w-full flex-1 flex items-center justify-center py-1 overflow-hidden">
              <svg viewBox="20 100 510 315" fill="none" className="w-full h-auto block">
                {/* Total Settled Balance Metric Bar */}
                <rect x="32" y="108" width="168" height="28" rx="6" fill="#CBD5E1">
                  <animate attributeName="opacity" values="0.45;0.9;0.45" dur="1.6s" repeatCount="indefinite" />
                </rect>

                {/* ▲ 12% vs last years pill badge wireframe */}
                <rect x="32" y="146" width="62" height="24" rx="12" fill="#E8FFF4" stroke="#8FE7BE" strokeOpacity="0.7" />
                <rect x="44" y="154" width="38" height="8" rx="4" fill="#1DBF73" fillOpacity="0.45" />
                <rect x="104" y="152" width="76" height="12" rx="4" fill="#E2E8F0" />

                {/* 3 Dashed Vertical Grid Lines */}
                <line x1="32" y1="195" x2="32" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                <line x1="190" y1="195" x2="190" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                <line x1="376" y1="195" x2="376" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />

                {/* Column 1: Primary Care */}
                <rect x="44" y="216" width="96" height="18" rx="4" fill="#CBD5E1" />
                <rect x="44" y="244" width="76" height="12" rx="3.5" fill="#E2E8F0" />
                <circle cx="52" cy="318" r="8" fill="#E8FFF4" />
                <rect x="66" y="312" width="42" height="12" rx="4" fill="#1DBF73" fillOpacity="0.35" />

                {/* Column 2: Speciality Care */}
                <rect x="202" y="216" width="96" height="18" rx="4" fill="#CBD5E1" />
                <rect x="202" y="244" width="68" height="12" rx="3.5" fill="#E2E8F0" />
                <circle cx="210" cy="318" r="8" fill="#FFEFEF" />
                <rect x="224" y="312" width="42" height="12" rx="4" fill="#FB3B52" fillOpacity="0.35" />

                {/* Column 3: Full-time Retainer */}
                <rect x="388" y="216" width="92" height="18" rx="4" fill="#CBD5E1" />
                <rect x="388" y="244" width="64" height="12" rx="3.5" fill="#E2E8F0" />
                <rect x="388" y="312" width="78" height="12" rx="4" fill="#E2E8F0" />

                {/* 3-Color Segmented Horizontal Progress Bar (Exact Figma Coordinates) */}
                <rect x="32" y="352" width="156" height="22" rx="4" fill="#FFC90A" fillOpacity="0.45">
                  <animate attributeName="fillOpacity" values="0.28;0.62;0.28" dur="1.5s" repeatCount="indefinite" />
                </rect>
                <rect x="192" y="352" width="182" height="22" rx="4" fill="#1DBF73" fillOpacity="0.45">
                  <animate attributeName="fillOpacity" values="0.28;0.62;0.28" dur="1.5s" begin="0.25s" repeatCount="indefinite" />
                </rect>
                <rect x="378" y="352" width="142" height="22" rx="4" fill="#3FC8E4" fillOpacity="0.45">
                  <animate attributeName="fillOpacity" values="0.28;0.62;0.28" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                </rect>

                {/* Footer Date Timeline Pills */}
                <rect x="32" y="389" width="28" height="12" rx="3.5" fill="#CBD5E1" />
                <rect x="480" y="389" width="40" height="12" rx="3.5" fill="#CBD5E1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Expenses Overview & Income & Expense Comparison (2-Card Row) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {/* Card 1: Expenses Overview Wireframe */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-purple"
              titleWidth="w-28"
            />

            {/* Middle Section: Multi-Segment Rounded Donut Ring + Right Category Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-2">
              {/* Left Donut Chart with Inner Dashed Tick Ring */}
              <div className="sm:col-span-6 flex items-center justify-center">
                <svg viewBox="0 0 220 220" className="w-52 h-52 block">
                  <circle cx="110" cy="110" r="80" fill="none" stroke="#F8FAFC" strokeWidth="14" />
                  <circle cx="110" cy="110" r="65" fill="none" stroke="#F1F5F9" strokeWidth="5" />
                  <circle
                    cx="110"
                    cy="110"
                    r="57"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                    strokeDasharray="1.5 3.6"
                  />

                  {/* 6 Rounded-Cap Donut Segments */}
                  {expenseRingSegments.map((seg, idx) => (
                    <g key={seg.id} transform={`rotate(${seg.rot} 110 110)`}>
                      <circle
                        cx="110"
                        cy="110"
                        r="80"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="18"
                        strokeDasharray={`${seg.len} 502.65`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="110"
                        cy="110"
                        r="80"
                        fill="none"
                        stroke={seg.color}
                        strokeOpacity="0.42"
                        strokeWidth="13.5"
                        strokeDasharray={`${seg.len} 502.65`}
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="strokeOpacity"
                          values="0.22;0.58;0.22"
                          dur="1.6s"
                          begin={`${idx * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  ))}

                  {/* Center Total Expense Label & Value Wireframe */}
                  <rect x="76" y="89" width="68" height="10" rx="3.5" fill="#CBD5E1" />
                  <rect x="64" y="107" width="92" height="18" rx="4.5" fill="#94A3B8" fillOpacity="0.55">
                    <animate attributeName="opacity" values="0.45;0.9;0.45" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                </svg>
              </div>

              {/* Right Category Breakdown Legend List (6 Items) */}
              <div className="sm:col-span-6 space-y-2.5 pr-2">
                {expenseRingSegments.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded px-2.5 py-1.5 bg-slate-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-3 rounded-full shrink-0 opacity-65"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div className={`h-3.5 ${cat.w} rounded animate-shimmer`} />
                    </div>
                    <div className={`h-3.5 ${cat.pctW} rounded animate-shimmer`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: TOP EXPENSE 2x2 Grid Wireframe */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="h-3 w-24 rounded animate-shimmer mb-2.5" />
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { color: '#9353D3', w: 'w-16' },
                { color: '#29B6F6', w: 'w-20' },
                { color: '#8CE95A', w: 'w-20' },
                { color: '#EC006C', w: 'w-20' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded border border-slate-100 bg-[#F8FAFC] p-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-2.5 rounded-full shrink-0 opacity-65"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className={`h-3 ${item.w} rounded animate-shimmer`} />
                  </div>
                  <div className="mt-2 ml-4 h-4 w-24 rounded animate-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Income & Expense Comparison Card Wireframe */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <CardHeaderWireframe
              iconTint="animate-shimmer-emerald"
              titleWidth="w-40"
            />

            {/* Dual KPI Summary Strip: TOTAL INCOME vs TOTAL EXPENSES */}
            <div className="grid grid-cols-2 gap-4 mb-4 px-1">
              <div className="flex flex-col rounded p-2.5 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-3.5 rounded-full bg-[#6BCE85]/70 shrink-0" />
                  <div className="h-3 w-24 rounded animate-shimmer" />
                </div>
                <div className="mt-2 pl-5 flex items-baseline gap-2">
                  <div className="h-6 w-28 rounded animate-shimmer" />
                  <div className="h-4 w-12 rounded animate-shimmer-emerald" />
                </div>
              </div>

              <div className="flex flex-col rounded p-2.5 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-3.5 rounded-full bg-[#FFB100]/70 shrink-0" />
                  <div className="h-3 w-28 rounded animate-shimmer" />
                </div>
                <div className="mt-2 pl-5 flex items-baseline gap-2">
                  <div className="h-6 w-24 rounded animate-shimmer" />
                  <div className="h-4 w-12 rounded animate-shimmer-rose" />
                </div>
              </div>
            </div>
          </div>

          {/* Grouped Dual-Bar Chart Wireframe (Exact viewBox="0 0 680 250") */}
          <div className="w-full overflow-hidden pt-1">
            <svg viewBox="0 0 680 250" fill="none" className="w-full h-auto block">
              {/* Y-Axis Labels & Dashed Horizontal Grid Lines */}
              {[
                { label: '10K', y: 34 },
                { label: '7K', y: 80 },
                { label: '5K', y: 126 },
                { label: '2K', y: 172 },
                { label: '0', y: 214 },
              ].map((tick, i) => (
                <g key={tick.label}>
                  <rect
                    x={i === 4 ? 26 : 16}
                    y={tick.y - 4}
                    width={i === 4 ? 12 : 22}
                    height="9"
                    rx="3"
                    fill="#CBD5E1"
                  />
                  {i < 4 ? (
                    <line
                      x1="54"
                      y1={tick.y}
                      x2="664"
                      y2={tick.y}
                      stroke="#F1F5F9"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  ) : (
                    <line
                      x1="54"
                      y1={tick.y}
                      x2="664"
                      y2={tick.y}
                      stroke="#E2E8F0"
                      strokeWidth="1.3"
                    />
                  )}
                </g>
              ))}

              {/* Active Green Horizontal Threshold Line across chart at MAR income top */}
              <line
                x1="54"
                y1={214 - 175}
                x2="664"
                y2={214 - 175}
                stroke="#6BCE85"
                strokeOpacity="0.55"
                strokeWidth="1.3"
              />

              {/* 12 Monthly Grouped Bars (Green = Income, Amber = Expense) */}
              {incomeExpenseWireframeMonths.map((item, idx) => {
                const incomeY = 214 - item.incomeH;
                const expenseY = 214 - item.expenseH;
                const greenBarX = item.xGroup;
                const amberBarX = item.xGroup + 14;

                return (
                  <g key={item.month}>
                    {/* Soft Translucent Green Pill Halo around MAR */}
                    {item.active && (
                      <rect
                        x={greenBarX - 4}
                        y={incomeY - 7}
                        width="19"
                        height={item.incomeH + 7}
                        rx="9.5"
                        fill="#6BCE85"
                        fillOpacity="0.14"
                      />
                    )}

                    {/* Left Bar: Green Income Bar (#6BCE85) */}
                    <rect
                      x={greenBarX}
                      y={incomeY}
                      width="11"
                      height={item.incomeH}
                      rx="2.5"
                      fill="#6BCE85"
                      fillOpacity={item.active ? '0.68' : '0.38'}
                    >
                      <animate
                        attributeName="fillOpacity"
                        values="0.25;0.65;0.25"
                        dur="1.5s"
                        begin={`${idx * 0.08}s`}
                        repeatCount="indefinite"
                      />
                    </rect>

                    {/* Right Bar: Amber Expense Bar (#FFB100) */}
                    <rect
                      x={amberBarX}
                      y={expenseY}
                      width="11"
                      height={item.expenseH}
                      rx="2.5"
                      fill="#FFB100"
                      fillOpacity="0.38"
                    >
                      <animate
                        attributeName="fillOpacity"
                        values="0.22;0.58;0.22"
                        dur="1.5s"
                        begin={`${idx * 0.08 + 0.15}s`}
                        repeatCount="indefinite"
                      />
                    </rect>

                    {/* Active Green Dot with White Ring on MAR */}
                    {item.active && (
                      <circle
                        cx={greenBarX + 5.5}
                        cy={incomeY}
                        r="4.8"
                        fill="#6BCE85"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                      />
                    )}

                    {/* Month Label Pill (JAN .. DEC) */}
                    <rect
                      x={item.xGroup + 1}
                      y="228"
                      width="23"
                      height="9"
                      rx="3"
                      fill={item.active ? '#64748B' : '#CBD5E1'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ── 5. Operations & Sidebar Modules Quick Integration Wireframe ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left (2 Cols): Today's Clinic Queue & Appointments Table Wireframe */}
        <div className="lg:col-span-2 rounded border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="h-4 w-60 rounded animate-shimmer" />
            <div className="h-6 w-28 rounded-full bg-brand-50/80 border border-brand-200/60 animate-shimmer-indigo" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2.5"><div className="h-3 w-12 rounded animate-shimmer" /></th>
                  <th className="pb-2.5"><div className="h-3 w-20 rounded animate-shimmer" /></th>
                  <th className="pb-2.5"><div className="h-3 w-28 rounded animate-shimmer" /></th>
                  <th className="pb-2.5"><div className="h-3 w-20 rounded animate-shimmer" /></th>
                  <th className="pb-2.5"><div className="h-3 w-16 rounded animate-shimmer" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { patW: 'w-28', procW: 'w-32', docW: 'w-28', badgeTint: 'animate-shimmer-emerald border-emerald-200/60 bg-emerald-50/60' },
                  { patW: 'w-24', procW: 'w-36', docW: 'w-24', badgeTint: 'animate-shimmer-cyan border-sky-200/60 bg-sky-50/60' },
                  { patW: 'w-24', procW: 'w-28', docW: 'w-28', badgeTint: 'animate-shimmer border-slate-200 bg-slate-100/70' },
                  { patW: 'w-24', procW: 'w-36', docW: 'w-24', badgeTint: 'animate-shimmer border-slate-200 bg-slate-100/70' },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5"><div className="h-3.5 w-16 rounded animate-shimmer" /></td>
                    <td className="py-3.5"><div className={`h-3.5 ${row.patW} rounded animate-shimmer`} /></td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-3.5 ${row.procW} rounded animate-shimmer`} />
                        <div className="h-3 w-8 rounded animate-shimmer" />
                      </div>
                    </td>
                    <td className="py-3.5"><div className={`h-3.5 ${row.docW} rounded animate-shimmer`} /></td>
                    <td className="py-3.5">
                      <div className={`h-5 w-20 rounded-full border ${row.badgeTint}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (1 Col): Clinic Fast Actions & Low Stock Alert Banner Wireframe */}
        <div className="space-y-2">
          {/* Clinic Fast Actions Card */}
          <div className="rounded border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
            <div className="h-3.5 w-32 rounded animate-shimmer mb-3" />
            <div className="space-y-2">
              {[
                {
                  letter: 'M',
                  boxClass: 'bg-emerald-50/60 border-emerald-200/60',
                  iconBg: 'bg-emerald-600/70',
                  shimmer: 'animate-shimmer-emerald',
                  w: 'w-36',
                },
                {
                  letter: 'S',
                  boxClass: 'bg-amber-50/60 border-amber-200/60',
                  iconBg: 'bg-amber-600/70',
                  shimmer: 'animate-shimmer-amber',
                  w: 'w-40',
                },
                {
                  letter: 'F',
                  boxClass: 'bg-sky-50/60 border-sky-200/60',
                  iconBg: 'bg-sky-600/70',
                  shimmer: 'animate-shimmer-cyan',
                  w: 'w-40',
                },
              ].map((act) => (
                <div
                  key={act.letter}
                  className={`w-full flex items-center justify-between p-3 rounded border ${act.boxClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded ${act.iconBg} text-white/90 font-black text-[10px]`}
                    >
                      {act.letter}
                    </span>
                    <div className={`h-3.5 ${act.w} rounded ${act.shimmer}`} />
                  </div>
                  <div className={`h-4 w-14 rounded-full ${act.shimmer}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Dental Inventory Low Stock Alert Banner Wireframe */}
          <div className="rounded border border-amber-200/80 bg-amber-50/40 p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-4 w-4 rounded-full animate-shimmer-amber shrink-0" />
              <div className="h-3.5 w-48 rounded animate-shimmer-amber" />
            </div>
            <div className="space-y-1.5 mb-3.5">
              <div className="h-3 w-full rounded animate-shimmer-amber" />
              <div className="h-3 w-4/5 rounded animate-shimmer-amber" />
            </div>
            <div className="h-7 w-full rounded bg-amber-600/65 animate-pulse" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardWireframeSkeleton;

CardHeaderWireframe.propTypes = {
  iconTint: PropTypes.string,
  titleWidth: PropTypes.string,
  iconSvg: PropTypes.node,
};

DashboardWireframeSkeleton.propTypes = {
  isHolding: PropTypes.bool,
  onToggleHold: PropTypes.func,
  onSkipToLive: PropTypes.func,
};

CardHeaderWireframe.propTypes = {
  iconTint: PropTypes.string,
  titleWidth: PropTypes.string,
  iconSvg: PropTypes.node,
};

DashboardWireframeSkeleton.propTypes = {
  isHolding: PropTypes.bool,
  onToggleHold: PropTypes.func,
  onSkipToLive: PropTypes.func,
};
