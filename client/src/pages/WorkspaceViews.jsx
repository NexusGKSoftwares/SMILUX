import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar01Icon,
  Search01Icon,
  FilterIcon,
  Plus01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  UserIcon,
  Tick01Icon,
  Money01Icon,
  SecurityCheckIcon,
  Settings01Icon,
  Notification01Icon,
  Building01Icon,
  Invoice01Icon,
  Mail01Icon,
  Download01Icon,
  PrinterIcon,
} from '@hugeicons/core-free-icons';

// ─── Shared Section Header ──────────────────────────────────────────────────
export function ViewHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4 mb-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Shared KPI Card ───────────────────────────────────────────────────────
export function KpiCard({ title, value, change, isPositive, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
  };

  return (
    <div className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-md border ${colorMap[color] || colorMap.blue}`}>
            <HugeiconsIcon icon={Icon} size={18} />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-xl font-extrabold text-slate-900">{value}</span>
        {change && (
          <span className={`text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── 1. Dashboard View ──────────────────────────────────────────────────────
export function DashboardView({ user }) {
  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title={`Welcome back, ${user?.name || 'Dr. Darrell Steward'}`}
        subtitle="Avicena Dental Practice — Nairobi Main Branch Workspace Overview"
        actions={
          <button
            onClick={() => alert('Opening New Appointment modal...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={Plus01Icon} size={16} />
            <span>New Appointment</span>
          </button>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Today's Appointments" value="14 Patients" change="+3 from yesterday" isPositive icon={Calendar01Icon} color="blue" />
        <KpiCard title="Today's Revenue" value="KES 148,500" change="+18.5% vs avg" isPositive icon={Money01Icon} color="emerald" />
        <KpiCard title="Pending SHA Claims" value="8 Claims (KES 92K)" change="2 awaiting pre-auth" isPositive={false} icon={SecurityCheckIcon} color="amber" />
        <KpiCard title="M-Pesa STK Push Status" value="98.4% Success" change="Instant Settlement" isPositive icon={Tick01Icon} color="sky" />
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Appointments Queue Table */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-sm font-bold text-slate-900">Today&apos;s Patient Schedule</h2>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              5 In Chair / Waiting
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Patient</th>
                  <th className="pb-2">Procedure</th>
                  <th className="pb-2">Dentist</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">09:00 AM</td>
                  <td className="py-2.5 font-semibold text-slate-900">Wanjiku Kamau</td>
                  <td className="py-2.5">Composite Filling (Tooth 16)</td>
                  <td className="py-2.5">Dr. Darrell Steward</td>
                  <td className="py-2.5"><span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">In Treatment</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">10:00 AM</td>
                  <td className="py-2.5 font-semibold text-slate-900">Brian Omondi</td>
                  <td className="py-2.5">Scaling & Polishing</td>
                  <td className="py-2.5">Dr. Amina Patel</td>
                  <td className="py-2.5"><span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">Checked In</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">11:30 AM</td>
                  <td className="py-2.5 font-semibold text-slate-900">Mercy Njeri</td>
                  <td className="py-2.5">Root Canal Treatment (Tooth 24)</td>
                  <td className="py-2.5">Dr. Darrell Steward</td>
                  <td className="py-2.5"><span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">Scheduled</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">02:00 PM</td>
                  <td className="py-2.5 font-semibold text-slate-900">Kevin Mutua</td>
                  <td className="py-2.5">Orthodontic Consultation</td>
                  <td className="py-2.5">Dr. Amina Patel</td>
                  <td className="py-2.5"><span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Shortcut */}
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => alert('Initiating M-Pesa STK Push Billing...')}
                className="w-full flex items-center justify-between p-2.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Safaricom M-Pesa STK Push</span>
                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Fast Pay</span>
              </button>
              <button
                onClick={() => alert('Opening FDI Dental Charting...')}
                className="w-full flex items-center justify-between p-2.5 rounded bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>FDI Dental Chart (Odontogram)</span>
                <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded">Chart</span>
              </button>
              <button
                onClick={() => alert('Creating SHA Insurance Pre-Auth Claim...')}
                className="w-full flex items-center justify-between p-2.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Kenya SHA Claim Approval</span>
                <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded">SHA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Patients View ───────────────────────────────────────────────────────
export function PatientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const patients = [
    { id: 'PAT-1082', name: 'Wanjiku Kamau', phone: '+254 712 345 678', age: 34, gender: 'Female', insurance: 'SHA / Jubilee Insurance', lastVisit: 'Today', status: 'Active' },
    { id: 'PAT-1081', name: 'Brian Omondi', phone: '+254 722 987 654', age: 29, gender: 'Male', insurance: 'AAR Healthcare', lastVisit: '10 Nov 2026', status: 'Active' },
    { id: 'PAT-1080', name: 'Mercy Njeri', phone: '+254 733 112 233', age: 42, gender: 'Female', insurance: 'Self Pay (M-Pesa)', lastVisit: '04 Oct 2026', status: 'Active' },
    { id: 'PAT-1079', name: 'Kevin Mutua', phone: '+254 701 445 566', age: 26, gender: 'Male', insurance: 'Britam Dental', lastVisit: '15 Sep 2026', status: 'Active' },
    { id: 'PAT-1078', name: 'Grace Chebet', phone: '+254 718 778 899', age: 38, gender: 'Female', insurance: 'SHA Direct', lastVisit: '01 Aug 2026', status: 'Follow Up' },
  ];

  const filtered = patients.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title="Patients Directory"
        subtitle="Manage patient clinical files, medical histories, and contact profiles"
        actions={
          <button
            onClick={() => alert('Registering New Patient...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={Plus01Icon} size={16} />
            <span>Add New Patient</span>
          </button>
        }
      />

      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name, file number, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-blue-600"
          />
        </div>
        <button className="flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer">
          <HugeiconsIcon icon={FilterIcon} size={14} />
          <span>Filter</span>
        </button>
      </div>

      <div className="rounded-lg border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="p-3">File ID</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Age / Gender</th>
              <th className="p-3">Insurance / Billing</th>
              <th className="p-3">Last Visit</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70">
                <td className="p-3 font-bold text-blue-600">{p.id}</td>
                <td className="p-3 font-bold text-slate-900">{p.name}</td>
                <td className="p-3 font-medium text-slate-600">{p.phone}</td>
                <td className="p-3">{p.age} yrs / {p.gender}</td>
                <td className="p-3"><span className="rounded bg-blue-50 text-blue-800 px-2 py-0.5 text-[11px] font-semibold">{p.insurance}</span></td>
                <td className="p-3 text-slate-500">{p.lastVisit}</td>
                <td className="p-3">
                  <button
                    onClick={() => alert(`Opening Patient Profile: ${p.name}`)}
                    className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    View Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── 3. Appointments View ───────────────────────────────────────────────────
export function AppointmentsView() {
  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title="Appointments & Scheduling Calendar"
        subtitle="Clinic chair assignments, practitioner schedules, and appointment bookings"
        actions={
          <button
            onClick={() => alert('Booking New Appointment...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={Plus01Icon} size={16} />
            <span>Book Appointment</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-sm font-bold text-slate-900">November 2026 — Weekly Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Chair 1 &amp; Chair 2 Active</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs border-b border-slate-200 pb-2 font-bold text-slate-500">
            <div>Mon 09</div>
            <div>Tue 10</div>
            <div className="text-blue-600">Wed 11 (Today)</div>
            <div>Thu 12</div>
            <div>Fri 13</div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="p-3 rounded bg-blue-50/70 border-l-4 border-blue-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">09:00 AM - 10:00 AM</span>
                <p className="text-slate-600">Wanjiku Kamau — Composite Filling (Chair 1)</p>
              </div>
              <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Confirmed</span>
            </div>
            <div className="p-3 rounded bg-sky-50/70 border-l-4 border-sky-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">10:30 AM - 11:30 AM</span>
                <p className="text-slate-600">Brian Omondi — Teeth Whitening &amp; Scaling (Chair 2)</p>
              </div>
              <span className="bg-sky-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Checked In</span>
            </div>
            <div className="p-3 rounded bg-emerald-50/70 border-l-4 border-emerald-600 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">02:00 PM - 03:00 PM</span>
                <p className="text-slate-600">Mercy Njeri — Root Canal Stage 1 (Chair 1)</p>
              </div>
              <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200/90 bg-white p-4 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Practitioners</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Dr. Darrell Steward</span>
              <span className="text-[11px] text-slate-500">Lead Endodontist (6 Appts)</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Dr. Amina Patel</span>
              <span className="text-[11px] text-slate-500">Orthodontist (5 Appts)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. FDI Dental Charting View ───────────────────────────────────────────
export function DentalChartingView() {
  const [selectedTooth, setSelectedTooth] = useState(16);
  const [condition, setCondition] = useState('Composite Filling');

  const teethUpperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const teethUpperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
  const teethLowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
  const teethLowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title="Interactive FDI Dental Charting (Odontogram)"
        subtitle="Patient: Wanjiku Kamau (File PAT-1082) — Upper & Lower Arch Odontogram"
        actions={
          <button
            onClick={() => alert(`Saved charting for Tooth #${selectedTooth}: ${condition}`)}
            className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer"
          >
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
            <span>Save Chart Record</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Odontogram Grid */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              MAXILLARY ARCH (UPPER TEETH)
            </span>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...teethUpperRight, ...teethUpperLeft].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                    selectedTooth === t
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                      : t === 16 || t === 24
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px]">{t}</span>
                  <span className="text-[9px] font-extrabold">{t === 16 ? 'F' : t === 24 ? 'RCT' : 'OK'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              MANDIBULAR ARCH (LOWER TEETH)
            </span>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...teethLowerRight, ...teethLowerLeft].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTooth(t)}
                  className={`w-9 h-12 rounded border text-xs font-bold flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                    selectedTooth === t
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[9px] font-extrabold">OK</span>
                  <span className="text-[10px]">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Tooth Inspector */}
        <div className="rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Selected Tooth #{selectedTooth} Details
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tooth Condition / Diagnosis</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="Healthy / Intact">Healthy / Intact</option>
                <option value="Composite Filling">Composite Filling</option>
                <option value="Dental Caries (Cavity)">Dental Caries (Cavity)</option>
                <option value="Root Canal Required">Root Canal Required</option>
                <option value="Crown / Cap">Crown / Cap</option>
                <option value="Extracted / Missing">Extracted / Missing</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Clinical Procedure Note</label>
              <textarea
                rows={3}
                placeholder="Enter clinical notes for Tooth #..."
                className="w-full rounded border border-slate-300 p-2 text-xs focus:outline-none focus:border-blue-600"
                defaultValue="Mesial-occlusal composite restoration completed under local anaesthesia."
              />
            </div>

            <button
              onClick={() => alert(`Saved Tooth #${selectedTooth} record`)}
              className="w-full rounded bg-blue-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Update Tooth #{selectedTooth}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Invoices & M-Pesa STK Push Billing View ──────────────────────────────
export function InvoicesView() {
  const [stkPhone, setStkPhone] = useState('0712345678');
  const [stkAmount, setStkAmount] = useState('6500');
  const [loadingStk, setLoadingStk] = useState(false);

  const handleSendStk = (e) => {
    e.preventDefault();
    setLoadingStk(true);
    setTimeout(() => {
      setLoadingStk(false);
      alert(`M-Pesa STK Push sent successfully to ${stkPhone} for KES ${stkAmount}!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title="Invoices & Safaricom M-Pesa Billing"
        subtitle="Manage billing, create patient invoices, and trigger instant M-Pesa STK Push prompts"
        actions={
          <button
            onClick={() => alert('Creating New Invoice...')}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={Plus01Icon} size={16} />
            <span>Create Invoice</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Recent Patient Invoices</h2>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-2.5">Invoice #</th>
                <th className="p-2.5">Patient</th>
                <th className="p-2.5">Amount (KES)</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-2.5 font-bold text-blue-600">INV-2026-091</td>
                <td className="p-2.5 font-bold text-slate-900">Wanjiku Kamau</td>
                <td className="p-2.5 font-extrabold text-slate-900">6,500</td>
                <td className="p-2.5"><span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">Pending Payment</span></td>
                <td className="p-2.5">
                  <button onClick={() => alert('Triggering STK Push...')} className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer">STK Push</button>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-blue-600">INV-2026-090</td>
                <td className="p-2.5 font-bold text-slate-900">Brian Omondi</td>
                <td className="p-2.5 font-extrabold text-slate-900">12,000</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Paid via M-Pesa</span></td>
                <td className="p-2.5">
                  <button onClick={() => alert('Printing Receipt...')} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold hover:bg-slate-200 cursor-pointer">Receipt</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* M-Pesa STK Push Box */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-200/80 pb-2">
            <HugeiconsIcon icon={Money01Icon} size={20} className="text-emerald-600" />
            <h3 className="text-sm font-bold">Safaricom M-Pesa STK Push</h3>
          </div>
          <form onSubmit={handleSendStk} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">M-Pesa Phone Number</label>
              <input
                type="text"
                value={stkPhone}
                onChange={(e) => setStkPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Amount (KES)</label>
              <input
                type="number"
                value={stkAmount}
                onChange={(e) => setStkAmount(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>
            <button
              type="submit"
              disabled={loadingStk}
              className="w-full rounded bg-emerald-600 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer disabled:opacity-50"
            >
              {loadingStk ? 'Sending Prompt to Phone…' : 'Trigger M-Pesa Prompt'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── 6. Generic Feature View (for all remaining routes) ──────────────────────
export function GenericFeatureView({ title, description, badge = 'Active Module' }) {
  return (
    <div className="space-y-6 animate-page">
      <ViewHeader
        title={title}
        subtitle={description}
        actions={
          <button
            onClick={() => alert(`Performing action on ${title}...`)}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            <HugeiconsIcon icon={Plus01Icon} size={16} />
            <span>Add Item</span>
          </button>
        }
      />

      <div className="rounded-lg border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{title} Workspace Data</span>
            <span className="rounded bg-sky-100 text-sky-800 px-2 py-0.5 text-[10px] font-bold uppercase">{badge}</span>
          </div>
          <span className="text-xs text-slate-500">Avicena Dental Practice</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {description} Module is connected to your clinic workspace. All transactions, records, and updates sync automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Entries</span>
            <span className="block text-lg font-extrabold text-slate-900 mt-1">128 Items</span>
          </div>
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sync Status</span>
            <span className="block text-lg font-extrabold text-emerald-600 mt-1">Live &amp; Synced</span>
          </div>
          <div className="p-4 rounded border border-slate-200 bg-slate-50/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Branch</span>
            <span className="block text-lg font-extrabold text-blue-600 mt-1">Nairobi Main</span>
          </div>
        </div>
      </div>
    </div>
  );
}
