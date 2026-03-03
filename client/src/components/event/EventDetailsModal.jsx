import React from 'react';
import ReactDOM from 'react-dom';
import { X, Calendar, MapPin, Tag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVER_URL, DEFAULT_EVENT_IMAGE } from '../../services/api';
import { useEventDetailsController } from '../../controllers/useEventDetailsController';
import EventDetailsView from './EventDetailsView';
import EventGuestsView from './EventGuestsView';

const EventDetailsModal = ({ event, isOpen, onClose, initialShowGuests = false }) => {
    const {
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
    } = useEventDetailsController({ event, isOpen, onClose, initialShowGuests });

    if (!mounted || !event) return null;

    const imageSrc = event.image
        ? (event.image.startsWith('/') ? `${SERVER_URL}${event.image}` : event.image)
        : DEFAULT_EVENT_IMAGE;

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

                                <button
                                    type="button"
                                    onClick={handleClose}
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
                                    <StatItem icon={Calendar} label="Schedule" value={event.date} />
                                    <StatItem icon={MapPin} label="Location" value={event.location} />
                                    <StatItem icon={Tag} label="Category" value={event.category} />
                                </div>

                                {/* Dynamic View (Details or Guests) */}
                                {view === 'details' ? (
                                    <EventDetailsView
                                        event={displayEvent}
                                        isCreator={isCreator}
                                        setView={setView}
                                        isAlreadyRegistered={isAlreadyRegistered}
                                        name={name}
                                        setName={setName}
                                        email={email}
                                        setEmail={setEmail}
                                        handleRegister={handleRegister}
                                        isRegistering={isRegistering}
                                    />
                                ) : (
                                    <EventGuestsView
                                        event={displayEvent}
                                        setView={setView}
                                    />
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

const StatItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-2">
            <Icon className="w-3 h-3 text-[#C6A75E]" /> {label}
        </span>
        <span className="text-sm font-bold text-[#1C1917]">{value}</span>
    </div>
);

export default EventDetailsModal;
