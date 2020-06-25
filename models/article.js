const mongoose = require('mongoose');
const validator = require('validator');

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
      message: (props) => `Введённый Вами URL-адрес: ${props.value} некорректен`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(imageLink) {
        return validator.isURL(imageLink, { protocol: ['http', 'https'], require_protocol: true });
      },
      message: (props) => `Введённый Вами URL-адрес: ${props.value} некорректен`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
