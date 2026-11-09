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
  CallIcon,
  Mail01Icon,
  Location01Icon,
  CheckmarkCircle01Icon,
  Invoice01Icon,
  ShieldCheckIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Suppliers & Dental Labs ────────────────────
const INITIAL_SUPPLIERS = [
  {
    id: 'SUP-KEN-101',
    code: 'NDS-01',
    name: 'Nairobi Dental Supplies Ltd',
    kraPin: 'P051294812Z',
    category: 'Dental Consumables',
    contactPerson: 'David Karani',
    phone: '+254 722 894 120',
    email: 'orders@nairobidental.co.ke',
    location: 'Upper Hill Medical Plaza, 3rd Floor, Nairobi',
    paymentTerms: 'Net 30 Days',
    leadTime: '24-48 Hours',
    rating: '4.9 ★ (Preferred)',
    openPayables: 245000,
    status: 'Preferred Partner',
    catalogItems: 42,
    activeLPOs: 2,
    bankDetails: 'NCBA Bank Kenya - Acc 8849102941',
  },
  {
    id: 'SUP-KEN-102',
    code: 'MPS-02',
    name: 'MedPlus Surgical & Pharma Ltd',
    kraPin: 'P051482910M',
    category: 'Pharmaceutical & Anesthetics',
    contactPerson: 'Grace Wanjiku',
    phone: '+254 733 451 902',
    email: 'supply@medpluspharma.co.ke',
    location: 'Industrial Area, Commercial Street, Nairobi',
    paymentTerms: 'Net 15 Days',
    leadTime: 'Same Day / 24h',
    rating: '4.8 ★',
    openPayables: 89400,
    status: 'Active',
    catalogItems: 28,
    activeLPOs: 1,
    bankDetails: 'Stanbic Bank Kenya - Acc 010049281',
  },
  {
    id: 'SUP-KEN-103',
    code: 'EAO-03',
    name: 'East Africa Oral Surgery & Implants Supply',
    kraPin: 'P051940124K',
    category: 'Equipment & Implants',
    contactPerson: 'Dr. Tariq Al-Mansoor',
    phone: '+254 710 682 341',
    email: 'implants@ea-oralsurgery.com',
    location: 'Parklands Avenue, Doctors Plaza Suite 12',
    paymentTerms: 'Advance 50% / Balance Net 30',
    leadTime: '3-5 Days',
    rating: '4.9 ★ (Specialized)',
    openPayables: 420000,
    status: 'Preferred Partner',
    catalogItems: 19,
    activeLPOs: 3,
    bankDetails: 'Standard Chartered Kenya - Acc 930128471',
  },
  {
    id: 'SUP-KEN-104',
    code: 'ADL-04',
    name: 'Apex Dental Prosthetics & Milling Lab',
    kraPin: 'P052019482X',
    category: 'Prosthetic & Crown Labs',
    contactPerson: 'Martin Ochieng (Master CDT)',
    phone: '+254 721 559 813',
    email: 'cases@apexdentallab.co.ke',
    location: 'Kilimani, Argwings Kodhek Rd, Nairobi',
    paymentTerms: 'Weekly Statement (Net 7)',
    leadTime: '48-72 Hours (Zirconia)',
    rating: '4.9 ★ (Certified CAD/CAM)',
    openPayables: 156000,
    status: 'Preferred Partner',
    catalogItems: 15,
    activeLPOs: 4,
    bankDetails: 'KCB Bank Kenya - Acc 129038472',
  },
  {
    id: 'SUP-KEN-105',
    code: 'SSK-05',
    name: 'SafeSteril Healthcare & PPE Solutions',
    kraPin: 'P051772183C',
    category: 'Sterilization & PPE',
    contactPerson: 'Beatrice Ndinda',
    phone: '+254 705 918 273',
    email: 'info@safesteril.co.ke',
    location: 'Mombasa Road, Gateway Park Block C',
    paymentTerms: 'COD (Cash On Delivery)',
    leadTime: '24 Hours',
    rating: '4.6 ★',
    openPayables: 0,
    status: 'Active',
    catalogItems: 34,
    activeLPOs: 0,
    bankDetails: 'Equity Bank Kenya - Acc 01802938472',
  },
  {
    id: 'SUP-KEN-106',
    code: 'KDX-06',
    name: 'Kavo & Dentsply Sirona East Africa Ltd',
    kraPin: 'P051009182L',
    category: 'Equipment & Implants',
    contactPerson: 'Eng. Nicholas Bett',
    phone: '+254 728 392 018',
    email: 'techsupport@dentsply-ea.com',
    location: 'Westlands, The Oval 6th Floor',
    paymentTerms: 'Net 60 Days (Service Contracts)',
    leadTime: '7-14 Days (Import Parts)',
    rating: '4.7 ★ (OEM Certified)',
    openPayables: 580000,
    status: 'Active',
    catalogItems: 56,
    activeLPOs: 1,
    bankDetails: 'Absa Bank Kenya - Acc 0309182741',
  },
  {
    id: 'SUP-KEN-107',
    code: 'QCL-07',
    name: 'QuickClean Dental Autoclave & Gas Services',
    kraPin: 'P051662910R',
    category: 'Sterilization & PPE',
    contactPerson: 'Samuel Mwaura',
    phone: '+254 734 817 293',
    email: 'service@quickcleandental.com',
    location: 'Kikuyu Road, Dagoretti Corner',
    paymentTerms: 'Net 15 Days',
    leadTime: '24 Hours',
    rating: '4.2 ★',
    openPayables: 32000,
    status: 'Under Review',
    catalogItems: 8,
    activeLPOs: 0,
    bankDetails: 'Co-operative Bank - Acc 011293847291',
  },
  {
    id: 'SUP-KEN-108',
    code: 'BTI-08',
    name: 'BioTech Implants & Regenerative Bio-Materials',
    kraPin: 'P051882941P',
    category: 'Equipment & Implants',
    contactPerson: 'Hannah Chemutai',
    phone: '+254 715 092 384',
    email: 'orders@biotechimplants.co.ke',
    location: 'Yaya Centre Towers, 5th Floor',
    paymentTerms: 'Advance 100%',
    leadTime: '5-7 Days',
    rating: '3.9 ★',
    openPayables: 0,
    status: 'On Hold',
    catalogItems: 12,
    activeLPOs: 0,
    bankDetails: 'NCBA Bank Kenya - Acc 884019284',
  },
];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [activeTab, setActiveTab] = useState('All Suppliers');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [termsFilter, setTermsFilter] = useState('ALL');
  const [tableDensity, setTableDensity] = useState('normal');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [activeSupplier, setActiveSupplier] = useState(null);

  // New Supplier Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    kraPin: '',
    category: 'Dental Consumables',
    contactPerson: '',
    phone: '',
    email: '',
    location: '',
    paymentTerms: 'Net 30 Days',
    leadTime: '24-48 Hours',
    bankDetails: '',
    status: 'Active',
  });

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return {
      all: suppliers.length,
      consumables: suppliers.filter((s) => s.category === 'Dental Consumables').length,
      labs: suppliers.filter((s) => s.category === 'Prosthetic & Crown Labs').length,
      equipment: suppliers.filter((s) => s.category === 'Equipment & Implants').length,
      pharma: suppliers.filter((s) => s.category === 'Pharmaceutical & Anesthetics').length,
      steril: suppliers.filter((s) => s.category === 'Sterilization & PPE').length,
    };
  }, [suppliers]);

  // Tab definitions
  const tabs = [
    { id: 'All Suppliers', label: 'All Suppliers', count: categoryCounts.all },
    { id: 'Dental Consumables', label: 'Dental Consumables', count: categoryCounts.consumables },
    { id: 'Prosthetic & Crown Labs', label: 'Prosthetic Labs', count: categoryCounts.labs },
    { id: 'Equipment & Implants', label: 'Equipment & Implants', count: categoryCounts.equipment },
    { id: 'Pharmaceutical & Anesthetics', label: 'Pharma & Anesthetics', count: categoryCounts.pharma },
    { id: 'Sterilization & PPE', label: 'Sterilization & PPE', count: categoryCounts.steril },
  ];

  // Filtered dataset
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      // Tab filter
      if (activeTab !== 'All Suppliers' && s.category !== activeTab) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && s.status !== statusFilter) {
        return false;
      }
      // Terms filter
      if (termsFilter !== 'ALL' && !s.paymentTerms.toLowerCase().includes(termsFilter.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.kraPin.toLowerCase().includes(q) ||
          s.contactPerson.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [suppliers, activeTab, statusFilter, termsFilter, searchQuery]);

  // Actions
  const handleViewSupplier = (supplier) => {
    setActiveSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleDeleteSupplier = (id) => {
    if (window.confirm('Are you sure you want to remove this supplier from your directory?')) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleToggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredSuppliers.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateSupplier = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in required fields (Supplier Name & Phone).');
      return;
    }
    const newSupplier = {
      id: `SUP-KEN-${Math.floor(100 + Math.random() * 900)}`,
      code: formData.code || `VND-${Math.floor(10 + Math.random() * 89)}`,
      name: formData.name,
      kraPin: formData.kraPin || 'P05' + Math.floor(10000000 + Math.random() * 90000000) + 'X',
      category: formData.category,
      contactPerson: formData.contactPerson || 'Vendor Rep',
      phone: formData.phone,
      email: formData.email || 'orders@vendor.co.ke',
      location: formData.location || 'Nairobi, Kenya',
      paymentTerms: formData.paymentTerms,
      leadTime: formData.leadTime,
      rating: '4.8 ★',
      openPayables: 0,
      status: formData.status,
      catalogItems: 0,
      activeLPOs: 0,
      bankDetails: formData.bankDetails || 'KCB Bank Kenya',
    };
    setSuppliers([newSupplier, ...suppliers]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      code: '',
      kraPin: '',
      category: 'Dental Consumables',
      contactPerson: '',
      phone: '',
      email: '',
      location: '',
      paymentTerms: 'Net 30 Days',
      leadTime: '24-48 Hours',
      bankDetails: '',
      status: 'Active',
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
            filteredSuppliers.length > 0 &&
            selectedIds.length === filteredSuppliers.length
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
      key: 'code',
      header: 'Vendor ID & Tax PIN',
      sortable: true,
      width: '150px',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-100">
            {row.id}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            PIN: {row.kraPin}
          </span>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Company & Facility',
      sortable: true,
      render: (row) => (
        <div className="flex flex-col max-w-[280px]">
          <span className="font-medium text-slate-900 dark:text-slate-100 truncate hover:text-[#027A48] transition-colors cursor-pointer" onClick={() => handleViewSupplier(row)}>
            {row.name}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
            <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 shrink-0" />
            {row.location}
          </span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (row) => {
        let badgeStyle = 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        if (row.category === 'Prosthetic & Crown Labs') {
          badgeStyle = 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800';
        } else if (row.category === 'Equipment & Implants') {
          badgeStyle = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        } else if (row.category === 'Pharmaceutical & Anesthetics') {
          badgeStyle = 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800';
        } else if (row.category === 'Sterilization & PPE') {
          badgeStyle = 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        }

        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeStyle}`}>
            {row.category}
          </span>
        );
      },
    },
    {
      key: 'contact',
      header: 'Primary Contact & Phone',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {row.contactPerson}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <HugeiconsIcon icon={CallIcon} className="w-3 h-3 text-slate-400" />
            {row.phone}
          </span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email / Orders Desk',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 font-mono truncate max-w-[200px]">
          {row.email}
        </span>
      ),
    },
    {
      key: 'paymentTerms',
      header: 'Payment Terms',
      sortable: true,
      render: (row) => (
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {row.paymentTerms}
        </span>
      ),
    },
    {
      key: 'leadTime',
      header: 'Lead Time',
      sortable: true,
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {row.leadTime}
        </span>
      ),
    },
    {
      key: 'openPayables',
      header: 'Open Balance',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className={`font-mono text-xs font-semibold ${row.openPayables > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
          {row.openPayables > 0 ? `KES ${row.openPayables.toLocaleString()}` : 'KES 0'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => {
        let badgeCls = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
        if (row.status === 'Preferred Partner') {
          badgeCls = 'bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5] dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
        } else if (row.status === 'Active') {
          badgeCls = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300';
        } else if (row.status === 'Under Review') {
          badgeCls = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
        } else if (row.status === 'On Hold') {
          badgeCls = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300';
        }

        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeCls}`}>
            {row.status === 'Preferred Partner' && '★ '}
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
              label: 'View Vendor Dossier',
              icon: EyeIcon,
              onClick: () => handleViewSupplier(row),
            },
            {
              label: 'Send Email / Order Request',
              icon: Mail01Icon,
              onClick: () => alert(`Opening email client to ${row.email}...`),
            },
            {
              label: 'Call Representative',
              icon: CallIcon,
              onClick: () => alert(`Calling ${row.contactPerson} at ${row.phone}...`),
            },
            {
              label: 'Print Vendor Sheet',
              icon: PrinterIcon,
              onClick: () => alert(`Printing vendor sheet for ${row.name}...`),
            },
            {
              label: 'Edit Supplier Info',
              icon: PencilEdit01Icon,
              onClick: () => {
                setActiveSupplier(row);
                setFormData({
                  name: row.name,
                  code: row.code,
                  kraPin: row.kraPin,
                  category: row.category,
                  contactPerson: row.contactPerson,
                  phone: row.phone,
                  email: row.email,
                  location: row.location,
                  paymentTerms: row.paymentTerms,
                  leadTime: row.leadTime,
                  bankDetails: row.bankDetails,
                  status: row.status,
                });
                setIsAddModalOpen(true);
              },
            },
            {
              label: 'Remove from Directory',
              icon: Delete02Icon,
              isDestructive: true,
              onClick: () => handleDeleteSupplier(row.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Page Header */}
      <PageHeader
        title="Suppliers"
        subtitle="Manage certified dental equipment vendors, consumable distributors, and custom prosthetic dental labs."
        badge={`${filteredSuppliers.length} Vendors`}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search vendor name, KRA PIN, category, or contact..."
        filters={[
          {
            label: 'Terms',
            options: [
              { value: 'ALL', label: 'All Terms' },
              { value: 'Net 30', label: 'Net 30 Days' },
              { value: 'Net 15', label: 'Net 15 Days' },
              { value: 'COD', label: 'Cash on Delivery (COD)' },
              { value: 'Advance', label: 'Advance Payment' },
            ],
            value: termsFilter,
            onChange: setTermsFilter,
          },
          {
            label: 'Status',
            options: [
              { value: 'ALL', label: 'All Statuses' },
              { value: 'Preferred Partner', label: 'Preferred Partners' },
              { value: 'Active', label: 'Active' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'On Hold', label: 'On Hold' },
            ],
            value: statusFilter,
            onChange: setStatusFilter,
          },
        ]}
        density={tableDensity}
        onDensityChange={setTableDensity}
        addLabel="Add Supplier"
        onAdd={() => {
          setFormData({
            name: '',
            code: '',
            kraPin: '',
            category: 'Dental Consumables',
            contactPerson: '',
            phone: '',
            email: '',
            location: '',
            paymentTerms: 'Net 30 Days',
            leadTime: '24-48 Hours',
            bankDetails: '',
            status: 'Active',
          });
          setIsAddModalOpen(true);
        }}
        onLearnClick={() => setIsLearnModalOpen(true)}
        menuItems={[
          {
            label: 'Export Suppliers (CSV)',
            icon: Download01Icon,
            onClick: () => alert('Exporting suppliers directory to CSV...'),
          },
          {
            label: 'Import Suppliers (Excel)',
            icon: Upload01Icon,
            onClick: () => alert('Opening supplier import wizard...'),
          },
          {
            label: 'Print Certified Vendor List',
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
            data={filteredSuppliers}
            density={tableDensity}
            keyField="id"
            onRowClick={(row) => handleViewSupplier(row)}
            emptyMessage={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-3">
                  <HugeiconsIcon icon={Building01Icon} className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  No suppliers found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                  {searchQuery
                    ? `No suppliers matching "${searchQuery}". Try clearing search filters.`
                    : 'Get started by adding your clinic’s verified dental suppliers and dental laboratories.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#027A48] rounded-lg hover:bg-[#02683E] transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4" />
                  Add First Supplier
                </button>
              </div>
            }
          />
        </div>
      </div>

      {/* ─── Add / Edit Supplier Modal ────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/60 flex items-center justify-center text-[#027A48]">
                  <HugeiconsIcon icon={Building01Icon} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {formData.code ? 'Edit Supplier Record' : 'Register New Dental Supplier / Lab'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Vendor compliance, tax identifier, and delivery logistics
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSupplier} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Laboratory Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Apex Dental Prosthetics Ltd"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Dental Consumables">Dental Consumables</option>
                    <option value="Prosthetic & Crown Labs">Prosthetic & Crown Labs</option>
                    <option value="Equipment & Implants">Equipment & Implants</option>
                    <option value="Pharmaceutical & Anesthetics">Pharmaceutical & Anesthetics</option>
                    <option value="Sterilization & PPE">Sterilization & PPE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    KRA PIN (Tax ID)
                  </label>
                  <input
                    type="text"
                    value={formData.kraPin}
                    onChange={(e) => setFormData({ ...formData, kraPin: e.target.value })}
                    placeholder="e.g. P051294812Z"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Contact Person
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. David Karani (Sales Rep)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 722 000 000"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Orders Desk Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="orders@vendor.co.ke"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Net 30 Days">Net 30 Days</option>
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 60 Days">Net 60 Days</option>
                    <option value="COD (Cash On Delivery)">COD (Cash On Delivery)</option>
                    <option value="Advance 50% / Balance Net 30">Advance 50% / Balance Net 30</option>
                    <option value="Advance 100%">Advance 100%</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Physical Address / Delivery Hub
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Building, Street, Town"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Typical Lead Time
                  </label>
                  <input
                    type="text"
                    value={formData.leadTime}
                    onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                    placeholder="e.g. 24-48 Hours"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#027A48]"
                  >
                    <option value="Active">Active</option>
                    <option value="Preferred Partner">Preferred Partner</option>
                    <option value="Under Review">Under Review</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] shadow-xs cursor-pointer"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Supplier Dossier Modal ───────────────────────────────────────── */}
      {isDetailModalOpen && activeSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-850 rounded-xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/60 flex items-center justify-center text-[#027A48]">
                  <HugeiconsIcon icon={Building01Icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {activeSupplier.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>{activeSupplier.id}</span>
                    <span>•</span>
                    <span>KRA PIN: {activeSupplier.kraPin}</span>
                    <span>•</span>
                    <span className="text-[#027A48] font-sans font-medium">{activeSupplier.rating}</span>
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
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Outstanding Payable
                  </span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 block">
                    KES {activeSupplier.openPayables.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Terms: {activeSupplier.paymentTerms}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Active Purchase Orders
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {activeSupplier.activeLPOs} Open LPOs
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    Lead time: {activeSupplier.leadTime}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Catalog Coverage
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {activeSupplier.catalogItems} Linked Items
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Category: {activeSupplier.category}
                  </span>
                </div>
              </div>

              {/* Vendor Logistics & Settlement Details */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Logistics & Banking Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Contact</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{activeSupplier.contactPerson}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{activeSupplier.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Orders Desk Email</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 font-mono">{activeSupplier.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Settlement Account</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{activeSupplier.bankDetails}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Physical Warehouse / Lab Location</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{activeSupplier.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                    <HugeiconsIcon icon={ShieldCheckIcon} className="w-3.5 h-3.5" />
                    Verified Dental Vendor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Generating new LPO for ${activeSupplier.name}...`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
                  >
                    Create Purchase Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
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
                    Dental Supply Chain & Vendor Management
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Best practices for procurement, lab turnaround, and tax compliance
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
                  Dental Laboratory SLA & Remake Tracking
                </h4>
                <p className="leading-relaxed">
                  Crown and bridge fabrications (e.g., Zirconia, E.max) require rigorous turnaround time monitoring to prevent patient appointment rescheduling. Keep lab turnaround records up to date.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  KRA eTIMS & Tax Identification (PIN)
                </h4>
                <p className="leading-relaxed">
                  Ensure all supplier invoices are accompanied by compliant electronic tax invoices (eTIMS) with verified vendor PINs before scheduling payments or claiming business expenses.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Consolidated Payment Terms & Discounts
                </h4>
                <p className="leading-relaxed">
                  Consolidate recurring monthly restorative and disposable orders with preferred vendors to negotiate volume tier discounts and extended Net-30 credit terms.
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
