import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { X, Calendar, MapPin, Tag, AlignLeft, User, Mail, UserPlus, CheckCircle2, Users, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVER_URL, DEFAULT_EVENT_IMAGE } from '../../services/api';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';

const EventDetailsModal = ({ event, isOpen, onClose, initialShowGuests = false }) => {
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

    useEffect(() => { setMounted(true); }, []);

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

    // Lock body scroll when modal is open
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

    if (!mounted || !event) return null;

    const imageSrc = event.image
        ? (event.image.startsWith('/') ? `${SERVER_URL}${event.image}` : event.image)
        : DEFAULT_EVENT_IMAGE;

    const isAlreadyRegistered = registerSuccess || displayEvent?.attendees?.some(
        a => user?.email && a.email?.toLowerCase() === user.email.toLowerCase()
    );

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        style={{ zIndex: 9998 }}
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-0 flex items-center justify-center p-4"
                        style={{ zIndex: 9999 }}
                    >
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label={event.title}
                            className="w-full max-w-2xl bg-[#F5F5F4] rounded-[2.5rem] shadow-2xl border border-[#C6A75E]/20 overflow-y-auto max-h-[85vh] scrollbar-hide"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-[35vh] sm:h-56 overflow-hidden rounded-t-[2.5rem]">
                                <img
                                    src={imageSrc}
                                    alt={event.title}
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_EVENT_IMAGE; }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-transparent" />

                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Close modal"
                                    className="absolute top-5 right-5 z-10 p-2.5 bg-white/15 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-6 left-8 right-8">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C6A75E] mb-1.5">Event Portfolio</p>
                                    <h2 className="text-3xl font-bold text-white tracking-tight truncate">{event.title}</h2>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8 md:p-10">
                                {/* Stats Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-[#C6A75E]/10 pb-8">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-[#C6A75E]" /> Schedule
                                        </span>
                                        <span className="text-sm font-bold text-[#1C1917]">{event.date}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-[#C6A75E]" /> Location
                                        </span>
                                        <span className="text-sm font-bold text-[#1C1917]">{event.location}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-2">
                                            <Tag className="w-3 h-3 text-[#C6A75E]" /> Category
                                        </span>
                                        <span className="text-sm font-bold text-[#1C1917]">{event.category}</span>
                                    </div>
                                </div>

                                {/* View: Details or Guests */}
                                {view === 'details' ? (
                                    <>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E]">
                                                <AlignLeft className="w-4 h-4" /> The Narrative
                                            </div>
                                            <p className="text-[#78716C] text-base font-medium leading-[1.6] tracking-wide italic whitespace-pre-line">
                                                {event.description}
                                            </p>
                                            {isCreator && (
                                                <button
                                                    type="button"
                                                    onClick={() => setView('guests')}
                                                    className="mt-2 px-5 py-2 bg-[#C6A75E]/10 text-[#C6A75E] hover:bg-[#C6A75E] hover:text-white border border-[#C6A75E]/30 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
                                                >
                                                    <Users className="w-3 h-3" /> View Guests ({event.attendees?.length || 0})
                                                </button>
                                            )}
                                        </div>

                                        {!isCreator && (
                                            <div className="mt-8 pt-6 border-t border-[#C6A75E]/10">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E] mb-4">
                                                    <UserPlus className="w-4 h-4" /> Attend This Event
                                                </div>
                                                {isAlreadyRegistered ? (
                                                    <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700">
                                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                                        <p className="text-sm font-medium">You&apos;re registered for this event.</p>
                                                    </div>
                                                ) : (
                                                    <form onSubmit={handleRegister} className="space-y-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <div className="space-y-1.5">
                                                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#78716C]">Name</label>
                                                                <div className="relative">
                                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
                                                                    <input
                                                                        type="text"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        placeholder="Your name"
                                                                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#C6A75E]/20 rounded-xl text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/30"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#78716C]">Email</label>
                                                                <div className="relative">
                                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
                                                                    <input
                                                                        type="email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        placeholder="your@email.com"
                                                                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#C6A75E]/20 rounded-xl text-[#1C1917] placeholder-[#78716C]/50 focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/30"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            disabled={isRegistering}
                                                            className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1917] hover:bg-black text-white text-sm font-bold rounded-full border border-[#C6A75E] transition-all disabled:opacity-50"
                                                        >
                                                            {isRegistering ? 'Registering...' : 'Register to Attend'}
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C6A75E]">
                                                <Users className="w-4 h-4" /> Guest List
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setView('details')}
                                                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors"
                                            >
                                                <ArrowLeft className="w-3 h-3" /> Back to Details
                                            </button>
                                        </div>
                                        <div className="bg-white rounded-2xl border border-[#C6A75E]/20 overflow-hidden">
                                            {event.attendees && event.attendees.length > 0 ? (
                                                <div className="divide-y divide-[#C6A75E]/10 max-h-[40vh] overflow-y-auto">
                                                    {event.attendees.map((attendee, idx) => (
                                                        <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                                                            <div className="w-10 h-10 rounded-full bg-[#1C1917] flex items-center justify-center text-[#C6A75E] font-bold uppercase">
                                                                {attendee.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-[#1C1917]">{attendee.name}</p>
                                                                <p className="text-xs text-[#78716C]">{attendee.email}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center">
                                                    <Users className="w-8 h-8 text-[#C6A75E]/30 mx-auto mb-3" />
                                                    <p className="text-sm font-medium text-[#78716C]">No guests registered yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#C6A75E]/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#1C1917] rounded-full flex items-center justify-center border border-[#C6A75E]">
                                            <User className="w-5 h-5 text-[#C6A75E]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">Coordinator</p>
                                            <p className="text-xs font-bold text-[#1C1917]">{event.createdBy?.username || 'Executive Member'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#C6A75E]/5 px-6 py-3 rounded-full border border-[#C6A75E]/20">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A75E]">Verified Concept</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default EventDetailsModal;
