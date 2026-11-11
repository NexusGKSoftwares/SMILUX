import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  DentalToothIcon,
  Cancel01Icon,
  PlusSignIcon,
  Doc01Icon,
  Calendar01Icon,
  BubbleChatIcon,
  PencilEdit01Icon,
  Delete02Icon,
  CallIcon,
  Mail01Icon,
  Location01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  UserCircleIcon,
  Clock01Icon,
  Settings01Icon,
  StethoscopeIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Dentists & Practitioners Dataset (KMPDC Board Context) ─────────
const INITIAL_DENTISTS = [
  {
    id: 'DEN-201',
    name: 'Dr. Darrell Steward',
    qualifications: 'BDS (UoN), MDS Oral & Maxillofacial Surgery',
    specialty: 'Oral & Maxillofacial Surgery',
    category: 'specialist',
    licenseNo: 'KMPDC A-6214',
    branch: 'Nairobi Main',
    operatory: 'Surgery Suite 1',
    phone: '+254 722 104 928',
    email: 'darrell.steward@smilux.co.ke',
    consultationFee: 'KES 4,500',
    experience: '16 yrs',
    activePatients: 64,
    schedule: 'Mon, Wed, Fri (Full Day)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-202',
    name: 'Dr. Faith Mutua',
    qualifications: 'BDS, MSc Orthodontics (London)',
    specialty: 'Orthodontics & Dentofacial Orthopedics',
    category: 'specialist',
    licenseNo: 'KMPDC A-7891',
    branch: 'Westlands Clinic',
    operatory: 'Operatory Chair 2',
    phone: '+254 712 449 018',
    email: 'faith.mutua@smilux.co.ke',
    consultationFee: 'KES 3,500',
    experience: '11 yrs',
    activePatients: 92,
    schedule: 'Tue, Thu, Sat (09:00 - 17:00)',
    status: 'Available',
  },
  {
    id: 'DEN-203',
    name: 'Dr. Kevin Ochieng',
    qualifications: 'BDS (Moi), Cert. Endodontics',
    specialty: 'Endodontics & Restorative',
    category: 'specialist',
    licenseNo: 'KMPDC A-8420',
    branch: 'Nairobi Main',
    operatory: 'Operatory Chair 3',
    phone: '+254 733 910 248',
    email: 'kevin.ochieng@smilux.co.ke',
    consultationFee: 'KES 3,000',
    experience: '8 yrs',
    activePatients: 47,
    schedule: 'Mon - Fri (08:00 - 16:30)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-204',
    name: 'Dr. Amina Kassam',
    qualifications: 'BDS (UoN), MSc Pediatric Dentistry',
    specialty: 'Pediatric Dentistry',
    category: 'specialist',
    licenseNo: 'KMPDC A-7109',
    branch: 'Karen Surgery Center',
    operatory: 'Pediatric Suite A',
    phone: '+254 720 331 829',
    email: 'amina.kassam@smilux.co.ke',
    consultationFee: 'KES 3,000',
    experience: '12 yrs',
    activePatients: 53,
    schedule: 'Mon - Thu (08:30 - 16:00)',
    status: 'Available',
  },
  {
    id: 'DEN-205',
    name: 'Dr. Brian Mwangi',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dental Practice',
    category: 'general',
    licenseNo: 'KMPDC A-9024',
    branch: 'Westlands Clinic',
    operatory: 'Operatory Chair 1',
    phone: '+254 701 448 910',
    email: 'brian.mwangi@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '6 yrs',
    activePatients: 78,
    schedule: 'Mon - Sat (08:00 - 17:00)',
    status: 'Available',
  },
  {
    id: 'DEN-206',
    name: 'Dr. Wanjiku Kimani',
    qualifications: 'BDS, Dip. Periodontology (Pretoria)',
    specialty: 'Periodontics & Implantology',
    category: 'specialist',
    licenseNo: 'KMPDC A-6812',
    branch: 'Upper Hill Clinic',
    operatory: 'Implant Suite 2',
    phone: '+254 718 902 411',
    email: 'wanjiku.kimani@smilux.co.ke',
    consultationFee: 'KES 4,000',
    experience: '14 yrs',
    activePatients: 38,
    schedule: 'Tue, Wed, Fri (09:00 - 16:00)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-207',
    name: 'Dr. Hassan Omar',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dentistry & Cosmetic',
    category: 'general',
    licenseNo: 'KMPDC A-9184',
    branch: 'Mombasa Waterfront',
    operatory: 'Operatory 1',
    phone: '+254 734 819 028',
    email: 'hassan.omar@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '5 yrs',
    activePatients: 61,
    schedule: 'Mon - Fri (08:30 - 17:30)',
    status: 'Available',
  },
  {
    id: 'DEN-208',
    name: 'Dr. Grace Jepkemboi',
    qualifications: 'BDS (Moi), MMed Prosthodontics',
    specialty: 'Prosthodontics & Full Mouth Rehab',
    category: 'specialist',
    licenseNo: 'KMPDC A-7402',
    branch: 'Nairobi Main',
    operatory: 'Prosthodontic Suite B',
    phone: '+254 711 773 920',
    email: 'grace.jepkemboi@smilux.co.ke',
    consultationFee: 'KES 4,000',
    experience: '10 yrs',
    activePatients: 34,
    schedule: 'Mon, Wed, Thu (08:00 - 16:30)',
    status: 'On Call',
  },
  {
    id: 'DEN-209',
    name: 'Dr. Peter Kiprotich',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dental Practice',
    category: 'general',
    licenseNo: 'KMPDC A-9340',
    branch: 'Upper Hill Clinic',
    operatory: 'Operatory 1',
    phone: '+254 722 559 104',
    email: 'peter.kiprotich@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '4 yrs',
    activePatients: 49,
    schedule: 'Mon - Fri (08:00 - 17:00)',
    status: 'Available',
  },
  {
    id: 'DEN-210',
    name: 'Dr. Sarah Wambui',
    qualifications: 'BDS, MSc Aesthetic Dentistry (Manchester)',
    specialty: 'Aesthetic Dentistry & Veneers',
    category: 'specialist',
    licenseNo: 'KMPDC A-8190',
    branch: 'Karen Surgery Center',
    operatory: 'Cosmetic Studio 1',
    phone: '+254 700 812 491',
    email: 'sarah.wambui@smilux.co.ke',
    consultationFee: 'KES 4,500',
    experience: '9 yrs',
    activePatients: 42,
    schedule: 'Wed - Sat (10:00 - 18:00)',
    status: 'Available',
  },
  {
    id: 'DEN-211',
    name: 'Dr. Ronald Barasa',
    qualifications: 'BDS (UoN)',
    specialty: 'General & Emergency Dental Surgery',
    category: 'general',
    licenseNo: 'KMPDC A-8710',
    branch: 'Nairobi Main',
    operatory: 'Emergency Chair 4',
    phone: '+254 714 620 184',
    email: 'ronald.barasa@smilux.co.ke',
    consultationFee: 'KES 2,500',
    experience: '7 yrs',
    activePatients: 85,
    schedule: 'Mon - Fri (12:00 - 20:00)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-212',
    name: 'Dr. Yvonne Cherono',
    qualifications: 'BDS, MSc Dental Public Health',
    specialty: 'Preventive Dentistry & Screening',
    category: 'general',
    licenseNo: 'KMPDC A-8901',
    branch: 'Westlands Clinic',
    operatory: 'Consultation Room 3',
    phone: '+254 729 330 194',
    email: 'yvonne.cherono@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '8 yrs',
    activePatients: 44,
    schedule: 'Mon - Wed (08:30 - 16:30)',
    status: 'On Leave',
  },
  {
    id: 'DEN-213',
    name: 'Dr. Tariq Al-Mansoor',
    qualifications: 'BDS, FRCS (OMFS), Visiting Consultant',
    specialty: 'Maxillofacial Oncology & Reconstructive',
    category: 'visiting',
    licenseNo: 'KMPDC V-1094',
    branch: 'Nairobi Main',
    operatory: 'Theatre Suite A',
    phone: '+254 731 990 284',
    email: 'tariq.almansoor@smilux.co.ke',
    consultationFee: 'KES 6,000',
    experience: '22 yrs',
    activePatients: 19,
    schedule: 'Alternate Saturdays (Visiting)',
    status: 'On Call',
  },
  {
    id: 'DEN-214',
    name: 'Dr. Caroline Muthoni',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dentistry',
    category: 'general',
    licenseNo: 'KMPDC A-9512',
    branch: 'Karen Surgery Center',
    operatory: 'Operatory Chair 2',
    phone: '+254 721 440 928',
    email: 'caroline.muthoni@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '3 yrs',
    activePatients: 36,
    schedule: 'Tue - Sat (08:30 - 17:00)',
    status: 'Available',
  },
  {
    id: 'DEN-215',
    name: 'Dr. Dennis Kipkemoi',
    qualifications: 'BDS (Moi), Cert. Laser Dentistry',
    specialty: 'Laser & Minimally Invasive Dentistry',
    category: 'specialist',
    licenseNo: 'KMPDC A-8610',
    branch: 'Upper Hill Clinic',
    operatory: 'Operatory 3',
    phone: '+254 703 119 284',
    email: 'dennis.kipkemoi@smilux.co.ke',
    consultationFee: 'KES 3,500',
    experience: '7 yrs',
    activePatients: 29,
    schedule: 'Mon, Thu, Fri (08:00 - 16:00)',
    status: 'Available',
  },
  {
    id: 'DEN-216',
    name: 'Dr. Brenda Achieng',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dental Practice',
    category: 'general',
    licenseNo: 'KMPDC A-9640',
    branch: 'Mombasa Waterfront',
    operatory: 'Operatory 2',
    phone: '+254 735 901 829',
    email: 'brenda.achieng@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '3 yrs',
    activePatients: 51,
    schedule: 'Mon - Fri (08:00 - 17:00)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-217',
    name: 'Dr. Martin Njoroge',
    qualifications: 'BDS (UoN), Visiting Orthodontist',
    specialty: 'Orthodontics & Clear Aligners',
    category: 'visiting',
    licenseNo: 'KMPDC A-7521',
    branch: 'Upper Hill Clinic',
    operatory: 'Aligner Suite',
    phone: '+254 719 881 029',
    email: 'martin.njoroge@smilux.co.ke',
    consultationFee: 'KES 3,500',
    experience: '13 yrs',
    activePatients: 31,
    schedule: 'Fridays & Saturdays (Locum)',
    status: 'On Call',
  },
  {
    id: 'DEN-218',
    name: 'Dr. Jacqueline Wanjala',
    qualifications: 'BDS (Moi)',
    specialty: 'General Dentistry',
    category: 'general',
    licenseNo: 'KMPDC A-9702',
    branch: 'Nairobi Main',
    operatory: 'Operatory Chair 5',
    phone: '+254 702 449 102',
    email: 'jacqueline.wanjala@smilux.co.ke',
    consultationFee: 'KES 2,000',
    experience: '4 yrs',
    activePatients: 46,
    schedule: 'Mon - Fri (08:00 - 17:00)',
    status: 'Available',
  },
  {
    id: 'DEN-219',
    name: 'Dr. Paul Kiptoo',
    qualifications: 'BDS (UoN), Dip. Implant Dentistry (Frankfurt)',
    specialty: 'Implantology & Bone Augmentation',
    category: 'specialist',
    licenseNo: 'KMPDC A-6981',
    branch: 'Westlands Clinic',
    operatory: 'Surgical Chair 3',
    phone: '+254 715 330 918',
    email: 'paul.kiptoo@smilux.co.ke',
    consultationFee: 'KES 4,500',
    experience: '15 yrs',
    activePatients: 41,
    schedule: 'Mon, Tue, Thu (08:30 - 16:30)',
    status: 'In Surgery',
  },
  {
    id: 'DEN-220',
    name: 'Dr. Sharon Nyaboke',
    qualifications: 'BDS (UoN)',
    specialty: 'General & Pediatric Dentistry',
    category: 'general',
    licenseNo: 'KMPDC A-9812',
    branch: 'Karen Surgery Center',
    operatory: 'Pediatric Suite B',
    phone: '+254 728 119 028',
    email: 'sharon.nyaboke@smilux.co.ke',
    consultationFee: 'KES 2,500',
    experience: '5 yrs',
    activePatients: 39,
    schedule: 'Wed - Sun (09:00 - 17:00)',
    status: 'Available',
  },
];

export default function DentistsPage() {
  const [dentists, setDentists] = useState(INITIAL_DENTISTS);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedDentistIds, setSelectedDentistIds] = useState([]);

  // New dentist modal state
  const [newDentist, setNewDentist] = useState({
    name: '',
    qualifications: 'BDS (UoN)',
    specialty: 'General Dental Practice',
    category: 'general',
    licenseNo: '',
    branch: 'Nairobi Main',
    operatory: 'Operatory Chair 1',
    phone: '',
    email: '',
    consultationFee: '2500',
    experience: '5 yrs',
    schedule: 'Mon - Fri (08:00 - 17:00)',
    status: 'Available',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: dentists.length,
      specialists: dentists.filter((d) => d.category === 'specialist').length,
      general: dentists.filter((d) => d.category === 'general').length,
      inSurgery: dentists.filter((d) => d.status === 'In Surgery').length,
      visiting: dentists.filter((d) => d.category === 'visiting' || d.status === 'On Call').length,
    };
  }, [dentists]);

  const tabs = [
    { id: 'all', label: 'All Dentists', count: tabCounts.all },
    { id: 'specialists', label: 'Specialists & Surgeons', count: tabCounts.specialists },
    { id: 'general', label: 'General Dentists', count: tabCounts.general },
    { id: 'in-surgery', label: 'In Surgery', count: tabCounts.inSurgery },
    { id: 'visiting', label: 'On Call / Locum', count: tabCounts.visiting },
  ];

  // Tab filter
  const tabFilteredDentists = useMemo(() => {
    if (activeTab === 'specialists') return dentists.filter((d) => d.category === 'specialist');
    if (activeTab === 'general') return dentists.filter((d) => d.category === 'general');
    if (activeTab === 'in-surgery') return dentists.filter((d) => d.status === 'In Surgery');
    if (activeTab === 'visiting') return dentists.filter((d) => d.category === 'visiting' || d.status === 'On Call');
    return dentists;
  }, [dentists, activeTab]);

  // Handle Add Dentist submit
  const handleAddDentist = (e) => {
    e.preventDefault();
    if (!newDentist.name.trim() || !newDentist.phone.trim()) return;

    const formattedName = newDentist.name.startsWith('Dr.') ? newDentist.name : `Dr. ${newDentist.name}`;

    const created = {
      id: `DEN-${221 + dentists.length}`,
      name: formattedName,
      qualifications: newDentist.qualifications || 'BDS (UoN)',
      specialty: newDentist.specialty,
      category: newDentist.category,
      licenseNo: newDentist.licenseNo ? `KMPDC ${newDentist.licenseNo.replace(/KMPDC\s*/i, '')}` : `KMPDC A-${Math.floor(1000 + Math.random() * 9000)}`,
      branch: newDentist.branch,
      operatory: newDentist.operatory,
      phone: newDentist.phone,
      email: newDentist.email || `${newDentist.name.toLowerCase().replace(/[^a-z]/g, '.')}@smilux.co.ke`,
      consultationFee: `KES ${Number(newDentist.consultationFee).toLocaleString()}`,
      experience: newDentist.experience || '5 yrs',
      activePatients: 0,
      schedule: newDentist.schedule,
      status: newDentist.status,
    };

    setDentists([created, ...dentists]);
    setIsAddModalOpen(false);
    setNewDentist({
      name: '',
      qualifications: 'BDS (UoN)',
      specialty: 'General Dental Practice',
      category: 'general',
      licenseNo: '',
      branch: 'Nairobi Main',
      operatory: 'Operatory Chair 1',
      phone: '',
      email: '',
      consultationFee: '2500',
      experience: '5 yrs',
      schedule: 'Mon - Fri (08:00 - 17:00)',
      status: 'Available',
    });
  };

  // Header Dropdown actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Practitioners Roster',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Dentists CSV / KMPDC register opened'),
    },
    {
      id: 'export',
      label: 'Export Practitioner List',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => alert(`Exporting ${tabFilteredDentists.length} dentist records to CSV...`),
    },
    {
      id: 'calendar',
      label: 'Chair Booking & Operatory Grid',
      icon: Calendar01Icon,
      onClick: () => alert('Opening Master Operatory & Chair Grid...'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'kmpdc',
      label: 'Verify KMPDC Board Licenses',
      icon: CheckmarkCircle01Icon,
      onClick: () => alert('Running batch verification with KMPDC Portal API...'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Dentist Name & Qualifications',
        minWidth: '240px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter by doctor name...',
        render: (val, row) => {
          const initials = row.name
            .replace(/Dr\.\s*/i, '')
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2);

          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 border border-blue-300">
                {initials}
              </div>
              <div className="truncate min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  <span className="truncate">{row.name}</span>
                  <span
                    title={row.licenseNo}
                    className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0"
                  >
                    {row.licenseNo}
                  </span>
                </div>
                <div className="text-slate-500 font-medium leading-none mt-0.5 truncate text-[11px]" title={row.qualifications}>
                  {row.id} • {row.qualifications}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: 'specialty',
        title: 'Specialty / Field',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Oral & Maxillofacial Surgery', label: 'Oral & Maxillofacial Surgery' },
          { value: 'Orthodontics & Dentofacial Orthopedics', label: 'Orthodontics' },
          { value: 'Endodontics & Restorative', label: 'Endodontics' },
          { value: 'Pediatric Dentistry', label: 'Pediatric Dentistry' },
          { value: 'Periodontics & Implantology', label: 'Periodontics & Implants' },
          { value: 'General Dental Practice', label: 'General Dental Practice' },
          { value: 'Prosthodontics & Full Mouth Rehab', label: 'Prosthodontics' },
          { value: 'Aesthetic Dentistry & Veneers', label: 'Aesthetic Dentistry' },
        ],
        render: (val, row) => (
          <span
            className="text-slate-800 dark:text-slate-200 font-semibold truncate block max-w-[175px]"
            title={row.specialty}
          >
            {row.specialty}
          </span>
        ),
      },
      {
        key: 'branch',
        title: 'Branch & Operatory Chair',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Nairobi Main', label: 'Nairobi Main' },
          { value: 'Westlands Clinic', label: 'Westlands Clinic' },
          { value: 'Karen Surgery Center', label: 'Karen Surgery Center' },
          { value: 'Upper Hill Clinic', label: 'Upper Hill Clinic' },
          { value: 'Mombasa Waterfront', label: 'Mombasa Waterfront' },
        ],
        render: (val, row) => (
          <div className="truncate">
            <span className="font-medium text-slate-800 dark:text-slate-200 block truncate">
              {row.branch}
            </span>
            <span className="text-[11px] text-slate-500 block truncate">
              {row.operatory}
            </span>
          </div>
        ),
      },
      {
        key: 'phone',
        title: 'Phone Number',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {row.phone}
          </span>
        ),
      },
      {
        key: 'email',
        title: 'Email Address',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-400 truncate block max-w-[175px]">
            {row.email}
          </span>
        ),
      },
      {
        key: 'consultationFee',
        title: 'Consultation Fee',
        minWidth: '120px',
        sortable: true,
        filterable: true,
        align: 'right',
        render: (val, row) => (
          <span className="font-semibold text-slate-900 dark:text-white tabular-nums block text-right">
            {row.consultationFee}
          </span>
        ),
      },
      {
        key: 'experience',
        title: 'Experience',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {row.experience}
          </span>
        ),
      },
      {
        key: 'activePatients',
        title: 'Active Cases',
        minWidth: '100px',
        sortable: true,
        filterable: true,
        filterType: 'number',
        align: 'center',
        render: (val, row) => (
          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs">
            {row.activePatients}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '105px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Available', label: 'Available' },
          { value: 'In Surgery', label: 'In Surgery' },
          { value: 'On Call', label: 'On Call' },
          { value: 'On Leave', label: 'On Leave' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-2 py-0.5 rounded-full font-semibold text-xs ${
              row.status === 'Available'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : row.status === 'In Surgery'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                : row.status === 'On Call'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        width: '90px',
        minWidth: '90px',
        sortable: false,
        filterable: false,
        align: 'right',
        render: (val, row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              title={`View ${row.name}'s Chair Schedule`}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Opening chair schedule and bookings for ${row.name}`);
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-700 dark:text-blue-400 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={DentalToothIcon} size={14} />
            </button>

            <RowActionDropdown
              title={`Actions for ${row.name}`}
              items={[
                {
                  id: 'profile',
                  label: 'View Practitioner Profile',
                  icon: StethoscopeIcon,
                  onClick: () => alert(`Opening doctor file for ${row.name} (${row.id})`),
                },
                {
                  id: 'calendar',
                  label: 'View Operatory Calendar',
                  icon: Calendar01Icon,
                  onClick: () => alert(`Viewing operatory bookings for ${row.name}`),
                },
                {
                  id: 'patients',
                  label: 'View Patient Cohort',
                  icon: UserCircleIcon,
                  onClick: () => alert(`Viewing active patient records for ${row.name}`),
                },
                {
                  id: 'fees',
                  label: 'Adjust Consultation / Procedure Fees',
                  icon: Doc01Icon,
                  onClick: () => alert(`Adjusting fee schedule for ${row.name}`),
                },
                {
                  id: 'message',
                  label: 'Send Doctor SMS / Notification',
                  icon: BubbleChatIcon,
                  onClick: () => alert(`Sending message to ${row.name} (${row.phone})`),
                },
                { divider: true },
                {
                  id: 'edit',
                  label: 'Edit Practitioner Details',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing doctor details for ${row.name}`),
                },
                {
                  id: 'toggle-surgery',
                  label: row.status === 'In Surgery' ? 'Mark Available' : 'Mark In Surgery',
                  icon: CheckmarkCircle01Icon,
                  onClick: () => {
                    setDentists((prev) =>
                      prev.map((d) =>
                        d.id === row.id
                          ? { ...d, status: d.status === 'In Surgery' ? 'Available' : 'In Surgery' }
                          : d
                      )
                    );
                  },
                },
                {
                  id: 'archive',
                  label: 'Set On Leave / Archive',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    setDentists((prev) =>
                      prev.map((d) => (d.id === row.id ? { ...d, status: 'On Leave' } : d))
                    );
                  },
                },
              ]}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <PageHeader
        title="Dentists & Practitioners"
        badge={`${tabCounts.all} Doctors`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn how to manage dental surgeons, chair schedules & KMPDC licenses"
        moreActions={headerMoreActions}
        addLabel="Add Dentist"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ─── Spreadsheet-Dense DataTable ─── */}
      <DataTable
        title="Practitioners Directory"
        data={tabFilteredDentists}
        columns={columns}
        rowKey="id"
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        maxHeight="calc(100vh - 250px)"
        initialDensity="normal"
        selectable={true}
        selectedRowKeys={selectedDentistIds}
        onSelectionChange={setSelectedDentistIds}
        initialSort={[{ key: 'name', direction: 'asc' }]}
        pageSizeOptions={[10, 25, 50, 100, 'All']}
        initialPageSize={25}
        showPagination={true}
        showColumnFiltersDefault={true}
        enableGlobalSearch={true}
        onRowClick={(row) => {
          // Open doctor profile
        }}
      />

      {/* ─── Add Dentist Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Register Dental Practitioner
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add dental surgeon or specialist to clinic medical board
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDentist} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Practitioner Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Brian Mwangi"
                    value={newDentist.name}
                    onChange={(e) => setNewDentist({ ...newDentist, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Clinical Specialty *
                  </label>
                  <select
                    value={newDentist.specialty}
                    onChange={(e) => {
                      const spec = e.target.value;
                      const cat = spec.includes('General') ? 'general' : 'specialist';
                      setNewDentist({ ...newDentist, specialty: spec, category: cat });
                    }}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="General Dental Practice">General Dental Practice</option>
                    <option value="Oral & Maxillofacial Surgery">Oral & Maxillofacial Surgery</option>
                    <option value="Orthodontics & Dentofacial Orthopedics">Orthodontics & Braces</option>
                    <option value="Endodontics & Restorative">Endodontics (Root Canal)</option>
                    <option value="Periodontics & Implantology">Periodontics & Implants</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="Prosthodontics & Full Mouth Rehab">Prosthodontics & Dentures</option>
                    <option value="Aesthetic Dentistry & Veneers">Cosmetic & Aesthetic Dentistry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    KMPDC License No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A-9024"
                    value={newDentist.licenseNo}
                    onChange={(e) => setNewDentist({ ...newDentist, licenseNo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Academic Qualifications & Degrees
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BDS (UoN), MSc Orthodontics (London)"
                    value={newDentist.qualifications}
                    onChange={(e) => setNewDentist({ ...newDentist, qualifications: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Primary Branch *
                  </label>
                  <select
                    value={newDentist.branch}
                    onChange={(e) => setNewDentist({ ...newDentist, branch: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Nairobi Main">Nairobi Main Medical Center</option>
                    <option value="Westlands Clinic">Westlands Clinic</option>
                    <option value="Karen Surgery Center">Karen Surgery Center</option>
                    <option value="Upper Hill Clinic">Upper Hill Clinic</option>
                    <option value="Mombasa Waterfront">Mombasa Waterfront</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Assigned Operatory Chair
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Operatory Chair 2"
                    value={newDentist.operatory}
                    onChange={(e) => setNewDentist({ ...newDentist, operatory: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newDentist.phone}
                    onChange={(e) => setNewDentist({ ...newDentist, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Consultation Fee (KES)
                  </label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={newDentist.consultationFee}
                    onChange={(e) => setNewDentist({ ...newDentist, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Practitioner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Learn Drawer / Modal ─── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Practitioners Directory: Guide
                </h3>
              </div>
              <button
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/50 rounded">
                <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  KMPDC Compliance & Chair Time Utilization
                </p>
                <p>
                  Ensure every practicing dentist has an active Kenya Medical Practitioners and Dentists Council (KMPDC) board license, assign designated operatory chairs, and streamline specialist referrals.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Practitioner Features</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Live Chair Status:</strong> Instantly check who is &quot;In Surgery&quot;, &quot;Available&quot;, or &quot;On Call&quot; to coordinate emergency walk-ins.
                  </li>
                  <li>
                    <strong>Specialist Tiers:</strong> Group practitioners into Oral Surgeons, Orthodontists, Endodontists, Periodontists, and General Dentists.
                  </li>
                  <li>
                    <strong>Consultation Fee Schedules:</strong> Set base consultation fees per practitioner for automated invoice generation.
                  </li>
                  <li>
                    <strong>Multi-Column Sorting:</strong> Hold <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium">Shift</kbd> + click to sort by experience, active patient volume, and branch.
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsLearnModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

