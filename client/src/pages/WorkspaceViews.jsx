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
import {
  kpiCardsData,
  webAnalyticsData,
  salesAreaChartData,
  currentYear,
  availableYears,
  getSalesChartDataByYear,
  getPatientGrowthDataByYear,
} from './data.js';
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
        <div className="absolute left-0 top-6 z-50 w-80 sm:w-96 rounded border border-[#E0E0E0] bg-white p-4 shadow-[0px_16px_36px_rgba(0,0,0,0.14)] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
            <div>
              <h4 className="text-xs font-bold text-[#080808]">{title}</h4>
              {subtitle && <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              aria-label="Close data popover"
            >
              ✕
            </button>
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {stats.map((st) => (
                <div key={st.label} className="rounded bg-slate-50 border border-slate-100 px-2.5 py-1.5">
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
              className="mt-3 w-full rounded bg-slate-900 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Open Full Chart Display Modal
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function CardActionToolbar({
  onExpand,
  selectedYear = currentYear,
  onSelectYear,
  years = availableYears,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className="relative inline-flex h-7 items-center gap-2 rounded border border-[#E0E0E0] bg-white px-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
    >
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

      <span className="h-3.5 w-px bg-[#EFEFEF]" />

      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1 text-xs transition-colors cursor-pointer ${isMenuOpen ? 'text-[#080808]' : 'text-[#888888] hover:text-[#080808]'
          }`}
        title="Select Year"
        aria-expanded={isMenuOpen}
      >
        <svg width="13" height="13" viewBox="674 32 16 16" fill="none">
          <path
            d="M676 42C675.45 42 674.979 41.804 674.587 41.412C674.195 41.02 673.999 40.5493 674 40C674 39.45 674.196 38.979 674.588 38.587C674.98 38.195 675.451 37.9993 676 38C676.55 38 677.021 38.196 677.413 38.588C677.805 38.98 678.001 39.4507 678 40C678 40.55 677.804 41.021 677.412 41.413C677.02 41.805 676.549 42.0007 676 42ZM682 42C681.45 42 680.979 41.804 680.587 41.412C680.195 41.02 679.999 40.5493 680 40C680 39.45 680.196 38.979 680.588 38.587C680.98 38.195 681.451 37.9993 682 38C682.55 38 683.021 38.196 683.413 38.588C683.805 38.98 684.001 39.4507 684 40C684 40.55 683.804 41.021 683.412 41.413C683.02 41.805 682.549 42.0007 682 42ZM688 42C687.45 42 686.979 41.804 686.587 41.412C686.195 41.02 685.999 40.5493 686 40C686 39.45 686.196 38.979 686.588 38.587C686.98 38.195 687.451 37.9993 688 38C688.55 38 689.021 38.196 689.413 38.588C689.805 38.98 690.001 39.4507 690 40C690 40.55 689.804 41.021 689.412 41.413C689.02 41.805 688.549 42.0007 688 42Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 z-50 w-36 rounded border border-[#E0E0E0] bg-white p-1.5 shadow-[0px_12px_28px_rgba(0,0,0,0.12)]">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
            Select Year
          </div>
          {years.map((yr) => {
            const isSelected = Number(selectedYear) === Number(yr);
            return (
              <button
                key={yr}
                type="button"
                onClick={() => {
                  if (onSelectYear) onSelectYear(yr);
                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${isSelected
                  ? 'bg-slate-900 text-white'
                  : 'text-[#080808] hover:bg-slate-100'
                  }`}
              >
                <span>Year {yr}</span>
                {isSelected && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
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
  onCopy,
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
    <div
      className="rounded border border-[#EFEFEF] bg-white p-3 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 cursor-pointer group select-text"
      onClick={() => onCopy && onCopy(value, `${title}`)}
      title="Click to copy metric value"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#888888] select-text">{title}</span>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded ${finalIconStyle}`}>
            <HugeiconsIcon icon={Icon} size={18} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight text-[#080808] group-hover:text-emerald-600 transition-colors select-text">
            {value}
          </div>
          {subtitle && (
            <div className="text-[11px] text-[#888888] font-medium mt-0.5 select-text">{subtitle}</div>
          )}
        </div>
        {displayBadge && (
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${finalBadgeStyle} select-text`}>
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

  // Interactive states for Charts
  const [salesYear, setSalesYear] = useState(currentYear);
  const [patientGrowthYear, setPatientGrowthYear] = useState(currentYear);
  const [paymentYear, setPaymentYear] = useState(currentYear);
  const [incomeYear, setIncomeYear] = useState(currentYear);
  const [balanceYear, setBalanceYear] = useState(currentYear);
  const [selectedSalesMonth, setSelectedSalesMonth] = useState(salesAreaChartData.defaultMonth);
  const [isSalesExpanded, setIsSalesExpanded] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [selectedWebWeek, setSelectedWebWeek] = useState(webAnalyticsData.defaultMonth || 'Jun');
  const [isWebExpanded, setIsWebExpanded] = useState(false);
  const [activeChartModal, setActiveChartModal] = useState(null); // 'sales' | 'patient-growth' | 'payment' | 'income' | 'balance' | null

  // Interactive Focus States for Charts & Deep Inspection
  const [focusedPaymentChannel, setFocusedPaymentChannel] = useState(null); // 'sha' | 'mpesa' | 'cash' | null
  const [focusedBalanceStream, setFocusedBalanceStream] = useState(null); // 'primary' | 'speciality' | 'fixed' | null
  const [focusedIncomeRoute, setFocusedIncomeRoute] = useState(null); // 'mpesa' | 'private' | 'claims' | null

  // Instant Click-to-Copy Feedback System
  const [copiedText, setCopiedText] = useState(null);
  const handleCopy = (text, label) => {
    if (!text && text !== 0) return;
    const str = String(text).trim();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(str).then(() => {
        setCopiedText(label ? `${label}: ${str}` : str);
        setTimeout(() => setCopiedText(null), 2200);
      }).catch(() => {
        setCopiedText(label ? `${label}: ${str}` : str);
        setTimeout(() => setCopiedText(null), 2200);
      });
    } else {
      setCopiedText(label ? `${label}: ${str}` : str);
      setTimeout(() => setCopiedText(null), 2200);
    }
  };

  const currentSalesData = getSalesChartDataByYear(salesYear);
  const currentPatientData = getPatientGrowthDataByYear(patientGrowthYear);

  // Dynamic computations for Payment Distribution card
  const paymentFactor = paymentYear === 2026 ? 1 : paymentYear === 2025 ? 0.92 : paymentYear === 2024 ? 0.81 : 0.72;
  const shaSales = Math.round(54071 * paymentFactor);
  const mpesaSales = Math.round(32210 * paymentFactor);
  const cashSales = Math.round(24410 * paymentFactor);
  const totalTransactions = shaSales + mpesaSales + cashSales;

  // Dynamic computations for Income Summary card
  const incomeFactor = incomeYear === 2026 ? 1 : incomeYear === 2025 ? 0.88 : incomeYear === 2024 ? 0.79 : 0.69;
  const totalIncomeVal = Math.round(988238 * incomeFactor);
  const mpesaIncomeVal = Math.round(108208 * incomeFactor);
  const privateIncomeVal = Math.round(400338 * incomeFactor);
  const claimsIncomeVal = Math.round(388203 * incomeFactor);

  // Dynamic computations for Financial Balance card
  const balanceFactor = balanceYear === 2026 ? 1 : balanceYear === 2025 ? 0.90 : balanceYear === 2024 ? 0.82 : 0.74;
  const totalBalanceVal = Math.round(94127 * balanceFactor);
  const primaryCareVal = Math.round(52000 * balanceFactor);
  const specialityCareVal = Math.round(32000 * balanceFactor);
  const fixedIncomeVal = Math.round(12500 * balanceFactor);

  useEffect(() => {
    if (!activeChartModal) return undefined;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveChartModal(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [activeChartModal]);

  const activeSalesMonthObj =
    currentSalesData.months.find((m) => m.month === selectedSalesMonth) ||
    currentSalesData.months[5];

  const activePatientMonthObj =
    currentPatientData.bars.find((b) => b.month === selectedWebWeek) ||
    currentPatientData.bars[5];

  const totalAnnualSales = currentSalesData.months.reduce((sum, m) => sum + (m.amount || 0), 0);
  const avgMonthlySales = Math.round(totalAnnualSales / currentSalesData.months.length);
  const peakSalesMonth = currentSalesData.months.reduce(
    (max, m) => (m.amount > max.amount ? m : max),
    currentSalesData.months[0]
  );
  const totalAnnualPatients = currentPatientData.bars.reduce((sum, b) => sum + Number(b.count || 0), 0);
  const avgMonthlyPatients = Math.round(totalAnnualPatients / currentPatientData.bars.length);
  const peakPatientMonth = currentPatientData.bars.reduce(
    (max, b) => (Number(b.count) > Number(max.count) ? b : max),
    currentPatientData.bars[0]
  );

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
        title={`${greeting.text} ${greeting.emoji} , ${doctorName}`}
        subtitle="Avicena Dental Practice — Nairobi Main Branch  Overview"
        actions={
          <div className="flex items-center gap-2">
            {/* Date Filter Pill */}
            <div className="flex items-center rounded border border-slate-200 bg-white p-0.5 shadow-2xs">
              {['Today', 'This Week', 'This Month', 'Year 2026'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${selectedTimeframe === tf
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
          <KpiCard key={card.id || card.title} {...card} onCopy={handleCopy} />
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
                  {currentSalesData.title} ({currentSalesData.year})
                </h2>
                <InfoBadgeIcon
                  title={`Sales & Profit Summary (${currentSalesData.year})`}
                  subtitle="Avicena Dental Practice — Monthly Revenue & Profit"
                  accentColor="#5654DC"
                  stats={[
                    { label: 'Net Profit (YTD)', value: currentSalesData.totalProfit },
                    { label: '12-Mo Gross Sales', value: formatCurrency(totalAnnualSales) },
                    { label: 'Monthly Average', value: formatCurrency(avgMonthlySales) },
                    { label: `Peak Month (${peakSalesMonth.month})`, value: peakSalesMonth.value },
                  ]}
                  items={currentSalesData.months.map((m) => ({
                    label: m.month,
                    value: m.compactValue,
                  }))}
                  onOpenModal={() => setActiveChartModal('sales')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('sales')}
                selectedYear={salesYear}
                onSelectYear={(yr) => setSalesYear(Number(yr))}
              />
            </div>

            {/* Total Profit Value Block */}
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#888888] select-text">
                  {currentSalesData.subtitle} • {currentSalesData.year}
                </span>
                <span
                  className="mt-1 text-2xl font-semibold tracking-tight text-[#080808] leading-none cursor-pointer hover:text-[#5654DC] transition-colors select-text"
                  title="Click to copy net profit"
                  onClick={() => handleCopy(currentSalesData.totalProfit, 'Total Net Profit')}
                >
                  {currentSalesData.totalProfit}
                </span>
              </div>
              <span
                className="text-[11px] font-medium text-[#888888] cursor-pointer hover:text-[#080808] transition-colors select-text"
                title="Click to copy month value"
                onClick={() => handleCopy(activeSalesMonthObj.value, `${activeSalesMonthObj.month} ${currentSalesData.year} Sales`)}
              >
                Selected:{' '}
                <strong className="text-[#080808]">
                  {activeSalesMonthObj.month} {currentSalesData.year}
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
              className={`w-full block transition-all duration-300 ${isSalesExpanded ? 'h-80' : 'h-auto'
                } select-text`}
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
              {currentSalesData.yAxisLabels.map((item) => (
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
                d={currentSalesData.areaPath}
                fill="url(#salesAreaHoriz)"
                mask="url(#salesAreaFadeMask)"
              />

              {/* Smooth Cubic Bezier Line (Vector 846) */}
              <path
                d={currentSalesData.linePath}
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
              {currentSalesData.months.map((m) => {
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
                  {currentPatientData.title} ({currentPatientData.year})
                </h3>
                <InfoBadgeIcon
                  title={`Patient Growth Overview (${currentPatientData.year})`}
                  subtitle="Monthly New & Returning Patient Visits"
                  accentColor="#FF9F0A"
                  stats={[
                    { label: 'Annual Visits', value: `${formatNumber(totalAnnualPatients)} pts` },
                    { label: 'Monthly Average', value: `${formatNumber(avgMonthlyPatients)} pts` },
                    { label: 'New Patients', value: currentPatientData.metrics[0].value },
                    { label: `Peak Month (${peakPatientMonth.month})`, value: `${peakPatientMonth.count} pts` },
                  ]}
                  items={currentPatientData.bars.map((b) => ({
                    label: b.month,
                    value: `${b.count} pts`,
                  }))}
                  onOpenModal={() => setActiveChartModal('patient-growth')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('patient-growth')}
                selectedYear={patientGrowthYear}
                onSelectYear={(yr) => setPatientGrowthYear(Number(yr))}
              />
            </div>

            {/* Metrics Overview Row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {currentPatientData.metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity select-text"
                  title="Click to copy metric"
                  onClick={() => handleCopy(metric.value, metric.label)}
                >
                  <span className="text-xs font-medium text-[#888888] select-text">{metric.label}</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-[#080808] leading-none select-text">
                      {metric.value}
                    </span>
                    {metric.isPositive ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E8FFF4] border border-[#8FE7BE] px-1.5 py-0.5 text-[10px] font-bold text-[#1DBF73] select-text">
                        <svg width="9" height="9" viewBox="389 150 12 12" fill="none">
                          <path
                            d="M395.669 153.219V161.334H394.335V153.219L390.759 156.795L389.816 155.852L395.002 150.667L400.187 155.852L399.244 156.795L395.669 153.219Z"
                            fill="#1DBF73"
                          />
                        </svg>
                        {metric.change}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#FFEAEA] border border-[#FF9F9D] px-1.5 py-0.5 text-[10px] font-bold text-[#FB3B52] select-text">
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
              className={`w-full block transition-all duration-300 ${isWebExpanded ? 'h-80' : 'h-auto'
                } select-text`}
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
              {currentPatientData.yAxisLabels.map((item) => (
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
              {currentPatientData.bars.map((bar, idx) => {
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
                    onClick={() => {
                      setSelectedWebWeek(bar.month);
                      handleCopy(`${bar.count} patients`, `${bar.month} visits`);
                    }}
                    title="Click to select month and copy visits"
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
              {currentPatientData.xAxisLabels.map((item) => {
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
            className="w-full max-w-4xl rounded border border-[#EFEFEF] bg-white p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border ${activeChartModal === 'sales'
                    ? 'bg-indigo-50 border-indigo-100 text-[#5654DC]'
                    : activeChartModal === 'patient-growth'
                      ? 'bg-amber-50 border-amber-100 text-[#FF9F0A]'
                      : activeChartModal === 'payment'
                        ? 'bg-cyan-50 border-cyan-100 text-[#00CBE8]'
                        : activeChartModal === 'income'
                          ? 'bg-orange-50 border-orange-100 text-[#FF9900]'
                          : 'bg-emerald-50 border-emerald-100 text-[#00C26B]'
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
                  ) : activeChartModal === 'patient-growth' ? (
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
                  ) : activeChartModal === 'payment' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="10" width="7" height="11" rx="1" stroke="#00CBE8" strokeWidth="2" />
                      <path d="M2.5 3h19v7H2.5z" stroke="#00CBE8" strokeWidth="2" strokeLinejoin="round" />
                      <rect x="14" y="13" width="7.5" height="8" rx="1" stroke="#00CBE8" strokeWidth="2" />
                    </svg>
                  ) : activeChartModal === 'income' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="7" y="8" width="13" height="13" rx="3" stroke="#FF9900" strokeWidth="2" />
                      <path d="M5 3h14v5H5z" stroke="#FF9900" strokeWidth="2" strokeLinejoin="round" />
                      <rect x="3" y="14" width="7" height="3.5" rx="1.5" stroke="#FF9900" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="6" width="18" height="14" rx="2" stroke="#00CBE8" strokeWidth="2" />
                      <path d="M16 13a2 2 0 100-4 2 2 0 000 4z" stroke="#00CBE8" strokeWidth="2" />
                      <path d="M9 3v3M15 3v3" stroke="#00CBE8" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#080808]">
                    {activeChartModal === 'sales'
                      ? `${currentSalesData.title} — Full Year Analytics (${currentSalesData.year})`
                      : activeChartModal === 'patient-growth'
                        ? `${currentPatientData.title} — Full Year Analytics (${currentPatientData.year})`
                        : activeChartModal === 'payment'
                          ? `Payment Distribution Overview (${paymentYear})`
                          : activeChartModal === 'income'
                            ? `Asset Distribution & Income Summary (${incomeYear})`
                            : `Practice Financial Balance & Streams (${balanceYear})`}
                  </h2>
                  <p className="text-xs text-[#888888]">
                    Interactive practice analytics display • Select tabs to review complete departmental metrics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={
                    activeChartModal === 'sales'
                      ? salesYear
                      : activeChartModal === 'patient-growth'
                        ? patientGrowthYear
                        : activeChartModal === 'payment'
                          ? paymentYear
                          : activeChartModal === 'income'
                            ? incomeYear
                            : balanceYear
                  }
                  onChange={(e) => {
                    const yr = Number(e.target.value);
                    if (activeChartModal === 'sales') setSalesYear(yr);
                    else if (activeChartModal === 'patient-growth') setPatientGrowthYear(yr);
                    else if (activeChartModal === 'payment') setPaymentYear(yr);
                    else if (activeChartModal === 'income') setIncomeYear(yr);
                    else setBalanceYear(yr);
                  }}
                  className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      Year {yr}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setActiveChartModal(null)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick Chart Switch Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
              {[
                { id: 'sales', label: 'Sales & Revenue' },
                { id: 'patient-growth', label: 'Patient Growth' },
                { id: 'payment', label: 'Payment Distribution' },
                { id: 'income', label: 'Income Summary' },
                { id: 'balance', label: 'Financial Balance' },
              ].map((tab) => {
                const isActive = activeChartModal === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveChartModal(tab.id)}
                    className={`rounded px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeChartModal === 'sales' ? (
              <>
                {/* Sales KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(currentSalesData.totalProfit, 'Total Net Profit')}
                    title="Click to copy net profit"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Total Net Profit</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{currentSalesData.totalProfit}</div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(formatCurrency(totalAnnualSales), '12-Month Gross Sales')}
                    title="Click to copy gross sales"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">12-Month Gross Sales</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{formatCurrency(totalAnnualSales)}</div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(formatCurrency(avgMonthlySales), 'Monthly Average Sales')}
                    title="Click to copy monthly average"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Monthly Average</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{formatCurrency(avgMonthlySales)}</div>
                  </div>
                  <div
                    className="rounded border border-indigo-100 bg-indigo-50/50 p-3 cursor-pointer hover:bg-indigo-50 transition-all select-text"
                    onClick={() => handleCopy(activeSalesMonthObj.value, `${activeSalesMonthObj.month} ${currentSalesData.year} Sales`)}
                    title="Click to copy selected month sales"
                  >
                    <span className="text-[11px] font-semibold text-[#5654DC] select-text">
                      Selected ({activeSalesMonthObj.month} {currentSalesData.year})
                    </span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{activeSalesMonthObj.value}</div>
                  </div>
                </div>

                {/* Expanded Sales Smooth Line & Area Chart */}
                <div className="rounded border border-[#EFEFEF] bg-white p-4">
                  <svg viewBox="20 214 674 258" fill="none" className="w-full h-auto block select-text">
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
                    {currentSalesData.yAxisLabels.map((item) => (
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
                      d={currentSalesData.areaPath}
                      fill="url(#salesAreaHoriz)"
                      mask="url(#salesAreaFadeMask)"
                    />
                    <path
                      d={currentSalesData.linePath}
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
                    {currentSalesData.months.map((m) => {
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
                    Monthly Sales Breakdown ({currentSalesData.year})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {currentSalesData.months.map((m) => {
                      const isSelected = m.month === selectedSalesMonth;
                      return (
                        <button
                          key={m.month}
                          type="button"
                          onClick={() => setSelectedSalesMonth(m.month)}
                          className={`flex flex-col items-start rounded border p-2.5 text-left transition-all cursor-pointer ${isSelected
                            ? 'border-[#5654DC] bg-indigo-50/60 shadow-2xs'
                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                            }`}
                        >
                          <span className="text-[11px] font-semibold text-[#888888]">
                            {m.month} {currentSalesData.year}
                          </span>
                          <span className="mt-0.5 text-xs font-bold text-[#080808]">{m.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : activeChartModal === 'patient-growth' ? (
              <>
                {/* Patient Growth KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentPatientData.metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                      onClick={() => handleCopy(metric.value, metric.label)}
                      title="Click to copy metric value"
                    >
                      <span className="text-[11px] font-medium text-[#888888] select-text">{metric.label}</span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-lg font-bold text-[#080808] select-text">{metric.value}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold select-text ${metric.isPositive
                            ? 'bg-[#E8FFF4] border border-[#8FE7BE] text-[#1DBF73]'
                            : 'bg-[#FFEAEA] border border-[#FF9F9D] text-[#FB3B52]'
                            }`}
                        >
                          {metric.isPositive ? '▲' : '▼'} {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div
                    className="rounded border border-amber-200 bg-amber-50/60 p-3 cursor-pointer hover:bg-amber-100/60 transition-all select-text"
                    onClick={() => handleCopy(`${activePatientMonthObj.count} Patients`, `${activePatientMonthObj.month} ${currentPatientData.year} Visits`)}
                    title="Click to copy selected month patient visits"
                  >
                    <span className="text-[11px] font-semibold text-[#E08600] select-text">
                      Selected ({activePatientMonthObj.month} {currentPatientData.year})
                    </span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">
                      {activePatientMonthObj.count} Patients
                    </div>
                  </div>
                </div>

                {/* Expanded Patient Growth 12-Month Bar Chart */}
                <div className="rounded border border-[#EFEFEF] bg-white p-4">
                  <svg viewBox="28 220 674 258" fill="none" className="w-full h-auto block select-text">
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
                    {currentPatientData.yAxisLabels.map((item) => (
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
                    {currentPatientData.bars.map((bar, idx) => {
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
                    {currentPatientData.xAxisLabels.map((item) => {
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
                    Monthly Patient Visits Breakdown ({currentPatientData.year})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {currentPatientData.bars.map((bar) => {
                      const isSelected = bar.month === selectedWebWeek;
                      return (
                        <button
                          key={bar.month}
                          type="button"
                          onClick={() => setSelectedWebWeek(bar.month)}
                          className={`flex flex-col items-start rounded border p-2.5 text-left transition-all cursor-pointer ${isSelected
                            ? 'border-[#FF9F0A] bg-amber-50/70 shadow-2xs'
                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                            }`}
                        >
                          <span className="text-[11px] font-semibold text-[#888888]">
                            {bar.month} {currentPatientData.year}
                          </span>
                          <span className="mt-0.5 text-xs font-bold text-[#080808]">{bar.count} Patients</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : activeChartModal === 'payment' ? (
              <>
                {/* Payment Distribution KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(`${formatNumber(totalTransactions)} sales`, 'Total Transactions')}
                    title="Click to copy total transactions"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Total Transactions</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{formatNumber(totalTransactions)} sales</div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy('+14% vs last mo', 'Monthly Growth')}
                    title="Click to copy growth"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Monthly Growth</span>
                    <div className="mt-1 flex items-center gap-1 text-lg font-bold text-[#00C26B] select-text">
                      <span>▲</span> +14% vs last mo
                    </div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy('Cash & Private Pay (60%)', 'Dominant Channel')}
                    title="Click to copy dominant channel"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Dominant Channel</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">Cash &amp; Private (60%)</div>
                  </div>
                  <div className="rounded border border-cyan-100 bg-cyan-50/50 p-3 select-text">
                    <span className="text-[11px] font-semibold text-[#00CBE8] select-text">Active Filter</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">Year {paymentYear}</div>
                  </div>
                </div>

                {/* Donut Chart Visual & Channel Breakdown (Exact Figma SVG Spec) */}
                <div className="rounded border border-[#EFEFEF] bg-white p-6">
                  <div className="w-full max-w-2xl mx-auto">
                    <svg viewBox="65 60 625 345" fill="none" className="w-full h-auto block select-text">
                      <defs>
                        <filter id="modalBadgeShadow_pie" x="0" y="0" width="200%" height="200%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                        </filter>
                      </defs>

                      {/* 3 Donut Smooth Arc Paths (Exact Figma Vector Geometry) */}
                      {/* 16% Red Arc (#FB3B52) */}
                      <path
                        d="M160.443 114.178C159.429 112.215 160.196 109.797 162.185 108.836C183.475 98.5506 206.926 93.4712 230.601 94.0435C254.276 94.6158 277.454 100.822 298.222 112.124C300.162 113.18 300.811 115.633 299.704 117.544L288.773 136.406C287.665 138.317 285.221 138.962 283.273 137.919C266.84 129.119 248.554 124.286 229.881 123.835C211.208 123.383 192.709 127.327 175.87 135.323C173.874 136.271 171.464 135.508 170.45 133.545L160.443 114.178Z"
                        fill="#FB3B52"
                      />
                      {/* 24% Purple Arc (#5654D4) */}
                      <path
                        d="M305.526 121.104C306.722 119.247 309.201 118.707 311.026 119.952C338.558 138.753 359.025 166.273 369.086 198.139C379.147 230.004 378.194 264.288 366.448 295.489C365.67 297.557 363.331 298.538 361.285 297.705L341.096 289.48C339.05 288.647 338.074 286.314 338.838 284.242C347.969 259.482 348.637 232.348 340.669 207.111C332.701 181.874 316.573 160.043 294.88 145.015C293.064 143.757 292.523 141.287 293.72 139.43L305.526 121.104Z"
                        fill="#5654D4"
                      />
                      {/* 60% Cyan Arc (#3FC8E4) */}
                      <path
                        d="M359.027 302.949C361.039 303.862 361.934 306.236 360.967 308.222C351.273 328.134 337.254 345.65 319.915 359.481C301.533 374.144 279.942 384.248 256.907 388.968C233.872 393.687 210.046 392.888 187.379 386.636C164.712 380.383 143.846 368.855 126.488 352.993C109.13 337.131 95.7728 317.386 87.5078 295.373C79.2428 273.36 76.305 249.703 78.9347 226.337C81.5644 202.97 89.6868 180.558 102.638 160.933C114.854 142.421 131.039 126.884 149.999 115.439C151.89 114.297 154.334 114.976 155.425 116.897L166.186 135.856C167.276 137.777 166.599 140.213 164.715 141.367C149.842 150.482 137.136 162.759 127.51 177.346C117.149 193.047 110.652 210.976 108.548 229.669C106.444 248.362 108.794 267.288 115.406 284.898C122.018 302.509 132.704 318.305 146.591 330.994C160.477 343.684 177.17 352.906 195.303 357.909C213.437 362.911 232.497 363.55 250.925 359.774C269.354 355.999 286.627 347.915 301.332 336.185C314.994 325.287 326.08 311.528 333.821 295.896C334.801 293.916 337.166 293.022 339.177 293.936L359.027 302.949Z"
                        fill="#3FC8E4"
                      />

                      {/* 3 Circular Floating Percentage Badges with Soft Drop Shadow */}
                      {/* 16% Badge */}
                      <g filter="url(#modalBadgeShadow_pie)">
                        <rect x="207" y="68" width="40" height="40" rx="20" fill="white" stroke="#E0E0E0" />
                        <text x="227" y="93" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700">
                          16%
                        </text>
                      </g>

                      {/* 24% Badge */}
                      <g filter="url(#modalBadgeShadow_pie)">
                        <rect x="346" y="157" width="40" height="40" rx="20" fill="white" stroke="#E0E0E0" />
                        <text x="366" y="182" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700">
                          24%
                        </text>
                      </g>

                      {/* 60% Badge */}
                      <g filter="url(#modalBadgeShadow_pie)">
                        <rect x="78" y="304" width="40" height="40" rx="20" fill="white" stroke="#E0E0E0" />
                        <text x="98" y="329" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700">
                          60%
                        </text>
                      </g>

                      {/* Center Cutout Text */}
                      <text x="235" y="235" textAnchor="middle" fill="#5654D4" fontSize="28" fontWeight="800">
                        +14%
                      </text>
                      <text x="235" y="258" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="600">
                        vs last month
                      </text>
                      <text x="235" y="278" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="500">
                        Great results with
                      </text>

                      {/* Right Channel Breakdown List */}
                      {/* Item 1: SHA & Insurance */}
                      <g>
                        <rect x="475" y="129" width="4" height="26" rx="2" fill="#FB3B52" />
                        <text x="490" y="141" fill="#080808" fontSize="14" fontWeight="600">
                          SHA &amp; Insurance
                        </text>
                        <text x="490" y="160" fill="#888888" fontSize="13" fontWeight="500">
                          <tspan fill="#080808" fontWeight="700">{formatNumber(shaSales)}</tspan> sales (16%)
                        </text>
                      </g>

                      {/* Item 2: M-Pesa STK Till */}
                      <g>
                        <rect x="475" y="217" width="4" height="26" rx="2" fill="#5654D4" />
                        <text x="490" y="229" fill="#080808" fontSize="14" fontWeight="600">
                          M-Pesa STK Till
                        </text>
                        <text x="490" y="248" fill="#888888" fontSize="13" fontWeight="500">
                          <tspan fill="#080808" fontWeight="700">{formatNumber(mpesaSales)}</tspan> sales (24%)
                        </text>
                      </g>

                      {/* Item 3: Cash & Private Pay */}
                      <g>
                        <rect x="475" y="305" width="4" height="26" rx="2" fill="#3FC8E4" />
                        <text x="490" y="317" fill="#080808" fontSize="14" fontWeight="600">
                          Cash &amp; Private Pay
                        </text>
                        <text x="490" y="336" fill="#888888" fontSize="13" fontWeight="500">
                          <tspan fill="#080808" fontWeight="700">{formatNumber(cashSales)}</tspan> sales (60%)
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </>
            ) : activeChartModal === 'income' ? (
              <>
                {/* Income Summary KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(formatCurrency(totalIncomeVal), 'Total Income')}
                    title="Click to copy total income"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Total Income</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{formatCurrency(totalIncomeVal)}</div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy('+32.1%', 'Growth Pace')}
                    title="Click to copy growth pace"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Growth Pace</span>
                    <div className="mt-1 flex items-center gap-1 text-lg font-bold text-[#00C26B] select-text">
                      <span>▲</span> 32.1%
                    </div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy('94% Optimal', 'Yield Score')}
                    title="Click to copy yield score"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Yield Score</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">94% Optimal</div>
                  </div>
                  <div className="rounded border border-orange-100 bg-orange-50/50 p-3 select-text">
                    <span className="text-[11px] font-semibold text-[#FF9900] select-text">Active Year</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">Year {incomeYear}</div>
                  </div>
                </div>

                <div className="rounded border border-[#EFEFEF] bg-white p-6 flex flex-col md:flex-row items-center justify-around gap-6">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-52 h-52 -rotate-90 select-text" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#EFEFEF" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#00C26B"
                        strokeWidth="8"
                        strokeDasharray="314"
                        strokeDashoffset="78"
                        strokeLinecap="round"
                      />
                      <circle cx="60" cy="60" r="38" fill="none" stroke="#EFEFEF" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="38"
                        fill="none"
                        stroke="#FF9900"
                        strokeWidth="8"
                        strokeDasharray="238"
                        strokeDashoffset="95"
                        strokeLinecap="round"
                      />
                      <circle cx="60" cy="60" r="26" fill="none" stroke="#EFEFEF" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="26"
                        fill="none"
                        stroke="#FFDC8E"
                        strokeWidth="8"
                        strokeDasharray="163"
                        strokeDashoffset="65"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div
                      className="absolute flex flex-col items-center justify-center text-center cursor-pointer select-text"
                      onClick={() => handleCopy('32.1%', 'Pacing Yield')}
                      title="Click to copy pacing yield"
                    >
                      <span className="text-xl font-bold text-[#080808] select-text">32.1%</span>
                      <span className="text-xs text-[#888888] select-text">Pacing yield</span>
                    </div>
                  </div>

                  <div className="space-y-3 w-full max-w-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] select-text">Settlement Routes</h4>
                    <div
                      className="rounded border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                      onClick={() => handleCopy(formatCurrency(mpesaIncomeVal), 'M-Pesa STK Income')}
                      title="Click to copy M-Pesa STK income"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#00C26B]" />
                        <span className="text-xs font-semibold text-slate-800 select-text">M-Pesa STK</span>
                      </div>
                      <span className="text-xs font-bold text-[#080808] select-text">{formatCurrency(mpesaIncomeVal)}</span>
                    </div>
                    <div
                      className="rounded border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                      onClick={() => handleCopy(formatCurrency(privateIncomeVal), 'Private Payers Income')}
                      title="Click to copy Private Payers income"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#FF9900]" />
                        <span className="text-xs font-semibold text-slate-800 select-text">Private Payers</span>
                      </div>
                      <span className="text-xs font-bold text-[#080808] select-text">{formatCurrency(privateIncomeVal)}</span>
                    </div>
                    <div
                      className="rounded border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                      onClick={() => handleCopy(formatCurrency(claimsIncomeVal), 'Insurance Claims Income')}
                      title="Click to copy Insurance Claims income"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#FFE88C]" />
                        <span className="text-xs font-semibold text-slate-800 select-text">Insurance Claims</span>
                      </div>
                      <span className="text-xs font-bold text-[#080808] select-text">{formatCurrency(claimsIncomeVal)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Balance KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy(formatCurrency(totalBalanceVal), 'Settled Balance')}
                    title="Click to copy settled balance"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Settled Balance</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">{formatCurrency(totalBalanceVal)}</div>
                  </div>
                  <div
                    className="rounded border border-slate-100 bg-slate-50/70 p-3 cursor-pointer hover:bg-slate-100/70 transition-all select-text"
                    onClick={() => handleCopy('+12% vs last yrs', 'Fiscal Pace')}
                    title="Click to copy fiscal pace"
                  >
                    <span className="text-[11px] font-medium text-[#888888] select-text">Fiscal Pace</span>
                    <div className="mt-1 flex items-center gap-1 text-lg font-bold text-[#00C26B] select-text">
                      <span>▲</span> 12% vs last yrs
                    </div>
                  </div>
                  <div className="rounded border border-slate-100 bg-slate-50/70 p-3 select-text">
                    <span className="text-[11px] font-medium text-[#888888] select-text">Cycle Window</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">Feb 1 – 28</div>
                  </div>
                  <div className="rounded border border-emerald-100 bg-emerald-50/50 p-3 select-text">
                    <span className="text-[11px] font-semibold text-[#00C26B] select-text">Active Year</span>
                    <div className="mt-1 text-lg font-bold text-[#080808] select-text">Year {balanceYear}</div>
                  </div>
                </div>

                {/* Financial Balance SVG Visual (Exact Figma Spec) */}
                <div className="rounded border border-[#EFEFEF] bg-white p-6">
                  <div className="w-full max-w-xl mx-auto">
                    <svg viewBox="20 100 510 315" fill="none" className="w-full h-auto block select-text">
                      {/* Total Settled Balance Metric */}
                      <text x="32" y="132" fill="#080808" fontSize="28" fontWeight="800">
                        {formatCurrency(totalBalanceVal)}
                      </text>

                      {/* ▲ 12% vs last years pill badge */}
                      <rect x="32" y="146" width="62" height="24" rx="12" fill="#E8FFF4" stroke="#8FE7BE" />
                      <polygon points="43,160 48,154 53,160" fill="#1DBF73" />
                      <text x="58" y="163" fill="#1DBF73" fontSize="12" fontWeight="700">
                        12%
                      </text>
                      <text x="104" y="163" fill="#888888" fontSize="12" fontWeight="500">
                        vs last years
                      </text>

                      {/* 3 Dashed Vertical Grid Lines */}
                      <line x1="32" y1="195" x2="32" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                      <line x1="190" y1="195" x2="190" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                      <line x1="376" y1="195" x2="376" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />

                      {/* Column 1: Primary Care / Upwork */}
                      <text x="44" y="232" fill="#080808" fontSize="17" fontWeight="700">
                        {formatCurrency(primaryCareVal)}
                      </text>
                      <text x="44" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500">
                        Primary Care
                      </text>
                      <circle cx="52" cy="318" r="8" fill="#E8FFF4" />
                      <polygon points="49,320 52,316 55,320" fill="#1DBF73" />
                      <text x="65" y="322" fill="#1DBF73" fontSize="12.5" fontWeight="700">
                        32.1%
                      </text>

                      {/* Column 2: Speciality Care / Fiverr */}
                      <text x="202" y="232" fill="#080808" fontSize="17" fontWeight="700">
                        {formatCurrency(specialityCareVal)}
                      </text>
                      <text x="202" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500">
                        Speciality
                      </text>
                      <circle cx="210" cy="318" r="8" fill="#FFEFEF" />
                      <polygon points="207,316 210,320 213,316" fill="#FB3B52" />
                      <text x="223" y="322" fill="#FB3B52" fontSize="12.5" fontWeight="700">
                        16.1%
                      </text>

                      {/* Column 3: Full-time Retainer */}
                      <text x="388" y="232" fill="#080808" fontSize="17" fontWeight="700">
                        {formatCurrency(fixedIncomeVal)}
                      </text>
                      <text x="388" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500">
                        Full-time
                      </text>
                      <text x="388" y="322" fill="#888888" fontSize="12.5" fontWeight="500">
                        Fixed income
                      </text>

                      {/* 3-Color Segmented Horizontal Progress Bar (Figma spec coordinates & colors) */}
                      <rect x="32" y="352" width="156" height="22" rx="4" fill="#FFC90A" />
                      <rect x="192" y="352" width="182" height="22" rx="4" fill="#1DBF73" />
                      <rect x="378" y="352" width="142" height="22" rx="4" fill="#3FC8E4" />

                      {/* Footer Date Timeline */}
                      <text x="32" y="400" fill="#080808" fontSize="13" fontWeight="600">
                        Feb
                      </text>
                      <text x="520" y="400" textAnchor="end" fill="#080808" fontSize="13" fontWeight="600">
                        1 - 28
                      </text>
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Secondary Row: 3 Analytics Cards (Payment Distribution Overview, Asset Distribution, Practice Financial Balance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Card 1: Payment Distribution Overview (Donut Chart) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Store-detail / Blue Icon (#00CBE8) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <rect x="3" y="10" width="7" height="11" rx="1" stroke="#00CBE8" strokeWidth="2" />
                  <path d="M2.5 3h19v7H2.5z" stroke="#00CBE8" strokeWidth="2" strokeLinejoin="round" />
                  <rect x="14" y="13" width="7.5" height="8" rx="1" stroke="#00CBE8" strokeWidth="2" />
                </svg>
                <h3 className="text-sm font-semibold text-[#080808] tracking-tight">
                  Payment Distribution ({paymentYear})
                </h3>
                <InfoBadgeIcon
                  title={`Payment Distribution Overview (${paymentYear})`}
                  subtitle="Breakdown by Payment Channels & Care Streams"
                  accentColor="#00CBE8"
                  stats={[
                    { label: 'Growth', value: '+14% vs last month' },
                    { label: 'Dominant Channel', value: 'SHA & Ins. (60%)' },
                    { label: 'Total Volume', value: `${formatNumber(totalTransactions)} sales` },
                    { label: 'Top Method', value: 'M-Pesa STK Till' },
                  ]}
                  items={[
                    { label: 'SHA & Ins.', value: formatNumber(shaSales) },
                    { label: 'M-Pesa Till', value: formatNumber(mpesaSales) },
                    { label: 'Cash & Card', value: formatNumber(cashSales) },
                  ]}
                  onOpenModal={() => setActiveChartModal('payment')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('payment')}
                selectedYear={paymentYear}
                onSelectYear={(yr) => setPaymentYear(Number(yr))}
              />
            </div>

            {/* Top Summaries Row (Matching Top Cards UI) */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div
                className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3 cursor-pointer hover:border-slate-200 transition-all select-text group"
                onClick={() => handleCopy('+14%', 'Monthly Channel Growth')}
                title="Click to copy growth rate"
              >
                <span className="text-xs font-medium text-[#888888] select-text">Monthly Channel Growth</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#080808] group-hover:text-emerald-600 transition-colors select-text">
                    +14%
                  </span>
                  <div className="flex items-center gap-0.5 rounded bg-[#FFFFFF] border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-[#00C26B] select-text">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2.5L9 6.5H3L6 2.5Z" fill="#00C26B" />
                    </svg>
                    <span>vs last mo</span>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 flex">
                  <div className="h-full bg-[#00CBE8]" style={{ width: '60%' }} title="Cash & Private (60%)" />
                  <div className="h-full bg-[#5654DC]" style={{ width: '24%' }} title="M-Pesa Till (24%)" />
                  <div className="h-full bg-[#FB3B52]" style={{ width: '16%' }} title="SHA / Insurance (16%)" />
                </div>
              </div>

              <div
                className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3 cursor-pointer hover:border-slate-200 transition-all select-text group"
                onClick={() => handleCopy(`${formatNumber(totalTransactions)} sales`, 'Total Transactions')}
                title="Click to copy total sales transactions"
              >
                <span className="text-xs font-medium text-[#888888] select-text">Total Transactions</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#080808] group-hover:text-cyan-600 transition-colors select-text">
                    {formatNumber(totalTransactions)}
                  </span>
                  <span className="text-[10px] font-semibold text-[#888888] select-text">sales</span>
                </div>
                <span className="mt-2 text-[11px] font-medium text-[#00CBE8] truncate select-text">
                  Dominant: SHA / Ins. ({formatNumber(shaSales)})
                </span>
              </div>
            </div>

            {/* Donut Chart Visual & Channel Breakdown (Exact Figma Vector Spec) */}
            <div className="w-full flex-1 flex items-center justify-center py-1 overflow-hidden">
              <svg viewBox="65 60 625 345" fill="none" className="w-full h-auto block select-text">
                <defs>
                  <filter id="cardBadgeShadow_pie" x="0" y="0" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* 3 Donut Smooth Arc Paths (Interactive with Focus & Tooltip) */}
                {/* 16% Red Arc (#FB3B52) - SHA & Insurance */}
                <path
                  d="M160.443 114.178C159.429 112.215 160.196 109.797 162.185 108.836C183.475 98.5506 206.926 93.4712 230.601 94.0435C254.276 94.6158 277.454 100.822 298.222 112.124C300.162 113.18 300.811 115.633 299.704 117.544L288.773 136.406C287.665 138.317 285.221 138.962 283.273 137.919C266.84 129.119 248.554 124.286 229.881 123.835C211.208 123.383 192.709 127.327 175.87 135.323C173.874 136.271 171.464 135.508 170.45 133.545L160.443 114.178Z"
                  fill="#FB3B52"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    opacity: focusedPaymentChannel && focusedPaymentChannel !== 'sha' ? 0.35 : 1,
                    transform: focusedPaymentChannel === 'sha' ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: '235px 245px',
                  }}
                  onClick={() => setFocusedPaymentChannel((p) => (p === 'sha' ? null : 'sha'))}
                  onMouseEnter={() => setFocusedPaymentChannel('sha')}
                  title="SHA & Insurance: 54,071 sales (16%) • Click to select"
                />
                {/* 24% Purple Arc (#5654D4) - M-Pesa STK Till */}
                <path
                  d="M305.526 121.104C306.722 119.247 309.201 118.707 311.026 119.952C338.558 138.753 359.025 166.273 369.086 198.139C379.147 230.004 378.194 264.288 366.448 295.489C365.67 297.557 363.331 298.538 361.285 297.705L341.096 289.48C339.05 288.647 338.074 286.314 338.838 284.242C347.969 259.482 348.637 232.348 340.669 207.111C332.701 181.874 316.573 160.043 294.88 145.015C293.064 143.757 292.523 141.287 293.72 139.43L305.526 121.104Z"
                  fill="#5654D4"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    opacity: focusedPaymentChannel && focusedPaymentChannel !== 'mpesa' ? 0.35 : 1,
                    transform: focusedPaymentChannel === 'mpesa' ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: '235px 245px',
                  }}
                  onClick={() => setFocusedPaymentChannel((p) => (p === 'mpesa' ? null : 'mpesa'))}
                  onMouseEnter={() => setFocusedPaymentChannel('mpesa')}
                  title="M-Pesa STK Till: 32,210 sales (24%) • Click to select"
                />
                {/* 60% Cyan Arc (#3FC8E4) - Cash & Private Pay */}
                <path
                  d="M359.027 302.949C361.039 303.862 361.934 306.236 360.967 308.222C351.273 328.134 337.254 345.65 319.915 359.481C301.533 374.144 279.942 384.248 256.907 388.968C233.872 393.687 210.046 392.888 187.379 386.636C164.712 380.383 143.846 368.855 126.488 352.993C109.13 337.131 95.7728 317.386 87.5078 295.373C79.2428 273.36 76.305 249.703 78.9347 226.337C81.5644 202.97 89.6868 180.558 102.638 160.933C114.854 142.421 131.039 126.884 149.999 115.439C151.89 114.297 154.334 114.976 155.425 116.897L166.186 135.856C167.276 137.777 166.599 140.213 164.715 141.367C149.842 150.482 137.136 162.759 127.51 177.346C117.149 193.047 110.652 210.976 108.548 229.669C106.444 248.362 108.794 267.288 115.406 284.898C122.018 302.509 132.704 318.305 146.591 330.994C160.477 343.684 177.17 352.906 195.303 357.909C213.437 362.911 232.497 363.55 250.925 359.774C269.354 355.999 286.627 347.915 301.332 336.185C314.994 325.287 326.08 311.528 333.821 295.896C334.801 293.916 337.166 293.022 339.177 293.936L359.027 302.949Z"
                  fill="#3FC8E4"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    opacity: focusedPaymentChannel && focusedPaymentChannel !== 'cash' ? 0.35 : 1,
                    transform: focusedPaymentChannel === 'cash' ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: '235px 245px',
                  }}
                  onClick={() => setFocusedPaymentChannel((p) => (p === 'cash' ? null : 'cash'))}
                  onMouseEnter={() => setFocusedPaymentChannel('cash')}
                  title="Cash & Private Pay: 24,410 sales (60%) • Click to select"
                />

                {/* 3 Circular Floating Percentage Badges with Soft Drop Shadow */}
                {/* 16% Badge */}
                <g
                  filter="url(#cardBadgeShadow_pie)"
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'sha' ? null : 'sha'));
                    handleCopy('16% (54,071 sales)', 'SHA & Insurance Share');
                  }}
                  title="16% SHA & Insurance • Click to inspect and copy"
                >
                  <rect x="207" y="68" width="40" height="40" rx="20" fill="white" stroke={focusedPaymentChannel === 'sha' ? '#FB3B52' : '#E0E0E0'} strokeWidth={focusedPaymentChannel === 'sha' ? 2 : 1} />
                  <text x="227" y="93" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700" className="select-text">
                    16%
                  </text>
                </g>

                {/* 24% Badge */}
                <g
                  filter="url(#cardBadgeShadow_pie)"
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'mpesa' ? null : 'mpesa'));
                    handleCopy('24% (32,210 sales)', 'M-Pesa STK Till Share');
                  }}
                  title="24% M-Pesa STK Till • Click to inspect and copy"
                >
                  <rect x="346" y="157" width="40" height="40" rx="20" fill="white" stroke={focusedPaymentChannel === 'mpesa' ? '#5654D4' : '#E0E0E0'} strokeWidth={focusedPaymentChannel === 'mpesa' ? 2 : 1} />
                  <text x="366" y="182" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700" className="select-text">
                    24%
                  </text>
                </g>

                {/* 60% Badge */}
                <g
                  filter="url(#cardBadgeShadow_pie)"
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'cash' ? null : 'cash'));
                    handleCopy('60% (24,410 sales)', 'Cash & Private Share');
                  }}
                  title="60% Cash & Private Pay • Click to inspect and copy"
                >
                  <rect x="78" y="304" width="40" height="40" rx="20" fill="white" stroke={focusedPaymentChannel === 'cash' ? '#3FC8E4' : '#E0E0E0'} strokeWidth={focusedPaymentChannel === 'cash' ? 2 : 1} />
                  <text x="98" y="329" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="700" className="select-text">
                    60%
                  </text>
                </g>

                {/* Interactive Dynamic Center Cutout Display */}
                {focusedPaymentChannel === 'sha' ? (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleCopy(`${formatNumber(shaSales)} sales`, 'SHA & Insurance Volume')}
                    title="Click to copy sales volume"
                  >
                    <text x="235" y="228" textAnchor="middle" fill="#FB3B52" fontSize="22" fontWeight="800" className="select-text">
                      {formatNumber(shaSales)}
                    </text>
                    <text x="235" y="252" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                      SHA &amp; Insurance
                    </text>
                    <text x="235" y="272" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="500" className="select-text">
                      16% share • Click to copy
                    </text>
                  </g>
                ) : focusedPaymentChannel === 'mpesa' ? (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleCopy(`${formatNumber(mpesaSales)} sales`, 'M-Pesa STK Till Volume')}
                    title="Click to copy sales volume"
                  >
                    <text x="235" y="228" textAnchor="middle" fill="#5654D4" fontSize="22" fontWeight="800" className="select-text">
                      {formatNumber(mpesaSales)}
                    </text>
                    <text x="235" y="252" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                      M-Pesa STK Till
                    </text>
                    <text x="235" y="272" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="500" className="select-text">
                      24% share • Click to copy
                    </text>
                  </g>
                ) : focusedPaymentChannel === 'cash' ? (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleCopy(`${formatNumber(cashSales)} sales`, 'Cash & Private Volume')}
                    title="Click to copy sales volume"
                  >
                    <text x="235" y="228" textAnchor="middle" fill="#3FC8E4" fontSize="22" fontWeight="800" className="select-text">
                      {formatNumber(cashSales)}
                    </text>
                    <text x="235" y="252" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                      Cash &amp; Private Pay
                    </text>
                    <text x="235" y="272" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="500" className="select-text">
                      60% share • Click to copy
                    </text>
                  </g>
                ) : (
                  <g
                    className="cursor-pointer"
                    onClick={() => handleCopy('+14%', 'Monthly Channel Growth')}
                    title="Click to copy growth rate"
                  >
                    <text x="235" y="235" textAnchor="middle" fill="#5654D4" fontSize="28" fontWeight="800" className="select-text">
                      +14%
                    </text>
                    <text x="235" y="258" textAnchor="middle" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                      vs last month
                    </text>
                    <text x="235" y="278" textAnchor="middle" fill="#888888" fontSize="11" fontWeight="500" className="select-text">
                      Great results with
                    </text>
                  </g>
                )}

                {/* Right Channel Breakdown List (Clickable Rows with Copy & Focus) */}
                {/* Item 1: SHA & Insurance */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'sha' ? null : 'sha'));
                    handleCopy(`${formatNumber(shaSales)} sales`, 'SHA & Insurance');
                  }}
                  title="Click to focus channel and copy sales"
                >
                  <rect
                    x="475"
                    y="126"
                    width="190"
                    height="42"
                    rx="8"
                    fill={focusedPaymentChannel === 'sha' ? '#FFF5F6' : 'transparent'}
                    className="transition-colors"
                  />
                  <rect x="475" y="132" width="4" height="26" rx="2" fill="#FB3B52" />
                  <text x="490" y="143" fill="#080808" fontSize="14" fontWeight="600" className="select-text">
                    SHA &amp; Insurance
                  </text>
                  <text x="490" y="161" fill="#888888" fontSize="13" fontWeight="500" className="select-text">
                    <tspan fill="#080808" fontWeight="700">{formatNumber(shaSales)}</tspan> sales (16%)
                  </text>
                </g>

                {/* Item 2: M-Pesa STK Till */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'mpesa' ? null : 'mpesa'));
                    handleCopy(`${formatNumber(mpesaSales)} sales`, 'M-Pesa STK Till');
                  }}
                  title="Click to focus channel and copy sales"
                >
                  <rect
                    x="475"
                    y="214"
                    width="190"
                    height="42"
                    rx="8"
                    fill={focusedPaymentChannel === 'mpesa' ? '#F6F5FF' : 'transparent'}
                    className="transition-colors"
                  />
                  <rect x="475" y="220" width="4" height="26" rx="2" fill="#5654D4" />
                  <text x="490" y="231" fill="#080808" fontSize="14" fontWeight="600" className="select-text">
                    M-Pesa STK Till
                  </text>
                  <text x="490" y="249" fill="#888888" fontSize="13" fontWeight="500" className="select-text">
                    <tspan fill="#080808" fontWeight="700">{formatNumber(mpesaSales)}</tspan> sales (24%)
                  </text>
                </g>

                {/* Item 3: Cash & Private Pay */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedPaymentChannel((p) => (p === 'cash' ? null : 'cash'));
                    handleCopy(`${formatNumber(cashSales)} sales`, 'Cash & Private Pay');
                  }}
                  title="Click to focus channel and copy sales"
                >
                  <rect
                    x="475"
                    y="302"
                    width="190"
                    height="42"
                    rx="8"
                    fill={focusedPaymentChannel === 'cash' ? '#F0FBFC' : 'transparent'}
                    className="transition-colors"
                  />
                  <rect x="475" y="308" width="4" height="26" rx="2" fill="#3FC8E4" />
                  <text x="490" y="319" fill="#080808" fontSize="14" fontWeight="600" className="select-text">
                    Cash &amp; Private Pay
                  </text>
                  <text x="490" y="337" fill="#888888" fontSize="13" fontWeight="500" className="select-text">
                    <tspan fill="#080808" fontWeight="700">{formatNumber(cashSales)}</tspan> sales (60%)
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Asset Distribution (Income Summary Radial Chart) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Orange Sack-coin Icon (#FF9900) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <rect x="7" y="8" width="13" height="13" rx="3" stroke="#FF9900" strokeWidth="2" />
                  <path d="M5 3h14v5H5z" stroke="#FF9900" strokeWidth="2" strokeLinejoin="round" />
                  <rect x="3" y="14" width="7" height="3.5" rx="1.5" stroke="#FF9900" strokeWidth="2" />
                </svg>
                <h3 className="text-sm font-semibold text-[#080808] tracking-tight">
                  Income Summary ({incomeYear})
                </h3>
                <InfoBadgeIcon
                  title={`Income Summary (${incomeYear})`}
                  subtitle="Settlement Channels & Revenue Yield"
                  accentColor="#FF9900"
                  stats={[
                    { label: 'Active Income', value: formatCurrency(totalIncomeVal) },
                    { label: 'Growth Pace', value: '+32.1%' },
                    { label: 'Optimization', value: 'High Efficiency' },
                    { label: 'Settlement Routes', value: '3 Active Channels' },
                  ]}
                  items={[
                    { label: 'M-Pesa STK', value: formatCurrency(mpesaIncomeVal) },
                    { label: 'Private Payers', value: formatCurrency(privateIncomeVal) },
                    { label: 'Insurance Claims', value: formatCurrency(claimsIncomeVal) },
                  ]}
                  onOpenModal={() => setActiveChartModal('income')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('income')}
                selectedYear={incomeYear}
                onSelectYear={(yr) => setIncomeYear(Number(yr))}
              />
            </div>

            {/* Top Summaries Row (Matching Top Cards UI) */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div
                className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3 cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-all select-text group"
                onClick={() => handleCopy(formatCurrency(totalIncomeVal), 'Active Practice Income')}
                title="Click to copy active practice income"
              >
                <span className="text-xs font-medium text-[#888888] select-text">Active Practice Income</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#080808] group-hover:text-amber-600 transition-colors select-text">
                    {formatCurrency(totalIncomeVal)}
                  </span>
                  <div className="flex items-center gap-0.5 rounded bg-[#FFFFFF] border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-[#00C26B] select-text">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2.5L9 6.5H3L6 2.5Z" fill="#00C26B" />
                    </svg>
                    <span>32.1%</span>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 flex">
                  <div className="h-full bg-[#00C26B]" style={{ width: '45%' }} />
                  <div className="h-full bg-[#FF9900]" style={{ width: '35%' }} />
                  <div className="h-full bg-[#FFDC8E]" style={{ width: '20%' }} />
                </div>
              </div>

              <div
                className="flex flex-col rounded border border-slate-100 bg-slate-50/50 p-3 select-text cursor-pointer hover:border-slate-300 transition-all"
                onClick={() => handleCopy('94% Optimal (3 active routes)', 'Channel Yield Status')}
                title="Click to copy yield status"
              >
                <span className="text-xs font-medium text-[#888888] select-text">Channel Yield Status</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#080808] select-text">Optimal</span>
                  <span className="text-[10px] font-semibold text-[#00C26B] select-text">94% score</span>
                </div>
                <span className="mt-2 text-[11px] font-medium text-[#888888] truncate select-text">
                  3 active settlement routes
                </span>
              </div>
            </div>

            {/* Concentric Nested Radial Gauge Rings SVG */}
            <div className="relative flex items-center justify-center py-2">
              <svg className="w-44 h-44 -rotate-90 select-text" viewBox="0 0 120 120">
                {/* Outer Ring - Green (#00C26B) */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#00C26B"
                  strokeWidth="8"
                  strokeDasharray="314"
                  strokeDashoffset="78"
                  strokeLinecap="round"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setFocusedIncomeRoute((p) => (p === 'mpesa' ? null : 'mpesa'));
                    handleCopy(formatCurrency(mpesaIncomeVal), 'M-Pesa STK Yield');
                  }}
                />
                {/* Middle Ring - Orange (#FF9900) */}
                <circle cx="60" cy="60" r="38" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="38"
                  fill="none"
                  stroke="#FF9900"
                  strokeWidth="8"
                  strokeDasharray="238"
                  strokeDashoffset="95"
                  strokeLinecap="round"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setFocusedIncomeRoute((p) => (p === 'private' ? null : 'private'));
                    handleCopy(formatCurrency(privateIncomeVal), 'Private Payers Yield');
                  }}
                />
                {/* Inner Ring - Soft Yellow (#FFDC8E) */}
                <circle cx="60" cy="60" r="26" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="26"
                  fill="none"
                  stroke="#FFDC8E"
                  strokeWidth="8"
                  strokeDasharray="163"
                  strokeDashoffset="65"
                  strokeLinecap="round"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setFocusedIncomeRoute((p) => (p === 'claims' ? null : 'claims'));
                    handleCopy(formatCurrency(claimsIncomeVal), 'SHA Claims Yield');
                  }}
                />
              </svg>

              <div
                className="absolute flex flex-col items-center justify-center text-center cursor-pointer select-text"
                onClick={() => handleCopy('32.1%', 'Income Growth Rate')}
                title="Click to copy growth rate"
              >
                <span className="text-lg font-bold text-[#080808] leading-tight select-text">32.1%</span>
                <span className="text-[10px] text-[#888888] select-text">Growth rate</span>
              </div>
            </div>
          </div>

          {/* Breakdown Mini Cards & Footer */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`flex flex-col rounded border p-2.5 cursor-pointer transition-all select-text ${
                  focusedIncomeRoute === 'mpesa'
                    ? 'border-emerald-400 bg-emerald-50/70 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
                onClick={() => {
                  setFocusedIncomeRoute((p) => (p === 'mpesa' ? null : 'mpesa'));
                  handleCopy(formatCurrency(mpesaIncomeVal), 'M-Pesa STK Income');
                }}
                title="Click to copy M-Pesa STK income"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#00C26B]" />
                  <span className="text-[11px] font-medium text-[#888888] truncate select-text">M-Pesa STK</span>
                </div>
                <span className="mt-1 text-xs font-bold text-[#080808] select-text">{formatCurrency(mpesaIncomeVal)}</span>
                <span className="text-[10px] text-[#00C26B] select-text">Direct Mobile</span>
              </div>

              <div
                className={`flex flex-col rounded border p-2.5 cursor-pointer transition-all select-text ${
                  focusedIncomeRoute === 'private'
                    ? 'border-orange-400 bg-orange-50/70 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
                onClick={() => {
                  setFocusedIncomeRoute((p) => (p === 'private' ? null : 'private'));
                  handleCopy(formatCurrency(privateIncomeVal), 'Private Pay Income');
                }}
                title="Click to copy Private Pay income"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FF9900]" />
                  <span className="text-[11px] font-medium text-[#888888] truncate select-text">Private Pay</span>
                </div>
                <span className="mt-1 text-xs font-bold text-[#080808] select-text">{formatCurrency(privateIncomeVal)}</span>
                <span className="text-[10px] text-[#FF9900] select-text">Self-funded</span>
              </div>

              <div
                className={`flex flex-col rounded border p-2.5 cursor-pointer transition-all select-text ${
                  focusedIncomeRoute === 'claims'
                    ? 'border-amber-400 bg-amber-50/70 shadow-xs'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
                onClick={() => {
                  setFocusedIncomeRoute((p) => (p === 'claims' ? null : 'claims'));
                  handleCopy(formatCurrency(claimsIncomeVal), 'SHA Claims Income');
                }}
                title="Click to copy SHA Claims income"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FFE88C]" />
                  <span className="text-[11px] font-medium text-[#888888] truncate select-text">SHA Claims</span>
                </div>
                <span className="mt-1 text-xs font-bold text-[#080808] select-text">{formatCurrency(claimsIncomeVal)}</span>
                <span className="text-[10px] text-[#888888] select-text">Institutional</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#888888] pt-1 select-text">
              Optimize again to get your best score
            </p>
          </div>
        </div>

        {/* Card 3: Practice Financial Balance (Horizontal Segmented Bar Chart) */}
        <div className="rounded border border-[#EFEFEF] bg-white p-4 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Wallet-dollar Blue Icon (#00CBE8) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <rect x="3" y="6" width="18" height="14" rx="2" stroke="#00CBE8" strokeWidth="2" />
                  <path d="M16 13a2 2 0 100-4 2 2 0 000 4z" stroke="#00CBE8" strokeWidth="2" />
                  <path d="M9 3v3M15 3v3" stroke="#00CBE8" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className="text-sm font-semibold text-[#080808] tracking-tight">
                  Financial Balance ({balanceYear})
                </h3>
                <InfoBadgeIcon
                  title={`Practice Financial Balance (${balanceYear})`}
                  subtitle="Retainer & Service Settlement Streams"
                  accentColor="#00CBE8"
                  stats={[
                    { label: 'Total Balance', value: formatCurrency(totalBalanceVal) },
                    { label: 'Annual Pace', value: '+12% vs last years' },
                    { label: 'Primary Share', value: '32% (Primary Care)' },
                    { label: 'Cycle Range', value: 'Feb 1 - 28' },
                  ]}
                  items={[
                    { label: 'Primary Care', value: formatCurrency(primaryCareVal) },
                    { label: 'Speciality Care', value: formatCurrency(specialityCareVal) },
                    { label: 'Full-time Retainer', value: formatCurrency(fixedIncomeVal) },
                  ]}
                  onOpenModal={() => setActiveChartModal('balance')}
                />
              </div>

              <CardActionToolbar
                onExpand={() => setActiveChartModal('balance')}
                selectedYear={balanceYear}
                onSelectYear={(yr) => setBalanceYear(Number(yr))}
              />
            </div>

            {/* Practice Financial Balance SVG Visual (Exact Figma Vector Spec) */}
            <div className="w-full flex-1 flex items-center justify-center py-1 overflow-hidden">
              <svg viewBox="20 100 510 315" fill="none" className="w-full h-auto block select-text">
                {/* Total Settled Balance Metric */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCopy(formatCurrency(totalBalanceVal), 'Settled Financial Balance')}
                  title="Click to copy total settled balance"
                >
                  <text x="32" y="132" fill="#080808" fontSize="28" fontWeight="800" className="group-hover:fill-cyan-600 transition-colors select-text">
                    {formatCurrency(totalBalanceVal)}
                  </text>
                </g>

                {/* ▲ 12% vs last years pill badge */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleCopy('+12% vs last years', 'Annual Fiscal Pace')}
                  title="Click to copy growth pace"
                >
                  <rect x="32" y="146" width="62" height="24" rx="12" fill="#E8FFF4" stroke="#8FE7BE" />
                  <polygon points="43,160 48,154 53,160" fill="#1DBF73" />
                  <text x="58" y="163" fill="#1DBF73" fontSize="12" fontWeight="700" className="select-text">
                    12%
                  </text>
                  <text x="104" y="163" fill="#888888" fontSize="12" fontWeight="500" className="select-text">
                    vs last years
                  </text>
                </g>

                {/* 3 Dashed Vertical Grid Lines */}
                <line x1="32" y1="195" x2="32" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                <line x1="190" y1="195" x2="190" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />
                <line x1="376" y1="195" x2="376" y2="335" stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="4 4" />

                {/* Column 1: Primary Care / Upwork */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedBalanceStream((p) => (p === 'primary' ? null : 'primary'));
                    handleCopy(`${formatCurrency(primaryCareVal)} (32.1%)`, 'Primary Care Balance');
                  }}
                  title="Click to inspect and copy Primary Care"
                >
                  <rect
                    x="38"
                    y="210"
                    width="140"
                    height="120"
                    rx="8"
                    fill={focusedBalanceStream === 'primary' ? '#FFFBEB' : 'transparent'}
                    className="transition-colors"
                  />
                  <text x="44" y="232" fill="#080808" fontSize="17" fontWeight="700" className="select-text">
                    {formatCurrency(primaryCareVal)}
                  </text>
                  <text x="44" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500" className="select-text">
                    Primary Care
                  </text>
                  <circle cx="52" cy="318" r="8" fill="#E8FFF4" />
                  <polygon points="49,320 52,316 55,320" fill="#1DBF73" />
                  <text x="65" y="322" fill="#1DBF73" fontSize="12.5" fontWeight="700" className="select-text">
                    32.1%
                  </text>
                </g>

                {/* Column 2: Speciality Care / Fiverr */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedBalanceStream((p) => (p === 'speciality' ? null : 'speciality'));
                    handleCopy(`${formatCurrency(specialityCareVal)} (16.1%)`, 'Speciality Care Balance');
                  }}
                  title="Click to inspect and copy Speciality Care"
                >
                  <rect
                    x="196"
                    y="210"
                    width="165"
                    height="120"
                    rx="8"
                    fill={focusedBalanceStream === 'speciality' ? '#F0FDF4' : 'transparent'}
                    className="transition-colors"
                  />
                  <text x="202" y="232" fill="#080808" fontSize="17" fontWeight="700" className="select-text">
                    {formatCurrency(specialityCareVal)}
                  </text>
                  <text x="202" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500" className="select-text">
                    Speciality
                  </text>
                  <circle cx="210" cy="318" r="8" fill="#FFEFEF" />
                  <polygon points="207,316 210,320 213,316" fill="#FB3B52" />
                  <text x="223" y="322" fill="#FB3B52" fontSize="12.5" fontWeight="700" className="select-text">
                    16.1%
                  </text>
                </g>

                {/* Column 3: Full-time Retainer */}
                <g
                  className="cursor-pointer group"
                  onClick={() => {
                    setFocusedBalanceStream((p) => (p === 'fixed' ? null : 'fixed'));
                    handleCopy(`${formatCurrency(fixedIncomeVal)} (Fixed)`, 'Full-time Retainer Balance');
                  }}
                  title="Click to inspect and copy Full-time Retainer"
                >
                  <rect
                    x="382"
                    y="210"
                    width="135"
                    height="120"
                    rx="8"
                    fill={focusedBalanceStream === 'fixed' ? '#F0FBFC' : 'transparent'}
                    className="transition-colors"
                  />
                  <text x="388" y="232" fill="#080808" fontSize="17" fontWeight="700" className="select-text">
                    {formatCurrency(fixedIncomeVal)}
                  </text>
                  <text x="388" y="255" fill="#AFAFAF" fontSize="12" fontWeight="500" className="select-text">
                    Full-time
                  </text>
                  <text x="388" y="322" fill="#888888" fontSize="12.5" fontWeight="500" className="select-text">
                    Fixed income
                  </text>
                </g>

                {/* 3-Color Segmented Horizontal Progress Bar (Figma spec coordinates & colors) */}
                <rect
                  x="32"
                  y="352"
                  width="156"
                  height="22"
                  rx="4"
                  fill="#FFC90A"
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleCopy(`${formatCurrency(primaryCareVal)} (Primary)`, 'Segment Primary Bar')}
                  title="Primary Care Segment (32%) • Click to copy"
                />
                <rect
                  x="192"
                  y="352"
                  width="182"
                  height="22"
                  rx="4"
                  fill="#1DBF73"
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleCopy(`${formatCurrency(specialityCareVal)} (Speciality)`, 'Segment Speciality Bar')}
                  title="Speciality Care Segment (38%) • Click to copy"
                />
                <rect
                  x="378"
                  y="352"
                  width="142"
                  height="22"
                  rx="4"
                  fill="#3FC8E4"
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleCopy(`${formatCurrency(fixedIncomeVal)} (Fixed)`, 'Segment Fixed Retainer Bar')}
                  title="Fixed Retainer Segment (30%) • Click to copy"
                />

                {/* Footer Date Timeline */}
                <text x="32" y="400" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                  Feb
                </text>
                <text x="520" y="400" textAnchor="end" fill="#080808" fontSize="13" fontWeight="600" className="select-text">
                  1 - 28
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section 4: Operations & Sidebar Modules Quick Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Appointments Queue Table */}
        <div className="lg:col-span-2 rounded border border-[#EFEFEF] bg-white p-6 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2"> 
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
        <div className="space-y-2">
          {/* Quick Action Operations */}
          <div className="rounded border border-[#EFEFEF] bg-white p-5 shadow-[0px_6px_10px_rgba(177,177,177,0.08),0px_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Clinic Fast Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => alert('Initiating Safaricom M-Pesa STK Push Billing...')}
                className="w-full flex items-center justify-between p-3 rounded bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-white font-black text-[10px]">
                    M
                  </span>
                  <span>M-Pesa STK Push Payment</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">Fast Pay</span>
              </button>

              <button
                onClick={() => alert('Creating Kenya SHA Insurance Pre-Authorization Claim...')}
                className="w-full flex items-center justify-between p-3 rounded bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/60 text-amber-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-600 text-white font-black text-[10px]">
                    S
                  </span>
                  <span>Kenya SHA Claim Validation</span>
                </div>
                <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold">SHA Pre-Auth</span>
              </button>

              <button
                onClick={() => alert('Opening Interactive FDI Dental Charting...')}
                className="w-full flex items-center justify-between p-3 rounded bg-sky-50/70 hover:bg-sky-100/70 border border-sky-200/60 text-sky-900 text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-sky-600 text-white font-black text-[10px]">
                    F
                  </span>
                  <span>FDI Dental Chart (Odontogram)</span>
                </div>
                <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded-full font-bold">Chart</span>
              </button>
            </div>
          </div>

          {/* Dental Inventory Low Stock Alert Banner */}
          <div className="rounded border border-amber-200/80 bg-amber-50/40 p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
              <HugeiconsIcon icon={AlertCircleIcon} size={16} className="text-amber-600 shrink-0" />
              <span>Dental Inventory Low Stock Alert</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed mb-3">
              3 Dental consumable items are below minimum reorder thresholds (3M Filtek Composite A2 &amp; Lidocaine Cartridges).
            </p>
            <button
              onClick={() => alert('Generating Dental Inventory Purchase Order...')}
              className="w-full rounded bg-amber-600 px-3 py-1.5 text-center text-xs font-extrabold text-white shadow-2xs hover:bg-amber-700 cursor-pointer transition-colors"
            >
              Reorder Dental Supplies
            </button>
          </div>
        </div>
      </div>

      {/* Floating Copy Feedback Toast */}
      {copiedText && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-400 shrink-0"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>
            Copied <strong className="text-emerald-300 font-bold">{copiedText}</strong> to clipboard
          </span>
        </div>
      )}
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

      <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-200/80 shadow-2xs">
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

      <div className="rounded border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
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
        <div className="lg:col-span-3 rounded border border-slate-200/90 bg-white p-5 shadow-2xs">
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

        <div className="rounded border border-slate-200/90 bg-white p-4 shadow-2xs space-y-4">
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
        <div className="lg:col-span-2 rounded border border-slate-200/90 bg-white p-5 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              MAXILLARY ARCH (UPPER TEETH)
            </span>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...teethUpperRight, ...teethUpperLeft].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${selectedTooth === t
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
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${selectedTooth === t
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
        <div className="rounded border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
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
        <div className="lg:col-span-2 rounded border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
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
        <div className="rounded border border-emerald-200 bg-emerald-50/50 p-5 shadow-2xs space-y-4">
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

      <div className="rounded border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
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
