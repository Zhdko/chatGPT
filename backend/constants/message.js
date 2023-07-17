const WRONG_USER_DATA = 'incorrect username or password';
const NOT_AUTHORIZED = 'authorization required';
const EMAIL_IS_USED = 'email is alredy in use';
const BAD_REQUEST = 'this data is flawed';
const SUCCESSFUL_LOGOUT = 'logout of the system';
const USER_NOT_FOUND = 'user not found';
const BAD_URL = 'there is no such URL';
const SERVER_ERROR = 'server error';
const MESSAGES_NOT_FOUND = 'no messages found';
const FORBIDDEN_DELETE_MESSAGE = 'you cannot delete messages from other users';

const VALIDATION_ERROR = {
  REQUIRED_ERROR: 'Поле {#label} является обязательным',
  MIN_LENGTH_ERROR: 'Поле {#label} не может содержать меньше {#limit} символов',
  MAX_LENGTH_ERROR: 'Поле {#label} не может содержать больше {#limit} символов',
};

module.exports = {
  FORBIDDEN_DELETE_MESSAGE,
  MESSAGES_NOT_FOUND,
  VALIDATION_ERROR,
  WRONG_USER_DATA,
  NOT_AUTHORIZED,
  EMAIL_IS_USED,
  BAD_REQUEST,
  SUCCESSFUL_LOGOUT,
  USER_NOT_FOUND,
  BAD_URL,
  SERVER_ERROR,
};
