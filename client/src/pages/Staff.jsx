import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
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
} from '@hugeicons/core-free-icons';

// ─── Initial Staff & Employees Dataset (East Africa Dental Clinic Context) ──
const INITIAL_STAFF = [
  {
    id: 'STF-101',
    name: 'Mercy Atieno',
    role: 'Head Dental Nurse',
    department: 'Clinical & Nursing',
    branch: 'Nairobi Main',
    phone: '+254 712 908 341',
    email: 'mercy.atieno@smilux.co.ke',
    shift: 'Morning (07:30 - 15:30)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-54910',
    joinDate: '12 Jan 2021',
    status: 'On Duty',
  },
  {
    id: 'STF-102',
    name: 'John Kiprono',
    role: 'Registered Dental Hygienist',
    department: 'Clinical & Nursing',
    branch: 'Westlands Clinic',
    phone: '+254 722 419 802',
    email: 'john.kiprono@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-61029',
    joinDate: '04 Mar 2022',
    status: 'On Duty',
  },
  {
    id: 'STF-103',
    name: 'Faith Muthoni',
    role: 'Front Desk Lead / Patient Coordinator',
    department: 'Administration',
    branch: 'Nairobi Main',
    phone: '+254 733 812 049',
    email: 'faith.muthoni@smilux.co.ke',
    shift: 'Morning (07:30 - 16:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '18 Aug 2020',
    status: 'Active',
  },
  {
    id: 'STF-104',
    name: 'Dennis Oduor',
    role: 'Dental Lab Ceramic Technician',
    department: 'Sterilization & Lab',
    branch: 'Nairobi Main',
    phone: '+254 701 554 921',
    email: 'dennis.oduor@smilux.co.ke',
    shift: 'Full Day (08:30 - 17:30)',
    employmentType: 'Full-time',
    licenseNo: 'KDLT-8921',
    joinDate: '09 Nov 2021',
    status: 'On Duty',
  },
  {
    id: 'STF-105',
    name: 'Sylvia Wanjiru',
    role: 'Clinic Operations Manager',
    department: 'Administration',
    branch: 'Karen Surgery Center',
    phone: '+254 718 203 914',
    email: 'sylvia.wanjiru@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '15 May 2019',
    status: 'Active',
  },
  {
    id: 'STF-106',
    name: 'Kennedy Mutiso',
    role: 'Dental Chair Assistant',
    department: 'Clinical & Nursing',
    branch: 'Westlands Clinic',
    phone: '+254 720 918 374',
    email: 'kennedy.mutiso@smilux.co.ke',
    shift: 'Evening (11:30 - 19:30)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-72109',
    joinDate: '22 Feb 2023',
    status: 'Active',
  },
  {
    id: 'STF-107',
    name: 'Caroline Chebet',
    role: 'Insurance Claims & SHA Officer',
    department: 'Finance & Billing',
    branch: 'Nairobi Main',
    phone: '+254 734 192 847',
    email: 'caroline.chebet@smilux.co.ke',
    shift: 'Morning (08:00 - 16:30)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '10 Oct 2022',
    status: 'Active',
  },
  {
    id: 'STF-108',
    name: 'Brian Ombati',
    role: 'Sterilization & Infection Tech',
    department: 'Sterilization & Lab',
    branch: 'Upper Hill Clinic',
    phone: '+254 711 639 281',
    email: 'brian.ombati@smilux.co.ke',
    shift: 'Morning (07:00 - 15:30)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '14 Jan 2024',
    status: 'On Duty',
  },
  {
    id: 'STF-109',
    name: 'Yvonne Akinyi',
    role: 'Senior Dental Hygienist',
    department: 'Clinical & Nursing',
    branch: 'Karen Surgery Center',
    phone: '+254 729 401 829',
    email: 'yvonne.akinyi@smilux.co.ke',
    shift: 'Morning (08:00 - 16:00)',
    employmentType: 'Part-time',
    licenseNo: 'KCN-59302',
    joinDate: '01 Jun 2022',
    status: 'Active',
  },
  {
    id: 'STF-110',
    name: 'Moses Kiptanui',
    role: 'Receptionist & Triage Clerk',
    department: 'Administration',
    branch: 'Mombasa Waterfront',
    phone: '+254 723 881 920',
    email: 'moses.kiptanui@smilux.co.ke',
    shift: 'Full Day (08:30 - 17:30)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '05 Sep 2023',
    status: 'On Leave',
  },
  {
    id: 'STF-111',
    name: 'Esther Nyambura',
    role: 'Staff Dental Nurse',
    department: 'Clinical & Nursing',
    branch: 'Upper Hill Clinic',
    phone: '+254 700 391 827',
    email: 'esther.nyambura@smilux.co.ke',
    shift: 'Evening (12:00 - 20:00)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-66412',
    joinDate: '19 Apr 2023',
    status: 'On Duty',
  },
  {
    id: 'STF-112',
    name: 'Peter Wambua',
    role: 'Procurement & Inventory Officer',
    department: 'Administration',
    branch: 'Nairobi Main',
    phone: '+254 714 829 104',
    email: 'peter.wambua@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '03 Feb 2021',
    status: 'Active',
  },
  {
    id: 'STF-113',
    name: 'Jackline Moraa',
    role: 'Dental Chair Assistant',
    department: 'Clinical & Nursing',
    branch: 'Mombasa Waterfront',
    phone: '+254 725 319 028',
    email: 'jackline.moraa@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-74819',
    joinDate: '11 Jul 2023',
    status: 'Active',
  },
  {
    id: 'STF-114',
    name: 'Samuel Ndung\'u',
    role: 'Lead Clinic Accountant',
    department: 'Finance & Billing',
    branch: 'Nairobi Main',
    phone: '+254 731 409 182',
    email: 'samuel.ndungu@smilux.co.ke',
    shift: 'Full Day (08:30 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'CPA-K 1892',
    joinDate: '17 Nov 2020',
    status: 'Active',
  },
  {
    id: 'STF-115',
    name: 'Grace Kerubo',
    role: 'Orthodontic Dental Assistant',
    department: 'Clinical & Nursing',
    branch: 'Westlands Clinic',
    phone: '+254 716 550 192',
    email: 'grace.kerubo@smilux.co.ke',
    shift: 'Morning (08:00 - 16:30)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-68192',
    joinDate: '28 Aug 2022',
    status: 'On Duty',
  },
  {
    id: 'STF-116',
    name: 'Daniel Kipchumba',
    role: 'IT Support & Dental PACS Admin',
    department: 'Administration',
    branch: 'Nairobi Main',
    phone: '+254 727 618 392',
    email: 'daniel.kipchumba@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '02 Mar 2022',
    status: 'Active',
  },
  {
    id: 'STF-117',
    name: 'Hellen Anyango',
    role: 'Dental Radiographer & CBCT Tech',
    department: 'Clinical & Nursing',
    branch: 'Nairobi Main',
    phone: '+254 703 891 029',
    email: 'hellen.anyango@smilux.co.ke',
    shift: 'Morning (07:30 - 15:30)',
    employmentType: 'Full-time',
    licenseNo: 'RRB-3910',
    joinDate: '14 May 2021',
    status: 'On Duty',
  },
  {
    id: 'STF-118',
    name: 'Geoffrey Cheruiyot',
    role: 'Biomedical & Chair Technician',
    department: 'Operations',
    branch: 'Nairobi Main',
    phone: '+254 719 301 984',
    email: 'geoffrey.cheruiyot@smilux.co.ke',
    shift: 'Morning (07:00 - 16:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '08 Dec 2022',
    status: 'Active',
  },
  {
    id: 'STF-119',
    name: 'Beatrice Mumbi',
    role: 'Junior Dental Hygienist',
    department: 'Clinical & Nursing',
    branch: 'Upper Hill Clinic',
    phone: '+254 728 991 204',
    email: 'beatrice.mumbi@smilux.co.ke',
    shift: 'Morning (08:00 - 16:00)',
    employmentType: 'Locum',
    licenseNo: 'KCN-77491',
    joinDate: '15 Jan 2024',
    status: 'On Duty',
  },
  {
    id: 'STF-120',
    name: 'Robert Odhiambo',
    role: 'Front Desk Receptionist',
    department: 'Administration',
    branch: 'Westlands Clinic',
    phone: '+254 735 442 819',
    email: 'robert.odhiambo@smilux.co.ke',
    shift: 'Evening (11:30 - 20:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '23 Jun 2023',
    status: 'Active',
  },
  {
    id: 'STF-121',
    name: 'Lilian Chepngetich',
    role: 'Staff Dental Nurse',
    department: 'Clinical & Nursing',
    branch: 'Karen Surgery Center',
    phone: '+254 702 119 384',
    email: 'lilian.chepngetich@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-71829',
    joinDate: '11 Oct 2023',
    status: 'On Duty',
  },
  {
    id: 'STF-122',
    name: 'Victor Mutua',
    role: 'Dental Assistant / Intern',
    department: 'Clinical & Nursing',
    branch: 'Nairobi Main',
    phone: '+254 715 882 109',
    email: 'victor.mutua@smilux.co.ke',
    shift: 'Morning (08:00 - 16:30)',
    employmentType: 'Contract',
    licenseNo: 'KCN-Pending',
    joinDate: '01 Feb 2024',
    status: 'Active',
  },
  {
    id: 'STF-123',
    name: 'Priscilla Wambui',
    role: 'Patient Concierge & Host',
    department: 'Administration',
    branch: 'Karen Surgery Center',
    phone: '+254 721 993 018',
    email: 'priscilla.wambui@smilux.co.ke',
    shift: 'Full Day (08:30 - 17:30)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '19 Sep 2021',
    status: 'Active',
  },
  {
    id: 'STF-124',
    name: 'Collins Koech',
    role: 'Dental Chair Assistant',
    department: 'Clinical & Nursing',
    branch: 'Upper Hill Clinic',
    phone: '+254 736 120 948',
    email: 'collins.koech@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'KCN-73019',
    joinDate: '07 Nov 2023',
    status: 'On Leave',
  },
  {
    id: 'STF-125',
    name: 'Diana Gathoni',
    role: 'Billing Specialist & Cashier',
    department: 'Finance & Billing',
    branch: 'Westlands Clinic',
    phone: '+254 704 220 193',
    email: 'diana.gathoni@smilux.co.ke',
    shift: 'Full Day (08:00 - 17:00)',
    employmentType: 'Full-time',
    licenseNo: 'N/A',
    joinDate: '14 May 2023',
    status: 'Active',
  },
];

export default function StaffPage() {
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  // Add staff modal form state
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Staff Dental Nurse',
    department: 'Clinical & Nursing',
    branch: 'Nairobi Main',
    phone: '',
    email: '',
    shift: 'Morning (07:30 - 15:30)',
    employmentType: 'Full-time',
    licenseNo: '',
    status: 'Active',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: staffList.length,
      clinical: staffList.filter((s) => s.department === 'Clinical & Nursing').length,
      admin: staffList.filter((s) => s.department === 'Administration' || s.department === 'Finance & Billing').length,
      onDuty: staffList.filter((s) => s.status === 'On Duty').length,
      onLeave: staffList.filter((s) => s.status === 'On Leave').length,
    };
  }, [staffList]);

  const tabs = [
    { id: 'all', label: 'All Staff', count: tabCounts.all },
    { id: 'clinical', label: 'Clinical & Nursing', count: tabCounts.clinical },
    { id: 'admin', label: 'Admin & Finance', count: tabCounts.admin },
    { id: 'on-duty', label: 'On Duty', count: tabCounts.onDuty },
    { id: 'on-leave', label: 'On Leave', count: tabCounts.onLeave },
  ];

  // Tab filtering
  const tabFilteredStaff = useMemo(() => {
    if (activeTab === 'clinical') return staffList.filter((s) => s.department === 'Clinical & Nursing');
    if (activeTab === 'admin') return staffList.filter((s) => s.department === 'Administration' || s.department === 'Finance & Billing');
    if (activeTab === 'on-duty') return staffList.filter((s) => s.status === 'On Duty');
    if (activeTab === 'on-leave') return staffList.filter((s) => s.status === 'On Leave');
    return staffList;
  }, [staffList, activeTab]);

  // Handle Add Staff
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) return;

    const created = {
      id: `STF-${126 + staffList.length}`,
      name: newStaff.name.trim(),
      role: newStaff.role,
      department: newStaff.department,
      branch: newStaff.branch,
      phone: newStaff.phone.trim(),
      email: newStaff.email.trim() || `${newStaff.name.toLowerCase().replace(/\s+/g, '.')}@smilux.co.ke`,
      shift: newStaff.shift,
      employmentType: newStaff.employmentType,
      licenseNo: newStaff.licenseNo.trim() || 'N/A',
      joinDate: 'Today',
      status: newStaff.status,
    };

    setStaffList([created, ...staffList]);
    setIsAddModalOpen(false);
    setNewStaff({
      name: '',
      role: 'Staff Dental Nurse',
      department: 'Clinical & Nursing',
      branch: 'Nairobi Main',
      phone: '',
      email: '',
      shift: 'Morning (07:30 - 15:30)',
      employmentType: 'Full-time',
      licenseNo: '',
      status: 'Active',
    });
  };

  // Header Dropdown actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Staff Roster',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Staff CSV / Excel roster opened'),
    },
    {
      id: 'export',
      label: 'Export Staff Directory',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => alert(`Exporting ${tabFilteredStaff.length} staff records to CSV...`),
    },
    {
      id: 'rota-builder',
      label: 'Open Monthly Shift Rota',
      icon: Calendar01Icon,
      onClick: () => alert('Opening Monthly Shift Schedule Planner...'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'manage-roles',
      label: 'Manage Role Permissions & Access',
      icon: Settings01Icon,
      onClick: () => alert('Opening Staff Role Permissions & Access Control'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Staff Member & ID',
        minWidth: '220px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter by employee name or ID...',
        render: (val, row) => {
          const initials = row.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2);

          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                {initials}
              </div>
              <div className="truncate min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  <span className="truncate">{row.name}</span>
                  {row.licenseNo && row.licenseNo !== 'N/A' && (
                    <span
                      title={`Professional Registration: ${row.licenseNo}`}
                      className="px-1 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 shrink-0"
                    >
                      {row.licenseNo}
                    </span>
                  )}
                </div>
                <div className="text-slate-500 font-medium leading-none mt-0.5">
                  {row.id} • {row.role}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: 'department',
        title: 'Department',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Clinical & Nursing', label: 'Clinical & Nursing' },
          { value: 'Administration', label: 'Administration' },
          { value: 'Finance & Billing', label: 'Finance & Billing' },
          { value: 'Sterilization & Lab', label: 'Sterilization & Lab' },
          { value: 'Operations', label: 'Operations' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-1.5 py-0.5 rounded font-medium text-xs truncate max-w-[145px] ${
              row.department === 'Clinical & Nursing'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60'
                : row.department === 'Administration'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60'
                : row.department === 'Finance & Billing'
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/60'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60'
            }`}
          >
            {row.department}
          </span>
        ),
      },
      {
        key: 'branch',
        title: 'Assigned Branch',
        minWidth: '150px',
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
          <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
            {row.branch}
          </span>
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
        title: 'Work Email',
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
        key: 'shift',
        title: 'Shift / Schedule',
        minWidth: '160px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate block">
            {row.shift}
          </span>
        ),
      },
      {
        key: 'employmentType',
        title: 'Employment',
        minWidth: '110px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Full-time', label: 'Full-time' },
          { value: 'Part-time', label: 'Part-time' },
          { value: 'Locum', label: 'Locum' },
          { value: 'Contract', label: 'Contract' },
        ],
        render: (val, row) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {row.employmentType}
          </span>
        ),
      },
      {
        key: 'joinDate',
        title: 'Date Joined',
        minWidth: '100px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {row.joinDate}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '100px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'On Duty', label: 'On Duty' },
          { value: 'Active', label: 'Active' },
          { value: 'On Leave', label: 'On Leave' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-2 py-0.5 rounded-full font-semibold text-xs ${
              row.status === 'On Duty'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : row.status === 'Active'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
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
              title={`Call ${row.name}`}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Calling ${row.name} at ${row.phone}`);
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={CallIcon} size={14} />
            </button>

            <RowActionDropdown
              title={`Actions for ${row.name}`}
              items={[
                {
                  id: 'view',
                  label: 'View Employee Profile',
                  icon: UserCircleIcon,
                  onClick: () => alert(`Viewing full profile for ${row.name} (${row.id})`),
                },
                {
                  id: 'rota',
                  label: 'View Assigned Shift Rota',
                  icon: Calendar01Icon,
                  onClick: () => alert(`Viewing shift schedule for ${row.name}`),
                },
                {
                  id: 'message',
                  label: 'Send SMS / Internal Alert',
                  icon: BubbleChatIcon,
                  onClick: () => alert(`Sending message to ${row.name} (${row.phone})`),
                },
                {
                  id: 'branch',
                  label: 'Transfer Branch Location',
                  icon: Location01Icon,
                  onClick: () => alert(`Transferring branch assignment for ${row.name}`),
                },
                { divider: true },
                {
                  id: 'edit',
                  label: 'Edit Employee Details',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing profile for ${row.name}`),
                },
                {
                  id: 'toggle-duty',
                  label: row.status === 'On Duty' ? 'Mark Off Duty' : 'Mark On Duty',
                  icon: CheckmarkCircle01Icon,
                  onClick: () => {
                    setStaffList((prev) =>
                      prev.map((s) =>
                        s.id === row.id
                          ? { ...s, status: s.status === 'On Duty' ? 'Active' : 'On Duty' }
                          : s
                      )
                    );
                  },
                },
                {
                  id: 'archive',
                  label: 'Deactivate / Terminate',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    setStaffList((prev) =>
                      prev.map((s) => (s.id === row.id ? { ...s, status: 'On Leave' } : s))
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
        title="Staff & Employees"
        badge={`${tabCounts.all} Members`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn how to manage dental clinic staff, nurses & shifts"
        moreActions={headerMoreActions}
        addLabel="Add Staff Member"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ─── Spreadsheet-Dense DataTable ─── */}
      <DataTable
        title="Staff Directory"
        data={tabFilteredStaff}
        columns={columns}
        rowKey="id"
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        maxHeight="calc(100vh - 250px)"
        initialDensity="normal"
        selectable={true}
        selectedRowKeys={selectedStaffIds}
        onSelectionChange={setSelectedStaffIds}
        initialSort={[{ key: 'name', direction: 'asc' }]}
        pageSizeOptions={[10, 25, 50, 100, 'All']}
        initialPageSize={25}
        showPagination={true}
        showColumnFiltersDefault={true}
        enableGlobalSearch={true}
        onRowClick={(row) => {
          // Open quick staff summary
        }}
      />

      {/* ─── Add Staff Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Register New Staff Member
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add employee to clinic roster and assign branch & schedule
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

            <form onSubmit={handleAddStaff} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Esther Nyambura"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Job Title / Role *
                  </label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Head Dental Nurse">Head Dental Nurse</option>
                    <option value="Staff Dental Nurse">Staff Dental Nurse</option>
                    <option value="Registered Dental Hygienist">Registered Dental Hygienist</option>
                    <option value="Dental Chair Assistant">Dental Chair Assistant</option>
                    <option value="Dental Lab Ceramic Technician">Dental Lab Technician</option>
                    <option value="Front Desk Lead / Patient Coordinator">Front Desk Lead</option>
                    <option value="Receptionist & Triage Clerk">Receptionist & Triage</option>
                    <option value="Clinic Operations Manager">Clinic Operations Manager</option>
                    <option value="Lead Clinic Accountant">Lead Clinic Accountant</option>
                    <option value="Insurance Claims & SHA Officer">Insurance Claims Officer</option>
                    <option value="Sterilization & Infection Tech">Sterilization Tech</option>
                    <option value="Dental Radiographer & CBCT Tech">Dental Radiographer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <select
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Clinical & Nursing">Clinical & Nursing</option>
                    <option value="Administration">Administration</option>
                    <option value="Finance & Billing">Finance & Billing</option>
                    <option value="Sterilization & Lab">Sterilization & Lab</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Primary Branch *
                  </label>
                  <select
                    value={newStaff.branch}
                    onChange={(e) => setNewStaff({ ...newStaff, branch: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
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
                    Employment Type
                  </label>
                  <select
                    value={newStaff.employmentType}
                    onChange={(e) => setNewStaff({ ...newStaff, employmentType: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Locum">Locum</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="staff@smilux.co.ke"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Shift Pattern
                  </label>
                  <select
                    value={newStaff.shift}
                    onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Morning (07:30 - 15:30)">Morning (07:30 - 15:30)</option>
                    <option value="Full Day (08:00 - 17:00)">Full Day (08:00 - 17:00)</option>
                    <option value="Evening (11:30 - 19:30)">Evening (11:30 - 19:30)</option>
                    <option value="Weekend Rotation">Weekend Rotation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    License / Council Reg No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KCN-68192 or N/A"
                    value={newStaff.licenseNo}
                    onChange={(e) => setNewStaff({ ...newStaff, licenseNo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
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
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#057a55] hover:bg-[#046c4b] transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Staff Member</span>
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
                  Staff & Employee Directory: Guide
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
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 rounded">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                  Multi-Branch Staff Coordination & Roster Compliance
                </p>
                <p>
                  Manage nursing staff, hygienists, front desk concierges, and lab technicians across all clinic branches with live duty statuses and Kenya Nursing Council (KCN) registration tracking.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Staff Features</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Shift Schedules:</strong> Track morning, full-day, and evening rotas to ensure adequate dental chair assistant coverage for scheduled surgeries.
                  </li>
                  <li>
                    <strong>Branch Reassignments:</strong> Seamlessly move staff between Nairobi Main, Westlands, Upper Hill, Karen, and Mombasa locations.
                  </li>
                  <li>
                    <strong>Spreadsheet Sorting & Filtering:</strong> Hold <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium">Shift</kbd> + click column headers for multi-sort priority, or use column filter inputs.
                  </li>
                  <li>
                    <strong>Quick Contacts:</strong> Click the phone icon in any row to instantly dial an employee or use the row menu to dispatch internal SMS alerts.
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsLearnModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
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

