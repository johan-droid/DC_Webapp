/* backend/routes/news.js */
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Joi = require('joi');

// Validation schema
const newsSchema = Joi.object({
  title: Joi.string().required().max(200),
  category: Joi.string().valid('Fan Theory', 'Merchandise', 'Interview', 'General', 'Spoiler'),
  content: Joi.string().required().max(2000),
  image: Joi.string().uri(),
  link: Joi.string().uri(),
  author: Joi.string().max(100),
  tags: Joi.array().items(Joi.string().max(50)),
  published: Joi.boolean()
});

// GET all news
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const filter = category ? { category, published: true } : { published: true };
    
    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await News.countDocuments(filter);
    
    res.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single news
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new news
router.post('/', async (req, res) => {
  try {
    const { error, value } = newsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const news = new News(value);
    await news.save();
    
    res.status(201).json({
      message: 'News article created successfully',
      news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update news
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = newsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const news = await News.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json({
      message: 'News article updated successfully',
      news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE news
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
