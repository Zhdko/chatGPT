const mongoose = require('mongoose');
const { urlRegExp, BAD_URL } = require('../utils/constants');

const messageSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
