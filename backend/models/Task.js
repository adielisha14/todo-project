const mongoose = require('mongoose');
const User= require('./User')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },/***אפשר להוריד את זה? */
  body: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:{ type: String, default: 'general' ,required: true },
  updated: { type: Date, default: Date.now(), required: true },
  date:{ type: Date, required: false }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
