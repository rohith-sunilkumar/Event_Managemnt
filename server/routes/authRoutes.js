import express from 'express';
import { register, login, logout, getMe, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);
router.put('/update-profile', verifyToken, upload.single('profileImage'), updateProfile);

export default router;
