var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {sequelize} = require("./models");

var indexRouter = require('./routes/index');

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

// Error Handlers
app.use(errorHandlers.handleFourOhFour);
app.use(errorHandlers.handleGlobalError);

module.exports = app;
