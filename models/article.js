const mongoose = require('mongoose');
const validator = require('validator');
const { wrongArticleURL, wrongImageURL } = require('../errors/errorMessages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(articleLink) {
        return validator.isURL(articleLink, { protocol: ['http', 'https'], require_protocol: true });
      },
      message: () => wrongArticleURL,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(imageLink) {
        return validator.isURL(imageLink, { protocol: ['http', 'https'], require_protocol: true });
      },
      message: () => wrongImageURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'user',
    select: false,
  },
});

articleSchema.methods.hideOwner = function hideOwner() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);
