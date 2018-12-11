const mongoose = require('mongoose');

/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const userSchema = new Schema({
  name: String,
  layout: String,
});

module.exports = mongoose.model('User', userSchema);
