const ConflictError = require("../Errors/ConflictError");
const NotFoundError = require("../Errors/NotFoundError");
const {
  MESSAGES_NOT_FOUND,
  FORBIDDEN_DELETE_MESSAGE,
} = require("../constants/message");
const Message = require("../models/message");

const getAllMessages = (req, res, next) => {
  const owner = req.user._id;

  Message.find({ owner })
    .then((messages) => {
      res.send(messages);
    })
    .catch(() => {
      throw new NotFoundError(MESSAGES_NOT_FOUND);
    })
    .catch(next);
};

const createMessage = (req, res, next) => {
  const { question, answer, date } = req.body;

  const messageOwner = req.user;

  Message.create({
    question,
    answer,
    date,
    owner: messageOwner,
  }).then((message) => {
    message
      .populate("owner")
      .then((messageInfo) => res.status(201).send(messageInfo))
      .catch(next);
  });
};

const deleteMessage = (req, res, next) => {
  Message.findById(req.params.messageId)
    .orFail(() => next(new NotFoundError(MESSAGES_NOT_FOUND)))
    .then((message) => {
      if (req.user._id !== message.owner.toString()) {
        throw new ConflictError(FORBIDDEN_DELETE_MESSAGE);
      }
      message
        .deleteOne()
        .then(() => res.send(message))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
};
