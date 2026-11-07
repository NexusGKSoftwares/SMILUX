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

export const currentYear = new Date().getFullYear();

export const webAnalyticsData = {
  title: 'Patient Growth Overview',
  year: currentYear,
  defaultMonth: 'Jun',
  metrics: [
    {
      id: 'new-patients',
      label: 'New patients',
      value: '1,420',
      change: '14%',
      isPositive: true,
    },
    {
      id: 'returning-patients',
      label: 'Returning patients',
      value: '6,840',
      change: '18%',
      isPositive: true,
    },
    {
      id: 'avg-visit-duration',
      label: 'Avg. chair time',
      value: '42m 15s',
      change: '8%',
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
  xAxisLabels: [
    { label: 'Jan', x: 96 },
    { label: 'Feb', x: 148 },
    { label: 'Mar', x: 200 },
    { label: 'Apr', x: 252 },
    { label: 'May', x: 304 },
    { label: 'Jun', x: 356 },
    { label: 'Jul', x: 408 },
    { label: 'Aug', x: 460 },
    { label: 'Sep', x: 512 },
    { label: 'Oct', x: 564 },
    { label: 'Nov', x: 616 },
    { label: 'Dec', x: 668 },
  ],
  bars: [
    { month: 'Jan', x: 83, xCenter: 96, y: 382, height: 56, count: '230' },
    { month: 'Feb', x: 135, xCenter: 148, y: 358, height: 80, count: '325' },
    { month: 'Mar', x: 187, xCenter: 200, y: 372, height: 66, count: '270' },
    { month: 'Apr', x: 239, xCenter: 252, y: 338, height: 100, count: '410' },
    { month: 'May', x: 291, xCenter: 304, y: 352, height: 86, count: '350' },
    { month: 'Jun', x: 343, xCenter: 356, y: 318, height: 120, count: '490' },
    { month: 'Jul', x: 395, xCenter: 408, y: 333, height: 105, count: '430' },
    { month: 'Aug', x: 447, xCenter: 460, y: 303, height: 135, count: '550' },
    { month: 'Sep', x: 499, xCenter: 512, y: 324, height: 114, count: '465' },
    { month: 'Oct', x: 551, xCenter: 564, y: 310, height: 128, count: '520' },
    { month: 'Nov', x: 603, xCenter: 616, y: 296, height: 142, count: '580' },
    { month: 'Dec', x: 655, xCenter: 668, y: 284, height: 154, count: '630' },
  ],
};

export const salesAreaChartData = {
  title: 'Sales',
  year: currentYear,
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
    { month: 'Jan', x: 92, y: 312, valueUsd: '$46,200', valueKes: 'KES 163K' },
    { month: 'Feb', x: 144, y: 288, valueUsd: '$55,400', valueKes: 'KES 196K' },
    { month: 'Mar', x: 196, y: 316, valueUsd: '$44,500', valueKes: 'KES 157K' },
    { month: 'Apr', x: 248, y: 294, valueUsd: '$53,100', valueKes: 'KES 188K' },
    { month: 'May', x: 300, y: 320, valueUsd: '$42,800', valueKes: 'KES 151K' },
    { month: 'Jun', x: 352, y: 283, valueUsd: '$57,000', valueKes: 'KES 202K' },
    { month: 'Jul', x: 404, y: 308, valueUsd: '$47,600', valueKes: 'KES 168K' },
    { month: 'Aug', x: 456, y: 286, valueUsd: '$56,100', valueKes: 'KES 199K' },
    { month: 'Sep', x: 508, y: 314, valueUsd: '$45,300', valueKes: 'KES 160K' },
    { month: 'Oct', x: 560, y: 279, valueUsd: '$58,900', valueKes: 'KES 208K' },
    { month: 'Nov', x: 612, y: 302, valueUsd: '$49,800', valueKes: 'KES 176K' },
    { month: 'Dec', x: 664, y: 274, valueUsd: '$60,800', valueKes: 'KES 215K' },
  ],
  // Smooth cubic bezier curve passing through all 12 monthly points from x=74 to x=690
  linePath:
    'M 74 304 C 81 304, 85 312, 92 312 C 110 312, 126 288, 144 288 C 162 288, 178 316, 196 316 C 214 316, 230 294, 248 294 C 266 294, 282 320, 300 320 C 318 320, 334 283, 352 283 C 370 283, 386 308, 404 308 C 422 308, 438 286, 456 286 C 474 286, 490 314, 508 314 C 526 314, 542 279, 560 279 C 578 279, 594 302, 612 302 C 630 302, 646 274, 664 274 C 674 274, 682 282, 690 282',
  areaPath:
    'M 74 304 C 81 304, 85 312, 92 312 C 110 312, 126 288, 144 288 C 162 288, 178 316, 196 316 C 214 316, 230 294, 248 294 C 266 294, 282 320, 300 320 C 318 320, 334 283, 352 283 C 370 283, 386 308, 404 308 C 422 308, 438 286, 456 286 C 474 286, 490 314, 508 314 C 526 314, 542 279, 560 279 C 578 279, 594 302, 612 302 C 630 302, 646 274, 664 274 C 674 274, 682 282, 690 282 L 690 431 L 74 431 Z',
};

export const kpiData = kpiCardsData;
export const getKpiCardsData = () => kpiCardsData;

export default kpiCardsData;
