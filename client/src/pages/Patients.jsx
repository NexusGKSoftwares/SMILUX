import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  FilterIcon,
  Upload01Icon,
  Download01Icon,
  CallIcon,
  Mail01Icon,
  Calendar01Icon,
  DentalToothIcon,
  MoreHorizontalIcon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
  PlusSignIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';

// Initial mock dataset for patients
const INITIAL_PATIENTS = [
  {
    id: 'PAT-1082',
    name: 'Wanjiku Kamau',
    phone: '+254 712 345 678',
    email: 'wanjiku.kamau@gmail.com',
    age: 34,
    gender: 'Female',
    insurance: 'SHA / Jubilee Insurance',
    insuranceType: 'insured',
    lastVisit: 'Today',
    nextAppointment: 'Tomorrow, 10:00 AM',
    treatment: 'Orthodontic Adjustment',
    dentalAlert: 'Penicillin Allergy',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1081',
    name: 'Brian Omondi',
    phone: '+254 722 987 654',
    email: 'brian.omondi@outlook.com',
    age: 29,
    gender: 'Male',
    insurance: 'AAR Healthcare',
    insuranceType: 'insured',
    lastVisit: '10 Nov 2026',
    nextAppointment: '18 Nov 2026',
    treatment: 'Molar Root Canal (Tooth #36)',
    dentalAlert: 'None',
    balance: 'KES 4,500',
    status: 'Active',
  },
  {
    id: 'PAT-1080',
    name: 'Mercy Njeri',
    phone: '+254 733 112 233',
    email: 'mercy.njeri@yahoo.com',
    age: 42,
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    insuranceType: 'self-pay',
    lastVisit: '04 Oct 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Composite Filling & Scaling',
    dentalAlert: 'Hypertension',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1079',
    name: 'Kevin Mutua',
    phone: '+254 701 445 566',
    email: 'kmutua@techcorp.co.ke',
    age: 26,
    gender: 'Male',
    insurance: 'Britam Dental',
    insuranceType: 'insured',
    lastVisit: '15 Sep 2026',
    nextAppointment: '22 Nov 2026',
    treatment: 'Wisdom Tooth Extraction',
    dentalAlert: 'Latex Sensitivity',
    balance: 'KES 1,200',
    status: 'Follow Up',
  },
  {
    id: 'PAT-1078',
    name: 'Grace Chebet',
    phone: '+254 718 778 899',
    email: 'gchebet@uonbi.ac.ke',
    age: 38,
    gender: 'Female',
    insurance: 'SHA Direct (Civil Servants)',
    insuranceType: 'insured',
    lastVisit: '01 Aug 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Teeth Whitening & Polish',
    dentalAlert: 'None',
    balance: 'KES 0',
    status: 'Active',
  },
  {
    id: 'PAT-1077',
    name: 'David Kipkorir',
    phone: '+254 720 334 455',
    email: 'david.kipkorir@gmail.com',
    age: 51,
    gender: 'Male',
    insurance: 'Old Mutual Health',
    insuranceType: 'insured',
    lastVisit: '12 Jul 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Crown Placement (#21)',
    dentalAlert: 'Diabetic Type 2',
    balance: 'KES 8,000',
    status: 'Follow Up',
  },
  {
    id: 'PAT-1076',
    name: 'Amina Mohammed',
    phone: '+254 734 556 677',
    email: 'amina.m@coastdental.com',
    age: 31,
    gender: 'Female',
    insurance: 'Self Pay (Cash)',
    insuranceType: 'self-pay',
    lastVisit: '05 May 2026',
    nextAppointment: 'None scheduled',
    treatment: 'Pediatric Consultation',
    dentalAlert: 'None',
    balance: 'KES 0',
    status: 'Archived',
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedInsurance, setSelectedInsurance] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedPatientIds, setSelectedPatientIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    treatment: 'General Consultation',
    dentalAlert: 'None',
  });

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    return {
      all: patients.length,
      active: patients.filter((p) => p.status === 'Active').length,
      followUp: patients.filter((p) => p.status === 'Follow Up').length,
      archived: patients.filter((p) => p.status === 'Archived').length,
    };
  }, [patients]);

  const tabs = [
    { id: 'all', label: 'All Patients', count: tabCounts.all },
    { id: 'active', label: 'Active', count: tabCounts.active },
    { id: 'follow-up', label: 'Follow Up', count: tabCounts.followUp },
    { id: 'archived', label: 'Archived', count: tabCounts.archived },
  ];

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Tab filter
      if (activeTab === 'active' && patient.status !== 'Active') return false;
      if (activeTab === 'follow-up' && patient.status !== 'Follow Up') return false;
      if (activeTab === 'archived' && patient.status !== 'Archived') return false;

      // Status dropdown filter
      if (selectedStatus !== 'all' && patient.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'all' && patient.gender.toLowerCase() !== selectedGender.toLowerCase()) {
        return false;
      }

      // Insurance filter
      if (selectedInsurance !== 'all') {
        if (selectedInsurance === 'insured' && patient.insuranceType !== 'insured') return false;
        if (selectedInsurance === 'self-pay' && patient.insuranceType !== 'self-pay') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = patient.name.toLowerCase().includes(q);
        const matchesId = patient.id.toLowerCase().includes(q);
        const matchesPhone = patient.phone.includes(q);
        const matchesEmail = patient.email.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesPhone && !matchesEmail) return false;
      }

      return true;
    });
  }, [patients, activeTab, selectedStatus, selectedGender, selectedInsurance, searchQuery]);

  // Handle Add Patient submit
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.phone.trim()) return;

    const created = {
      id: `PAT-${1083 + patients.length}`,
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email || `${newPatient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      age: Number(newPatient.age) || 30,
      gender: newPatient.gender,
      insurance: newPatient.insurance,
      insuranceType: newPatient.insurance.includes('Self') ? 'self-pay' : 'insured',
      lastVisit: 'Today',
      nextAppointment: 'Scheduled',
      treatment: newPatient.treatment || 'Consultation',
      dentalAlert: newPatient.dentalAlert || 'None',
      balance: 'KES 0',
      status: 'Active',
    };

    setPatients([created, ...patients]);
    setIsAddModalOpen(false);
    setNewPatient({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Female',
      insurance: 'Self Pay (M-Pesa)',
      treatment: 'General Consultation',
      dentalAlert: 'None',
    });
  };

  // Select all checkbox handler
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPatientIds(filteredPatients.map((p) => p.id));
    } else {
      setSelectedPatientIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedPatientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Patients',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Patients CSV / Excel wizard opened'),
    },
    {
      id: 'export',
      label: 'Export Patient List',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => {
        alert(`Exporting ${filteredPatients.length} patient records to CSV...`);
      },
    },
    {
      id: 'add-multiple',
      label: 'Add Multiple Patients',
      onClick: () => alert('Batch Patient Entry Mode activated'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'manage-roles',
      label: 'Manage Patient Privacy & Access',
      onClick: () => alert('Opening Patient Privacy and Consent Settings'),
    },
  ];

  return (
    <div className="space-y-2 mb-8">
      {/* ─── PageHeader with Title, Learn, 3-Dots, & Add Button ─── */}
      <div className="bg-white dark:bg-slate-900 rounded shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <PageHeader
          title="Patients"
          badge={`${tabCounts.all} Files`}
          showLearn={true}
          learnLabel="Learn"
          onLearn={() => setIsLearnModalOpen(true)}
          learnTooltip="Learn how to manage dental patient files, charts & records"
          moreActions={headerMoreActions}
          addLabel="Add Patient"
          onAdd={() => setIsAddModalOpen(true)}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {/* Sub-header Filter Toolbar (Inspired by screenshot) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              {/* Search bar */}
              <div className="relative min-w-[240px] flex-1 max-w-md">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by name, ID, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-1.5 px-3 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="all">Patient Status: All</option>
                <option value="active">Active</option>
                <option value="follow up">Follow Up</option>
                <option value="archived">Archived</option>
              </select>

              {/* Insurance Filter */}
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="py-1.5 px-3 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="all">Insurance: All</option>
                <option value="insured">Insurance Cover (SHA/Private)</option>
                <option value="self-pay">Self Pay (M-Pesa/Cash)</option>
              </select>

              {/* Gender Filter */}
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="py-1.5 px-3 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="all">Gender: All</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>

              {/* Reset filter button if active */}
              {(searchQuery || selectedStatus !== 'all' || selectedInsurance !== 'all' || selectedGender !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                    setSelectedInsurance('all');
                    setSelectedGender('all');
                  }}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium px-2 py-1"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredPatients.length}</span> of {patients.length} patients
            </div>
          </div>
        </PageHeader>
      </div>

      {/* ─── Patients Data Table Card ─── */}
      <div className="bg-white dark:bg-slate-900 rounded shadow-xs border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredPatients.length > 0 &&
                      selectedPatientIds.length === filteredPatients.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Patient Name & ID</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Age / Sex</th>
                <th className="py-3 px-4">Insurance / Scheme</th>
                <th className="py-3 px-4">Ongoing Care / Procedure</th>
                <th className="py-3 px-4">Next Visit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-normal">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <div className="h-10 w-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <HugeiconsIcon icon={UserIcon} size={20} />
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">No patients found</p>
                      <p className="text-xs">No records matched your search query or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  const isSelected = selectedPatientIds.includes(patient.id);
                  const initials = patient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2);

                  return (
                    <tr
                      key={patient.id}
                      className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                        }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(patient.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      {/* Patient Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{patient.name}</span>
                              {patient.dentalAlert !== 'None' && (
                                <span
                                  title={`Medical Alert: ${patient.dentalAlert}`}
                                  className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                >
                                  {patient.dentalAlert}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {patient.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                            <HugeiconsIcon icon={CallIcon} size={12} className="text-slate-400" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                            <HugeiconsIcon icon={Mail01Icon} size={12} className="text-slate-400" />
                            <span className="truncate max-w-[150px]">{patient.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Age / Sex */}
                      <td className="py-3 px-4">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {patient.age} yrs
                        </span>
                        <span className="text-slate-400 text-[11px] block">{patient.gender}</span>
                      </td>

                      {/* Insurance Scheme */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${patient.insuranceType === 'insured'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50'
                            }`}
                        >
                          {patient.insurance}
                        </span>
                      </td>

                      {/* Ongoing Treatment */}
                      <td className="py-3 px-4">
                        <span className="text-slate-700 dark:text-slate-300 font-medium block">
                          {patient.treatment}
                        </span>
                        <span className="text-slate-400 text-[11px]">Last: {patient.lastVisit}</span>
                      </td>

                      {/* Next Appointment */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <HugeiconsIcon icon={Calendar01Icon} size={13} className="text-slate-400" />
                          <span>{patient.nextAppointment}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${patient.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : patient.status === 'Follow Up'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                        >
                          {patient.status}
                        </span>
                      </td>

                      {/* Row Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Dental Chart Shortcut */}
                          <button
                            title="Open Dental Chart"
                            onClick={() => alert(`Opening Dental Chart for ${patient.name} (${patient.id})`)}
                            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                          >
                            <HugeiconsIcon icon={DentalToothIcon} size={16} />
                          </button>

                          {/* Options dropdown */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveMenuId(activeMenuId === patient.id ? null : patient.id)
                              }
                              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              <HugeiconsIcon icon={MoreHorizontalIcon} size={15} />
                            </button>

                            {activeMenuId === patient.id && (
                              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-lg py-1 z-30 text-left">
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    alert(`View Profile: ${patient.name}`);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                  View Clinical File
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    alert(`Schedule Appointment for ${patient.name}`);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                  Book Appointment
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    alert(`Generate Invoice for ${patient.name}`);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                  Create Invoice
                                </button>
                                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setPatients(patients.filter((p) => p.id !== patient.id));
                                  }}
                                  className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                                >
                                  Archive Patient
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination info */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing <span className="font-medium text-slate-700 dark:text-slate-300">1</span> to{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">{filteredPatients.length}</span> of{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">{patients.length}</span> patients
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 opacity-50 cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-2 font-semibold text-slate-800 dark:text-slate-200">1</span>
            <button
              disabled
              className="px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 opacity-50 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ─── Add Patient Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Register New Patient
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create medical file and assign patient identification number
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Waweru"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Age & Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      className="w-20 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Child">Pediatric</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Insurance / Payment Scheme
                  </label>
                  <select
                    value={newPatient.insurance}
                    onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Self Pay (M-Pesa)">Self Pay (M-Pesa)</option>
                    <option value="Self Pay (Cash)">Self Pay (Cash)</option>
                    <option value="SHA / Jubilee Insurance">SHA / Jubilee Insurance</option>
                    <option value="AAR Healthcare">AAR Healthcare</option>
                    <option value="Britam Dental">Britam Dental</option>
                    <option value="Old Mutual Health">Old Mutual Health</option>
                    <option value="SHA Direct (Civil Servants)">SHA Direct (Civil Servants)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Medical / Allergy Alerts
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin allergy, diabetic, pregnant, none"
                    value={newPatient.dentalAlert}
                    onChange={(e) => setNewPatient({ ...newPatient, dentalAlert: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#057a55] hover:bg-[#046c4b] shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Learn Drawer / Modal ─── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Patients Directory: Quick Guide
                </h3>
              </div>
              <button
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 rounded">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                  Patient Records & Clinical Compliance
                </p>
                <p>
                  Every patient registered in Smilux receives a unique Kenya Medical Practitioners and Dentists Board (KMPDC)-compliant file identifier with complete audit trails.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Capabilities</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Interactive Dental Charting:</strong> Click the tooth icon on any row to open the FDI 2-digit dental charting canvas.
                  </li>
                  <li>
                    <strong>SHA & Insurance Claims:</strong> Pre-validate insurance status directly from the patient record before booking procedures.
                  </li>
                  <li>
                    <strong>Batch Operations:</strong> Use the three-dots button at the top header to import existing Excel/CSV files or export patient contact lists.
                  </li>
                  <li>
                    <strong>M-Pesa STK Push:</strong> Send payment reminders and direct M-Pesa billing prompts directly from the patient profile.
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsLearnModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

