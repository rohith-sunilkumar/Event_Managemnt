import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

export const useEventDetailsController = ({ event, isOpen, onClose, initialShowGuests }) => {
    const { user } = useAuth();
    const { registerForEvent } = useEvents();

    const [displayEvent, setDisplayEvent] = useState(event);
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [view, setView] = useState('details');

    const currentUserId = user?.id || user?._id;
    const eventCreatorId = event?.createdBy?._id || event?.createdBy;
    const isCreator = !!(currentUserId && eventCreatorId && currentUserId.toString() === eventCreatorId.toString());

    // Mount check for safe portal rendering
    useEffect(() => { setMounted(true); }, []);

    // Initialize state when modal opens
    useEffect(() => {
        if (isOpen && event) {
            setDisplayEvent(event);
            setView(initialShowGuests && isCreator ? 'guests' : 'details');
            if (user) {
                setName(user.username || '');
                setEmail(user.email || '');
            }
            if (user && event?.attendees) {
                const registered = event.attendees.some(
                    a => user.email && a.email?.toLowerCase() === user.email.toLowerCase()
                );
                setRegisterSuccess(registered);
            }
        }
    }, [event, user, isOpen, isCreator, initialShowGuests]);

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleClose = () => {
        if (typeof onClose === 'function') onClose();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            toast.error('Name and email are required.');
            return;
        }
        setIsRegistering(true);
        try {
            const response = await registerForEvent(event._id, { name: name.trim(), email: email.trim() });
            setDisplayEvent(response.event);
            setRegisterSuccess(true);
            setName('');
            setEmail('');
            toast.success('You are now registered for this event! 🎉');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsRegistering(false);
        }
    };

    const isAlreadyRegistered = registerSuccess || displayEvent?.attendees?.some(
        a => user?.email && a.email?.toLowerCase() === user.email.toLowerCase()
    );

    return {
        mounted,
        displayEvent,
        view,
        setView,
        name,
        setName,
        email,
        setEmail,
        isRegistering,
        isCreator,
        isAlreadyRegistered,
        handleRegister,
        handleClose
    };
};
