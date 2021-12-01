const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const verifyCookie = (req, res, next) => {
  const token = req.cookies.token_secondBase;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie('token_secondBase');
    return next(new ErrorResponse('Not a valid user', 400));
  }
};

module.exports = verifyCookie;
