import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import Button from '../UI/Button.jsx';
import {
  Home01Icon as DashIcon,
  UserGroupIcon as PatientsIcon,
  Doc01Icon as ChartingIcon,
  Calendar01Icon as ApptIcon,
  Invoice01Icon as BillingIcon,
  ShieldCheckIcon as InsuranceIcon,
  Store01Icon as InventoryIcon,
  Doc01Icon as ReportsIcon,
  Menu01Icon as BaseMenuIcon,
} from '@hugeicons/core-free-icons';

const YEAR = new Date().getFullYear();
const APP_VERSION = '1.0.0';

const iconCls = 'w-3.5 h-3.5 shrink-0';

function MenuIcon({ expanded }) {
  return (
    <HugeiconsIcon
      icon={BaseMenuIcon}
      className={`${iconCls} text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
    />
  );
}

function FooterLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-blue transition-colors text-xs font-medium"
    >
      <span className="text-slate-400 group-hover:text-brand-blue transition-colors">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

function Dot() {
  return <span className="text-slate-300 select-none">·</span>;
}

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const companyName = 'Smilux Dental Software';
  const logoUrl = '/favicon.svg';

  return (
    <footer className="shrink-0 border-t border-slate-200/80 bg-white font-sans">
      <div className="px-3 py-1.5 flex items-center justify-between min-h-[36px]">
        {/* Left: brand mark + name + version */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/dashboard" className="inline-flex items-center gap-2 group shrink-0">
            <img
              src={logoUrl}
              alt={companyName}
              className="h-5 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-xs"
            />
            <span className="text-xs font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors whitespace-nowrap tracking-tight">
              Smilux <span className="text-brand-pink">Dental</span>
            </span>
          </Link>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200/60 px-1.5 py-0.5 rounded whitespace-nowrap hidden md:inline">
            v{APP_VERSION}
          </span>
        </div>

        {/* Centre: quick links — desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <FooterLink to="/dashboard" icon={<HugeiconsIcon icon={DashIcon} size={14} />}>Dashboard</FooterLink>
          <Dot />
          <FooterLink to="/patients" icon={<HugeiconsIcon icon={PatientsIcon} size={14} />}>Patients</FooterLink>
          <Dot />
          <FooterLink to="/appointments" icon={<HugeiconsIcon icon={ApptIcon} size={14} />}>Appointments</FooterLink>
          <Dot />
          <FooterLink to="/invoices" icon={<HugeiconsIcon icon={BillingIcon} size={14} />}>Invoices</FooterLink>
          <Dot />
          <FooterLink to="/insurance" icon={<HugeiconsIcon icon={InsuranceIcon} size={14} />}>SHA</FooterLink>
          <Dot />
          <FooterLink to="/inventory" icon={<HugeiconsIcon icon={InventoryIcon} size={14} />}>Inventory</FooterLink>
          <Dot />
          <FooterLink to="/reports" icon={<HugeiconsIcon icon={ReportsIcon} size={14} />}>Reports</FooterLink>
        </div>

        {/* Mobile: expand toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="lg:hidden p-1.5 h-auto text-slate-500 hover:bg-slate-100"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          <MenuIcon expanded={expanded} />
        </Button>

        {/* Right: copyright */}
        <div className="hidden xl:flex items-center shrink-0 gap-1.5">
          <span className="text-slate-400 text-[10px] font-medium whitespace-nowrap">
            Powered by{' '}
            <a
              href="https://tekvora.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-brand-blue font-bold underline decoration-brand-300"
            >
              Tekvora Systems
            </a>
          </span>
        </div>
      </div>

      {/* Mobile expanded links */}
      {expanded && (
        <div className="lg:hidden px-4 py-3 border-t border-slate-100 bg-slate-50/70 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <FooterLink to="/dashboard" icon={<HugeiconsIcon icon={DashIcon} size={14} />}>Dashboard</FooterLink>
            <FooterLink to="/patients" icon={<HugeiconsIcon icon={PatientsIcon} size={14} />}>Patients</FooterLink>
            <FooterLink to="/charting" icon={<HugeiconsIcon icon={ChartingIcon} size={14} />}>FDI Charting</FooterLink>
            <FooterLink to="/appointments" icon={<HugeiconsIcon icon={ApptIcon} size={14} />}>Appointments</FooterLink>
            <FooterLink to="/invoices" icon={<HugeiconsIcon icon={BillingIcon} size={14} />}>Invoices &amp; M-Pesa</FooterLink>
            <FooterLink to="/insurance" icon={<HugeiconsIcon icon={InsuranceIcon} size={14} />}>SHA Claims</FooterLink>
            <FooterLink to="/inventory" icon={<HugeiconsIcon icon={InventoryIcon} size={14} />}>Inventory</FooterLink>
            <FooterLink to="/reports" icon={<HugeiconsIcon icon={ReportsIcon} size={14} />}>Reports</FooterLink>
          </div>
        </div>
      )}
    </footer>
  );
}
