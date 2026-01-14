/* server.js */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve static frontend files
app.use(express.static('frontend'));

// Helper: Read Database
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        // Initialize with empty structure if file doesn't exist
        const initialData = { news: [], cases: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
};

// Helper: Write Database
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- ROUTES ---

// 1. GET All News
app.get('/api/news', (req, res) => {
    const db = readDB();
    // Send newest first
    res.json(db.news.reverse());
});

// 2. POST New News (For Scriptwriter)
app.post('/api/news', (req, res) => {
    const { title, category, image, content, link } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and Content are required' });
    }

    const db = readDB();
    const newArticle = {
        id: Date.now(),
        title,
        category: category || 'General',
        image: image || 'assets/hero-bg.png', // Fallback image
        content,
        link: link || '#',
        date: new Date().toLocaleDateString()
    };

    db.news.push(newArticle);
    writeDB(db);
    res.status(201).json({ message: 'News published successfully', article: newArticle });
});

// 3. GET All Cases
app.get('/api/cases', (req, res) => {
    const db = readDB();
    res.json(db.cases.reverse());
});

// 4. POST New Case (For Scriptwriter)
app.post('/api/cases', (req, res) => {
    const { title, type, image, description } = req.body;
    const db = readDB();

    const newCase = {
        id: Date.now(),
        title,
        type: type || 'canon', // canon, anime, or movie
        image: image || 'assets/conan-mystery-hero.png',
        description,
        date: new Date().toLocaleDateString()
    };

    db.cases.push(newCase);
    writeDB(db);
    res.status(201).json({ message: 'Case file added', case: newCase });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin Panel available at http://localhost:${PORT}/admin.html`);
});
