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

router.post('/books/new', asyncHandler(async(req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/" + book.id);
}));

//router.get('/books/:id');

//router.post('/books/:id');

//router.post('/books/:id/delete');

module.exports = router;
