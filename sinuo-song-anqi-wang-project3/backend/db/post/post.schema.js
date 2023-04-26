const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.PostSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
}, { collection : 'posts' });

