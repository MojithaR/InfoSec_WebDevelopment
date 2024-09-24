const mongoose = require('mongoose');
const AdminModel = require('./models/admin');
const UserModel = require('./models/user');
const TaskModel = require('./models/task');
const CourseModel = require('./models/course');
const UserCompleteCoursesModel = require('./models/UserCompleteCourses');  // Import the new model

mongoose.connect("mongodb+srv://moji:moji123@ispmwebo.n47d8.mongodb.net/InfoSec")
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample Admins
    const adminExists = await AdminModel.findOne({ email: 'admin1@example.com' });
    if (!adminExists) {
      await AdminModel.create([
        { name: 'admin1', email: 'admin1@example.com', position: 'IT Manager', department: 'IT', lastaccess: "2024-09-24" },
        { name: 'admin2', email: 'admin2@example.com', position: 'Asst IT Manager', department: 'IT', lastaccess: "2024-09-20" }
      ]);
    } else {
      console.log('Admin data already exists. Skipping admin data creation.');
    }

    // Sample Users
    const userExists = await UserModel.findOne({ userid: 'IT01' });
    if (!userExists) {
      await UserModel.create([
        { userid: 'IT01', username: 'user1', email: 'user1@example.com', department: 'IT', lastaccess: '2024-09-20', status: 'complete' },
        { userid: 'IT02', username: 'Nimal Bandara', email: 'nimab@infosec.org.com', department: 'IT', lastaccess: '2024-09-24', status: 'completing' },
        { userid: 'HR01', username: 'Mayumi Ranasinghe', email: 'mayu@infosec.org.com', department: 'HR', lastaccess: '2024-09-21', status: 'missed' }
      ]);
    } else {
      console.log('User data already exists. Skipping user data creation.');
    }

    // Sample Courses
    const courseExists = await CourseModel.findOne({ courseId: 'CBS' });
    if (!courseExists) {
      await CourseModel.create([
        { courseId: 'CBS', title: 'Cybersecurity Basics', description: 'Learn the basics of cybersecurity.' },
        { courseId: 'ANT', title: 'Advanced Networking', description: 'Dive deeper into networking concepts.' }
      ]);
    } else {
      console.log('Course data already exists. Skipping course data creation.');
    }

    // Sample User Course Progress (UserCompleteCourses)
    const user1 = await UserModel.findOne({ username: 'user1' });
    const user2 = await UserModel.findOne({ username: 'Nimal Bandara' });
    const course1 = await CourseModel.findOne({ title: 'Cybersecurity Basics' });
    const course2 = await CourseModel.findOne({ title: 'Advanced Networking' });

    const progressExists = await UserCompleteCoursesModel.findOne({ username: 'user1', courseName: 'Cybersecurity Basics' });
    if (!progressExists && user1 && course1) {
      await UserCompleteCoursesModel.create([
        { userId: user1._id, username: user1.username, courseId: course1._id, courseName: course1.title, courseProgress: 50 },
        { userId: user1._id, username: user1.username, courseId: course2._id, courseName: course2.title, courseProgress: 75 },
        { userId: user2._id, username: user2.username, courseId: course1._id, courseName: course1.title, courseProgress: 80 },
        { userId: user2._id, username: user2.username, courseId: course2._id, courseName: course2.title, courseProgress: 60 }
      ]);
    } else {
      console.log('User progress data already exists. Skipping progress data creation.');
    }

    console.log("Sample data imported!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB: ", err);
  });
