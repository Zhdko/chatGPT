const { celebrate, Joi } = require('celebrate');
const { VALIDATION_ERROR } = require('../constants/message');

const validateCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      question: Joi.string().required(),
      answer: Joi.string().required(),
      date: Joi.date(),
    })
    .messages({
      'any.required': VALIDATION_ERROR.REQUIRED_ERROR,
    }),
});

const validateMessageId = celebrate({
  params: Joi.object()
    .keys({
      messageId: Joi.string().hex().required().length(24),
    })
    .messages({
      'any.required': VALIDATION_ERROR.REQUIRED_ERROR,
    }),
});

module.exports = { validateCreateMovie, validateMessageId };
