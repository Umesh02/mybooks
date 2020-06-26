const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

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
    res.render('authors/index', { authors, searchOptions: req.query });
  } catch (error) {
    res.redirect('/');
    next();
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
  //   res.send('Hello from express server');
  // res.send(req.body.name);
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
    // res.redirect(`authors`);
  } catch (error) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating author',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render('authors/show', {
      author: author,
      booksByAuthor: books,
    });
  } catch (error) {
    console.log('show page error', error);

    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', {
      author: author,
    });
  } catch (error) {
    res.redirect('/authors');
  }

  res.send('Edit Author ' + req.params.id);
});

router.put('/:id', async (req, res) => {
  let author;
  try {
    const author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${newAuthor.id}`);
    // res.redirect(`authors`);
  } catch (error) {
    if (author == null) {
      res.redirect('/');
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating author',
      });
    }
  }
});

router.delete('/:id', async (req, res) => {
  let author;
  try {
    const author = await Author.findById(req.params.id);
    await author.remove();
    // res.redirect(`/authors/${newAuthor.id}`);
    res.redirect('/authors');
  } catch (error) {
    if (author == null) {
      res.redirect('/');
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
