import {
  Money01Icon,
  Calendar01Icon,
  CheckmarkCircle01Icon,
  Tick01Icon,
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
    icon: CheckmarkCircle01Icon,
    iconStyle: 'bg-amber-50 text-amber-600 border border-amber-100',
  },
  {
    id: 'treatment-plans',
    title: 'Active Treatment Plans',
    value: '38 Plans',
    subtitle: 'FDI Charting Validated',
    badge: '▲ 84.5% Accept',
    badgeStyle: 'bg-[#E2FFF3] border border-[#6EEABB] text-[#00C26B]',
    icon: Tick01Icon,
    iconStyle: 'bg-sky-50 text-sky-600 border border-sky-100',
  },
];

export const kpiData = kpiCardsData;
export const getKpiCardsData = () => kpiCardsData;

export default kpiCardsData;
