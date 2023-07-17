const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RegistrationError = require('../Errors/RegistrationError');
const { EMAIL_IS_USED, BAD_REQUEST, SUCCESSFUL_LOGOUT, USER_NOT_FOUND } = require('../constants/message');
const { secretKey } = require('../config');
const NotFoundError = require('../Errors/NotFoundError');
const RequestError = require('../Errors/RequestError');

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash })
      .then((user) => {
        res.status(201).send({ email: user.email });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new RegistrationError(EMAIL_IS_USED));
        } else if (err instanceof mongoose.Error.ValidationError) {
          console.log(err);
          next(new RequestError(BAD_REQUEST));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, secretKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: SUCCESSFUL_LOGOUT });
  res.end();
};

const findUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => {
      next(new NotFoundError(USER_NOT_FOUND));
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  findUser,
  createUser,
  login,
  logout,
};
