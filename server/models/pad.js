const mongoose = require('mongoose');

/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const padSchema = new Schema({
  name: String,
  userId: String,
});

module.exports = mongoose.model('Pad', padSchema);
