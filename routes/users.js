const usersRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser,
} = require('../controllers/users');

usersRouter.get('/me', auth, getUser);

module.exports = usersRouter;
