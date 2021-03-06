require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');


const app = express();

const corsOptions = {
  origin: [
      'http://localhost:8080',
      'https://newsexp.ml',
      'http://newsexp.ml',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

const {
  PORT, DATABASE_URL, DATABASE_OPTIONS, RATE_LIMIT_CONFIG,
} = require('./config');

app.use(rateLimit(RATE_LIMIT_CONFIG));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
console.log(`App listening on port ${PORT}`);
