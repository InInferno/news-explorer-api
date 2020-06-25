const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', auth, getArticles);
articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    // date: Joi.date().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}),
auth,
createArticle);
articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }).unknown(true),
}),
auth,
deleteArticle);

module.exports = articlesRouter;
