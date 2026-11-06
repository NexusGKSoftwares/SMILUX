import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import DentalChart from '../components/dental/DentalChart';
import { ArrowLeft01Icon, Calendar01Icon, Invoice01Icon, UserIcon, ToothIcon } from '@hugeicons/react';

export default function PatientProfile({ patientId, onBack }) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('chart');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) {
      api.get(`/patients/${patientId}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [patientId]);

  if (loading || !data) {
    return <div className="p-8 text-center text-slate-400 text-xs">Loading patient profile...</div>;
  }

  const { patient, appointments, treatmentPlans, invoices } = data;

  return (
    <div className="space-y-6">
      {/* Back button & Patient Header */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft01Icon size={18} />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-slate-900">{patient.firstName} {patient.lastName}</h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-200">
              {patient.patientNumber}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{patient.gender} &bull; {patient.phone} &bull; {patient.email || 'No Email'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('chart')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
            activeTab === 'chart' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <ToothIcon size={16} />
          <span>Dental Chart (Odontogram)</span>
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
            activeTab === 'overview' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <UserIcon size={16} />
          <span>Patient Info & History</span>
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
            activeTab === 'appointments' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <Calendar01Icon size={16} />
          <span>Appointments ({appointments?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 border-b-2 transition-all flex items-center space-x-1.5 ${
            activeTab === 'invoices' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          <Invoice01Icon size={16} />
          <span>Invoices ({invoices?.length || 0})</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'chart' && (
        <DentalChart patientId={patientId} />
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100">Personal Information</h3>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-600">Full Name:</strong> {patient.firstName} {patient.lastName}</p>
              <p><strong className="text-slate-600">Patient Number:</strong> {patient.patientNumber}</p>
              <p><strong className="text-slate-600">Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
              <p><strong className="text-slate-600">Gender:</strong> {patient.gender}</p>
              <p><strong className="text-slate-600">Phone:</strong> {patient.phone}</p>
              <p><strong className="text-slate-600">Preferred Contact:</strong> {patient.preferredContact}</p>
              <p><strong className="text-slate-600">Address:</strong> {patient.address || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100">Medical History & Insurance</h3>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-rose-600 block mb-1">Allergies:</strong>
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory?.allergies?.map((a, i) => (
                    <span key={i} className="bg-rose-50 text-rose-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-rose-200">{a}</span>
                  )) || <span className="text-slate-400">None reported</span>}
                </div>
              </div>

              <div>
                <strong className="text-amber-600 block mb-1">Existing Conditions:</strong>
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory?.conditions?.map((c, i) => (
                    <span key={i} className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-200">{c}</span>
                  )) || <span className="text-slate-400">None reported</span>}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-slate-700 block mb-1">Insurance & SHA Details:</strong>
                <p className="text-slate-600">Provider: <strong>{patient.insuranceInfo?.providerName || 'Self Pay'}</strong></p>
                <p className="text-slate-600">Policy No: <strong>{patient.insuranceInfo?.policyNumber || 'N/A'}</strong></p>
                <p className="text-slate-600">SHA Registration: <strong>{patient.insuranceInfo?.shaNumber || 'N/A'}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase">
                <th className="p-4">Date & Time</th>
                <th className="p-4">Dentist</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {appointments?.map(app => (
                <tr key={app._id}>
                  <td className="p-4 font-semibold text-slate-900">{app.date} ({app.startTime} - {app.endTime})</td>
                  <td className="p-4 text-slate-600">{app.dentistId?.name || 'Dr. John Doe'}</td>
                  <td className="p-4 text-slate-600">{app.type}</td>
                  <td className="p-4 font-semibold text-blue-600">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase">
                <th className="p-4">Invoice #</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Balance</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {invoices?.map(inv => (
                <tr key={inv._id}>
                  <td className="p-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="p-4 font-bold text-slate-800">KES {inv.totalAmount.toLocaleString()}</td>
                  <td className="p-4 text-emerald-600 font-semibold">KES {inv.paidAmount.toLocaleString()}</td>
                  <td className="p-4 text-rose-600 font-semibold">KES {inv.balance.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
