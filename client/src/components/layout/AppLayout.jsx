import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Footer from './Footer.jsx';
import HelpModal from './HelpModal.jsx';
import PlansModal from './PlansModal.jsx';

export default function AppLayout({ children, user, onLogout, onQuickAction }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('smilux_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('smilux_sidebar_collapsed', String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      {/* Desktop Persistent Sidebar (264px <-> 68px) & Mobile Drawer */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onCloseMobile={() => setIsMobileOpen(false)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenUpgrade={() => setIsPlansModalOpen(true)}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Topbar
          onOpenMobile={() => setIsMobileOpen(true)}
          sidebarOpen={!isCollapsed}
          currentDrawerWidth={isCollapsed ? 68 : 264}
          user={user}
          onLogout={onLogout}
          onQuickAction={onQuickAction}
          isHelpOpen={isHelpDrawerOpen}
          onOpenHelp={() => setIsHelpDrawerOpen(true)}
          onCloseHelp={() => setIsHelpDrawerOpen(false)}
          onOpenUpgrade={() => setIsPlansModalOpen(true)}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-2  min-w-0 bg-mesh">
          {children || <Outlet />}
        </main>

        {/* Thin App Footer */}
        <Footer />
      </div>

      {/* Help & Support Dialog Modal (Opened via Sidebar "Help & Support") */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        user={user}
      />

      {/* Plans & Pricing Dialog Modal (Opened via Topbar & Sidebar "Upgrade") */}
      <PlansModal
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
      />
    </div>
  );
}
