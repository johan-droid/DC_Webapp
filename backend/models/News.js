/* backend/models/News.js */
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    enum: ['Fan Theory', 'Merchandise', 'Interview', 'General', 'Spoiler'],
    default: 'General'
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  image: {
    type: String,
    default: '/assets/hero-bg.png'
  },
  link: {
    type: String,
    default: '#'
  },
  author: {
    type: String,
    default: 'Admin'
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add virtual for formatted date
newsSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

module.exports = mongoose.model('News', newsSchema);
