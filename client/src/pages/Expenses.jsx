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
  PencilEdit01Icon,
  Delete02Icon,
  Idea01Icon,
  EyeIcon,
  PrinterIcon,
  Coins01Icon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Clinic Operational Expenses ──────────────────────
const INITIAL_EXPENSES = [
  {
    id: 'EXP-2026-0319',
    date: '09 Nov 2026',
    vendor: 'Nairobi Dental Supplies Ltd',
    vendorPin: 'P051298341K',
    description: '3M Filtek Z350 XT Syringes (x8) & 2% Lidocaine Cartridges (10 boxes)',
    category: 'Dental Supplies',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: 'SK9812P4M0',
    amount: 48200,
    taxStatus: 'VAT Exempt (Medical)',
    approvedBy: 'Dr. Avicena M.',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0318',
    date: '08 Nov 2026',
    vendor: 'CrownCraft Dental Prosthetics Lab',
    vendorPin: 'P051882104M',
    description: 'CAD/CAM Zirconia Crowns (#21, #14) & Full Acrylic Denture Lab Fee',
    category: 'Dental Lab Fees',
    paymentMethod: 'Bank EFT',
    txnRef: 'EFT-KCB-99102',
    amount: 34500,
    taxStatus: 'VAT Exempt (Medical)',
    approvedBy: 'Dr. Avicena M.',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0317',
    date: '07 Nov 2026',
    vendor: 'BioMed Biomedical Engineering',
    vendorPin: 'P051440912B',
    description: 'Quarterly Preventive Servicing: Planmeca Dental Chair #1 & Autoclave B-Class',
    category: 'Equipment Maint.',
    paymentMethod: 'Bank EFT',
    txnRef: 'EFT-KCB-98941',
    amount: 26000,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Dr. Avicena M.',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0316',
    date: '06 Nov 2026',
    vendor: 'Kenya Power (KPLC)',
    vendorPin: 'P000112233X',
    description: 'Clinic Postpaid Electricity Bill (X-Ray & Compressor Load - Oct/Nov)',
    category: 'Utilities & Rent',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: 'SK6019L2QW',
    amount: 19400,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Clinic Admin',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0315',
    date: '05 Nov 2026',
    vendor: 'East Africa Ortho Distributors',
    vendorPin: 'P051990123Z',
    description: ' Roth .022 Bracket Kits (x15), NiTi Archwires, and Elastomeric Chains',
    category: 'Dental Supplies',
    paymentMethod: 'Bank EFT',
    txnRef: 'EFT-EQT-44012',
    amount: 64000,
    taxStatus: 'VAT Exempt (Medical)',
    approvedBy: 'Dr. Omondi P.',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0314',
    date: '05 Nov 2026',
    vendor: 'GreenCity Medical Waste Handlers',
    vendorPin: 'P051772019W',
    description: 'NEMA Certified Sharps & Biohazard Clinical Waste Incineration (Monthly)',
    category: 'Utilities & Rent',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: 'SK5510N8TY',
    amount: 8500,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Clinic Admin',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0313',
    date: '04 Nov 2026',
    vendor: 'Apex Dental Laboratory Nairobi',
    vendorPin: 'P051660192A',
    description: 'Cobalt-Chrome Partial Denture Framework & Nightguards (x3)',
    category: 'Dental Lab Fees',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: 'Pending',
    amount: 28000,
    taxStatus: 'VAT Exempt (Medical)',
    approvedBy: 'Dr. Amina K.',
    status: 'Pending Approval',
  },
  {
    id: 'EXP-2026-0312',
    date: '03 Nov 2026',
    vendor: 'Safaricom PLC Enterprise',
    vendorPin: 'P051092837S',
    description: 'Dedicated Clinic Fiber Internet 100Mbps & Cloud PBX Trunk',
    category: 'Utilities & Rent',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: 'SK3109B7KL',
    amount: 12999,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Clinic Admin',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0311',
    date: '02 Nov 2026',
    vendor: 'MedPlus Surgical & Disposables',
    vendorPin: 'P051330194M',
    description: 'Nitrile Examination Gloves (20 boxes), Surgical Masks, Saliva Ejectors & Bibs',
    category: 'Dental Supplies',
    paymentMethod: 'Petty Cash',
    txnRef: 'PCV-2026-089',
    amount: 15600,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Clinic Admin',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0310',
    date: '01 Nov 2026',
    vendor: 'UpperHill Medical Suites Management',
    vendorPin: 'P051112290U',
    description: 'Clinic Suite Monthly Lease & Service Charge (November 2026)',
    category: 'Utilities & Rent',
    paymentMethod: 'Bank EFT',
    txnRef: 'EFT-KCB-90112',
    amount: 145000,
    taxStatus: 'eTIMS Verified (16% VAT)',
    approvedBy: 'Dr. Avicena M.',
    status: 'Paid',
  },
  {
    id: 'EXP-2026-0309',
    date: '01 Nov 2026',
    vendor: 'Dr. Omondi P. (Visiting Oral Surgeon)',
    vendorPin: 'A009182736K',
    description: 'Specialist Sessional Commission Split (Surgical Extractions - Oct)',
    category: 'Payroll & Comms',
    paymentMethod: 'Bank EFT',
    txnRef: 'EFT-KCB-90115',
    amount: 82000,
    taxStatus: 'Withholding Tax (5%)',
    approvedBy: 'Dr. Avicena M.',
    status: 'Paid',
  },
];

export default function Expenses() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [selectedExpenseIds, setSelectedExpenseIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingExpense, setViewingExpense] = useState(null);

  // New Expense Form state
  const [expenseForm, setExpenseForm] = useState({
    vendor: '',
    vendorPin: '',
    description: '',
    category: 'Dental Supplies',
    paymentMethod: 'M-Pesa Paybill',
    txnRef: '',
    amount: '',
    taxStatus: 'eTIMS Verified (16% VAT)',
    status: 'Paid',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: expenses.length,
      supplies: expenses.filter((e) => e.category === 'Dental Supplies').length,
      lab: expenses.filter((e) => e.category === 'Dental Lab Fees').length,
      utilities: expenses.filter((e) => e.category === 'Utilities & Rent').length,
      equipment: expenses.filter((e) => e.category === 'Equipment Maint.').length,
      payroll: expenses.filter((e) => e.category === 'Payroll & Comms').length,
    };
  }, [expenses]);

  const tabs = [
    { id: 'all', label: 'All Expenses', count: tabCounts.all },
    { id: 'supplies', label: 'Dental Supplies', count: tabCounts.supplies },
    { id: 'lab', label: 'Dental Lab Fees', count: tabCounts.lab },
    { id: 'utilities', label: 'Utilities & Rent', count: tabCounts.utilities },
    { id: 'equipment', label: 'Equipment Maint.', count: tabCounts.equipment },
    { id: 'payroll', label: 'Payroll & Comms', count: tabCounts.payroll },
  ];

  // Filtered expenses
  const filteredExpenses = useMemo(() => {
    let result = expenses;
    if (activeTab === 'supplies') result = expenses.filter((e) => e.category === 'Dental Supplies');
    else if (activeTab === 'lab') result = expenses.filter((e) => e.category === 'Dental Lab Fees');
    else if (activeTab === 'utilities') result = expenses.filter((e) => e.category === 'Utilities & Rent');
    else if (activeTab === 'equipment') result = expenses.filter((e) => e.category === 'Equipment Maint.');
    else if (activeTab === 'payroll') result = expenses.filter((e) => e.category === 'Payroll & Comms');

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.id.toLowerCase().includes(q) ||
          e.vendor.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.txnRef.toLowerCase().includes(q)
      );
    }

    return result;
  }, [expenses, activeTab, searchTerm]);

  // Create Expense handler
  const handleRecordExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.vendor || !expenseForm.description || !expenseForm.amount) {
      alert('Please fill in Supplier/Vendor, Description, and Amount.');
      return;
    }

    const newExpense = {
      id: `EXP-2026-${String(expenses.length + 320).padStart(4, '0')}`,
      date: 'Today',
      vendor: expenseForm.vendor,
      vendorPin: expenseForm.vendorPin || 'P051000000A',
      description: expenseForm.description,
      category: expenseForm.category,
      paymentMethod: expenseForm.paymentMethod,
      txnRef: expenseForm.txnRef || `REF-${Math.floor(10000 + Math.random() * 89999)}`,
      amount: parseFloat(expenseForm.amount) || 0,
      taxStatus: expenseForm.taxStatus,
      approvedBy: 'Dr. Avicena M.',
      status: expenseForm.status,
    };

    setExpenses([newExpense, ...expenses]);
    setIsRecordModalOpen(false);
    setExpenseForm({
      vendor: '',
      vendorPin: '',
      description: '',
      category: 'Dental Supplies',
      paymentMethod: 'M-Pesa Paybill',
      txnRef: '',
      amount: '',
      taxStatus: 'eTIMS Verified (16% VAT)',
      status: 'Paid',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Supplier eTIMS CSV',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import KRA eTIMS Purchase Invoices wizard opened'),
    },
    {
      id: 'export',
      label: 'Export P&L Expense Ledger',
      onClick: () => alert('Exporting Monthly Clinic Expense Ledger to Excel...'),
    },
    {
      id: 'categories',
      label: 'Manage Cost Centers & Budgets',
      onClick: () => alert('Opening Clinic Cost Center Budget Allocations'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'Voucher # & Date',
        minWidth: '175px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter EXP-...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={Invoice01Icon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {row.date}
            </span>
          </div>
        ),
      },
      {
        key: 'vendor',
        title: 'Vendor / Supplier',
        minWidth: '215px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter supplier...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
              {val}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              KRA PIN: {row.vendorPin}
            </span>
          </div>
        ),
      },
      {
        key: 'description',
        title: 'Expense Description',
        minWidth: '270px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter items...',
        render: (val) => (
          <span className="text-xs text-slate-700 dark:text-slate-200 font-medium truncate block">
            {val}
          </span>
        ),
      },
      {
        key: 'category',
        title: 'Cost Category',
        minWidth: '155px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Dental Supplies',
          'Dental Lab Fees',
          'Utilities & Rent',
          'Equipment Maint.',
          'Payroll & Comms',
        ],
        render: (val) => {
          const style = {
            'Dental Supplies': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            'Dental Lab Fees': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300',
            'Utilities & Rent': 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            'Equipment Maint.': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300',
            'Payroll & Comms': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              {val}
            </span>
          );
        },
      },
      {
        key: 'paymentMethod',
        title: 'Payment Method',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{val}</span>
            <span className="text-[10px] font-mono text-slate-400">{row.txnRef}</span>
          </div>
        ),
      },
      {
        key: 'amount',
        title: 'Amount (KES)',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'taxStatus',
        title: 'Tax / eTIMS Status',
        minWidth: '175px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
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
        filterOptions: ['Paid', 'Pending Approval'],
        render: (val) => {
          const style = {
            Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'Pending Approval':
              'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${val === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'
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
              title={`Voucher ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Expense Voucher',
                  icon: EyeIcon,
                  onClick: () => setViewingExpense(row),
                },
                {
                  id: 'print',
                  label: 'Print Payment Voucher',
                  icon: PrinterIcon,
                  onClick: () => alert(`Printing Expense Voucher ${row.id}...`),
                },
                {
                  id: 'edit',
                  label: 'Edit Expense Entry',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing Expense ${row.id}`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'delete',
                  label: 'Void / Delete Expense',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Are you sure you want to delete expense ${row.id}?`)) {
                      setExpenses((prev) => prev.filter((e) => e.id !== row.id));
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
        title="Expenses"
        badge={`${tabCounts.all} Vouchers`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about dental lab fee accounting, consumable cost centers, and eTIMS input tax deductibility"
        moreActions={headerMoreActions}
        addLabel="Record Expense"
        onAdd={() => setIsRecordModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search voucher #, supplier, item, reference..."
        filterPills={[
          {
            id: 'category',
            label: 'Cost Category',
            onClick: () => alert('Quick Filter: Cost Category'),
          },
          {
            id: 'tax',
            label: 'eTIMS Tax Status',
            onClick: () => alert('Quick Filter: eTIMS Tax Status'),
          },
          {
            id: 'status',
            label: 'Approval Status',
            onClick: () => alert('Quick Filter: Approval Status'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Expense Filters opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('Expense Accounting & Budget Settings'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div >
        <DataTable
          title="Clinic Expenses"
          data={filteredExpenses}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedExpenseIds}
          onSelectionChange={setSelectedExpenseIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingExpense(row)}
        />
      </div>

      {/* ─── 3. Record Expense Modal ────────────────────────────────────────── */}
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
                    Record Clinic Expense
                  </h3>
                  <p className="text-xs text-slate-500">
                    Log supplier purchases, lab fees, or operational outflows
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

            <form onSubmit={handleRecordExpense} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vendor / Supplier Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nairobi Dental Supplies Ltd"
                    value={expenseForm.vendor}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, vendor: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Supplier KRA PIN
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. P051298341K"
                    value={expenseForm.vendorPin}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, vendorPin: e.target.value.toUpperCase() })
                    }
                    className="w-full text-xs font-mono rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expense Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3M Filtek Composites & Lidocaine Cartridges"
                  value={expenseForm.description}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, description: e.target.value })
                  }
                  className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cost Category
                  </label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, category: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Dental Supplies">Dental Supplies</option>
                    <option value="Dental Lab Fees">Dental Lab Fees</option>
                    <option value="Utilities & Rent">Utilities & Rent</option>
                    <option value="Equipment Maint.">Equipment Maint.</option>
                    <option value="Payroll & Comms">Payroll & Comms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Amount (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 48200"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, amount: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={expenseForm.paymentMethod}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="M-Pesa Paybill">M-Pesa Paybill</option>
                    <option value="Bank EFT">Bank EFT</option>
                    <option value="Petty Cash">Petty Cash</option>
                    <option value="Corporate Card">Corporate Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tax / eTIMS Classification
                  </label>
                  <select
                    value={expenseForm.taxStatus}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, taxStatus: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="eTIMS Verified (16% VAT)">eTIMS Verified (16% VAT)</option>
                    <option value="VAT Exempt (Medical)">VAT Exempt (Medical)</option>
                    <option value="Withholding Tax (5%)">Withholding Tax (5%)</option>
                  </select>
                </div>
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
                  Save Expense Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. View Expense Voucher Modal ──────────────────────────────────── */}
      {viewingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={Invoice01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Expense Payment Voucher
                  </h3>
                  <p className="text-xs text-slate-500">{viewingExpense.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingExpense(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Paid To Vendor</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{viewingExpense.vendor}</p>
                <p className="text-[10px] text-slate-500 font-mono">KRA PIN: {viewingExpense.vendorPin}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Line Item Particulars</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">{viewingExpense.description}</p>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cost Category:</span>
                  <span className="font-semibold">{viewingExpense.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="font-mono">{viewingExpense.paymentMethod} ({viewingExpense.txnRef})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Compliance:</span>
                  <span>{viewingExpense.taxStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Authorized By:</span>
                  <span>{viewingExpense.approvedBy}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-2">
                  <span>Total Disbursed:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">
                    KES {viewingExpense.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setViewingExpense(null)}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Close Voucher
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
                    Clinic Expense & Cost Center Guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    KRA eTIMS expense deductibility & dental lab cost tracking
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
                  KRA eTIMS Purchase Invoice Requirement
                </h4>
                <p className="leading-relaxed">
                  Under Kenya Finance Act regulations, all clinic operating expenses must be backed by a valid supplier eTIMS invoice linked to the clinic's KRA PIN to qualify as tax-deductible business expenditure.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Dental Lab vs. Consumable Cost Centers
                </h4>
                <p className="leading-relaxed">
                  Separating external prosthetic lab fees from chairside consumables (composites, burs, anesthetics) enables accurate gross margin calculation per dental procedure.
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

