import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../services/api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await api.get('/auth/me');
                const user = response.data.user;
                if (user?.role === 'admin') {
                    setAdmin(user);
                } else {
                    setAdmin(null);
                }
            } catch {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        checkAdmin();
    }, []);

    const adminLogin = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const user = response.data.user;
        if (user?.role !== 'admin') {
            // Log back out immediately if not admin
            await api.post('/auth/logout');
            throw new Error('Access denied. This account is not an admin.');
        }
        setAdmin(user);
        return user;
    };

    const adminLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch { /* ignore */ } finally {
            setAdmin(null);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ admin, loading, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
