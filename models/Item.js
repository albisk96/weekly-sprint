const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: String,
  priority: {type: Number, enum: [1, 2, 3], default: 1},
  description: String,
  status: { type: String, enum: ['start', 'progress', 'done'], default: 'start' },
  returned: { type: Boolean, default: 'false' },
  date: {type: Date, default: Date.now }
});

module.exports = Item = mongoose.model('item', ItemSchema);