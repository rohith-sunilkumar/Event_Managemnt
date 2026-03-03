import { useState, useEffect } from 'react';

export const CATEGORIES = [
    'Tech Conference', 'Art Exhibition', 'Music Concert', 'Networking', 'Workshop',
    'Gala Dinner', 'Sports Event', 'Charity', 'Fashion Show', 'Other'
];

export const VISIBILITY_OPTIONS = [
    { value: 'public', label: 'Public Exhibition' },
    { value: 'private', label: 'Private Coordination' }
];

const defaultForm = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: CATEGORIES[0],
    visibility: 'public',
    image: null
};

export const useCreateEventController = ({ isOpen, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(defaultForm);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isEditing = !!initialData;

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    date: initialData.date?.split('T')[0] || '',
                    location: initialData.location || '',
                    category: initialData.category || CATEGORIES[0],
                    visibility: initialData.visibility || 'public',
                    image: null
                });
                setPreview(initialData.image || null);
            } else {
                setFormData(defaultForm);
                setPreview(null);
            }
        }
    }, [isOpen, initialData]);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateField('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (val !== null && val !== undefined) data.append(key, val);
            });
            await onSubmit(data);
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, updateField, preview, isLoading, handleImageChange, handleSubmit, isEditing };
};
