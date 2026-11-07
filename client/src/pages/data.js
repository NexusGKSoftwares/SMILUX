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

export const kpiData = kpiCardsData;
export const getKpiCardsData = () => kpiCardsData;

export default kpiCardsData;
