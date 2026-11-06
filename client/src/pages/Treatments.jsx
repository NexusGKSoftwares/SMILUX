import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Medicine01Icon, Add01Icon } from '@hugeicons/react';

export default function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/treatments')
      .then(res => setTreatments(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Treatment Catalogue & Procedures</h3>
          <p className="text-xs text-slate-400">Manage dental services and pricing catalogue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 p-8 text-center text-slate-400 text-xs">Loading catalogue...</div>
        ) : (
          treatments.map(t => (
            <div key={t._id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {t.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{t.durationMinutes} mins</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                <p className="text-base font-extrabold text-slate-900 mt-1">KES {t.cost.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
