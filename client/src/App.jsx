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

        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center font-sans">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Welcome to Smilux Dental
                  </h2>
                  <p className="text-sm text-emerald-600 font-semibold">
                    Logged in as {loggedInUser.name} ({loggedInUser.email})
                  </p>

                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setLoggedInUser(null);
                        navigate("/login");
                      }}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
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

