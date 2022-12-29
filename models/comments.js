const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {type: String, required: true},
  comment: {type: String, required: true},
  postId: {type: Schema.Types.ObjectId, required: true},
  timeStamp: {type: Date}
});

module.exports =  mongoose.model('Comment',commentSchema);