import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Pencil, Trash2, ShieldCheck, Globe, Lock } from 'lucide-react';
import { SERVER_URL, DEFAULT_EVENT_IMAGE } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const EventCard = ({ event, index, onReview, onEdit, onDelete, showControls = false }) => {
    const { user } = useAuth();

    // Robust ownership check: user.id (from login) or user._id (from getMe)
    const currentUserId = user?.id || user?._id;
    const eventCreatorId = event.createdBy?._id || event.createdBy;
    const isOwner = currentUserId && eventCreatorId && currentUserId.toString() === eventCreatorId.toString();

    // Determine the image source - safely handle null/missing images
    const getImageSrc = (img) => {
        if (!img) return DEFAULT_EVENT_IMAGE;
        return img.startsWith('/') ? `${SERVER_URL}${img}` : img;
    };
    const imageSrc = getImageSrc(event.image);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
        >
            <div className="bg-white border border-[#C6A75E]/10 p-2 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-b-4 hover:border-b-[#C6A75E]">
                <div className="aspect-[4/3] bg-[#1C1917] rounded-[1.8rem] mb-6 overflow-hidden relative">
                    <img
                        src={imageSrc}
                        alt={event.title}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_EVENT_IMAGE; }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 to-transparent"></div>
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                        {event.visibility === 'public' ? (
                            <><Globe className="w-3 h-3 text-[#C6A75E]" /> Exhibition</>
                        ) : (
                            <><Lock className="w-3 h-3 text-[#C6A75E]" /> Private</>
                        )}
                    </div>

                    {isOwner && showControls && (
                        <div className="absolute top-6 left-6 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(event); }}
                                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#C6A75E] transition-all duration-300 group/btn"
                            >
                                <Pencil className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(event._id); }}
                                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 group/btn"
                            >
                                <Trash2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                            </button>
                        </div>
                    )}

                    <div className="absolute bottom-6 left-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A75E] mb-1 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" /> {event.category || event.type}
                        </p>
                        <h3 className="text-xl font-bold text-white tracking-tight">{event.title}</h3>
                    </div>
                </div>
                <div className="px-6 pb-8">
                    <p className="text-[#78716C] text-sm font-medium leading-relaxed mb-6 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between border-t border-[#F5F5F4] pt-6">
                        <div className="flex items-center gap-3 text-[#78716C]">
                            <Calendar className="w-4 h-4 text-[#C6A75E]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {isOwner && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onReview(event, true); }}
                                    className="px-3 py-1.5 rounded-full bg-[#C6A75E]/10 text-[#C6A75E] text-[9px] font-bold uppercase tracking-widest hover:bg-[#C6A75E] hover:text-white transition-colors"
                                >
                                    View Guests ({event.attendees?.length || 0})
                                </button>
                            )}
                            <div
                                onClick={() => onReview(event)}
                                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#1C1917] group-hover:text-[#C6A75E] transition-colors cursor-pointer"
                            >
                                Review Details
                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
