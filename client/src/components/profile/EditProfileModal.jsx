import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, User, MapPin, AlignLeft, Camera, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVER_URL, DEFAULT_PROFILE_IMAGE } from '../../services/api';

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
    const [formData, setFormData] = useState({
        bio: user?.bio || '',
        location: user?.location || '',
        profileImage: null
    });
    const [preview, setPreview] = useState(user?.profileImage ? `${SERVER_URL}${user.profileImage}` : DEFAULT_PROFILE_IMAGE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                bio: user.bio || '',
                location: user.location || '',
                profileImage: null
            });
            setPreview(user.profileImage ? `${SERVER_URL}${user.profileImage}` : DEFAULT_PROFILE_IMAGE);
        }
    }, [user, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profileImage: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('bio', formData.bio);
        data.append('location', formData.location);
        if (formData.profileImage) {
            data.append('profileImage', formData.profileImage);
        }

        try {
            await onUpdate(data);
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            />
                        </Dialog.Overlay>

                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                            <Dialog.Content asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    className="pointer-events-auto w-full max-w-xl max-h-full md:max-h-[90vh] flex flex-col bg-white rounded-[32px] shadow-2xl border border-[#C6A75E]/20 overflow-hidden"
                                >
                                    {/* Header - Fixed */}
                                    <div className="flex justify-between items-center p-8 border-b border-[#C6A75E]/5 bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1 h-8 bg-[#C6A75E] rounded-full" />
                                            <div>
                                                <Dialog.Title className="text-xl font-bold text-[#1C1917] tracking-tight">Refine Identity</Dialog.Title>
                                                <Dialog.Description className="text-[10px] font-medium uppercase tracking-widest text-[#78716C] mt-0.5">Executive Suite</Dialog.Description>
                                            </div>
                                        </div>
                                        <Dialog.Close className="p-2 hover:bg-[#F5F5F4] rounded-full transition-colors group focus:outline-none">
                                            <X className="w-5 h-5 text-[#78716C] group-hover:text-[#1C1917]" />
                                        </Dialog.Close>
                                    </div>

                                    {/* Body - Scrollable */}
                                    <div className="flex-1 overflow-y-auto p-8 py-6 custom-scrollbar">
                                        <form id="profile-edit-form" onSubmit={handleSubmit} className="space-y-8 text-center">
                                            {/* Profile Image Upload */}
                                            <div className="flex flex-col items-center justify-center py-4">
                                                <div className="relative group">
                                                    <div className="w-28 h-28 bg-[#1C1917] rounded-full flex items-center justify-center border-4 border-[#C6A75E]/10 overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02]">
                                                        <img
                                                            src={preview}
                                                            alt="Profile Preview"
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                                                        />
                                                    </div>
                                                    <label className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full border border-[#C6A75E]/20 flex items-center justify-center shadow-lg cursor-pointer hover:border-[#C6A75E] hover:scale-110 transition-all z-10">
                                                        <Camera className="w-4 h-4 text-[#1C1917]" />
                                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                                    </label>
                                                </div>
                                                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A75E]">Update Portrait</p>
                                            </div>

                                            <div className="space-y-6 text-left">
                                                {/* Location Input */}
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A75E] flex items-center gap-2 px-1">
                                                        <MapPin className="w-3 h-3" /> Global Base
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        placeholder="Silicon Valley, CA"
                                                        className="w-full bg-[#F5F5F4] px-6 py-4 rounded-xl border border-transparent focus:border-[#C6A75E]/50 focus:bg-white focus:outline-none transition-all font-medium text-sm text-[#1C1917]"
                                                    />
                                                </div>

                                                {/* Bio Input */}
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A75E] flex items-center gap-2 px-1">
                                                        <AlignLeft className="w-3 h-3" /> Executive Biography
                                                    </label>
                                                    <textarea
                                                        rows={5}
                                                        value={formData.bio}
                                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                        placeholder="Describe your vision..."
                                                        className="w-full bg-[#F5F5F4] px-6 py-4 rounded-xl border border-transparent focus:border-[#C6A75E]/50 focus:bg-white focus:outline-none transition-all font-medium text-sm text-[#1C1917] resize-none leading-relaxed"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Footer - Fixed */}
                                    <div className="p-8 border-t border-[#C6A75E]/5 bg-white">
                                        <button
                                            form="profile-edit-form"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-5 bg-[#1C1917] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] border border-[#C6A75E]/30 hover:bg-black hover:border-[#C6A75E] transition-all shadow-xl shadow-[#C6A75E]/5 flex items-center justify-center gap-4 disabled:opacity-50 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-[#C6A75E]" />
                                                    <span>Committing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldCheck className="w-4 h-4 text-[#C6A75E] group-hover:scale-110 transition-transform" />
                                                    <span>Refine Profile</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </div>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};

export default EditProfileModal;
