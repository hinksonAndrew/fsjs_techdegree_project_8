var express = require('express');
var router = express.Router();

const Book = require('../models').Book;

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req,res,next);
    } catch(error) {
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

/* GET books listing */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', {books, title:'Books'});
}));

/* GET add new book form */
router.get('/books/new', (req, res) => {
  res.render('new-book', {book: {}, title: "New Book"});
});

/* Posts a new book to database */
router.post('/books/new', asyncHandler(async(req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
      if(error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        console.log('stuff');
        res.render('new-book', {errors, book, title: "New Book"});
      } else {
        throw error;
      }
  }
}));

/* Shows book info in the database */
router.get('/books/:id', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', {book, title: book.title});
}));

/* Updates book info in the database */
router.post('/books/:id', asyncHandler(async(req,res) => {
  const book = await Book.findByPk(req.params.id);
  try {
    await book.update(req.body);
    res.redirect('/books');
  } catch (error) {
    if(error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.render('update-book', {errors, book, title: book.title});
    } else {
      throw error;
    }
  }
}));

/* Deletes a book. */
router.post('/books/:id/delete', asyncHandler(async(req,res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));

module.exports = router;
