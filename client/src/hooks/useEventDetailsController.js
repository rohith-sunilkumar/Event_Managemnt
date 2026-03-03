import { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { SERVER_URL, DEFAULT_EVENT_IMAGE } from '../services/api';

export const useEventDetailsController = ({ event, user }) => {
    const { registerForEvent } = useEvents();
    const [displayEvent, setDisplayEvent] = useState(event);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        setDisplayEvent(event);
        setRegisterSuccess(false);
        setRegisterError('');
        if (user) {
            setName(user.username || '');
            setEmail(user.email || '');
        }
    }, [event, user]);

    const currentUserId = user?.id || user?._id;
    const eventCreatorId = event?.createdBy?._id || event?.createdBy;
    const isCreator = currentUserId && eventCreatorId && currentUserId.toString() === eventCreatorId.toString();

    const isAlreadyRegistered = registerSuccess || displayEvent?.attendees?.some(
        a => user?.email && a.email?.toLowerCase() === user.email.toLowerCase()
    );

    const imageSrc = event?.image
        ? (event.image.startsWith('/') ? `${SERVER_URL}${event.image}` : event.image)
        : DEFAULT_EVENT_IMAGE;

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');
        if (!name.trim() || !email.trim()) {
            setRegisterError('Name and email are required');
            return;
        }
        setIsRegistering(true);
        try {
            const response = await registerForEvent(event._id, { name: name.trim(), email: email.trim() });
            setDisplayEvent(response.event);
            setRegisterSuccess(true);
            setName('');
            setEmail('');
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsRegistering(false);
        }
    };

    return {
        displayEvent,
        name,
        setName,
        email,
        setEmail,
        isRegistering,
        registerError,
        isCreator,
        isAlreadyRegistered,
        imageSrc,
        handleRegister
    };
};
