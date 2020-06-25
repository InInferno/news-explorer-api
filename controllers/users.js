require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const ConflictError = require('../errors/ConflictError');
const BadRequest = require('../errors/BadRequest');

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.send(user.hideHash()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`Ошибка: ${err.message}`));
      } else if (err.code === 11000) {
        next(new ConflictError(`Указанный вами email: ${req.body.email} уже используется`));
      } else {
        next(err);
      }
    });
};

const login = ((req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secKeyForDevelopment',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new Unauthorized(`${err.message}`));
    });
});

module.exports = {
  getUser,
  login,
  createUser,
};
