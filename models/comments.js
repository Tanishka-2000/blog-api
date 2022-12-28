const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: String,
  comment: String,
  postId: Schema.Types.ObjectId
});

export default mongoose.model('comment',commentSchema);