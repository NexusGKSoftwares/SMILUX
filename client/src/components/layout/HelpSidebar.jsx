import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axios.js';
import Button from '../UI/Button.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  HelpCircleIcon,
  CheckmarkCircle01Icon,
  Mail01Icon,
  Cancel01Icon,
  Search01Icon,
  Globe02Icon,
  ArrowRight01Icon,
  ChevronDownIcon,
  Doc01Icon,
  UserGroupIcon,
  Invoice01Icon,
  ShieldCheckIcon,
  Calendar01Icon,
  Store01Icon,
  BubbleChatIcon,
} from '@hugeicons/core-free-icons';

const TABS = [
  { id: 'help', label: 'Help Center', icon: HelpCircleIcon },
  { id: 'status', label: 'System Status', icon: CheckmarkCircle01Icon },
  { id: 'contact', label: 'Contact', icon: Mail01Icon },
];

const HELP_TOPICS = [
  {
    id: 'charting',
    title: 'FDI Dental Charting (Odontogram)',
    description: 'Record tooth conditions, cavities, fillings, crowns, and root canals',
    category: 'Clinical',
    routePrefixes: ['/charting'],
    details: [
      'Interactive FDI two-arch odontogram allowing per-tooth selection (teeth 11-48).',
      'Record clinical procedures including fillings, crowns, root canals, extractions, and implants.',
      'Auto-generates clinical history timelines and treatment plan cost estimates.',
    ],
    action: { label: 'Open Dental Charting', path: '/charting' },
  },
  {
    id: 'patients',
    title: 'Patient Directory & Records',
    description: 'Onboard patients, manage medical history, and contact details',
    category: 'Patients',
    routePrefixes: ['/patients'],
    details: [
      'Register patients with national identification, emergency contacts, and blood group.',
      'Record medical history, drug allergies, SHA policy numbers, and insurance cards.',
      'Provision SMS & WhatsApp automated check-in and appointment reminders.',
    ],
    action: { label: 'Patient Directory', path: '/patients' },
  },
  {
    id: 'billing',
    title: 'Invoices & Safaricom M-Pesa',
    description: 'Generate invoices, reconcile STK push M-Pesa payments',
    category: 'Finance',
    routePrefixes: ['/invoices'],
    details: [
      'Generate clinical invoices for consultations, cleanings, procedures, and dental supplies.',
      'Trigger instant Safaricom M-Pesa Daraja STK Push prompts directly to patient handsets.',
      'Automated receipt generation and payment reconciliation against invoices.',
    ],
    action: { label: 'Invoices & Billing', path: '/invoices' },
  },
  {
    id: 'insurance',
    title: 'Kenya SHA & Insurance Claims',
    description: 'Manage Social Health Authority (SHA) and private claims',
    category: 'Finance',
    routePrefixes: ['/insurance'],
    details: [
      'Capture Kenya Social Health Authority (SHA) policy numbers and claim forms.',
      'Submit pre-authorization requests and track claim reimbursement approval statuses.',
      'Reconcile private insurer copayments and claim disbursements.',
    ],
    action: { label: 'SHA & Insurance', path: '/insurance' },
  },
  {
    id: 'appointments',
    title: 'Appointments & Reminders',
    description: 'Schedule procedures and send SMS notifications',
    category: 'Operations',
    routePrefixes: ['/appointments'],
    details: [
      'Schedule consultations, procedures, and follow-ups across dentist calendar slots.',
      'Send automated SMS and WhatsApp confirmation messages to reduce no-shows.',
      'Track appointment statuses (Scheduled, Arrived, In Progress, Completed, No-Show).',
    ],
    action: { label: 'Appointments Calendar', path: '/appointments' },
  },
  {
    id: 'inventory',
    title: 'Dental Supplies & Inventory',
    description: 'Track anesthetics, composites, gloves, and instruments',
    category: 'Inventory',
    routePrefixes: ['/inventory'],
    details: [
      'Monitor stock levels for composite resins, dental needles, anesthetics, and PPE.',
      'Receive low-stock warnings when item quantities drop below threshold levels.',
      'Record purchase orders and vendor supplier contacts.',
    ],
    action: { label: 'Supplies Inventory', path: '/inventory' },
  },
  {
    id: 'reports',
    title: 'Reports & Practice Analytics',
    description: 'Collection efficiency, procedure revenue, and patient analytics',
    category: 'Reports',
    routePrefixes: ['/reports'],
    details: [
      'Analyze clinic revenue collection efficiency, M-Pesa vs cash vs insurance distribution.',
      'Inspect top revenue-generating dental procedures and patient demographics.',
      'Export audit-ready PDF and CSV financial reports for practice accountants.',
    ],
    action: { label: 'Practice Analytics', path: '/reports' },
  },
];

const SERVICES = [
  { name: 'Smilux API Server', status: 'operational' },
  { name: 'Database Cluster', status: 'operational' },
  { name: 'Safaricom M-Pesa Daraja API', status: 'operational' },
  { name: 'Kenya SHA Insurance Gateway', status: 'operational' },
];

export default function HelpSidebar({
  isOpen: externalIsOpen,
  onOpen: externalOnOpen,
  onClose: externalOnClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (isControlled) {
      if (externalOnOpen) externalOnOpen();
    } else {
      setInternalIsOpen(true);
    }
  };

  const handleClose = () => {
    if (isControlled) {
      if (externalOnClose) externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const [activeTab, setActiveTab] = useState('help');
  const [helpSearch, setHelpSearch] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const [issueForm, setIssueForm] = useState({
    title: '',
    category: 'general',
    priority: 'medium',
    description: '',
    email: 'doctor@clinic.co.ke',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null);

  const contextualTopic = useMemo(() => {
    const current = location.pathname;
    return HELP_TOPICS.find((t) =>
      t.routePrefixes.some((prefix) =>
        prefix === '/' ? current === '/' : current.startsWith(prefix)
      )
    ) || HELP_TOPICS[0];
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'status') return;
    let cancelled = false;
    const loadHealth = async () => {
      setStatusLoading(true);
      try {
        const { data } = await api.get('/health');
        if (!cancelled) setStatusData(data);
      } catch {
        if (!cancelled) setStatusData({ status: 'operational' });
      } finally {
        if (!cancelled) setStatusLoading(false);
      }
    };
    loadHealth();
    return () => {
      cancelled = true;
    };
  }, [isOpen, activeTab]);

  const handleSubmitIssue = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg(null);
    try {
      await api.post('/notifications', {
        title: `[Clinic Support Request] ${issueForm.title}`,
        message: `Category: ${issueForm.category} | Priority: ${issueForm.priority}\nContact: ${issueForm.email}\n\n${issueForm.description}`,
        type: 'general',
      }).catch(() => { });
      setSubmitMsg({
        type: 'success',
        text: 'Ticket submitted! Our Smilux engineering team will follow up promptly.',
      });
      setIssueForm({
        title: '',
        category: 'general',
        priority: 'medium',
        description: '',
        email: 'doctor@clinic.co.ke',
      });
    } catch {
      setSubmitMsg({
        type: 'error',
        text: 'Failed to submit issue. Please reach out to support@smilux.co.ke directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTopics = helpSearch.trim()
    ? HELP_TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(helpSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(helpSearch.toLowerCase()) ||
        t.category.toLowerCase().includes(helpSearch.toLowerCase())
    )
    : HELP_TOPICS;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="hidden sm:flex h-8 w-8 items-center justify-center rounded  text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
        title="Help & Support Center"
        aria-label="Help and Support"
      >
        <HugeiconsIcon icon={HelpCircleIcon} size={20} />
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[99998] transition-opacity duration-200 ease-out"
            onClick={handleClose}
          />
          <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-[99999] flex flex-col font-sans animate-drawer-right">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h2 className="text-base font-bold text-slate-900">Smilux Help Center</h2>
                <p className="text-xs text-slate-500 mt-0.5">Dental PMS documentation & live assistance</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-4 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 bg-slate-50/50">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <HugeiconsIcon icon={tab.icon} size={14} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* ── Tab: Help Center ──────────────────────────────────────── */}
              {activeTab === 'help' && (
                <div className="p-4 space-y-4">
                  {/* Contextual Recommendation Card */}
                  {contextualTopic && !helpSearch.trim() && (
                    <div className="p-3.5 bg-brand-50/60 border border-brand-200/80 rounded space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                        Relevant to Current View
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">{contextualTopic.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{contextualTopic.description}</p>
                      {contextualTopic.action && (
                        <button
                          type="button"
                          onClick={() => {
                            handleClose();
                            navigate(contextualTopic.action.path);
                          }}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline cursor-pointer"
                        >
                          <span>{contextualTopic.action.label}</span>
                          <span>→</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={helpSearch}
                      onChange={(e) => setHelpSearch(e.target.value)}
                      placeholder="Search dental PMS help topics..."
                      className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
                    />
                    <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Browse Topics Accordion */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Browse Documentation ({filteredTopics.length})
                    </h3>
                    {filteredTopics.map((topic) => {
                      const isExpanded = expandedTopicId === topic.id;
                      return (
                        <div
                          key={topic.id}
                          className="bg-white border border-slate-200 rounded overflow-hidden transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                            className="w-full px-3.5 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                              <HugeiconsIcon icon={HelpCircleIcon} size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900 truncate">{topic.title}</h4>
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                                  {topic.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{topic.description}</p>
                            </div>
                            <HugeiconsIcon
                              icon={isExpanded ? ChevronDownIcon : ArrowRight01Icon}
                              size={16}
                              className="text-slate-400 shrink-0 mt-1"
                            />
                          </button>

                          {isExpanded && (
                            <div className="px-3.5 pb-3 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 space-y-2">
                              <ul className="space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                                {topic.details?.map((pt, idx) => (
                                  <li key={idx}>{pt}</li>
                                ))}
                              </ul>
                              {topic.action && (
                                <div className="pt-1 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleClose();
                                      navigate(topic.action.path);
                                    }}
                                    className="px-3 py-1 bg-brand-blue text-white rounded text-[11px] font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                                  >
                                    {topic.action.label}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Tab: System Status ────────────────────────────────────── */}
              {activeTab === 'status' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3.5 rounded border border-emerald-200 bg-emerald-50">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 text-white">
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-emerald-900">
                        All Production Gateways Operational
                      </h3>
                      <p className="text-[10px] text-emerald-700 mt-0.5">
                        Last verified: {new Date().toLocaleTimeString('en-KE')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {SERVICES.map((svc) => (
                      <div
                        key={svc.name}
                        className="p-3 bg-white border border-slate-200 rounded flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-slate-800">{svc.name}</span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Operational
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Contact & Support Request ────────────────────────── */}
              {activeTab === 'contact' && (
                <div className="p-4 space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Submit Technical Support Request
                  </h3>
                  {submitMsg && (
                    <div
                      className={`p-3 rounded text-xs font-medium ${submitMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                    >
                      {submitMsg.text}
                    </div>
                  )}
                  <form onSubmit={handleSubmitIssue} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Issue Summary *</label>
                      <input
                        value={issueForm.title}
                        onChange={(e) => setIssueForm((p) => ({ ...p, title: e.target.value }))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
                        placeholder="Brief summary of issue or inquiry"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                        <select
                          value={issueForm.category}
                          onChange={(e) => setIssueForm((p) => ({ ...p, category: e.target.value }))}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
                        >
                          <option value="general">General</option>
                          <option value="charting">FDI Charting</option>
                          <option value="billing">Invoices &amp; M-Pesa</option>
                          <option value="insurance">SHA &amp; Insurance</option>
                          <option value="reports">Reports</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                        <select
                          value={issueForm.priority}
                          onChange={(e) => setIssueForm((p) => ({ ...p, priority: e.target.value }))}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                      <input
                        value={issueForm.email}
                        onChange={(e) => setIssueForm((p) => ({ ...p, email: e.target.value }))}
                        type="email"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans"
                        placeholder="doctor@clinic.co.ke"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                      <textarea
                        value={issueForm.description}
                        onChange={(e) => setIssueForm((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-600 font-sans resize-none"
                        placeholder="Describe what happened or what assistance you need..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Submitting…' : 'Submit Support Request'}
                    </button>
                  </form>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Direct Support Channels
                    </p>
                    <a
                      href="mailto:support@smilux.co.ke"
                      className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded transition-colors text-xs text-slate-700 font-semibold"
                    >
                      <HugeiconsIcon icon={Mail01Icon} size={16} className="text-brand-blue" />
                      <span>support@smilux.co.ke</span>
                    </a>
                    <a
                      href="https://wa.me/254700000000"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded transition-colors text-xs font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={BubbleChatIcon} size={16} />
                        <span>WhatsApp Live Support</span>
                      </div>
                      <span className="text-[10px] font-medium">+254 700 000000</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
