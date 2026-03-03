import api from '../services/api';

export const getEvents = async () => {
    const response = await api.get('/events');
    return response.data.events;
};

export const getUserEvents = async () => {
    const response = await api.get('/events/me');
    return response.data.events;
};

export const createEvent = async (formData) => {
    const response = await api.post('/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const updateEvent = async (id, formData) => {
    const response = await api.put(`/events/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
};

export const registerForEvent = async (eventId, { name, email }) => {
    const response = await api.post(`/events/${eventId}/register`, { name, email });
    return response.data;
};
