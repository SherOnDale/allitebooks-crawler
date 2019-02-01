const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name of the category is required'
  },
  slug: {
    type: String,
    required: 'Slug is required'
  },
  subCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SubCategory'
    }
  ]
});

module.exports = mongoose.model('Category', CategorySchema);
