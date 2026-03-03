import express from 'express';
import { createEvent, getEvents, getUserEvents, updateEvent, deleteEvent, getUserStats, registerForEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all events - Filtered by visibility and ownership
router.get('/', verifyToken, getEvents);

// Get user stats for profile
router.get('/stats', verifyToken, getUserStats);

// Get user-specific events for the dashboard
router.get('/me', verifyToken, getUserEvents);

// Create new event - Protected and handles image upload
router.post('/', verifyToken, upload.single('image'), createEvent);

// Update event - Protected with ownership check
router.put('/:id', verifyToken, upload.single('image'), updateEvent);

// Delete event - Protected with ownership check
router.delete('/:id', verifyToken, deleteEvent);

// Register for event - Protected, creator cannot register
router.post('/:id/register', verifyToken, registerForEvent);

export default router;
