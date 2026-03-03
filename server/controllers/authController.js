import User from '../models/User.js';
import { generateToken } from '../utils/token.js';

const isProduction = process.env.NODE_ENV === 'production';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: isProduction,                          // HTTPS only in prod
    sameSite: isProduction ? 'none' : 'lax',       // 'none' required for cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000               // 7 days
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.cookie('token', token, COOKIE_OPTIONS);

        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS);
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { bio, location } = req.body;
        const updateData = {};

        if (bio !== undefined) updateData.bio = bio;
        if (location !== undefined) updateData.location = location;
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile refined successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
