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
  AlertCircleIcon,
  Building01Icon,
  CheckmarkCircle01Icon,
  Invoice01Icon,
  DeliveryTruck01Icon,
  PackageIcon,
  PackageReceiveIcon,
  Clock01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Purchase Orders (LPOs) ─────────────────────
const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'LPO-2026-0194',
    issueDate: '08 Nov 2026',
    supplierId: 'SUP-KEN-101',
    supplierName: 'Nairobi Dental Supplies Ltd',
    itemsSummary: '3M Filtek Z350 Composite (24x), ProTaper Gold Files (6x)',
    itemsCount: 2,
    totalAmount: 133800,
    expectedDelivery: '10 Nov 2026',
    grnRef: 'GRN-2026-081',
    priority: 'Urgent / Chairside',
    approvedBy: 'Dr. Sarah Kimani',
    status: 'In Transit',
    paymentStatus: 'Pending Invoice',
    items: [
      { name: '3M Filtek Z350 XT Composite Syringe (Shade A2)', qty: 24, unitCost: 4200, total: 100800 },
      { name: 'Dentsply ProTaper Gold Rotary Files Assorted', qty: 6, unitCost: 5500, total: 33000 },
    ],
  },
  {
    id: 'LPO-2026-0193',
    issueDate: '07 Nov 2026',
    supplierId: 'SUP-KEN-102',
    supplierName: 'MedPlus Surgical & Pharma Ltd',
    itemsSummary: 'Septanest 4% Articaine (10x), Nitrile Gloves (30x)',
    itemsCount: 2,
    totalAmount: 72500,
    expectedDelivery: '09 Nov 2026',
    grnRef: 'GRN-2026-079',
    priority: 'Standard Restock',
    approvedBy: 'Dr. Brian Omondi',
    status: 'Received',
    paymentStatus: 'Approved for Payment',
    items: [
      { name: 'Septodont Septanest 4% Articaine with Epi (Box of 50)', qty: 10, unitCost: 3800, total: 38000 },
      { name: 'Nitrile Examination Gloves Medium (Box of 100)', qty: 30, unitCost: 1150, total: 34500 },
    ],
  },
  {
    id: 'LPO-2026-0192',
    issueDate: '06 Nov 2026',
    supplierId: 'SUP-KEN-103',
    supplierName: 'East Africa Oral Surgery & Implants Supply',
    itemsSummary: 'Straumann BLT Implants Ø4.1mm (4x), Bio-Oss Bone 0.5g (5x)',
    itemsCount: 2,
    totalAmount: 160500,
    expectedDelivery: '12 Nov 2026',
    grnRef: 'Pending GRN',
    priority: 'Urgent / Chairside',
    approvedBy: 'Dr. Sarah Kimani',
    status: 'Issued to Vendor',
    paymentStatus: 'Advance 50% Paid',
    items: [
      { name: 'Straumann BLT Implant Ø4.1mm x 10mm SLActive', qty: 4, unitCost: 22000, total: 88000 },
      { name: 'Geistlich Bio-Oss Cancellous Granules 0.5g', qty: 5, unitCost: 14500, total: 72500 },
    ],
  },
  {
    id: 'LPO-2026-0191',
    issueDate: '05 Nov 2026',
    supplierId: 'SUP-KEN-104',
    supplierName: 'Apex Dental Prosthetics & Milling Lab',
    itemsSummary: 'CAD/CAM Monolithic Zirconia Crowns (Case #772 & #774)',
    itemsCount: 2,
    totalAmount: 38000,
    expectedDelivery: '08 Nov 2026',
    grnRef: 'GRN-2026-077',
    priority: 'Urgent / Chairside',
    approvedBy: 'Dr. Brian Omondi',
    status: 'Received',
    paymentStatus: 'Paid',
    items: [
      { name: 'Full Contour Zirconia Crown (Tooth #16 - Patient Jane W.)', qty: 1, unitCost: 19000, total: 19000 },
      { name: 'Full Contour Zirconia Crown (Tooth #26 - Patient Kevin O.)', qty: 1, unitCost: 19000, total: 19000 },
    ],
  },
  {
    id: 'LPO-2026-0190',
    issueDate: '04 Nov 2026',
    supplierId: 'SUP-KEN-105',
    supplierName: 'SafeSteril Healthcare & PPE Solutions',
    itemsSummary: 'CaviCide Surface Disinfectant (4x 5L), Sterilization Pouches',
    itemsCount: 3,
    totalAmount: 54200,
    expectedDelivery: '07 Nov 2026',
    grnRef: 'GRN-2026-074',
    priority: 'Standard Restock',
    approvedBy: 'Ann Mwangi (Practice Mgr)',
    status: 'Received',
    paymentStatus: 'Paid (COD)',
    items: [
      { name: 'CaviCide High-Level Surface Disinfectant 5 Litre Canister', qty: 4, unitCost: 6800, total: 27200 },
      { name: 'Self-Sealing Autoclave Pouches 90x230mm (Box of 200)', qty: 10, unitCost: 1800, total: 18000 },
      { name: 'Class 4 Chemical Steam Indicator Strips (Box of 250)', qty: 3, unitCost: 3000, total: 9000 },
    ],
  },
  {
    id: 'LPO-2026-0189',
    issueDate: '03 Nov 2026',
    supplierId: 'SUP-KEN-101',
    supplierName: 'Nairobi Dental Supplies Ltd',
    itemsSummary: 'GC Fuji IX GP Fast Glass Ionomer Capsule Boxes (4x)',
    itemsCount: 1,
    totalAmount: 34000,
    expectedDelivery: '06 Nov 2026',
    grnRef: 'Pending GRN',
    priority: 'Standard Restock',
    approvedBy: 'Pending Lead Dentist Approval',
    status: 'Pending Approval',
    paymentStatus: 'Pending',
    items: [
      { name: 'GC Fuji IX GP Fast Posterior Glass Ionomer Capsules (Box of 50)', qty: 4, unitCost: 8500, total: 34000 },
    ],
  },
  {
    id: 'LPO-2026-0188',
    issueDate: '01 Nov 2026',
    supplierId: 'SUP-KEN-106',
    supplierName: 'Kavo & Dentsply Sirona East Africa Ltd',
    itemsSummary: 'High-Speed Turbine Ceramic Handpiece Replacement Rotor',
    itemsCount: 1,
    totalAmount: 85000,
    expectedDelivery: '15 Nov 2026',
    grnRef: 'Pending GRN',
    priority: 'Equipment Reorder',
    approvedBy: 'Dr. Sarah Kimani',
    status: 'Issued to Vendor',
    paymentStatus: 'Net 60',
    items: [
      { name: 'Kavo MASTERtorque M9000L Ceramic Bearing Replacement Rotor Kit', qty: 1, unitCost: 85000, total: 85000 },
    ],
  },
  {
    id: 'LPO-2026-0187',
    issueDate: '28 Oct 2026',
    supplierId: 'SUP-KEN-108',
    supplierName: 'BioTech Implants & Regenerative Bio-Materials',
    itemsSummary: 'Collagen Membrane Resorbable 20x30mm (2x)',
    itemsCount: 1,
    totalAmount: 36000,
    expectedDelivery: '02 Nov 2026',
    grnRef: 'Cancelled',
    priority: 'Standard Restock',
    approvedBy: 'Ann Mwangi (Practice Mgr)',
    status: 'Cancelled',
    paymentStatus: 'Void',
    items: [
      { name: 'Bio-Gide Resorbable Collagen Membrane 20x30mm', qty: 2, unitCost: 18000, total: 36000 },
    ],
  },
];

export default function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [tableDensity, setTableDensity] = useState('normal');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [activeLPO, setActiveLPO] = useState(null);

  // New LPO Form State
  const [formData, setFormData] = useState({
    supplierName: 'Nairobi Dental Supplies Ltd',
    supplierId: 'SUP-KEN-101',
    priority: 'Standard Restock',
    expectedDelivery: '',
    approvedBy: 'Dr. Sarah Kimani',
    notes: '',
    items: [
      { name: '3M Filtek Z350 Composite Syringe', qty: 10, unitCost: 4200 },
    ],
  });

  // Calculate counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: purchaseOrders.length,
      pending: purchaseOrders.filter((p) => p.status === 'Pending Approval').length,
      issued: purchaseOrders.filter((p) => p.status === 'Issued to Vendor').length,
      inTransit: purchaseOrders.filter((p) => p.status === 'In Transit').length,
      received: purchaseOrders.filter((p) => p.status === 'Received').length,
      cancelled: purchaseOrders.filter((p) => p.status === 'Cancelled').length,
    };
  }, [purchaseOrders]);

  // Tab definitions
  const tabs = [
    { id: 'All Orders', label: 'All Orders', count: tabCounts.all },
    { id: 'Pending Approval', label: 'Pending Approval', count: tabCounts.pending },
    { id: 'Issued to Vendor', label: 'Issued to Vendor', count: tabCounts.issued },
    { id: 'In Transit', label: 'In Transit', count: tabCounts.inTransit },
    { id: 'Received', label: 'Received (GRN)', count: tabCounts.received },
    { id: 'Cancelled', label: 'Cancelled', count: tabCounts.cancelled },
  ];

  // Filtered dataset
  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((p) => {
      // Tab filter
      if (activeTab !== 'All Orders' && p.status !== activeTab) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && p.status !== statusFilter) {
        return false;
      }
      // Priority filter
      if (priorityFilter !== 'ALL' && p.priority !== priorityFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.id.toLowerCase().includes(q) ||
          p.supplierName.toLowerCase().includes(q) ||
          p.itemsSummary.toLowerCase().includes(q) ||
          p.approvedBy.toLowerCase().includes(q) ||
          p.grnRef.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [purchaseOrders, activeTab, statusFilter, priorityFilter, searchQuery]);

  // Actions
  const handleViewLPO = (lpo) => {
    setActiveLPO(lpo);
    setIsDetailModalOpen(true);
  };

  const handleOpenReceiveModal = (lpo) => {
    setActiveLPO(lpo);
    setIsReceiveModalOpen(true);
  };

  const handleConfirmGRN = () => {
    if (!activeLPO) return;
    const grnNumber = `GRN-2026-${Math.floor(100 + Math.random() * 899)}`;
    setPurchaseOrders((prev) =>
      prev.map((item) =>
        item.id === activeLPO.id
          ? {
              ...item,
              status: 'Received',
              grnRef: grnNumber,
              paymentStatus: 'Approved for Payment',
            }
          : item
      )
    );
    setIsReceiveModalOpen(false);
    alert(`Success! Goods Received Note (${grnNumber}) generated and inventory stock incremented.`);
  };

  const handleCancelLPO = (id) => {
    if (window.confirm('Are you sure you want to cancel this purchase order?')) {
      setPurchaseOrders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'Cancelled', grnRef: 'Cancelled' } : item
        )
      );
    }
  };

  const handleToggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredOrders.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', qty: 1, unitCost: 1000 }],
    });
  };

  const handleRemoveItemRow = (index) => {
    if (formData.items.length <= 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, items: updated });
  };

  const handleCreateLPO = (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce(
      (sum, it) => sum + (Number(it.qty) || 0) * (Number(it.unitCost) || 0),
      0
    );
    const summary = formData.items.map((i) => `${i.name} (${i.qty}x)`).join(', ');

    const newOrder = {
      id: `LPO-2026-0${Math.floor(195 + Math.random() * 800)}`,
      issueDate: '09 Nov 2026',
      supplierId: formData.supplierId,
      supplierName: formData.supplierName,
      itemsSummary: summary.slice(0, 75) + (summary.length > 75 ? '...' : ''),
      itemsCount: formData.items.length,
      totalAmount,
      expectedDelivery: formData.expectedDelivery || '12 Nov 2026',
      grnRef: 'Pending GRN',
      priority: formData.priority,
      approvedBy: formData.approvedBy,
      status: 'Issued to Vendor',
      paymentStatus: 'Pending Invoice',
      items: formData.items.map((i) => ({
        name: i.name || 'Dental Supply Item',
        qty: Number(i.qty) || 1,
        unitCost: Number(i.unitCost) || 0,
        total: (Number(i.qty) || 1) * (Number(i.unitCost) || 0),
      })),
    };

    setPurchaseOrders([newOrder, ...purchaseOrders]);
    setIsCreateModalOpen(false);
    setFormData({
      supplierName: 'Nairobi Dental Supplies Ltd',
      supplierId: 'SUP-KEN-101',
      priority: 'Standard Restock',
      expectedDelivery: '',
      approvedBy: 'Dr. Sarah Kimani',
      notes: '',
      items: [{ name: '3M Filtek Z350 Composite Syringe', qty: 10, unitCost: 4200 }],
    });
  };

  // Define table columns
  const columns = [
    {
      key: 'select',
      header: (
        <input
          type="checkbox"
          checked={
            filteredOrders.length > 0 &&
            selectedIds.length === filteredOrders.length
          }
          onChange={handleToggleSelectAll}
          className="rounded border-slate-300 dark:border-slate-600 text-[#027A48] focus:ring-0 cursor-pointer"
        />
      ),
      width: '44px',
      align: 'center',
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => handleToggleSelectOne(row.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-slate-300 dark:border-slate-600 text-[#027A48] focus:ring-0 cursor-pointer"
        />
      ),
    },
    {
      key: 'id',
      header: 'LPO # & Date',
      sortable: true,
      width: '140px',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-100 hover:text-[#027A48] transition-colors cursor-pointer" onClick={() => handleViewLPO(row)}>
            {row.id}
          </span>
          <span className="text-[10px] text-slate-500">
            {row.issueDate}
          </span>
        </div>
      ),
    },
    {
      key: 'supplier',
      header: 'Supplier / Vendor',
      sortable: true,
      render: (row) => (
        <div className="flex flex-col max-w-[240px]">
          <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
            {row.supplierName}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            ID: {row.supplierId}
          </span>
        </div>
      ),
    },
    {
      key: 'itemsSummary',
      header: 'Requisition Items Summary',
      render: (row) => (
        <div className="flex items-center gap-2 max-w-[280px]">
          <span className="text-xs text-slate-600 dark:text-slate-300 truncate">
            {row.itemsSummary}
          </span>
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 font-mono">
            {row.itemsCount} lines
          </span>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Total Value',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
          KES {row.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'expectedDelivery',
      header: 'Expected Delivery',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <HugeiconsIcon icon={DeliveryTruck01Icon} className="w-3.5 h-3.5 text-slate-400" />
          <span>{row.expectedDelivery}</span>
        </div>
      ),
    },
    {
      key: 'grnRef',
      header: 'GRN Receipt',
      render: (row) => (
        <span className={`text-xs font-mono font-medium ${row.grnRef.startsWith('GRN') ? 'text-[#027A48]' : 'text-slate-400'}`}>
          {row.grnRef}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (row) => {
        let badgeCls = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
        if (row.priority === 'Urgent / Chairside') {
          badgeCls = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300';
        } else if (row.priority === 'Equipment Reorder') {
          badgeCls = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
        }

        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeCls}`}>
            {row.priority}
          </span>
        );
      },
    },
    {
      key: 'approvedBy',
      header: 'Approved By',
      render: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
          {row.approvedBy}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => {
        let badgeCls = 'bg-slate-100 text-slate-700 border-slate-200';
        if (row.status === 'Received') {
          badgeCls = 'bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5] dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
        } else if (row.status === 'In Transit') {
          badgeCls = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
        } else if (row.status === 'Issued to Vendor') {
          badgeCls = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
        } else if (row.status === 'Pending Approval') {
          badgeCls = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
        } else if (row.status === 'Cancelled') {
          badgeCls = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300';
        }

        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeCls}`}>
            {row.status === 'Received' && <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-3 h-3" />}
            {row.status === 'In Transit' && <HugeiconsIcon icon={DeliveryTruck01Icon} className="w-3 h-3" />}
            {row.status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      width: '60px',
      render: (row) => (
        <RowActionDropdown
          items={[
            {
              label: 'View Purchase Order',
              icon: EyeIcon,
              onClick: () => handleViewLPO(row),
            },
            ...(row.status !== 'Received' && row.status !== 'Cancelled'
              ? [
                  {
                    label: 'Receive Goods & Generate GRN',
                    icon: PackageReceiveIcon,
                    onClick: () => handleOpenReceiveModal(row),
                  },
                ]
              : []),
            {
              label: 'Email LPO to Supplier',
              icon: Mail01Icon,
              onClick: () => alert(`Sending purchase order ${row.id} via email to ${row.supplierName}...`),
            },
            {
              label: 'Print Official LPO',
              icon: PrinterIcon,
              onClick: () => alert(`Printing official LPO voucher ${row.id}...`),
            },
            ...(row.status !== 'Cancelled'
              ? [
                  {
                    label: 'Cancel Purchase Order',
                    icon: Cancel01Icon,
                    isDestructive: true,
                    onClick: () => handleCancelLPO(row.id),
                  },
                ]
              : []),
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Page Header */}
      <PageHeader
        title="Purchase Orders"
        subtitle="Manage Local Purchase Orders (LPOs), supplier requisition tracking, and Goods Received Notes (GRN)."
        badge={`${filteredOrders.length} Orders`}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search LPO #, supplier name, item, or requisitioned by..."
        filters={[
          {
            label: 'Priority',
            options: [
              { value: 'ALL', label: 'All Priorities' },
              { value: 'Urgent / Chairside', label: 'Urgent / Chairside' },
              { value: 'Standard Restock', label: 'Standard Restock' },
              { value: 'Equipment Reorder', label: 'Equipment Reorder' },
            ],
            value: priorityFilter,
            onChange: setPriorityFilter,
          },
          {
            label: 'Status',
            options: [
              { value: 'ALL', label: 'All Statuses' },
              { value: 'Pending Approval', label: 'Pending Approval' },
              { value: 'Issued to Vendor', label: 'Issued to Vendor' },
              { value: 'In Transit', label: 'In Transit' },
              { value: 'Received', label: 'Received (GRN)' },
              { value: 'Cancelled', label: 'Cancelled' },
            ],
            value: statusFilter,
            onChange: setStatusFilter,
          },
        ]}
        density={tableDensity}
        onDensityChange={setTableDensity}
        addLabel="Create Purchase Order"
        onAdd={() => setIsCreateModalOpen(true)}
        onLearnClick={() => setIsLearnModalOpen(true)}
        menuItems={[
          {
            label: 'Export Orders (CSV)',
            icon: Download01Icon,
            onClick: () => alert('Exporting purchase orders log to CSV...'),
          },
          {
            label: 'Download Procurement Summary',
            icon: Doc01Icon,
            onClick: () => alert('Generating monthly procurement summary...'),
          },
          {
            label: 'Print Selected LPOs',
            icon: PrinterIcon,
            onClick: () => window.print(),
          },
        ]}
      />

      {/* Main Table Content */}
      <div className="flex-1 p-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredOrders}
            density={tableDensity}
            keyField="id"
            onRowClick={(row) => handleViewLPO(row)}
            emptyMessage={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-3">
                  <HugeiconsIcon icon={Invoice01Icon} className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  No purchase orders found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                  {searchQuery
                    ? `No purchase orders matching "${searchQuery}". Try modifying your filter criteria.`
                    : 'Generate Local Purchase Orders (LPO) to restock clinic materials or commission prosthetic lab work.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#027A48] rounded-lg hover:bg-[#02683E] transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4" />
                  Create First LPO
                </button>
              </div>
            }
          />
        </div>
      </div>

      {/* ─── Create Purchase Order Modal ──────────────────────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/60 flex items-center justify-center text-[#027A48]">
                  <HugeiconsIcon icon={Invoice01Icon} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Create Local Purchase Order (LPO)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Itemized dental supply requisition and approval authorization
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLPO} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Supplier / Vendor *
                  </label>
                  <select
                    value={formData.supplierName}
                    onChange={(e) => {
                      const name = e.target.value;
                      const idMap = {
                        'Nairobi Dental Supplies Ltd': 'SUP-KEN-101',
                        'MedPlus Surgical & Pharma Ltd': 'SUP-KEN-102',
                        'East Africa Oral Surgery & Implants Supply': 'SUP-KEN-103',
                        'Apex Dental Prosthetics & Milling Lab': 'SUP-KEN-104',
                        'SafeSteril Healthcare & PPE Solutions': 'SUP-KEN-105',
                      };
                      setFormData({
                        ...formData,
                        supplierName: name,
                        supplierId: idMap[name] || 'SUP-KEN-100',
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Nairobi Dental Supplies Ltd">Nairobi Dental Supplies Ltd</option>
                    <option value="MedPlus Surgical & Pharma Ltd">MedPlus Surgical & Pharma Ltd</option>
                    <option value="East Africa Oral Surgery & Implants Supply">East Africa Oral Surgery Supply</option>
                    <option value="Apex Dental Prosthetics & Milling Lab">Apex Dental Prosthetics Lab</option>
                    <option value="SafeSteril Healthcare & PPE Solutions">SafeSteril Healthcare Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Order Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Standard Restock">Standard Restock</option>
                    <option value="Urgent / Chairside">Urgent / Chairside Emergency</option>
                    <option value="Equipment Reorder">Equipment / Handpiece Reorder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Authorized Signatory
                  </label>
                  <input
                    type="text"
                    value={formData.approvedBy}
                    onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Requisitioned Line Items
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#027A48] hover:underline cursor-pointer"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} className="w-3.5 h-3.5" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                    >
                      <input
                        type="text"
                        placeholder="Item Description (e.g. Septanest Articaine 4%)"
                        value={item.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                        className="w-16 px-2.5 py-1 text-xs text-right rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(idx, 'unitCost', e.target.value)}
                        className="w-24 px-2.5 py-1 text-xs text-right font-mono rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                      />
                      <div className="w-28 text-right font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                        KES {((Number(item.qty) || 0) * (Number(item.unitCost) || 0)).toLocaleString()}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItemRow(idx)}
                        disabled={formData.items.length <= 1}
                        className="text-slate-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer p-1"
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Estimated LPO Subtotal</span>
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                      KES{' '}
                      {formData.items
                        .reduce((acc, curr) => acc + (Number(curr.qty) || 0) * (Number(curr.unitCost) || 0), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] shadow-xs cursor-pointer"
                >
                  Issue Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── View Purchase Order Modal ────────────────────────────────────── */}
      {isDetailModalOpen && activeLPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/60 flex items-center justify-center text-[#027A48]">
                  <HugeiconsIcon icon={Invoice01Icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {activeLPO.id}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>Issued: {activeLPO.issueDate}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{activeLPO.supplierName}</span>
                    <span>•</span>
                    <span className="text-[#027A48] font-medium">{activeLPO.status}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* LPO Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Total Order Value
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 block">
                    KES {activeLPO.totalAmount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Payment: {activeLPO.paymentStatus}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Receiving Reference (GRN)
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 block">
                    {activeLPO.grnRef}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    Expected: {activeLPO.expectedDelivery}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Priority / Tier
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {activeLPO.priority}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Approved: {activeLPO.approvedBy}
                  </span>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Itemized Order Details
                  </h4>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeLPO.items.map((line, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-2.5 text-xs">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{line.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {line.qty} units @ KES {line.unitCost.toLocaleString()}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        KES {line.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Printing official LPO document ${activeLPO.id}...`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <HugeiconsIcon icon={PrinterIcon} className="w-3.5 h-3.5" />
                    Print LPO
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Emailing LPO ${activeLPO.id} to vendor...`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Mail01Icon} className="w-3.5 h-3.5" />
                    Send to Supplier
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {activeLPO.status !== 'Received' && activeLPO.status !== 'Cancelled' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        handleOpenReceiveModal(activeLPO);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
                    >
                      Receive Goods (GRN)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Receive Goods / Generate GRN Modal ───────────────────────────── */}
      {isReceiveModalOpen && activeLPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/60 flex items-center justify-center text-[#027A48]">
                  <HugeiconsIcon icon={PackageReceiveIcon} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Receive Shipment & Generate GRN
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Verify delivered items against {activeLPO.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReceiveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <p className="font-medium">
                  Confirm receipt from <span className="font-bold">{activeLPO.supplierName}</span>:
                </p>
                <p className="text-[11px] mt-1 text-emerald-700 dark:text-emerald-400">
                  {activeLPO.itemsSummary}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Delivery Note / Carrier Waybill #
                  </label>
                  <input
                    type="text"
                    defaultValue="DN-99401-NDS"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inspection / Condition Assessment
                  </label>
                  <select
                    defaultValue="Intact / Full Batch Verified"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Intact / Full Batch Verified">Intact / Full Batch Verified & Sealed</option>
                    <option value="Partial Delivery">Partial Delivery (Balance Backordered)</option>
                    <option value="Damaged Sealed Pack">Damaged Sealed Pack (Claim Required)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dispensary Storage Bin Assigned
                  </label>
                  <input
                    type="text"
                    defaultValue="Cabinet A1 (Chairside Restoratives)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsReceiveModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmGRN}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] shadow-xs cursor-pointer"
                >
                  Confirm & Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Educational Learn Modal ───────────────────────────────────────── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
                  <HugeiconsIcon icon={Idea01Icon} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Dental Procurement & LPO Best Practices
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Understanding 3-way matching and receipt controls
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  The 3-Way Matching Protocol
                </h4>
                <p className="leading-relaxed">
                  Before any supplier payment is released, accounts cross-reference three items: the authorized Local Purchase Order (LPO), the Goods Received Note (GRN) signed by clinic staff, and the vendor's electronic tax invoice.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Cold Chain & Sterile Seal Verification
                </h4>
                <p className="leading-relaxed">
                  Upon receipt of biomaterials (such as bone grafts) and local anesthetics, confirm thermal cold chain integrity and manufacturer tamper-evident seals before signing the carrier delivery note.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Automated Stock Replenishment
                </h4>
                <p className="leading-relaxed">
                  When inventory items reach their configured Minimum Reorder Point in the Inventory module, drafts can automatically be queued here for lead dentist authorization.
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

