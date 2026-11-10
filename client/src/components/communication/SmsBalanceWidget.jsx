import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BubbleChatIcon,
  FlashIcon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import Button from '../UI/Button.jsx';

const SMS_PACKAGES = [
  { credits: 500, price: 'KES 500', label: 'Basic Clinic Pack' },
  { credits: 2000, price: 'KES 1,800', popular: true, label: 'Standard Practice Pack' },
  { credits: 5000, price: 'KES 4,000', label: 'Pro Dental SaaS Pack' },
];

export default function SmsBalanceWidget() {
  const [balance, setBalance] = useState(1450);
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState('0712345678');
  const [selectedPkg, setSelectedPkg] = useState(SMS_PACKAGES[1]);
  const [loading, setLoading] = useState(false);
  const [stkSent, setStkSent] = useState(false);

  const handleStkPush = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStkSent(true);
      setBalance((prev) => prev + selectedPkg.credits);
      setTimeout(() => {
        setStkSent(false);
        setModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="hidden md:flex items-center gap-2 px-1 py-1 rounded border border-slate-200 bg-slate-50/90 hover:bg-slate-100/90 hover:border-slate-300 transition-all cursor-pointer font-sans"
        title="Patient SMS Reminders Balance · Click to Top Up"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-green text-emerald-700">
          <HugeiconsIcon icon={BubbleChatIcon} size={13} className='text-white' />
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-800">{balance.toLocaleString()}</span>
          <span className="text-[11px] font-medium text-slate-500">SMS</span>
        </div>
        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200 uppercase">

          Top Up
        </span>
      </button>

      {/* M-Pesa SMS Top Up Modal */}
      {modalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 font-sans animate-in fade-in duration-150">
            <div className="relative w-full max-w-md rounded border border-slate-200 bg-white p-5   space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-emerald-600 text-white  ">
                    <HugeiconsIcon icon={BubbleChatIcon} size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Top Up SMS Credits</h3>
                    <p className="text-xs text-slate-500">Safaricom M-Pesa STK Push Prompt</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </button>
              </div>

              {stkSent ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={28} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">M-Pesa Prompt Sent!</h4>
                  <p className="text-xs text-slate-600">
                    Please enter your M-Pesa PIN on handset <strong className="text-slate-900">{phone}</strong> to complete payment.
                  </p>
                  <p className="text-[11px] font-bold text-emerald-600">
                    +{selectedPkg.credits.toLocaleString()} SMS Credits Added!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleStkPush} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Select SMS Credit Package
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {SMS_PACKAGES.map((pkg) => (
                        <div
                          key={pkg.credits}
                          onClick={() => setSelectedPkg(pkg)}
                          className={`
                            flex items-center justify-between p-3 rounded border cursor-pointer transition-all
                            ${selectedPkg.credits === pkg.credits
                              ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 font-bold'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                            }
                          `.trim()}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-extrabold text-slate-900">
                              {pkg.credits.toLocaleString()} SMS
                            </span>
                            <span className="text-xs text-slate-500 font-medium">({pkg.label})</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-700">{pkg.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712 345 678"
                      className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="w-full h-10 font-bold bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white"
                  >
                    {loading ? 'Initiating M-Pesa STK Push...' : `Pay ${selectedPkg.price} via M-Pesa`}
                  </Button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
