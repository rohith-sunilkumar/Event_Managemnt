import api from '../services/api';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
};

export const logout = async () => {
    await api.post('/auth/logout');
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateProfile = async (formData) => {
    const response = await api.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
