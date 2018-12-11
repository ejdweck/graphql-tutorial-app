const mongoose = require('mongoose');

/* eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const noteSchema = new Schema({
  title: String,
  padId: String,
});

module.exports = mongoose.model('Note', noteSchema);
