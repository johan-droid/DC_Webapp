/* backend/routes/admin.js */
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Case = require('../models/Case');

// GET admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const newsCount = await News.countDocuments();
    const casesCount = await Case.countDocuments();
    const publishedNews = await News.countDocuments({ published: true });
    const featuredCases = await Case.countDocuments({ featured: true });
    
    const recentNews = await News.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentCases = await Case.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      stats: {
        totalNews: newsCount,
        totalCases: casesCount,
        publishedNews,
        featuredCases
      },
      recentNews,
      recentCases
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all news (including unpublished)
router.get('/news', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all cases
router.get('/cases', async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
