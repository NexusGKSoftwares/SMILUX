import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Add01Icon, Checkmark01Icon, Clock01Icon } from '@hugeicons/react';

// FDI Tooth numbering
const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const CONDITIONS = [
  { id: 'Healthy', label: 'Healthy', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'Cavity', label: 'Cavity', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'Filling', label: 'Filling', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'Crown', label: 'Crown', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'Bridge', label: 'Bridge', color: 'bg-violet-100 text-violet-800 border-violet-300' },
  { id: 'RootCanal', label: 'Root Canal', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'Extraction', label: 'Extraction Needed', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'Implant', label: 'Implant', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  { id: 'Missing', label: 'Missing', color: 'bg-slate-200 text-slate-700 border-slate-300' }
];

export default function DentalChart({ patientId }) {
  const [chart, setChart] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [surface, setSurface] = useState('Occlusal');
  const [condition, setCondition] = useState('Cavity');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (patientId) {
      loadChart();
    }
  }, [patientId]);

  const loadChart = async () => {
    try {
      const res = await api.get(`/dental-chart/${patientId}`);
      setChart(res.data);
    } catch (err) {
      console.error('Error loading dental chart:', err);
    }
  };

  const getToothState = (toothNum) => {
    if (!chart || !chart.teeth) return null;
    return chart.teeth.find(t => t.toothNumber === toothNum);
  };

  const handleToothClick = (toothNum) => {
    const currentState = getToothState(toothNum);
    setSelectedTooth(toothNum);
    setSurface(currentState?.surface || 'Occlusal');
    setCondition(currentState?.condition || 'Cavity');
    setNotes(currentState?.notes || '');
  };

  const handleSaveTooth = async () => {
    if (!selectedTooth) return;
    setSaving(true);
    try {
      const res = await api.post(`/dental-chart/${patientId}/tooth`, {
        toothNumber: selectedTooth,
        surface,
        condition,
        notes
      });
      setChart(res.data);
      setSelectedTooth(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving tooth condition');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Odontogram Visual Board */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">FDI Dental Arch Odontogram</h3>
            <p className="text-xs text-slate-400">Click any tooth to record conditions or view clinical history</p>
          </div>

          {/* Condition Legend */}
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map(c => (
              <span key={c.id} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${c.color}`}>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Teeth Arch Visualization */}
        <div className="space-y-8 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
          {/* Upper Jaw */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
              Upper Arch (Maxillary)
            </p>
            <div className="flex justify-center gap-1.5 flex-wrap">
              {UPPER_TEETH.map(num => {
                const toothState = getToothState(num);
                const condObj = CONDITIONS.find(c => c.id === toothState?.condition);
                const isSelected = selectedTooth === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleToothClick(num)}
                    className={`w-10 h-16 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'ring-2 ring-blue-600 ring-offset-2 border-blue-500 bg-blue-50'
                        : condObj
                        ? condObj.color
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400">{num}</span>
                    <div className="w-5 h-5 rounded-full border border-slate-300/80 bg-white/80 flex items-center justify-center text-[9px] font-semibold">
                      {toothState ? toothState.condition[0] : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-b border-dashed border-slate-200 w-full" />

          {/* Lower Jaw */}
          <div>
            <div className="flex justify-center gap-1.5 flex-wrap">
              {LOWER_TEETH.map(num => {
                const toothState = getToothState(num);
                const condObj = CONDITIONS.find(c => c.id === toothState?.condition);
                const isSelected = selectedTooth === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleToothClick(num)}
                    className={`w-10 h-16 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'ring-2 ring-blue-600 ring-offset-2 border-blue-500 bg-blue-50'
                        : condObj
                        ? condObj.color
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-slate-300/80 bg-white/80 flex items-center justify-center text-[9px] font-semibold">
                      {toothState ? toothState.condition[0] : ''}
                    </div>
                    <span className="text-[10px] text-slate-400">{num}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-3 text-center">
              Lower Arch (Mandibular)
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal / Condition Popover */}
      {selectedTooth && (
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Update Tooth #{selectedTooth} Condition</h4>
            <button onClick={() => setSelectedTooth(null)} className="text-xs text-slate-400 hover:text-slate-600">Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Tooth Surface</label>
              <select
                value={surface}
                onChange={e => setSurface(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Occlusal">Occlusal (Biting surface)</option>
                <option value="Mesial">Mesial (Front facing)</option>
                <option value="Distal">Distal (Back facing)</option>
                <option value="Buccal">Buccal (Cheek side)</option>
                <option value="Lingual">Lingual (Tongue side)</option>
                <option value="General">Entire Tooth</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Clinical Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
              >
                {CONDITIONS.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Clinical Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Record diagnostic observations or procedure details..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setSelectedTooth(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTooth}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm shadow-blue-200"
            >
              <Checkmark01Icon size={16} />
              <span>{saving ? 'Saving...' : 'Save Condition'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Historical Audit Trail */}
      {chart && chart.history && chart.history.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80">
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Clock01Icon size={16} className="text-slate-400" />
            <span>Dental Chart History</span>
          </h4>

          <div className="space-y-3">
            {chart.history.slice(-5).reverse().map((h, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Tooth #{h.toothNumber}</span>
                  <span className="text-slate-400 ml-2">({h.previousCondition} &rarr; <strong className="text-slate-700">{h.newCondition}</strong>)</span>
                  {h.notes && <p className="text-[11px] text-slate-500 mt-0.5">{h.notes}</p>}
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p className="font-medium text-slate-600">{h.dentistName}</p>
                  <p>{new Date(h.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
