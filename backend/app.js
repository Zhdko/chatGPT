const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');
const { CORS_OPTIONS } = require('./config');

const app = express();
const { routers } = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');

const { PORT, DB } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/chatGPT');

app.use(cors(CORS_OPTIONS));

app.listen(PORT, () => {
  console.log('ok');
});

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(routers);

app.use(errorLogger);
app.use(errorsHandler);
