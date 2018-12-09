const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const padSchema = new Schema({
  name: String,
  userId: String,
})

module.exports = mongoose.model('Pad', padSchema);