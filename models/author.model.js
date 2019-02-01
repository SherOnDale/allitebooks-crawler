const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name of the author is required'
  },
  slug: {
    type: String,
    required: 'Slug is required'
  },
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Book'
    }
  ]
});

module.exports = mongoose.model('Author', AuthorSchema);
