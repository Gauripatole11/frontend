// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (email) => {
    try {
      const response = await authService.login(email);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate(response.role === 'admin' ? '/admin/dashboard' : '/profile');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth,
  };
};