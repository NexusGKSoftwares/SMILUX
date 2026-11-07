import {
  Money01Icon,
  Calendar01Icon,
  DentalCareIcon,
  Note05Icon,
} from '@hugeicons/core-free-icons';
import { formatCurrency, formatCompactCurrency, formatNumber } from '../utils/formatter';

export const kpiCardsData = [
  {
    id: 'practice-revenue',
    title: 'Practice Revenue',
    value: formatCurrency(1485000),
    subtitle: 'M-Pesa, SHA & Cash Settled',
    badge: '▲ +18.5%',
    badgeStyle: 'bg-[#E2FFF3] border border-[#6EEABB] text-[#00C26B]',
    icon: Money01Icon,
    iconStyle: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  },
  {
    id: 'today-appointments',
    title: "Today's Appointments",
    value: '14 Patients',
    subtitle: '5 In-Chair / Waiting',
    badge: '▲ +3 Today',
    badgeStyle: 'bg-[#E2FFF3] border border-[#6EEABB] text-[#00C26B]',
    icon: Calendar01Icon,
    iconStyle: 'bg-blue-50 text-blue-600 border border-blue-100',
  },
  {
    id: 'insurance-claims',
    title: 'SHA & Insurance Claims',
    value: '14 Claims',
    subtitle: `${formatCurrency(342000)} Value`,
    badge: '98.2% Approved',
    badgeStyle: 'bg-[#FFF3E0] border border-[#FFE0B2] text-[#FF9900]',
    icon: DentalCareIcon,
    iconStyle: 'bg-amber-50 text-amber-600 border border-amber-100',
  },
  {
    id: 'treatment-plans',
    title: 'Active Treatment Plans',
    value: '38 Plans',
    subtitle: 'FDI Charting Validated',
    badge: '▲ 84.5% Accept',
    badgeStyle: 'bg-[#E2FFF3] border border-[#6EEABB] text-[#00C26B]',
    icon: Note05Icon,
    iconStyle: 'bg-sky-50 text-sky-600 border border-sky-100',
  },
];

export const currentYear = new Date().getFullYear();
export const availableYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

// Helper to build smooth horizontal-tangent cubic bezier path through 12 monthly (x, y) points
function buildSmoothPaths(months) {
  if (!months || months.length === 0) return { linePath: '', areaPath: '' };
  const firstY = Math.min(Math.max(months[0].y - 8, 240), 390);
  const lastY = Math.min(Math.max(months[months.length - 1].y + 8, 240), 390);
  let d = `M 74 ${firstY} C 81 ${firstY}, 85 ${months[0].y}, ${months[0].x} ${months[0].y}`;
  for (let i = 0; i < months.length - 1; i += 1) {
    const curr = months[i];
    const next = months[i + 1];
    d += ` C ${curr.x + 18} ${curr.y}, ${next.x - 18} ${next.y}, ${next.x} ${next.y}`;
  }
  const last = months[months.length - 1];
  d += ` C 674 ${last.y}, 682 ${lastY}, 690 ${lastY}`;
  return {
    linePath: d,
    areaPath: `${d} L 690 431 L 74 431 Z`,
  };
}

const YEAR_FACTORS = {
  [currentYear]: {
    salesScale: 1,
    profitAmount: 1485000,
    patientScale: 1,
    newPatients: 1420,
    newChange: '14%',
    returningPatients: 6840,
    returningChange: '18%',
    chairTime: '42m 15s',
    chairChange: '8%',
    monthOffsets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  [currentYear - 1]: {
    salesScale: 0.86,
    profitAmount: 1278000,
    patientScale: 0.85,
    newPatients: 1210,
    newChange: '11%',
    returningPatients: 5890,
    returningChange: '15%',
    chairTime: '44m 30s',
    chairChange: '5%',
    monthOffsets: [8, -10, 6, -8, 10, -6, 8, -12, 5, -7, 9, -5],
  },
  [currentYear - 2]: {
    salesScale: 0.74,
    profitAmount: 1095000,
    patientScale: 0.72,
    newPatients: 1040,
    newChange: '9%',
    returningPatients: 4920,
    returningChange: '12%',
    chairTime: '46m 10s',
    chairChange: '4%',
    monthOffsets: [-6, 12, -8, 10, -10, 14, -6, 8, -10, 12, -8, 10],
  },
  [currentYear - 3]: {
    salesScale: 0.62,
    profitAmount: 920000,
    patientScale: 0.6,
    newPatients: 860,
    newChange: '7%',
    returningPatients: 4110,
    returningChange: '10%',
    chairTime: '48m 05s',
    chairChange: '3%',
    monthOffsets: [10, -8, 12, -6, 8, -10, 12, -6, 10, -8, 6, 12],
  },
};

const BASE_PATIENT_BARS = [
  { month: 'Jan', x: 83, xCenter: 96, baseHeight: 56, baseCount: 230 },
  { month: 'Feb', x: 135, xCenter: 148, baseHeight: 80, baseCount: 325 },
  { month: 'Mar', x: 187, xCenter: 200, baseHeight: 66, baseCount: 270 },
  { month: 'Apr', x: 239, xCenter: 252, baseHeight: 100, baseCount: 410 },
  { month: 'May', x: 291, xCenter: 304, baseHeight: 86, baseCount: 350 },
  { month: 'Jun', x: 343, xCenter: 356, baseHeight: 120, baseCount: 490 },
  { month: 'Jul', x: 395, xCenter: 408, baseHeight: 105, baseCount: 430 },
  { month: 'Aug', x: 447, xCenter: 460, baseHeight: 135, baseCount: 550 },
  { month: 'Sep', x: 499, xCenter: 512, baseHeight: 114, baseCount: 465 },
  { month: 'Oct', x: 551, xCenter: 564, baseHeight: 128, baseCount: 520 },
  { month: 'Nov', x: 603, xCenter: 616, baseHeight: 142, baseCount: 580 },
  { month: 'Dec', x: 655, xCenter: 668, baseHeight: 154, baseCount: 630 },
];

const BASE_SALES_MONTHS = [
  { month: 'Jan', x: 92, baseY: 312, baseAmount: 163000 },
  { month: 'Feb', x: 144, baseY: 288, baseAmount: 196000 },
  { month: 'Mar', x: 196, baseY: 316, baseAmount: 157000 },
  { month: 'Apr', x: 248, baseY: 294, baseAmount: 188000 },
  { month: 'May', x: 300, baseY: 320, baseAmount: 151000 },
  { month: 'Jun', x: 352, baseY: 283, baseAmount: 202000 },
  { month: 'Jul', x: 404, baseY: 308, baseAmount: 168000 },
  { month: 'Aug', x: 456, baseY: 286, baseAmount: 199000 },
  { month: 'Sep', x: 508, baseY: 314, baseAmount: 160000 },
  { month: 'Oct', x: 560, baseY: 279, baseAmount: 208000 },
  { month: 'Nov', x: 612, baseY: 302, baseAmount: 176000 },
  { month: 'Dec', x: 664, baseY: 274, baseAmount: 215000 },
];

export function getPatientGrowthDataByYear(year = currentYear) {
  const factor = YEAR_FACTORS[year] || YEAR_FACTORS[currentYear];
  const bars = BASE_PATIENT_BARS.map((b, idx) => {
    const offset = factor.monthOffsets[idx] || 0;
    const height = Math.max(28, Math.min(175, Math.round(b.baseHeight * factor.patientScale - offset)));
    const y = 438 - height;
    const count = String(Math.max(95, Math.round(b.baseCount * factor.patientScale - offset * 2)));
    return {
      month: b.month,
      x: b.x,
      xCenter: b.xCenter,
      y,
      height,
      count,
    };
  });

  return {
    title: 'Patient Growth Overview',
    year,
    defaultMonth: 'Jun',
    metrics: [
      {
        id: 'new-patients',
        label: 'New patients',
        value: formatNumber(factor.newPatients),
        change: factor.newChange,
        isPositive: true,
      },
      {
        id: 'returning-patients',
        label: 'Returning patients',
        value: formatNumber(factor.returningPatients),
        change: factor.returningChange,
        isPositive: true,
      },
      {
        id: 'avg-visit-duration',
        label: 'Avg. chair time',
        value: factor.chairTime,
        change: factor.chairChange,
        isPositive: false,
      },
    ],
    yAxisLabels: [
      { label: '800', y: 234 },
      { label: '600', y: 286 },
      { label: '400', y: 338 },
      { label: '200', y: 390 },
      { label: '0', y: 442 },
    ],
    xAxisLabels: BASE_PATIENT_BARS.map((b) => ({ label: b.month, x: b.xCenter })),
    bars,
  };
}

export function getSalesChartDataByYear(year = currentYear) {
  const factor = YEAR_FACTORS[year] || YEAR_FACTORS[currentYear];
  const months = BASE_SALES_MONTHS.map((m, idx) => {
    const offset = factor.monthOffsets[idx] || 0;
    const amount = Math.round((m.baseAmount * factor.salesScale) / 1000) * 1000;
    const y = Math.min(365, Math.max(255, Math.round(m.baseY + (1 - factor.salesScale) * 45 + offset)));
    return {
      month: m.month,
      x: m.x,
      y,
      amount,
      value: formatCurrency(amount),
      compactValue: formatCompactCurrency(amount),
    };
  });

  const { linePath, areaPath } = buildSmoothPaths(months);

  return {
    title: 'Sales',
    year,
    subtitle: 'Total profit',
    totalProfitAmount: factor.profitAmount,
    totalProfit: formatCurrency(factor.profitAmount),
    defaultMonth: 'Jun',
    yAxisLabels: [
      { label: formatCompactCurrency(300000, { showSymbol: false }), y: 224 },
      { label: formatCompactCurrency(225000, { showSymbol: false }), y: 276 },
      { label: formatCompactCurrency(150000, { showSymbol: false }), y: 328 },
      { label: formatCompactCurrency(75000, { showSymbol: false }), y: 380 },
      { label: '0', y: 431 },
    ],
    months,
    linePath,
    areaPath,
  };
}

export const webAnalyticsData = getPatientGrowthDataByYear(currentYear);
export const salesAreaChartData = getSalesChartDataByYear(currentYear);

export const kpiData = kpiCardsData;
export const getKpiCardsData = () => kpiCardsData;

export default kpiCardsData;
