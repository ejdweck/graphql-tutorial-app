const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const padSchema = new Schema({
  name: String,
})

module.exports = mongoose.model('Pad', padSchema);