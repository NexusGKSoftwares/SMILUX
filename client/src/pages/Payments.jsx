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
  SmartPhone01Icon,
  CreditCardIcon,
  Coins01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Payment Transactions ──────────────────────
const INITIAL_PAYMENTS = [
  {
    id: 'RCT-2026-1049',
    date: '09 Nov 2026, 10:14 AM',
    txnRef: 'SK9842M1PA',
    patientId: 'PAT-1082',
    patientName: 'Wanjiku Kamau',
    phone: '+254 712 345 678',
    invoiceId: 'INV-2026-0842',
    method: 'M-Pesa STK',
    amount: 18500,
    cashier: 'System Webhook',
    status: 'Verified',
    notes: 'Full payment for Molar Root Canal (#36)',
  },
  {
    id: 'RCT-2026-1048',
    date: '09 Nov 2026, 11:42 AM',
    txnRef: 'SK9901K4LB',
    patientId: 'PAT-1081',
    patientName: 'Brian Omondi',
    phone: '+254 722 987 654',
    invoiceId: 'INV-2026-0841',
    method: 'M-Pesa STK',
    amount: 2000,
    cashier: 'System Webhook',
    status: 'Verified',
    notes: 'Initial deposit for Class II MO Composite Filling',
  },
  {
    id: 'RCT-2026-1047',
    date: '08 Nov 2026, 02:35 PM',
    txnRef: 'CSH-00482',
    patientId: 'PAT-1080',
    patientName: 'Mercy Njeri',
    phone: '+254 733 112 233',
    invoiceId: 'INV-2026-0840',
    method: 'Cash',
    amount: 5000,
    cashier: 'Faith W. (Front Desk)',
    status: 'Reconciled',
    notes: 'Cash settlement for Full Mouth Scaling',
  },
  {
    id: 'RCT-2026-1046',
    date: '07 Nov 2026, 04:10 PM',
    txnRef: 'SHA-EFT-88291',
    patientId: 'PAT-1078',
    patientName: 'Grace Chebet',
    phone: '+254 718 778 899',
    invoiceId: 'INV-2026-0838',
    method: 'SHA Remittance',
    amount: 14000,
    cashier: 'SHA Clearinghouse',
    status: 'Reconciled',
    notes: 'Direct SHA batch remittance for composite veneering',
  },
  {
    id: 'RCT-2026-1045',
    date: '07 Nov 2026, 02:05 PM',
    txnRef: 'EFT-OM-77412',
    patientId: 'PAT-1077',
    patientName: 'David Kipkorir',
    phone: '+254 720 334 455',
    invoiceId: 'INV-2026-0837',
    method: 'Insurance EFT',
    amount: 20000,
    cashier: 'Old Mutual Claims',
    status: 'Verified',
    notes: 'Old Mutual corporate dental claim remittance',
  },
  {
    id: 'RCT-2026-1044',
    date: '06 Nov 2026, 11:50 AM',
    txnRef: 'SK6120P9RT',
    patientId: 'PAT-1076',
    patientName: 'Amina Mohammed',
    phone: '+254 734 556 677',
    invoiceId: 'INV-2026-0836',
    method: 'M-Pesa Till',
    amount: 8500,
    cashier: 'Faith W. (Front Desk)',
    status: 'Reconciled',
    notes: 'Buy Goods Till #542100 payment for Pediatric Crown',
  },
  {
    id: 'RCT-2026-1043',
    date: '05 Nov 2026, 10:20 AM',
    txnRef: 'EFT-CIC-90123',
    patientId: 'PAT-1074',
    patientName: 'Hassan Abdi',
    phone: '+254 723 445 566',
    invoiceId: 'INV-2026-0834',
    method: 'Insurance EFT',
    amount: 9500,
    cashier: 'CIC Insurance Group',
    status: 'Reconciled',
    notes: 'Emergency Pulpectomy claim settlement',
  },
  {
    id: 'RCT-2026-1042',
    date: '04 Nov 2026, 03:15 PM',
    txnRef: 'SK4490W3QX',
    patientId: 'PAT-1073',
    patientName: 'Yvonne Wambui',
    phone: '+254 799 887 766',
    invoiceId: 'INV-2026-0833',
    method: 'M-Pesa STK',
    amount: 20000,
    cashier: 'System Webhook',
    status: 'Verified',
    notes: 'Part payment for Connective Tissue Graft surgery',
  },
  {
    id: 'RCT-2026-1041',
    date: '04 Nov 2026, 01:00 PM',
    txnRef: 'SHA-EFT-88104',
    patientId: 'PAT-1072',
    patientName: 'Peter Njoroge',
    phone: '+254 700 112 233',
    invoiceId: 'INV-2026-0832',
    method: 'SHA Remittance',
    amount: 35000,
    cashier: 'SHA Clearinghouse',
    status: 'Reconciled',
    notes: 'SHA Senior Citizen Prosthodontic Cover settlement',
  },
  {
    id: 'RCT-2026-1040',
    date: '03 Nov 2026, 04:40 PM',
    txnRef: 'POS-VISA-4921',
    patientId: 'PAT-1071',
    patientName: 'Sharon Akoth',
    phone: '+254 740 556 677',
    invoiceId: 'INV-2026-0831',
    method: 'Visa / Mastercard',
    amount: 45000,
    cashier: 'Faith W. (Front Desk)',
    status: 'Reconciled',
    notes: 'PDQ Card swipe for Invisalign Clear Aligners',
  },
  {
    id: 'RCT-2026-1039',
    date: '02 Nov 2026, 10:30 AM',
    txnRef: 'SK2108N7CV',
    patientId: 'PAT-1070',
    patientName: 'Samuel Gitau',
    phone: '+254 721 333 444',
    invoiceId: 'INV-2026-0830',
    method: 'M-Pesa Till',
    amount: 5000,
    cashier: 'Faith W. (Front Desk)',
    status: 'Pending Verification',
    notes: 'Deposit for Bio-Oss socket preservation graft',
  },
  {
    id: 'RCT-2026-1038',
    date: '02 Nov 2026, 02:15 PM',
    txnRef: 'EFT-AAR-66519',
    patientId: 'PAT-1069',
    patientName: 'Esther Moraa',
    phone: '+254 733 444 555',
    invoiceId: 'INV-2026-0829',
    method: 'Insurance EFT',
    amount: 11000,
    cashier: 'AAR Healthcare',
    status: 'Reconciled',
    notes: 'AAR Outpatient Dental benefit payout',
  },
  {
    id: 'RCT-2026-1037',
    date: '01 Nov 2026, 12:05 PM',
    txnRef: 'SK1094B5ZZ',
    patientId: 'PAT-1068',
    patientName: 'Francis Kiprop',
    phone: '+254 710 555 666',
    invoiceId: 'INV-2026-0828',
    method: 'M-Pesa STK',
    amount: 4500,
    cashier: 'System Webhook',
    status: 'Reconciled',
    notes: 'Occlusal Composite Restoration payment',
  },
  {
    id: 'RCT-2026-1036',
    date: '31 Oct 2026, 03:50 PM',
    txnRef: 'REV-SK0921M',
    patientId: 'PAT-1065',
    patientName: 'Lucy Wambui',
    phone: '+254 722 111 999',
    invoiceId: 'INV-2026-0820',
    method: 'M-Pesa STK',
    amount: 3000,
    cashier: 'Dr. Avicena M.',
    status: 'Refunded',
    notes: 'Overpayment reversal via Safaricom B2C API',
  },
];

export default function Payments() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingPayment, setViewingPayment] = useState(null);

  // Record Payment Form state
  const [paymentForm, setPaymentForm] = useState({
    patientName: '',
    phone: '+254 712 345 678',
    invoiceId: 'INV-2026-0841',
    method: 'M-Pesa STK',
    txnRef: '',
    amount: '',
    notes: '',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: payments.length,
      mpesa: payments.filter((p) => p.method.includes('M-Pesa')).length,
      insurance: payments.filter((p) => p.method.includes('Insurance') || p.method.includes('SHA')).length,
      card: payments.filter((p) => p.method.includes('Visa') || p.method.includes('Card')).length,
      cash: payments.filter((p) => p.method === 'Cash').length,
      refunded: payments.filter((p) => p.status === 'Refunded').length,
    };
  }, [payments]);

  const tabs = [
    { id: 'all', label: 'All Payments', count: tabCounts.all },
    { id: 'mpesa', label: 'M-Pesa STK & Till', count: tabCounts.mpesa },
    { id: 'insurance', label: 'Insurance & SHA EFT', count: tabCounts.insurance },
    { id: 'card', label: 'Card (PDQ)', count: tabCounts.card },
    { id: 'cash', label: 'Cash', count: tabCounts.cash },
    { id: 'refunded', label: 'Refunds / Reversals', count: tabCounts.refunded },
  ];

  // Filtered payments
  const filteredPayments = useMemo(() => {
    let result = payments;
    if (activeTab === 'mpesa') result = payments.filter((p) => p.method.includes('M-Pesa'));
    else if (activeTab === 'insurance')
      result = payments.filter((p) => p.method.includes('Insurance') || p.method.includes('SHA'));
    else if (activeTab === 'card')
      result = payments.filter((p) => p.method.includes('Visa') || p.method.includes('Card'));
    else if (activeTab === 'cash') result = payments.filter((p) => p.method === 'Cash');
    else if (activeTab === 'refunded') result = payments.filter((p) => p.status === 'Refunded');

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.txnRef.toLowerCase().includes(q) ||
          p.patientName.toLowerCase().includes(q) ||
          p.invoiceId.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q)
      );
    }

    return result;
  }, [payments, activeTab, searchTerm]);

  // Create Payment handler
  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!paymentForm.patientName || !paymentForm.amount) {
      alert('Please enter the patient name and payment amount.');
      return;
    }

    const newPayment = {
      id: `RCT-2026-${String(payments.length + 1050).padStart(4, '0')}`,
      date: 'Just now',
      txnRef:
        paymentForm.txnRef ||
        `SK${Math.floor(1000 + Math.random() * 9000)}M${Math.floor(10 + Math.random() * 89)}K`,
      patientId: 'PAT-1081',
      patientName: paymentForm.patientName,
      phone: paymentForm.phone,
      invoiceId: paymentForm.invoiceId || 'INV-2026-0841',
      method: paymentForm.method,
      amount: parseFloat(paymentForm.amount) || 0,
      cashier: 'Faith W. (Front Desk)',
      status: 'Verified',
      notes: paymentForm.notes || 'Payment received at clinic front desk',
    };

    setPayments([newPayment, ...payments]);
    setIsRecordModalOpen(false);
    setPaymentForm({
      patientName: '',
      phone: '+254 712 345 678',
      invoiceId: 'INV-2026-0841',
      method: 'M-Pesa STK',
      txnRef: '',
      amount: '',
      notes: '',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import M-Pesa / Bank Statement',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Safaricom M-Pesa & Bank CSV Reconciliation wizard opened'),
    },
    {
      id: 'add-multiple',
      label: 'Batch Remittance Entry',
      onClick: () => alert('Batch Insurance Remittance Allocation opened'),
    },
    {
      id: 'reconcile',
      label: 'Daily Cash & Till Closing',
      onClick: () => alert('Opening End-of-Day Cashier Reconciliation Sheet'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'Receipt # & Date',
        minWidth: '185px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter receipt #...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={Coins01Icon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {row.date}
            </span>
          </div>
        ),
      },
      {
        key: 'txnRef',
        title: 'Transaction Ref / Code',
        minWidth: '165px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'M-Pesa or EFT code...',
        render: (val) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            {val}
          </span>
        ),
      },
      {
        key: 'patientName',
        title: 'Patient Name & Phone',
        minWidth: '200px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter patient...',
        render: (val, row) => (
          <div className="flex items-center gap-2 py-0.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
              {row.patientName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                {row.patientName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {row.phone}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'invoiceId',
        title: 'Linked Invoice',
        minWidth: '140px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'INV-...',
        render: (val) => (
          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            {val}
          </span>
        ),
      },
      {
        key: 'method',
        title: 'Payment Method',
        minWidth: '155px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'M-Pesa STK',
          'M-Pesa Till',
          'SHA Remittance',
          'Insurance EFT',
          'Visa / Mastercard',
          'Cash',
        ],
        render: (val) => {
          const style = {
            'M-Pesa STK': 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'M-Pesa Till': 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'SHA Remittance': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            'Insurance EFT': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300',
            'Visa / Mastercard': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300',
            Cash: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              {val}
            </span>
          );
        },
      },
      {
        key: 'amount',
        title: 'Amount (KES)',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span
            className={`text-xs font-bold font-mono ${row.status === 'Refunded'
              ? 'text-rose-600 line-through'
              : 'text-emerald-700 dark:text-emerald-400'
              }`}
          >
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'cashier',
        title: 'Received By',
        minWidth: '160px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs text-slate-600 dark:text-slate-300 truncate block">
            {val}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '145px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: ['Verified', 'Reconciled', 'Pending Verification', 'Refunded'],
        render: (val) => {
          const style = {
            Verified: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            Reconciled: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            'Pending Verification': 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            Refunded: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${val === 'Verified'
                  ? 'bg-emerald-500'
                  : val === 'Reconciled'
                    ? 'bg-blue-500'
                    : val === 'Pending Verification'
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
              title={`Receipt ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Payment Receipt',
                  icon: EyeIcon,
                  onClick: () => setViewingPayment(row),
                },
                {
                  id: 'print',
                  label: 'Print Official Thermal Receipt',
                  icon: PrinterIcon,
                  onClick: () => alert(`Printing Official Receipt ${row.id}...`),
                },
                {
                  id: 'sms',
                  label: 'Resend SMS Confirmation',
                  icon: BubbleChatIcon,
                  onClick: () => alert(`SMS Receipt confirmation sent to ${row.phone}`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'refund',
                  label: 'Reverse / Refund Payment',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Initiate reversal/refund for receipt ${row.id} (${row.txnRef})?`)) {
                      setPayments((prev) =>
                        prev.map((p) => (p.id === row.id ? { ...p, status: 'Refunded' } : p))
                      );
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
      {/* ─── 1. Page Header ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Payments"
        badge={`${tabCounts.all} Receipts`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about M-Pesa C2B reconciliations, EFT remittances, and daily till closing"
        moreActions={headerMoreActions}
        addLabel="Record Payment"
        onAdd={() => setIsRecordModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search receipt #, M-Pesa code, patient, invoice..."
        filterPills={[
          {
            id: 'method',
            label: 'Payment Method',
            onClick: () => alert('Quick Filter: Payment Method'),
          },
          {
            id: 'cashier',
            label: 'Cashier / Channel',
            onClick: () => alert('Quick Filter: Cashier / Channel'),
          },
          {
            id: 'status',
            label: 'Reconciliation Status',
            onClick: () => alert('Quick Filter: Status'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Payment Filters opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('Payment Gateway & Till Preferences'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div >
        <DataTable
          title="Payments"
          data={filteredPayments}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedPaymentIds}
          onSelectionChange={setSelectedPaymentIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingPayment(row)}
        />
      </div>

      {/* ─── 3. Record Payment Modal ────────────────────────────────────────── */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Record Payment Receipt
                  </h3>
                  <p className="text-xs text-slate-500">
                    Log M-Pesa, Cash, Card, or EFT remittance against an invoice
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRecordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Omondi"
                    value={paymentForm.patientName}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, patientName: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Linked Invoice #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. INV-2026-0841"
                    value={paymentForm.invoiceId}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, invoiceId: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentForm.method}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, method: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="M-Pesa STK">M-Pesa STK</option>
                    <option value="M-Pesa Till">M-Pesa Till</option>
                    <option value="Cash">Cash</option>
                    <option value="Visa / Mastercard">Visa / Mastercard</option>
                    <option value="SHA Remittance">SHA Remittance</option>
                    <option value="Insurance EFT">Insurance EFT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Amount Received (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4500"
                    value={paymentForm.amount}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, amount: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    M-Pesa / EFT Ref Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SK9901K4LB"
                    value={paymentForm.txnRef}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, txnRef: e.target.value.toUpperCase() })
                    }
                    className="w-full text-xs font-mono rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+254 712 345 678"
                    value={paymentForm.phone}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, phone: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Payment Notes / Remarks
                </label>
                <input
                  type="text"
                  placeholder="e.g. Balance clearance for root canal"
                  value={paymentForm.notes}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, notes: e.target.value })
                  }
                  className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded text-white bg-[#027A48] hover:bg-[#02683E] shadow-xs transition-colors cursor-pointer"
                >
                  Save & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. View Receipt Modal ──────────────────────────────────────────── */}
      {viewingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={Coins01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Official Payment Receipt
                  </h3>
                  <p className="text-xs text-slate-500">{viewingPayment.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingPayment(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Amount Received
                </span>
                <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                  KES {viewingPayment.amount.toLocaleString()}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  {viewingPayment.method} • {viewingPayment.txnRef}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Received From:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{viewingPayment.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Linked Invoice:</span>
                  <span className="font-mono font-semibold text-blue-600">{viewingPayment.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-slate-700 dark:text-slate-300">{viewingPayment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processed By:</span>
                  <span className="text-slate-700 dark:text-slate-300">{viewingPayment.cashier}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Remarks:</strong> {viewingPayment.notes}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => alert(`Printing thermal receipt ${viewingPayment.id}...`)}
                className="px-3 py-1.5 rounded text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <HugeiconsIcon icon={PrinterIcon} size={14} />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={() => setViewingPayment(null)}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Learn Modal ─────────────────────────────────────────────────── */}
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
                    Payments & Reconciliation Guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    Safaricom Daraja C2B, Insurance EFTs, and daily till closing
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
                  Automated M-Pesa Daraja Verification
                </h4>
                <p className="leading-relaxed">
                  All STK Push and Paybill/Till transactions are validated via Safaricom&apos;s C2B callback API, preventing duplicate or fake SMS confirmation entries.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Insurance Batch Remittance Allocation
                </h4>
                <p className="leading-relaxed">
                  When SHA or corporate underwriters remit a lump-sum EFT, use Batch Remittance Entry to split and reconcile individual patient invoices automatically.
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

