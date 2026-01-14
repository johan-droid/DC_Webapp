/* server.js - Production Ready */
require('dotenv').config(); // Load secrets
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. SECURITY MIDDLEWARE ---
app.use(helmet()); // Secure HTTP headers
app.use(express.json()); // Replaces body-parser
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Restrict access
    methods: ['GET', 'POST']
}));

// Rate Limiting (Prevent DDoS/Spam)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// --- 2. DATABASE CONNECTION (MongoDB) ---
// Connects to MongoDB Atlas or Local instance
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Define Schemas (Data Models)
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    image: { type: String, default: 'assets/hero-bg.png' },
    content: { type: String, required: true },
    link: { type: String, default: '#' },
    date: { type: Date, default: Date.now }
});

const CaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['canon', 'anime', 'movie'], default: 'canon' },
    image: { type: String, default: 'assets/conan-mystery-hero.png' },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const News = mongoose.model('News', NewsSchema);
const Case = mongoose.model('Case', CaseSchema);

// --- 3. INPUT VALIDATION SCHEMAS (Joi) ---
const newsValidation = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    category: Joi.string().valid('Fan Theory', 'Merchandise', 'Interview', 'Breaking News').default('General'),
    image: Joi.string().uri().allow(''),
    content: Joi.string().min(10).required(),
    link: Joi.string().uri().allow('')
});

const caseValidation = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    type: Joi.string().valid('canon', 'anime', 'movie').required(),
    image: Joi.string().uri().allow(''),
    description: Joi.string().min(10).required()
});

// --- 4. AUTHENTICATION MIDDLEWARE ---
// Simple API Key check for Admin routes (Replace with JWT for full user accounts)
const authenticateAdmin = (req, res, next) => {
    const apiKey = req.headers['x-admin-key'];
    if (apiKey && apiKey === process.env.ADMIN_SECRET) {
        next();
    } else {
        res.status(401).json({ error: '⛔ Unauthorized: Valid Admin Key required.' });
    }
};

// --- ROUTES ---

// Serve Frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// GET News
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 }).limit(20);
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// POST News (Protected + Validated)
app.post('/api/news', authenticateAdmin, async (req, res) => {
    // 1. Validate Input
    const { error } = newsValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        // 2. Save to DB
        const newArticle = new News(req.body);
        await newArticle.save();
        res.status(201).json({ message: 'News published successfully', article: newArticle });
    } catch (err) {
        res.status(500).json({ error: 'Database Write Failed' });
    }
});

// GET Cases
app.get('/api/cases', async (req, res) => {
    try {
        const cases = await Case.find().sort({ date: -1 });
        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// POST Cases (Protected + Validated)
app.post('/api/cases', authenticateAdmin, async (req, res) => {
    const { error } = caseValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(201).json({ message: 'Case filed successfully', case: newCase });
    } catch (err) {
        res.status(500).json({ error: 'Database Write Failed' });
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
