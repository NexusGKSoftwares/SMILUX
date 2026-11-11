import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  Building01Icon,
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
  Hospital01Icon,
  DentalToothIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Branches & Workspaces Dataset (Multi-Clinic Practice) ───────────
const INITIAL_BRANCHES = [
  {
    id: 'BR-NRB-01',
    code: 'NRB-MAIN',
    name: 'Nairobi Main Medical Center',
    type: 'Flagship Dental Hospital',
    category: 'flagship',
    manager: 'Dr. Darrell Steward',
    chairs: 8,
    activeChairs: 7,
    phone: '+254 20 892 1000',
    email: 'nairobi.main@smilux.co.ke',
    address: 'Upper Hill Medical Plaza, 4th Floor, Ralph Bunche Rd',
    city: 'Nairobi (Upper Hill)',
    operatingHours: 'Mon - Sat: 07:30 - 20:00 (Sun: 09:00 - 15:00)',
    staffCount: '22 Staff • 6 Dentists',
    monthlyRevenue: 'KES 5,800,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-02',
    code: 'WST-OVAL',
    name: 'Westlands Clinic & Aesthetic Suite',
    type: 'Specialist Dental Center',
    category: 'satellite',
    manager: 'Dr. Faith Mutua',
    chairs: 5,
    activeChairs: 5,
    phone: '+254 20 449 2000',
    email: 'westlands@smilux.co.ke',
    address: 'The Oval, 3rd Floor Suite 302, Ring Road Parklands',
    city: 'Nairobi (Westlands)',
    operatingHours: 'Mon - Sat: 08:00 - 19:00',
    staffCount: '14 Staff • 4 Dentists',
    monthlyRevenue: 'KES 4,100,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-03',
    code: 'KRN-HUB',
    name: 'Karen Surgery & Pediatric Center',
    type: 'Specialist Surgery Center',
    category: 'flagship',
    manager: 'Dr. Amina Kassam',
    chairs: 4,
    activeChairs: 4,
    phone: '+254 20 889 3100',
    email: 'karen@smilux.co.ke',
    address: 'The Hub Karen, East Wing Ground Floor',
    city: 'Nairobi (Karen)',
    operatingHours: 'Mon - Sat: 08:30 - 18:00',
    staffCount: '12 Staff • 3 Dentists',
    monthlyRevenue: 'KES 3,650,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-04',
    code: 'UPH-BRIT',
    name: 'Upper Hill Implant & Ortho Clinic',
    type: 'Specialist Dental Center',
    category: 'satellite',
    manager: 'Dr. Wanjiku Kimani',
    chairs: 4,
    activeChairs: 3,
    phone: '+254 20 271 9400',
    email: 'upperhill@smilux.co.ke',
    address: 'Britam Tower, 14th Floor, Hospital Road',
    city: 'Nairobi (Upper Hill)',
    operatingHours: 'Mon - Fri: 08:00 - 17:30',
    staffCount: '10 Staff • 3 Dentists',
    monthlyRevenue: 'KES 3,200,000',
    status: 'Operational',
  },
  {
    id: 'BR-MBA-01',
    code: 'MBA-NYL',
    name: 'Mombasa Waterfront Dental Clinic',
    type: 'Regional Flagship',
    category: 'flagship',
    manager: 'Dr. Hassan Omar',
    chairs: 4,
    activeChairs: 3,
    phone: '+254 41 447 1820',
    email: 'mombasa@smilux.co.ke',
    address: 'Nyali Plaza, Links Road Suite 10, Mombasa',
    city: 'Mombasa (Nyali)',
    operatingHours: 'Mon - Sat: 08:30 - 17:30',
    staffCount: '11 Staff • 3 Dentists',
    monthlyRevenue: 'KES 2,900,000',
    status: 'Operational',
  },
  {
    id: 'BR-KSM-01',
    code: 'KSM-MGA',
    name: 'Kisumu Mega City Branch',
    type: 'Regional Satellite Clinic',
    category: 'satellite',
    manager: 'Dr. Kevin Ochieng',
    chairs: 3,
    activeChairs: 3,
    phone: '+254 57 202 8190',
    email: 'kisumu@smilux.co.ke',
    address: 'Mega City Mall, 1st Floor, Nairobi-Kisumu Highway',
    city: 'Kisumu',
    operatingHours: 'Mon - Fri: 08:00 - 17:00, Sat: 08:30 - 14:00',
    staffCount: '8 Staff • 2 Dentists',
    monthlyRevenue: 'KES 2,150,000',
    status: 'Operational',
  },
  {
    id: 'BR-NKU-01',
    code: 'NKU-CBD',
    name: 'Nakuru CBD Dental Care',
    type: 'Satellite Clinic',
    category: 'satellite',
    manager: 'Dr. Peter Kiprotich',
    chairs: 2,
    activeChairs: 2,
    phone: '+254 51 221 4901',
    email: 'nakuru@smilux.co.ke',
    address: 'Pate House, 2nd Floor, Kenyatta Avenue',
    city: 'Nakuru',
    operatingHours: 'Mon - Sat: 08:00 - 17:00',
    staffCount: '6 Staff • 2 Dentists',
    monthlyRevenue: 'KES 1,800,000',
    status: 'Operational',
  },
  {
    id: 'BR-ELD-01',
    code: 'ELD-KVD',
    name: 'Eldoret Highland Dental Suite',
    type: 'Satellite Clinic',
    category: 'satellite',
    manager: 'Dr. Grace Jepkemboi',
    chairs: 3,
    activeChairs: 3,
    phone: '+254 53 206 1829',
    email: 'eldoret@smilux.co.ke',
    address: 'KVDA Plaza, 3rd Floor, Oloo Street',
    city: 'Eldoret',
    operatingHours: 'Mon - Fri: 08:30 - 17:00',
    staffCount: '7 Staff • 2 Dentists',
    monthlyRevenue: 'KES 1,950,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-05',
    code: 'THK-GDC',
    name: 'Garden City Express Dental Suite',
    type: 'Express Shopping Center Clinic',
    category: 'satellite',
    manager: 'Dr. Ronald Barasa',
    chairs: 2,
    activeChairs: 2,
    phone: '+254 20 800 4821',
    email: 'gardencity@smilux.co.ke',
    address: 'Garden City Mall, 1st Floor, Thika Superhighway',
    city: 'Nairobi (Ruaraka)',
    operatingHours: 'Mon - Sun: 09:00 - 20:00',
    staffCount: '8 Staff • 2 Dentists',
    monthlyRevenue: 'KES 2,400,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-06',
    code: 'KLM-ADL',
    name: 'Kilimani Hurlingham Dental Hub',
    type: 'Specialist Dental Center',
    category: 'satellite',
    manager: 'Dr. Sarah Wambui',
    chairs: 3,
    activeChairs: 3,
    phone: '+254 20 387 1940',
    email: 'kilimani@smilux.co.ke',
    address: 'Adlife Plaza, 2nd Floor, Chania Avenue / Ring Rd',
    city: 'Nairobi (Kilimani)',
    operatingHours: 'Mon - Sat: 08:30 - 18:30',
    staffCount: '9 Staff • 2 Dentists',
    monthlyRevenue: 'KES 2,750,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-07',
    code: 'LVG-GRN',
    name: 'Lavington Green Dental Suite',
    type: 'Boutique Cosmetic Clinic',
    category: 'satellite',
    manager: 'Dr. Caroline Muthoni',
    chairs: 2,
    activeChairs: 1,
    phone: '+254 20 386 4920',
    email: 'lavington@smilux.co.ke',
    address: 'Lavington Green Mall, 2nd Floor, James Gichuru Rd',
    city: 'Nairobi (Lavington)',
    operatingHours: 'Tue - Sat: 09:00 - 17:30',
    staffCount: '5 Staff • 1 Dentist',
    monthlyRevenue: 'KES 1,600,000',
    status: 'Operational',
  },
  {
    id: 'BR-NRB-08',
    code: 'PKL-DOC',
    name: 'Parklands Maxillofacial Surgical Center',
    type: 'Surgical Day Hospital',
    category: 'flagship',
    manager: 'Dr. Tariq Al-Mansoor',
    chairs: 4,
    activeChairs: 2,
    phone: '+254 20 374 8100',
    email: 'parklands@smilux.co.ke',
    address: 'Avenue Doctors Plaza, 3rd Parklands Avenue',
    city: 'Nairobi (Parklands)',
    operatingHours: 'Mon - Fri: 08:00 - 18:00',
    staffCount: '15 Staff • 4 Dentists',
    monthlyRevenue: 'KES 4,500,000',
    status: 'Expanding',
  },
  {
    id: 'BR-KBU-01',
    code: 'RIR-TWO',
    name: 'Two Rivers Dental & Orthodontics',
    type: 'Modern Mall Clinic',
    category: 'satellite',
    manager: 'Dr. Paul Kiptoo',
    chairs: 3,
    activeChairs: 0,
    phone: '+254 20 712 9011',
    email: 'tworivers@smilux.co.ke',
    address: 'Two Rivers Mall, Ground Floor, Limuru Road',
    city: 'Kiambu / Nairobi North',
    operatingHours: 'Opening Nov 2026',
    staffCount: '4 Staff (Fitout Stage)',
    monthlyRevenue: 'KES 0 (Fitout)',
    status: 'Expanding',
  },
];

export default function BranchesPage() {
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);

  // New branch modal state
  const [newBranch, setNewBranch] = useState({
    name: '',
    code: '',
    type: 'Specialist Dental Center',
    category: 'satellite',
    manager: 'Dr. Darrell Steward',
    chairs: '3',
    phone: '',
    email: '',
    address: '',
    city: 'Nairobi',
    operatingHours: 'Mon - Sat: 08:00 - 18:00',
    status: 'Operational',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: branches.length,
      flagship: branches.filter((b) => b.category === 'flagship').length,
      satellite: branches.filter((b) => b.category === 'satellite').length,
      operational: branches.filter((b) => b.status === 'Operational').length,
      expanding: branches.filter((b) => b.status === 'Expanding').length,
    };
  }, [branches]);

  const tabs = [
    { id: 'all', label: 'All Branches', count: tabCounts.all },
    { id: 'flagship', label: 'Flagship Centers', count: tabCounts.flagship },
    { id: 'satellite', label: 'Satellite Clinics', count: tabCounts.satellite },
    { id: 'operational', label: 'Operational', count: tabCounts.operational },
    { id: 'expanding', label: 'Expanding / Fitout', count: tabCounts.expanding },
  ];

  // Tab filter
  const tabFilteredBranches = useMemo(() => {
    if (activeTab === 'flagship') return branches.filter((b) => b.category === 'flagship');
    if (activeTab === 'satellite') return branches.filter((b) => b.category === 'satellite');
    if (activeTab === 'operational') return branches.filter((b) => b.status === 'Operational');
    if (activeTab === 'expanding') return branches.filter((b) => b.status === 'Expanding');
    return branches;
  }, [branches, activeTab]);

  // Handle Add Branch submit
  const handleAddBranch = (e) => {
    e.preventDefault();
    if (!newBranch.name.trim() || !newBranch.phone.trim()) return;

    const chairsNum = Number(newBranch.chairs) || 3;
    const generatedCode = newBranch.code.trim() || newBranch.name.substring(0, 3).toUpperCase() + '-01';

    const created = {
      id: `BR-${generatedCode.replace(/[^A-Z0-9]/g, '')}`,
      code: generatedCode,
      name: newBranch.name.trim(),
      type: newBranch.type,
      category: newBranch.category,
      manager: newBranch.manager,
      chairs: chairsNum,
      activeChairs: chairsNum,
      phone: newBranch.phone.trim(),
      email: newBranch.email.trim() || `${newBranch.name.toLowerCase().replace(/[^a-z]/g, '.')}@smilux.co.ke`,
      address: newBranch.address.trim() || 'Nairobi Medical Plaza',
      city: newBranch.city,
      operatingHours: newBranch.operatingHours,
      staffCount: `${chairsNum * 2} Staff • ${Math.max(1, Math.floor(chairsNum / 2))} Dentists`,
      monthlyRevenue: 'KES 2,000,000 (Target)',
      status: newBranch.status,
    };

    setBranches([created, ...branches]);
    setIsAddModalOpen(false);
    setNewBranch({
      name: '',
      code: '',
      type: 'Specialist Dental Center',
      category: 'satellite',
      manager: 'Dr. Darrell Steward',
      chairs: '3',
      phone: '',
      email: '',
      address: '',
      city: 'Nairobi',
      operatingHours: 'Mon - Sat: 08:00 - 18:00',
      status: 'Operational',
    });
  };

  // Header Dropdown actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Branch Directory',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Branch Location JSON / CSV wizard opened'),
    },
    {
      id: 'export',
      label: 'Export Branch Analytics',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => alert(`Exporting ${tabFilteredBranches.length} branch records to CSV...`),
    },
    {
      id: 'transfer',
      label: 'Inter-Branch Stock Transfer',
      icon: Doc01Icon,
      onClick: () => alert('Opening Inter-Branch Inventory & Transfer Dispatcher...'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'consolidation',
      label: 'Practice Consolidated Ledger',
      icon: Settings01Icon,
      onClick: () => alert('Opening Consolidated KRA & Revenue Report for all locations'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Branch Name & Location',
        minWidth: '240px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter by clinic name or code...',
        render: (val, row) => {
          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                <HugeiconsIcon icon={Hospital01Icon} size={13} />
              </div>
              <div className="truncate min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  <span className="truncate">{row.name}</span>
                  <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                    {row.code}
                  </span>
                </div>
                <div className="text-slate-500 font-medium leading-none mt-0.5 truncate text-[11px]">
                  {row.city} • {row.type}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: 'manager',
        title: 'Clinical Director / Lead',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block max-w-[175px]">
            {row.manager}
          </span>
        ),
      },
      {
        key: 'chairs',
        title: 'Dental Operatories',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterType: 'number',
        render: (val, row) => (
          <div className="flex items-center gap-1.5">
            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 font-bold text-xs">
              {row.chairs} Chairs
            </span>
            <span className="text-[11px] text-slate-500">
              ({row.activeChairs} Active)
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
        title: 'Branch Email',
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
        key: 'operatingHours',
        title: 'Operating Hours',
        minWidth: '190px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate block max-w-[185px]" title={row.operatingHours}>
            {row.operatingHours}
          </span>
        ),
      },
      {
        key: 'staffCount',
        title: 'Team Size',
        minWidth: '160px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate block">
            {row.staffCount}
          </span>
        ),
      },
      {
        key: 'monthlyRevenue',
        title: 'Monthly Volume',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        align: 'right',
        render: (val, row) => (
          <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums block text-right">
            {row.monthlyRevenue}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '110px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Operational', label: 'Operational' },
          { value: 'Expanding', label: 'Expanding' },
          { value: 'Maintenance', label: 'Maintenance' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-2 py-0.5 rounded-full font-semibold text-xs ${
              row.status === 'Operational'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : row.status === 'Expanding'
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
                alert(`Calling clinic reception at ${row.phone}`);
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={CallIcon} size={14} />
            </button>

            <RowActionDropdown
              title={`Actions for ${row.name}`}
              items={[
                {
                  id: 'workspace',
                  label: 'Switch to Branch Workspace',
                  icon: Hospital01Icon,
                  onClick: () => alert(`Switched active clinic context to ${row.name} (${row.code})`),
                },
                {
                  id: 'chairs',
                  label: 'Manage Dental Chairs & Operatories',
                  icon: DentalToothIcon,
                  onClick: () => alert(`Opening chair manager for ${row.name}`),
                },
                {
                  id: 'team',
                  label: 'View Branch Staff & Dentists',
                  icon: UserCircleIcon,
                  onClick: () => alert(`Opening employee list for ${row.name}`),
                },
                {
                  id: 'transfer',
                  label: 'Dispatch Stock / Requisition',
                  icon: Doc01Icon,
                  onClick: () => alert(`Initiating stock transfer for ${row.name}`),
                },
                {
                  id: 'hours',
                  label: 'Update Operating Hours',
                  icon: Clock01Icon,
                  onClick: () => alert(`Updating opening hours for ${row.name}`),
                },
                { divider: true },
                {
                  id: 'edit',
                  label: 'Edit Branch Profile',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing facility profile for ${row.name}`),
                },
                {
                  id: 'maintenance',
                  label: 'Toggle Maintenance Status',
                  icon: AlertCircleIcon,
                  onClick: () => {
                    setBranches((prev) =>
                      prev.map((b) =>
                        b.id === row.id
                          ? { ...b, status: b.status === 'Operational' ? 'Expanding' : 'Operational' }
                          : b
                      )
                    );
                  },
                },
                {
                  id: 'archive',
                  label: 'Suspend Branch Operations',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    setBranches((prev) =>
                      prev.map((b) => (b.id === row.id ? { ...b, status: 'Expanding' } : b))
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
        title="Branches & Workspaces"
        badge={`${tabCounts.all} Locations`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn how to manage multi-clinic locations, chairs & workspaces"
        moreActions={headerMoreActions}
        addLabel="Add Branch"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ─── Spreadsheet-Dense DataTable ─── */}
      <DataTable
        title="Clinic Network Directory"
        data={tabFilteredBranches}
        columns={columns}
        rowKey="id"
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        maxHeight="calc(100vh - 250px)"
        initialDensity="normal"
        selectable={true}
        selectedRowKeys={selectedBranchIds}
        onSelectionChange={setSelectedBranchIds}
        initialSort={[{ key: 'name', direction: 'asc' }]}
        pageSizeOptions={[10, 25, 50, 100, 'All']}
        initialPageSize={25}
        showPagination={true}
        showColumnFiltersDefault={true}
        enableGlobalSearch={true}
        onRowClick={(row) => {
          // Open branch detail
        }}
      />

      {/* ─── Add Branch Modal ─── */}
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
                    Register Clinic Branch Location
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add new dental facility to practice network and assign operatories
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

            <form onSubmit={handleAddBranch} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Branch Facility Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kisumu Mega City Branch"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Facility Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KSM-01"
                    value={newBranch.code}
                    onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Facility Type
                  </label>
                  <select
                    value={newBranch.type}
                    onChange={(e) => {
                      const t = e.target.value;
                      const cat = t.includes('Flagship') ? 'flagship' : 'satellite';
                      setNewBranch({ ...newBranch, type: t, category: cat });
                    }}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Specialist Dental Center">Specialist Dental Center</option>
                    <option value="Flagship Dental Hospital">Flagship Dental Hospital</option>
                    <option value="Regional Satellite Clinic">Regional Satellite Clinic</option>
                    <option value="Express Shopping Center Clinic">Express Mall Clinic</option>
                    <option value="Surgical Day Hospital">Surgical Day Hospital</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Clinical Director / Manager
                  </label>
                  <select
                    value={newBranch.manager}
                    onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Dr. Darrell Steward">Dr. Darrell Steward</option>
                    <option value="Dr. Faith Mutua">Dr. Faith Mutua</option>
                    <option value="Dr. Kevin Ochieng">Dr. Kevin Ochieng</option>
                    <option value="Dr. Amina Kassam">Dr. Amina Kassam</option>
                    <option value="Dr. Wanjiku Kimani">Dr. Wanjiku Kimani</option>
                    <option value="Dr. Hassan Omar">Dr. Hassan Omar</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Dental Chairs / Operatories *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={newBranch.chairs}
                    onChange={(e) => setNewBranch({ ...newBranch, chairs: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Physical Address & Building *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mega City Mall, 1st Floor, Nairobi-Kisumu Highway"
                    value={newBranch.address}
                    onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    City / County
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kisumu or Nairobi"
                    value={newBranch.city}
                    onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Contact Phone (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 20 XXX XXXX"
                    value={newBranch.phone}
                    onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
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
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Branch</span>
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
                  Branches & Workspaces: Guide
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
                  Unified Multi-Location Dental Practice Management
                </p>
                <p>
                  Smilux links all your flagship surgical centers, express suites, and regional satellite clinics into a single cloud ecosystem. Patients can walk into any branch while their complete medical record, FDI chart, and billing history remain instantly accessible.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Multi-Branch Capabilities</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Operatory & Chair Utilization:</strong> Track active chairs per facility to optimize daily practitioner bookings and surgery turnaround.
                  </li>
                  <li>
                    <strong>Inter-Branch Inventory Transfers:</strong> Shift composites, implants, and anesthetics between locations with real-time stock transfer dispatches.
                  </li>
                  <li>
                    <strong>Consolidated Revenue Intelligence:</strong> View branch-specific turnover, M-Pesa collections, and insurance claims from a unified ledger.
                  </li>
                  <li>
                    <strong>Fast Context Switching:</strong> Use the row action &quot;Switch to Branch Workspace&quot; to change your active clinic location context with one click.
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

