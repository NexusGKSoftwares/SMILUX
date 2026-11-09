import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  Invoice01Icon,
  MoreHorizontalIcon,
  Cancel01Icon,
  PlusSignIcon,
  Doc01Icon,
  BubbleChatIcon,
  PencilEdit01Icon,
  Delete02Icon,
  Idea01Icon,
  EyeIcon,
  PrinterIcon,
  CheckmarkCircle01Icon,
  DentalToothIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Insurance & Kenya SHA Dental Claims ───────────────
const INITIAL_CLAIMS = [
  {
    id: 'CLM-2026-0428',
    date: '09 Nov 2026',
    patientId: 'PAT-1082',
    patientName: 'Wanjiku Kamau',
    memberNo: 'SHA-88920144',
    payer: 'Kenya SHA (Civil Servants)',
    schemeType: 'SHA',
    preAuthCode: 'AUTH-SHA-90412',
    procedure: 'Molar Root Canal Obturation (#36)',
    icd10: 'K04.0 (Irreversible Pulpitis)',
    claimedAmount: 18500,
    approvedAmount: 17000,
    coPay: 1500,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0427',
    date: '09 Nov 2026',
    patientId: 'PAT-1081',
    patientName: 'Brian Omondi',
    memberNo: 'AAR-CORP-44120',
    payer: 'AAR Healthcare',
    schemeType: 'Private',
    preAuthCode: 'Exempt (< KES 10k)',
    procedure: 'Class II MO Composite Filling (#14)',
    icd10: 'K02.1 (Dentin Caries)',
    claimedAmount: 6500,
    approvedAmount: 6500,
    coPay: 0,
    status: 'Under Review',
  },
  {
    id: 'CLM-2026-0426',
    date: '08 Nov 2026',
    patientId: 'PAT-1079',
    patientName: 'Kevin Mutua',
    memberNo: 'BRT-7731902',
    payer: 'Britam Dental',
    schemeType: 'Private',
    preAuthCode: 'AUTH-BRT-33190',
    procedure: 'Surgical Extraction Impacted Wisdom Tooth (#48)',
    icd10: 'K01.1 (Impacted Teeth)',
    claimedAmount: 22000,
    approvedAmount: 20000,
    coPay: 2000,
    status: 'Pre-Authorized',
  },
  {
    id: 'CLM-2026-0425',
    date: '07 Nov 2026',
    patientId: 'PAT-1078',
    patientName: 'Grace Chebet',
    memberNo: 'SHA-66510928',
    payer: 'Kenya SHA Direct',
    schemeType: 'SHA',
    preAuthCode: 'AUTH-SHA-88103',
    procedure: 'Direct Composite Veneering (#11, #21)',
    icd10: 'K00.4 (Enamel Hypoplasia)',
    claimedAmount: 14000,
    approvedAmount: 14000,
    coPay: 0,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0424',
    date: '07 Nov 2026',
    patientId: 'PAT-1077',
    patientName: 'David Kipkorir',
    memberNo: 'OM-9920183',
    payer: 'Old Mutual Health',
    schemeType: 'Private',
    preAuthCode: 'AUTH-OM-55129',
    procedure: 'Full Zirconia Crown & Fiber Post (#21)',
    icd10: 'K08.8 (Loss of Coronal Tooth Structure)',
    claimedAmount: 28000,
    approvedAmount: 20000,
    coPay: 8000,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0423',
    date: '06 Nov 2026',
    patientId: 'PAT-1075',
    patientName: 'Faith Mwangi',
    memberNo: 'JUB-ALL-11092',
    payer: 'Jubilee Allianz',
    schemeType: 'Private',
    preAuthCode: 'AUTH-JUB-77412',
    procedure: 'Ceramic Veneers & Orthodontic Alignment',
    icd10: 'K07.3 (Anomalies of Tooth Position)',
    claimedAmount: 35000,
    approvedAmount: 0,
    coPay: 35000,
    status: 'Queried',
  },
  {
    id: 'CLM-2026-0422',
    date: '05 Nov 2026',
    patientId: 'PAT-1074',
    patientName: 'Hassan Abdi',
    memberNo: 'CIC-MED-55910',
    payer: 'CIC Dental Care',
    schemeType: 'Private',
    preAuthCode: 'Exempt (Emergency)',
    procedure: 'Emergency Pulpectomy & Drainage (#46)',
    icd10: 'K04.7 (Periapical Abscess)',
    claimedAmount: 9500,
    approvedAmount: 9500,
    coPay: 0,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0421',
    date: '04 Nov 2026',
    patientId: 'PAT-1072',
    patientName: 'Peter Njoroge',
    memberNo: 'SHA-SEN-102938',
    payer: 'Kenya SHA Senior Scheme',
    schemeType: 'SHA',
    preAuthCode: 'AUTH-SHA-76521',
    procedure: 'Complete Bimaxillary Acrylic Dentures',
    icd10: 'K08.1 (Complete Edentulism)',
    claimedAmount: 35000,
    approvedAmount: 35000,
    coPay: 0,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0420',
    date: '03 Nov 2026',
    patientId: 'PAT-1071',
    patientName: 'Sharon Akoth',
    memberNo: 'AAR-GOLD-88310',
    payer: 'AAR Healthcare',
    schemeType: 'Private',
    preAuthCode: 'AUTH-AAR-11209',
    procedure: 'Clear Aligner Therapy (Cosmetic)',
    icd10: 'K07.2 (Malocclusion)',
    claimedAmount: 45000,
    approvedAmount: 0,
    coPay: 45000,
    status: 'Rejected',
  },
  {
    id: 'CLM-2026-0419',
    date: '02 Nov 2026',
    patientId: 'PAT-1069',
    patientName: 'Esther Moraa',
    memberNo: 'AAR-CORP-33108',
    payer: 'AAR Healthcare',
    schemeType: 'Private',
    preAuthCode: 'AUTH-AAR-10984',
    procedure: 'Class V Composite & Bruxism Nightguard',
    icd10: 'K03.6 (Cervical Abrasion)',
    claimedAmount: 11000,
    approvedAmount: 11000,
    coPay: 0,
    status: 'Approved & Paid',
  },
  {
    id: 'CLM-2026-0418',
    date: '01 Nov 2026',
    patientId: 'PAT-1066',
    patientName: 'Daniel Mutiso',
    memberNo: 'SHA-33910421',
    payer: 'Kenya SHA Direct',
    schemeType: 'SHA',
    preAuthCode: 'AUTH-SHA-61902',
    procedure: 'Periodontal Flap Surgery & Scaling',
    icd10: 'K05.3 (Chronic Periodontitis)',
    claimedAmount: 16500,
    approvedAmount: 15000,
    coPay: 1500,
    status: 'Under Review',
  },
];

export default function Insurance() {
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [selectedClaimIds, setSelectedClaimIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingClaim, setViewingClaim] = useState(null);

  // New Claim Form
  const [claimForm, setClaimForm] = useState({
    patientName: '',
    memberNo: '',
    payer: 'Kenya SHA Direct',
    preAuthCode: '',
    procedure: '',
    icd10: 'K02.1 (Dentin Caries)',
    claimedAmount: '',
    coPay: '0',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: claims.length,
      sha: claims.filter((c) => c.schemeType === 'SHA').length,
      private: claims.filter((c) => c.schemeType === 'Private').length,
      approved: claims.filter((c) => c.status === 'Approved & Paid').length,
      pending: claims.filter((c) => c.status === 'Pre-Authorized' || c.status === 'Under Review').length,
      queried: claims.filter((c) => c.status === 'Queried' || c.status === 'Rejected').length,
    };
  }, [claims]);

  const tabs = [
    { id: 'all', label: 'All Claims', count: tabCounts.all },
    { id: 'sha', label: 'Kenya SHA Direct', count: tabCounts.sha },
    { id: 'private', label: 'Private Insurers', count: tabCounts.private },
    { id: 'approved', label: 'Approved & Paid', count: tabCounts.approved },
    { id: 'pending', label: 'Pending / Pre-Auth', count: tabCounts.pending },
    { id: 'queried', label: 'Queried / Rejected', count: tabCounts.queried },
  ];

  // Filtered claims
  const filteredClaims = useMemo(() => {
    let result = claims;
    if (activeTab === 'sha') result = claims.filter((c) => c.schemeType === 'SHA');
    else if (activeTab === 'private') result = claims.filter((c) => c.schemeType === 'Private');
    else if (activeTab === 'approved') result = claims.filter((c) => c.status === 'Approved & Paid');
    else if (activeTab === 'pending')
      result = claims.filter((c) => c.status === 'Pre-Authorized' || c.status === 'Under Review');
    else if (activeTab === 'queried')
      result = claims.filter((c) => c.status === 'Queried' || c.status === 'Rejected');

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.patientName.toLowerCase().includes(q) ||
          c.memberNo.toLowerCase().includes(q) ||
          c.payer.toLowerCase().includes(q) ||
          c.procedure.toLowerCase().includes(q) ||
          c.preAuthCode.toLowerCase().includes(q)
      );
    }

    return result;
  }, [claims, activeTab, searchTerm]);

  // Create Claim handler
  const handleCreateClaim = (e) => {
    e.preventDefault();
    if (!claimForm.patientName || !claimForm.memberNo || !claimForm.claimedAmount) {
      alert('Please fill in Patient Name, Member Number, and Claimed Amount.');
      return;
    }

    const claimed = parseFloat(claimForm.claimedAmount) || 0;
    const copay = parseFloat(claimForm.coPay) || 0;
    const isSha = claimForm.payer.includes('SHA');

    const newClaim = {
      id: `CLM-2026-${String(claims.length + 430).padStart(4, '0')}`,
      date: 'Today',
      patientId: 'PAT-1083',
      patientName: claimForm.patientName,
      memberNo: claimForm.memberNo.toUpperCase(),
      payer: claimForm.payer,
      schemeType: isSha ? 'SHA' : 'Private',
      preAuthCode: claimForm.preAuthCode || `AUTH-${Math.floor(10000 + Math.random() * 89999)}`,
      procedure: claimForm.procedure || 'General Dental Procedure',
      icd10: claimForm.icd10,
      claimedAmount: claimed,
      approvedAmount: Math.max(0, claimed - copay),
      coPay: copay,
      status: 'Under Review',
    };

    setClaims([newClaim, ...claims]);
    setIsNewClaimModalOpen(false);
    setClaimForm({
      patientName: '',
      memberNo: '',
      payer: 'Kenya SHA Direct',
      preAuthCode: '',
      procedure: '',
      icd10: 'K02.1 (Dentin Caries)',
      claimedAmount: '',
      coPay: '0',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import SHA / Claims Batch',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import SHA / Smart Applications Claims Batch opened'),
    },
    {
      id: 'remittance',
      label: 'Upload Remittance Advice',
      onClick: () => alert('Batch Insurance Remittance Reconciliation opened'),
    },
    {
      id: 'tariffs',
      label: 'Manage Payer Tariffs & SLA',
      onClick: () => alert('Opening SHA & Corporate Dental Tariff Schedule'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'Claim # & Date',
        minWidth: '175px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter claim #...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={Doc01Icon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Submitted: {row.date}
            </span>
          </div>
        ),
      },
      {
        key: 'patientName',
        title: 'Patient & Member No.',
        minWidth: '210px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter member...',
        render: (val, row) => (
          <div className="flex items-center gap-2 py-0.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
              {row.patientName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                {row.patientName}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {row.memberNo}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'payer',
        title: 'Insurance Payer / Scheme',
        minWidth: '195px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Kenya SHA (Civil Servants)',
          'Kenya SHA Direct',
          'Kenya SHA Senior Scheme',
          'AAR Healthcare',
          'Britam Dental',
          'Old Mutual Health',
          'Jubilee Allianz',
          'CIC Dental Care',
        ],
        render: (val, row) => (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${row.schemeType === 'SHA'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300'
              }`}
          >
            {val}
          </span>
        ),
      },
      {
        key: 'preAuthCode',
        title: 'Pre-Auth Ref',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'AUTH-...',
        render: (val) => (
          <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
            {val}
          </span>
        ),
      },
      {
        key: 'procedure',
        title: 'Procedure & ICD-10 Dx',
        minWidth: '240px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter procedure...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
              {val}
            </span>
            <span className="text-[10px] text-slate-500 font-mono truncate">
              ICD-10: {row.icd10}
            </span>
          </div>
        ),
      },
      {
        key: 'claimedAmount',
        title: 'Claimed (KES)',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'approvedAmount',
        title: 'Approved (KES)',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'coPay',
        title: 'Co-Pay (KES)',
        minWidth: '120px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Approved & Paid',
          'Pre-Authorized',
          'Under Review',
          'Queried',
          'Rejected',
        ],
        render: (val) => {
          const style = {
            'Approved & Paid':
              'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'Pre-Authorized':
              'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            'Under Review':
              'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            Queried:
              'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300',
            Rejected:
              'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${val === 'Approved & Paid'
                    ? 'bg-emerald-500'
                    : val === 'Pre-Authorized'
                      ? 'bg-blue-500'
                      : val === 'Under Review'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                  }`}
              />
              {val}
            </span>
          );
        },
      },
      {
        key: 'actions',
        title: 'Actions',
        minWidth: '80px',
        width: '80px',
        sortable: false,
        filterable: false,
        sticky: 'right',
        render: (val, row) => (
          <div className="flex items-center justify-center">
            <RowActionDropdown
              title={`Claim ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Claim Dossier',
                  icon: EyeIcon,
                  onClick: () => setViewingClaim(row),
                },
                {
                  id: 'form',
                  label: 'Download SHA / Claim Form',
                  icon: PrinterIcon,
                  onClick: () => alert(`Downloading Claim Form for ${row.id}...`),
                },
                {
                  id: 'appeal',
                  label: 'Submit Pre-Auth / Query Appeal',
                  icon: Doc01Icon,
                  onClick: () => alert(`Opening Clinical Appeal Attachment portal for ${row.id}`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'delete',
                  label: 'Withdraw / Void Claim',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Are you sure you want to withdraw claim ${row.id}?`)) {
                      setClaims((prev) => prev.filter((c) => c.id !== row.id));
                    }
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
    <div className="min-h-screen bg-slate-50/40 dark:bg-slate-950 font-sans pb-12">
      {/* ─── 1. Page Header ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Insurance & SHA"
        badge={`${tabCounts.all} Claims`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about Kenya Social Health Authority (SHA) dental claims, Smart biometric validation, and pre-authorizations"
        moreActions={headerMoreActions}
        addLabel="New Claim / Pre-Auth"
        onAdd={() => setIsNewClaimModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search claim #, member #, patient, payer, pre-auth..."
        filterPills={[
          {
            id: 'payer',
            label: 'Payer / Insurer',
            onClick: () => alert('Quick Filter: Payer selected'),
          },
          {
            id: 'status',
            label: 'Claim Status',
            onClick: () => alert('Quick Filter: Claim Status selected'),
          },
          {
            id: 'scheme',
            label: 'Scheme Type',
            onClick: () => alert('Quick Filter: Scheme Type selected'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Claims Filter drawer opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('SHA Portal & EDI Integration Settings'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div className="px-4 sm:px-6 pt-4">
        <DataTable
          title="Insurance & SHA Claims"
          data={filteredClaims}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedClaimIds}
          onSelectionChange={setSelectedClaimIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingClaim(row)}
        />
      </div>

      {/* ─── 3. New Claim / Pre-Authorization Modal ─────────────────────────── */}
      {isNewClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Submit New Insurance / SHA Claim
                  </h3>
                  <p className="text-xs text-slate-500">
                    Validate member eligibility & submit ICD-10 coded dental claim
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewClaimModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateClaim} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanjiku Kamau"
                    value={claimForm.patientName}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, patientName: e.target.value })
                    }
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    SHA / Member Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SHA-88920144"
                    value={claimForm.memberNo}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, memberNo: e.target.value })
                    }
                    className="w-full text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Insurance Payer / Scheme
                  </label>
                  <select
                    value={claimForm.payer}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, payer: e.target.value })
                    }
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Kenya SHA Direct">Kenya SHA Direct</option>
                    <option value="Kenya SHA (Civil Servants)">Kenya SHA (Civil Servants)</option>
                    <option value="AAR Healthcare">AAR Healthcare</option>
                    <option value="Britam Dental">Britam Dental</option>
                    <option value="Jubilee Allianz">Jubilee Allianz</option>
                    <option value="Old Mutual Health">Old Mutual Health</option>
                    <option value="CIC Dental Care">CIC Dental Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pre-Authorization Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AUTH-SHA-90412"
                    value={claimForm.preAuthCode}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, preAuthCode: e.target.value })
                    }
                    className="w-full text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Claimed Dental Procedure *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Molar Root Canal Obturation (#36)"
                  value={claimForm.procedure}
                  onChange={(e) =>
                    setClaimForm({ ...claimForm, procedure: e.target.value })
                  }
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WHO ICD-10 Diagnosis Code
                </label>
                <select
                  value={claimForm.icd10}
                  onChange={(e) =>
                    setClaimForm({ ...claimForm, icd10: e.target.value })
                  }
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="K02.1 (Dentin Caries)">K02.1 — Caries of Dentin</option>
                  <option value="K04.0 (Irreversible Pulpitis)">K04.0 — Pulpitis (Root Canal)</option>
                  <option value="K04.7 (Periapical Abscess)">K04.7 — Periapical Abscess</option>
                  <option value="K01.1 (Impacted Teeth)">K01.1 — Impacted Wisdom Tooth</option>
                  <option value="K05.3 (Chronic Periodontitis)">K05.3 — Chronic Periodontitis</option>
                  <option value="K08.1 (Complete Edentulism)">K08.1 — Loss of Teeth (Prosthodontics)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Claimed Amount (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 18500"
                    value={claimForm.claimedAmount}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, claimedAmount: e.target.value })
                    }
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Co-Pay (KES)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={claimForm.coPay}
                    onChange={(e) =>
                      setClaimForm({ ...claimForm, coPay: e.target.value })
                    }
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewClaimModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-[#027A48] hover:bg-[#02683E] shadow-xs transition-colors cursor-pointer"
                >
                  Submit Electronic Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. View Claim Dossier Modal ────────────────────────────────────── */}
      {viewingClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={Doc01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingClaim.id}
                  </h3>
                  <p className="text-xs text-slate-500">{viewingClaim.payer}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingClaim(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Beneficiary</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{viewingClaim.patientName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{viewingClaim.memberNo}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Pre-Auth Code</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">{viewingClaim.preAuthCode}</p>
                  <p className="text-[10px] text-slate-500">{viewingClaim.date}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Procedure & ICD-10 Coding</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{viewingClaim.procedure}</p>
                <p className="text-slate-500 font-mono mt-0.5">{viewingClaim.icd10}</p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gross Claimed Tariff:</span>
                  <span className="font-mono font-bold">KES {viewingClaim.claimedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Approved Underwriter Payout:</span>
                  <span className="font-mono font-bold">KES {viewingClaim.approvedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-1.5">
                  <span>Patient Co-Pay Share:</span>
                  <span className="font-mono font-bold">KES {viewingClaim.coPay.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500">
                Status: <strong>{viewingClaim.status}</strong>
              </span>
              <button
                type="button"
                onClick={() => setViewingClaim(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Learn Modal ─────────────────────────────────────────────────── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  <HugeiconsIcon icon={Idea01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    SHA & Dental Claims Governance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Social Health Authority (SHA), Smart Biometrics & ICD-10 Coding
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  Kenya Social Health Authority (SHA) e-Claims
                </h4>
                <p className="leading-relaxed">
                  All SHA dental procedures require OTP/Biometric member verification and WHO ICD-10 diagnostic mapping prior to electronic claim submission.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Pre-Authorization Thresholds
                </h4>
                <p className="leading-relaxed">
                  Surgical extractions, endodontic root canals, crowns, and prosthodontic dentures require pre-authorization accompanied by pre-operative periapical or OPG radiographs.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Got it, thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
