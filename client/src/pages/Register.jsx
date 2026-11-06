import React, { useState } from 'react';
import { LoginLayout } from './login.jsx';
import { AuthInput, AuthPasswordField } from '../components/auth/AuthField.jsx';
import AuthErrorBanner from '../components/auth/AuthErrorBanner.jsx';
import PhoneInputWithCountry from '../components/UI/PhoneInputWithCountry.jsx';
import Button from '../components/UI/Button.jsx';
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
    setError('');

    if (!formData.clinicName.trim()) {
      setError('Please enter your clinic or practice name.');
      return;
    }

    if (!formData.ownerName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid work email address (e.g. doctor@clinic.co.ke).');
      return;
    }

    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 9) {
      setError('Please enter a valid phone number.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

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

        <AuthErrorBanner error={error} onDismiss={() => setError('')} />

        <form className="mt-4 space-y-3" noValidate onSubmit={handleSubmit}>
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

          <PhoneInputWithCountry
            label="Phone Number"
            value={formData.phone}
            onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
            disabled={loading}
            allowMultiple={false}
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

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="mt-3 w-full font-semibold"
          >
            {loading ? 'Creating Clinic Workspace…' : 'Start 14-Day Free Trial'}
          </Button>
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
