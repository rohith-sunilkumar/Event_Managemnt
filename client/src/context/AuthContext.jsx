import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, check if there's a valid session cookie
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data.user);
        return response.data.user;
    };

    const register = async (username, email, password) => {
        await api.post('/auth/register', { username, email, password });
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
        }
    };

    const updateProfile = async (formData) => {
        const response = await api.put('/auth/update-profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
            setUser(response.data.user);
        }
        return response.data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
