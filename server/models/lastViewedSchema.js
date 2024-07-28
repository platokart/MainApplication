const mongoose = require('mongoose');

const lastViewedSchema = new mongoose.Schema({
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  lastViewedTime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('LastViewed', lastViewedSchema);