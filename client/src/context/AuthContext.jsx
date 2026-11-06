import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('smilux_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
          setClinic(res.data.clinicId);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('smilux_token', newToken);
    setToken(newToken);
    setUser(userData);
    setClinic(userData.clinic);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('smilux_token');
    setToken(null);
    setUser(null);
    setClinic(null);
  };

  return (
    <AuthContext.Provider value={{ user, clinic, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
