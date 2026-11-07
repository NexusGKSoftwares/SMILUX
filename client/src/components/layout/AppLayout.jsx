import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Footer from './Footer.jsx';

export default function AppLayout({ children, user, onLogout, onQuickAction }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 264px Fixed Desktop Sidebar & Mobile Drawer */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Topbar
          onOpenMobile={() => setIsMobileOpen(true)}
          user={user}
          onLogout={onLogout}
          onQuickAction={onQuickAction}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 min-w-0 bg-mesh">
          {children || <Outlet />}
        </main>

        {/* Thin App Footer */}
        <Footer />
      </div>
    </div>
  );
}
