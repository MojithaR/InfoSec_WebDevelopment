const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, enum: ['Waiting', 'Done'], default: 'Waiting' }
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
