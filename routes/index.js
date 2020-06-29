const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const BadRequest = require('../errors/badRequest');
const { wrongUserData, wrongUserPassword, wrongUserName, notFound } = require('../errors/errorMessages');

router.use('/articles', require('./articles'));
router.use('/users', require('./users'));

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(() => new BadRequest(wrongUserData)),
    password: Joi.string().required().error(() => new BadRequest(wrongUserData)),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(() => new BadRequest(wrongUserName)),
    email: Joi.string().required().email()
      .error(() => new BadRequest(wrongUserEmail)),
    password: Joi.string().required().min(8)
      .error(() => new BadRequest(wrongUserPassword)),
  }),
}), createUser);
router.use('*', () => {
  throw new NotFoundError(notFound);
});

module.exports = router;
