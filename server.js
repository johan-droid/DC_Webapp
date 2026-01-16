/* backend/server.js - Supabase PostgreSQL Edition */
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. SUPABASE CONNECTION ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id') || supabaseKey.includes('your-service-role-secret-key')) {
    console.error('❌ Missing or invalid Supabase environment variables!');
    console.error('Please set SUPABASE_URL and SUPABASE_KEY in your .env file');
    console.error('Continuing without database functionality...');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// --- 2. MIDDLEWARE ---
app.use(helmet({
    contentSecurityPolicy: false, // Disable default CSP to allow external images/scripts for now
}));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
}));

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);

// --- FIX: SERVE STATIC FILES CORRECTLY ---
// Serve admin panel and static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// --- 3. AUTHENTICATION ---
const authenticateAdmin = (req, res, next) => {
    const apiKey = req.headers['x-admin-key'];
    if (apiKey && apiKey === process.env.ADMIN_SECRET) {
        next();
    } else {
        res.status(401).json({ error: '⛔ Unauthorized: Valid Admin Key required.' });
    }
};

// --- 4. VALIDATION SCHEMAS ---
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

// --- 5. ROUTES ---

// GET News
app.get('/api/news', async (req, res) => {
    if (!supabase) {
        return res.json([
            {
                id: 1,
                title: "Detective Conan Website Launched",
                category: "Breaking News",
                content: "The new Detective Conan fan website is now live with character profiles and interactive features!",
                created_at: new Date().toISOString()
            }
        ]);
    }

    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST News
app.post('/api/news', authenticateAdmin, async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const { error: valError, value } = newsValidation.validate(req.body);
    if (valError) return res.status(400).json({ error: valError.details[0].message });

    const { data, error } = await supabase
        .from('news')
        .insert([value])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'News published!', article: data[0] });
});

// GET Cases
app.get('/api/cases', async (req, res) => {
    if (!supabase) {
        return res.json([
            {
                id: 1,
                title: "The Mystery of the Missing Detective",
                type: "canon",
                description: "Shinichi Kudo's disappearance and transformation into Conan Edogawa remains one of the most intriguing cases.",
                created_at: new Date().toISOString()
            }
        ]);
    }

    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST Cases
app.post('/api/cases', authenticateAdmin, async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not available' });
    }

    const { error: valError, value } = caseValidation.validate(req.body);
    if (valError) return res.status(400).json({ error: valError.details[0].message });

    const { data, error } = await supabase
        .from('cases')
        .insert([value])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Case filed!', case: data[0] });
});

// Serve admin.html for any other route (fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

app.listen(PORT, () => {
    console.log(`🚀 Supabase-powered server running on port ${PORT}`);
});
