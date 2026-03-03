import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : 'https://event-managemnt-jzc7.onrender.com/api');
export const SERVER_URL = API_BASE_URL.replace('/api', '');
export const DEFAULT_EVENT_IMAGE = '/images/default_event.png';
export const DEFAULT_PROFILE_IMAGE = '/images/default_profile.png';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,  // sends the cookie automatically on every request
});

// Response interceptor: if 401 redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
