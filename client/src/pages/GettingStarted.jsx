import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle01Icon,
  Cancel01Icon,
  PlayIcon,
  HelpCircleIcon,
  ArrowRight01Icon,
  Settings01Icon,
  UserGroupIcon,
  Calendar01Icon,
  Invoice01Icon,
  PackageIcon,
  ViewOffIcon,
  Message01Icon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons';

// ─── SVG Mock Chart Icons for the Video Tour Preview Container ──────────────
function MiniBarChart() {
  return (
    <div className="flex items-end gap-1.5 h-36 w-full pt-4 px-2 border-b border-l border-slate-200">
      <div className="w-1/8 bg-slate-300 h-[25%] rounded-t-xs" />
      <div className="w-1/8 bg-rose-500 h-[40%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-300 h-[15%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-400 h-[30%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-300 h-[55%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-400 h-[20%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-500 h-[92%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-300 h-[35%] rounded-t-xs" />
    </div>
  );
}

function MiniScatterPlot() {
  return (
    <div className="relative h-36 w-full p-2 border-b border-l border-slate-200 bg-slate-50/50">
      {/* Dots mimicking scatter plot */}
      <span className="absolute top-6 left-8 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-10 left-12 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-8 left-16 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-14 left-20 h-1.5 w-1.5 rounded-full bg-rose-500" />
      <span className="absolute top-16 left-10 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-20 left-14 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-24 left-22 h-1.5 w-1.5 rounded-full bg-amber-500" />
      <span className="absolute top-12 left-26 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-18 left-30 h-1.5 w-1.5 rounded-full bg-slate-600" />
      <span className="absolute top-28 left-28 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-8 left-34 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-22 left-38 h-1.5 w-1.5 rounded-full bg-rose-400" />
      <span className="absolute top-14 left-42 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-20 left-48 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-16 left-52 h-1.5 w-1.5 rounded-full bg-slate-600" />
      <span className="absolute top-26 left-56 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-10 left-60 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-18 left-64 h-1.5 w-1.5 rounded-full bg-slate-500" />
    </div>
  );
}

function MiniPieChart() {
  return (
    <div className="flex flex-col items-center justify-center h-36 w-full p-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {/* Main Slice (Slate 85%) */}
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#64748b"
            strokeWidth="31.8"
            strokeDasharray="85 15"
            strokeDashoffset="0"
          />
          {/* Secondary Slice (Amber 10%) */}
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#f59e0b"
            strokeWidth="31.8"
            strokeDasharray="10 90"
            strokeDashoffset="-85"
          />
          {/* Third Slice (Rose 5%) */}
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#ef4444"
            strokeWidth="31.8"
            strokeDasharray="5 95"
            strokeDashoffset="-95"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" /> 12+ months (85%)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 6-12 mos
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Past due
        </span>
      </div>
    </div>
  );
}

// ─── Main Getting Started Page Component ─────────────────────────────────────
export default function GettingStarted() {
  const navigate = useNavigate();

  // Active section & sub-item
  const [activeGroup, setActiveGroup] = useState('setup');
  const [activeItem, setActiveItem] = useState('overview');

  // Help dropdown state
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Completed tasks checklist state
  const [completedTasks, setCompletedTasks] = useState({
    overview: true,
    account_settings: false,
    clinic_operations: false,
    team: false,
    records: false,
    billing: false,
    inventory: false,
  });

  const toggleTaskCompletion = (key) => {
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Onboarding groups & items
  const ONBOARDING_GROUPS = [
    {
      id: 'setup',
      title: 'Setup',
      items: [
        { id: 'overview', label: 'Overview', icon: InformationCircleIcon },
        { id: 'account_settings', label: 'Account settings', icon: Settings01Icon },
      ],
    },
    {
      id: 'operations',
      title: 'Clinic operations',
      items: [
        { id: 'appointments', label: 'Appointments & Scheduling', icon: Calendar01Icon },
        { id: 'patients', label: 'Patient Directory & History', icon: UserGroupIcon },
      ],
    },
    {
      id: 'team',
      title: 'Team',
      items: [
        { id: 'dentists', label: 'Dentists & Hygienists', icon: UserGroupIcon },
        { id: 'roles', label: 'Roles & Staff Permissions', icon: Settings01Icon },
      ],
    },
    {
      id: 'records',
      title: 'Dental Charting',
      items: [
        { id: 'charting', label: 'Interactive Odontogram', icon: CheckmarkCircle01Icon },
        { id: 'treatment_plans', label: 'Treatment Plans & SOPs', icon: Settings01Icon },
      ],
    },
    {
      id: 'billing',
      title: 'Billing & Claims',
      items: [
        { id: 'invoices', label: 'Invoices & Fee Schedule', icon: Invoice01Icon },
        { id: 'mpesa_sha', label: 'M-Pesa STK & SHA Kenya', icon: Invoice01Icon },
      ],
    },
    {
      id: 'inventory',
      title: 'Maintenance & Inventory',
      items: [
        { id: 'supplies', label: 'Dental Consumables & Stock', icon: PackageIcon },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT SIDE: Onboarding Navigation Sidebar (Matching Screenshot) ──── */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded border border-slate-200/90 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
            {ONBOARDING_GROUPS.map((group) => {
              const isGroupActive = activeGroup === group.id;

              return (
                <div key={group.id} className="text-sm">
                  {/* Group Header */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveGroup(group.id);
                      if (group.items.length > 0) {
                        setActiveItem(group.items[0].id);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left font-bold transition-colors cursor-pointer
                      ${isGroupActive
                        ? 'bg-sky-50/70 text-slate-900 border-b border-sky-100'
                        : 'bg-white text-slate-800 hover:bg-slate-50'
                      }
                    `}
                  >
                    <span>{group.title}</span>
                    <HugeiconsIcon
                      icon={ChevronDownIcon}
                      size={16}
                      className={`text-slate-400 transition-transform ${isGroupActive ? 'rotate-180 text-sky-600' : ''}`}
                    />
                  </button>

                  {/* Sub-items (expanded for active group) */}
                  {isGroupActive && (
                    <div className="bg-white py-1">
                      {group.items.map((subItem) => {
                        const isSubActive = activeItem === subItem.id;
                        const SubIcon = subItem.icon;
                        const isDone = completedTasks[subItem.id];

                        return (
                          <button
                            key={subItem.id}
                            type="button"
                            onClick={() => setActiveItem(subItem.id)}
                            className={`
                              w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs font-semibold transition-all cursor-pointer
                              ${isSubActive
                                ? 'border-l-3 border-sky-600 text-sky-700 bg-sky-50/40 font-bold pl-[13px]'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }
                            `}
                          >
                            <SubIcon
                              size={16}
                              className={`shrink-0 ${isSubActive ? 'text-sky-600' : 'text-slate-400'}`}
                            />
                            <span className="flex-1 truncate">{subItem.label}</span>
                            {isDone && (
                              <HugeiconsIcon
                                icon={CheckmarkCircle01Icon}
                                size={14}
                                className="text-emerald-600 shrink-0"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need Help? Card (Matching Screenshot) */}
          <div className="rounded border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Message01Icon} size={18} className="text-slate-700 shrink-0" />
              <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Let's get you set up and efficiently managing your clinic as quickly as possible. If you need support or wish to provide feedback, please don't hesitate to reach out.
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setHelpDropdownOpen((prev) => !prev)}
                className="flex items-center justify-between w-full rounded border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>Help Options</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={14} className="text-slate-500" />
              </button>

              {helpDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 rounded border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/10 text-xs">
                  <a
                    href="mailto:support@smilux.co.ke"
                    className="block rounded px-2 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
                    onClick={() => setHelpDropdownOpen(false)}
                  >
                    Email Clinic Support
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setHelpDropdownOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left rounded px-2 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    View Clinic Documentation
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHelpDropdownOpen(false);
                      setVideoModalOpen(true);
                    }}
                    className="w-full text-left rounded px-2 py-1.5 text-brand-600 hover:bg-brand-50 font-bold cursor-pointer"
                  >
                    Watch Video Tour
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hide Onboarding Tasks Button (Matching Screenshot) */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer w-auto shadow-2xs"
          >
            <HugeiconsIcon icon={ViewOffIcon} size={15} className="text-slate-400" />
            <span>Hide onboarding tasks</span>
          </button>
        </div>

        {/* ── RIGHT SIDE: Active Task Content Pane (Matching Screenshot) ───────── */}
        <div className="lg:col-span-8 bg-white rounded border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">

          {/* 1. OVERVIEW VIEW (Exact match to screenshot) */}
          {activeItem === 'overview' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-3">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Overview
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  Before diving in to specific features, it helps to start with the essentials.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Take a quick tour of the app and get a closer look at clinic settings to ensure we have the right information. Not only will covering these things now make the rest of setup much quicker, it also helps avoid future problems that usually stem from an inaccurate or incomplete profile.
                </p>
              </div>

              {/* Action Button: Get started > (Green button matching screenshot) */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveItem('account_settings')}
                  className="inline-flex items-center gap-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Get started</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </button>
              </div>

              {/* Video Tour Preview Card Container with Grid Background (Matching Screenshot) */}
              <div className="relative rounded border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-emerald-50/60 p-4 sm:p-6 overflow-hidden">
                {/* Subtle background grid pattern */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Dashboard Mock Card */}
                <div className="relative rounded border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Utilization Summary &amp; Practice Health
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium">
                        Year 2026
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium">
                        All Chairs
                      </span>
                    </div>
                  </div>

                  {/* 3 mini chart panels */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {/* Panel 1: Bar chart */}
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Count by Dental Procedure
                      </span>
                      <MiniBarChart />
                    </div>

                    {/* Panel 2: Scatter plot */}
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Utilization Rate by Chair
                      </span>
                      <MiniScatterPlot />
                    </div>

                    {/* Panel 3: Pie chart */}
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Revenue Source (M-Pesa / SHA / Cash)
                      </span>
                      <MiniPieChart />
                    </div>
                  </div>

                  {/* Center Green Play Button (Matching Screenshot) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="group flex h-14 w-18 items-center justify-center rounded bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-900/30 transition-all hover:scale-105 cursor-pointer"
                      title="Play Walkthrough Tour"
                    >
                      <HugeiconsIcon icon={PlayIcon} size={28} className="fill-white translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ACCOUNT SETTINGS VIEW */}
          {activeItem === 'account_settings' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  Step 2 of 6 • Setup
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Account &amp; Clinic Practice Settings
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Configure your dental clinic practice details, practice licenses (KMPDC), primary location, and default currency (KES) so billing and prescriptions print accurately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded border border-slate-200 bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-slate-800">Practice Name</span>
                  <p className="text-xs text-slate-600">Avicena Dental Practice</p>
                </div>
                <div className="p-4 rounded border border-slate-200 bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-slate-800">Primary Branch</span>
                  <p className="text-xs text-slate-600">Nairobi Main Clinic</p>
                </div>
                <div className="p-4 rounded border border-slate-200 bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-slate-800">Currency</span>
                  <p className="text-xs text-slate-600">KES (Kenyan Shillings)</p>
                </div>
                <div className="p-4 rounded border border-slate-200 bg-slate-50/60 space-y-2">
                  <span className="text-xs font-bold text-slate-800">KMPDC Registration</span>
                  <p className="text-xs text-slate-600">Verified &amp; Active</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleTaskCompletion('account_settings');
                    setActiveItem('appointments');
                    setActiveGroup('operations');
                  }}
                  className="rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Mark as Done &amp; Continue &gt;
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Open Full Settings
                </button>
              </div>
            </div>
          )}

          {/* 3. APPOINTMENTS VIEW */}
          {activeItem === 'appointments' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  Step 3 of 6 • Operations
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Appointments &amp; Chair Scheduling
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manage dental chair allocations, operative schedules, and automated SMS appointment reminders for your patients.
                </p>
              </div>

              <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Today's Appointment Slots</span>
                  <span className="text-emerald-700 font-bold">5 Confirmed Today</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-3/5" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleTaskCompletion('clinic_operations');
                    setActiveItem('dentists');
                    setActiveGroup('team');
                  }}
                  className="rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Continue to Team &gt;
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/appointments')}
                  className="rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Go to Appointments Calendar
                </button>
              </div>
            </div>
          )}

          {/* 4. OTHER STEPS FALLBACK CONTAINER */}
          {activeItem !== 'overview' && activeItem !== 'account_settings' && activeItem !== 'appointments' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  Clinic Setup Checklist
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight capitalize">
                  {activeItem.replace(/_/g, ' ')}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete this module to get your clinic operating smoothly. You can configure practitioner accounts, fee schedules, dental odontograms, and M-Pesa STK push.
                </p>
              </div>

              <div className="p-6 rounded border border-slate-200 bg-slate-50/50 text-center space-y-3">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={32} className="mx-auto text-sky-600" />
                <h4 className="text-xs font-bold text-slate-800">Ready to configure this feature?</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click below to open the dedicated workspace for this section or mark it as complete.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => toggleTaskCompletion(activeItem)}
                  className="rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  {completedTasks[activeItem] ? 'Completed ✓' : 'Mark Task as Completed'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── VIDEO TOUR MODAL ─────────────────────────────────────────────────── */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={PlayIcon} size={18} className="text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-900">Smilux Dental Platform Walkthrough</h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            {/* Video Player Mockup / Interactive Canvas */}
            <div className="relative aspect-video bg-slate-900 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-600/80 flex items-center justify-center mb-4 ring-8 ring-emerald-500/20">
                <HugeiconsIcon icon={PlayIcon} size={32} className="fill-white translate-x-0.5" />
              </div>
              <h4 className="text-base font-bold">Welcome to Smilux Dental SaaS</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                Explore how to schedule patient visits, perform interactive 3D dental charting, and reconcile M-Pesa STK push receipts in seconds.
              </p>
              <span className="mt-4 inline-block px-2.5 py-1 rounded bg-slate-800 text-[10px] text-emerald-400 font-semibold border border-slate-700">
                Duration: 3 mins 45 secs • HD 1080p
              </span>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Avicena Dental Practice Onboarding</span>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="rounded bg-slate-900 text-white font-bold px-3 py-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Tour
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
