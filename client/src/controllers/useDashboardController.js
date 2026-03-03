import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

export const useDashboardController = () => {
    const { user, logout } = useAuth();
    const { userEvents: events, userEventsLoading: loading, createEvent, updateEvent, deleteEvent, fetchUserEvents } = useEvents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const stats = useMemo(() => {
        const publicCount = events.filter(e => e.visibility === 'public').length;
        const privateCount = events.filter(e => e.visibility === 'private').length;
        return { total: events.length, public: publicCount, private: privateCount };
    }, [events]);

    const handleCreateEvent = async (formData) => {
        try {
            if (editingEvent) {
                await updateEvent(editingEvent._id, formData);
                toast.success('Event updated successfully! ✨');
            } else {
                await createEvent(formData);
                toast.success('Event created successfully! 🎉');
            }
            setIsModalOpen(false);
            setEditingEvent(null);
        } catch (error) {
            console.error('Error in event operation:', error);
            toast.error('Something went wrong. Please try again.');
            throw error;
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to revoke this commission? This action is permanent.')) {
            try {
                await deleteEvent(id);
                toast.success('Event deleted successfully.');
            } catch (error) {
                console.error('Error deleting event:', error);
                toast.error('Failed to delete event. Please try again.');
            }
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    return {
        user,
        logout,
        events,
        loading,
        isModalOpen,
        setIsModalOpen,
        editingEvent,
        stats,
        handleCreateEvent,
        handleDeleteEvent,
        handleEditEvent,
        refreshEvents: fetchUserEvents
    };
};
