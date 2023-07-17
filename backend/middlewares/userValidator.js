const { celebrate, Joi } = require('celebrate');
const { VALIDATION_ERROR } = require('../constants/message');

const validateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .messages({
      'any.required': VALIDATION_ERROR.REQUIRED_ERROR,
    }),
});

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .messages({
      'any.required': VALIDATION_ERROR.REQUIRED_ERROR,
      'string.min': VALIDATION_ERROR.MIN_LENGTH_ERROR,
      'string.max': VALIDATION_ERROR.MAX_LENGTH_ERROR,
    }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
};
