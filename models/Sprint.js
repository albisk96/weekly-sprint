const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  week: {
      type: Number,
      default: 2
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }],
  completed: Number,
  failed: Number,
  date: {
      type: Date, 
      default: Date.now 
  }
});

module.exports = Sprint = mongoose.model('sprint', SprintSchema);