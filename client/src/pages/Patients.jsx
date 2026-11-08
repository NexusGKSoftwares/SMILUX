import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  DentalToothIcon,
  MoreHorizontalIcon,
  Cancel01Icon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons';

// Initial mock dataset for patients (with more records to demonstrate paging & multi-sort)
const INITIAL_PATIENTS = [
  {
    id: 'PAT-1082',
    name: 'Wanjiku Kamau',
    phone: '+254 712 345 678',
    email: 'wanjiku.kamau@gmail.com',
    age: 34,
    gender: 'Female',
    insurance: 'SHA / Jubilee Insurance',
    insuranceType: 'insured',
    lastVisit: 'Today',
    nextAppointment: 'Tomorrow, 10:00 AM',
    treatment: 'Orthodontic Adjustment',
    dentalAlert: 'Penicillin Allergy',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1081',
    name: 'Brian Omondi',
    phone: '+254 722 987 654',
    email: 'brian.omondi@outlook.com',
    age: 29,
    gender: 'Male',
    insurance: 'AAR Healthcare',
    insuranceType: 'insured',
    lastVisit: '10 Nov 2026',
    nextAppointment: '18 Nov 2026',
    treatment: 'Molar Root Canal (Tooth #36)',
    dentalAlert: 'None',
    balance: 'KES 4,500',
    status: 'Active',
  },
  {
    id: 'PAT-1080',
    name: 'Mercy Njeri',
    phone: '+254 733 112 233',
    email: 'mercy.njeri@yahoo.com',
    age: 42,
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    insuranceType: 'self-pay',
    lastVisit: '04 Oct 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Composite Filling & Scaling',
    dentalAlert: 'Hypertension',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1079',
    name: 'Kevin Mutua',
    phone: '+254 701 445 566',
    email: 'kmutua@techcorp.co.ke',
    age: 26,
    gender: 'Male',
    insurance: 'Britam Dental',
    insuranceType: 'insured',
    lastVisit: '15 Sep 2026',
    nextAppointment: '22 Nov 2026',
    treatment: 'Wisdom Tooth Extraction',
    dentalAlert: 'Latex Sensitivity',
    balance: 'KES 1,200',
    status: 'Follow Up',
  },
  {
    id: 'PAT-1078',
    name: 'Grace Chebet',
    phone: '+254 718 778 899',
    email: 'gchebet@uonbi.ac.ke',
    age: 38,
    gender: 'Female',
    insurance: 'SHA Direct (Civil Servants)',
    insuranceType: 'insured',
    lastVisit: '01 Aug 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Teeth Whitening & Polish',
    dentalAlert: 'None',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1077',
    name: 'David Kipkorir',
    phone: '+254 720 334 455',
    email: 'david.kipkorir@gmail.com',
    age: 51,
    gender: 'Male',
    insurance: 'Old Mutual Health',
    insuranceType: 'insured',
    lastVisit: '12 Jul 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Crown Placement (#21)',
    dentalAlert: 'Diabetic Type 2',
    balance: 'KES 8,000',
    status: 'Follow Up',
  },
  {
    id: 'PAT-1076',
    name: 'Amina Mohammed',
    phone: '+254 734 556 677',
    email: 'amina.m@coastdental.com',
    age: 31,
    gender: 'Female',
    insurance: 'Self Pay (Cash)',
    insuranceType: 'self-pay',
    lastVisit: '05 May 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Pediatric Consultation',
    dentalAlert: 'None',
    balance: 'KES 0',
    status: 'Archived',
  },
  {
    id: 'PAT-1075',
    name: 'Faith Mwangi',
    phone: '+254 711 223 344',
    email: 'faith.mwangi@gmail.com',
    age: 23,
    gender: 'Female',
    insurance: 'Jubilee Allianz',
    insuranceType: 'insured',
    lastVisit: '14 Oct 2026',
    nextAppointment: '28 Nov 2026',
    treatment: 'Ceramic Veneers Fitting',
    dentalAlert: 'None',
    balance: 'KES 15,000',
    status: 'Active',
  },
  {
    id: 'PAT-1074',
    name: 'Hassan Abdi',
    phone: '+254 723 445 566',
    email: 'hassan.abdi@gmail.com',
    age: 45,
    gender: 'Male',
    insurance: 'CIC Dental Care',
    insuranceType: 'insured',
    lastVisit: '22 Aug 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Full Mouth Scaling',
    dentalAlert: 'Asthmatic',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1073',
    name: 'Yvonne Wambui',
    phone: '+254 799 887 766',
    email: 'yvonne.w@yahoo.com',
    age: 33,
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    insuranceType: 'self-pay',
    lastVisit: '19 Sep 2026',
    nextAppointment: '05 Dec 2026',
    treatment: 'Gingival Grafting',
    dentalAlert: 'Sulfa Allergy',
    balance: 'KES 2,500',
    status: 'Follow Up',
  },
  {
    id: 'PAT-1072',
    name: 'Peter Njoroge',
    phone: '+254 700 112 233',
    email: 'peter.njoroge@gmail.com',
    age: 62,
    gender: 'Male',
    insurance: 'SHA / NHIF Senior',
    insuranceType: 'insured',
    lastVisit: '02 Jun 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Dentures Fabrication',
    dentalAlert: 'Cardiac Pacemaker',
    balance: 'KES 0',
    status: 'Archived',
  },
  {
    id: 'PAT-1071',
    name: 'Sharon Akoth',
    phone: '+254 740 556 677',
    email: 'sharon.akoth@med.co.ke',
    age: 28,
    gender: 'Female',
    insurance: 'AAR Healthcare',
    insuranceType: 'insured',
    lastVisit: '03 Nov 2026',
    nextAppointment: '15 Nov 2026',
    treatment: 'Invisalign Scan #4',
    dentalAlert: 'None',
    balance: 'KES 0',
    status: 'Active',
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedPatientIds, setSelectedPatientIds] = useState([]);

  // New patient modal state
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    treatment: 'General Consultation',
    dentalAlert: 'None',
  });

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    return {
      all: patients.length,
      active: patients.filter((p) => p.status === 'Active').length,
      followUp: patients.filter((p) => p.status === 'Follow Up').length,
      archived: patients.filter((p) => p.status === 'Archived').length,
    };
  }, [patients]);

  const tabs = [
    { id: 'all', label: 'All Patients', count: tabCounts.all },
    { id: 'active', label: 'Active', count: tabCounts.active },
    { id: 'follow-up', label: 'Follow Up', count: tabCounts.followUp },
    { id: 'archived', label: 'Archived', count: tabCounts.archived },
  ];

  // Tab filter
  const tabFilteredPatients = useMemo(() => {
    if (activeTab === 'active') return patients.filter((p) => p.status === 'Active');
    if (activeTab === 'follow-up') return patients.filter((p) => p.status === 'Follow Up');
    if (activeTab === 'archived') return patients.filter((p) => p.status === 'Archived');
    return patients;
  }, [patients, activeTab]);

  // Handle Add Patient submit
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.phone.trim()) return;

    const created = {
      id: `PAT-${1083 + patients.length}`,
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email || `${newPatient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      age: Number(newPatient.age) || 30,
      gender: newPatient.gender,
      insurance: newPatient.insurance,
      insuranceType: newPatient.insurance.includes('Self') ? 'self-pay' : 'insured',
      lastVisit: 'Today',
      nextAppointment: 'Scheduled',
      treatment: newPatient.treatment || 'Consultation',
      dentalAlert: newPatient.dentalAlert || 'None',
      balance: 'KES 0',
      status: 'Active',
    };

    setPatients([created, ...patients]);
    setIsAddModalOpen(false);
    setNewPatient({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Female',
      insurance: 'Self Pay (M-Pesa)',
      treatment: 'General Consultation',
      dentalAlert: 'None',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Patients',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Patients CSV / Excel wizard opened'),
    },
    {
      id: 'export',
      label: 'Export Patient List',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => alert(`Exporting ${tabFilteredPatients.length} patient records to CSV...`),
    },
    {
      id: 'add-multiple',
      label: 'Add Multiple Patients',
      onClick: () => alert('Batch Patient Entry Mode activated'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'manage-roles',
      label: 'Manage Patient Privacy & Access',
      onClick: () => alert('Opening Patient Privacy and Consent Settings'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Patient Name & File ID',
        minWidth: '220px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter by name or ID...',
        render: (val, row) => {
          const initials = row.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2);

          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] shrink-0 border border-emerald-300">
                {initials}
              </div>
              <div className="truncate min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  <span className="truncate">{row.name}</span>
                  {row.dentalAlert !== 'None' && (
                    <span
                      title={`Allergy / Medical Alert: ${row.dentalAlert}`}
                      className="px-1 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0"
                    >
                      {row.dentalAlert}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-mono leading-none mt-0.5">
                  {row.id}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: 'phone',
        title: 'Phone Number',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="font-mono text-slate-700 dark:text-slate-300 tabular-nums">
            {row.phone}
          </span>
        ),
      },
      {
        key: 'email',
        title: 'Email Address',
        minWidth: '170px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-400 truncate block max-w-[160px]">
            {row.email}
          </span>
        ),
      },
      {
        key: 'age',
        title: 'Age / Sex',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        filterType: 'number',
        render: (val, row) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {row.age} yrs <span className="text-slate-400 font-normal">({row.gender[0]})</span>
          </span>
        ),
      },
      {
        key: 'insurance',
        title: 'Insurance Scheme',
        minWidth: '175px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        render: (val, row) => (
          <span
            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium truncate max-w-[165px] ${row.insuranceType === 'insured'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60'
              }`}
          >
            {row.insurance}
          </span>
        ),
      },
      {
        key: 'treatment',
        title: 'Procedure / Care',
        minWidth: '185px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span
            className="text-slate-700 dark:text-slate-300 truncate block max-w-[175px]"
            title={row.treatment}
          >
            {row.treatment}
          </span>
        ),
      },
      {
        key: 'lastVisit',
        title: 'Last Visit',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">
            {row.lastVisit}
          </span>
        ),
      },
      {
        key: 'nextAppointment',
        title: 'Next Visit',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-300 text-[10px] truncate block">
            {row.nextAppointment}
          </span>
        ),
      },
      {
        key: 'balance',
        title: 'Balance',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        align: 'right',
        render: (val, row) => (
          <span
            className={`font-mono font-medium text-right block tabular-nums ${row.balance !== 'KES 0'
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-500'
              }`}
          >
            {row.balance}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Active', label: 'Active' },
          { value: 'Follow Up', label: 'Follow Up' },
          { value: 'Archived', label: 'Archived' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${row.status === 'Active'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : row.status === 'Follow Up'
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
              title="Open FDI Dental Chart"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Opening Dental Chart for ${row.name} (${row.id})`);
              }}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={DentalToothIcon} size={14} />
            </button>
            <button
              type="button"
              title="Patient File Options"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Options menu for ${row.name}`);
              }}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} size={14} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-3 mb-8">
      {/* ─── PageHeader with Title, Learn, 3-Dots, & Add Button ─── */}
      <div className="bg-white dark:bg-slate-900 rounded shadow-xs border border-slate-300 dark:border-slate-800 overflow-hidden">
        <PageHeader
          title="Patients"
          badge={`${tabCounts.all} Files`}
          showLearn={true}
          learnLabel="Learn"
          onLearn={() => setIsLearnModalOpen(true)}
          learnTooltip="Learn how to manage dental patient files, charts & records"
          moreActions={headerMoreActions}
          addLabel="Add Patient"
          onAdd={() => setIsAddModalOpen(true)}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* ─── Spreadsheet-Dense DataTable ─── */}
      <DataTable
        title="Patients"
        data={tabFilteredPatients}
        columns={columns}
        rowKey="id"
        // Sticky Header & Sticky Columns
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        maxHeight="calc(100vh - 250px)"
        // Ultra-dense spreadsheet mode by default
        initialDensity="compact"
        // Row multi-selection
        selectable={true}
        selectedRowKeys={selectedPatientIds}
        onSelectionChange={setSelectedPatientIds}
        // Multi-column sorting
        initialSort={[{ key: 'name', direction: 'asc' }]}
        // Paging
        pageSizeOptions={[10, 25, 50, 100, 'All']}
        initialPageSize={25}
        showPagination={true}
        // Per-column filters enabled by default
        showColumnFiltersDefault={true}
        enableGlobalSearch={true}
        // Row click opens chart or file
        onRowClick={(row) => {
          // row click handler
        }}
      />

      {/* ─── Add Patient Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Register New Patient
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create medical file and assign patient identification number
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

            <form onSubmit={handleAddPatient} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Waweru"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Age & Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      className="w-20 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Child">Pediatric</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Insurance / Payment Scheme
                  </label>
                  <select
                    value={newPatient.insurance}
                    onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Self Pay (M-Pesa)">Self Pay (M-Pesa)</option>
                    <option value="Self Pay (Cash)">Self Pay (Cash)</option>
                    <option value="SHA / Jubilee Insurance">SHA / Jubilee Insurance</option>
                    <option value="AAR Healthcare">AAR Healthcare</option>
                    <option value="Britam Dental">Britam Dental</option>
                    <option value="Old Mutual Health">Old Mutual Health</option>
                    <option value="SHA Direct (Civil Servants)">SHA Direct (Civil Servants)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Medical / Allergy Alerts
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin allergy, diabetic, pregnant, none"
                    value={newPatient.dentalAlert}
                    onChange={(e) => setNewPatient({ ...newPatient, dentalAlert: e.target.value })}
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
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#057a55] hover:bg-[#046c4b] shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Learn Drawer / Modal ─── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Patients Directory: Quick Guide
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
                  Spreadsheet Power & Compliance
                </p>
                <p>
                  This table is built for high-throughput dental staff. You can filter every column individually, sort multiple columns at once by holding Shift, and toggle row densities.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Table Features</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Multi-Column Sorting:</strong> Click any header to sort. Hold <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Shift</kbd> + click to sort by multiple columns with precedence numbers (1, 2, 3).
                  </li>
                  <li>
                    <strong>Per-Column Filters:</strong> Enter text or pick from dropdowns in the filter row to narrow down columns directly.
                  </li>
                  <li>
                    <strong>Fixed Header & Pinned Columns:</strong> The header row stays fixed when scrolling vertically. Patient Name/ID (first column) and Actions (last column) stay pinned when scrolling horizontally.
                  </li>
                  <li>
                    <strong>Spreadsheet Density:</strong> Use the "Dense" / "Normal" / "Cozy" buttons in the toolbar to adjust row heights to your preference.
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
