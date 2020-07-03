const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
  let books = [];
  try {
    books = await Book.find().sort({ createAt: 'desc' }).limit(3).exec();
  } catch (error) {
    console.log('error in index under routes', error);

    books = [];
  }
  //   res.send('Hello from express server');
  res.render('index', { books: books });
});

module.exports = router;
