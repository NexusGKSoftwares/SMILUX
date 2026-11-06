import React, { useState } from 'react';
import { LoginLayout } from './login.jsx';
import { AuthInput } from '../components/auth/AuthField.jsx';
import AuthErrorBanner from '../components/auth/AuthErrorBanner.jsx';
import Button from '../components/UI/Button.jsx';
import SEO from '../components/common/SEO.jsx';
import api from '../api/axios';

export default function ForgotPassword({ onNavigate, onOpenReferral }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address to receive password reset instructions.');
      return;
    }

    setLoading(true);

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
      <SEO title="Forgot Password" description="Request password reset instructions for your Smilux Software account." />
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Forgot Password</h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your account email address to receive password reset instructions
          </p>
        </div>

        {message ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-xs text-emerald-800 space-y-3 font-sans">
            <p className="font-bold">{message}</p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form className="mt-4 space-y-3" noValidate onSubmit={handleSubmit}>
            <AuthErrorBanner error={error} onDismiss={() => setError('')} />

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

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="mt-2 w-full font-semibold"
            >
              {loading ? 'Sending link…' : 'Send Reset Instructions'}
            </Button>
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
