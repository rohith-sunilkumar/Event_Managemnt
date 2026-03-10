import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { admin, loading } = useAdminAuth();

    if (loading) {
        return null;
    }

    return admin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
