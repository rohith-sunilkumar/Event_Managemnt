import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { admin, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
            </div>
        );
    }

    return admin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
