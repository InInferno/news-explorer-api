const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');
const { invalidData, thereIsNoArticle, notMyArticle, invalidId } = require('../errors/errorMessages');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch((err) => next(err));
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => res.status(201).send({ data: article.hideOwner() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(invalidData));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (article === null) {
        return Promise.reject(new NotFoundError(thereIsNoArticle));
      }
      return article;
    })
    .then((article) => {
      if (!(req.user._id === article.owner.toString())) {
        return Promise.reject(new Forbidden(notMyArticle));
      }
      article.remove();
      return res.send({ message: `Статья с id: ${req.params.articleId} удалена` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(invalidId));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
