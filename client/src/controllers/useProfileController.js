import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const useProfileController = () => {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState({ totalEvents: 0, totalAttendees: 0, successRate: 0 });
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/events/stats');
                if (response.data.success) setStatsData(response.data.stats);
            } catch (error) {
                console.error('Error fetching profile stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleCreateEventRedirect = () => navigate('/');
    const toggleEditModal = (isOpen) => setIsEditModalOpen(isOpen);

    return {
        user,
        logout,
        updateProfile,
        statsData,
        loading,
        isEditModalOpen,
        handleCreateEventRedirect,
        toggleEditModal
    };
};
