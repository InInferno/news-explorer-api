const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
// const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch((err) => next(err));
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image })
    .then((articles) => res.send({ data: articles }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`Ошибка: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (article === null) {
        return Promise.reject(new NotFoundError('Карточки с таким id нет'));
      }
      return article;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(`Введены некорректные данные ${err.message}`));
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
