import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/users/login';
import RegisterPage from './pages/users/register';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import UserProfile from './pages/users/profile';



// Protected Route Components
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (!token) {
    return <Navigate to={allowedRole === 'admin' ? '/admin/login' : '/login'} />;
  }
  
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/profile'} />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* User Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRole="user">
              < UserProfile/>
            </ProtectedRoute>
          } 
        />

        {/* Redirect root to appropriate page based on role */}
        <Route 
          path="/" 
          element={
            <RouteRedirect />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

// Component to handle root route redirection
const RouteRedirect = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Navigate to="/profile" />;
};

export default App;