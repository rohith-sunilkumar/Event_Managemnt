import React, { useState } from 'react';
import { useDashboardController } from '../hooks/useDashboardController';
import HomeNavbar from '../components/home/HomeNavbar';
import EventCard from '../components/home/EventCard';
import EventDetailsModal from '../components/home/EventDetailsModal';
import CreateEventModal from '../components/home/CreateEventModal';
import { LayoutDashboard, Briefcase, Lock, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const {
        user,
        logout,
        events,
        loading,
        stats,
        isModalOpen,
        setIsModalOpen,
        editingEvent,
        handleCreateEvent,
        handleDeleteEvent,
        handleEditEvent
    } = useDashboardController();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleReview = (event) => {
        setSelectedEvent(event);
        setIsDetailsOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F4] text-[#1C1917] font-sans selection:bg-[#C6A75E] selection:text-white">
            <HomeNavbar
                user={user}
                onLogout={logout}
                onCreateEvent={() => setIsModalOpen(true)}
            />

            <main className="max-w-7xl mx-auto px-8 pt-10 pb-16">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C6A75E] mb-4 hover:opacity-70 transition-opacity">
                            <ArrowLeft className="w-3 h-3" /> Back to Collection
                        </Link>
                        <h1 className="text-4xl font-bold tracking-tight">Executive Reflection</h1>
                        <p className="text-[#78716C] mt-2 font-medium tracking-wide italic">Manage your private commissions and public exhibitions.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { label: 'Total Events', value: stats.total, icon: Briefcase },
                        { label: 'Public Exhibitions', value: stats.public, icon: Globe },
                        { label: 'Private Coordination', value: stats.private, icon: Lock },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-[#C6A75E]/10 shadow-xl shadow-[#C6A75E]/5"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-[#1C1917] rounded-2xl border border-[#C6A75E]/30">
                                    <stat.icon className="w-5 h-5 text-[#C6A75E]" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">{stat.label}</span>
                            </div>
                            <p className="text-4xl font-bold text-[#1C1917]">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Own Events List */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <LayoutDashboard className="w-5 h-5 text-[#C6A75E]" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Your Portfolio</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#C6A75E]/20 border-t-[#C6A75E] rounded-full animate-spin" />
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <AnimatePresence mode='popLayout'>
                                {events.map((event, index) => (
                                    <EventCard
                                        key={event._id}
                                        event={event}
                                        index={index}
                                        onReview={handleReview}
                                        onEdit={handleEditEvent}
                                        onDelete={handleDeleteEvent}
                                        showControls={true}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-[#C6A75E]/30"
                        >
                            <div className="w-16 h-16 bg-[#F5F5F4] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C6A75E]/20">
                                <Briefcase className="w-6 h-6 text-[#78716C]" />
                            </div>
                            <p className="text-[#78716C] font-semibold italic text-lg mb-2">Portfolio Awaiting Events</p>
                            <p className="text-[#A8A29E] text-sm mb-8 max-w-xs mx-auto">Begin your journey by creating your first executive event concept.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-4 bg-[#1C1917] text-[#C6A75E] text-xs font-bold uppercase tracking-widest rounded-full border border-[#C6A75E]/50 hover:bg-black transition-all shadow-lg shadow-[#C6A75E]/10"
                            >
                                Initiate Event
                            </button>
                        </motion.div>
                    )}
                </section>
            </main>

            <CreateEventModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleCreateEvent}
                initialData={editingEvent}
            />

            <EventDetailsModal
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                event={selectedEvent}
                user={user}
            />

            <footer className="mt-20 py-12 border-t border-[#C6A75E]/10 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#78716C]">
                    Executive Suite Management © 2026
                </span>
            </footer>
        </div>
    );
};

export default Dashboard;
