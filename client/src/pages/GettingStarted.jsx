import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle01Icon,
  Cancel01Icon,
  PlayIcon,
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
  StethoscopeIcon,
  Money01Icon,
} from '@hugeicons/core-free-icons';

// ─── SVG Mock Chart Components for the Video Tour Preview Container ──────────
function MiniBarChart() {
  return (
    <div className="flex items-end gap-1.5 h-36 w-full pt-4 px-2 border-b border-l border-slate-200">
      <div className="w-1/8 bg-slate-300 h-[25%] rounded-t-xs" />
      <div className="w-1/8 bg-rose-500 h-[40%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-300 h-[15%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-400 h-[30%] rounded-t-xs" />
      <div className="w-1/8 bg-brand-green h-[55%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-400 h-[20%] rounded-t-xs" />
      <div className="w-1/8 bg-slate-500 h-[92%] rounded-t-xs" />
      <div className="w-1/8 bg-brand-green h-[35%] rounded-t-xs" />
    </div>
  );
}

function MiniScatterPlot() {
  return (
    <div className="relative h-36 w-full p-2 border-b border-l border-slate-200 bg-slate-50/50">
      <span className="absolute top-6 left-8 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-10 left-12 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-8 left-16 h-1.5 w-1.5 rounded-full bg-brand-green" />
      <span className="absolute top-14 left-20 h-1.5 w-1.5 rounded-full bg-rose-500" />
      <span className="absolute top-16 left-10 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-20 left-14 h-1.5 w-1.5 rounded-full bg-brand-green" />
      <span className="absolute top-24 left-22 h-1.5 w-1.5 rounded-full bg-amber-500" />
      <span className="absolute top-12 left-26 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-18 left-30 h-1.5 w-1.5 rounded-full bg-slate-600" />
      <span className="absolute top-28 left-28 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-8 left-34 h-1.5 w-1.5 rounded-full bg-brand-green" />
      <span className="absolute top-22 left-38 h-1.5 w-1.5 rounded-full bg-rose-400" />
      <span className="absolute top-14 left-42 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-20 left-48 h-1.5 w-1.5 rounded-full bg-slate-500" />
      <span className="absolute top-16 left-52 h-1.5 w-1.5 rounded-full bg-slate-600" />
      <span className="absolute top-26 left-56 h-1.5 w-1.5 rounded-full bg-slate-400" />
      <span className="absolute top-10 left-60 h-1.5 w-1.5 rounded-full bg-brand-green" />
      <span className="absolute top-18 left-64 h-1.5 w-1.5 rounded-full bg-slate-500" />
    </div>
  );
}

function MiniPieChart() {
  return (
    <div className="flex flex-col items-center justify-center h-36 w-full p-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#2ec4b6"
            strokeWidth="31.8"
            strokeDasharray="60 40"
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#3a5bff"
            strokeWidth="31.8"
            strokeDasharray="30 70"
            strokeDashoffset="-60"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#e8368f"
            strokeWidth="31.8"
            strokeDasharray="10 90"
            strokeDashoffset="-90"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> M-Pesa (60%)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> SHA (30%)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" /> Cash (10%)
        </span>
      </div>
    </div>
  );
}

// ─── Main Getting Started Page Component ─────────────────────────────────────
export default function GettingStarted() {
  const navigate = useNavigate();

  // Active task selection
  const [activeTaskId, setActiveTaskId] = useState('overview');

  // Help dropdown state
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Completed tasks checklist state with localStorage persistence
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('smilux_onboarding_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      overview: true,
      account_settings: false,
      appointments: false,
      patients: false,
      dentists: false,
      charting: false,
      billing: false,
      inventory: false,
    };
  });

  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('smilux_onboarding_tasks', JSON.stringify(next));
        window.dispatchEvent(new Event('smilux_onboarding_updated'));
      } catch {}
      return next;
    });
  };

  // Full flat list of onboarding tasks (1, 2, 3... without collapsible dropdowns)
  const ONBOARDING_TASKS = [
    {
      id: 'overview',
      title: 'Platform Overview',
      subtitle: 'App tour & practice essentials',
      category: 'Setup',
      icon: InformationCircleIcon,
    },
    {
      id: 'account_settings',
      title: 'Clinic Settings',
      subtitle: 'Practice profile, license & currency',
      category: 'Setup',
      icon: Settings01Icon,
    },
    {
      id: 'appointments',
      title: 'Appointments & Scheduling',
      subtitle: 'Dental chair slots & automated SMS',
      category: 'Operations',
      icon: Calendar01Icon,
    },
    {
      id: 'patients',
      title: 'Patient Registry',
      subtitle: 'Digital medical files & allergies',
      category: 'Operations',
      icon: UserGroupIcon,
    },
    {
      id: 'dentists',
      title: 'Dentists & Team Roles',
      subtitle: 'Practitioners, staff & permissions',
      category: 'Team',
      icon: UserGroupIcon,
    },
    {
      id: 'charting',
      title: 'Dental Charting',
      subtitle: 'Interactive odontogram & treatment plans',
      category: 'Clinical',
      icon: StethoscopeIcon,
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      subtitle: 'Invoices, M-Pesa STK & SHA claims',
      category: 'Finance',
      icon: Invoice01Icon,
    },
    {
      id: 'inventory',
      title: 'Inventory & Supplies',
      subtitle: 'Dental stock levels & expiry tracking',
      category: 'Inventory',
      icon: PackageIcon,
    },
  ];

  const totalTasks = ONBOARDING_TASKS.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT SIDE: Linear Task List (1, 2, 3... No dropdowns) ─────────── */}
        <div className="lg:col-span-4 space-y-4">

          {/* Progress Summary Header Card */}
          <div className="rounded border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Setup Progress</span>
              <span className="font-extrabold text-brand-green">
                {completedCount} of {totalTasks} done ({progressPercent}%)
              </span>
            </div>
            {/* Brand Green Progress Bar */}
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Direct 1, 2, 3... List of Tasks (No Dropdown) */}
          <div className="rounded border border-slate-200/90 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
            {ONBOARDING_TASKS.map((task, index) => {
              const isSelected = activeTaskId === task.id;
              const isDone = Boolean(completedTasks[task.id]);
              const stepNumber = index + 1;

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => setActiveTaskId(task.id)}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-3 text-left transition-all cursor-pointer
                    ${isSelected
                      ? 'bg-brand-green/8 text-slate-900 border-l-3 border-l-brand-green pl-[11px]'
                      : 'bg-white hover:bg-slate-50 text-slate-700'
                    }
                  `}
                >
                  {/* Status Indicator Icon: Brand-Green Done Checkmark vs Not Done Number Badge */}
                  <div className="shrink-0">
                    {isDone ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white shadow-2xs">
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={15} />
                      </div>
                    ) : (
                      <div
                        className={`
                          flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors
                          ${isSelected
                            ? 'border-2 border-brand-green bg-brand-green/10 text-brand-green'
                            : 'border border-slate-300 bg-slate-100/80 text-slate-500'
                          }
                        `}
                      >
                        {stepNumber}
                      </div>
                    )}
                  </div>

                  {/* Task Labels */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs truncate ${isSelected ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                        {task.title}
                      </span>
                      {isDone ? (
                        <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-1.5 py-0.2 rounded shrink-0">
                          Done
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                          To Do
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block truncate">
                      {task.category} • {task.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Need Help? Card */}
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
                    className="w-full text-left rounded px-2 py-1.5 text-brand-green hover:bg-brand-green/10 font-bold cursor-pointer"
                  >
                    Watch Video Tour
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hide Onboarding Tasks Button */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer w-auto shadow-2xs"
          >
            <HugeiconsIcon icon={ViewOffIcon} size={15} className="text-slate-400" />
            <span>Hide onboarding tasks</span>
          </button>
        </div>

        {/* ── RIGHT SIDE: Active Task Content Pane (Brand Green Theme) ─────────── */}
        <div className="lg:col-span-8 bg-white rounded border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">

          {/* 1. OVERVIEW VIEW */}
          {activeTaskId === 'overview' && (
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

              {/* Action Button: Get started > in Brand Green */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveTaskId('account_settings')}
                  className="inline-flex items-center gap-2 rounded bg-brand-green hover:bg-[#25b5a7] text-white font-bold text-xs px-4 py-2.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Get started</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </button>
              </div>

              {/* Tour Preview Container with Brand-Green Grid Pattern Backdrop */}
              <div className="relative rounded-xl border border-brand-green/20 bg-gradient-to-br from-[#2ec4b6]/8 via-teal-50/20 to-[#2ec4b6]/8 p-4 sm:p-6 overflow-hidden">
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#2ec4b6 1px, transparent 1px), linear-gradient(90deg, #2ec4b6 1px, transparent 1px)`,
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
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Count by Dental Procedure
                      </span>
                      <MiniBarChart />
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Utilization Rate by Chair
                      </span>
                      <MiniScatterPlot />
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Revenue Source (M-Pesa / SHA / Cash)
                      </span>
                      <MiniPieChart />
                    </div>
                  </div>

                  {/* Center Brand-Green Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="group flex h-14 w-18 items-center justify-center rounded-xl bg-brand-green hover:bg-[#25b5a7] text-white shadow-xl shadow-brand-green/30 transition-all hover:scale-105 cursor-pointer"
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
          {activeTaskId === 'account_settings' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Step 2 of {totalTasks} • Setup
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
                    setActiveTaskId('appointments');
                  }}
                  className="rounded bg-brand-green hover:bg-[#25b5a7] text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
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
          {activeTaskId === 'appointments' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Step 3 of {totalTasks} • Operations
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
                  <span className="text-brand-green font-bold">5 Confirmed Today</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-brand-green rounded-full w-3/5" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleTaskCompletion('appointments');
                    setActiveTaskId('patients');
                  }}
                  className="rounded bg-brand-green hover:bg-[#25b5a7] text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  Continue to Patients &gt;
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

          {/* 4. OTHER TASKS GENERAL VIEW */}
          {activeTaskId !== 'overview' && activeTaskId !== 'account_settings' && activeTaskId !== 'appointments' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Step {ONBOARDING_TASKS.findIndex((t) => t.id === activeTaskId) + 1} of {totalTasks}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {ONBOARDING_TASKS.find((t) => t.id === activeTaskId)?.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ONBOARDING_TASKS.find((t) => t.id === activeTaskId)?.subtitle}. Complete this setup item to unlock full practice automation across Avicena Dental.
                </p>
              </div>

              <div className="p-6 rounded border border-slate-200 bg-slate-50/50 text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green mx-auto">
                  <HugeiconsIcon
                    icon={ONBOARDING_TASKS.find((t) => t.id === activeTaskId)?.icon || CheckmarkCircle01Icon}
                    size={24}
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  {completedTasks[activeTaskId] ? 'Task Marked as Complete!' : 'Ready to configure this feature?'}
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {completedTasks[activeTaskId]
                    ? 'This step is completed. You can revisit and edit settings at any time.'
                    : 'Click below to mark this step as complete and proceed through your onboarding checklist.'}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => toggleTaskCompletion(activeTaskId)}
                  className="rounded bg-brand-green hover:bg-[#25b5a7] text-white font-bold text-xs px-4 py-2 transition-colors cursor-pointer"
                >
                  {completedTasks[activeTaskId] ? 'Completed ✓ (Click to Undo)' : 'Mark as Done & Complete'}
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
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={PlayIcon} size={18} className="text-brand-green" />
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

            {/* Video Player Canvas */}
            <div className="relative aspect-video bg-slate-900 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-brand-green flex items-center justify-center mb-4 ring-8 ring-brand-green/20">
                <HugeiconsIcon icon={PlayIcon} size={32} className="fill-white translate-x-0.5" />
              </div>
              <h4 className="text-base font-bold">Welcome to Smilux Dental SaaS</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                Explore how to schedule patient visits, perform interactive 3D dental charting, and reconcile M-Pesa STK push receipts in seconds.
              </p>
              <span className="mt-4 inline-block px-2.5 py-1 rounded bg-slate-800 text-[10px] text-brand-green font-semibold border border-slate-700">
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
