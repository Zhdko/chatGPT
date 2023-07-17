require('dotenv').config();
const { NODE_ENV, SECRET_KEY } = process.env;

const secretKey = NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret';

const ALLOWED_CORS =
  NODE_ENV === 'production' ? ALLOWED_CORS_PRODUCTION : ['http://localhost:3001', 'http://localhost:3000'];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
  secretKey,
};
