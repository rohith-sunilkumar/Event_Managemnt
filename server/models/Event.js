import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Event description is required']
    },
    date: {
        type: String,
        required: [true, 'Event date is required']
    },
    location: {
        type: String,
        required: [true, 'Event location is required']
    },
    category: {
        type: String,
        required: [true, 'Event category is required']
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    },
    image: {
        type: String, // Path to the uploaded image
        required: [true, 'Event image is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        name: { type: String, required: true },
        email: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
