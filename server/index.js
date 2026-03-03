import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://event-managemnt-1.onrender.com'
];

// Allow additional origins from env (comma-separated)
if (process.env.CORS_ORIGINS) {
    allowedOrigins.push(...process.env.CORS_ORIGINS.split(',').map(o => o.trim()));
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. Postman, mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(null, false);
    },
    credentials: true
}));
app.use(cookieParser());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Authentication Routes
app.use('/api/auth', authRoutes);

// Event Routes
app.use('/api/events', eventRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Event Management API is running (MVC Version)...');
});

// Server Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
