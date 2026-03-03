import { useState } from 'react';
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
            } else {
                await createEvent(formData);
            }
            setIsModalOpen(false);
            setEditingEvent(null);
        } catch (error) {
            console.error('Error in event operation:', error);
            throw error;
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to revoke this commission? This action is permanent.')) {
            try {
                await deleteEvent(id);
            } catch (error) {
                console.error('Error deleting event:', error);
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
        setIsDetailsModalOpen,
        selectedEvent,
        showGuestsModal,
        handleReviewEvent,
        handleCloseDetailsModal,
        handleCreateEvent,
        handleEditEvent,
        handleDeleteEvent
    };
};
