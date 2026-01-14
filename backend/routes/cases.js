/* backend/routes/cases.js */
const express = require('express');
const router = express.Router();
const Case = require('../models/Case');
const Joi = require('joi');

// Validation schema
const caseSchema = Joi.object({
  title: Joi.string().required().max(200),
  type: Joi.string().valid('canon', 'anime', 'movie', 'ova', 'special'),
  description: Joi.string().required().max(2000),
  image: Joi.string().uri(),
  episodeNumber: Joi.number().min(1),
  season: Joi.number().min(1),
  airDate: Joi.date(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard', 'Expert'),
  characters: Joi.array().items(Joi.string().max(100)),
  solved: Joi.boolean(),
  featured: Joi.boolean()
});

// GET all cases
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, difficulty, featured } = req.query;
    
    let filter = {};
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;
    if (featured === 'true') filter.featured = true;
    
    const cases = await Case.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Case.countDocuments(filter);
    
    res.json({
      cases,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single case
router.get('/:id', async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new case
router.post('/', async (req, res) => {
  try {
    const { error, value } = caseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const caseItem = new Case(value);
    await caseItem.save();
    
    res.status(201).json({
      message: 'Case created successfully',
      case: caseItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update case
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = caseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const caseItem = await Case.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );
    
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    res.json({
      message: 'Case updated successfully',
      case: caseItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE case
router.delete('/:id', async (req, res) => {
  try {
    const caseItem = await Case.findByIdAndDelete(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
