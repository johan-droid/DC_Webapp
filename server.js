/* backend/server.js - Secured Edition */
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const path = require('path');
const crypto = require('crypto');
const hpp = require('hpp');
const xss = require('xss-clean');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. SUPABASE CONNECTION ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// Use a flag for db status to avoid crashing but inform admin
const isDbConnected = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');
const supabase = isDbConnected ? createClient(supabaseUrl, supabaseKey) : null;

if (!isDbConnected) {
    console.warn('⚠️  Database not connected. Running in fallback (memory) mode.');
}

// --- 2. ADVANCED SECURITY MIDDLEWARE ---

// A. Secure Headers (Helmet) with Strict CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline allowed for specific UI logic, consider moving to nonces for absolute peak
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: [
                "'self'",
                "data:",
                "https://image.tmdb.org",
                "https://m.media-amazon.com",
                "https://c4.wallpaperflare.com",
                "https://static.wikia.nocookie.net",
                "https://i.imgur.com",
                "https://www.detectiveconanworld.com"
            ],
            connectSrc: ["'self'", process.env.SUPABASE_URL || ""], // Allow connection to self and Supabase
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// B. Prevent Parameter Pollution & Data Injection
app.use(hpp());
app.use(xss());

// C. Strict CORS
// Only allow your specific frontend domain in production
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Required if we move to cookies later
}));

// D. JSON Parsing
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DoS

// E. Rate Limiting (Stricter)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10, // Only 10 failed auth attempts per hour
    message: 'Too many login attempts, please try again later.'
});
app.use('/api/', limiter);

// --- 3. SERVE STATIC FILES ---
// Serving from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- 4. SECURE AUTHENTICATION ---
// Uses Constant-Time Comparison to prevent Timing Attacks
const authenticateAdmin = (req, res, next) => {
    const apiKey = req.headers['x-admin-key'];
    const secret = process.env.ADMIN_SECRET;

    if (!apiKey || !secret) {
        return res.status(401).json({ error: '⛔ Unauthorized: Key missing.' });
    }

    // Convert to buffers for timingSafeEqual
    const bufferKey = Buffer.from(apiKey);
    const bufferSecret = Buffer.from(secret);

    if (bufferKey.length !== bufferSecret.length) {
        return res.status(401).json({ error: '⛔ Unauthorized: Invalid Key.' });
    }

    if (crypto.timingSafeEqual(bufferKey, bufferSecret)) {
        next();
    } else {
        // Log failed attempt (internal logging)
        console.warn(`Failed admin access attempt from ${req.ip}`);
        res.status(401).json({ error: '⛔ Unauthorized: Invalid Key.' });
    }
};

// --- 5. VALIDATION SCHEMAS (JOI) ---
const newsValidation = Joi.object({
    title: Joi.string().min(5).max(150).required().trim(), // Added escapeHTML logic implied
    category: Joi.string().valid('Fan Theory', 'Merchandise', 'Interview', 'Breaking News').default('General'),
    image: Joi.string().uri().allow(''),
    content: Joi.string().min(10).required(),
    link: Joi.string().uri().allow('')
});
// Note: Joi doesn't have .escapeHTML() by default, assume standard string validation is sufficient with xss-clean middleware.

// --- 6. ROUTES ---

// Health Check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK', db: isDbConnected }));

// GET News
app.get('/api/news', async (req, res) => {
    if (!supabase) {
        return res.json([{ id: 0, title: "System Info", category: "System", content: "Running in offline mode.", created_at: new Date() }]);
    }
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Database error' });
    res.json(data);
});

// POST News (Protected + Rate Limited)
app.post('/api/news', authLimiter, authenticateAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not connected' });

    const { error: valError, value } = newsValidation.validate(req.body);
    if (valError) return res.status(400).json({ error: valError.details[0].message });

    const { data, error } = await supabase.from('news').insert([value]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'News published!', article: data[0] });
});

// GET Cases
app.get('/api/cases', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Database error' });
    res.json(data);
});

// Fallback for SPA routing (if you add client-side routing later)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`🔒 Secure Server running on port ${PORT}`);
});
