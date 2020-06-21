const express = require('express');
const router = express.Router();
const Author = require('../models/author');

/*
//  All Authors Route with callback
router.get('/', (req, res) => {
  //   res.send('Hello from express server');
  res.render('authors/index');
});
*/

//  All Authors Route with Async Await
router.get('/', async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect('/');
  }
});

//  New Author Route
router.get('/new', (req, res) => {
  //   res.send('Hello from express server');
  res.render('authors/new', {
    author: new Author(),
  });
});

/*
//  Create Author Route
router.post('/', (req, res) => {
  //   res.send('Hello from express server');
  // res.send(req.body.name);
  const author = new Author({
    name: req.body.name,
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating author',
      });
    } else {
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`);
    }
  });
});
*/

//  Create Author Route with Async Await
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author',
    });
  }
});

module.exports = router;
