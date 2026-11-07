import {
  Money01Icon,
  Calendar01Icon,
  DentalCareIcon,
  Note05Icon,
} from '@hugeicons/core-free-icons';

export const kpiCardsData = [
  {
    id: 'practice-revenue',
    title: 'Practice Revenue',
    value: 'KES 1,485,000',
    subtitle: '$420,110 Equivalent',
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
    subtitle: 'KES 342,000 Value',
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

export const webAnalyticsData = {
  title: 'Web Analytics',
  metrics: [
    {
      id: 'visit-duration',
      label: 'Visit duration',
      value: '1m 35s',
      change: '12%',
      isPositive: false,
    },
    {
      id: 'total-page-views',
      label: 'Total page views',
      value: '803K',
      change: '12%',
      isPositive: true,
    },
    {
      id: 'unique-visitors',
      label: 'Unique visitors',
      value: '120K',
      change: '12%',
      isPositive: true,
    },
  ],
  yAxisLabels: [
    { label: '80K', y: 234 },
    { label: '60K', y: 286 },
    { label: '40K', y: 338 },
    { label: '20K', y: 390 },
    { label: '0', y: 442 },
  ],
  xAxisLabels: [
    { label: '01', x: 152.75 },
    { label: '08', x: 310.25 },
    { label: '15', x: 467.75 },
    { label: '22', x: 625.25 },
  ],
  bars: [
    { x: 78, y: 412, height: 26 },
    { x: 109.5, y: 388, height: 50 },
    { x: 141, y: 412, height: 26 },
    { x: 172.5, y: 348, height: 90 },
    { x: 204, y: 401, height: 37 },
    { x: 235.5, y: 378, height: 60 },
    { x: 267, y: 333, height: 105 },
    { x: 298.5, y: 357, height: 81 },
    { x: 330, y: 381, height: 57 },
    { x: 361.5, y: 411, height: 27 },
    { x: 393, y: 303, height: 135 },
    { x: 424.5, y: 324, height: 114 },
    { x: 456, y: 381, height: 57 },
    { x: 487.5, y: 395, height: 43 },
    { x: 519, y: 411, height: 27 },
    { x: 550.5, y: 378, height: 60 },
    { x: 582, y: 338, height: 100 },
    { x: 613.5, y: 328, height: 110 },
    { x: 645, y: 301, height: 137 },
    { x: 676.5, y: 350, height: 88 },
  ],
};

export const salesAreaChartData = {
  title: 'Sales',
  subtitle: 'Total $ profit',
  totalProfitUsd: '$420,110',
  totalProfitKes: 'KES 1,485,000',
  defaultMonth: 'Jun',
  yAxisLabels: [
    { label: '$80K', kesLabel: '10M', y: 224 },
    { label: '$60K', kesLabel: '7.5M', y: 276 },
    { label: '$40K', kesLabel: '5.0M', y: 328 },
    { label: '$20K', kesLabel: '2.5M', y: 380 },
    { label: '0', kesLabel: '0', y: 431 },
  ],
  months: [
    { month: 'Jan', x: 113, y: 312, valueUsd: '$46,200', valueKes: 'KES 163K' },
    { month: 'Feb', x: 194, y: 284, valueUsd: '$56,800', valueKes: 'KES 201K' },
    { month: 'Mar', x: 275, y: 318, valueUsd: '$43,500', valueKes: 'KES 154K' },
    { month: 'Apr', x: 356, y: 292, valueUsd: '$53,900', valueKes: 'KES 190K' },
    { month: 'May', x: 437, y: 321, valueUsd: '$42,300', valueKes: 'KES 149K' },
    { month: 'Jun', x: 518, y: 283, valueUsd: '$57,000', valueKes: 'KES 202K' },
    { month: 'Jul', x: 645, y: 298, valueUsd: '$51,400', valueKes: 'KES 182K' },
  ],
  // Smooth cubic bezier curve from x=74 to x=690 within y=276..321
  linePath:
    'M 74 308 C 100 318, 125 315, 150 296 C 175 277, 200 278, 230 298 C 255 315, 275 321, 305 308 C 335 295, 355 286, 385 298 C 415 310, 435 321, 465 306 C 490 293, 505 283, 518 283 C 545 283, 575 312, 610 304 C 645 296, 668 276, 690 282',
  areaPath:
    'M 74 308 C 100 318, 125 315, 150 296 C 175 277, 200 278, 230 298 C 255 315, 275 321, 305 308 C 335 295, 355 286, 385 298 C 415 310, 435 321, 465 306 C 490 293, 505 283, 518 283 C 545 283, 575 312, 610 304 C 645 296, 668 276, 690 282 L 690 431 L 74 431 Z',
};

export const kpiData = kpiCardsData;
export const getKpiCardsData = () => kpiCardsData;

export default kpiCardsData;
