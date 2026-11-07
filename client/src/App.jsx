import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import RegisterPage from "./pages/Register.jsx";
import ReferralProgram from "./pages/ReferralProgram.jsx";
import { AppLayout } from "./components/layout";

function AppRoutes({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page) => {
    switch (page) {
      case "register":
        navigate("/register");
        break;
      case "forgot":
        navigate("/forgot-password");
        break;
      case "referral":
        navigate("/referral");
        break;
      case "login":
      default:
        navigate("/login");
        break;
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <div key={location.pathname} className="animate-page">
      <Routes>
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage
                onLoginSuccess={(user) => {
                  setLoggedInUser(user);
                  navigate("/dashboard");
                }}
                onNavigate={handleNavigate}
                onOpenReferral={() => navigate("/referral")}
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
                navigate("/dashboard");
              }}
              onOpenReferral={() => navigate("/referral")}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage
              onNavigate={handleNavigate}
              onOpenReferral={() => navigate("/referral")}
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
              onBackToLogin={() => navigate("/login")}
            />
          }
        />

        {/* Authenticated Layout & Workspace Routes */}
        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <AppLayout
                user={loggedInUser}
                onLogout={handleLogout}
                onQuickAction={() => alert("Quick Action: Add New Patient")}
              >
                <div className="space-y-6">
                  <div className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-2xs">
                    <h2 className="text-xl font-bold text-slate-900">
                      Welcome back, {loggedInUser.name}!
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Logged in as <span className="font-semibold text-brand-600">{loggedInUser.email}</span>. Here is your practice overview.
                    </p>
                  </div>
                </div>
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default / fallback route */}
        <Route
          path="*"
          element={<Navigate to={loggedInUser ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <BrowserRouter>
      <AppRoutes loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
    </BrowserRouter>
  );
}

