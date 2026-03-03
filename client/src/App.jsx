import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* User auth wraps user routes */}
      <AuthProvider>
        <EventProvider>
          <Routes>
            {/* ── User Routes ── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

            {/* ── Admin Routes (own provider, isolated) ── */}
            <Route path="/admin/*" element={
              <AdminAuthProvider>
                <Routes>
                  <Route path="login" element={<AdminLogin />} />
                  <Route path="dashboard" element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } />
                </Routes>
              </AdminAuthProvider>
            } />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
