import User from '../models/User.js';
import Event from '../models/Event.js';

// GET /api/admin/stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const events = await Event.find({}, 'attendees');
        const totalAttendees = events.reduce((sum, e) => sum + (e.attendees?.length || 0), 0);
        const publicEvents = await Event.countDocuments({ visibility: 'public' });

        res.status(200).json({
            success: true,
            stats: { totalUsers, totalEvents, totalAttendees, publicEvents }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own admin account' });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Also delete their events
        await Event.deleteMany({ createdBy: id });
        res.status(200).json({ success: true, message: 'User and their events deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/admin/events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'username email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/admin/events/:id
export const deleteAnyEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
