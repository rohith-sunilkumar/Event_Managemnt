import React from 'react';
import { useHomeController } from '../controllers/useHomeController';
import HomeNavbar from '../components/layout/HomeNavbar';
import HomeHero from '../components/layout/HomeHero';
import EventList from '../components/event/EventList';
import CreateEventModal from '../components/event/CreateEventModal';
import EventDetailsModal from '../components/event/EventDetailsModal';

const Home = () => {
    const {
        user,
        logout,
        events,
        loading,
        isModalOpen,
        setIsModalOpen,
        editingEvent,
        isDetailsModalOpen,
        selectedEvent,
        showGuestsModal,
        handleReviewEvent,
        handleCloseDetailsModal,
        handleCreateEvent,
        handleEditEvent,
        handleDeleteEvent
    } = useHomeController();

    return (
        <div className="min-h-screen bg-[#F5F5F4] text-[#1C1917] font-sans selection:bg-[#C6A75E] selection:text-white">
            <HomeNavbar
                user={user}
                onLogout={logout}
                onCreateEvent={() => setIsModalOpen(true)}
            />

            <main className="max-w-7xl mx-auto px-8 pt-10 pb-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-[#C6A75E]/20 border-t-[#C6A75E] rounded-full animate-spin" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#78716C] animate-pulse">
                            Orchestrating Experience...
                        </p>
                    </div>
                ) : (
                    <>
                        <HomeHero />
                        <EventList
                            events={events}
                            onReview={handleReviewEvent}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    </>
                )}
            </main>

            <CreateEventModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleCreateEvent}
                initialData={editingEvent}
            />

            <EventDetailsModal
                event={selectedEvent}
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                initialShowGuests={showGuestsModal}
            />

            <footer className="mt-20 py-12 border-t border-[#C6A75E]/10 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#78716C]">
                    Eventify Luxury Edition © 2026
                </span>
            </footer>
        </div>
    );
};

export default Home;
