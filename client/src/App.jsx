import { useState } from "react";
import LoginPage from "./pages/login.jsx";

export default function App() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (showLoginPage && !loggedInUser) {
    return (
      <LoginPage
        onLoginSuccess={(user) => {
          setLoggedInUser(user);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome to Smilux Dental
        </h2>
        {loggedInUser ? (
          <p className="text-sm text-emerald-600 font-semibold">
            Logged in as {loggedInUser.name} ({loggedInUser.email})
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            Smart Dental Practice Management Platform
          </p>
        )}

        <div className="pt-4 flex flex-col gap-2">
          {loggedInUser ? (
            <button
              onClick={() => {
                setLoggedInUser(null);
                setShowLoginPage(true);
              }}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => setShowLoginPage(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-sm shadow-blue-200"
            >
              Go to Login Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
