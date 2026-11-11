import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../UI/Button.jsx';

function CloseIcon({ className = 'w-4 h-4 text-[#222323]' }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = 'w-4 h-4 text-[#7B4DFF] shrink-0' }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9L7.5 12.75L14.25 5.25" stroke="#7B4DFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.00673 0.520509C6.34011 0.187227 6.79222 0 7.26362 0C7.73502 0 8.18713 0.187227 8.52051 0.520509L14.0067 6.00673C14.34 6.34011 14.5272 6.79222 14.5272 7.26362C14.5272 7.73502 14.34 8.18713 14.0067 8.52051L8.52051 14.0067C8.18713 14.34 7.73502 14.5272 7.26362 14.5272C6.79222 14.5272 6.34011 14.34 6.00673 14.0067L0.520509 8.52051C0.187227 8.18713 0 7.73502 0 7.26362C0 6.79222 0.187227 6.34011 0.520509 6.00673L6.00673 0.520509Z" fill="#7B4DFF" />
    </svg>
  );
}

function SparkleStarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2201_12866)">
        <path d="M6.32174 3.67841C6.63429 3.36596 7.05813 3.19043 7.50007 3.19043C7.94201 3.19043 8.36586 3.36596 8.67841 3.67841L13.8217 8.82174C14.1342 9.13429 14.3097 9.55813 14.3097 10.0001C14.3097 10.442 14.1342 10.8659 13.8217 11.1784L8.67841 16.3217C8.36586 16.6342 7.94201 16.8097 7.50007 16.8097C7.05813 16.8097 6.63429 16.6342 6.32174 16.3217L1.17841 11.1784C0.865955 10.8659 0.69043 10.442 0.69043 10.0001C0.69043 9.55813 0.865955 9.13429 1.17841 8.82174L6.32174 3.67841Z" fill="#7B4DFF" />
        <path d="M11.8392 3.67785C11.994 3.52301 12.1778 3.40019 12.38 3.31639C12.5823 3.23259 12.7991 3.18945 13.018 3.18945C13.2369 3.18945 13.4537 3.23259 13.656 3.31639C13.8582 3.40019 14.042 3.52301 14.1967 3.67785L19.3392 8.82118C19.6517 9.13373 19.8272 9.55757 19.8272 9.99951C19.8272 10.4415 19.6517 10.8653 19.3392 11.1778L14.1967 16.3212C14.042 16.476 13.8582 16.5988 13.656 16.6826C13.4537 16.7664 13.2369 16.8096 13.018 16.8096C12.7991 16.8096 12.5823 16.7664 12.38 16.6826C12.1778 16.5988 11.994 16.476 11.8392 16.3212L11.1426 15.6245L15.5892 11.1778C15.9017 10.8653 16.0772 10.4415 16.0772 9.99951C16.0772 9.55757 15.9017 9.13373 15.5892 8.82118L11.1426 4.37451L11.8392 3.67785Z" fillRule="evenodd" clipRule="evenodd" fill="#7B4DFF" />
      </g>
      <defs>
        <clipPath id="clip0_2201_12866">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}

function CrownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2201_12984)">
        <path d="M9.00438 4.94247C9.1282 4.8186 9.27521 4.72034 9.43701 4.6533C9.59881 4.58626 9.77224 4.55176 9.94738 4.55176C10.1225 4.55176 10.2959 4.58626 10.4578 4.6533C10.6196 4.72034 10.7666 4.8186 10.8904 4.94247L15.0044 9.05714C15.2543 9.30718 15.3948 9.64625 15.3948 9.99981C15.3948 10.3534 15.2543 10.6924 15.0044 10.9425L10.8904 15.0571C10.7666 15.181 10.6196 15.2793 10.4578 15.3463C10.2959 15.4134 10.1225 15.4479 9.94738 15.4479C9.77224 15.4479 9.59881 15.4134 9.43701 15.3463C9.27521 15.2793 9.1282 15.181 9.00438 15.0571L4.89038 10.9425C4.64042 10.6924 4.5 10.3534 4.5 9.99981C4.5 9.64625 4.64042 9.30718 4.89038 9.05714L9.00438 4.94247Z" fill="#7B4DFF" />
        <path d="M13.419 4.94247C13.6691 4.69251 14.0082 4.55209 14.3617 4.55209C14.7153 4.55209 15.0543 4.69251 15.3044 4.94247L19.419 9.05714C19.669 9.30718 19.8094 9.64625 19.8094 9.99981C19.8094 10.3534 19.669 10.6924 19.419 10.9425L15.3044 15.0571C15.0543 15.3071 14.7153 15.4475 14.3617 15.4475C14.0082 15.4475 13.6691 15.3071 13.419 15.0571L12.8617 14.4998L16.419 10.9425C16.669 10.6924 16.8094 10.3534 16.8094 9.99981C16.8094 9.64625 16.669 9.30718 16.419 9.05714L12.8617 5.49981L13.419 4.94247ZM6.39038 4.94247C6.26656 4.8186 6.11955 4.72034 5.95775 4.6533C5.79595 4.58626 5.62252 4.55176 5.44738 4.55176C5.27224 4.55176 5.09881 4.58626 4.93701 4.6533C4.77521 4.72034 4.6282 4.8186 4.50438 4.94247L0.390382 9.05714C0.140421 9.30718 0 9.64625 0 9.99981C0 10.3534 0.140421 10.6924 0.390382 10.9425L4.50438 15.0571C4.6282 15.181 4.77521 15.2793 4.93701 15.3463C5.09881 15.4134 5.27224 15.4479 5.44738 15.4479C5.62252 15.4479 5.79595 15.4134 5.95775 15.3463C6.11955 15.2793 6.26656 15.181 6.39038 15.0571L6.94772 14.4998L3.39038 10.9425C3.14042 10.6924 3 10.3534 3 9.99981C3 9.64625 3.14042 9.30718 3.39038 9.05714L6.94772 5.49981L6.39038 4.94247Z" fillRule="evenodd" clipRule="evenodd" fill="#7B4DFF" />
      </g>
      <defs>
        <clipPath id="clip0_2201_12984">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>cart-large-bold-duotone</title><g fill="currentColor"><path d="M7.50017 17.9998C8.32852 17.9998 9.00005 18.6714 9.00017 19.4998C9.00017 20.3282 8.32859 20.9998 7.50017 20.9998C6.67174 20.9998 6.00017 20.3282 6.00017 19.4998C6.00028 18.6715 6.67181 17.9998 7.50017 17.9998Z"/><path d="M16.5002 17.9998C17.3285 17.9998 18 18.6715 18.0002 19.4998C18.0002 20.3282 17.3286 20.9998 16.5002 20.9998C15.6717 20.9998 15.0002 20.3282 15.0002 19.4998C15.0003 18.6715 15.6718 17.9998 16.5002 17.9998Z"/><path d="M1.28923 2.76248C1.42037 2.36978 1.84465 2.1579 2.23747 2.28884L2.50212 2.37673C2.51532 2.38113 2.52904 2.38604 2.54216 2.39041C3.16816 2.59905 3.69736 2.77501 4.11345 2.96853C4.55588 3.17435 4.94051 3.42989 5.23161 3.83377C5.52249 4.23747 5.64305 4.6822 5.69841 5.16677C5.75048 5.62288 5.75019 6.18133 5.75017 6.84158V9.49978C5.75017 10.9352 5.75213 11.9368 5.85368 12.6922C5.95232 13.4256 6.13274 13.8139 6.40935 14.0906C6.68611 14.3674 7.07498 14.5486 7.80876 14.6472C8.56404 14.7487 9.56506 14.7498 11.0002 14.7498H18.0002C18.4143 14.7498 18.7501 15.0857 18.7502 15.4998C18.7502 15.914 18.4144 16.2498 18.0002 16.2498H10.9455C9.5779 16.2498 8.47553 16.2501 7.60856 16.1336C6.70847 16.0126 5.95071 15.7531 5.3488 15.1511C4.74703 14.5493 4.48836 13.7914 4.36735 12.8914C4.25083 12.0245 4.25014 10.9219 4.25017 9.55447V6.88259C4.25016 6.17012 4.24933 5.69855 4.20817 5.33767C4.16917 4.99607 4.10115 4.8306 4.01481 4.71072C3.92843 4.59087 3.79329 4.47392 3.48161 4.32888C3.15221 4.17564 2.70474 4.025 2.02849 3.79959L1.76286 3.7117C1.37006 3.58062 1.15827 3.15535 1.28923 2.76248Z"/><path d="M11.0002 8.24978C11.4143 8.24978 11.75 8.58567 11.7502 8.99978C11.7502 9.41399 11.4144 9.74978 11.0002 9.74978H8.00017C7.58595 9.74978 7.25017 9.41399 7.25017 8.99978C7.25028 8.58567 7.58602 8.24978 8.00017 8.24978H11.0002Z"/><path d="M5.74512 5.99997C5.75008 6.25909 5.75008 6.53954 5.75007 6.84137L5.75006 9.49997C5.75006 10.9354 5.75166 11.9365 5.85321 12.6918C5.86803 12.8021 5.8847 12.9045 5.90326 13H16.0221C16.9815 13 17.4612 13 17.8369 12.7522C18.2126 12.5045 18.4016 12.0636 18.7795 11.1817L19.2081 10.1817C20.0176 8.29291 20.4223 7.3485 19.9777 6.67423C19.5331 5.99997 18.5056 5.99997 16.4507 5.99997H5.74512Z" opacity=".5"/></g></svg>
  );
}

/**
 * Animated price counter that smoothly counts up/down between prices
 * with an ease-out cubic curve (similar to shadcn pricing ticker)
 */
function AnimatedPrice({ value, duration = 380, prefix = '$' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value;
    if (start === end) return;

    let startTime = null;
    let animId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);

      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        prevValueRef.current = end;
        setDisplayValue(end);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      prevValueRef.current = end;
    };
  }, [value, duration]);

  return (
    <>
      {prefix}{displayValue}
    </>
  );
}

/**
 * Enterprise Plans Dialog Modal tailored specifically for Smilux Dental SaaS:
 * - Brand Color Theme: Purple #7B4DFF
 * - Background: linear-gradient(180deg, #F6F3FF 0%, #DED0FF 100%)
 * - Dental Practice Plans: Essential ($29), Professional ($59 - Most Popular), Premium ($99)
 */
export default function PlansModal({ isOpen, onClose }) {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, ready: false });
  const monthlyBtnRef = useRef(null);
  const annualBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const updateIndicator = () => {
      const activeBtn = billingCycle === 'monthly' ? monthlyBtnRef.current : annualBtnRef.current;
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          ready: true,
        });
      }
    };
    const id = requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [billingCycle, isOpen]);

  if (!isOpen) return null;

  const essentialFeatures = [
    'Up to 2 Dental Chairs / Operatories',
    'Digital Patient Records & Medical History',
    'Appointment Scheduling & Calendar',
    'Adult & Pediatric Dental Charting',
    'Unlimited Front Desk & Nurse Accounts',
    'Invoicing, M-Pesa STK & Receipts',
    'Automated SMS Appointment Reminders',
    'Daily Revenue & Treatment Reports',
  ];

  const professionalFeatures = [
    'Interactive 3D / 2D Dental Charting & Perio',
    'Multi-Dentist Roster & Chair Scheduling',
    'Dental Consumables & Inventory Tracking',
    'Treatment Plans with Staged Estimates',
    'Insurance & SHA Pre-Authorizations',
    'Dental Lab Work Orders & Prosthetics',
    'Automated WhatsApp & SMS Recall Reminders',
    'Clinical Practice Performance Analytics',
  ];

  const premiumFeatures = [
    'Multi-Branch Clinic Management & Central HQ',
    'Central Dental Warehouse & Purchase Orders',
    'FEFO Batch Expiry & Low-Stock Alerts',
    'DICOM & Dental X-Ray Image Archiving (PACS)',
    'Digital Consent Forms with E-Signatures',
    'Automated KRA eTIMS & M-Pesa C2B Integration',
    'Custom Clinical Audit Trails & Permissions',
    'Dedicated Account Manager & Open API Access',
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
        className="relative w-full border-2 border-white max-w-[1152px] bg-white rounded-[4px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-start overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-150 font-['Inter',sans-serif] select-text max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full h-12 box-border flex flex-row items-center justify-between px-4 border-b border-[#E7E7E7] bg-white shrink-0">
          <h2
            id="plans-dialog-title"
            className="text-[18px] leading-[22px] font-semibold text-[#222323] tracking-normal"
          >
            Dental Practice Plans
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="box-border flex items-center justify-center w-9 h-8 rounded-[4px] text-[#222323] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <CloseIcon className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Modal Main Content Container with Brand Purple Gradient */}
        <div className="w-full p-4 flex flex-col gap-3 bg-[linear-gradient(180deg,#F6F3FF_0%,#DED0FF_100%)] overflow-y-auto">
          {/* Subheader: Select a Plan, Billing Toggle & Comparison link */}
          <div className="w-full flex flex-row items-center justify-between gap-4 flex-wrap">
            <h3 className="text-[18px] leading-[28px] font-semibold text-[#222323]">
              Select a Dental Clinic Plan
            </h3>

            <div className="flex items-center gap-4">
              {/* Annual / Monthly Billing Toggle with smooth sliding motion */}
              <div className="relative inline-flex items-center p-0.5 rounded-full bg-white/90 border border-purple-200/90 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] select-none">
                {/* Gliding active pill indicator */}
                <span
                  aria-hidden="true"
                  style={{
                    transform: `translateX(${indicatorStyle.left}px)`,
                    width: `${indicatorStyle.width}px`,
                  }}
                  className={`absolute top-0.5 bottom-0.5 left-0 rounded-full bg-[#7B4DFF] shadow-xs pointer-events-none ${indicatorStyle.ready ? 'transition-all duration-300 ease-out' : 'opacity-0'
                    }`}
                />

                <button
                  ref={monthlyBtnRef}
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`relative z-10 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${billingCycle === 'monthly'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                    }`}
                >
                  Monthly
                </button>
                <button
                  ref={annualBtnRef}
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${billingCycle === 'annual'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 bg-transparent'
                    }`}
                >
                  <span>Annual</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-all duration-200 ${billingCycle === 'annual'
                      ? 'bg-white/25 text-white'
                      : 'bg-emerald-100 text-emerald-700'
                      }`}
                  >
                    Save 20%
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => alert('Opening Full Dental Feature Comparison matrix...')}
                className="text-[13px] leading-[20px] font-semibold text-[#7B4DFF] hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                See Full Plan Comparison
              </button>
            </div>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {/* ── CARD 1: Essential ── */}
            <div className="w-full bg-white rounded-[4px] shadow-[0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-purple-200 text-[#7B4DFF] text-[12px] leading-[16px] font-medium bg-purple-50/60">
                    Solo &amp; Private Clinics
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-bold text-[#222323]">
                      Essential
                    </h4>
                    <ToothIcon className="w-4 h-4 text-[#7B4DFF]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For solo dentists &amp; private practices to manage appointments &amp; records
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline overflow-hidden">
                    <span
                      key={billingCycle}
                      className="inline-block text-[32px] leading-[40px] font-bold text-[#5733be] animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
                    >
                      {billingCycle === 'annual' ? '$29' : '$36'}
                    </span>
                  </div>
                  <p
                    key={`p1-${billingCycle}`}
                    className="text-[13px] leading-[20px] font-normal text-[#595959] animate-in fade-in duration-300 ease-out"
                  >
                    Per dental chair, per month, {billingCycle === 'annual' ? 'billed annually' : 'billed monthly'}
                  </p>
                </div>

                {/* Contact Sales Action Button (First one: Outline) */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert('Contacting Smilux Dental Sales for Essential Plan...')}
                  className="w-full cursor-pointer"
                >
                  Purchase Plan
                </Button>
              </div>

              {/* Card Features List */}
              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-100">
                <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">
                  Top clinical features:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {essentialFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-[#7B4DFF] shrink-0" />
                      <span className="text-[12px] leading-[16px] font-normal text-[#222323]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── CARD 2: Professional (Most Popular) ── */}
            <div className="w-full bg-white rounded-[4px] shadow-[0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#7B4DFF] text-white text-[12px] leading-[16px] font-medium shadow-sm">
                    Most Popular
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-bold text-[#222323]">
                      Professional
                    </h4>
                    <SparkleStarIcon className="w-4 h-4 text-[#7B4DFF]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For growing dental clinics requiring advanced charting, lab orders &amp; insurance
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline">
                    <span className="text-[32px] leading-[40px] font-bold text-[#5733be] tabular-nums tracking-tight">
                      <AnimatedPrice value={billingCycle === 'annual' ? 59 : 74} />
                    </span>
                  </div>
                  <p className="text-[13px] leading-[20px] font-normal text-[#595959] transition-opacity duration-200">
                    Per dental chair, per month, {billingCycle === 'annual' ? 'billed annually only*' : 'billed monthly*'}
                  </p>
                </div>

                {/* Contact Sales Action Button (Center one: Primary) */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert('Contacting Smilux Dental Sales for Professional Plan...')}
                  className="w-full cursor-pointer"
                >
                  Purchase Plan
                </Button>
              </div>

              {/* Card Features List */}
              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-100">
                <span className="text-[13px] leading-[20px] font-semibold text-[#222323]">
                  Everything in Essential, plus:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {professionalFeatures.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-[#7B4DFF] shrink-0" />
                      <span className="text-[12px] leading-[16px] font-normal text-[#222323]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── CARD 3: Premium (Selected Highlight) ── */}
            <div className="w-full bg-white rounded-[4px] shadow-[0px_0px_0px_2px_#7B4DFF,0px_1px_2px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between min-h-[640px]">
              {/* Card Upper Info */}
              <div className="flex flex-col gap-4">
                {/* Badge */}
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-purple-200 text-[#7B4DFF] text-[12px] leading-[16px] font-medium bg-purple-50/60">
                    Multi-Branch &amp; Full Automation
                  </span>
                </div>

                {/* Plan Title & Icon */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[24px] leading-[32px] font-bold text-[#222323]">
                      Premium
                    </h4>
                    <CrownIcon className="w-4 h-4 text-[#7B4DFF]" />
                  </div>
                  <p className="text-[13px] leading-[20px] font-semibold text-[#222323] min-h-[40px]">
                    For high-volume dental centers &amp; multi-branch groups needing enterprise automation
                  </p>
                </div>

                {/* Pricing & Billing */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline">
                    <span className="text-[32px] leading-[40px] font-bold text-[#5733be] tabular-nums tracking-tight">
                      <AnimatedPrice value={billingCycle === 'annual' ? 99 : 124} />
                    </span>
                  </div>
                  <p className="text-[13px] leading-[20px] font-normal text-[#595959] transition-opacity duration-200">
                    Per dental chair, per month, {billingCycle === 'annual' ? 'billed annually only*' : 'billed monthly*'}
                  </p>
                </div>

                {/* Purchase Plan Button (Last one: Outline) + Trial Pill */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert('Proceeding to Smilux Dental Premium checkout...')}
                    className="w-full cursor-pointer gap-1.5"
                  > 
                    <span>Purchase Plan</span>
                  </Button>

                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-[#6C44E0] text-[12px] leading-[16px] font-medium">
                      14 days left in trial
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
                      <CheckIcon className="w-4 h-4 text-[#7B4DFF] shrink-0" />
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
            <p className="text-[13px] leading-[20px] font-semibold text-[#7B4DFF]">
              Smilux Dental subscriptions are priced based on active dental operatories, billing frequency &amp; clinic branches.
            </p>
          </div>
        </div>

        {/* Dialog Footer Bar */}
        <div className="w-full h-12 box-border flex flex-row justify-end items-center px-4 bg-white rounded-b-[10px] border-t border-[#E7E7E7] shrink-0 gap-3">
          <span className="text-[13px] leading-[20px] font-normal text-[#222323]">
            Not ready to purchase?
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => alert('Opening Smilux Dental checkout...')}
            className="cursor-pointer"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
