/* backend/models/Case.js */
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  type: {
    type: String,
    enum: ['canon', 'anime', 'movie', 'ova', 'special'],
    default: 'canon'
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  image: {
    type: String,
    default: '/assets/conan-mystery-hero.png'
  },
  episodeNumber: {
    type: Number,
    min: 1
  },
  season: {
    type: Number,
    min: 1
  },
  airDate: {
    type: Date
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    default: 'Medium'
  },
  characters: [{
    type: String,
    trim: true
  }],
  solved: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add virtual for formatted date
caseSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

module.exports = mongoose.model('Case', caseSchema);
