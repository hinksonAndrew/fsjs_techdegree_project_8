/**
 * Error Handlers - 404 and Global
 */
const handleFourOhFour = (req, res, next) => {
  const err = new Error('err');
  err.status = 404;
  err.message = 'Oops, page not found. Looks like that route does not exist.';
  res.render('error', {err});
  next(err);
}

const handleGlobalError = (err, req, res, next) => {
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.status(err.status || 500);
  // res.send(err.message);
  // res.render('error');
  
}

module.exports = {handleFourOhFour, handleGlobalError};