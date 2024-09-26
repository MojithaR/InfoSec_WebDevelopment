const mongoose = require('mongoose');

const UserCompleteCoursesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Reference to User
  username: { type: String, required: true },  // Store the username directly
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  courseName: { type: String, required: true },  // Store the course name directly
  courseProgress: { type: Number, required: true, min: 0, max: 100 }  // Course progress in percentage
});

const UserCompleteCoursesModel = mongoose.model('UserCompleteCourses', UserCompleteCoursesSchema);
module.exports = UserCompleteCoursesModel;


//to update the admin chart more detailed version