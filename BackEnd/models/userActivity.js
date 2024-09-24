const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, required: true },
  activityDate: { type: Date, default: Date.now }
});

const UserActivityModel = mongoose.model('UserActivity', UserActivitySchema);
module.exports = UserActivityModel;
