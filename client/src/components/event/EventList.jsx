import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onReview, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.map((event, index) => (
                <EventCard
                    key={event._id || event.id}
                    event={event}
                    index={index}
                    onReview={onReview}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default EventList;
