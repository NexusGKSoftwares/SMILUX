import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  StarIcon,
  AlertCircleIcon,
  PackageIcon
} from '@hugeicons/react';

const DONUT_COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#F59E0B', '#64748B'];

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-xs">
        Loading dashboard statistics...
      </div>
    );
  }

  const {
    summary,
    cashflowTrend,
    expenseCategories,
    incomeExpenseTrend,
    popularTreatments,
    stockAvailability
  } = stats || {};

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Good morning, John!</h2>
          <p className="text-xs text-slate-400 mt-0.5">Wednesday, December 6, 2022</p>
        </div>
      </div>

      {/* Grid Layout matching Zendenta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cashflow Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL CASH</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">${summary?.totalIncome?.toLocaleString() || '13,232'}</span>
                  <span className="inline-flex items-center space-x-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ArrowUp01Icon size={12} />
                    <span>4.51%</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-medium">January 2022 - December 2022</span>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-600 font-medium">
                  <option>Last 12 month</option>
                  <option>Last 6 month</option>
                </select>
              </div>
            </div>

            {/* Cashflow Area Chart */}
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashflowTrend}>
                  <defs>
                    <linearGradient id="cashflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                    formatter={value => [`$${value.toLocaleString()}`, 'Total']}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#cashflowGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Left: Income & Expense (5 cols) + Patients & Popular Treatments (7 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Income & Expense */}
            <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800">Income & Expense</h3>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-[10px] text-slate-600">
                  <option>Last 6 months</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">TOTAL INCOME</span>
                  <span className="font-bold text-slate-800 text-sm">$1,412</span>
                  <span className="text-emerald-600 font-bold ml-1 text-[10px]">&uarr; 4.51%</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">TOTAL EXPENSES</span>
                  <span className="font-bold text-slate-800 text-sm">$612.34</span>
                  <span className="text-rose-500 font-bold ml-1 text-[10px]">&darr; 2.41%</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseTrend}>
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                    <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} barSize={8} />
                    <Bar dataKey="expense" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Patients & Popular Treatment */}
            <div className="md:col-span-6 space-y-6">
              {/* Patients Widget */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800">Patients</h3>
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-[10px] text-slate-600">
                    <option>This month</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xl font-bold text-slate-900">{summary?.newPatients || 21}</span>
                    <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">36.52% New patients</p>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-slate-900">{summary?.returningPatients || 142}</span>
                    <p className="text-[10px] font-semibold text-blue-600 mt-0.5">61.41% Returning patients</p>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[36%]" />
                  <div className="h-full bg-blue-500 w-[64%]" />
                </div>
              </div>

              {/* Popular Treatment Widget */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-800">Popular Treatment</h3>
                <div className="space-y-2">
                  {popularTreatments?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <div className="flex items-center space-x-1 text-amber-500 text-[11px] font-bold">
                        <StarIcon size={12} color="currentColor" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Expenses Donut Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Expenses</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-600 font-medium">
                <option>Last 6 months</option>
              </select>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Donut Chart */}
              <div className="col-span-6 h-40 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="amount"
                    >
                      {expenseCategories?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Total Expense</span>
                  <span className="text-sm font-bold text-slate-900">${summary?.totalExpense || '132.34'}</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="col-span-6 space-y-2 text-xs">
                {expenseCategories?.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }}
                      />
                      <span className="text-slate-600 font-medium">{cat.name}</span>
                    </div>
                    <span className="font-bold text-slate-800">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Expense Box */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOP EXPENSE</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Internet</span>
                  <span className="font-bold text-slate-800">$113.64</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Transaction</span>
                  <span className="font-bold text-slate-800">$113.64</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Availability Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800">Stock availability</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">TOTAL ASSET</span>
                <span className="text-lg font-extrabold text-slate-900">${stockAvailability?.totalAsset?.toLocaleString() || '53,000'}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">TOTAL PRODUCT</span>
                <span className="text-lg font-extrabold text-slate-900">{stockAvailability?.totalProductCount || 442}</span>
              </div>
            </div>

            {/* Availability progress bar */}
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-cyan-500 w-[70%]" />
                <div className="h-full bg-amber-500 w-[20%]" />
                <div className="h-full bg-rose-500 w-[10%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-cyan-500" /> Available</span>
                <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock</span>
                <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Out of stock</span>
              </div>
            </div>

            {/* Low stock list */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOW STOCK</span>
                <button onClick={() => onNavigate('stocks')} className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
              </div>

              <div className="space-y-2">
                {stockAvailability?.lowStockItems?.length > 0 ? (
                  stockAvailability.lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500">Qty: <strong>{item.quantity}</strong></span>
                        <button onClick={() => onNavigate('stocks')} className="text-[11px] text-blue-600 font-semibold hover:underline">Order</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800">Dental Brush</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500">Qty: <strong>3</strong></span>
                        <button onClick={() => onNavigate('stocks')} className="text-[11px] text-blue-600 font-semibold hover:underline">Order</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800">Charmflex Regular</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500">Qty: <strong>2</strong></span>
                        <button onClick={() => onNavigate('stocks')} className="text-[11px] text-blue-600 font-semibold hover:underline">Order</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
