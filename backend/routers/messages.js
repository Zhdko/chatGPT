const messageRouter = require('express').Router();
const { getAllMessages, createMessage, deleteMessage } = require('../controllers/messages');
const { validateCreateMovie, validateMessageId } = require('../middlewares/messageValidator');

messageRouter.get('/', getAllMessages);
messageRouter.post('/', validateCreateMovie, createMessage);
messageRouter.delete('/:messageId', validateMessageId, deleteMessage);

module.exports = { messageRouter };
