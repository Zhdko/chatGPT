const mongoose = require('mongoose');
const validator = require('validator');
const AuthorizationError = require('../Errors/AuthorizationError');
const { WRONG_USER_DATA } = require('../constants/message');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'email must be a valid email adress',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(WRONG_USER_DATA));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError(WRONG_USER_DATA));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
