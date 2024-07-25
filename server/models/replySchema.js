const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;