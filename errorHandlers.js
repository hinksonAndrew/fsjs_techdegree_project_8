const createError = require('http-errors');

/**
 * Error Handlers - 404 and Global
 */
const handleFourOhFour = (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Sorry! We couldn't find the page you were looking for.";
  res.render('page-not-found', {err , title:"Page Not Found"});
  next(err);
}

const handleGlobalError = (err, req, res, next) => {
  console.log('hello');
  err.status = err.status || 500;
  err.message = err.message || "Sorry! There was an unexpected error on the server.";
  console.log('Status:', err.status,'Message:', err.message);
  //res.render('error', {err});
  return err;
}

module.exports = {handleFourOhFour, handleGlobalError};