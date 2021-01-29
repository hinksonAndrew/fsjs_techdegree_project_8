var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {sequelize} = require("./models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Import error handlers
const errorHandlers = require('./errorHandlers');

var app = express();

// async IIFE == Immediately Invoked Function Expression
(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch(error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404, 'This page does not exist!'));
// });

// // error handler
// app.use((err, req, res, next) => {
//   if (err.status === 404) {
//     res.status(404).render('error', {err});
//   } else {
//     err.message = err.message || 'Oops! It looks like something went wrong on the server.';
//     res.status(err.status || 500).render('error', {err});
//   }
// });

app.use(errorHandlers.handleFourOhFour);
app.use(errorHandlers.handleGlobalError);

module.exports = app;
