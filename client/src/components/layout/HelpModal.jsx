import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

// SVG Icons matching the clean modern outline style in the reference
function BookOpenIcon({ className = 'w-5 h-5 text-slate-800' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ClassicalPillarIcon({ className = 'w-5 h-5 text-slate-800' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V11" />
      <path d="M9 21V11" />
      <path d="M15 21V11" />
      <path d="M19 21V11" />
      <path d="M2 11h20" />
      <path d="M12 3L2 11h20L12 3z" />
    </svg>
  );
}

function ChatBubbleIcon({ className = 'w-5 h-5 text-slate-800' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MailIcon({ className = 'w-5 h-5 text-slate-800' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ExternalArrowIcon({ className = 'w-3.5 h-3.5 text-slate-600' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChatPillIcon({ className = 'w-3.5 h-3.5 text-slate-400' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function HelpModal({ isOpen, onClose, user }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawName = user?.name || 'Stanley Kiprono';
  // If the user's name already includes a title or first name
  const displayName = rawName.trim();

  const handleOpenHelpCenter = () => {
    window.open('https://help.smilux.co.ke', '_blank', 'noopener,noreferrer');
  };

  const handleOpenResourceCenter = () => {
    window.open('https://resources.smilux.co.ke', '_blank', 'noopener,noreferrer');
  };

  const handleLiveSupport = () => {
    setChatActive(true);
    setTimeout(() => {
      alert("Connecting you to Smilux Live Support agent (Available 4pm-4am GMT+3, Mon-Fri)...");
      setChatActive(false);
    }, 300);
  };

  const handleEmailSupport = () => {
    setCopiedEmail(true);
    navigator?.clipboard?.writeText('support@smilux.co.ke');
    setTimeout(() => setCopiedEmail(false), 2500);
    window.location.href = 'mailto:support@smilux.co.ke?subject=Support%20Request%20-%20Smilux%20Dental';
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-support-title"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Centered Modal Card */}
      <div
        className="relative w-full max-w-[960px] my-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-150 font-sans select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2
            id="help-support-title"
            className="text-base font-bold text-slate-900 tracking-tight"
          >
            Help &amp; Support
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Help & Support dialog"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {/* Greeting Hero Section */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hi {displayName}. How can we help?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Choose one of the options below to find the support you need.
            </p>
          </div>

          {/* 4 Support Action Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Help Center */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div>
                <div className="mb-4">
                  <BookOpenIcon className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Help Center</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  Explore guides and tips to get the most out of Smilux.
                </p>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={handleOpenHelpCenter}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer group-hover:border-slate-300"
                >
                  <ClassicalPillarIcon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>Visit Help Center</span>
                  <ExternalArrowIcon className="w-3 h-3 text-slate-500 shrink-0 ml-auto sm:ml-0" />
                </button>
              </div>
            </div>

            {/* Card 2: Resource Center (formerly Fleetio Academy) */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div>
                <div className="mb-4">
                  <ClassicalPillarIcon className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Resource Center</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  Explore certifications &amp; resources to learn Smilux.
                </p>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={handleOpenResourceCenter}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer group-hover:border-slate-300"
                >
                  <span>Visit Resource Center</span>
                  <ExternalArrowIcon className="w-3 h-3 text-slate-500 shrink-0" />
                </button>
              </div>
            </div>

            {/* Card 3: Live Support */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div>
                <div className="mb-4">
                  <ChatBubbleIcon className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Live Support</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  Chat with Smilux experts 4pm-4am (GMT+3), Mon-Fri.
                </p>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={handleLiveSupport}
                  disabled={chatActive}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-600 transition-colors cursor-pointer disabled:opacity-60"
                >
                  <ChatPillIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{chatActive ? 'Connecting...' : 'Chat Now'}</span>
                </button>
              </div>
            </div>

            {/* Card 4: Email */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all group">
              <div>
                <div className="mb-4">
                  <MailIcon className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Email</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  Send a message to our team at support@smilux.co.ke.
                </p>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={handleEmailSupport}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer group-hover:border-slate-300"
                  title="Click to email support@smilux.co.ke"
                >
                  <span>{copiedEmail ? 'Email Copied!' : 'Contact Support'}</span>
                  <ExternalArrowIcon className="w-3 h-3 text-slate-500 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
