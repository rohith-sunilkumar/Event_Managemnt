import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { X, Upload, Calendar, MapPin, Tag, Type, AlignLeft, PlusCircle, Eye, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_EVENT_IMAGE } from '../../services/api';
import { useCreateEventController, CATEGORIES, VISIBILITY_OPTIONS } from '../../controllers/useCreateEventController';

const CreateEventModal = ({ isOpen, onOpenChange, onSubmit, initialData }) => {
    const {
        formData,
        updateField,
        preview,
        isLoading,
        handleImageChange,
        handleSubmit,
        isEditing
    } = useCreateEventController({ isOpen, initialData, onSubmit });

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[101]"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <div className="fixed inset-0 z-[102] flex items-center justify-center p-4 py-12 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    className="w-full max-w-2xl bg-[#F5F5F4] rounded-[2.5rem] shadow-2xl border border-[#C6A75E]/20 overflow-hidden focus:outline-none pointer-events-auto"
                                >
                                    <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C6A75E] mb-1">
                                                    {isEditing ? 'Executive Adjustment' : 'New Event'}
                                                </p>
                                                <Dialog.Title className="text-3xl font-bold text-[#1C1917] tracking-tight">
                                                    {isEditing ? 'Refine Specification' : 'Event Specification'}
                                                </Dialog.Title>
                                                <Dialog.Description className="text-[#78716C] text-xs font-medium mt-1">
                                                    {isEditing ? 'Adjust the details of your existing registry.' : 'Register a new high-end event into the executive collection.'}
                                                </Dialog.Description>
                                            </div>
                                            <Dialog.Close className="p-2 hover:bg-white rounded-full transition-colors focus:outline-none">
                                                <X className="w-6 h-6 text-[#78716C]" />
                                            </Dialog.Close>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            {/* Image Upload */}
                                            <div className="group relative aspect-[16/7] rounded-[1.5rem] bg-white border-2 border-dashed border-[#C6A75E]/20 hover:border-[#C6A75E]/50 transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                                {preview ? (
                                                    <img src={preview} alt="Event Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = DEFAULT_EVENT_IMAGE; }} />
                                                ) : (
                                                    <div className="text-center">
                                                        <Upload className="w-10 h-10 text-[#C6A75E] mx-auto mb-3" />
                                                        <p className="text-xs font-bold uppercase tracking-widest text-[#78716C]">Upload Visual Masterpiece</p>
                                                    </div>
                                                )}
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required={!isEditing} />
                                            </div>

                                            {/* Title & Category */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <FormInput icon={Type} label="Designation" value={formData.title} onChange={(v) => updateField('title', v)} placeholder="Gala Name" />
                                                <FormSelect icon={Tag} label="Category" value={formData.category} onChange={(v) => updateField('category', v)} options={CATEGORIES.map(c => ({ value: c, label: c }))} />
                                            </div>

                                            {/* Date & Location */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <FormInput icon={Calendar} label="Scheduled Date" type="date" value={formData.date} onChange={(v) => updateField('date', v)} />
                                                <FormInput icon={MapPin} label="Venue Location" value={formData.location} onChange={(v) => updateField('location', v)} placeholder="Grand Atrium" />
                                            </div>

                                            {/* Visibility */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <FormSelect icon={Eye} label="Visibility" value={formData.visibility} onChange={(v) => updateField('visibility', v)} options={VISIBILITY_OPTIONS} />
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] ml-1 flex items-center gap-2">
                                                    <AlignLeft className="w-3 h-3 text-[#C6A75E]" /> Curated Narrative
                                                </label>
                                                <textarea
                                                    required rows={3} value={formData.description}
                                                    onChange={(e) => updateField('description', e.target.value)}
                                                    className="w-full bg-white px-5 py-4 rounded-2xl border border-[#C6A75E]/10 focus:border-[#C6A75E] focus:outline-none transition-all font-medium text-sm resize-none"
                                                    placeholder="Describe the essence of this gathering..."
                                                />
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit" disabled={isLoading}
                                                className="w-full py-5 bg-[#1C1917] hover:bg-black text-white font-bold rounded-full border border-[#C6A75E] transition-all transform hover:scale-[1.02] shadow-xl shadow-[#C6A75E]/10 flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <div className="w-5 h-5 border-2 border-[#C6A75E]/30 border-t-[#C6A75E] rounded-full animate-spin" />
                                                ) : (
                                                    <PlusCircle className="w-5 h-5 text-[#C6A75E]" />
                                                )}
                                                {isLoading ? (isEditing ? 'ADJUSTING...' : 'REGISTERING...') : (isEditing ? 'SAVE ADJUSTMENTS' : 'FINALIZE EVENT')}
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};

/* Reusable form input */
const FormInput = ({ icon: Icon, label, type = 'text', value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] ml-1 flex items-center gap-2">
            <Icon className="w-3 h-3 text-[#C6A75E]" /> {label}
        </label>
        <input
            type={type} required value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white px-5 py-4 rounded-2xl border border-[#C6A75E]/10 focus:border-[#C6A75E] focus:outline-none transition-all font-medium text-sm"
            placeholder={placeholder}
        />
    </div>
);

/* Reusable select dropdown */
const FormSelect = ({ icon: Icon, label, value, onChange, options }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] ml-1 flex items-center gap-2">
            <Icon className="w-3 h-3 text-[#C6A75E]" /> {label}
        </label>
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger className="w-full bg-white px-5 py-4 rounded-2xl border border-[#C6A75E]/10 focus:border-[#C6A75E] focus:outline-none transition-all font-medium text-sm flex items-center justify-between group">
                <Select.Value />
                <Select.Icon><ChevronDown className="w-4 h-4 text-[#C6A75E] transition-transform group-data-[state=open]:rotate-180" /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-2xl border border-[#C6A75E]/20 shadow-2xl z-[200] min-w-[var(--radix-select-trigger-width)]" position="popper" sideOffset={5}>
                    <Select.Viewport className="p-2">
                        {options.map((opt) => (
                            <Select.Item
                                key={opt.value} value={opt.value}
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#1C1917] outline-none cursor-pointer hover:bg-[#F5F5F4] focus:bg-[#F5F5F4] data-[state=checked]:text-[#C6A75E] transition-colors"
                            >
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <Select.ItemIndicator><Check className="w-4 h-4 text-[#C6A75E]" /></Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    </div>
);

export default CreateEventModal;
