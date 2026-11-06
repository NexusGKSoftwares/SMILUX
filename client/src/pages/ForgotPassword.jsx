import React, { useState } from 'react';
import { LoginLayout } from './login.jsx';
import { AuthInput } from '../components/auth/AuthField.jsx';
import api from '../api/axios';

export default function ForgotPassword({ onNavigate, onOpenReferral }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post('/auth/forgot-password', { email }).catch(() => {});
      setMessage('Password reset instructions have been sent to your email address.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending password reset request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout onOpenReferral={onOpenReferral}>
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Forgot Password</h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your account email address to receive password reset instructions
          </p>
        </div>

        {message ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-xs text-emerald-800 space-y-3">
            <p className="font-bold">{message}</p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            <AuthInput
              id="reset-email"
              name="email"
              label="Email address"
              type="email"
              placeholder="doctor@clinic.co.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              {loading ? 'Sending link…' : 'Send Reset Instructions'}
            </button>
          </form>
        )}

        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Remembered your password?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </LoginLayout>
  );
}
