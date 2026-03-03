import { useState, useEffect } from 'react';
import { SERVER_URL, DEFAULT_EVENT_IMAGE } from '../services/api';

const DEFAULT_FORM = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Corporate Gala',
    visibility: 'private'
};

export const CATEGORIES = [
    'Corporate Gala', 'Private Affair', 'Innovation Mixer', 'Art Exhibition',
    'Charity Auction', 'Music Festival', 'Tech Conference', 'Wedding Boutique',
    'Cultural Showcase', 'Culinary Experience'
];

export const VISIBILITY_OPTIONS = [
    { value: 'public', label: 'Public Exhibition (Homepage)' },
    { value: 'private', label: 'Private Coordination (Only Me)' }
];

export const useCreateEventController = ({ isOpen, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    date: initialData.date || '',
                    location: initialData.location || '',
                    category: initialData.category || 'Corporate Gala',
                    visibility: initialData.visibility || 'private'
                });
                const imgUrl = initialData.image
                    ? (initialData.image.startsWith('/') ? `${SERVER_URL}${initialData.image}` : initialData.image)
                    : DEFAULT_EVENT_IMAGE;
                setPreview(imgUrl);
            } else {
                setFormData(DEFAULT_FORM);
                setPreview(null);
                setImage(null);
            }
        }
    }, [initialData, isOpen]);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => data.append(key, val));
        if (image) data.append('image', image);

        try {
            await onSubmit(data);
            setFormData(DEFAULT_FORM);
            setImage(null);
            setPreview(null);
        } catch (error) {
            console.error('Submission failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        updateField,
        preview,
        isLoading,
        handleImageChange,
        handleSubmit,
        isEditing: !!initialData
    };
};
