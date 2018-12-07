const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: String,
  category: String,
  userId: String,
})

module.exports = mongoose.model('Note', noteSchema);