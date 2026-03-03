import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

export const useHomeController = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const { events, loading: eventsLoading, createEvent, updateEvent, deleteEvent } = useEvents();

    const loading = authLoading || eventsLoading;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [showGuestsModal, setShowGuestsModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    const handleReviewEvent = (event, showGuests = false) => {
        setSelectedEvent(event);
        setShowGuestsModal(showGuests);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setSelectedEvent(null);
        setIsDetailsModalOpen(false);
        setShowGuestsModal(false);
    };

    return {
        user,
        logout,
        events,
        loading,
        isModalOpen,
        setIsModalOpen,
        editingEvent,
        isDetailsModalOpen,
        selectedEvent,
        showGuestsModal,
        handleReviewEvent,
        handleCloseDetailsModal,
        handleCreateEvent,
        handleEditEvent,
        handleDeleteEvent
    };
};
