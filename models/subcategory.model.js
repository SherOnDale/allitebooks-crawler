const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name of the SubCategory is required'
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

module.exports = mongoose.model('SubCategory', SubCategorySchema);
