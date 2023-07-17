const jwt = require('jsonwebtoken');
const AuthorizationError = require('../Errors/AuthorizationError');
const { NOT_AUTHORIZED } = require('../constants/message');
const { secretKey } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError(NOT_AUTHORIZED));
  }

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthorizationError(NOT_AUTHORIZED));
  }

  req.user = payload;

  return next();
};
