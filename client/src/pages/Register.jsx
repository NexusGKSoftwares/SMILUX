import React, { useState } from 'react';
import { LoginLayout } from './login.jsx';
import { AuthInput, AuthPasswordField } from '../components/auth/AuthField.jsx';
import SEO from '../components/common/SEO.jsx';
import api from '../api/axios';

export default function Register({ onNavigate, onLoginSuccess, onOpenReferral }) {
  const [formData, setFormData] = useState({
    clinicName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', formData);
      if (res.data?.token) {
        localStorage.setItem('smilux_token', res.data.token);
      }
      if (onLoginSuccess) {
        onLoginSuccess(res.data.user || { name: formData.ownerName, email: formData.email });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout onOpenReferral={onOpenReferral}>
      <SEO title="Start 14-Day Free Trial" description="Register your dental practice for a 14-day free trial on Smilux Software." />
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Start 14-Day Free Trial</h2>
          <p className="mt-1 text-xs text-slate-500">Register your clinic to access Smilux Dental SaaS</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
          <AuthInput
            id="reg-clinic"
            name="clinicName"
            label="Clinic / Practice Name"
            type="text"
            placeholder="Avicena Dental Clinic"
            value={formData.clinicName}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <AuthInput
            id="reg-name"
            name="ownerName"
            label="Your Full Name"
            type="text"
            placeholder="Dr. John Doe"
            value={formData.ownerName}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <AuthInput
            id="reg-email"
            name="email"
            label="Work Email Address"
            type="email"
            placeholder="doctor@clinic.co.ke"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <AuthInput
            id="reg-phone"
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <AuthPasswordField
            id="reg-password"
            name="password"
            label="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            visible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
            toggleLabel="text"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            {loading ? 'Creating Clinic Workspace…' : 'Start 14-Day Free Trial'}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Already have a clinic account?{' '}
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
