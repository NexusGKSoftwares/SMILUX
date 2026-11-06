import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Search01Icon,
  Add01Icon,
  UserGroupIcon,
  ArrowRight01Icon
} from '@hugeicons/react';

export default function Patients({ onSelectPatient }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('1992-06-15');
  const [gender, setGender] = useState('Female');
  const [phone, setPhone] = useState('+254');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadPatients();
  }, [search]);

  const loadPatients = async () => {
    try {
      const res = await api.get('/patients', { params: { search } });
      setPatients(res.data.patients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/patients', {
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email
      });
      setShowModal(false);
      loadPatients();
      if (onSelectPatient) onSelectPatient(res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering patient');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search01Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name, number, phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm shadow-blue-200"
        >
          <Add01Icon size={16} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Patient Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Patient ID & Name</th>
              <th className="p-4">Gender & DOB</th>
              <th className="p-4">Phone & Email</th>
              <th className="p-4">Insurance</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading directory...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No patient records found</td></tr>
            ) : (
              patients.map(p => (
                <tr key={p._id} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                        {p.firstName[0]}{p.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{p.firstName} {p.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{p.patientNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <p className="font-medium">{p.gender}</p>
                    <p className="text-[10px] text-slate-400">{new Date(p.dob).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4 text-slate-600">
                    <p className="font-medium">{p.phone}</p>
                    <p className="text-[10px] text-slate-400">{p.email || 'N/A'}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                      {p.insuranceInfo?.providerName || 'Self Pay'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onSelectPatient(p._id)}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg"
                    >
                      <span>View Profile</span>
                      <ArrowRight01Icon size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Register Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Register New Patient</h3>
            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
