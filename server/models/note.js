const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: String,
  padId: String,
})

module.exports = mongoose.model('Note', noteSchema);