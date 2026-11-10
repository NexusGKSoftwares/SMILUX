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
  Calendar01Icon,
  BubbleChatIcon,
  PencilEdit01Icon,
  Delete02Icon,
  Search01Icon,
  FilterHorizontalIcon,
  Settings02Icon,
  Idea01Icon,
  EyeIcon,
  PrinterIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Clock01Icon,
  CreditCardIcon,
  Coins01Icon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Patient Invoices ───────────────────────────
const INITIAL_INVOICES = [
  {
    id: 'INV-2026-0842',
    date: '09 Nov 2026',
    dueDate: '16 Nov 2026',
    patientId: 'PAT-1082',
    patientName: 'Wanjiku Kamau',
    phone: '+254 712 345 678',
    treatment: 'Molar Root Canal (Tooth #36) & Core Build-up',
    billingType: 'SHA Co-Pay',
    totalAmount: 18500,
    paidAmount: 18500,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00842-2026',
  },
  {
    id: 'INV-2026-0841',
    date: '09 Nov 2026',
    dueDate: '23 Nov 2026',
    patientId: 'PAT-1081',
    patientName: 'Brian Omondi',
    phone: '+254 722 987 654',
    treatment: 'Class II MO Composite Filling (#14) & Polishing',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 6500,
    paidAmount: 2000,
    balance: 4500,
    status: 'Partially Paid',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00841-2026',
  },
  {
    id: 'INV-2026-0840',
    date: '08 Nov 2026',
    dueDate: '08 Nov 2026',
    patientId: 'PAT-1080',
    patientName: 'Mercy Njeri',
    phone: '+254 733 112 233',
    treatment: 'Full Mouth Scaling & Subgingival Root Planing',
    billingType: 'Self-Pay (Cash)',
    totalAmount: 5000,
    paidAmount: 5000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Cash',
    etimsNumber: 'ETIMS-00840-2026',
  },
  {
    id: 'INV-2026-0839',
    date: '08 Nov 2026',
    dueDate: '15 Nov 2026',
    patientId: 'PAT-1079',
    patientName: 'Kevin Mutua',
    phone: '+254 701 445 566',
    treatment: 'Surgical Extraction of Impacted Wisdom Tooth (#48)',
    billingType: 'Corporate (Britam)',
    totalAmount: 22000,
    paidAmount: 0,
    balance: 22000,
    status: 'Unpaid',
    paymentMethod: 'Insurance Claim',
    etimsNumber: 'ETIMS-00839-2026',
  },
  {
    id: 'INV-2026-0838',
    date: '07 Nov 2026',
    dueDate: '14 Nov 2026',
    patientId: 'PAT-1078',
    patientName: 'Grace Chebet',
    phone: '+254 718 778 899',
    treatment: 'Direct Composite Veneering Diastema Closure (#11, #21)',
    billingType: 'SHA Direct',
    totalAmount: 14000,
    paidAmount: 14000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'SHA EFT',
    etimsNumber: 'ETIMS-00838-2026',
  },
  {
    id: 'INV-2026-0837',
    date: '07 Nov 2026',
    dueDate: '21 Nov 2026',
    patientId: 'PAT-1077',
    patientName: 'David Kipkorir',
    phone: '+254 720 334 455',
    treatment: 'Zirconia Crown Placement & Fiber Post (#21)',
    billingType: 'Corporate (Old Mutual)',
    totalAmount: 28000,
    paidAmount: 20000,
    balance: 8000,
    status: 'Partially Paid',
    paymentMethod: 'Insurance + M-Pesa',
    etimsNumber: 'ETIMS-00837-2026',
  },
  {
    id: 'INV-2026-0836',
    date: '06 Nov 2026',
    dueDate: '06 Nov 2026',
    patientId: 'PAT-1076',
    patientName: 'Amina Mohammed',
    phone: '+254 734 556 677',
    treatment: 'Pediatric Pulpotomy & Stainless Steel Crown (#54)',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 8500,
    paidAmount: 8500,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00836-2026',
  },
  {
    id: 'INV-2026-0835',
    date: '06 Nov 2026',
    dueDate: '20 Nov 2026',
    patientId: 'PAT-1075',
    patientName: 'Faith Mwangi',
    phone: '+254 711 223 344',
    treatment: 'Comprehensive Orthodontic Braces (Monthly Installment #04)',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 15000,
    paidAmount: 0,
    balance: 15000,
    status: 'Unpaid',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00835-2026',
  },
  {
    id: 'INV-2026-0834',
    date: '05 Nov 2026',
    dueDate: '12 Nov 2026',
    patientId: 'PAT-1074',
    patientName: 'Hassan Abdi',
    phone: '+254 723 445 566',
    treatment: 'Emergency Pulpectomy & Intracanal Medication (#46)',
    billingType: 'Corporate (CIC)',
    totalAmount: 9500,
    paidAmount: 9500,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Insurance Claim',
    etimsNumber: 'ETIMS-00834-2026',
  },
  {
    id: 'INV-2026-0833',
    date: '04 Nov 2026',
    dueDate: '28 Oct 2026', // Overdue
    patientId: 'PAT-1073',
    patientName: 'Yvonne Wambui',
    phone: '+254 799 887 766',
    treatment: 'Connective Tissue Graft Periodontal Surgery',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 32000,
    paidAmount: 20000,
    balance: 12000,
    status: 'Overdue',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00833-2026',
  },
  {
    id: 'INV-2026-0832',
    date: '04 Nov 2026',
    dueDate: '18 Nov 2026',
    patientId: 'PAT-1072',
    patientName: 'Peter Njoroge',
    phone: '+254 700 112 233',
    treatment: 'Complete Full Denture Fabrication (Upper & Lower)',
    billingType: 'SHA Senior Cover',
    totalAmount: 35000,
    paidAmount: 35000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'SHA EFT',
    etimsNumber: 'ETIMS-00832-2026',
  },
  {
    id: 'INV-2026-0831',
    date: '03 Nov 2026',
    dueDate: '10 Nov 2026',
    patientId: 'PAT-1071',
    patientName: 'Sharon Akoth',
    phone: '+254 740 556 677',
    treatment: 'Invisalign Clear Aligners (Batch Trays #05-#08)',
    billingType: 'Self-Pay (Card)',
    totalAmount: 45000,
    paidAmount: 45000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Visa / Mastercard',
    etimsNumber: 'ETIMS-00831-2026',
  },
  {
    id: 'INV-2026-0830',
    date: '02 Nov 2026',
    dueDate: '25 Oct 2026', // Overdue
    patientId: 'PAT-1070',
    patientName: 'Samuel Gitau',
    phone: '+254 721 333 444',
    treatment: 'Surgical Root Tip Retrieval & Bio-Oss Bone Graft (#16)',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 18000,
    paidAmount: 5000,
    balance: 13000,
    status: 'Overdue',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00830-2026',
  },
  {
    id: 'INV-2026-0829',
    date: '02 Nov 2026',
    dueDate: '09 Nov 2026',
    patientId: 'PAT-1069',
    patientName: 'Esther Moraa',
    phone: '+254 733 444 555',
    treatment: 'Class V Composite Filling (#24) & Occlusal Splint',
    billingType: 'Corporate (AAR)',
    totalAmount: 11000,
    paidAmount: 11000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Insurance Claim',
    etimsNumber: 'ETIMS-00829-2026',
  },
  {
    id: 'INV-2026-0828',
    date: '01 Nov 2026',
    dueDate: '15 Nov 2026',
    patientId: 'PAT-1068',
    patientName: 'Francis Kiprop',
    phone: '+254 710 555 666',
    treatment: 'Occlusal Composite Restoration (#37) & Sealant',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: 4500,
    paidAmount: 4500,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'M-Pesa STK',
    etimsNumber: 'ETIMS-00828-2026',
  },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStkModalOpen, setIsStkModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [stkTargetInvoice, setStkTargetInvoice] = useState(null);
  const [stkPhoneNumber, setStkPhoneNumber] = useState('');
  const [stkLoading, setStkLoading] = useState(false);

  // New Invoice Form state
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    patientName: '',
    patientId: 'PAT-1083',
    phone: '+254 712 000 111',
    treatment: '',
    billingType: 'Self-Pay (M-Pesa)',
    totalAmount: '',
    paidAmount: '0',
    dueDate: '16 Nov 2026',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: invoices.length,
      unpaid: invoices.filter((i) => i.status === 'Unpaid').length,
      partial: invoices.filter((i) => i.status === 'Partially Paid').length,
      paid: invoices.filter((i) => i.status === 'Paid').length,
      overdue: invoices.filter((i) => i.status === 'Overdue').length,
      sha: invoices.filter((i) => i.billingType.includes('SHA') || i.billingType.includes('Corporate')).length,
    };
  }, [invoices]);

  const tabs = [
    { id: 'all', label: 'All Invoices', count: tabCounts.all },
    { id: 'unpaid', label: 'Unpaid / Due', count: tabCounts.unpaid },
    { id: 'partial', label: 'Partially Paid', count: tabCounts.partial },
    { id: 'paid', label: 'Paid in Full', count: tabCounts.paid },
    { id: 'overdue', label: 'Overdue', count: tabCounts.overdue },
    { id: 'sha', label: 'Insurance & SHA', count: tabCounts.sha },
  ];

  // Tab filtered invoices
  const filteredInvoices = useMemo(() => {
    let result = invoices;
    if (activeTab === 'unpaid') result = invoices.filter((i) => i.status === 'Unpaid');
    else if (activeTab === 'partial') result = invoices.filter((i) => i.status === 'Partially Paid');
    else if (activeTab === 'paid') result = invoices.filter((i) => i.status === 'Paid');
    else if (activeTab === 'overdue') result = invoices.filter((i) => i.status === 'Overdue');
    else if (activeTab === 'sha')
      result = invoices.filter((i) => i.billingType.includes('SHA') || i.billingType.includes('Corporate'));

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.patientName.toLowerCase().includes(q) ||
          i.patientId.toLowerCase().includes(q) ||
          i.treatment.toLowerCase().includes(q) ||
          i.phone.toLowerCase().includes(q)
      );
    }

    return result;
  }, [invoices, activeTab, searchTerm]);

  // Create invoice handler
  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!newInvoiceForm.patientName || !newInvoiceForm.treatment || !newInvoiceForm.totalAmount) {
      alert('Please fill in patient name, treatment, and total amount.');
      return;
    }

    const total = parseFloat(newInvoiceForm.totalAmount) || 0;
    const paid = parseFloat(newInvoiceForm.paidAmount) || 0;
    const balance = Math.max(0, total - paid);

    let status = 'Unpaid';
    if (paid >= total) status = 'Paid';
    else if (paid > 0) status = 'Partially Paid';

    const newInvoice = {
      id: `INV-2026-${String(invoices.length + 845).padStart(4, '0')}`,
      date: 'Today',
      dueDate: newInvoiceForm.dueDate || '16 Nov 2026',
      patientId: newInvoiceForm.patientId,
      patientName: newInvoiceForm.patientName,
      phone: newInvoiceForm.phone,
      treatment: newInvoiceForm.treatment,
      billingType: newInvoiceForm.billingType,
      totalAmount: total,
      paidAmount: paid,
      balance: balance,
      status: status,
      paymentMethod: paid > 0 ? 'M-Pesa' : 'Pending',
      etimsNumber: `ETIMS-00${invoices.length + 845}-2026`,
    };

    setInvoices([newInvoice, ...invoices]);
    setIsCreateModalOpen(false);
    setNewInvoiceForm({
      patientName: '',
      patientId: 'PAT-1083',
      phone: '+254 712 000 111',
      treatment: '',
      billingType: 'Self-Pay (M-Pesa)',
      totalAmount: '',
      paidAmount: '0',
      dueDate: '16 Nov 2026',
    });
  };

  // M-Pesa STK Push handler
  const handleTriggerStk = (invoice) => {
    setStkTargetInvoice(invoice);
    setStkPhoneNumber(invoice.phone || '0712345678');
    setIsStkModalOpen(true);
  };

  const handleExecuteStkPush = (e) => {
    e.preventDefault();
    setStkLoading(true);
    setTimeout(() => {
      setStkLoading(false);
      setIsStkModalOpen(false);
      alert(
        `M-Pesa STK Push prompted successfully to ${stkPhoneNumber} for KES ${stkTargetInvoice.balance.toLocaleString()}! Awaiting patient PIN verification.`
      );
    }, 1200);
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Invoices CSV',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Invoices CSV / Excel wizard opened'),
    },
    {
      id: 'add-multiple',
      label: 'Add Multiple Invoices',
      onClick: () => alert('Batch Invoice Creation Mode activated'),
    },
    {
      id: 'manage-etims',
      label: 'Manage eTIMS Tax Profiles',
      onClick: () => alert('Opening KRA eTIMS Integration & Tax Settings'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'Invoice # & Date',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter invoice #...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={Invoice01Icon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Issued: {row.date}
            </span>
          </div>
        ),
      },
      {
        key: 'patientName',
        title: 'Patient Name & Phone',
        minWidth: '210px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter patient...',
        render: (val, row) => (
          <div className="flex items-center gap-2 py-0.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
              {row.patientName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate hover:text-emerald-700 cursor-pointer">
                {row.patientName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {row.phone} • {row.patientId}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'treatment',
        title: 'Treatment / Procedure',
        minWidth: '240px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter treatment...',
        render: (val) => (
          <span className="text-xs text-slate-700 dark:text-slate-200 font-medium truncate block">
            {val}
          </span>
        ),
      },
      {
        key: 'billingType',
        title: 'Billing Type',
        minWidth: '160px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Self-Pay (M-Pesa)',
          'Self-Pay (Cash)',
          'SHA Co-Pay',
          'SHA Direct',
          'Corporate (Britam)',
          'Corporate (Old Mutual)',
          'Corporate (CIC)',
          'Corporate (AAR)',
        ],
        render: (val) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {val}
          </span>
        ),
      },
      {
        key: 'totalAmount',
        title: 'Total (KES)',
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
        key: 'paidAmount',
        title: 'Paid (KES)',
        minWidth: '120px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'balance',
        title: 'Balance (KES)',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span
            className={`text-xs font-bold font-mono ${val > 0
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-slate-400 dark:text-slate-500'
              }`}
          >
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: ['Paid', 'Partially Paid', 'Unpaid', 'Overdue'],
        render: (val) => {
          const style = {
            Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'Partially Paid':
              'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            Unpaid: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200',
            Overdue: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${val === 'Paid'
                  ? 'bg-emerald-500'
                  : val === 'Partially Paid'
                    ? 'bg-amber-500'
                    : val === 'Overdue'
                      ? 'bg-rose-500'
                      : 'bg-slate-400'
                  }`}
              />
              {val}
            </span>
          );
        },
      },
      {
        key: 'dueDate',
        title: 'Due Date',
        minWidth: '120px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span
            className={`text-xs ${row.status === 'Overdue'
              ? 'text-rose-600 font-bold'
              : 'text-slate-600 dark:text-slate-300'
              }`}
          >
            {val}
          </span>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        minWidth: '90px',
        width: '90px',
        sortable: false,
        filterable: false,
        sticky: 'right',
        render: (val, row) => (
          <div className="flex items-center justify-center gap-1">
            {row.balance > 0 && (
              <button
                type="button"
                title="Send M-Pesa STK Push prompt"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTriggerStk(row);
                }}
                className="p-1 rounded text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={SmartPhone01Icon} size={14} />
              </button>
            )}

            <RowActionDropdown
              title={`Invoice ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Detailed Invoice',
                  icon: EyeIcon,
                  onClick: () => setViewingInvoice(row),
                },
                ...(row.balance > 0
                  ? [
                    {
                      id: 'stk',
                      label: 'Send M-Pesa STK Push',
                      icon: SmartPhone01Icon,
                      onClick: () => handleTriggerStk(row),
                    },
                  ]
                  : []),
                {
                  id: 'print',
                  label: 'Print Invoice (eTIMS PDF)',
                  icon: PrinterIcon,
                  onClick: () => alert(`Generating KRA eTIMS PDF for ${row.id}...`),
                },
                {
                  id: 'sms',
                  label: 'Send WhatsApp Payment Link',
                  icon: BubbleChatIcon,
                  onClick: () => alert(`Payment reminder link dispatched to ${row.phone}`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'edit',
                  label: 'Edit Invoice Items',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing Invoice ${row.id}`),
                },
                {
                  id: 'delete',
                  label: 'Void / Cancel Invoice',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Are you sure you want to void invoice ${row.id}?`)) {
                      setInvoices((prev) => prev.filter((i) => i.id !== row.id));
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
    <div className=" bg-slate-50/40 dark:bg-slate-950 font-sans mb-6">
      {/* ─── 1. Page Header (Exact composition matching Patients page) ────── */}
      <PageHeader
        title="Invoices"
        badge={`${tabCounts.all} Files`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about dental billing codes, KRA eTIMS compliance, and M-Pesa STK push"
        moreActions={headerMoreActions}
        addLabel="Create Invoice"
        onAdd={() => setIsCreateModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        // Toolbar props (Row 3)
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search invoices, patient, phone, treatment..."
        filterPills={[
          {
            id: 'status',
            label: 'Payment Status',
            onClick: () => alert('Quick Filter: Payment Status selected'),
          },
          {
            id: 'billing',
            label: 'Billing Scheme',
            onClick: () => alert('Quick Filter: Billing Scheme selected'),
          },
          {
            id: 'dateRange',
            label: 'Due Date',
            onClick: () => alert('Quick Filter: Due Date selected'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Financial Filters drawer opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('Invoice View Preferences & Tax Settings'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div>
        <DataTable
          title="Invoices"
          data={filteredInvoices}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedInvoiceIds}
          onSelectionChange={setSelectedInvoiceIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingInvoice(row)}
        />
      </div>

      {/* ─── 3. Create Invoice Modal ────────────────────────────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Create New Invoice
                  </h3>
                  <p className="text-xs text-slate-500">
                    KRA eTIMS compliant dental patient billing
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Omondi"
                    value={newInvoiceForm.patientName}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, patientName: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone (for M-Pesa STK) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0712345678"
                    value={newInvoiceForm.phone}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, phone: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Treatment / Line Item Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Molar Root Canal (#36) & Core Build-up"
                  value={newInvoiceForm.treatment}
                  onChange={(e) =>
                    setNewInvoiceForm({ ...newInvoiceForm, treatment: e.target.value })
                  }
                  className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Billing Type / Scheme
                  </label>
                  <select
                    value={newInvoiceForm.billingType}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, billingType: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Self-Pay (M-Pesa)">Self-Pay (M-Pesa)</option>
                    <option value="Self-Pay (Cash)">Self-Pay (Cash)</option>
                    <option value="SHA Co-Pay">SHA Co-Pay</option>
                    <option value="SHA Direct">SHA Direct</option>
                    <option value="Corporate (AAR)">Corporate (AAR)</option>
                    <option value="Corporate (Britam)">Corporate (Britam)</option>
                    <option value="Corporate (Old Mutual)">Corporate (Old Mutual)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    placeholder="16 Nov 2026"
                    value={newInvoiceForm.dueDate}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, dueDate: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Amount (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newInvoiceForm.totalAmount}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, totalAmount: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Initial Deposit / Paid (KES)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newInvoiceForm.paidAmount}
                    onChange={(e) =>
                      setNewInvoiceForm({ ...newInvoiceForm, paidAmount: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded text-white bg-[#027A48] hover:bg-[#02683E] shadow-xs transition-colors cursor-pointer"
                >
                  Save & Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. M-Pesa STK Push Dialog ─────────────────────────────────────── */}
      {isStkModalOpen && stkTargetInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={SmartPhone01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Safaricom M-Pesa STK Push
                  </h3>
                  <p className="text-xs text-slate-500">{stkTargetInvoice.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsStkModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleExecuteStkPush} className="p-6 space-y-4">
              <div className="p-3 rounded bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {stkTargetInvoice.patientName}
                  </span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-500">Outstanding Balance:</span>
                  <span className="font-bold text-rose-600 font-mono">
                    KES {stkTargetInvoice.balance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  M-Pesa Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="0712345678"
                  value={stkPhoneNumber}
                  onChange={(e) => setStkPhoneNumber(e.target.value)}
                  className="w-full text-xs font-mono rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  A PIN entry prompt will pop up immediately on the patient&apos;s phone.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStkModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold rounded text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={stkLoading}
                  className="px-4 py-2 text-xs font-semibold rounded text-white bg-[#027A48] hover:bg-[#02683E] flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {stkLoading ? (
                    <span>Sending prompt...</span>
                  ) : (
                    <>
                      <HugeiconsIcon icon={SmartPhone01Icon} size={15} />
                      <span>Send STK Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 5. View Invoice Detail Modal ───────────────────────────────────── */}
      {viewingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={Invoice01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingInvoice.id}
                  </h3>
                  <p className="text-xs text-slate-500">{viewingInvoice.etimsNumber}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingInvoice(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Billed To</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{viewingInvoice.patientName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{viewingInvoice.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Payment Scheme</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{viewingInvoice.billingType}</p>
                  <p className="text-[10px] text-slate-500">Due: {viewingInvoice.dueDate}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Item Description</span>
                <p className="font-semibold text-slate-800 dark:text-slate-100 mt-1">{viewingInvoice.treatment}</p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal Amount:</span>
                  <span className="font-mono font-semibold">KES {viewingInvoice.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Amount Paid to Date:</span>
                  <span className="font-mono font-semibold">KES {viewingInvoice.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-2">
                  <span>Outstanding Balance:</span>
                  <span className="font-mono text-rose-600">KES {viewingInvoice.balance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500">
                Status: <strong className="text-slate-700 dark:text-slate-300">{viewingInvoice.status}</strong>
              </span>
              <button
                type="button"
                onClick={() => setViewingInvoice(null)}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. Learn Modal ─────────────────────────────────────────────────── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  <HugeiconsIcon icon={Idea01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dental Invoicing & Billing Guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    KRA eTIMS, M-Pesa STK Push, and insurance co-pay standards
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  Safaricom M-Pesa STK Push Integration
                </h4>
                <p className="leading-relaxed">
                  Trigger instant payment requests directly to a patient&apos;s Safaricom phone. Once the patient inputs their M-Pesa PIN, payment is verified in real-time, auto-clearing the invoice balance.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  KRA eTIMS Electronic Tax Invoicing
                </h4>
                <p className="leading-relaxed">
                  Every issued invoice carries an immutable eTIMS fiscal control number. VAT-exempt medical supplies and standard rated consumables are segregated automatically.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Insurance Co-Payment Rules
                </h4>
                <p className="leading-relaxed">
                  For claims under the Social Health Authority (SHA) or private insurers, the invoice reflects the gross procedure tariff, approved payer remittance, and remaining patient co-payment.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
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

