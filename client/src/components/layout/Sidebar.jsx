import React from 'react';
import {
  DashboardSquare01Icon,
  Calendar01Icon,
  UserGroupIcon,
  Medicine01Icon,
  UserStaffIcon,
  Invoice01Icon,
  ChartHistogramIcon,
  PackageIcon,
  Settings02Icon,
  CustomerSupportIcon,
  Building01Icon,
  ToothIcon
} from '@hugeicons/react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuSections = [
    {
      title: null, // Top single items
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardSquare01Icon }
      ]
    },
    {
      title: 'CLINIC',
      items: [
        { id: 'reservations', label: 'Reservations', icon: Calendar01Icon },
        { id: 'patients', label: 'Patients', icon: UserGroupIcon },
        { id: 'treatments', label: 'Treatments', icon: Medicine01Icon },
        { id: 'staff', label: 'Staff List', icon: UserStaffIcon }
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { id: 'accounts', label: 'Accounts', icon: Invoice01Icon },
        { id: 'sales', label: 'Sales & Invoices', icon: ChartHistogramIcon },
        { id: 'insurance', label: 'Insurance & Claims', icon: Building01Icon }
      ]
    },
    {
      title: 'PHYSICAL ASSET',
      items: [
        { id: 'stocks', label: 'Stocks & Inventory', icon: PackageIcon },
        { id: 'expenses', label: 'Expenses', icon: Invoice01Icon }
      ]
    },
    {
      title: 'OTHER',
      items: [
        { id: 'report', label: 'Reports', icon: ChartHistogramIcon },
        { id: 'support', label: 'Customer Support', icon: CustomerSupportIcon },
        { id: 'settings', label: 'Settings', icon: Settings02Icon }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-150 flex flex-col justify-between h-screen sticky top-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-200">
            <ToothIcon size={22} color="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
              Smilux<span className="text-blue-600">.</span>
            </h1>
            <p className="text-[11px] font-medium text-slate-400 mt-1">Dental Practice SaaS</p>
          </div>
        </div>

        {/* Clinic Switcher Card */}
        <div className="mx-4 my-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200/80 flex items-center justify-center text-slate-600">
            <Building01Icon size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-800 truncate">Avicena Clinic</p>
            <p className="text-[10px] text-slate-400 truncate">845 Euclid Avenue, CA</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={18} color={isActive ? '#2563EB' : '#64748B'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
        Smilux v1.0.0 &copy; 2026
      </div>
    </aside>
  );
}
