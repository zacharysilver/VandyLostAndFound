// File: frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (providedToken) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${providedToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        console.warn('Failed to load user profile');
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    fetchUserProfile(newToken);
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const refetchUser = () => {
    if (token) fetchUserProfile(token);
  };

  useEffect(() => {
    if (token) fetchUserProfile(token);
    else setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
