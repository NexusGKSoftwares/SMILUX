import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import LoginPage from './pages/login.jsx';
import ForgotPasswordPage from './pages/ForgotPassword.jsx';
import RegisterPage from './pages/Register.jsx';
import ReferralProgram from './pages/ReferralProgram.jsx';
import GettingStarted from './pages/GettingStarted.jsx';
import { AppLayout } from './components/layout';
import {
  DashboardView,
  PatientsView,
  ClinicalRecordsView,
  AppointmentsView,
  DentalChartingView,
  InvoicesView,
  PaymentsView,
  InsuranceView,
  ExpensesView,
  InventoryView,
  SuppliersView,
  PurchaseOrdersView,
  GenericFeatureView,
} from './pages/WorkspaceViews.jsx';

function AppRoutes({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page) => {
    switch (page) {
      case 'register':
        navigate('/register');
        break;
      case 'forgot':
        navigate('/forgot-password');
        break;
      case 'referral':
        navigate('/referral');
        break;
      case 'login':
      default:
        navigate('/login');
        break;
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage
                onLoginSuccess={(user) => {
                  setLoggedInUser(user);
                  navigate('/dashboard');
                }}
                onNavigate={handleNavigate}
                onOpenReferral={() => navigate('/referral')}
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            <RegisterPage
              onNavigate={handleNavigate}
              onLoginSuccess={(user) => {
                setLoggedInUser(user);
                navigate('/dashboard');
              }}
              onOpenReferral={() => navigate('/referral')}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage
              onNavigate={handleNavigate}
              onOpenReferral={() => navigate('/referral')}
            />
          }
        />
        <Route
          path="/forgot"
          element={<Navigate to="/forgot-password" replace />}
        />

        <Route
          path="/referral"
          element={
            <ReferralProgram
              onBackToLogin={() => navigate('/login')}
            />
          }
        />

        {/* Authenticated Layout & Workspace Routes */}
        {loggedInUser ? (
          <Route
            element={
              <AppLayout
                user={loggedInUser}
                onLogout={handleLogout}
                onQuickAction={() => alert('Quick Action: Add New Patient')}
              />
            }
          >
            <Route path="/dashboard" element={<DashboardView user={loggedInUser} />} />
            <Route path="/getting_started" element={<GettingStarted />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/:workspaceId/getting_started" element={<GettingStarted />} />
            <Route path="/patients" element={<PatientsView />} />
            <Route path="/appointments" element={<AppointmentsView />} />
            <Route path="/clinical-records" element={<ClinicalRecordsView />} />
            <Route path="/charting" element={<DentalChartingView />} />
            <Route
              path="/treatment-plans"
              element={
                <GenericFeatureView
                  title="Treatment Plans"
                  description="Comprehensive dental treatment plans, stage estimations, and patient consent sign-offs."
                />
              }
            />
            <Route
              path="/treatments"
              element={
                <GenericFeatureView
                  title="Treatments & Procedures"
                  description="Dental procedure catalog, ADA/FDI codes, and standard clinic fee schedule (KES)."
                />
              }
            />
            <Route path="/invoices" element={<InvoicesView />} />
            <Route path="/payments" element={<PaymentsView />} />
            <Route path="/insurance" element={<InsuranceView />} />
            <Route path="/expenses" element={<ExpensesView />} />
            <Route path="/inventory" element={<InventoryView />} />
            <Route path="/suppliers" element={<SuppliersView />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersView />} />
            <Route
              path="/staff"
              element={
                <GenericFeatureView
                  title="Staff & Employees"
                  description="Dental hygienists, nurses, receptionists, and administrative team directory."
                />
              }
            />
            <Route
              path="/dentists"
              element={
                <GenericFeatureView
                  title="Dentists & Practitioners"
                  description="Dental surgeons, KMPDC license records, and chair availability schedules."
                />
              }
            />
            <Route
              path="/branches"
              element={
                <GenericFeatureView
                  title="Branches & Workspaces"
                  description="Multi-clinic location management (Nairobi Main, Westlands, Mombasa Branch)."
                />
              }
            />
            <Route
              path="/reports"
              element={
                <GenericFeatureView
                  title="Reports & Practice Analytics"
                  description="Clinic revenue intelligence, patient volume charts, and financial statements."
                />
              }
            />
            <Route
              path="/messages"
              element={
                <GenericFeatureView
                  title="Messages & Reminders"
                  description="Automated patient SMS appointment reminders, recall notifications, and WhatsApp broadcasts."
                />
              }
            />
            <Route
              path="/settings"
              element={
                <GenericFeatureView
                  title="Clinic Settings"
                  description="Practice profile, M-Pesa Daraja API keys, SHA integration keys, and user permissions."
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <GenericFeatureView
                  title="Notifications Center"
                  description="System alerts, claim approvals, and appointment notifications."
                />
              }
            />
            <Route
              path="/profile"
              element={
                <GenericFeatureView
                  title="User Account Profile"
                  description="Manage your personal profile details, security credentials, and preferences."
                />
              }
            />
          </Route>
        ) : null}

        {/* Fallback route */}
        <Route
          path="*"
          element={<Navigate to={loggedInUser ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
  );
}

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smilux_user');
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return { name: 'Dr. Darrell Steward', email: 'owner@avicena.co.ke', role: 'Lead Dentist' };
  });

  const handleSetUser = (user) => {
    setLoggedInUser(user);
    try {
      if (user) {
        localStorage.setItem('smilux_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('smilux_user');
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <BrowserRouter>
      <AppRoutes loggedInUser={loggedInUser} setLoggedInUser={handleSetUser} />
    </BrowserRouter>
  );
}
