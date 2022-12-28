const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  img: String,
  published:Boolean,
});

module.exports = mongoose.model('post',postSchema);