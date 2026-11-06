import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const tabTitles = {
    dashboard: 'Dashboard',
    reservations: 'Reservations & Schedule',
    patients: 'Patient Directory',
    treatments: 'Treatments & Procedures',
    staff: 'Staff & Role Management',
    accounts: 'Accounts & Ledger',
    sales: 'Sales & Invoices',
    insurance: 'Insurance & SHA Claims',
    stocks: 'Stock & Inventory',
    expenses: 'Expense Management',
    report: 'Reports & Analytics',
    support: 'Customer Support',
    settings: 'Clinic Settings'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-800">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={tabTitles[activeTab] || 'Dashboard'} />
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
