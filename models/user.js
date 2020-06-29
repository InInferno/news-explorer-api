const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { wrongUserEmail, wrongUserData } = require('../errors/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(userEmail) {
        return validator.isEmail(userEmail, { allow_utf8_local_part: false });
      },
      message: () => wrongUserEmail,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(wrongUserData));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(wrongUserData));
          }
          return user;
        });
    });
};

userSchema.methods.hideHash = function hideHash() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
