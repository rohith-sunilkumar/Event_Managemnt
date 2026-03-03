import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';
import {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllEvents,
    deleteAnyEvent
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require a valid token AND admin role
router.use(verifyToken, requireAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/events', getAllEvents);
router.delete('/events/:id', deleteAnyEvent);

export default router;
