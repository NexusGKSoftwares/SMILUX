import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Invoice01Icon, SmartPhoneIcon, Checkmark01Icon, Add01Icon } from '@hugeicons/react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+254712345678');
  const [processingMpesa, setProcessingMpesa] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await api.get('/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMpesa = (inv) => {
    setSelectedInvoice(inv);
    setShowMpesaModal(true);
  };

  const handleStkPush = async (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    setProcessingMpesa(true);

    try {
      const res = await api.post('/payments/mpesa/stkpush', {
        invoiceId: selectedInvoice._id,
        phoneNumber,
        amount: selectedInvoice.balance
      });

      alert(`M-Pesa STK Push Successful!\nReceipt No: ${res.data.MpesaReceiptNumber}`);
      setShowMpesaModal(false);
      loadInvoices();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing M-Pesa STK Push');
    } finally {
      setProcessingMpesa(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Sales, Invoices & M-Pesa Billing</h3>
          <p className="text-xs text-slate-400">Issued invoices and instant Safaricom Daraja M-Pesa reconciliation</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase">
              <th className="p-4">Invoice #</th>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Paid Amount</th>
              <th className="p-4">Outstanding Balance</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-slate-400">Loading billing ledger...</td></tr>
            ) : invoices.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-slate-400">No invoices recorded</td></tr>
            ) : (
              invoices.map(inv => (
                <tr key={inv._id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-4 font-semibold text-slate-800">
                    {inv.patientId?.firstName} {inv.patientId?.lastName}
                  </td>
                  <td className="p-4 font-bold text-slate-900">KES {inv.totalAmount?.toLocaleString()}</td>
                  <td className="p-4 text-emerald-600 font-semibold">KES {inv.paidAmount?.toLocaleString()}</td>
                  <td className="p-4 text-rose-600 font-semibold">KES {inv.balance?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {inv.balance > 0 && (
                      <button
                        onClick={() => handleOpenMpesa(inv)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center space-x-1 shadow-sm"
                      >
                        <SmartPhoneIcon size={14} />
                        <span>M-Pesa Express</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* M-Pesa STK Push Modal */}
      {showMpesaModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center space-x-3 text-emerald-600">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <SmartPhoneIcon size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">M-Pesa Express STK Push</h3>
                <p className="text-xs text-slate-400">Safaricom Daraja API Payment Prompt</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
              <p><strong className="text-slate-600">Invoice:</strong> {selectedInvoice.invoiceNumber}</p>
              <p><strong className="text-slate-600">Patient:</strong> {selectedInvoice.patientId?.firstName} {selectedInvoice.patientId?.lastName}</p>
              <p className="text-sm font-extrabold text-slate-900 pt-1">Payable Amount: KES {selectedInvoice.balance.toLocaleString()}</p>
            </div>

            <form onSubmit={handleStkPush} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Customer M-Pesa Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="+2547XXXXXXXX"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">A payment prompt will be sent directly to the customer's phone.</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowMpesaModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">Cancel</button>
                <button
                  type="submit"
                  disabled={processingMpesa}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                >
                  <Checkmark01Icon size={16} />
                  <span>{processingMpesa ? 'Initiating STK Push...' : 'Send STK Push'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
