import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEventsLoading, setUserEventsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await api.get('/events');
            setEvents(response.data.events);
            setError(null);
        } catch (err) {
            if (err.response?.status !== 401) {
                console.error('Error fetching events:', err);
            }
            setError('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, [user]);

    const fetchUserEvents = useCallback(async () => {
        if (!user) return;
        setUserEventsLoading(true);
        try {
            const response = await api.get('/events/me');
            setUserEvents(response.data.events);
        } catch (err) {
            if (err.response?.status !== 401) {
                console.error('Error fetching user events:', err);
            }
        } finally {
            setUserEventsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchEvents();
            fetchUserEvents();
        } else {
            setEvents([]);
            setUserEvents([]);
            setLoading(false);
            setUserEventsLoading(false);
        }
    }, [user, fetchEvents, fetchUserEvents]);

    const createEvent = async (formData) => {
        try {
            const response = await api.post('/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await Promise.all([fetchEvents(), fetchUserEvents()]);
            return response.data;
        } catch (err) {
            console.error('Error creating event:', err);
            throw err;
        }
    };

    const updateEvent = async (id, formData) => {
        try {
            const response = await api.put(`/events/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await Promise.all([fetchEvents(), fetchUserEvents()]);
            return response.data;
        } catch (err) {
            console.error('Error updating event:', err);
            throw err;
        }
    };

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            await Promise.all([fetchEvents(), fetchUserEvents()]);
        } catch (err) {
            console.error('Error deleting event:', err);
            throw err;
        }
    };

    const registerForEvent = async (eventId, { name, email }) => {
        try {
            const response = await api.post(`/events/${eventId}/register`, { name, email });
            await Promise.all([fetchEvents(), fetchUserEvents()]);
            return response.data;
        } catch (err) {
            console.error('Error registering for event:', err);
            throw err;
        }
    };

    return (
        <EventContext.Provider value={{
            events,
            userEvents,
            loading,
            userEventsLoading,
            error,
            fetchEvents,
            fetchUserEvents,
            createEvent,
            updateEvent,
            deleteEvent,
            registerForEvent
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};
