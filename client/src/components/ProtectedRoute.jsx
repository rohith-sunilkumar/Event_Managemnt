import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (!user) {
        if (location.pathname !== '/') {
            return <Navigate to="/" replace />;
        }
        return children;
    }

    return children;
};

export default ProtectedRoute;
