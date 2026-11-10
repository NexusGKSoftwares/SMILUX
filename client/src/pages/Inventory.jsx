import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  MoreHorizontalIcon,
  Cancel01Icon,
  PlusSignIcon,
  Doc01Icon,
  PencilEdit01Icon,
  Delete02Icon,
  Idea01Icon,
  EyeIcon,
  PrinterIcon,
  DentalToothIcon,
  AlertCircleIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Inventory & Consumables ────────────────────
const INITIAL_INVENTORY = [
  {
    id: 'SKU-DEN-1042',
    batchNo: 'LOT-2026-88A',
    name: '3M Filtek Z350 XT Universal Composite Syringe (4g - Shade A2)',
    category: 'Restorative',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 24,
    minStock: 10,
    unit: 'Syringes',
    unitCost: 4200,
    expiryDate: 'Aug 2028',
    location: 'Cabinet A1 (Chairside)',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1041',
    batchNo: 'LOT-2026-14C',
    name: 'Septodont Septanest 4% Articaine with 1:100,000 Epinephrine (Box of 50)',
    category: 'Anesthetics',
    supplier: 'MedPlus Surgical & Pharma',
    quantity: 4,
    minStock: 8,
    unit: 'Boxes',
    unitCost: 3800,
    expiryDate: 'May 2027',
    location: 'Main Dispensary Safe',
    status: 'Low Stock',
  },
  {
    id: 'SKU-DEN-1040',
    batchNo: 'LOT-2025-99B',
    name: 'Dentsply ProTaper Gold Rotary NiTi Files Assorted SX-F3 (Pack of 6)',
    category: 'Endodontics',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 18,
    minStock: 6,
    unit: 'Packs',
    unitCost: 5500,
    expiryDate: 'Non-Expiry',
    location: 'Endo Drawer B2',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1039',
    batchNo: 'LOT-2026-02M',
    name: 'Geistlich Bio-Oss Cancellous Bone Graft Granules (0.5g Vial)',
    category: 'Implants & Bone',
    supplier: 'East Africa Oral Surgery Supply',
    quantity: 2,
    minStock: 5,
    unit: 'Vials',
    unitCost: 14500,
    expiryDate: 'Dec 2027',
    location: 'Surgical Sterile Vault',
    status: 'Low Stock',
  },
  {
    id: 'SKU-DEN-1038',
    batchNo: 'LOT-2026-77K',
    name: 'Straumann Bone Level Tapered (BLT) Implant Ø4.1mm x 10mm SLActive',
    category: 'Implants & Bone',
    supplier: 'East Africa Oral Surgery Supply',
    quantity: 6,
    minStock: 3,
    unit: 'Units',
    unitCost: 22000,
    expiryDate: 'Oct 2029',
    location: 'Surgical Sterile Vault',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1037',
    batchNo: 'LOT-2026-51P',
    name: 'Powder-Free Nitrile Examination Gloves - Medium (Box of 100)',
    category: 'PPE & Disposables',
    supplier: 'MedPlus Surgical & Pharma',
    quantity: 42,
    minStock: 15,
    unit: 'Boxes',
    unitCost: 850,
    expiryDate: 'Jan 2029',
    location: 'Central Store Rack 3',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1036',
    batchNo: 'LOT-2025-11X',
    name: '3M Single Bond Universal Dental Adhesive Refill (5ml Vial)',
    category: 'Restorative',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 1,
    minStock: 4,
    unit: 'Vials',
    unitCost: 6200,
    expiryDate: 'Nov 2026',
    location: 'Cabinet A1 (Chairside)',
    status: 'Expiring Soon',
  },
  {
    id: 'SKU-DEN-1035',
    batchNo: 'LOT-2026-63R',
    name: 'Ormco Damon Q2 Self-Ligating Brackets Full Upper/Lower Kit (.022)',
    category: 'Orthodontics',
    supplier: 'East Africa Ortho Distributors',
    quantity: 9,
    minStock: 5,
    unit: 'Kits',
    unitCost: 16000,
    expiryDate: 'Non-Expiry',
    location: 'Ortho Cabinet C1',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1034',
    batchNo: 'LOT-2026-40L',
    name: 'Zhermack Elite HD+ Putty Soft & Light Body Impression Kit',
    category: 'Restorative',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 0,
    minStock: 4,
    unit: 'Kits',
    unitCost: 7400,
    expiryDate: 'Mar 2028',
    location: 'Prostho Shelf D1',
    status: 'Out of Stock',
  },
  {
    id: 'SKU-DEN-1033',
    batchNo: 'LOT-2026-29D',
    name: 'Dentsply AH Plus Root Canal Sealer Dual Paste Kit',
    category: 'Endodontics',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 7,
    minStock: 3,
    unit: 'Kits',
    unitCost: 6800,
    expiryDate: 'Jul 2028',
    location: 'Endo Drawer B2',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1032',
    batchNo: 'LOT-2026-90S',
    name: 'Autoclave Self-Sealing Sterilization Pouches 90x260mm (Box of 200)',
    category: 'PPE & Disposables',
    supplier: 'MedPlus Surgical & Pharma',
    quantity: 14,
    minStock: 6,
    unit: 'Boxes',
    unitCost: 1400,
    expiryDate: 'Dec 2029',
    location: 'Sterilization Room',
    status: 'In Stock',
  },
  {
    id: 'SKU-DEN-1031',
    batchNo: 'LOT-2026-19E',
    name: 'GC Fuji IX GP Extra Glass Ionomer Restorative Capsule Pack',
    category: 'Restorative',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: 3,
    minStock: 5,
    unit: 'Packs',
    unitCost: 8900,
    expiryDate: 'Apr 2027',
    location: 'Cabinet A2',
    status: 'Low Stock',
  },
];

export default function Inventory() {
  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  // New Item Form state
  const [itemForm, setItemForm] = useState({
    name: '',
    batchNo: 'LOT-2026-99A',
    category: 'Restorative',
    supplier: 'Nairobi Dental Supplies Ltd',
    quantity: '10',
    minStock: '5',
    unit: 'Units',
    unitCost: '',
    expiryDate: 'Dec 2028',
    location: 'Cabinet A1 (Chairside)',
  });

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: items.length,
      lowStock: items.filter(
        (i) => i.status === 'Low Stock' || i.status === 'Out of Stock' || i.status === 'Expiring Soon'
      ).length,
      restorative: items.filter((i) => i.category === 'Restorative' || i.category === 'Endodontics').length,
      anesthetics: items.filter((i) => i.category === 'Anesthetics').length,
      implants: items.filter((i) => i.category === 'Implants & Bone' || i.category === 'Orthodontics').length,
      ppe: items.filter((i) => i.category === 'PPE & Disposables').length,
    };
  }, [items]);

  const tabs = [
    { id: 'all', label: 'All Stock Items', count: tabCounts.all },
    { id: 'low-stock', label: 'Low Stock & Alerts', count: tabCounts.lowStock },
    { id: 'restorative', label: 'Restorative & Endo', count: tabCounts.restorative },
    { id: 'anesthetics', label: 'Anesthetics & Pharma', count: tabCounts.anesthetics },
    { id: 'implants', label: 'Implants & Ortho', count: tabCounts.implants },
    { id: 'ppe', label: 'PPE & Disposables', count: tabCounts.ppe },
  ];

  // Filtered items
  const filteredItems = useMemo(() => {
    let result = items;
    if (activeTab === 'low-stock') {
      result = items.filter(
        (i) => i.status === 'Low Stock' || i.status === 'Out of Stock' || i.status === 'Expiring Soon'
      );
    } else if (activeTab === 'restorative') {
      result = items.filter((i) => i.category === 'Restorative' || i.category === 'Endodontics');
    } else if (activeTab === 'anesthetics') {
      result = items.filter((i) => i.category === 'Anesthetics');
    } else if (activeTab === 'implants') {
      result = items.filter((i) => i.category === 'Implants & Bone' || i.category === 'Orthodontics');
    } else if (activeTab === 'ppe') {
      result = items.filter((i) => i.category === 'PPE & Disposables');
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.name.toLowerCase().includes(q) ||
          i.batchNo.toLowerCase().includes(q) ||
          i.supplier.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, activeTab, searchTerm]);

  // Add Item handler
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemForm.name || !itemForm.unitCost) {
      alert('Please enter the item name and unit cost.');
      return;
    }

    const qty = parseInt(itemForm.quantity, 10) || 0;
    const min = parseInt(itemForm.minStock, 10) || 5;
    let status = 'In Stock';
    if (qty === 0) status = 'Out of Stock';
    else if (qty <= min) status = 'Low Stock';

    const newItem = {
      id: `SKU-DEN-${String(items.length + 1045)}`,
      batchNo: itemForm.batchNo.toUpperCase(),
      name: itemForm.name,
      category: itemForm.category,
      supplier: itemForm.supplier,
      quantity: qty,
      minStock: min,
      unit: itemForm.unit,
      unitCost: parseFloat(itemForm.unitCost) || 0,
      expiryDate: itemForm.expiryDate || 'Dec 2028',
      location: itemForm.location,
      status,
    };

    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    setItemForm({
      name: '',
      batchNo: 'LOT-2026-99A',
      category: 'Restorative',
      supplier: 'Nairobi Dental Supplies Ltd',
      quantity: '10',
      minStock: '5',
      unit: 'Units',
      unitCost: '',
      expiryDate: 'Dec 2028',
      location: 'Cabinet A1 (Chairside)',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Inventory CSV',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Stock Items & Batch Numbers CSV opened'),
    },
    {
      id: 'audit',
      label: 'Run Physical Stocktake Audit',
      onClick: () => alert('Opening Clinic Stocktake & Variance Worksheet'),
    },
    {
      id: 'locations',
      label: 'Manage Storage Cabinets & Rooms',
      onClick: () => alert('Opening Clinic Storage Locations Configuration'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'SKU & Batch/Lot',
        minWidth: '170px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter SKU...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={DentalToothIcon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[10px] text-slate-500 font-sans mt-0.5">
              {row.batchNo}
            </span>
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Consumable / Material Name',
        minWidth: '280px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter item name...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
              {val}
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              Supplier: {row.supplier}
            </span>
          </div>
        ),
      },
      {
        key: 'category',
        title: 'Category',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Restorative',
          'Endodontics',
          'Anesthetics',
          'Implants & Bone',
          'Orthodontics',
          'PPE & Disposables',
        ],
        render: (val) => {
          const style = {
            Restorative: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            Endodontics: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300',
            Anesthetics: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
            'Implants & Bone': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300',
            Orthodontics: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300',
            'PPE & Disposables': 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              {val}
            </span>
          );
        },
      },
      {
        key: 'quantity',
        title: 'Stock On Hand',
        minWidth: '140px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span
              className={`text-xs font-bold font-sans ${val <= row.minStock
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-slate-900 dark:text-white'
                }`}
            >
              {val} {row.unit}
            </span>
            <span className="text-[10px] text-slate-400">
              Reorder Min: {row.minStock}
            </span>
          </div>
        ),
      },
      {
        key: 'unitCost',
        title: 'Unit Cost (KES)',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        render: (val) => (
          <span className="text-xs font-sans font-semibold text-slate-700 dark:text-slate-300">
            KES {val.toLocaleString()}
          </span>
        ),
      },
      {
        key: 'totalValue',
        title: 'Stock Value (KES)',
        minWidth: '140px',
        sortable: false,
        filterable: false,
        render: (_, row) => (
          <span className="text-xs font-sans font-bold text-slate-900 dark:text-white">
            KES {(row.quantity * row.unitCost).toLocaleString()}
          </span>
        ),
      },
      {
        key: 'expiryDate',
        title: 'Expiry Date',
        minWidth: '120px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span
            className={`text-xs font-medium ${row.status === 'Expiring Soon'
              ? 'text-rose-600 font-bold'
              : 'text-slate-600 dark:text-slate-300'
              }`}
          >
            {val}
          </span>
        ),
      },
      {
        key: 'location',
        title: 'Storage Location',
        minWidth: '165px',
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
        minWidth: '140px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: ['In Stock', 'Low Stock', 'Out of Stock', 'Expiring Soon'],
        render: (val) => {
          const style = {
            'In Stock':
              'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'Low Stock':
              'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            'Out of Stock':
              'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
            'Expiring Soon':
              'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${style}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${val === 'In Stock'
                  ? 'bg-emerald-500'
                  : val === 'Low Stock'
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
              title={`Stock Item ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center   transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Stock Card & Ledger',
                  icon: EyeIcon,
                  onClick: () => setViewingItem(row),
                },
                {
                  id: 'dispense',
                  label: 'Issue / Dispense to Chair',
                  icon: DentalToothIcon,
                  onClick: () => {
                    setItems((prev) =>
                      prev.map((item) =>
                        item.id === row.id && item.quantity > 0
                          ? {
                            ...item,
                            quantity: item.quantity - 1,
                            status:
                              item.quantity - 1 === 0
                                ? 'Out of Stock'
                                : item.quantity - 1 <= item.minStock
                                  ? 'Low Stock'
                                  : item.status,
                          }
                          : item
                      )
                    );
                  },
                },
                {
                  id: 'reorder',
                  label: 'Generate Reorder LPO',
                  icon: Doc01Icon,
                  onClick: () => alert(`Generating Purchase Order to ${row.supplier} for ${row.name}`),
                },
                {
                  id: 'barcode',
                  label: 'Print SKU Barcode Label',
                  icon: PrinterIcon,
                  onClick: () => alert(`Printing barcode sticker for ${row.id} (${row.batchNo})`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'delete',
                  label: 'Archive / Delete Item',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Remove ${row.name} from inventory catalog?`)) {
                      setItems((prev) => prev.filter((i) => i.id !== row.id));
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
        title="Inventory"
        badge={`${tabCounts.all} SKUs`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about FEFO batch tracking, implant traceability, and minimum reorder points"
        moreActions={headerMoreActions}
        addLabel="Add Stock Item"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search SKU, item name, batch/lot, supplier, cabinet..."
        filterPills={[
          {
            id: 'category',
            label: 'Material Category',
            onClick: () => alert('Quick Filter: Material Category'),
          },
          {
            id: 'location',
            label: 'Storage Location',
            onClick: () => alert('Quick Filter: Storage Location'),
          },
          {
            id: 'status',
            label: 'Stock Level Status',
            onClick: () => alert('Quick Filter: Stock Status'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Inventory Filters opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('Inventory Reorder Rules & Barcode Settings'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div  >
        <DataTable
          title="Dental Inventory & Consumables"
          data={filteredItems}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedItemIds}
          onSelectionChange={setSelectedItemIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingItem(row)}
        />
      </div>

      {/* ─── 3. Add Stock Item Modal ────────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl   border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Add New Inventory SKU
                  </h3>
                  <p className="text-xs text-slate-500">
                    Register dental material, batch number, and reorder threshold
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Consumable / Material Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3M Filtek Z350 XT Composite Syringe (Shade A2)"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Restorative">Restorative</option>
                    <option value="Endodontics">Endodontics</option>
                    <option value="Anesthetics">Anesthetics</option>
                    <option value="Implants & Bone">Implants & Bone</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="PPE & Disposables">PPE & Disposables</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Batch / Lot Number
                  </label>
                  <input
                    type="text"
                    placeholder="LOT-2026-99A"
                    value={itemForm.batchNo}
                    onChange={(e) => setItemForm({ ...itemForm, batchNo: e.target.value })}
                    className="w-full text-xs font-sans rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Opening Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={itemForm.quantity}
                    onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Minimum Reorder Point
                  </label>
                  <input
                    type="number"
                    value={itemForm.minStock}
                    onChange={(e) => setItemForm({ ...itemForm, minStock: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Unit Cost (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4200"
                    value={itemForm.unitCost}
                    onChange={(e) => setItemForm({ ...itemForm, unitCost: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="Dec 2028"
                    value={itemForm.expiryDate}
                    onChange={(e) => setItemForm({ ...itemForm, expiryDate: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-[ #7b4dff] hover:bg-[#02683E]   transition-colors cursor-pointer"
                >
                  Save Stock Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. View Stock Card Modal ───────────────────────────────────────── */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl   border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={DentalToothIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingItem.id}
                  </h3>
                  <p className="text-xs text-slate-500">Batch: {viewingItem.batchNo}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Material Description</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{viewingItem.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Stock</span>
                  <p className="font-extrabold text-emerald-700 dark:text-emerald-400 font-sans text-base mt-0.5">
                    {viewingItem.quantity} {viewingItem.unit}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Valuation</span>
                  <p className="font-extrabold text-slate-900 dark:text-white font-sans text-base mt-0.5">
                    KES {(viewingItem.quantity * viewingItem.unitCost).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Supplier:</span>
                  <span className="font-semibold">{viewingItem.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Storage Location:</span>
                  <span>{viewingItem.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expiry Date:</span>
                  <span className="font-semibold">{viewingItem.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[ #7b4dff] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Close Stock Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Learn Modal ─────────────────────────────────────────────────── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl   border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  <HugeiconsIcon icon={Idea01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dental Inventory & FEFO Standards
                  </h3>
                  <p className="text-xs text-slate-500">
                    Batch traceability, expiry alerts, and automated reorder rules
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
                  FEFO (First Expired, First Out) Compliance
                </h4>
                <p className="leading-relaxed">
                  Dental bonding agents, composites, and local anesthetics are automatically flagged 90 days prior to expiration so chairside nurses dispense older batches first.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Implant & Biomaterial Lot Traceability
                </h4>
                <p className="leading-relaxed">
                  Every titanium implant and bone graft vial carries a Lot/Batch number linked directly to the patient&apos;s surgical record for medical-legal compliance.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[ #7b4dff] text-white hover:bg-[#02683E] cursor-pointer"
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

