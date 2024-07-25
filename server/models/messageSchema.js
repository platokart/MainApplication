const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  imagefile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fs.files',
    default: null
  },
   photo: {
        type: String,
        required: true,
      },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('CommunityMessage', messageSchema);

module.exports = Message;