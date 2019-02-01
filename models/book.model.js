const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title of the book is required'
  },
  id: {
    type: String,
    required: 'ID of the book is required',
    unique: 'ID already exists'
  },
  url: {
    type: String,
    required: 'URL is required'
  },
  slug: {
    type: String,
    required: 'Slug is required'
  },
  description: {
    type: String,
    required: 'Description of the book is required'
  },
  thumbnailUrl: {
    type: String,
    required: 'Thumbnail URL is required'
  },
  downloadUrl: {
    type: String,
    required: 'Download URL is required'
  },
  authors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Author',
      required: 'Authors of the book is required'
    }
  ],
  isbn: {
    type: String,
    required: 'ISBN of the book is required'
  },
  year: {
    type: String,
    required: 'Published year of the book is required'
  },
  pages: {
    type: String,
    required: 'Number of pages in the book is required'
  },
  language: {
    type: String,
    required: 'Language of the book is required'
  },
  size: {
    type: String,
    required: 'File Size is required'
  },
  format: [
    {
      type: String,
      required: 'Format of the file is required'
    }
  ],
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: 'Categories is required'
    }
  ]
});

module.exports = mongoose.model('Book', BookSchema);
