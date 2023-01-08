const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type: String, required: true},
  about: {type: String},
  content: {type: String, required: true},
  img: {type: String },
  published: {type: Boolean, required: true},
  date: {type: Date},
  category: {type: String},
});

module.exports = mongoose.model('Post',postSchema);