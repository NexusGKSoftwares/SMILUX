import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

function CloseIcon({ className = 'w-4 h-4 text-[#222323]' }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = 'w-4 h-4 text-[#00884B] shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke="#00884B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className = 'w-4 h-4 text-[#00884B] shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM13.707 8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function SparkleStarIcon({ className = 'w-4 h-4 text-[#00884B] shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  );
}

function CartIcon({ className = 'w-4 h-4 text-white shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.24-.96A1 1 0 005.06 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );
}

/**
 * Enterprise Plans Dialog Modal matching Figma specifications:
 * - Dimensions: 1152px x 932px
 * - Background: linear-gradient(180deg, #CFF2DB 0%, #77D29C 100%)
 * - 3 Cards: Essential ($4), Professional ($7 - Most Popular), Premium ($10)
 */
export default function PlansModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const essentialFeatures = [
    'Fleets up to 100 vehicles',
    'Vehicle Inventory Management',
    'Vehicle Inspections',
    'Asset Profiles + VIN Lookups',
    'Unlimited Users',
    'Contact & Vendor Management',
    'Fuel Tracking & Analytics',
    'Reporting',
  ];

  const professionalFeatures = [
    'Maintenance Shop Network',
    'Vehicle Assignment Scheduling',
    'Parts Management',
    'Work Orders',
    'Third Party Integrations',
    'Customized Dashboard',
    'API & Webhook Access',
  ];

  const premiumFeatures = [
    'Purchase Orders',
    'Parts & Inventory Management',
    'In-House Maintenance Management',
    'Enhanced Service Tasks with Parts and Labor',
    'Tire Management',
    'Vehicle Warranty Management',
    'Sensor Data',
    'Automated Workflows',
  ];

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plans-dialog-title"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog - Plans */}
      <div
        className="relative w-full max-w-[1152px] bg-white rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-start overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-150 font-['Inter',sans-serif] select-text max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full h-12 box-border flex flex-row items-center justify-between px-4 border-b border-[#E7E7E7] bg-white shrink-0">
          <h2
            id="plans-dialog-title"
            className="text-[18px] leading-[22px] font-semibold text-[#222323] tracking-normal"
          >
            Plans
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="box-border flex items-center justify-center w-9 h-8 rounded-[6px] text-[#222323] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Modal Main Content Container with Mint Green Gradient */}
        <div className="w-full p-4 flex flex-col gap-3 bg-[linear-gradient(180deg,#CFF2DB_0%,#77D29C_100%)] overflow-y-auto">
          {/* Subheader: Select a Plan & Comparison link */}
          <div className="w-full flex flex-row items-center justify-between">
            <h3 className="text-[18px] leading-[28px] font-semibold text-[#222323]">
              Select a Plan
            </h3>
            <button
              type="button"
              onClick={() => alert('Full plan comparison feature is opening...')}
              className="text-[13px] leading-[20px] font-normal text-[#067748] hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              See Full Plan Comparison
            </button>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* ── CARD 1: Essential ── */}
            <div className="w-full bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#686868] text-[#595959] text-[12px] leading-[16px] font-medium bg-transparent">
                    Small Businesses
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-semibold text-[#222323]">
                      Essential
                    </h4>
                    <ShieldCheckIcon className="w-4 h-4 text-[#00884B]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For smaller fleets to organize vehicle inventory &amp;
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline">
                    <span className="text-[32px] leading-[40px] font-normal text-[#222323]">
                      $4
                    </span>
                  </div>
                  <p className="text-[13px] leading-[20px] font-normal text-[#595959]">
                    Per vehicle, per month, billed annually or monthly
                  </p>
                </div>

                {/* Contact Sales Action Button */}
                <button
                  type="button"
                  onClick={() => alert('Contacting Smilux Sales for Essential Plan...')}
                  className="w-full h-8 box-border flex items-center justify-center px-2 rounded-[6px] border border-[#28A466] bg-transparent text-[#067748] text-[13px] leading-[20px] font-medium hover:bg-emerald-50/70 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>

              {/* Card Features List */}
              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-100">
                <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">
                  Top features:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {essentialFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-[#00884B] shrink-0" />
                      <span className="text-[12px] leading-[16px] font-normal text-[#222323]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── CARD 2: Professional (Most Popular) ── */}
            <div className="w-full bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00884B] text-white text-[12px] leading-[16px] font-medium">
                    Most Popular
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-semibold text-[#222323]">
                      Professional
                    </h4>
                    <SparkleStarIcon className="w-4 h-4 text-[#00884B]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For growing fleets to improve service tracking, co
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline">
                    <span className="text-[32px] leading-[40px] font-normal text-[#222323]">
                      $7
                    </span>
                  </div>
                  <p className="text-[13px] leading-[20px] font-normal text-[#595959]">
                    Per vehicle, per month, billed annually only*
                  </p>
                </div>

                {/* Contact Sales Action Button */}
                <button
                  type="button"
                  onClick={() => alert('Contacting Smilux Sales for Professional Plan...')}
                  className="w-full h-8 box-border flex items-center justify-center px-2 rounded-[6px] border border-[#28A466] bg-transparent text-[#067748] text-[13px] leading-[20px] font-medium hover:bg-emerald-50/70 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>

              {/* Card Features List */}
              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-100">
                <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">
                  Everything in Essential, plus:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {professionalFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-[#00884B] shrink-0" />
                      <span className="text-[12px] leading-[16px] font-normal text-[#222323]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── CARD 3: Premium (Selected Highlight) ── */}
            <div className="w-full bg-white rounded-[8px] shadow-[0px_0px_0px_2px_#28A466,0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#686868] text-[#595959] text-[12px] leading-[16px] font-medium bg-transparent">
                    Full Automation &amp; Insights
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-semibold text-[#222323]">
                      Premium
                    </h4>
                    <SparkleStarIcon className="w-4 h-4 text-[#00884B]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For advanced fleets to integrate fleet systems &amp; c
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline">
                    <span className="text-[32px] leading-[40px] font-normal text-[#222323]">
                      $10
                    </span>
                  </div>
                  <p className="text-[13px] leading-[20px] font-normal text-[#595959]">
                    Per vehicle, per month, billed annually only*
                  </p>
                </div>

                {/* Purchase Plan Button + Trial Pill */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Proceeding to checkout for Premium Plan...')}
                    className="w-full h-8 box-border flex items-center justify-center gap-1.5 px-2 rounded-[6px] bg-[#00884B] border border-[#00884B] text-white text-[13px] leading-[20px] font-medium hover:bg-[#007740] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                  >
                    <CartIcon className="w-4 h-4 text-white" />
                    <span>Purchase Plan</span>
                  </button>

                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#C7F1D5] text-[#067748] text-[12px] leading-[16px] font-medium">
                      12 days left in trial
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Features List */}
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-slate-100">
                <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">
                  Everything in Professional, plus:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {premiumFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-[#00884B] shrink-0" />
                      <span className="text-[12px] leading-[16px] font-normal text-[#222323]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footnote text */}
          <div className="w-full py-2 text-center">
            <p className="text-[13px] leading-[20px] font-normal text-[#767676]">
              *Subscriptions are priced based on plan, frequency &amp; fleet size.
            </p>
          </div>
        </div>

        {/* Dialog Footer Bar */}
        <div className="w-full h-16 box-border flex flex-row justify-end items-center px-4 bg-white rounded-b-[10px] border-t border-[#E7E7E7] shrink-0 gap-2">
          <span className="text-[13px] leading-[20px] font-normal text-[#222323]">
            Not ready to purchase?
          </span>
          <button
            type="button"
            onClick={() => alert('Opening Smilux checkout...')}
            className="h-8 box-border flex items-center justify-center px-3 rounded-[6px] bg-[#00884B] border border-[#00884B] text-white text-[13px] leading-[20px] font-medium hover:bg-[#007740] active:scale-[0.99] transition-all cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
