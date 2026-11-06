import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Calendar01Icon, Add01Icon, Checkmark01Icon } from '@hugeicons/react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);

  // Form state
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('11:30');
  const [type, setType] = useState('Consultation');

  useEffect(() => {
    loadAppointments();
    api.get('/patients').then(res => {
      setPatients(res.data.patients || []);
      if (res.data.patients?.length > 0) setPatientId(res.data.patients[0]._id);
    });
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await api.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        patientId,
        dentistId: '65f000000000000000000001', // Default dentist ID or current user
        date,
        startTime,
        endTime,
        type
      });
      setShowModal(false);
      loadAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating appointment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Reservations & Schedule</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2"
        >
          <Add01Icon size={16} />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase">
              <th className="p-4">Date & Time</th>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Dentist</th>
              <th className="p-4">Appointment Type</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading schedule...</td></tr>
            ) : appointments.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No scheduled appointments found</td></tr>
            ) : (
              appointments.map(app => (
                <tr key={app._id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-semibold text-slate-900">{app.date} ({app.startTime} - {app.endTime})</td>
                  <td className="p-4 font-bold text-slate-800">
                    {app.patientId?.firstName} {app.patientId?.lastName}
                  </td>
                  <td className="p-4 text-slate-600">{app.dentistId?.name || 'Dr. John Doe'}</td>
                  <td className="p-4 text-slate-600">{app.type}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Book Appointment</h3>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Select Patient</label>
                <select value={patientId} onChange={e => setPatientId(e.target.value)} className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs">
                  {patients.map(p => (
                    <option key={p._id} value={p._id}>{p.firstName} {p.lastName} ({p.patientNumber})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Start Time</label>
                  <input type="text" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="09:00" required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">End Time</label>
                  <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="09:30" required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Appointment Type</label>
                <input type="text" value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
