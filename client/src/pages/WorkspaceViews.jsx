import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Button from '../components/UI/Button.jsx';
import { RefreshIcon, ChartIcon } from '../components/UI/tableIcons.jsx';
import { kpiCardsData, webAnalyticsData, salesAreaChartData } from './data.js';
import { formatCurrency, formatNumber } from '../utils/formatter.js';

// ─── Shared Card Info Icon & Interactive Data Popover (From SVG Spec) ───────
export function InfoBadgeIcon({
  title = 'Analytics Overview',
  subtitle,
  stats = [],
  items = [],
  accentColor = '#5654DC',
  onOpenModal,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full focus:outline-none cursor-pointer transition-transform hover:scale-110"
        title={`Click to view full ${title} data`}
        aria-expanded={isOpen}
      >
        <svg width="15" height="15" viewBox="208 32 16 16" fill="none" className="shrink-0">
          <circle cx="216" cy="40" r="8" fill={isOpen ? accentColor : '#AFAFAF'} className="transition-colors" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M217.305 37.2422C217.43 37.0234 217.5 36.7695 217.5 36.5C217.5 35.6719 216.828 35 216 35C215.172 35 214.5 35.6719 214.5 36.5C214.5 37.3281 215.172 38 216 38C216.559 38 217.047 37.6953 217.305 37.2422ZM215 39H215.5H216.5C217.053 39 217.5 39.4473 217.5 40V41V45C217.5 45.5527 217.053 46 216.5 46C215.947 46 215.5 45.5527 215.5 45V41.75C215.5 41.3359 215.164 41 214.75 41C214.336 41 214 40.6641 214 40.25V40C214 39.6484 214.182 39.3379 214.455 39.1602C214.611 39.0586 214.799 39 215 39Z"
            fill="white"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-6 z-50 w-80 sm:w-96 rounded-xl border border-[#E0E0E0] bg-white p-4 shadow-[0px_16px_36px_rgba(0,0,0,0.14)] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
            <div>
              <h4 className="text-xs font-bold text-[#080808]">{title}</h4>
              {subtitle && <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              aria-label="Close data popover"
            >
              ✕
            </button>
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {stats.map((st) => (
                <div key={st.label} className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-1.5">
                  <div className="text-[10px] font-medium text-[#888888]">{st.label}</div>
                  <div className="text-xs font-bold text-[#080808] mt-0.5">{st.value}</div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1.5">
                Full 12-Month Breakdown ({salesAreaChartData.year})
              </div>
              <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                {items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded border border-slate-100 bg-white px-2 py-1 text-[11px]"
                  >
                    <span className="font-semibold text-[#555555]">{item.label}</span>
                    <span className="font-bold text-[#080808]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {onOpenModal && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenModal();
              }}
              className="mt-3 w-full rounded-lg bg-slate-900 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Open Full Chart Display Modal
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function CardActionToolbar({ onExpand, onEdit, onMore, editTitle = 'Edit / Toggle View' }) {
  return (
    <div className="inline-flex h-7 items-center gap-2.5 rounded-lg border border-[#E0E0E0] bg-white px-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={onExpand}
        className="text-[#888888] hover:text-[#080808] transition-colors cursor-pointer"
        title="Open Chart in Full Display Modal"
      >
        <svg width="13" height="13" viewBox="614 32 16 16" fill="none">
          <path
            d="M620 47H615V42M624 33H629V38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="text-[#888888] hover:text-[#080808] transition-colors cursor-pointer"
        title={editTitle}
      >
        <svg width="13" height="13" viewBox="644 32 16 16" fill="none">
          <path
            d="M648.673 47.4434L658.832 37.2329C659.463 36.5988 659.461 35.5737 658.829 34.9412L657.062 33.1739C656.429 32.5413 655.404 32.5401 654.77 33.1713L644.559 43.3343L644.559 47.4434L648.673 47.4434Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M653.48 34.4629L657.537 38.5192" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onMore}
        className="text-[#888888] hover:text-[#080808] transition-colors cursor-pointer"
        title="Reset / More options"
      >
        <svg width="13" height="13" viewBox="674 32 16 16" fill="none">
          <path
            d="M676 42C675.45 42 674.979 41.804 674.587 41.412C674.195 41.02 673.999 40.5493 674 40C674 39.45 674.196 38.979 674.588 38.587C674.98 38.195 675.451 37.9993 676 38C676.55 38 677.021 38.196 677.413 38.588C677.805 38.98 678.001 39.4507 678 40C678 40.55 677.804 41.021 677.412 41.413C677.02 41.805 676.549 42.0007 676 42ZM682 42C681.45 42 680.979 41.804 680.587 41.412C680.195 41.02 679.999 40.5493 680 40C680 39.45 680.196 38.979 680.588 38.587C680.98 38.195 681.451 37.9993 682 38C682.55 38 683.021 38.196 683.413 38.588C683.805 38.98 684.001 39.4507 684 40C684 40.55 683.804 41.021 683.412 41.413C683.02 41.805 682.549 42.0007 682 42ZM688 42C687.45 42 686.979 41.804 686.587 41.412C686.195 41.02 685.999 40.5493 686 40C686 39.45 686.196 38.979 686.588 38.587C686.98 38.195 687.451 37.9993 688 38C688.55 38 689.021 38.196 689.413 38.588C689.805 38.98 690.001 39.4507 690 40C690 40.55 689.804 41.021 689.412 41.413C689.02 41.805 688.549 42.0007 688 42Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Shared Section Header ──────────────────────────────────────────────────
export function ViewHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80  mb-1">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Shared KPI Card ───────────────────────────────────────────────────────
export function KpiCard({
  title,
  value,
  subtitle,
  badge,
  badgeStyle,
  icon: Icon,
  iconStyle,
  change,
  isPositive,
  color = 'blue',
}) {
  const displayBadge = badge || change;
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border border-amber-100',
    sky: 'bg-sky-50 text-sky-600 border border-sky-100',
    violet: 'bg-violet-50 text-violet-600 border border-violet-100',
  };
  const finalIconStyle = iconStyle || colorMap[color] || colorMap.blue;
  const finalBadgeStyle =
    badgeStyle ||
    (isPositive
      ? 'bg-[#E2FFF3] border border-[#6EEABB] text-[#00C26B]'
      : 'bg-[#FFF3E0] border border-[#FFE0B2] text-[#FF9900]');

  return (
    <div className="rounded  border border-[#EFEFEF] bg-white p-3 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#888888]">{title}</span>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded ${finalIconStyle}`}>
            <HugeiconsIcon icon={Icon} size={18} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-[#080808]">{value}</div>
          {subtitle && (
            <div className="text-[11px] text-[#888888] font-medium mt-0.5">{subtitle}</div>
          )}
        </div>
        {displayBadge && (
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${finalBadgeStyle}`}>
            {displayBadge}
          </span>
        )}
      </div>
    </div>
  );
}

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: 'Good morning', emoji: '☀️' };
  if (hour >= 12 && hour < 17) return { text: 'Good afternoon', emoji: '🌤️' };
  if (hour >= 17 && hour < 22) return { text: 'Good evening', emoji: '🌙' };
  return { text: 'Good night', emoji: '✨' };
}

// ─── 1. Dashboard View ──────────────────────────────────────────────────────
export function DashboardView({ user }) {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Interactive states for Sales Area Chart & Patient Growth Overview
  const [selectedSalesMonth, setSelectedSalesMonth] = useState(salesAreaChartData.defaultMonth);
  const [isSalesExpanded, setIsSalesExpanded] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [selectedWebWeek, setSelectedWebWeek] = useState(webAnalyticsData.defaultMonth || 'Jun');
  const [isWebExpanded, setIsWebExpanded] = useState(false);
  const [activeChartModal, setActiveChartModal] = useState(null); // 'sales' | 'patient-growth' | null

  useEffect(() => {
    if (!activeChartModal) return undefined;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveChartModal(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [activeChartModal]);

  const activeSalesMonthObj =
    salesAreaChartData.months.find((m) => m.month === selectedSalesMonth) ||
    salesAreaChartData.months[5];

  const activePatientMonthObj =
    webAnalyticsData.bars.find((b) => b.month === selectedWebWeek) ||
    webAnalyticsData.bars[5];

  const totalAnnualSales = salesAreaChartData.months.reduce((sum, m) => sum + (m.amount || 0), 0);
  const avgMonthlySales = Math.round(totalAnnualSales / salesAreaChartData.months.length);
  const totalAnnualPatients = webAnalyticsData.bars.reduce((sum, b) => sum + Number(b.count || 0), 0);
  const avgMonthlyPatients = Math.round(totalAnnualPatients / webAnalyticsData.bars.length);

  const greeting = getTimeBasedGreeting();
  const doctorName = user?.name || 'Dr. Darrell Steward';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <div className="space-y-2 font-sans text-slate-900 mb-8">
      {/* Workspace Header & Action Bar */}
      <ViewHeader
        title={`${greeting.emoji} ${greeting.text}, ${doctorName}`}
        subtitle="Avicena Dental Practice — Nairobi Main Branch  Overview"
        actions={
          <div className="flex items-center gap-2">
            {/* Date Filter Pill */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
              {['Today', 'This Week', 'This Month', 'Year 2026'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-slate-900 text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              loading={isRefreshing}
              onClick={handleRefresh}
              className="px-3 py-1.5 cursor-pointer font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <RefreshIcon className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-green' : 'text-slate-600'}`} />
              <span>Refresh</span>
            </Button>

            {/* Reports Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/reports')}
              className="px-3.5 py-1.5 cursor-pointer font-extrabold"
            >
              <ChartIcon className="w-3.5 h-3.5 text-white" />
              <span>Reports</span>
            </Button>
          </div>
        }
      />


      {/* KPI Top Cards Row - Styled with 24px Spec */}
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCardsData.map((card) => (
          <KpiCard key={card.id || card.title} {...card} />
        ))}
      </div>

      {/* Main Analytics Row: Sales (Smooth Line & Area Chart) + Web Analytics (Bar Chart) in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {/* Column 1: Sales Area & Smooth Line Chart Card (Exact Figma Spec) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Purple sack-coin Icon (#5654DC) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path
                    d="M9 6C9 4.34315 10.3431 3 12 3H16C17.6569 3 19 4.34315 19 6L17.5 8H10.5L9 6Z"
                    stroke="#5654DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="7.15"
                    y="8"
                    width="12.85"
                    height="13"
                    rx="4"
                    stroke="#5654DC"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="3.5"
                    rx="1.5"
                    fill="white"
                    stroke="#5654DC"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="17.5"
                    width="7"
                    height="3.5"
                    rx="1.5"
                    fill="white"
                    stroke="#5654DC"
                    strokeWidth="2"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-[#080808] tracking-tight">
                  {salesAreaChartData.title} ({salesAreaChartData.year})
                </h2>
                <InfoBadgeIcon
                  title={`Sales & Profit Summary (${salesAreaChartData.year})`}
                  subtitle="Avicena Dental Practice — Monthly Revenue & Profit"
                  accentColor="#5654DC"
                  stats={[
                    { label: 'Net Profit (YTD)', value: salesAreaChartData.totalProfit },
                    { label: '12-Mo Gross Sales', value: formatCurrency(totalAnnualSales) },
                    { label: 'Monthly Average', value: formatCurrency(avgMonthlySales) },
                    { label: 'Peak Month (Dec)', value: formatCurrency(215000) },
                  ]}
                  items={salesAreaChartData.months.map((m) => ({
                    label: m.month,
                    value: m.compactValue,
                  }))}
                  onOpenModal={() => setActiveChartModal('sales')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('sales')}
                onEdit={() =>
                  setSelectedSalesMonth((prev) => (prev === 'Dec' ? salesAreaChartData.defaultMonth : 'Dec'))
                }
                onMore={() => {
                  setSelectedSalesMonth(salesAreaChartData.defaultMonth);
                }}
                editTitle="Cycle Month Selection"
              />
            </div>

            {/* Total Profit Value Block */}
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#888888]">
                  {salesAreaChartData.subtitle} • {salesAreaChartData.year}
                </span>
                <span className="mt-1 text-2xl font-semibold tracking-tight text-[#080808] leading-none">
                  {salesAreaChartData.totalProfit}
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#888888]">
                Selected:{' '}
                <strong className="text-[#080808]">
                  {activeSalesMonthObj.month} {salesAreaChartData.year}
                </strong>{' '}
                ({activeSalesMonthObj.value})
              </span>
            </div>
          </div>

          {/* Smooth Line & Area Graph (SVG) */}
          <div className="w-full flex-1 flex items-end overflow-hidden">
            <svg
              viewBox="20 214 674 258"
              fill="none"
              className={`w-full block transition-all duration-300 ${
                isSalesExpanded ? 'h-80' : 'h-auto'
              } select-none`}
            >
              <defs>
                {/* Horizontal Red-to-Purple Stroke Gradient */}
                <linearGradient id="salesLineGrad" x1="74" y1="276" x2="690" y2="276" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF4049" />
                  <stop offset="87.18%" stopColor="#5654DC" />
                </linearGradient>

                {/* Horizontal Area Tint Gradient */}
                <linearGradient id="salesAreaHoriz" x1="74" y1="276" x2="690" y2="276" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF4049" stopOpacity="0.18" />
                  <stop offset="87.18%" stopColor="#5654DC" stopOpacity="0.18" />
                </linearGradient>

                {/* Vertical Fade Mask to White at Bottom */}
                <linearGradient id="salesAreaVertMask" x1="0" y1="276" x2="0" y2="431" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="27.56%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="salesAreaFadeMask">
                  <rect x="70" y="220" width="625" height="215" fill="url(#salesAreaVertMask)" />
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
                  stroke="#E0E0E0"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Y-Axis Labels (300K .. 0) */}
              {salesAreaChartData.yAxisLabels.map((item) => (
                <text
                  key={item.label}
                  x="62"
                  y={item.y + 5}
                  textAnchor="end"
                  fill="#888888"
                  fontSize="14"
                  fontWeight="500"
                >
                  {item.label}
                </text>
              ))}

              {/* Gradient Area Fill Under Smooth Curve */}
              <path
                d={salesAreaChartData.areaPath}
                fill="url(#salesAreaHoriz)"
                mask="url(#salesAreaFadeMask)"
              />

              {/* Smooth Cubic Bezier Line (Vector 846) */}
              <path
                d={salesAreaChartData.linePath}
                stroke="url(#salesLineGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Solid X-Axis Baseline (y=431) */}
              <line x1="72" y1="431" x2="692" y2="431" stroke="#E0E0E0" strokeWidth="1.5" />

              {/* Vertical Dashed Indicator Line (Vector 938) */}
              <line
                x1={activeSalesMonthObj.x}
                y1="252"
                x2={activeSalesMonthObj.x}
                y2="431"
                stroke="#101010"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Active Point Circle on Smooth Curve */}
              <circle
                cx={activeSalesMonthObj.x}
                cy={activeSalesMonthObj.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#5654DC"
                strokeWidth="2.5"
              />

              {/* Floating Dark Tooltip Badge (#030303) */}
              <g transform={`translate(${Math.min(Math.max(activeSalesMonthObj.x - 45, 72), 602)}, 224)`}>
                <rect width="90" height="24" rx="4" fill="#030303" />
                <text
                  x="45"
                  y="16"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="12.5"
                  fontWeight="500"
                >
                  {activeSalesMonthObj.compactValue}
                </text>
              </g>

              {/* Interactive 12 Month Columns & X-Axis Labels (Jan .. Dec) */}
              {salesAreaChartData.months.map((m) => {
                const isSelected = m.month === selectedSalesMonth;
                return (
                  <g
                    key={m.month}
                    className="cursor-pointer"
                    onMouseEnter={() => setSelectedSalesMonth(m.month)}
                    onClick={() => setSelectedSalesMonth(m.month)}
                  >
                    {/* Transparent Hover/Click Hit Zone */}
                    <rect x={m.x - 25} y="220" width="50" height="252" fill="transparent" />

                    {/* Pill Background for Active Month */}
                    {isSelected && (
                      <rect
                        x={m.x - 22}
                        y="444"
                        width="44"
                        height="24"
                        rx="12"
                        fill="#F3F4F6"
                      />
                    )}

                    <text
                      x={m.x}
                      y="461"
                      textAnchor="middle"
                      fill={isSelected ? '#080808' : '#888888'}
                      fontSize="12.5"
                      fontWeight={isSelected ? '600' : '500'}
                    >
                      {m.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Column 2: Patient Growth Overview Card */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="33 29 22 22" fill="none" className="shrink-0">
                  <path
                    d="M52.9451 39C52.4476 34.5 48.6326 31 44 31C39.0294 31 35 35.0294 35 40C35 44.6326 38.5 48.4476 43 48.9451"
                    stroke="#FF9F0A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M43.8087 32.0882C44.1336 31.6415 44.0348 31.0161 43.5882 30.6913C43.1415 30.3664 42.5161 30.4652 42.1913 30.9118L43 31.5L43.8087 32.0882ZM43 31.5L42.1913 30.9118C37.9363 36.7625 37.9363 43.7375 42.1913 49.5882L43 49L43.8087 48.4118C40.0638 43.2625 40.0638 37.2375 43.8087 32.0882L43 31.5Z"
                    fill="#FF9F0A"
                  />
                  <path
                    d="M45.0007 31.5C46.4998 33.5613 47.4371 35.7631 47.8125 38"
                    stroke="#FF9F0A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M43 40H36" stroke="#FF9F0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle
                    cx="48.5"
                    cy="44.5"
                    r="3.5"
                    stroke="#FF9F0A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M53 49L51 47" stroke="#FF9F0A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className="text-sm font-semibold text-[#080808] tracking-tight">
                  {webAnalyticsData.title} ({webAnalyticsData.year})
                </h3>
                <InfoBadgeIcon
                  title={`Patient Growth Overview (${webAnalyticsData.year})`}
                  subtitle="Monthly New & Returning Patient Visits"
                  accentColor="#FF9F0A"
                  stats={[
                    { label: 'Annual Visits', value: `${formatNumber(totalAnnualPatients)} pts` },
                    { label: 'Monthly Average', value: `${formatNumber(avgMonthlyPatients)} pts` },
                    { label: 'New Patients', value: webAnalyticsData.metrics[0].value },
                    { label: 'Peak Month (Dec)', value: '630 pts' },
                  ]}
                  items={webAnalyticsData.bars.map((b) => ({
                    label: b.month,
                    value: `${b.count} pts`,
                  }))}
                  onOpenModal={() => setActiveChartModal('patient-growth')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('patient-growth')}
                onEdit={() => setSelectedWebWeek((prev) => (prev === 'Dec' ? 'Jun' : 'Dec'))}
                onMore={() => {
                  setHoveredBarIndex(null);
                  setSelectedWebWeek(webAnalyticsData.defaultMonth || 'Jun');
                }}
              />
            </div>

            {/* Metrics Overview Row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {webAnalyticsData.metrics.map((metric) => (
                <div key={metric.id} className="flex flex-col">
                  <span className="text-xs font-medium text-[#888888]">{metric.label}</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-[#080808] leading-none">
                      {metric.value}
                    </span>
                    {metric.isPositive ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E8FFF4] border border-[#8FE7BE] px-1.5 py-0.5 text-[10px] font-bold text-[#1DBF73]">
                        <svg width="9" height="9" viewBox="389 150 12 12" fill="none">
                          <path
                            d="M395.669 153.219V161.334H394.335V153.219L390.759 156.795L389.816 155.852L395.002 150.667L400.187 155.852L399.244 156.795L395.669 153.219Z"
                            fill="#1DBF73"
                          />
                        </svg>
                        {metric.change}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#FFEAEA] border border-[#FF9F9D] px-1.5 py-0.5 text-[10px] font-bold text-[#FB3B52]">
                        <svg width="9" height="9" viewBox="186 150 12 12" fill="none">
                          <path
                            d="M191.331 158.781L191.331 150.666L192.665 150.666L192.665 158.781L196.241 155.205L197.184 156.148L191.998 161.333L186.813 156.148L187.756 155.205L191.331 158.781Z"
                            fill="#FB3B52"
                          />
                        </svg>
                        {metric.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exact SVG Bar Chart with Dashed Grid Lines (12 Months in Current Year) */}
          <div className="w-full flex-1 flex items-end overflow-hidden">
            <svg
              viewBox="28 220 674 258"
              fill="none"
              className={`w-full block transition-all duration-300 ${
                isWebExpanded ? 'h-80' : 'h-auto'
              } select-none`}
            >
              {/* Dashed Horizontal Grid Lines */}
              {[234, 286, 338, 390].map((yPos) => (
                <line
                  key={yPos}
                  x1="78"
                  y1={yPos}
                  x2="700"
                  y2={yPos}
                  stroke="#E0E0E0"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Y-Axis Labels */}
              {webAnalyticsData.yAxisLabels.map((item) => (
                <text
                  key={item.label}
                  x="61"
                  y={item.y + 5}
                  textAnchor="end"
                  fill="#888888"
                  fontSize="14"
                  fontWeight="500"
                >
                  {item.label}
                </text>
              ))}

              {/* 12 Monthly Interactive Orange Bars */}
              {webAnalyticsData.bars.map((bar, idx) => {
                const isHovered = hoveredBarIndex === idx || selectedWebWeek === bar.month;
                return (
                  <g
                    key={bar.month || idx}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredBarIndex(idx);
                      setSelectedWebWeek(bar.month);
                    }}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    onClick={() => setSelectedWebWeek(bar.month)}
                  >
                    <rect
                      x={bar.x}
                      y={bar.y}
                      width="26"
                      height={bar.height}
                      rx="8"
                      fill={isHovered ? '#E08600' : '#FF9F0A'}
                    />
                    {isHovered && (
                      <g transform={`translate(${bar.xCenter - 32}, ${bar.y - 28})`}>
                        <rect width="64" height="22" rx="4" fill="#030303" />
                        <text
                          x="32"
                          y="15"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="11.5"
                          fontWeight="600"
                        >
                          {bar.count} pts
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Solid X-Axis Baseline */}
              <line x1="78" y1="441.5" x2="700" y2="441.5" stroke="#E9E9E9" strokeWidth="1" />

              {/* 12 Monthly X-Axis Labels (Jan .. Dec) */}
              {webAnalyticsData.xAxisLabels.map((item) => {
                const isSelected = selectedWebWeek === item.label;
                return (
                  <g
                    key={item.label}
                    className="cursor-pointer"
                    onClick={() => setSelectedWebWeek(item.label)}
                  >
                    {isSelected && (
                      <rect
                        x={item.x - 22}
                        y="451"
                        width="44"
                        height="24"
                        rx="12"
                        fill="#F3F4F6"
                      />
                    )}
                    <text
                      x={item.x}
                      y="468"
                      textAnchor="middle"
                      fill={isSelected ? '#080808' : '#888888'}
                      fontSize="12.5"
                      fontWeight={isSelected ? '600' : '500'}
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Full Display Chart Modal (Triggered by CardActionToolbar Expand or InfoBadgeIcon) */}
      {activeChartModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
          onClick={() => setActiveChartModal(null)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    activeChartModal === 'sales'
                      ? 'bg-indigo-50 border-indigo-100 text-[#5654DC]'
                      : 'bg-amber-50 border-amber-100 text-[#FF9F0A]'
                  }`}
                >
                  {activeChartModal === 'sales' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6C9 4.34315 10.3431 3 12 3H16C17.6569 3 19 4.34315 19 6L17.5 8H10.5L9 6Z"
                        stroke="#5654DC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect x="7.15" y="8" width="12.85" height="13" rx="4" stroke="#5654DC" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="33 29 22 22" fill="none">
                      <path
                        d="M52.9451 39C52.4476 34.5 48.6326 31 44 31C39.0294 31 35 35.0294 35 40C35 44.6326 38.5 48.4476 43 48.9451"
                        stroke="#FF9F0A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="48.5" cy="44.5" r="3.5" stroke="#FF9F0A" strokeWidth="2" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#080808]">
                    {activeChartModal === 'sales'
                      ? `${salesAreaChartData.title} — Full Year Analytics (${salesAreaChartData.year})`
                      : `${webAnalyticsData.title} — Full Year Analytics (${webAnalyticsData.year})`}
                  </h2>
                  <p className="text-xs text-[#888888]">
                    Interactive 12-month performance display • Click any month on the chart or grid to inspect details
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveChartModal((prev) => (prev === 'sales' ? 'patient-growth' : 'sales'))
                  }
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Switch to {activeChartModal === 'sales' ? 'Patient Growth' : 'Sales Chart'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartModal(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {activeChartModal === 'sales' ? (
              <>
                {/* Sales KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <span className="text-[11px] font-medium text-[#888888]">Total Net Profit</span>
                    <div className="mt-1 text-lg font-bold text-[#080808]">{salesAreaChartData.totalProfit}</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <span className="text-[11px] font-medium text-[#888888]">12-Month Gross Sales</span>
                    <div className="mt-1 text-lg font-bold text-[#080808]">{formatCurrency(totalAnnualSales)}</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <span className="text-[11px] font-medium text-[#888888]">Monthly Average</span>
                    <div className="mt-1 text-lg font-bold text-[#080808]">{formatCurrency(avgMonthlySales)}</div>
                  </div>
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                    <span className="text-[11px] font-semibold text-[#5654DC]">
                      Selected ({activeSalesMonthObj.month} {salesAreaChartData.year})
                    </span>
                    <div className="mt-1 text-lg font-bold text-[#080808]">{activeSalesMonthObj.value}</div>
                  </div>
                </div>

                {/* Expanded Sales Smooth Line & Area Chart */}
                <div className="rounded-xl border border-[#EFEFEF] bg-white p-4">
                  <svg viewBox="20 214 674 258" fill="none" className="w-full h-auto block select-none">
                    {[224, 276, 328, 380].map((yPos) => (
                      <line
                        key={yPos}
                        x1="72"
                        y1={yPos}
                        x2="692"
                        y2={yPos}
                        stroke="#E0E0E0"
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                      />
                    ))}
                    {salesAreaChartData.yAxisLabels.map((item) => (
                      <text
                        key={item.label}
                        x="62"
                        y={item.y + 5}
                        textAnchor="end"
                        fill="#888888"
                        fontSize="14"
                        fontWeight="500"
                      >
                        {item.label}
                      </text>
                    ))}
                    <path
                      d={salesAreaChartData.areaPath}
                      fill="url(#salesAreaHoriz)"
                      mask="url(#salesAreaFadeMask)"
                    />
                    <path
                      d={salesAreaChartData.linePath}
                      stroke="url(#salesLineGrad)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <line x1="72" y1="431" x2="692" y2="431" stroke="#E0E0E0" strokeWidth="1.5" />
                    <line
                      x1={activeSalesMonthObj.x}
                      y1="252"
                      x2={activeSalesMonthObj.x}
                      y2="431"
                      stroke="#101010"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx={activeSalesMonthObj.x}
                      cy={activeSalesMonthObj.y}
                      r="5"
                      fill="#FFFFFF"
                      stroke="#5654DC"
                      strokeWidth="2.8"
                    />
                    <g transform={`translate(${Math.min(Math.max(activeSalesMonthObj.x - 48, 72), 596)}, 222)`}>
                      <rect width="96" height="24" rx="4" fill="#030303" />
                      <text x="48" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">
                        {activeSalesMonthObj.value}
                      </text>
                    </g>
                    {salesAreaChartData.months.map((m) => {
                      const isSelected = m.month === selectedSalesMonth;
                      return (
                        <g
                          key={m.month}
                          className="cursor-pointer"
                          onMouseEnter={() => setSelectedSalesMonth(m.month)}
                          onClick={() => setSelectedSalesMonth(m.month)}
                        >
                          <rect x={m.x - 25} y="220" width="50" height="252" fill="transparent" />
                          {isSelected && (
                            <rect x={m.x - 22} y="444" width="44" height="24" rx="12" fill="#F3F4F6" />
                          )}
                          <text
                            x={m.x}
                            y="461"
                            textAnchor="middle"
                            fill={isSelected ? '#080808' : '#888888'}
                            fontSize="12.5"
                            fontWeight={isSelected ? '600' : '500'}
                          >
                            {m.month}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Interactive 12-Month Breakdown Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-2">
                    Monthly Sales Breakdown ({salesAreaChartData.year})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {salesAreaChartData.months.map((m) => {
                      const isSelected = m.month === selectedSalesMonth;
                      return (
                        <button
                          key={m.month}
                          type="button"
                          onClick={() => setSelectedSalesMonth(m.month)}
                          className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#5654DC] bg-indigo-50/60 shadow-2xs'
                              : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                          }`}
                        >
                          <span className="text-[11px] font-semibold text-[#888888]">
                            {m.month} {salesAreaChartData.year}
                          </span>
                          <span className="mt-0.5 text-xs font-bold text-[#080808]">{m.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Patient Growth KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {webAnalyticsData.metrics.map((metric) => (
                    <div key={metric.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                      <span className="text-[11px] font-medium text-[#888888]">{metric.label}</span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-lg font-bold text-[#080808]">{metric.value}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                            metric.isPositive
                              ? 'bg-[#E8FFF4] border border-[#8FE7BE] text-[#1DBF73]'
                              : 'bg-[#FFEAEA] border border-[#FF9F9D] text-[#FB3B52]'
                          }`}
                        >
                          {metric.isPositive ? '▲' : '▼'} {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                    <span className="text-[11px] font-semibold text-[#E08600]">
                      Selected ({activePatientMonthObj.month} {webAnalyticsData.year})
                    </span>
                    <div className="mt-1 text-lg font-bold text-[#080808]">
                      {activePatientMonthObj.count} Patients
                    </div>
                  </div>
                </div>

                {/* Expanded Patient Growth 12-Month Bar Chart */}
                <div className="rounded-xl border border-[#EFEFEF] bg-white p-4">
                  <svg viewBox="28 220 674 258" fill="none" className="w-full h-auto block select-none">
                    {[234, 286, 338, 390].map((yPos) => (
                      <line
                        key={yPos}
                        x1="78"
                        y1={yPos}
                        x2="700"
                        y2={yPos}
                        stroke="#E0E0E0"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                      />
                    ))}
                    {webAnalyticsData.yAxisLabels.map((item) => (
                      <text
                        key={item.label}
                        x="61"
                        y={item.y + 5}
                        textAnchor="end"
                        fill="#888888"
                        fontSize="14"
                        fontWeight="500"
                      >
                        {item.label}
                      </text>
                    ))}
                    {webAnalyticsData.bars.map((bar, idx) => {
                      const isSelected = selectedWebWeek === bar.month;
                      return (
                        <g
                          key={bar.month || idx}
                          className="cursor-pointer"
                          onClick={() => setSelectedWebWeek(bar.month)}
                        >
                          <rect
                            x={bar.x}
                            y={bar.y}
                            width="26"
                            height={bar.height}
                            rx="8"
                            fill={isSelected ? '#E08600' : '#FF9F0A'}
                          />
                          {isSelected && (
                            <g transform={`translate(${bar.xCenter - 32}, ${bar.y - 28})`}>
                              <rect width="64" height="22" rx="4" fill="#030303" />
                              <text x="32" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="600">
                                {bar.count} pts
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                    <line x1="78" y1="441.5" x2="700" y2="441.5" stroke="#E9E9E9" strokeWidth="1" />
                    {webAnalyticsData.xAxisLabels.map((item) => {
                      const isSelected = selectedWebWeek === item.label;
                      return (
                        <g
                          key={item.label}
                          className="cursor-pointer"
                          onClick={() => setSelectedWebWeek(item.label)}
                        >
                          {isSelected && (
                            <rect x={item.x - 22} y="451" width="44" height="24" rx="12" fill="#F3F4F6" />
                          )}
                          <text
                            x={item.x}
                            y="468"
                            textAnchor="middle"
                            fill={isSelected ? '#080808' : '#888888'}
                            fontSize="12.5"
                            fontWeight={isSelected ? '600' : '500'}
                          >
                            {item.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Interactive 12-Month Patient Growth Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-2">
                    Monthly Patient Visits Breakdown ({webAnalyticsData.year})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {webAnalyticsData.bars.map((bar) => {
                      const isSelected = bar.month === selectedWebWeek;
                      return (
                        <button
                          key={bar.month}
                          type="button"
                          onClick={() => setSelectedWebWeek(bar.month)}
                          className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FF9F0A] bg-amber-50/70 shadow-2xs'
                              : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                          }`}
                        >
                          <span className="text-[11px] font-semibold text-[#888888]">
                            {bar.month} {webAnalyticsData.year}
                          </span>
                          <span className="mt-0.5 text-xs font-bold text-[#080808]">{bar.count} Patients</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Secondary Row: Procedure Distribution Donut Chart Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

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

        {/* Column 2: Financial Balance & Settlement Channels */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
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
              <span className="text-2xl font-extrabold text-[#080808]">{formatCurrency(965000)}</span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#00C26B] justify-end">
                <span className="rounded-full bg-[#E2FFF3] border border-[#6EEABB] px-2 py-0.5">▲ +12% vs last year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channel 1: SHA Insurance */}
          <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#080808]">{formatCurrency(520000)}</span>
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
              <span className="text-xs font-bold text-[#080808]">{formatCurrency(320000)}</span>
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
              <span className="text-xs font-bold text-[#080808]">{formatCurrency(125000)}</span>
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
            <div className="h-full bg-[#00CBE8]" style={{ width: '55%' }} title={`SHA Insurance (${formatCurrency(520000)})`} />
            <div className="h-full bg-[#00C26B]" style={{ width: '34%' }} title={`M-Pesa STK (${formatCurrency(320000)})`} />
            <div className="h-full bg-[#FFC600]" style={{ width: '11%' }} title={`Cash & Cards (${formatCurrency(125000)})`} />
          </div>
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
